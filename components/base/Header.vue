<template>
    <div class="h-16 bg-yellow-600 flex text-center text-white">
        <img src="~/assets/logo.svg" alt="logo" class="p-3">
        <NuxtLink to="/" class="website-name pr-4 m-auto text-center text-lg font-normal">ProcuctShowcase</NuxtLink>
        <nav class="m-auto space-x-4">
            <NuxtLink to="/" class="hover:text-blue-300">Products</NuxtLink> 
            <NuxtLink to="/product/19283" class="hover:text-blue-300">Product 1</NuxtLink> 
        </nav>
        <div class="flex-1"></div>
        <div class="m-auto">Total: {{ counter }}</div>
        <img src="~/assets/cart.svg" alt="cart" class="p-4" >
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapGetters } from 'vuex'

    export default Vue.extend({
        computed: {
            ...mapGetters({
                counter: "shoppingcart/getCounter"
            })
        }
    })
</script>

<style lang="css" scoped>
a.nuxt-link-exact-active {
    font-weight: bold;
}
a.nuxt-link-active.website-name {
    font-weight: normal;
}
</style>