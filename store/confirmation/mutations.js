export default {
    getConfirmationRequest: (state, data) =>
        state.list = { ...state.list, fetching: true, error: null },
    getConfirmationSuccess: (state, data) =>
        state.list = { ...state.list, data, fetching: false, error: null },
    getConfirmationFailure: (state, error) =>
        state.list = { ...state.list, fetching: false, error },

    acceptConfirmationRequest: (state) =>
        state.acceptConfirmation = { ...state.acceptConfirmation, fetching: true, error: null },
    acceptConfirmationSuccess: (state) =>
        state.acceptConfirmation = { ...state.acceptConfirmation, fetching: false, error: null },
    acceptConfirmationFailure: (state, error) =>
        state.acceptConfirmation = { ...state.acceptConfirmation, fetching: false, error },

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