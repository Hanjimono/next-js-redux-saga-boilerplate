import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import mainReducer, {moduleName as mainModule} from 'App/ducks/main'

const reducer = () => combineReducers({
  form,
  [mainModule]: mainReducer,
})

export default reducer