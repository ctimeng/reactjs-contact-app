export const ADD_CONTACT = 'ADD_CONTACT' ;
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';

export function AddContact(payload){
    return {
        type:'ADD_CONTACT',
        payload
    }
}

export function DeleteContact(payload){
    return {
        type:'DELETE_CONTACT',
        payload
    }
}

export function EditContact(payload){
    return {
        type:'EDIT_CONTACT',
        payload
    }
}

export function UpdateContact(payload){
    return {
        type:'UPDATE_CONTACT',
        payload
    }
}

export function SaveStorage(contacts){
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

export function GetStorage(){
    let contacts = JSON.parse(localStorage.getItem("contacts") || "[]")
    contacts.forEach(function(contact){
        contact.createdAt = new Date(contact.createdAt);
    })
    
    return contacts
}

export function GetDefualtContact(){
    return { 
        id: 0, 
        name: '', 
        phone: '', 
        email: '', 
        createdAt: '' 
    }
}