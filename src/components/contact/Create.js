import React, { useEffect, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { AddContact, EditContact, UpdateContact, GetDefualtContact } from "../../actions"


function Create(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: useMemo(() => {
            return props.contact;
        }, [props])
    });

    const errorStyle = {
        color: "red"
    };

    const autoIncrementContactId = () => {
        return props.contacts.length > 0 ? props.contacts[props.contacts.length - 1].id + 1 : 1;
    }

    const onSave = (formData, e) => {
        e.preventDefault();

        if (isExistsContact(formData)) {
            alert('Record already exists!');
            return;
        }

        saveOrUpdate(formData)

        clearData()

        alert(actionCaption() + ' successfully!')
    }

    const isUpdate = () => {
        return props.contact.id > 0
    }

    const actionCaption = () => {
        return isUpdate() ? 'Update' : 'Save'
    }

    const clearData = () => {
        props.EditContact(GetDefualtContact())
    }

    const saveOrUpdate = (formData) => {
        if (props.contact.id > 0) {
            let contact = props.contact
            contact.name = formData.name
            contact.phone = formData.phone
            contact.email = formData.email
            props.UpdateContact(contact)
        } else {
            formData.id = autoIncrementContactId()
            formData.createdAt = new Date()
            props.AddContact(formData)
        }
    }

    const isExistsContact = (formData) => {
        let exists = false
        const contactId = isUpdate() ? props.contact.id : autoIncrementContactId()
        props.contacts.forEach(function (contact) {
            if (contact.id !== contactId && (contact.phone === formData.phone || contact.email === formData.email)) {
                exists = true
            }
        })

        return exists
    }

    useEffect(() => {
        reset(props.contact);
    }, [props.contact, reset]);

    return (
        <div className="card mx-auto mb-3 mt-3 shadow" style={{ width: "30rem" }}>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSave)}>
                    <input type="hidden" name="txtId" value="0" />
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Name" {...register("name", { required: true })} />
                    </div>
                    {errors.name && <span style={errorStyle}>This field is required</span>}
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Phone" {...register("phone", { required: { value: true, message: "This field is required" }, pattern: { value: /^[0-9+-]+$/, message: 'Invalid phone number' }, minLength: { value: 6, message: 'Min digit 6' }, maxLength: { value: 12, message: ' Max digit 12' } })} />
                    </div>
                    {errors.phone && <span style={errorStyle}>{errors.phone.message}</span>}
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="john@example.com" {...register("email", { required: { value: true, message: "This field is required" }, pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })} />
                    </div>
                    {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
                    <div className="mb-3 d-grid gap-2">
                        <button type="submit" className="btn btn-success">{actionCaption()}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    ...state
});

function mapDispatchToProps(dispatch) {
    return {
        AddContact: contact => dispatch(AddContact(contact)),
        EditContact: contact => dispatch(EditContact(contact)),
        UpdateContact: contact => dispatch(UpdateContact(contact))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);