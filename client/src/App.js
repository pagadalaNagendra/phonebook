import React, { useEffect,useState } from 'react';
import Axios from 'axios'
import './App.css';
function App() {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState(0)
  
  const addNewNumber = () => {
    Axios.post('http://localhost:8080/add-phone',{name,phone})
  }
  const [phonebook, setPhonebook] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:8080/get-phone').then(res => {
      setPhonebook(res.data.data.phoneNumbers)
    })
  },[])
  const [newPhone, setNewPhone] = useState(0)
 
  const updatePhone = (id) =>{
    Axios.put(`http://localhost:8080/delete-phone/${id}`,{id, newPhone})
  }
 
  const deletePhone = (id) => {
    Axios.delete(`http://localhost:8080/delete-phone/${id}`)
  }
  


  
  return (
    <div className="container">

        <center>
        <label htmlFor="">Name: </label>
        <input type="text" onChange={(e) => {setName(e.target.value)}}/><br/><br/>
        <label htmlFor="">Phone: </label>
        <input type="number" onChange={(e) => {setPhone(e.target.value)}}/><br/><br/>

        <button onClick={addNewNumber}>Add New Number</button>
        <h1>PhoneBook List</h1>
      {
        phonebook.map((val,key) => {
          return <div key={key} className="phone" >
            <h1>{val.name}</h1>
            <h1>{val.phone}</h1>
          </div>
        })
      }
      {
        phonebook.map((val,key) => {
          return <div key={key} className="phone" >
            <h1>{val.name}</h1>
            <h1>{val.phone}</h1>
            <input type="number" placeholder='update Phone...' onChange={(e) => {
              setNewPhone(e.target.value)
            }}/>
            <button className="update-btn"  onClick={() => {updatePhone(val._id)}}>Update</button>
          </div>
        })
      }
      <h1>PhoneBook List</h1>
      {
        phonebook.map((val,key) => {
          return <div key={key} className="phone" >
            <h1>{val.name}</h1>
            <h1>{val.phone}</h1>
            <input type="number" placeholder='update Phone...' onChange={(e) => {
              setNewPhone(e.target.value)
            }}/>
            <button className='update-btn'  onClick={() => {updatePhone(val._id)}}>Update</button>
            <button  className='delete-btn'onClick={() =>{deletePhone(val._id)}}>Delete</button>
          </div>
        })
      }
        </center>

    </div> 
  );
}

export default App;
