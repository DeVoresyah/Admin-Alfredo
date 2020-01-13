<template>
    <!-- Main Container -->
    <main id="main-container">
        <!-- Hero -->
        <div class="bg-body-light">
            <div class="content content-full">
                <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                    <h1 class="flex-sm-fill h3 my-2">
                        Users
                    </h1>
                    <nav class="flex-sm-00-auto ml-sm-3" aria-label="breadcrumb">
                        <ol class="breadcrumb breadcrumb-alt">
                            <li class="breadcrumb-item" aria-current="page">
                                <nuxt-link class="link-fx" to="/">Dashboard</nuxt-link>
                            </li>
                            <li class="breadcrumb-item">Users</li>
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
                            <nuxt-link to="/user/add" class="btn btn-sm btn-success">
                                <i class="fa fa-fw fa-plus mr-1"></i>Add User
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
                                        <th class="font-w700">Date</th>
                                        <th class="font-w700">Username</th>
                                        <th class="font-w700 text-center">Email</th>
                                        <th class="font-w700 text-center">Phone</th>
                                        <th class="font-w700 text-center" style="width: 80px;"></th>
                                    </tr>
                                </thead>
                                <tbody v-if="user">
                                    <tr v-if="user.data.length == 0">
                                        <td colspan="5" class="text-center">
                                            <span class="font-w600">No Data Available</span>
                                        </td>
                                    </tr>
                                    <tr v-for="(item, index) in user.data" :key="index" v-else>
                                        <td>
                                            <span class="font-w600">{{ formatDate(item.created_at) }}</span>
                                        </td>
                                        <td class="font-w600">
                                            {{ item.username }}
                                        </td>
                                        <td class="font-w600 text-center">
                                            {{ item.email }}
                                        </td>
                                        <td class="font-w600 text-center">
                                            {{ item.phone_number }}
                                        </td>
                                        <td class="text-center">
                                            <a href="#" data-toggle="modal" data-target="#modal-edit">
                                                <i class="fa fa-fw fa-pencil-alt"></i>
                                            </a>
                                            |
                                            <a href="#" data-toggle="modal" data-target="#modal-delete">
                                                <i class="fa fa-fw fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="block-content">
                            <nav aria-label="Page navigation" v-if="user">
                                <ul class="pagination pagination-sm justify-content-end">
                                    <li class="page-item" :class="{disabled: user.page == null || user.page == 1}">
                                        <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="nextProduct({page: user.page - 1})">
                                        <span aria-hidden="true">
                                            <i class="fa fa-angle-left"></i>
                                        </span>
                                        <span class="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li v-for="index in user && user.lastPage" class="page-item" :class="{ active: user.page == null || index == user.page}" :key="index">
                                        <a class="page-link" href="javascript:void(0)" @click="nextProduct({page:index})">{{ index }}</a>
                                    </li>
                                    <li class="page-item" :class="{disabled: user.page == null || user.page == user.lastPage}">
                                        <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="nextProduct({page: user.page + 1})">
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
import { mapState, mapActions } from 'vuex'

export default {
    middleware: 'user/index',
    head() {
        title: 'Users - Admin'
    },
    data() {
        return {
            query: ''
        }
    },
    computed: {
        ...mapState({
            user: state => state.user.list.data
        })
    },
    methods: {
        formatDate: (date) => moment(new Date(date)).format('YYYY/MM/DD'),
        nextProduct({ page }) {
            if (this.query) {
                this.getUser({ page, q: this.query })
            } else {
                this.getUser({ page })
            }
        },
        onSearch() {
            this.getUser({ page: this.user.page, q: this.query })
        },
        ...mapActions({
            getUser: 'user/getUser'
        })
    }
}
</script>

<style>

</style>