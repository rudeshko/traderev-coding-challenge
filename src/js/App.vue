<template>
    <div class="container component app">
        <div class="heading">Dima Rudeshko - TradeRev Coding Challenge</div>
        <div class="body" v-if="photos != null">
            <gallery :photos="photos" :total="total" @getPhotos="getPhotosEvent"></gallery>

            <hr />
            <div class="footer">&copy; <a href="http://dima.rudeshko.net/" target="_blank">Dima Rudeshko</a> | View source on <a href="https://bitbucket.org/rudeshko/traderev-gallery/src/master/" target="_blank">Bitbucket</a></div>
        </div>
        <div v-else class="loading">
            <i class="fas fa-cog fa-spin"></i>
        </div>
    </div>
</template>

<script>
import unsplash from './unsplash.js';
import Gallery from './Gallery.vue';

/**
 * This is the main app component that's responsible for the main layout
 * The only action it currently performs is calls a gallery component
 */
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
        /**
         * Get initial 20 photos
         */
        this.getPhotos(1, 20);
    },
    methods: {
        /**
         * @description Gets a list of photos from Unsplash
         * @param {*} page Page number of the list
         * @param {*} perPage Photos per page
         */
        getPhotos(page, perPage) {
            let component = this;
            unsplash.getPhotos(page, perPage).then(photos => {
                component.photos = photos.data;
                component.total = photos.headers['x-total'];
            }).catch(e => {
                console.log(e);
            });
        },

        /**
         * @description Even trigger - When child component(Gallery) requests to
         * get new photos, this component is triggered.
         * @param {*} data Includes Page number and Per Page number
         */
        getPhotosEvent(data) {
            this.getPhotos(data.page, data.perPage);
        }
    }
}
</script>

<style lang="sass">
@import '../scss/app.scss'
</style>
