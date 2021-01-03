import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listItems } from '../graphql/queries';
import { onCreateItem } from '../graphql/subscriptions';

const GroceryList = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchItems();
    const subscription = subscribeGraphQL(onCreateItem, onCreateItemHandler);

    return () => subscription.unsubscribe();
  }, []);

  function onCreateItemHandler() {}

  async function fetchItems() {
    try {
      const itemsData: any = await API.graphql(graphqlOperation(listItems));
      const items = itemsData.data.listItems.items;

      setItems(items);
    } catch (error) {
      console.log('fetchItems', error);
    }
  }

  function subscribeGraphQL<T>(
    subscription: any,
    callback: (value: T) => void
  ) {
    // @ts-ignore
    return API.graphql(graphqlOperation(subscription)).subscribe({
      next: (response: any) => {
        console.log(response);

        callback(response.value.data);
      },
      error: (err: any) => console.log(err)
    });
  }

  return (
    <div>
      <div>Grocery List</div>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default GroceryList;
