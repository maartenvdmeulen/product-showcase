<template>
  <div class="w-11/12 xl:w-8/12 py-4 m-auto transition-all duration-500">
    <div v-if="!productExists">
      <nuxt-link to="/">Product with id {{ this.$route.params.productId }} not found</nuxt-link>
    </div>
    <FullProductCard v-else :product="product"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Product, TransformProductsData } from '~/models/Product'

  export default Vue.extend({
     head() {
      return {
        title: `productshowcase - product`,
        meta: [
          {
            hid: `product details`,
            name: `product details`,
            content: `product details`,
          }
        ]
      }
    },
    data() {
      return {
        productExists: true,
        product: {} as Product,
      }
    },
    async fetch() {
      const requestURL = process.env.API_ENDPOINT + '?api_key=' + process.env.API_KEY
      const products = await this.$axios.$get(requestURL)
      const rawProduct = products.find((x: any) => x.ProductID == this.$route.params.productId)
      if (rawProduct == undefined) {
        this.productExists = false
        return
      }
      this.product = TransformProductsData([rawProduct])[0]
    },
  })
</script>