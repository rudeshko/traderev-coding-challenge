<template>
    <div class="pages">
        <div v-for="(page, index) in pagination" :key="index" class="page" :class="page == currentPage ? 'active' : ''" @click="go(page)">
            {{page}}
        </div>
    </div>
</template>

<script>
import unsplash from './unsplash.js';

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
        go(index) {
            if (index !== "...") {
                this.$emit("getPage", index);
            }
        },

        generatePages() {
            this.pagination = [];

            //First and last are always displayed
            this.pagination.push(1);

            let startPage = (this.currentPage - 3);
            let endPage = (this.currentPage + 3);

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
        "currentPage": function (oldVal, newVal) {
            this.generatePages();
        }
    }
}
</script>
