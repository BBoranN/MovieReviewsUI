<template>
    <div class="Container">
        <input type="text" v-model="mediaTitle" placeholder="Title" />
        <input type="text" v-model="mediaDescription" placeholder="Description" />
        <input type="text" v-model="mediaFotoUrl" placeholder="FotoUrl" />
        <input type="text" v-model="mediaGenre" placeholder="genre">
        <input type="text" placeholder="director">

        <input type="radio" id="movie" value="Movie" v-model="mediaType">
        <label for="movie">Movie</label>
        <input type="radio" id="series" value="Series" v-model="mediaType">
        <label for="series">Series</label>

        <button @click="Add">Add</button>
        <button>Back</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const mediaTitle= ref('');
const mediaDescription = ref('');
const mediaFotoUrl = ref('');
const mediaGenre = ref('');
const mediaType = ref('');

function Add(){
    console.log('Add function called'); // Add this line
    console.log('mediaType:', mediaType.value); // And this line
}
</script>

<style scoped>

label{
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
}

</style>
