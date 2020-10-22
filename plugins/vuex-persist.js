import createPersistedState from 'vuex-persistedstate'
import * as Cookies from "js-cookie";

let cookieStorage = {
  getItem: function(key) {
    return Cookies.getJSON(key);
  },
  setItem: function(key, value) {
    return Cookies.set(key, value, {expires: 3, secure: false});
  },
  removeItem: function(key) {
    return Cookies.remove(key);
  }
};

export default ({store}) => {
  createPersistedState({
    key: process.env.npm_package_name,
    storage: cookieStorage,
    getState: cookieStorage.getItem,
    setState: cookieStorage.setItem,
    reducer: (state) => ({
      auth: state.auth,
      user: state.user
    })
  })(store)
}
