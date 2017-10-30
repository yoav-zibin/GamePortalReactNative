import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { initialState } from "./initial_state";
import { rootReducer } from '../reducers/root_reducer';

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware (
    thunkMiddleware, // lets us dispatch() functions
    // loggerMiddleware // neat middleware that logs actions
  )
)

// store.dispatch(selectSubreddit('reactjs'))

// store.dispatch(fetchPosts('reactjs'))
//      .then(() => console.log(store.getState()))

export default store