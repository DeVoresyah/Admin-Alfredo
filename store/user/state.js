export default () => ({
    list: { data: null, fetching: true, error: null },
    detailUser: { data: null, fetching: false, error: null },
    doAdd: { fetching: false, error: null },
    doUpdate: { fetching: false, error: null },
    doDelete: { fetching: false, error: null }
})
