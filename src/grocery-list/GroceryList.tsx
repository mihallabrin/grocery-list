import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listItems } from '../graphql/queries';

const GroceryList = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const itemsData: any = await API.graphql(graphqlOperation(listItems));
      const items = itemsData.data.listItems.items;

      setItems(items);
    } catch (error) {
      console.log('fetchItems', error);
    }
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
