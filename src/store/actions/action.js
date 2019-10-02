import * as ACTION_TYPES from './action_type'
export const ISLOADINGACTIVE = {
    type : ACTION_TYPES.ISLOADINGACTIVE
}
export const ISLOADINGDEACTIVE = {
    type : ACTION_TYPES.ISLOADINGDEACTIVE
}
/* is show select plan modaldialog */
export const SHOW_CONFIRM_SELECT_PLAN_MODAL_ACTION = (planName) => {
    return {
        type : ACTION_TYPES.SHOW_CONFIRM_SELECT_PLAN_MODAL_TYPE,
        payload: planName
    }
}
export const CLOSE_CONFIRM_SELECT_PLAN_MODAL_ACTION = {
    type : ACTION_TYPES.CLOSE_CONFIRM_SELECT_PLAN_MODAL_TYPE
}
/* is show select plan modaldialog */
/* authen */
export const ISAUTHENTICATED = {
    type : ACTION_TYPES.ISAUTHENTICATED
}
export const isAuthenSuccessWithCurrentUser = (currentUser) => {
    return {
        type: ACTION_TYPES.ISAUTHENTICATED,
        payload: currentUser
    }
}
export const ISLOGOUT = {
    type : ACTION_TYPES.ISLOGOUT
}
/* authen */

export const SUCCESS = {
    type : ACTION_TYPES.SUCCESS
}

export const FAILURE = {
    type : ACTION_TYPES.FAILURE
}

export const ISAUTHEN = {
    type : ACTION_TYPES.ISAUTHEN
}

export const success = () => {
    return {
        type: ACTION_TYPES.SUCCESS
    }
}

export const failure = () => {
    return {
        type: ACTION_TYPES.FAILURE
    }
}

export const user_input = (text) => {
    return {
        type: ACTION_TYPES.USER_INPUT,
        payload: text
    }
}