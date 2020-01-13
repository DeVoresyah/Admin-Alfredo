<template>
    <!-- Main Container -->
    <main id="main-container">
        <!-- Hero -->
        <div class="bg-body-light">
            <div class="content content-full">
                <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                    <h1 class="flex-sm-fill h3 my-2">
                        Products
                    </h1>
                    <nav class="flex-sm-00-auto ml-sm-3" aria-label="breadcrumb">
                        <ol class="breadcrumb breadcrumb-alt">
                            <li class="breadcrumb-item" aria-current="page">
                                <nuxt-link class="link-fx" to="/">Dashboard</nuxt-link>
                            </li>
                            <li class="breadcrumb-item">Products</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        <!-- END Hero -->

        <!-- Page Content -->
        <div class="content content-narrow">

            <!-- Customers and Latest Orders -->
            <div class="row row-deck">
                <!-- Latest Customers -->
                <div class="col-lg-12">
                    <div class="block block-mode-loading-oneui">
                        <div class="block-header border-bottom">
                            <nuxt-link to="/product/add" class="btn btn-sm btn-success">
                                <i class="fa fa-fw fa-plus mr-1"></i>Add Product
                            </nuxt-link>
                            <div class="block-options">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control form-control-alt" placeholder="Search.." id="page-header-search-input2" name="page-header-search-input2" v-model="query" v-debounce:500ms="onSearch">
                                    <div class="input-group-append">
                                        <span class="input-group-text bg-body border-0">
                                            <i class="si si-magnifier"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="block-content block-content-full">
                            <table class="table table-striped table-hover table-borderless table-vcenter font-size-sm mb-0">
                                <thead class="thead-dark">
                                    <tr class="text-uppercase">
                                        <th class="font-w700" style="width: 80px;">Date</th>
                                        <th class="font-w700">Product Name</th>
                                        <th class="font-w700 text-center">Price</th>
                                        <th class="font-w700 text-center">Stock</th>
                                        <th class="font-w700 text-center" style="width: 80px;"></th>
                                    </tr>
                                </thead>
                                <tbody v-if="product">
                                    <tr v-if="product.data.length == 0">
                                        <td colspan="5" class="text-center">
                                            <span class="font-w600">No Data Available</span>
                                        </td>
                                    </tr>
                                    <tr v-for="(item, index) in product.data" :key="index" v-else>
                                        <td>
                                            <span class="font-w600">{{ formatDate(item.created_at) }}</span>
                                        </td>
                                        <td class="font-w600">
                                            {{ item.title }}
                                        </td>
                                        <td class="font-w600 text-center">
                                            Rp{{ item.price > 0 ? formatIdr(item.price) : 0 }}
                                        </td>
                                        <td class="font-w600 text-center">
                                            {{ item.stock }}
                                        </td>
                                        <td class="text-center">
                                            <nuxt-link :to="`product/${item.slug}/edit`" data-toggle="modal" data-target="#modal-edit">
                                                <i class="fa fa-fw fa-pencil-alt"></i>
                                            </nuxt-link>
                                            |
                                            <a href="javascript:void(0)" @click="onRemove(item.id)">
                                                <i class="fa fa-fw fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="block-content">
                            <nav aria-label="Page navigation" v-if="product">
                                <ul class="pagination pagination-sm justify-content-end">
                                    <li class="page-item" :class="{disabled: product.page == null || product.page == 1}">
                                        <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="nextProduct({page: product.page - 1})">
                                        <span aria-hidden="true">
                                            <i class="fa fa-angle-left"></i>
                                        </span>
                                        <span class="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li v-for="index in product && product.lastPage" class="page-item" :class="{ active: product.page == null || index == product.page}" :key="index">
                                        <a class="page-link" href="javascript:void(0)" @click="nextProduct({page:index})">{{ index }}</a>
                                    </li>
                                    <li class="page-item" :class="{disabled: product.page == null || product.page == product.lastPage}">
                                        <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="nextProduct({page: product.page + 1})">
                                        <span aria-hidden="true">
                                            <i class="fa fa-angle-right"></i>
                                        </span>
                                        <span class="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <!-- END Latest Customers -->
            </div>
            <!-- END Customers and Latest Orders -->
        </div>
        <!-- END Page Content -->

    </main>
    <!-- END Main Container -->
</template>

<script>
import moment from 'moment'
import TextUtil from '../../lib/TextUtil'
import Swal from 'sweetalert2'
import { mapState, mapActions } from 'vuex'

export default {
    middleware: 'product/index',
    head() {
        title: 'Products - Admin'
    },
    data() {
        return {
            query: ''
        }
    },
    computed: {
        ...mapState({
            product: state => state.product.list.data
        })
    },
    methods: {
        formatIdr: (int) => new TextUtil().formatMoney(int),
        formatDate: (date) => moment(new Date(date)).format('YYYY/MM/DD'),
        nextProduct({ page }) {
            if (this.query) {
                this.getProduct({ page, q: this.query })
            } else {
                this.getProduct({ page })
            }
        },
        onSearch() {
            this.getProduct({ page: this.product.page, q: this.query })
        },
        onRemove(id) {
            const vm = this

            Swal.fire({
                title: "Apakah Anda Yakin?",
                text: "Anda tidak dapat mengembalikkan ini!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Hapus',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.value) {
                    vm.deleteProduct({ id })
                }
            })
        },
        ...mapActions({
            getProduct: 'product/getProduct',
            deleteProduct: 'product/deleteProduct'
        })
    }
}
</script>

<style>

</style>