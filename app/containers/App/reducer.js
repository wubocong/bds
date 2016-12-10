import {
    OPEN_SNACKBAR,
    CLOSE_SNACKBAR,
    OPEN_LOGOUT_DIALOG,
    CLOSE_LOGOUT_DIALOG,
    CONFIG_APPBAR,
    OPEN_LOADING_DIALOG,
    CLOSE_LOADING_DIALOG,
    OPEN_CHANGE_PASSWORD_DIALOG,
    CLOSE_CHANGE_PASSWORD_DIALOG
} from './constants';
import { SYSTEM_NAME } from '../../constants';

const initialState = {
    isSnackbarOpen: false,
    snackbarText: '',
    isLogoutDialogOpen: false,
    title: SYSTEM_NAME,
    isAppbarOpen: true,
    appbarLeftElement: null,
    appbarRightElement: null,
    isLoadingDialogOpen: false,
    isChangePasswordDialogOpen: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_LOADING_DIALOG:
            return Object.assign({}, state, {
                isLoadingDialogOpen: true
            });
        case CLOSE_LOADING_DIALOG:
            return Object.assign({}, state, {
                isLoadingDialogOpen: false
            });
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
        case CONFIG_APPBAR:
            return Object.assign({}, state, action.appbarConfig);
        case OPEN_CHANGE_PASSWORD_DIALOG:
            return Object.assign({}, state, {
                isChangePasswordDialogOpen: true
            });
        case CLOSE_CHANGE_PASSWORD_DIALOG:
            return Object.assign({}, state, {
                isChangePasswordDialogOpen: false
            });
        default:
            return state;
    }
};

export default reducer;