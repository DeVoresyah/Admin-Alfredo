<template>
  <!-- Main Container -->
  <main id="main-container">
    <!-- Hero -->
    <div class="bg-image overflow-hidden" style="background-image: url('assets/media/photos/photo3@2x.jpg');">
      <div class="bg-primary-dark-op">
        <div class="content content-narrow content-full">
          <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center mt-5 mb-2 text-center text-sm-left">
            <div class="flex-sm-fill">
              <h1 class="font-w600 text-white mb-0">Dashboard</h1>
              <h2 class="h4 font-w400 text-white-75 mb-0">Welcome Administrator</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END Hero -->

    <!-- Page Content -->
    <div class="content content-narrow">
      <!-- Stats -->
      <div class="row">
        <div class="col-md-4 col-lg-4">
          <a class="block block-rounded block-link-pop border-left border-primary border-4x" href="javascript:void(0)">
          <div class="block-content block-content-full">
            <div class="font-size-sm font-w600 text-uppercase text-muted">Users</div>
            <div class="font-size-h2 font-w400 text-dark">{{ dashboard.data && dashboard.data.totalUser }}</div>
          </div>
        </a>
        </div>
        <div class="col-md-4 col-lg-4">
          <a class="block block-rounded block-link-pop border-left border-primary border-4x" href="javascript:void(0)">
            <div class="block-content block-content-full">
              <div class="font-size-sm font-w600 text-uppercase text-muted">Orders</div>
              <div class="font-size-h2 font-w400 text-dark">{{ dashboard.data && dashboard.data.totalOrder }}</div>
            </div>
          </a>
        </div>
        <div class="col-md-4 col-lg-4">
          <a class="block block-rounded block-link-pop border-left border-primary border-4x" href="javascript:void(0)">
            <div class="block-content block-content-full">
              <div class="font-size-sm font-w600 text-uppercase text-muted">Earnings</div>
              <div class="font-size-h2 font-w400 text-dark">Rp{{ dashboard.data && dashboard.data.earnings > 0 ? formatIdr(dashboard.data.earnings) : 0 }}</div>
            </div>
          </a>
        </div>
      </div>
      <!-- END Stats -->

      <!-- Customers and Latest Orders -->
      <div class="row row-deck">
        <!-- Latest Customers -->
        <div class="col-lg-6 col-md-6">
          <div class="block block-mode-loading-oneui">
            <div class="block-header border-bottom">
              <h3 class="block-title">Latest Customers</h3>
              <div class="block-options">
                <button type="button" class="btn-block-option" data-toggle="block-option" data-action="state_toggle" data-action-mode="demo">
                  <i class="si si-refresh"></i>
                </button>
              </div>
            </div>
            <div class="block-content block-content-full">
              <table class="table table-striped table-hover table-borderless table-vcenter font-size-sm mb-0">
                <thead class="thead-dark">
                  <tr class="text-uppercase">
                    <th class="font-w700" style="width: 80px;">Username</th>
                    <th class="font-w700">Name</th>
                    <th class="font-w700">Email</th>
                  </tr>
                </thead>
                <tbody v-if="dashboard.data">
                  <tr v-for="(item, index) in dashboard.data.users" :key="index">
                      <td class="font-w600">
                        {{ item.username }}
                      </td>
                      <td class="font-w600">
                        {{ item.name }}
                      </td>
                      <td class="font-w600">
                        {{ item.email }}
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- END Latest Customers -->

        <!-- Latest Orders -->
        <div class="col-lg-6 col-md-6">
          <div class="block block-mode-loading-oneui">
            <div class="block-header border-bottom">
              <h3 class="block-title">Latest Orders</h3>
              <div class="block-options">
                <button type="button" class="btn-block-option" data-toggle="block-option" data-action="state_toggle" data-action-mode="demo">
                  <i class="si si-refresh"></i>
                </button>
              </div>
            </div>
            <div class="block-content block-content-full">
              <table class="table table-striped table-hover table-borderless table-vcenter font-size-sm mb-0">
                <thead class="thead-dark">
                  <tr class="text-uppercase">
                    <th class="d-none d-sm-table-cell font-w700">Date</th>
                    <th class="font-w700">Invoice</th>
                    <th class="font-w700">Status</th>
                    <th class="d-none d-sm-table-cell font-w700 text-right" style="width: 120px;">Total</th>
                  </tr>
                </thead>
                <tbody v-if="dashboard.data">
                  <tr v-for="(item, index) in dashboard.data.orders" :key="index">
                    <td class="d-none d-sm-table-cell">
                      <span class="font-size-sm text-muted">{{ formatDate(item.created_at) }}</span>
                    </td>
                    <td>
                      <span class="font-w600">#{{ item.invoice_id }}</span>
                    <td>
                      <span class="font-w600 badge badge-warning" v-if="item.status == 'waiting_payment'">Waiting Payment</span>
                      <span class="font-w600 badge badge-warning" v-else-if="item.status == 'pending'">Pending</span>
                      <span class="font-w600 badge badge-primary" v-else-if="item.status == 'paid'">Paid</span>
                      <span class="font-w600 badge badge-success" v-else>Done</span>
                    </td>
                    <td class="d-none d-sm-table-cell text-right">
                      Rp{{ formatIdr(item.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- END Latest Orders -->
      </div>
      <!-- END Customers and Latest Orders -->
    </div>
    <!-- END Page Content -->
  </main>
  <!-- END Main Container -->
</template>

<script>
import moment from 'moment'
import TextUtil from '../lib/TextUtil'
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'dashboard',
  head() {
    title: 'Dashboard - Admin'
  },
  computed: {
    ...mapState({
      dashboard: state => state.dashboard.stats
    })
  },
  methods: {
    formatIdr: (int) => new TextUtil().formatMoney(int),
    formatDate: (date) => moment(new Date(date)).format('DD/MM/YYYY')
  }
}
</script>

<style>

</style>
