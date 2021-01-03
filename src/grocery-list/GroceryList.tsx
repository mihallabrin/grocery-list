import { useEffect, useState, useCallback } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listItems } from '../graphql/queries';
import { onCreateItem } from '../graphql/subscriptions';

const GroceryList = () => {
  const [items, setItems] = useState<any[]>([]);

  const onCreateItemCallback = useCallback(onCreateItemHandler, []);

  useEffect(() => {
    fetchItems();
    const createItemSub = subscribeGraphQL(onCreateItem, onCreateItemCallback);

    return () => createItemSub.unsubscribe();
  }, [onCreateItemCallback]);

  function onCreateItemHandler(data: any) {
    const { id, name, note, location, cost } = data.onCreateItem;

    setItems((items) => [...items, { id, name, note, location, cost }]);
  }

  async function fetchItems() {
    try {
      const itemsData: any = await API.graphql(graphqlOperation(listItems));
      const values = itemsData.data.listItems.items;

      setItems(values);
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
