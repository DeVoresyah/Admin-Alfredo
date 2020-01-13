import Api from '../../lib/Api'
import Swal from 'sweetalert2'

const api = Api.create()

export default {
    async getConfirmation({ commit }, data) {
        commit('getConfirmationRequest', data)

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.getConfirmations(data)

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
            commit('getConfirmationSuccess', response.data.data)
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong.'
            })
            commit('getConfirmationFailure', response)
        }
    },

    async acceptConfirmation({ dispatch, commit }, data) {
        commit('acceptConfirmationRequest', data)

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.acceptConfirmations(data)

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
            commit('acceptConfirmationSuccess', response.data.data)
            Toast.fire({
                icon: 'success',
                title: 'Bukti pembayaran berhasil diterima.'
            })
            dispatch('confirmation/getConfirmation')
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong.'
            })
            commit('acceptConfirmationFailure', response)
        }
    }
}