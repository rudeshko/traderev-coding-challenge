<template>
    <div class="pages" id="pagination">
        <div v-if="currentPage > 1" class="page actions" @click="go(1)"><i class="fas fa-angle-double-left"></i></div>
        <div v-if="currentPage > 1" class="page actions" @click="go(currentPage - 1)"><i class="fas fa-angle-left"></i></div>

        <div v-for="(page, index) in pagination" :key="index" class="page" :class="{active: (page == currentPage), dots: (page == '...')}" @click="go(page)">{{page}}</div>

        <div v-if="currentPage < totalPages" class="page actions" @click="go(currentPage + 1)"><i class="fas fa-angle-right"></i></div>
        <div v-if="currentPage < totalPages" class="page actions" @click="go(totalPages)"><i class="fas fa-angle-double-right"></i></div>
    </div>
</template>

<script>
import unsplash from './unsplash.js';

/**
 * This component is responsible for only the pagination part of the gallery
 * It displays a list of pages, with shortcuts (...)
 * This component generates the list on each component change
 */
export default {
    name: "pagination",
    data: () => ({
        pagination: []
    }),
    props: [
        "currentPage",
        "totalPages",
        "perPage"
    ],
    mounted() {
        this.generatePages();
    },
    methods: {
        /**
         * @description This function goes to a different page requested by user
         * @param {*} page Page number to go to
         */
        go(page) {
            if (page != "..." && this.currentPage != page) {
                //It must let the parent know to get the new page
                this.$emit("getPage", page);
                window.location.href = "#top";
            }
        },

        /**
         * @description This function generates a list of page links to display
         * to the user.
         */
        generatePages() {
            this.pagination = [];

            //First and last are always displayed
            this.pagination.push(1);

            //Assuming there's only one page
            if (this.totalPages == 1) {
                return;
            }

            //Offset is 3 pages to each side of the current page
            let offset = 3;
            let startPage = (this.currentPage - offset);
            let endPage = (this.currentPage + offset);

            //Displays '...' when there's a gap between the numbers
            if (startPage > 2) {
                this.pagination.push("...");
            }

            for (let i = startPage; i <= endPage; i++) {
                if (i > 1 && i < this.totalPages) {
                    this.pagination.push(i);
                }
            }

            if (endPage < (this.totalPages - 1)) {
                this.pagination.push("...");
            }
            this.pagination.push(this.totalPages);
        }
    },
    watch: {
        /**
         * When current page changes outside of this component, it must regenerate itself
         */
        "currentPage": function (oldVal, newVal) {
            this.generatePages();
        },

        /**
         * When total pages changes (user selected a different "Show" number), it must
         * regenerate itself
         */
        "totalPages": function (oldVal, newVal) {
            this.generatePages();
        }
    }
}
</script>
