<template>
    <div id="app">
        Testing
    </div>
</template>

<script>
import unsplash from './unsplash.js';

export default {
    name: 'app',
    data: () => ({
        photos: [],
        currentPage: 1
    }),
    created() {
        unsplash.getPhotos();
    }
}
</script>

<style lang="scss">
</style>
