<template>
    <!-- Main Container -->
    <main id="main-container">
        <!-- Hero -->
        <div class="bg-body-light">
            <div class="content content-full">
                <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                    <h1 class="flex-sm-fill h3 my-2">
                        Categories
                    </h1>
                    <nav class="flex-sm-00-auto ml-sm-3" aria-label="breadcrumb">
                        <ol class="breadcrumb breadcrumb-alt">
                            <li class="breadcrumb-item" aria-current="page">
                                <nuxt-link class="link-fx" to="/">Dashboard</nuxt-link>
                            </li>
                            <li class="breadcrumb-item">Categories</li>
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
                            <a href="user_add.html" class="btn btn-sm btn-success">
                                <i class="fa fa-fw fa-plus mr-1"></i>Add Category
                            </a>
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
                                        <th class="font-w700">Title</th>
                                        <th class="font-w700">Description</th>
                                        <th class="font-w700 text-center" style="width: 80px;"></th>
                                    </tr>
                                </thead>
                                <tbody v-if="category">
                                    <tr v-if="category.data.length == 0">
                                        <td colspan="3" class="text-center">
                                            <span class="font-w600">No Data Available</span>
                                        </td>
                                    </tr>
                                    <tr v-for="(item, index) in category.data" :key="index" v-else>
                                        <td class="font-w600">
                                            {{ item.title }}
                                        </td>
                                        <td class="font-w600">
                                            {{ item.desc }}
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
                            <nav aria-label="Page navigation" v-if="category">
                                <ul class="pagination pagination-sm justify-content-end">
                                    <li class="page-item" :class="{disabled: category.page == null || category.page == 1}">
                                        <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="nextProduct({page: category.page - 1})">
                                        <span aria-hidden="true">
                                            <i class="fa fa-angle-left"></i>
                                        </span>
                                        <span class="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li v-for="index in category && category.lastPage" class="page-item" :class="{ active: category.page == null || index == category.page}" :key="index">
                                        <a class="page-link" href="javascript:void(0)" @click="nextProduct({page:index})">{{ index }}</a>
                                    </li>
                                    <li class="page-item" :class="{disabled: category.page == null || category.page == category.lastPage}">
                                        <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="nextProduct({page: category.page + 1})">
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
                            <h3 class="block-title">Edit Category</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option" data-dismiss="modal" aria-label="Close">
                                    <i class="fa fa-fw fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div class="block-content font-size-sm">
                            <form action="be_blocks_forms.html" method="POST">
                                <div class="block-content">
                                    <div class="form-group">
                                        <input type="text" class="form-control form-control-alt" value="Sendals" id="block-form1-username" name="block-form1-username">
                                    </div>
                                </div>
                            </form>
                            </div>
                        <div class="block-content block-content-full text-right border-top">
                            <button type="button" class="btn btn-sm btn-light" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-sm btn-primary" data-dismiss="modal"><i class="fa fa-check mr-1"></i>Save</button>
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
    middleware: 'category/index',
    head() {
        title: 'Categories - Admin'
    },
    data() {
        return {
            query: ''
        }
    },
    computed: {
        ...mapState({
            category: state => state.category.list.data
        })
    },
    methods: {
        formatIdr: (int) => new TextUtil().formatMoney(int),
        formatDate: (date) => moment(new Date(date)).format('YYYY/MM/DD'),
        nextProduct({ page }) {
            if (this.query) {
                this.getCategory({ page, q: this.query })
            } else {
                this.getCategory({ page })
            }
        },
        onSearch() {
            this.getCategory({ page: this.category.page, q: this.query })
        },
        ...mapActions({
            getCategory: 'category/getCategory'
        })
    }
}
</script>

<style>

</style>