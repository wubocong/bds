import { RECORD_PASSWORD } from './constants';

const initialState = {
  password: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECORD_PASSWORD:
      return Object.assign({}, state, {
        password: action.password
      });
    default:
      return state;
  }
};

export default reducer;