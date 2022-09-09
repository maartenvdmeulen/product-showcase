<template>
  <div class="w-11/12 xl:w-8/12 m-auto transition-all duration-500" v-if="products"> 
    <!-- control header -->
    <div class="bg-yellow-600 my-4 p-4 text-white flex gap-x-1 md:gap-x-4 rounded-md">
      <div>🔍 <b>Filter</b></div>
      <div>
        <label for="category">Categories:</label>
        <select v-model="category" name="categories" id="category" class="text-gray-700">
          <option key="blank" value="blank" />
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div>
        <label for="brand">Brand:</label>
        <select v-model="brand" name="brands" id="brand" class="text-gray-700">
          <option key="blank" value="blank" />
          <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
        </select>
      </div>
      <div>
        <label for="sale">🏷️ Offers</label>
        <input v-model="sale" type="checkbox" id="sale" name="sale" class="m-auto">
      </div>
      <div class="flex-1"></div>
      <div class="italic">{{ filteredProducts.length }} of {{ products.length }}</div>
    </div>
    <!-- products -->
    <div  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      <ProductCard v-for="(p, i) in filteredProducts" :key="p.productID" :product="p" :index="i" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { Product, TransformProductsData } from '~/models/Product'

export default Vue.extend({
  name: 'IndexPage',
  head() {
    return {
      title: "productshowcase - products overview",
      meta: [
        {
          hid: 'products overview',
          name: 'products overview',
          content: 'Home page products overview'
        }
      ]
    }
  },
  data() {
    return {
      products: [] as Product[],
      brands: [] as string[],
      categories: [] as string[],
      category: "blank",
      brand: "blank",
      sale: false,
    }
  },
  created() {
    console.log("mount")
    this.clearCounter()
  },
  async fetch() {
    const requestURL = process.env.API_ENDPOINT + '?api_key=' + process.env.API_KEY
    this.products = TransformProductsData(await this.$axios.$get(requestURL))
    this.brands = [...new Set(this.products.map(x => x.brandDescription).filter(x => x != undefined) as string[])]
    this.categories = [...new Set(this.products.map(x => x.groupDescription).filter(x => x != undefined) as string[])]
  },
  computed: {
    filteredProducts(): Product[] {
      let filteredProducts: Product[] = [...this.products]
      if (this.category != "blank")
        filteredProducts = filteredProducts.filter(x => x.groupDescription == this.category)
      if (this.brand != "blank")
        filteredProducts = filteredProducts.filter(x => x.brandDescription == this.brand)
      if (this.sale) filteredProducts = filteredProducts.filter(x => x.offerings)
      return filteredProducts
    }
  },
  methods: {
    ...mapMutations({
      clearCounter: "shoppingcart/reset"
    })
  }
})
</script>
