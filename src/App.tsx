import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';

import './App.css';
import GroceryList from './grocery-list/GroceryList';
import GroceryForm from './grocery-form/GroceryForm';

function App() {
  return (
    <div className='App'>
      <GroceryForm />
      <GroceryList />
    </div>
  );
}

export default withAuthenticator(App);
