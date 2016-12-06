import { FETCH_ADMIN_CONTACT, FETCH_ADMIN_CONTACT_SUCCESS, FETCH_ADMIN_CONTACT_ERROR } from './constants';
import { HOST } from '../../constants';

const initialState = {
  isFetchingAdminContact: false,
  hadFetchAdminContact: false,
  fetchAdminContactError: false,
  adminEmail: '',
  adminPhone: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_ADMIN_CONTACT:
      return Object.assign({}, state, {
        isFetchingAdminContact: true
      });
    case FETCH_ADMIN_CONTACT_SUCCESS:
      return Object.assign({}, state, {
        isFetchingAdminContact: false,
        hadFetchAdminContact: true,
        adminEmail: action.adminEmail,
        adminPhone: action.adminPhone
      });
    case FETCH_ADMIN_CONTACT_ERROR:
      return Object.assign({}, state, {
        isFetchingAdminContact: false,
        fetchAdminContactError: true,
        hadFetchAdminContact: true
      });
    default: 
      return state;
  }
};

export default reducer;