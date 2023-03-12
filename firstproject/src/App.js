import { useState } from 'react';
import './App.css';

let initialState = {
  firstname: "kitty",
  lastname: "patidar",
  email: "ritik@gmail.com",
  password: "jyoti",
  reminder_me: false
}

function App() {
  const [formData, setFormData] = useState(initialState)
  const [formError, setFormError] = useState(initialState)

  const validation = (userData) => { // formal argument 

    let error = {};
    let isValid = true;

    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/i;

    if (userData.firstname !== undefined && !userData.firstname) {
      error.firstname = "Please enter your first name"
      isValid = false
    } else if (userData.firstname) {
      error.firstname = ''
    }

    if (userData.lastname !== undefined && !userData.lastname) {
      error.lastname = "Please enter your lastname"
      isValid = false
    } else if (userData.lastname) {
      error.lastname = ''
    }
    if (userData.email !== undefined && !userData.email) {
      error.email = "Please enter your email"
      isValid = false
    } else if (userData.email !== undefined && !emailregex.test(userData.email)) {
      error.email = "Please enter your vaild email"
      isValid = false
    } else if (userData.email) {
      error.email = ''
    }

    if (userData.password !== undefined && !userData.password) {
      error.password = 'Please enter your password'
      isValid = false
    } else if (userData.password) {
      error.password = ''
    }

    return { error, isValid }
  }

  const handlechange = (e) => {
    const { name, value, checked } = e.target
    let newData = { [name]: value }
    setFormData({ ...formData, [name]: name === "reminder_me" ? checked : value })
    const { error, isValid } = validation(newData)  // actual arguement 
    setFormError({
      ...formError,
      ...error
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error, isValid } = validation(formData)
    setFormError({
      ...formError,
      ...error
    })
    console.log(formError);

    if (!isValid) return

    try {
      console.log(formData);
    } catch (error) {

    }
  }
  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>first name</label>
          <input
            type={'text'}
            placeholder='please enter your first name'
            name='firstname'
            value={formData.firstname}
            onChange={handlechange}
          />
        </div>
        <span>{formError.firstname}</span>
        <div>
          <label>last name</label>
          <input
            type={'text'}
            placeholder='please enter your last name'
            name='lastname'
            value={formData.lastname}
            onChange={handlechange}
          />
        </div>
        <span>{formError.lastname}</span>
        <div>
          <label>Email</label>
          <input
            type={'email'}
            placeholder='please enter your email'
            name='email'
            value={formData.email}
            onChange={handlechange}
          />
        </div>
        <span>{formError.email}</span>
        <div>
          <label>password</label>
          <input
            type={'password'}
            placeholder='please enter your password'
            name='password'
            value={formData.password}
            onChange={handlechange}

          />
        </div>
        <span>{formError.password}</span>
        <div>
          <label>Reminder me</label>
          <input
            type="radio"
            name="reminder_me"
            checked={formData.reminder_me}
            onChange={handlechange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
