<template>
    <div class="container component app">
        <div class="heading">Dima Rudeshko - TradeRev Coding Challenge</div>
        <div class="body" v-if="photos != null">
            Show:
            <select v-model="per_page">
                <option v-for="(per_page, index) in per_page_list" :key="index" :value="per_page">{{per_page}}</option>
            </select>
            <hr />

            <gallery :photos="photos"></gallery>
            <pagination></pagination>

            <hr />
            <div class="footer">View source on <a href="https://bitbucket.org/rudeshko/traderev-gallery/src/master/" target="_blank">Bitbucket</a></div>
        </div>
        <div v-else class="loading">
            <i class="fas fa-cog fa-spin"></i>
        </div>
    </div>
</template>

<script>
import unsplash from './unsplash.js';
import Gallery from './Gallery.vue';
import Pagination from './Pagination.vue';

export default {
    name: "app",
    data: () => ({
        photos: null,
        page: 1,
        per_page: 20,
        per_page_list: [10, 20, 30]
    }),
    components: {
        Gallery,
        Pagination
    },
    mounted() {
        this.loadPhotos(1, this.per_page);
    },
    methods: {
        loadPhotos(page, per_page) {
            let component = this;
            unsplash.getPhotos(page, per_page).then(photos => {
                component.photos = photos;
            }).catch(e => {
                console.log(e);
            });
        }
    },
    watch: {
        //Can't use arrow functions, because `this` context will be lost
        "per_page": function (oldVal, newVal) {
            if (newVal != oldVal) {
                this.loadPhotos(1, this.per_page);
            }
        }
    }
}
</script>

<style lang="sass">
@import '../scss/app.scss'
</style>
