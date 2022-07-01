import './App.css';
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';

function App() {
  const { register, handleSubmit, formState: { errors, ...formState }, setValue } = useForm();
  const [index, setIndex] = useState(0);
  const [isSave, setIsSave] = useState(true);
  const [contacts, setContacts] = useState([]);

  const errorStyle = {
    color: "red"
  };

  const autoIncrementContactId = () => {
    return contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
  }

  const onSave = (formData, e) => {
    e.preventDefault();
    var prevContracts = contacts;
    if (isSave) {
      formData.id = autoIncrementContactId()
      formData.createdAt = new Date()
      prevContracts.push(formData)
    } else {
      const contact = prevContracts[index]
      contact.name = formData.name
      contact.phone = formData.phone
      contact.email = formData.email
    }

    setContacts(prevContracts)

    sessionStorage.setItem('contacts', JSON.stringify(prevContracts));

    setIsSave(true)
    setIndex(0)
    setValue('name', '')
    setValue('phone', '')
    setValue('email', '')
  }

  const onEdit = (e, i) => {
    e.preventDefault();

    const contact = contacts[i]
    setValue('name', contact.name, { shouldValidate: true })
    setValue('phone', contact.phone, { shouldValidate: true })
    setValue('email', contact.email, { shouldValidate: true })

    setIndex(i)
    setIsSave(false)
  }

  const onDelete = (e, i) => {
    e.preventDefault();
    const contact = contacts[i]
    if (window.confirm("Are you sure, you want to delete [" + contact.name + "] !")) {
      let prevContacts = contacts
      prevContacts.splice(i, 1);
      setContacts([...prevContacts]);
      sessionStorage.setItem('contacts', JSON.stringify(prevContacts));
    }
  }

  useEffect(() => {
    //sessionStorage.clear()
    if (sessionStorage.getItem('contacts')) {
      var sessionContacts = JSON.parse(sessionStorage.getItem('contacts'));
      sessionContacts.forEach(function (contact, index) {
        contact.createdAt = new Date(contact.createdAt);
      })
      setContacts(sessionContacts)
    }
  }, [])

  return (
    <div className="container">
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          <div className="card mx-auto mb-3 mt-3 shadow" style={{ width: "30rem" }}>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSave)}>
                <input type="hidden" id="txtId" value="0" />
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Name" {...register("name", { required: true })} />
                </div>
                {errors.name && <span style={errorStyle}>This field is required</span>}
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Phone" {...register("phone", { required: { value:true, message: "This field is required"}, pattern:{ value:/^[0-9+-]+$/, message:'Invalid phone number'}, minLength: {value:6, message:'Min digit 6'}, maxLength: {value:12, message:' Max digit 12'} })} />
                </div>
                {errors.phone && <span style={errorStyle}>{errors.phone.message}</span>}
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="john@example.com" {...register("email", { required: { value:true, message: "This field is required"}, pattern: {value:/^\S+@\S+$/i, message:"Invalid email format"} })} />
                </div>
                {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
                <div className="mb-3 d-grid gap-2">
                  <button type="submit" className="btn btn-success">{isSave ? 'Save' : 'Update'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          {(!formState.isValid && formState.isSubmitted) ?
            <div id="toast-container" className="toast-top-right">
              <div className="toast toast-error" aria-live="assertive">
                <div className="toast-message">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</div>
              </div>
            </div>
            : 'ad'
          }
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Date</th>
            <th scope="col" style={{ width: "10rem" }}></th>
          </tr>
        </thead>
        <tbody>
          {
            contacts.map((contact, i) => (
              <tr key={contact.id}>
                <td>{(i + 1)}</td>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>{contact.createdAt.toLocaleString()}</td>
                <td>
                  <a href='#' className="btn btn-primary" onClick={(e) => onEdit(e, `${i}`)}>Edit</a>
                  <a href='#' className="btn btn-danger" onClick={(e) => onDelete(e, `${i}`)}>Delete</a>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
