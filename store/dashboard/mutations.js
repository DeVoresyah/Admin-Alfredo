export default {
    getDashboardRequest: (state) =>
        state.stats = { ...state.stats, fetching: true, error: null },
    getDashboardSuccess: (state, data) =>
        state.stats = { ...state.stats, data, fetching: false, error: null },
    getDashboardFailure: (state, error) =>
        state.stats = { ...state.stats, fetching: false, error },
}