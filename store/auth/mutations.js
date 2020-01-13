export default {
    initForm: (state) => {
        state.doLogin = {
            data: null,
            fetching: false,
            error: null
        }
    },
        
    doLoginRequest: (state, data) => 
        state.doLogin = { ...state.doLogin, fetching: true, error: null },
    doLoginSuccess: (state, data) => {
        state.doLogin = { ...state.doLogin, data, fetching: false, error: null }
        state.session = data
    },
    doLoginFailure: (state, error) => 
        state.doLogin = { ...state.doLogin, fetching: false, error },

    doLogout: (state) =>
        state.session = null,
}