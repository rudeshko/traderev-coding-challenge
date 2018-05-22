<template>
    <div class="component gallery">
        Show:
        <select v-model="perPage">
            <option v-for="(perPage, index) in perPageList" :key="index" :value="perPage">{{perPage}}</option>
        </select>
        <hr />

        <div class="photos" v-if="photos.length > 0">
            <div class="card-columns">
                <div class="card" v-for="(photo, index) in photos" :key="index" @click="showPopup(index)">
                    <img class="card-img img-fluid" :src="photo.urls.thumb" :alt="photo.description" :title="photo.description" />
                </div>
            </div>
        </div>
        <div v-else>
            There are no photos to display
        </div>

        <pagination v-if="totalPages > 0" :currentPage="currentPage" :totalPages="totalPages" :perPage="perPage" @getPage="getPageEvent"></pagination>

        <div class="popup" v-if="popup.show && popup.photo != null">
            <div class="actions goPrev" @click="goPrev()"><i class="fas fa-arrow-left"></i></div>
            <div class="actions goNext" @click="goNext()"><i class="fas fa-arrow-right"></i></div>
            <div class="preview">
                <img :src="popup.photo.urls.regular" :alt="popup.photo.description" :title="popup.photo.description" />
            </div>
            <div class="about">
                <div class="author"><i class="fas fa-user"></i> <a :href="popup.photo.user.links.html" target="_blank">{{popup.photo.user.name}}</a></div>
                <div class="location" v-if="popup.photo.user.location != null"><i class="fas fa-compass"></i> {{popup.photo.user.location}}</div>
                <div class="likes"><i class="fas fa-heart"></i> {{popup.photo.likes}}</div>
                <div class="bio" v-if="popup.photo.user.bio != null">{{popup.photo.user.bio}}</div>
            </div>
            <div class="close" @click="closePopup()"><i class="fas fa-times"></i></div>
        </div>
    </div>
</template>

<script>
import unsplash from './unsplash.js';
import Pagination from './Pagination.vue';

export default {
    name: "gallery",
    data: () => ({
        popup: {
            index: null,
            show: false,
            photo: null,
            newIndex: null
        },
        currentPage: 1,
        perPage: 20,
        totalPages: 0,
        perPageList: [10, 20, 30],
    }),
    props: [
        "photos",
        "total"
    ],
    components: {
        Pagination
    },
    mounted() {
        console.log("Mounted Gallery");

        if (this.total > 0) {
            this.totalPages = Math.ceil(this.total / this.perPage);
        }
    },
    methods: {
        showPopup(index) {
            this.popup = {
                index: index,
                photo: this.photos[index],
                show: true,
                newIndex: null
            };
        },

        closePopup() {
            this.popup = {
                index: null,
                photo: null,
                show: false,
                newIndex: null
            };
        },

        goPrev() {
            if (this.popup.index > 0) {
                this.showPopup((this.popup.index - 1));
            } else if (this.currentPage > 1) {
                this.popup.newIndex = (this.perPage - 1);
                this.$emit("getPhotos", {
                    page: --this.currentPage,
                    perPage: this.perPage
                });
            }
        },

        goNext() {
            if (this.popup.index < (this.photos.length - 1)) {
                this.showPopup((this.popup.index + 1));
            } else if (this.currentPage < this.totalPages) {
                this.popup.newIndex = 0;
                this.$emit("getPhotos", {
                    page: ++this.currentPage,
                    perPage: this.perPage
                });
            }
        },

        getPageEvent(page) {
            this.currentPage = page;
            this.$emit("getPhotos", {
                page: page,
                perPage: this.perPage
            });
        }
    },
    watch: {
        "perPage": function (oldVal, newVal) {
            this.currentPage = 1;
            this.$emit("getPhotos", {
                page: 1,
                perPage: this.perPage
            });
        },

        "photos": function (oldVal, newVal) {
            this.showPopup(this.popup.newIndex);
        }
    }
}
</script>
