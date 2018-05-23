<template>
    <div class="component gallery">
        Show:
        <select v-model="perPage">
            <option v-for="(perPage, index) in perPageList" :key="index" :value="perPage">{{perPage}}</option>
        </select>
        <hr />

        <div class="photos" v-if="photos.length > 0">
            <div class="card-columns">
                <div class="card" v-for="(photo, index) in photos" :key="index" @click="showPopup(index)" :id="'photo_' + photo.id">
                    <img class="card-img img-fluid" :src="photo.urls.thumb" :alt="photo.description" :title="photo.description" />
                </div>
            </div>
        </div>
        <div v-else>
            There are no photos to display
        </div>

        <pagination v-if="totalPages > 0" :currentPage="currentPage" :totalPages="totalPages" :perPage="perPage" @getPage="getPageEvent"></pagination>

        <div class="popup" v-if="popup.show && popup.photo != null">
            <div class="preview">
                <img :src="popup.photo.urls.regular" :alt="popup.photo.description" :title="popup.photo.description" />
            </div>
            <div class="actions goPrev" @click="goPrev()"><i class="fas fa-arrow-left"></i></div>
            <div class="actions goNext" @click="goNext()"><i class="fas fa-arrow-right"></i></div>
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

/**
 * Gallery component is responsible for displaying a list of photos, provided
 * from its parent component. It includes pagination in a separate component,
 * as well as "Display per page" dropdown.
 * It also has a popup area that displays image in full screen.
 */
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
        perPage: null,
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

        //This sets the default Per Page number, as well as calculates the number of
        //pages there are by using the total number of photos
        if (this.total > 0) {
            this.perPage = this.photos.length;
            this.totalPages = Math.ceil(this.total / this.perPage);
        }
    },
    methods: {
        /**
         * @description This functions activates the popup
         * @param {*} index Index of the photo in the array
         */
        showPopup(index) {
            //It goes to the anchor of the photo so that when the popup is dismissed,
            //the photo that was viewed stays on screen.
            window.location.href = ("#photo_" + this.photos[index].id);
            this.popup = {
                index: index,
                photo: this.photos[index],
                show: true,
                newIndex: null
            };
        },

        /**
         * @description Hides the popup and unsets all of the values
         */
        closePopup() {
            this.popup = {
                index: null,
                photo: null,
                show: false,
                newIndex: null
            };
        },

        /**
         * @description Goes to the previous photo in the array unless it's the first photo.
         * In that case, it attempts to load the previous page and show the last photo in the
         * new array.
         */
        goPrev() {
            if (this.popup.index > 0) {
                this.showPopup((this.popup.index - 1));
            } else if (this.currentPage > 1) {
                this.popup.newIndex = (this.perPage - 1);
                //Must let the parent know to get the previous page
                this.$emit("getPhotos", {
                    page: --this.currentPage,
                    perPage: this.perPage
                });
            }
        },

        /**
         * @description Goes to the next photo in the array unless it's the last photo.
         * In that case, it attempts to load the next page and show the first photo in the
         * new array.
         */
        goNext() {
            if (this.popup.index < (this.photos.length - 1)) {
                this.showPopup((this.popup.index + 1));
            } else if (this.currentPage < this.totalPages) {
                this.popup.newIndex = 0;
                //Must let the parent know to get the previous page
                this.$emit("getPhotos", {
                    page: ++this.currentPage,
                    perPage: this.perPage
                });
            }
        },

        /**
         * @description This is an event trigger from Pagination component.
         * When Pagination requests to switch the page, this component updates
         * its values, and lets the parent know that a new page needs to be loaded.
         * @param {*} page Page number to load
         */
        getPageEvent(page) {
            this.currentPage = page;
            this.$emit("getPhotos", {
                page: page,
                perPage: this.perPage
            });
        }
    },
    watch: {
        /**
         * When Per Page number is changed by the user, it must request a new list of photos
         * from the parent, and recalculate the total number of pages.
         * It currently goes to the first page because the order is lost.
         */
        "perPage": function (oldVal, newVal) {
            this.currentPage = 1;
            this.$emit("getPhotos", {
                page: 1,
                perPage: this.perPage
            });

            this.totalPages = Math.ceil(this.total / this.perPage);
        },

        /**
         * When the list of photos changes, this component needs to go back to top,
         * show the new popup in case it was changed by the popup in the first place
         */
        "photos": function (oldVal, newVal) {
            if (this.popup.newIndex != null) {
                this.showPopup(this.popup.newIndex);
            }

            window.location.href = "#top";
        },
    }
}
</script>
