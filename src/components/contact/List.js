import React from 'react';
import { connect } from 'react-redux';
import { DeleteContact, EditContact } from "../../actions"

function List(props) {

  const onEdit = (event, index) => {
    event.preventDefault();
    props.EditContact(props.contacts[index])
  }

  const onDelete = (event, index) => {
    event.preventDefault();
    const contact = props.contacts[index]
    if (window.confirm("Are you sure, you want to delete [" + contact.name + "] !")) {
      props.DeleteContact(index)
    }
  }

  return (
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
          props.contacts.map((contact, index) => (
            <tr key={contact.id}>
              <td>{(index + 1)}</td>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td>{contact.createdAt.toLocaleString()}</td>
              <td>
                <a href='#/' className="btn btn-primary" onClick={(e) => onEdit(e, `${index}`)}>Edit</a>
                <a href='#/' className="btn btn-danger ms-1" onClick={(e) => onDelete(e, `${index}`)}>Delete</a>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

const mapStateToProps = state => ({
  ...state
});

function mapDispatchToProps(dispatch) {
  return {
    DeleteContact: index => dispatch(DeleteContact(index)),
    EditContact: index => dispatch(EditContact(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);