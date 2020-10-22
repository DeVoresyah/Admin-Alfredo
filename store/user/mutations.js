export default {
    // edit user
    editUserName: (state, data) =>
        state.detailUser.data.name = data.name,
    editUserPhone: (state, data) =>
        state.detailUser.data.phone_number = data.phone_number,
    editUserEmail: (state, data) =>
        state.detailUser.data.email = data.email,

    getUserRequest: (state, data) =>
        state.list = { ...state.list, fetching: true, error: null },
    getUserSuccess: (state, data) =>
        state.list = { ...state.list, data, fetching: false, error: null },
    getUserFailure: (state, error) =>
        state.list = { ...state.list, fetching: false, error },

  getDetailUserRequest: (state, data) =>
        state.detailUser = { ...state.detailUser, fetching: true, error: null },
  getDetailUserSuccess: (state, data) =>
        state.detailUser = { ...state.detailUser, data, fetching: false, error: null },
  getDetailUserFailure: (state, error) =>
        state.detailUser = { ...state.detailUser, fetching: false, error },

    initForm: (state) => {
        state.doAdd = { fetching: false, error: null },
        state.doUpdate = { fetching: false, error: null },
        state.doDelete = { fetching: false, error: null }
    },

    doAddRequest: (state) =>
        state.doAdd = { ...state.doAdd, fetching: true, error: null },
    doAddSuccess: (state) =>
        state.doAdd = { ...state.doAdd, fetching: false, error: null },
    doAddFailure: (state, error) =>
        state.doAdd = { ...state.doAdd, fetching: false, error },

    doUpdateRequest: (state) =>
        state.doUpdate = { ...state.doUpdate, fetching: true, error: null },
    doUpdateSuccess: (state) =>
        state.doUpdate = { ...state.doUpdate, fetching: false, error: null },
    doUpdateFailure: (state, error) =>
        state.doUpdate = { ...state.doUpdate, fetching: false, error},

    doDeleteRequest: (state) =>
        state.doDelete = { ...state.doDelete, fetching: true, error: null },
    doDeleteSuccess: (state) =>
        state.doDelete = { ...state.doDelete, fetching: false, error: null },
    doDeleteFailure: (state, error) =>
        state.doDelete = { ...state.doDelete, fetching: false, error },
}
