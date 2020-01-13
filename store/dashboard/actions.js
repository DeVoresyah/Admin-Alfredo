import Api from '../../lib/Api'
import Swal from 'sweetalert2'

const api = Api.create()

export default {
    async getDashboard({ commit }, data) {
        commit('getDashboardRequest', data)

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.getDashboard(data)

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

        console.log(response)

        if (response.ok) {
            commit('getDashboardSuccess', response.data.data)
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong.'
            })
        }
    }
}