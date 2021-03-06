import apisauce from 'apisauce'

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token 179d8addb3996dc7daf54ac897f5ff2dMX3Fl//VtDmRV6w0wzwddN/z+7bQh17fhdOeTPraLQ/M/DzTGSA/J9QI5JMROvK5',
  }

// our "constructor"
const create = (baseURL = 'http://localhost:3333/api/admin/v1/') => {
    const api = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: headers,
        // 10 second timeout...
        timeout: 10000
    })

    api.addResponseTransform(response => {
        if (!response.ok) {

            let msgError = "No Internet Connection"
            if (response.data && response.data.data && response.data.data.message) {
                msgError = response.data.data.message
            }

            response.data = {
                response: {
                    status: 404,
                    message: msgError
                },
                data: {
                    message: msgError
                }
            }
        }
    })

    // Static Data
    const getStatusOrder = (data) => api.get(`/static/status-order`)
    const getStatusConfirmation = (data) => api.get(`/static/status-confirmation`)

    // Auth
    const authLogin = (data) => api.post(`/account/sign-in`, data)
    const authRegister = (data) => api.post(`/account/sign-up`, data)

    // Dashboard
    const getDashboard = (data) => api.get(`/dashboard`, data)

    // Users
    const getUsers = (data) => api.get(`/users?q=${data.q ? data.q : ""}&page=${data.page ? data.page : 1}`)
    const detailUser = (data) => api.get(`/users/${data.id}`)
    const addUser = (data) => api.post(`/users/add`, data)
    const editUser = (data) => api.patch(`/users/${data.id}`, data.data)

    // Product
    const getProducts = (data) => api.get(`/products?q=${data.q ? data.q : ""}&page=${data.page ? data.page : 1}`)
    const addProduct = (data) => api.post(`/products/add`, data)
    const deleteProduct = (data) => api.delete(`/products/${data.id}`)
    const updateProduct = (data) => api.patch(`/products/${data.id}`, data.data)
    const getProductDetail = (data) => api.get(`/products/${data.slug}`)

    // Collection
    const getCategories = (data) => api.get(`/categories?q=${data.q ? data.q : ""}&page=${data.page ? data.page : 1}`)

    // Order
    const getOrders = (data) => api.get(`/orders?q=${data.q ? data.q : ""}&page=${data.page ? data.page : 1}`)
    const doneOrder = (data) => api.patch(`/orders/${data.id}/done`)

    // Payment Confirmations
    const getConfirmations = (data) => api.get(`/confirmations?q=${data.q ? data.q : ""}&page=${data.page ? data.page : 1}`)
    const acceptConfirmations = (data) => api.patch(`/confirmations/${data.id}/accept`)

    return {
        // Static Data
        getStatusOrder,
        getStatusConfirmation,

        // Auth
        authLogin,
        authRegister,

        // Dashboard,
        getDashboard,

        // Users
        getUsers,
        detailUser,
        addUser,
        editUser,

        // Product
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductDetail,

        // Category
        getCategories,

        // Order
        getOrders,
        doneOrder,

        // Payment Confirmations
        getConfirmations,
        acceptConfirmations,

        api,
        headers,
    }
}

// let's return back our create method as the default.
export default {
    create
}
