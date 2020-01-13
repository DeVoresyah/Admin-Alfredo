<template>
    <!-- Main Container -->
    <main id="main-container">
        <!-- Hero -->
        <div class="bg-body-light">
            <div class="content content-full">
                <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                    <h1 class="flex-sm-fill h3 my-2">
                        Add Product
                    </h1>
                    <nav class="flex-sm-00-auto ml-sm-3" aria-label="breadcrumb">
                        <ol class="breadcrumb breadcrumb-alt">
                            <li class="breadcrumb-item" aria-current="page">
                                <nuxt-link class="link-fx" to="/">Dashboard</nuxt-link>
                            </li>
                            <li class="breadcrumb-item" aria-current="page">
                                <nuxt-link class="link-fx" to="/product">Products</nuxt-link>
                            </li>
                            <li class="breadcrumb-item">Add Product</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        <!-- END Hero -->

        <!-- Page Content -->
        <div class="content content-narrow">
            <!-- Customers and Latest Orders -->
            <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                    <div class="row">
                        <!-- Latest Customers -->
                        <div class="col-lg-8 col-md-8">
                            <div class="block block-mode-loading-oneui align-items-center">
                                <div class="block-content block-content-full">
                                    <div class="row">
                                        <div class="col-12">
                                            <ValidationProvider rules="required" v-slot="{ errors }">
                                                <div class="form-group">
                                                    <label for="input-product">Product Name</label>
                                                    <input type="text" class="form-control form-control-alt" id="input-product" name="title" v-model="title">
                                                    <span class="text-danger">{{ errors[0] }}</span>
                                                </div>
                                            </ValidationProvider>
                                            
                                            <ValidationProvider rules="required" v-slot="{ errors }">
                                                <div class="form-group">
                                                    <label for="input-price">Price</label>
                                                    <input type="text" class="form-control form-control-alt" id="input-price" name="price" v-model="priceChange">
                                                    <span class="text-danger">{{ errors[0] }}</span>
                                                </div>
                                            </ValidationProvider>
                                            
                                            <ValidationProvider rules="required" v-slot="{ errors }">
                                                <div class="form-group">
                                                    <label for="input-desc">Description</label>
                                                    <textarea class="form-control form-control-alt" id="input-desc" name="desc" rows="7" v-model="desc"></textarea>
                                                    <span class="text-danger">{{ errors[0] }}</span>
                                                </div>
                                            </ValidationProvider>
                                            
                                            <ValidationProvider rules="required" v-slot="{ errors }">
                                                <div class="form-group">
                                                    <label for="input-stock">Stock</label>
                                                    <input type="number" class="form-control form-control-alt" id="input-stock" name="stock" v-model="stock">
                                                    <span class="text-danger">{{ errors[0] }}</span>
                                                </div>
                                            </ValidationProvider>
                                            
                                            <ValidationProvider rules="required" v-slot="{ errors }">
                                                <div class="form-group">
                                                    <label for="input-category">Category</label>
                                                    <select class="custom-select" id="input-category" name="category" v-model="category">
                                                        <option value="">Please select</option>
                                                        <option v-for="(item, index) in categories.data && categories.data.data" :key="index" :value="item.id">{{ item.title }}</option>
                                                    </select>
                                                    <span class="text-danger">{{ errors[0] }}</span>
                                                </div>
                                            </ValidationProvider>
                                            
                                            <div class="form-group text-center">
                                                <button type="submit" class="btn btn-primary center-block" v-if="!addStatus.fetching">Add Product</button>
                                                <span class="btn btn-primary btn-disabled center-block" v-else>Publishing...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-4">
                            <div class="block block-mode-loading-oneui align-items-center">
                                <div class="block-content block-content-full">
                                    <div class="form-group" v-if="!thumbnail">
                                        <label>Thumbnail</label>
                                        <div class="custom-file">
                                            <!-- Populating custom file input label with the selected filename (data-toggle="custom-file-input" is initialized in Helpers.coreBootstrapCustomFileInput()) -->
                                            <input type="file" class="custom-file-input" data-toggle="custom-file-input" id="thumbnail" name="thumbnail" @change="onFileChange">
                                            <label class="custom-file-label" for="thumbnail">Pilih File</label>
                                        </div>
                                        <span class="text-danger">{{ errorThumbnail }}</span>
                                    </div>
                                    <div class="form-group text-center" v-else>
                                        <img :src="imgPreview" class="img-fluid" />
                                        <button class="btn btn-danger center-block mt-3" @click="removeImage">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- END Latest Customers -->
                    </div>
                </form>
            </ValidationObserver>
            <!-- END Customers and Latest Orders -->
        </div>
        <!-- END Page Content -->

    </main>
    <!-- END Main Container -->
</template>

<script>
import moment from 'moment'
import TextUtil from '../../lib/TextUtil'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { mapState, mapActions } from 'vuex'

extend('required', {
  ...required,
  message: `This field is required.`
})

export default {
    middleware: 'category/index',
    head() {
        title: 'Add Product - Admin'
    },
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            title: '',
            price: '',
            desc: '',
            stock: '',
            category: '',
            imgPreview: '',
            thumbnail: null,
            errorThumbnail: ''
        }
    },
    computed: {
        priceChange: {
            get() {
                return this.price
            },
            set(value) {
                const regex = /^[0-9\.]*$/g
                this.price = regex.test(value) ? this.formatIdr(value) : ""
            }
        },
        ...mapState({
            addStatus: state => state.product.doAdd,
            categories: state => state.category.list
        })
    },
    methods: {
        formatDate: (date) => moment(new Date(date)).format('YYYY/MM/DD'),
        formatIdr: (int) => new TextUtil().formatMoney(int),
        moneyToInt: (int) => new TextUtil().moneytoInt(int),
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.thumbnail = files[0]
            this.createImage(files[0])
            this.errorThumbnail = ""
        },
        createImage(file) {
            const image = new Image()
            const reader = new FileReader()
            const vm = this

            reader.onload = (e) => {
                vm.imgPreview = e.target.result
            };
            reader.readAsDataURL(file)
        },
        removeImage(e) {
            this.imgPreview = ''
            this.thumbnail = null
        },
        onSubmit() {
            const { title, price, desc, stock, category, thumbnail } = this

            if (!this.thumbnail) {
                this.errorThumbnail = "Please select thumbnail product"
                return false
            }

            const dataToSend = new FormData()
            dataToSend.append("thumbnail[thumbnail]", thumbnail)
            dataToSend.append("price", this.moneyToInt(price))
            dataToSend.append("title", title)
            dataToSend.append("desc", desc)
            dataToSend.append("stock", stock)
            dataToSend.append("category", category)

            this.addProduct(dataToSend)
        },
        ...mapActions({
            addProduct: 'product/addProduct'
        })
    }
}
</script>

<style>

</style>