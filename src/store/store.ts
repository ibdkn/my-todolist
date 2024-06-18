import {combineReducers, legacy_createStore as createStore} from "redux";
import {todolistsReducer} from "../model/todolists/todolists-reducer";
import {tasksReducer} from "../model/tasks/tasks-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>