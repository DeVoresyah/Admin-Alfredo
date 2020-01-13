export default function({ isServer, params, req, store, redirect }) {
    setTimeout(() => {
        if(!store.state.auth.session) {
            return redirect('/')
        } else {
            store.dispatch('product/getProductDetail', { slug: params.slug })
            store.dispatch('category/getCategory', { page : 1 })
        }
    }, 10)
}