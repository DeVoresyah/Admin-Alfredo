export default {
    getStatusOrderRequest: (state, data) =>
        state.statusOrder = { ...state.statusOrder, fetching: true, error: null },
    getStatusOrderSuccess: (state, data) =>
        state.statusOrder = { ...state.statusOrder, data, fetching: false, error: null },
    getStatusOrderFailure: (state, error) =>
        state.statusOrder = { ...state.statusOrder, fetching: false, error },

    getStatusConfirmationRequest: (state, data) =>
        state.statusConfirmation = { ...state.statusConfirmation, fetching: true, error: null },
    getStatusConfirmationSuccess: (state, data) =>
        state.statusConfirmation = { ...state.statusConfirmation, data, fetching: false, error: null },
    getStatusConfirmationFailure: (state, error) =>
        state.statusConfirmation = { ...state.statusConfirmation, fetching: false, error },
}