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

    async getDetailUser({ commit }, data) {
    commit('getDetailUserRequest', data)

    const { token } = this.state.auth.session
    api.api.setHeaders({
      'X-AUTH-TOKEN': `Bearer ${token}`
    })

    const response = await api.detailUser(data)

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
      commit('getDetailUserSuccess', response.data.data)
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Something went wrong.'
      })
      commit('getDetailUserFailure', response)
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
    },

    async updateUser({ commit, dispatch }, data) {
    commit('doUpdateRequest', data)

    const { token } = this.state.auth.session
    api.api.setHeaders({
      'X-AUTH-TOKEN': `Bearer ${token}`
    })

    const response = await api.editUser(data)

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
      commit('doUpdateSuccess', response.data.data)
      await Toast.fire({
        icon: 'success',
        title: 'User has been updated.'
      })

      dispatch('getUser', { page: 1 })
      this.$router.replace("/user")
    } else {
      await Toast.fire({
        icon: 'error',
        title: 'Something went wrong.'
      })
      commit('doUpdateFailure', response)
    }
  },
}
