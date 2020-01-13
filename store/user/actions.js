import Api from '../../lib/Api'
import Swal from 'sweetalert2'

const api = Api.create()

export default {
    async getUser({ commit }, data) {
        commit('getUserRequest', data)

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.getUsers(data)

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
            commit('getUserSuccess', response.data.data)
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong.'
            })
            commit('getUserFailure', response)
        }
    },

    async addUser({ commit }, data) {
        commit('doAddRequest', data)

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.addUser(data)

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
            commit('doAddSuccess', response.data.data)
            Toast.fire({
                icon: 'success',
                title: 'User has been created.'
            })

            setTimeout(() => this.$router.go(-1), 2000)
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong.'
            })
            commit('doAddFailure', response)
        }
    }
}