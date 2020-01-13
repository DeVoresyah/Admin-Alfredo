<template>
    <!-- Main Container -->
    <main id="main-container">
        <!-- Hero -->
        <div class="bg-body-light">
            <div class="content content-full">
                <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                    <h1 class="flex-sm-fill h3 my-2">
                        Payment Confirmations
                    </h1>
                    <nav class="flex-sm-00-auto ml-sm-3" aria-label="breadcrumb">
                        <ol class="breadcrumb breadcrumb-alt">
                            <li class="breadcrumb-item" aria-current="page">
                                <nuxt-link class="link-fx" to="/">Dashboard</nuxt-link>
                            </li>
                            <li class="breadcrumb-item">Payment Confirmations</li>
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
                                        <tr class="text-uppercase">
                                        <th class="font-w700">Date</th>
                                        <th class="font-w700 text-center">Invoice</th>
                                        <th class="font-w700 text-center">Sender Name</th>
                                        <th class="font-w700 text-center">Sender Bank</th>
                                        <th class="font-w700 text-center">Amount</th>
                                        <th class="font-w700 text-center">Status</th>
                                        <th class="font-w700 text-center" style="width: 80px;"></th>
                                    </tr>
                                </thead>
                                <tbody v-if="confirmation">
                                    <tr v-if="confirmation.data.length == 0">
                                        <td colspan="7" class="text-center">
                                            <span class="font-w600">No Data Available</span>
                                        </td>
                                    </tr>
                                    <tr v-for="(item, index) in confirmation.data" :key="index" v-else>
                                        <td>
                                            <span class="font-w600">{{ formatDate(item.created_at) }}</span>
                                        </td>
                                        <td class="font-w600">
                                            #{{ item.invoice_id }}
                                        </td>
                                        <td class="font-w600">
                                            {{ item.sender_name }}
                                        </td>
                                        <td class="font-w600">
                                            {{ item.sender_bank }}
                                        </td>
                                        <td class="font-w600 text-center">
                                            Rp{{ item.amount > 0 ? formatIdr(item.amount) : 0 }}
                                        </td>
                                        <td class="font-w600 text-center">
                                            <span class="font-w600 badge badge-warning" v-if="item.status == 'pending'">Pending</span>
                                            <span class="font-w600 badge badge-danger" v-else-if="item.status == 'fraud'">Fraud</span>
                                            <span class="font-w600 badge badge-success" v-else>Paid</span>
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
                            <nav aria-label="Page navigation" v-if="confirmation">
                                <ul class="pagination pagination-sm justify-content-end">
                                    <li class="page-item" :class="{disabled: confirmation.page == null || confirmation.page == 1}">
                                        <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="nextProduct({page: confirmation.page - 1})">
                                        <span aria-hidden="true">
                                            <i class="fa fa-angle-left"></i>
                                        </span>
                                        <span class="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li v-for="index in confirmation && confirmation.lastPage" class="page-item" :class="{ active: confirmation.page == null || index == confirmation.page}" :key="index">
                                        <a class="page-link" href="javascript:void(0)" @click="nextProduct({page:index})">{{ index }}</a>
                                    </li>
                                    <li class="page-item" :class="{disabled: confirmation.page == null || confirmation.page == confirmation.lastPage}">
                                        <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="nextProduct({page: confirmation.page + 1})">
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
                            <h3 class="block-title">PAYMENT CONFIRMATION</h3>
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
                                                <td>Submit Date</td>
                                                <td>: <b>{{ detail && formatDate(detail.created_at) }}</b></td>
                                            </tr>
                                            <tr>
                                                <td>Invoice No.</td>
                                                <td>: <b>#{{ detail && detail.invoice_id}}</b></td>
                                            </tr>
                                            <tr>
                                                <td>Total Transfer</td>
                                                <td>: Rp{{ detail && detail.amount }}</td>
                                            </tr>
                                            <tr>
                                                <td>Account Name</td>
                                                <td>: {{ detail && detail.sender_name }}</td>
                                            </tr>
                                            <tr>
                                                <td>Account Number</td>
                                                <td>: {{ detail && detail.sender_bank }}</td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td>: 
                                                    <span class="font-w600 badge badge-warning" v-if="detail && detail.status == 'pending'">Pending</span>
                                                    <span class="font-w600 badge badge-danger" v-else-if="detail && detail.status == 'fraud'">Fraud</span>
                                                    <span class="font-w600 badge badge-success" v-else>Paid</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h5 class="text-center">Payment Proof:</h5>
                                    <div class="text-center">
                                        <img :src="detail && `https://api.alfredo.my.id/uploads/confirmation/${detail.image}`" class="img-fluid" alt="Responsive image">
                                    </div>
                                </div>
                            </form>
                            </div>
                        <div class="block-content block-content-full text-right border-top">
                            <button type="button" class="btn btn-sm btn-light" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-sm btn-primary" data-dismiss="modal" @click="onAccept(detail.id)"><i class="fa fa-check mr-1"></i>Accept Payment</button>
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
    middleware: 'confirmation/index',
    head() {
        title: 'Payment Confirmations - Admin'
    },
    data() {
        return {
            query: '',
            detail: null
        }
    },
    computed: {
        ...mapState({
            confirmation: state => state.confirmation.list.data
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
                this.getConfirmation({ page, q: this.query })
            } else {
                this.getConfirmation({ page })
            }
        },
        onSearch() {
            this.getConfirmation({ page: this.confirmation.page, q: this.query })
        },
        onAccept(id) {
            this.acceptConfirmation({ id })
        },
        ...mapActions({
            getConfirmation: 'confirmation/getConfirmation',
            acceptConfirmation: 'confirmation/acceptConfirmation'
        })
    }
}
</script>

<style>

</style>