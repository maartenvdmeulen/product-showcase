<template>
  <div>
    {{ products }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      products: undefined as any
    }
  },
  created() {
    console.log(this.products)
  },
  async fetch() {
    const requestURL = process.env.API_ENDPOINT + '?api_key=' + process.env.API_KEY
    this.products = await this.$axios.$get(requestURL)
  }
})
</script>
