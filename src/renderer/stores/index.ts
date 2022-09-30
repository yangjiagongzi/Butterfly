import { legacy_createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createRootReducer from '~/renderer/reducers'

const reducers = createRootReducer()
const initState = {}
export default legacy_createStore(reducers, initState, applyMiddleware(thunk))
