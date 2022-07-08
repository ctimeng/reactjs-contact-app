
import { createStore } from "redux";
import ContactApp from "../reducers/index";
import { SaveStorage} from "../actions";

const store = createStore(ContactApp);

store.subscribe(() => {
    SaveStorage(store.getState().contacts)
})

export default store;