import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';

import './App.css';
import GroceryList from './grocery-list/GroceryList';

function App() {
  return (
    <div className='App'>
      <GroceryList />
    </div>
  );
}

export default withAuthenticator(App);
