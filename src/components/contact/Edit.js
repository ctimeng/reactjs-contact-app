import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  EditContact,
  UpdateContact
} from "../../actions";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit(props) {
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      return props.contact;
    }, [props]),
  });

  const errorStyle = {
    color: "red",
  };

  const onSave = (formData, e) => {
    e.preventDefault();

    if (isExistsContact(formData)) {
      alert("Record already exists!");
      return;
    }

    updateData(formData);

    alert("Update successfully!");

    navigate("/");
  };

  const updateData = (formData) => {
      let contact = props.contact;
      contact.name = formData.name;
      contact.phone = formData.phone;
      contact.email = formData.email;
      props.UpdateContact(contact);
  };

  const isExistsContact = (formData) => {
    let exists = false;
    props.contacts.forEach(function (contact) {
      if (
        contact.id !== props.contact.id &&
        (contact.phone === formData.phone || contact.email === formData.email)
      ) {
        exists = true;
      }
    });

    return exists;
  };

  useEffect(() => {
    const contacts = props.contacts.filter(contact => {
        return Number(contact.id) === Number(params.id)
    })

    props.EditContact(contacts[0])
    reset(props.contact);
  }, [props, reset, params]);

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
            Update
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
    EditContact: (contact) => dispatch(EditContact(contact)),
    UpdateContact: (contact) => dispatch(UpdateContact(contact)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
