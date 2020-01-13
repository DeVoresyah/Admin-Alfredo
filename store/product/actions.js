import Api from '../../lib/Api'
import Swal from 'sweetalert2'

const api = Api.create()

export default {
    async getProduct({ commit }, data) {
        commit('getProductRequest', data)

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.getProducts(data)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        if (response.ok) {
            commit('getProductSuccess', response.data.data)
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong.'
            })
            commit('getProductFailure', response)
        }
    },

    async getProductDetail({ commit }, data) {
        commit('getProductDetailRequest', data)

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.getProductDetail(data)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        if (response.ok) {
            commit('getProductDetailSuccess', response.data.data)
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong.'
            })
            commit('getProductDetailFailure', response)
        }
    },

    async addProduct({ commit }, data) {
        commit('doAddRequest')

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.addProduct(data)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        if (response.ok) {
            commit('doAddSuccess')
            Toast.fire({
                icon: 'success',
                title: 'Berhasil menambahkan produk baru.'
            })
            setTimeout(() => {
                this.$router.push('/product')
            }, 2000);
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Failed to publish the product, please try again.'
            })
            commit('doAddFailure', response)
        }
    },

    async updateProduct({ commit }, data) {
        commit('doUpdateRequest')

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.updateProduct(data)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        if (response.ok) {
            commit('doUpdateSuccess')
            Toast.fire({
                icon: 'success',
                title: 'Produk berhasil diubah.'
            })
            setTimeout(() => {
                this.$router.push('/product')
            }, 2000);
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Failed to update the product, please try again.'
            })
            commit('doUpdateFailure', response)
        }
    },

    async deleteProduct({ dispatch, commit }, data) {
        commit('doDeleteRequest')

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.deleteProduct(data)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        if (response.ok) {
            commit('doDeleteSuccess')
            Toast.fire({
                icon: 'success',
                title: 'Berhasil menghapus produk.'
            })
            dispatch('getProduct', {q: '', page: 1})
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Failed to delete the product, please try again.'
            })
            commit('doDeleteFailure', response)
        }
    },
}