import { OPEN_SNACKBAR, CLOSE_SNACKBAR, OPEN_LOGOUT_DIALOG, CLOSE_LOGOUT_DIALOG, CHANGE_TITLE } from './constants';
import { SYSTEM_NAME } from '../../constants';

const initialState = {
  isSnackbarOpen: false,
  snackbarText: '',
  isLogoutDialogOpen: false,
  title: SYSTEM_NAME
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return Object.assign({}, state, {
        isSnackbarOpen: true,
        snackbarText: action.snackbarText
      });
    case CLOSE_SNACKBAR:
      return Object.assign({}, state, {
        isSnackbarOpen: false
      });
    case OPEN_LOGOUT_DIALOG:
      return Object.assign({}, state, {
        isLogoutDialogOpen: true
      });
    case CLOSE_LOGOUT_DIALOG:
      return Object.assign({}, state, {
        isLogoutDialogOpen: false
      });
    case CHANGE_TITLE:
      return Object.assign({}, state, {
        title: action.title
      });
    default:
      return state;
  }
};

export default reducer;