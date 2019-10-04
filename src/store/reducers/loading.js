import * as ACTION_TYPES from "../actions/action_type";

const initialState = {
  isLoading: false
};

const isLoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ISLOADINGACTIVE:
      return {
        ...state,
        isLoading: true
      };
    case ACTION_TYPES.ISLOADINGDEACTIVE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default isLoadingReducer;
