export default function({ isServer, req, store, redirect }) {
    setTimeout(() => {
        if(!store.state.auth.session) {
            return redirect('/auth/sign-in')
        } else {
            store.commit('user/initForm')
        }
    }, 10)
}