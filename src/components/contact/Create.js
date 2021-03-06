import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { AddContact } from "../../actions";
import { Link, useNavigate } from "react-router-dom";

function Create(props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const errorStyle = {
    color: "red",
  };

  const autoIncrementContactId = () => {
    return props.contacts.length > 0
      ? props.contacts[props.contacts.length - 1].id + 1
      : 1;
  };

  const onSave = (formData, e) => {
    e.preventDefault();

    if (isExistsContact(formData)) {
      alert("Record already exists!");
      return;
    }

    saveData(formData);

    alert("Save successfully!");

    navigate("/");
  };

  const saveData = (formData) => {
    formData.id = autoIncrementContactId();
    formData.createdAt = new Date();
    props.AddContact(formData);
  };

  const isExistsContact = (formData) => {
    let exists = false;
    props.contacts.forEach(function (contact) {
      if (
        contact.phone === formData.phone ||
        contact.email === formData.email
      ) {
        exists = true;
      }
    });

    return exists;
  };

  return (
    <div className="card mx-auto mb-3 mt-3 shadow" style={{ width: "30rem" }}>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="card-body">
          <input type="hidden" name="txtId" value="0" />
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && (
            <span style={errorStyle}>This field is required</span>
          )}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              {...register("phone", {
                required: { value: true, message: "This field is required" },
                pattern: {
                  value: /^[0-9+-]+$/,
                  message: "Invalid phone number",
                },
                minLength: { value: 6, message: "Min digit 6" },
                maxLength: { value: 12, message: " Max digit 12" },
              })}
            />
          </div>
          {errors.phone && (
            <span style={errorStyle}>{errors.phone.message}</span>
          )}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="john@example.com"
              {...register("email", {
                required: { value: true, message: "This field is required" },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
          </div>
          {errors.email && (
            <span style={errorStyle}>{errors.email.message}</span>
          )}
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-success">
            Save
          </button>
          <Link to={{ pathname: `/` }} className="btn btn-danger float-md-end">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state,
});

function mapDispatchToProps(dispatch) {
  return {
    AddContact: (contact) => dispatch(AddContact(contact)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
