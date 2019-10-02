import isAuthenticatedReducer from './isAuthenticatedReducer'
import LoadingReducer from './loading'
import PopupsReducer from './popupReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    /* use */
    auth: isAuthenticatedReducer,
    loading:LoadingReducer,
    popup:PopupsReducer,
    /* use */
})

export default rootReducer;