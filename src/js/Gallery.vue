<template>
    <div class="component gallery">
        <div class="photos" v-if="photos.data.length > 0">
            <div class="card-columns">
                <div class="card" v-for="(photo, index) in photos.data" :key="index" @click="showPopup(index)">
                    <img class="card-img img-fluid" :src="photo.urls.thumb" :alt="photo.description" :title="photo.description" />
                </div>
            </div>
        </div>
        <div v-else>
            There are no photos to display
        </div>

        <div class="popup" v-if="popup.show && popup.photo != null">
            <div class="preview">
                <img :src="popup.photo.urls.regular" :alt="popup.photo.description" :title="popup.photo.description" />
            <div class="about">
                <div class="author"><i class="fas fa-user"></i> <a :href="popup.photo.user.links.html" target="_blank">{{popup.photo.user.name}}</a></div>
                <div class="location" v-if="popup.photo.user.location != null"><i class="fas fa-compass"></i> {{popup.photo.user.location}}</div>
                <div class="likes"><i class="fas fa-heart"></i> {{popup.photo.likes}}</div>
                <div class="bio" v-if="popup.photo.user.bio != null">{{popup.photo.user.bio}}</div>
            </div>
            </div>
            <div class="close" @click="closePopup()"><i class="fas fa-times"></i></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "gallery",
    data: () => ({
        popup: {
            show: false,
            photo: null
        }
    }),
    props: [
        "photos"
    ],
    mounted() {
        console.log("Mounted Gallery");
    },
    methods: {
        showPopup(index) {
            this.popup.photo = this.photos.data[index];
            this.popup.show = true;
        },

        closePopup() {
            //TODO: Make sure it stays on the right page, might need to reload photos using this.$parent.loadPhotos();
            this.popup.photo = null;
            this.popup.show = false;
        },

        goPrev() {
            ;
        },

        goNext() {
            ;
        }
    }
}
</script>
