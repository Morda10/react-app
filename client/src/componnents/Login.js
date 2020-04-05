import React,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    Checkbox,
    Radio,
    FormControlLabel,
    Select,
    MenuItem
  } from "@material-ui/core";
 
  import axios from 'axios';

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '40ch',
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      }
    },
  }));

const Login = () => {

    const classes = useStyles()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => { // async on useEffect like this
      const fetchData = async () => {
        const res = await axios.get('/api/users/');
        setUsers(res.data);
        console.log(res.data);
      }
      fetchData()     
    },[]);

    const userslist = users.map(u => (
      <div key={u._id}>
          <li>name: {u.name}</li>
          <li>email: {u.email}</li>
          <Button
                variant="contained"
                color="secondary"  
                onClick={() => f(u._id)}             
               >
        Delete
        </Button>        
                  
      </div>
     ))

  
    const submitHandler = async (event) => { 
     try {
      event.preventDefault();
      await axios.post('/api/users/', {name,email})
      console.log("submitted");
     } catch (error) {
       console.log(error);
       
     }
     const res = await axios.get('/api/users/');
      setUsers(res.data);
    }
  
  
  
    const handleChange = (event) => {
      setName(event.target.value);
    }

    async function f(id){
      const res = await axios.delete(`/api/users/${id}`);
      const newUsers = [...users].filter(u => u._id !== id);
      //console.log(newUsers);
      setUsers(newUsers);

    }
  

    return (
        <div style={{textAlign: "center"}}>
            <form 
                className={classes.root} 
                noValidate 
                autoComplete="off"
                onSubmit={submitHandler}
            >
            <TextField
                placeholder="name"
                id="standard-basic"
                 label="Name" 
                 value={name}
                 onChange={handleChange}
            />
            <br/>
            <TextField
                placeholder="email"
                id="standard-basic"
                 label="Email" 
                 value={email}
                 onChange={(event) => setEmail(event.target.value)}
            />
            <br/>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.root.submit}
            >
                Sign In
            </Button>
            </form>
            {userslist}           
        </div>
    )
}

export default Login;
