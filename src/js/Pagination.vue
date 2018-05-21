<template>
    
</template>

<script>
import unsplash from './unsplash.js';

export default {
    name: "pagination",
    data: () => ({
        currentPage: 1
    }),
    mounted() {
        console.log("Mounted Pagination");
    }
}
</script>
