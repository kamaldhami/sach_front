import { createStore } from "redux";
import reducer from "./reducers/reducer";

const initialState = {
    user:[]
};
const store = createStore(
    reducer,
    initialState
)

export default store
