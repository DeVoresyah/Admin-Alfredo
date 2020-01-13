import Api from '../../lib/Api'
import Swal from 'sweetalert2'
import { debounce } from 'debounce'

const api = Api.create()

export default {
    async initForm({ commit }) {
        commit('initForm')
    },

    async doLogin({ router, commit }, data) {
        commit('doLoginRequest')

        const response = await api.authLogin(data)

        if (response.ok) {
            api.api.setHeaders({
                'X-AUTH-TOKEN': `Bearer ${response.data.data.token}`
            })

            commit('doLoginSuccess', response.data.data)

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
              
            Toast.fire({
                icon: 'success',
                title: 'You have successfully logged in.'
            })

            debounce(this.$router.replace({ path: '/' }), 2500)
        } else {
            commit('doLoginFailure', response)
        }
    },

    async doLogout({ commit }, data) {
        commit('doLogout')

        this.$router.replace({ path: '/auth/sign-in' })
    },
}