<template>
    <div class="container component app">
        <div class="heading">Dima Rudeshko - TradeRev Coding Challenge</div>
        <div class="body" v-if="photos != null">
            <gallery :photos="photos" :total="total" @getPhotos="getPhotosEvent"></gallery>

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

export default {
    name: "app",
    data: () => ({
        photos: null,
        total: 0
    }),
    components: {
        Gallery
    },
    mounted() {
        this.getPhotos(1, 20);
    },
    methods: {
        getPhotos(page, perPage) {
            let component = this;
            unsplash.getPhotos(page, perPage).then(photos => {
                component.photos = photos.data;
                component.total = photos.headers['x-total'];
            }).catch(e => {
                console.log(e);
            });
        },

        getPhotosEvent(data) {
            this.getPhotos(data.page, data.perPage);
        }
    }
}
</script>

<style lang="sass">
@import '../scss/app.scss'
</style>
