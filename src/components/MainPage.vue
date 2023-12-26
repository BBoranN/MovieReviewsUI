<template>
    <div class="Main">
        <div>
            <input type="text" placeholder="Search...">
            <button>Search</button>
        </div>
        <div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import axios from 'axios';

    const searchTerm = ref('');
    const medias = ref([]);
    
</script>

<style scoped>

.Main{
    display: grid;
    justify-items: center;
    object-fit:cover;
}


</style>