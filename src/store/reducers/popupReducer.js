import * as ACTION_TYPES from '../actions/action_type'

const initialState = {
    isShow: false,
    planName: ''
}

const PopupsReducer = (state = initialState, action) => {
    const plan = action.payload
    switch (action.type) {
        case ACTION_TYPES.SHOW_CONFIRM_SELECT_PLAN_MODAL_TYPE:
            return {
                ...state,
                isShow: true,
                planName: plan
            }
        case ACTION_TYPES.CLOSE_CONFIRM_SELECT_PLAN_MODAL_TYPE:
            return {
                ...state,
                isShow: false,
            }
        default:
            return state
    }
}

export default PopupsReducer