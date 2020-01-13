<template>
    <!-- Main Container -->
    <main id="main-container">
        <!-- Hero -->
        <div class="bg-body-light">
            <div class="content content-full">
                <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                    <h1 class="flex-sm-fill h3 my-2">
                        Add User
                    </h1>
                    <nav class="flex-sm-00-auto ml-sm-3" aria-label="breadcrumb">
                        <ol class="breadcrumb breadcrumb-alt">
                            <li class="breadcrumb-item" aria-current="page">
                                <nuxt-link class="link-fx" to="/">Dashboard</nuxt-link>
                            </li>
                            <li class="breadcrumb-item" aria-current="page">
                                <nuxt-link class="link-fx" to="/user">Users</nuxt-link>
                            </li>
                            <li class="breadcrumb-item">Add User</li>
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
                <div class="col-lg-8 col-md-8 mx-auto">
                    <div class="block block-mode-loading-oneui align-items-center">
                        <div class="block-content block-content-full">
                            <form @submit.prevent="">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="input-name">Name</label>
                                            <input type="text" class="form-control form-control-alt" id="input-name" name="name" v-model="name">
                                        </div>
                                        <div class="form-group">
                                            <label for="input-username">Username</label>
                                            <input type="text" class="form-control form-control-alt" id="input-username" name="username" v-model="username">
                                        </div>
                                        <div class="form-group">
                                            <label for="input-phone">Phone Number</label>
                                            <input type="text" class="form-control form-control-alt" id="input-phone" name="phone_number" v-model="phone_number">
                                        </div>
                                        <div class="form-group">
                                            <label for="input-email">Email</label>
                                            <input type="text" class="form-control form-control-alt" id="input-email" name="email" v-model="email">
                                        </div>
                                        <div class="form-group">
                                            <label for="input-password">Password</label>
                                            <input type="password" class="form-control form-control-alt" id="input-password" name="password" v-model="password">
                                        </div>
                                        <div class="form-group">
                                            <label for="input-confirm-password">Confirm Password</label>
                                            <input type="password" class="form-control form-control-alt" id="input-confirm-password" name="confirmPassword" v-model="confirm_password">
                                        </div>
                                        <div class="form-group text-center">
                                            <button type="submit" class="btn btn-primary center-block">Add User</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
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
    middleware: 'adminAuth',
    head() {
        title: 'Add User - Admin'
    },
    data() {
        return {
            username: '',
            name: '',
            phone_number: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    },
    computed: {
        ...mapState({
            addStatus: state => state.user.doAdd
        })
    },
    methods: {
        formatDate: (date) => moment(new Date(date)).format('YYYY/MM/DD'),
        ...mapActions({
            addUser: 'user/addUser'
        })
    }
}
</script>

<style>

</style>