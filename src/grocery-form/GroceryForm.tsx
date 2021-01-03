import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { API, graphqlOperation } from 'aws-amplify';
import { createItem } from '../graphql/mutations';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const initialState = {
  name: '',
  note: '',
  location: '',
  cost: 0
};

const GroceryForm = () => {
  const classes = useStyles();
  const [data, setData] = useState(initialState);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const snapshot: any = data;
    const name = event.target.name;
    const value = event.target.value;

    snapshot[name] = value;
    setData(snapshot);
  }

  async function submitItem(): Promise<void> {
    try {
      await API.graphql(graphqlOperation(createItem, { input: data }));
    } catch (error) {
      console.log('createItem', error);
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        label='Name'
        name='name'
        defaultValue={data.name}
        onChange={handleChange}
      />
      <TextField
        label='Note'
        name='note'
        defaultValue={data.note}
        onChange={handleChange}
      />
      <TextField
        label='Location'
        name='location'
        defaultValue={data.location}
        onChange={handleChange}
      />
      <TextField
        label='Cost'
        name='cost'
        defaultValue={data.cost}
        onChange={handleChange}
      />
      <Button variant='contained' onClick={submitItem}>
        Submit
      </Button>
    </form>
  );
};

export default GroceryForm;
