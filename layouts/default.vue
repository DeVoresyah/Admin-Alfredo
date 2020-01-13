<template>
  <div id="page-container" class="sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed">
    <!-- Sidebar -->
    <nav id="sidebar" aria-label="Main Navigation">
      <!-- Side Header -->
      <div class="content-header bg-white-5">
        <!-- Logo -->
        <nuxt-link class="font-w600 text-dual" to="/">
          <span class="font-w700 font-size-h5">Admin Panel</span>
        </nuxt-link>
        <!-- END Logo -->
      </div>
      <!-- END Side Header -->

      <!-- Side Navigation -->
      <div class="content-side content-side-full">
        <ul class="nav-main">
          <li class="nav-main-item">
            <nuxt-link class="nav-main-link" to="/">
              <span class="nav-main-link-name">Dashboard</span>
            </nuxt-link>
          </li>
          <li class="nav-main-item">
            <nuxt-link class="nav-main-link" to="/user">
              <span class="nav-main-link-name">Users</span>
            </nuxt-link>
          </li>
          <li class="nav-main-item">
            <nuxt-link class="nav-main-link" to="/product">
              <span class="nav-main-link-name">Products</span>
            </nuxt-link>
          </li>
          <li class="nav-main-item">
            <nuxt-link class="nav-main-link" to="/category">
              <span class="nav-main-link-name">Category</span>
            </nuxt-link>
          </li>
          <li class="nav-main-item">
            <nuxt-link class="nav-main-link" to="/order">
              <span class="nav-main-link-name">Orders</span>
            </nuxt-link>
          </li>
          <li class="nav-main-item">
            <nuxt-link class="nav-main-link" to="/payment-confirmations">
              <span class="nav-main-link-name">Payment Confirmation</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <!-- END Side Navigation -->
    </nav>
    <!-- END Sidebar -->

    <!-- Header -->
    <header id="page-header">
      <!-- Header Content -->
      <div class="content-header">
        <!-- Left Section -->
        <div class="d-flex align-items-center">
          <!-- Toggle Sidebar -->
          <!-- Layout API, functionality initialized in Template._uiApiLayout()-->
          <button type="button" class="btn btn-sm btn-dual mr-2 d-lg-none" data-toggle="layout" data-action="sidebar_toggle">
            <i class="fa fa-fw fa-bars"></i>
          </button>
          <!-- END Toggle Sidebar -->
        </div>
        <!-- END Left Section -->

        <!-- Right Section -->
        <div class="d-flex align-items-center">
          <!-- User Dropdown -->
          <div class="dropdown d-inline-block ml-2">
            <button type="button" class="btn btn-sm btn-dual" id="page-header-user-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img class="rounded" src="assets/media/avatars/avatar10.jpg" alt="Header Avatar" style="width: 18px;">
              <span class="d-none d-sm-inline-block ml-1">Admin</span>
              <i class="fa fa-fw fa-angle-down d-none d-sm-inline-block"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right p-0 border-0 font-size-sm" aria-labelledby="page-header-user-dropdown">
              <div class="p-3 text-center bg-primary">
                <img class="img-avatar img-avatar48 img-avatar-thumb" src="assets/media/avatars/avatar10.jpg" alt="">
              </div>
              <div class="p-2">
                <a class="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                  <span>Settings</span>
                  <i class="si si-settings"></i>
                </a>
                <div role="separator" class="dropdown-divider"></div>
                <a class="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)" @click="doLogout">
                  <span>Log Out</span>
                  <i class="si si-logout ml-1"></i>
                </a>
              </div>
            </div>
          </div>
          <!-- END User Dropdown -->
          <!-- Toggle Side Overlay -->
        </div>
        <!-- END Right Section -->
      </div>
      <!-- END Header Content -->

      <!-- Header Loader -->
      <!-- Please check out the Loaders page under Components category to see examples of showing/hiding it -->
      <div id="page-header-loader" class="overlay-header bg-white">
          <div class="content-header">
              <div class="w-100 text-center">
                  <i class="fa fa-fw fa-circle-notch fa-spin"></i>
              </div>
          </div>
      </div>
      <!-- END Header Loader -->
    </header>
    <!-- END Header -->
    
    <nuxt/>

    <!-- Footer -->
    <footer id="page-footer" class="bg-body-light">
      <div class="content py-3">
        <div class="row font-size-sm">
          <div class="col-sm-6 order-sm-2 py-1 text-center text-sm-right">
            Build with <i class="fa fa-heart text-danger"></i> by <a class="font-w600" href="https://edorahayu.github.io" target="_blank">Edo Rahayu</a>
          </div>
          <div class="col-sm-6 order-sm-1 py-1 text-center text-sm-left">
            All Right Reserved &copy; <span data-toggle="year-copy"></span>
          </div>
        </div>
      </div>
    </footer>
    <!-- END Footer -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  data() {
    return {
      path: this.$route.path
    }
  },
  computed: {
    ...mapState({
      session: state => state.auth.session
    })
  },
  methods: {
    ...mapActions({
      doLogout: 'auth/doLogout'
    })
  }
}
</script>

<style>
</style>
