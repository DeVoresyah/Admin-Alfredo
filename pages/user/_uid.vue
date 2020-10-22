<template>
  <!-- Main Container -->
  <main id="main-container">
    <!-- Hero -->
    <div class="bg-body-light">
      <div class="content content-full">
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
          <h1 class="flex-sm-fill h3 my-2">
            Edit User
          </h1>
          <nav class="flex-sm-00-auto ml-sm-3" aria-label="breadcrumb">
            <ol class="breadcrumb breadcrumb-alt">
              <li class="breadcrumb-item" aria-current="page">
                <nuxt-link class="link-fx" to="/">Dashboard</nuxt-link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                <nuxt-link class="link-fx" to="/user">Users</nuxt-link>
              </li>
              <li class="breadcrumb-item">Edit User</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <!-- END Hero -->

    <!-- Page Content -->
    <div class="content content-narrow">
      <div class="row row-deck">
        <div class="col-12">
          <form class="col-12" @submit.prevent="onSubmit">
            <div class="block block-rounded">
              <div class="block-header block-header-default">
                <h3 class="block-title">Edit User</h3>
                <div class="block-options">
                  <button type="submit" class="btn btn-sm btn-primary" v-if="!statusUpdate">Save</button>
                  <button type="submit" class="btn btn-sm btn-primary" disabled v-else>Saving...</button>
                </div>
              </div>
              <div class="block-content">
                <div class="row justify-content-center py-sm-3 py-md-5">
                  <div class="col-sm-10 col-md-8">
                    <div class="form-group">
                      <label for="block-name">Name</label>
                      <input type="text" class="form-control form-control-alt" id="block-name" name="block-name" placeholder="Full name" v-model="name">
                    </div>
                    <div class="form-group">
                      <label for="block-phone">Phone Number</label>
                      <input type="number" class="form-control form-control-alt" id="block-phone" name="block-phone" placeholder="Phone number" v-model="phone">
                    </div>
                    <div class="form-group">
                      <label for="block-email">Email</label>
                      <input type="email" class="form-control form-control-alt" id="block-email" name="block-email" placeholder="Email" v-model="email">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  <!-- END Main Container -->
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  middleware: 'adminAuth',
  head() {
    title: 'Edit User - Admin'
  },
  async asyncData({ params, store }) {
    const { uid } = params

    store.dispatch("user/getDetailUser", { id: uid })
    return {
      uid
    }
  },
  methods: {
    onSubmit() {
      const dataToSend = new FormData()
      dataToSend.append("user[name]", this.dataName(this.uid))
      dataToSend.append("user[phone_number]", this.dataPhone(this.uid))
      dataToSend.append("user[email]", this.dataEmail(this.uid))

      this.doUpdate({ id: this.uid, data: dataToSend })
    },
    ...mapActions({
      doUpdate: "user/updateUser"
    }),
    ...mapMutations({
      editUserName: 'user/editUserName',
      editUserPhone: 'user/editUserPhone',
      editUserEmail: 'user/editUserEmail'
    })
  },
  computed: {
    name: {
      get() {
        return this.dataName(this.uid)
      },
      set(name) {
        this.editUserName({ id: this.uid, name })
      }
    },
    phone: {
      get() {
        return this.dataPhone(this.uid)
      },
      set(phone_number) {
        this.editUserPhone({ id: this.uid, phone_number })
      }
    },
    email: {
      get() {
        return this.dataEmail(this.uid)
      },
      set(email) {
        this.editUserEmail({ id: this.uid, email })
      }
    },
    ...mapGetters({
      dataName: 'user/findName',
      dataPhone: 'user/findPhone',
      dataEmail: 'user/findEmail'
    }),
    ...mapState({
      detailUser: state => state.user.detailUser,
      statusUpdate: state => state.user.doUpdate.fetching
    })
  }
}
</script>
