import React, {useState} from "react";
import { connect } from "react-redux";
import { DeleteContact } from "../../actions";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

function List(props) {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1);

  const onDelete = (event, index) => {
    event.preventDefault();
    const contact = props.contacts[index];
    if (
      window.confirm(
        "Are you sure, you want to delete [" + contact.name + "] !"
      )
    ) {
      props.DeleteContact(index);
    }
  };

  const filteredContacts = props.contacts.filter((contact) => {
    if (query === '') {
      return contact;
    }
    else {
      return contact.name.toLowerCase().includes(query.toLowerCase()) || 
             contact.phone.toLowerCase().includes(query.toLowerCase()) ||
             contact.email.toLowerCase().includes(query.toLowerCase())
    }
  })

  const handlePageChange = async e => {
    console.log(`active page is ${e}`);
    setPage(e);
  };


  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Contact List</h5>
      </div>
      <div className="card-body table-responsive">
        <div className="row mb-3">
          <div className="col-sm-12 col-md-9">
            <div className="dt-buttons btn-group flex-wrap">
              <Link to={{ pathname: `/create` }} className="btn btn-primary">
                Create
              </Link>
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <div
              className="input-group input-group-sm"
              style={{ width: "200px" }}
            >
              <input
                type="text"
                name="table_search"
                className="form-control float-md-end"
                placeholder="Search"
                onChange={event => setQuery(event.target.value)}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-default">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <table className="table table-borderless">
              <thead className="table-light">
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
                {filteredContacts.map((contact, index) => (
                  <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.email}</td>
                    <td>{contact.createdAt.toLocaleString()}</td>
                    <td>
                      <Link
                        to={{ pathname: `/${contact.id}/edit` }}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <a
                        href="#/"
                        className="btn btn-danger ms-1"
                        onClick={(e) => onDelete(e, `${index}`)}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card-footer clearfix">
      <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={props.contacts.length}
            pageRangeDisplayed={5}
            itemClass='page-item'
            linkClass='page-link'
            innerClass='pagination pagination-sm m-0 float-md-end'
            onChange={handlePageChange.bind(this)}
          />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state,
});

function mapDispatchToProps(dispatch) {
  return {
    DeleteContact: (index) => dispatch(DeleteContact(index))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
