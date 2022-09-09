<template>
    <div class="bg-yellow-600 p-3 text-white rounded-md">
        <div class="h-576 bg-white rounded-md">
            <nuxt-img
                :src="`/products/${product.image}`"
                :alt="'Image of ' + product.mainDescription"
                class="h-576 w-576 m-auto"
                format="webp"
                heigth="576px"
                width="576px"
                preload
                />
        </div>
        <div class="ml-4">
            <div><b>{{ product.mainDescription }}</b></div>
            <div v-if="product.brandId">
                {{ product.brandDescription }}
            </div>
            <div :class="{ 'text-red-300 font-bold' : product.offerings }">
                <i>€{{ product.price }}</i>
                <template v-if="product.offerings">🏷️</template>
            </div>
            <template v-if="product.productIngredients">
                <i>Ingredients:</i>
                <div>{{ product.productIngredients }}</div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
import { PropType } from 'vue/types/v3-component-props'
import { Product } from '~/models/Product'

    export default Vue.extend({
        props: {
            product: {
                type: Object as PropType<Product>,
                required: true,
            }
        }
    })
</script>

<style scoped>

</style>