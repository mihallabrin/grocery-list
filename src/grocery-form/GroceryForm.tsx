import { useState } from 'react';
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
  const [data, setData] = useState({ ...initialState });

  async function submitItem(): Promise<void> {
    try {
      await API.graphql(graphqlOperation(createItem, { input: data }));
      setData({ ...initialState });
    } catch (error) {
      console.log('createItem', error);
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        label='Name'
        name='name'
        value={data.name}
        onChange={(e) =>
          setData((prevState) => {
            return { ...prevState, name: e.target.value };
          })
        }
      />
      <TextField
        label='Note'
        name='note'
        value={data.note}
        onChange={(e) =>
          setData((prevState) => {
            return { ...prevState, note: e.target.value };
          })
        }
      />
      <TextField
        label='Location'
        name='location'
        value={data.location}
        onChange={(e) =>
          setData((prevState) => {
            return { ...prevState, location: e.target.value };
          })
        }
      />
      <TextField
        label='Cost'
        name='cost'
        value={data.cost}
        onChange={(e) =>
          setData((prevState) => {
            return { ...prevState, cost: parseFloat(e.target.value) };
          })
        }
      />
      <Button variant='contained' onClick={submitItem}>
        Submit
      </Button>
    </form>
  );
};

export default GroceryForm;
