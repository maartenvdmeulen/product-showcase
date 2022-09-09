<template>
    <div class="bg-yellow-600 p-3 text-white flex rounded-md">
        <NuxtLink :to="'/product/' + product.productID">
            <nuxt-img
                v-if="index < 15"
                :src="`/products/${product.image}`"
                :alt="'Image of ' + product.mainDescription"
                class="h-36 bg-white rounded-md"
                format="webp"
                heigth="144px"
                width="144px"
                preload
                />
            <nuxt-img
                v-else
                :src="`/products/${product.image}`"
                :alt="'Image of ' + product.mainDescription"
                class="h-36 bg-white rounded-md"
                format="webp"
                heigth="144px"
                width="144px"
                loading="lazy"
                />
        </NuxtLink>
        <div class="ml-4">
            <NuxtLink :to="'/product/' + product.productID">
                <div><b>{{ product.mainDescription }}</b></div>
                <div v-if="product.brandId">
                    {{ product.brandDescription }}
                </div>
                <div :class="{ 'text-red-300 font-bold' : product.offerings }">
                    <i>€{{ product.price }}</i>
                    <template v-if="product.offerings">🏷️</template>
                </div>
            </NuxtLink>
            <div class="text-xl pt-3">
                <button @click="add" class="hover:text-blue-400 w-7 bg-gray-400 rounded-md">+</button>
                {{ count }}
                <button @click="min" class="hover:text-blue-400 w-7 bg-gray-400 rounded-md">-</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import { mapMutations } from 'vuex'
    import { Product } from '~/models/Product'

    export default Vue.extend({
        props: {
            product: {
                type: Object as PropType<Product>,
                required: true,
            },
            index: {
                type: Number,
                required: true,
            }
        },
        data() {
            return {
                count: 0
            }
        },
        methods: {
            add() {
                this.count++
                this.increment()
            },
            min() {
                if (this.count != 0) {
                    this.count--
                    this.decrease()
                }
            },
            ...mapMutations({
                increment: 'shoppingcart/increment',
                decrease: 'shoppingcart/decrease'
            })
        }
    })
</script>