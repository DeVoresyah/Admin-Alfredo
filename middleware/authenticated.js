export default function({ isServer, req, store, redirect }) {
    setTimeout(() => {
        if(store.state.auth.session) {
            return redirect('/')
        } else {
            store.dispatch('auth/initForm')
        }
    }, 10)
}