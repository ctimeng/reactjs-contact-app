import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, UPDATE_CONTACT, GetStorage, GetDefualtContact} from "../actions";

const initialState = {
    contacts: GetStorage(),
    contact: GetDefualtContact()
}

export default function variable (state = initialState, action) {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(item => {
                    return item.id !== state.contacts[action.payload].id
                })
            }
        case EDIT_CONTACT:
            return {
                ...state,
                contact: action.payload
            }
        case UPDATE_CONTACT:
            state.contacts.forEach((contact, index) => {
                if (contact.id === action.payload.id) {
                    state.contacts[index] = action.payload
                }
            })

            return {
                ...state
            }
        default:
            return state;
    }
};