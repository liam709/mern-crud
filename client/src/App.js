import './App.css';
import {useEffect, useState} from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const[email, setEmail] = useState('');
  const [listOfUsers, setListOfUsers] = useState([]);

  const addUser = () => {
    Axios.post('http://localhost:3001/insert', {name: name, email: email}).then((response) => {
      setListOfUsers([...listOfUsers, {_id: response.data._id, name: name, email:email}])
    })
  }

  const updateUser = (id) => {
    const newName = prompt('Enter new name');
    Axios.put('http://localhost:3001/update', {
      newName: newName,
      id: id
    }).then(() => {
      setListOfUsers(listOfUsers.map((val) => {
        if (val._id == id){
          return {_id: id, name: newName, email: val.email}
        } else {
          return val
        }
      }))
    })
  }

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setListOfUsers(listOfUsers.filter((val) => {
        return val._id != id;
      }))
    })
  }

  useEffect(() =>{
    Axios.get('http://localhost:3001/read').then((response) => {
      setListOfUsers(response.data)
    }).catch(() => {
      console.log('err')
    })
  }, [])
  

  return (
    <div className="App">
      <div className='Inputs'>
        <input type = 'text' placeholder = 'Enter name' onChange = {(event) => {setName(event.target.value)}}></input>
        <input type = 'text' placeholder = 'Enter email' onChange = {(event) => {setEmail(event.target.value)}}></input>

        <button onClick = {addUser}>Add user</button>
      </div>
      <div className = 'listOfUsers'>
      {listOfUsers.map((val) => {
        return (
          <div className ='userContainer'>
        <div className = 'user'> <h3> Name: {val.name}</h3><h3>Email: {val.email}</h3></div>
        <button onClick ={() => {updateUser(val._id)}}>Update</button>
        <button onClick = {() => {deleteUser(val._id)}}>Delete</button>
        </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;
