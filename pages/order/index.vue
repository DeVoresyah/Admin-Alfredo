<template>
    <!-- Main Container -->
    <main id="main-container">
        <!-- Hero -->
        <div class="bg-body-light">
            <div class="content content-full">
                <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                    <h1 class="flex-sm-fill h3 my-2">
                        Orders
                    </h1>
                    <nav class="flex-sm-00-auto ml-sm-3" aria-label="breadcrumb">
                        <ol class="breadcrumb breadcrumb-alt">
                            <li class="breadcrumb-item" aria-current="page">
                                <nuxt-link class="link-fx" to="/">Dashboard</nuxt-link>
                            </li>
                            <li class="breadcrumb-item">Orders</li>
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
                                        <th class="font-w700" style="width: 130px;">Date</th>
                                        <th class="font-w700">Invoice</th>
                                        <th class="font-w700 text-center">Amount</th>  
                                        <th class="font-w700 text-center">Status</th>    
                                        <th class="font-w700 text-center" style="width: 80px;"></th>
                                    </tr>
                                </thead>
                                <tbody v-if="order">
                                    <tr v-if="order.data.length == 0">
                                        <td colspan="5" class="text-center">
                                            <span class="font-w600">No Data Available</span>
                                        </td>
                                    </tr>
                                    <tr v-for="(item, index) in order.data" :key="index" v-else>
                                        <td>
                                            <span class="font-w600">{{ formatDate(item.created_at) }}</span>
                                        </td>
                                        <td class="font-w600">
                                            #{{ item.invoice_id }}
                                        </td>
                                        <td class="font-w600 text-center">
                                            Rp{{ item.total > 0 ? formatIdr(item.total) : 0 }}
                                        </td>
                                        <td class="font-w600 text-center">
                                            <span class="font-w600 badge badge-warning" v-if="item.status == 'waiting_payment'">Menunggu Pembayaran</span>
                                            <span class="font-w600 badge badge-primary" v-else-if="item.status == 'process'">Diproses</span>
                                            <span class="font-w600 badge badge-primary" v-else-if="item.status == 'paid'">Dibayar</span>
                                            <span class="font-w600 badge badge-success" v-else>Selesai</span>
                                        </td>
                                        <td class="text-center">
                                            <a href="javascript:void(0)" data-toggle="modal" data-target="#modal-edit" @click="onEdit(item)">
                                                <i class="fa fa-fw fa-eye"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="block-content">
                            <nav aria-label="Page navigation" v-if="order">
                                <ul class="pagination pagination-sm justify-content-end">
                                    <li class="page-item" :class="{disabled: order.page == null || order.page == 1}">
                                        <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="nextProduct({page: order.page - 1})">
                                        <span aria-hidden="true">
                                            <i class="fa fa-angle-left"></i>
                                        </span>
                                        <span class="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li v-for="index in order && order.lastPage" class="page-item" :class="{ active: order.page == null || index == order.page}" :key="index">
                                        <a class="page-link" href="javascript:void(0)" @click="nextProduct({page:index})">{{ index }}</a>
                                    </li>
                                    <li class="page-item" :class="{disabled: order.page == null || order.page == order.lastPage}">
                                        <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="nextProduct({page: order.page + 1})">
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

        <div class="modal" id="modal-edit" tabindex="-1" role="dialog" aria-labelledby="modal-edit" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="block block-themed block-transparent mb-0">
                        <div class="block-header bg-primary-dark">
                            <h3 class="block-title">ORDER</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option" data-dismiss="modal" aria-label="Close">
                                    <i class="fa fa-fw fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div class="block-content font-size-sm">
                            <form action="be_blocks_forms.html" method="POST">
                                <div class="modal-body">
                                    <table class="table table-striped" id="tblGrid">
                                        <tbody>
                                            <tr>
                                                <td>Order Date</td>
                                                <td>: <b>{{ detail && formatDate(detail.created_at) }}</b></td>
                                            </tr>
                                            <tr>
                                                <td>Invoice No.</td>
                                                <td>: <b>#{{ detail && detail.invoice_id}}</b></td>
                                            </tr>
                                            <tr>
                                                <td>Product</td>
                                                <td>: {{ detail && detail.product.title }}</td>
                                            </tr>
                                            <tr>
                                                <td>Quantity</td>
                                                <td>: {{ detail && detail.qty }}</td>
                                            </tr>
                                            <tr>
                                                <td>Amount</td>
                                                <td>: Rp{{ detail && detail.total }}</td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td>: 
                                                    <span class="font-w600 badge badge-warning" v-if="detail && detail.status == 'waiting_payment'">Menunggu Pembayaran</span>
                                                    <span class="font-w600 badge badge-primary" v-else-if="detail && detail.status == 'process'">Diproses</span>
                                                    <span class="font-w600 badge badge-primary" v-else-if="detail && detail.status == 'paid'">Dibayar</span>
                                                    <span class="font-w600 badge badge-success" v-else>Selesai</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                            </div>
                        <div class="block-content block-content-full text-right border-top">
                            <button type="button" class="btn btn-sm btn-light" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-sm btn-primary" data-dismiss="modal" @click="onDone(detail.id)"><i class="fa fa-check mr-1"></i>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <!-- END Main Container -->
</template>

<script>
import moment from 'moment'
import TextUtil from '../../lib/TextUtil'
import { mapState, mapActions } from 'vuex'

export default {
    middleware: 'order/index',
    head() {
        title: 'Orders - Admin'
    },
    data() {
        return {
            query: '',
            detail: null
        }
    },
    computed: {
        ...mapState({
            order: state => state.order.list.data
        })
    },
    methods: {
        formatIdr: (int) => new TextUtil().formatMoney(int),
        formatDate: (date) => moment(new Date(date)).format('YYYY/MM/DD'),
        onEdit(item) {
            this.detail = item
        },
        nextProduct({ page }) {
            if (this.query) {
                this.getOrder({ page, q: this.query })
            } else {
                this.getOrder({ page })
            }
        },
        onSearch() {
            this.getOrder({ page: this.order.page, q: this.query })
        },
        onDone(id) {
            this.doneOrder({ id })
        },
        ...mapActions({
            getOrder: 'order/getOrder',
            doneOrder: 'order/doneOrder'
        })
    }
}
</script>

<style>

</style>