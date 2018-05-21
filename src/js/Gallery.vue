<template>
    <div id="gallery">
        <div class="photos" v-if="photos.data.length > 0">
            <div class="card-columns">
                <div class="card" v-for="(photo, index) in photos.data" :key="index">
                    <img class="card-img-top img-fluid" :src="photo.urls.thumb" :alt="photo.description" :title="photo.description">
                </div>
            </div>
        </div>
        <div v-else>
            There are no photos to display
        </div>
    </div>
</template>

<script>
export default {
    name: "gallery",
    props: [
        "photos"
    ],
    mounted() {
        console.log("Mounted Gallery");
    }
}
</script>
