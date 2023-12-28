<template>
    <div class="Container">
        <input type="text" v-model="mediaTitle" placeholder="Title" />
        <input type="text" v-model="mediaDescription" placeholder="Description" />
        <input type="text" v-model="mediaGenre" placeholder="genre">
        <input type="text" v-model ="mediaDirector" placeholder="director">
        <input type="text" v-model="mediaPhotoUrl" placeholder="photoUrl">

        <input type="radio" id="movie" value="Movie" v-model="mediaType">
        <label for="movie">Movie</label>
        <input type="radio" id="series" value="Series" v-model="mediaType">
        <label for="series">Series</label>

        <button @click="Add">Add</button>
        <button @click="Back">Back</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const mediaTitle= ref('');
const mediaDescription = ref('');
const mediaGenre = ref('');
const mediaType = ref('');
const mediaDirector = ref('');
const mediaPhotoUrl = ref('');

async function Add(){
    const token = sessionStorage.getItem('token');
    console.log('Add function called'); // Add this line
    console.log('mediaType:', mediaType.value); // And this line
    if(mediaType.value == 'Movie'){
        await axios.post('https://localhost:7129/api/Media/addMovie',{"title":mediaTitle.value, "description":mediaDescription.value,
        "genre":mediaGenre.value,"photoUrl":mediaPhotoUrl.value, "director":mediaDirector.value,"discriminator":mediaType.value},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).
        then((response) => {
        console.log(response.data);
    })
    }
    else if(mediaType.value == 'Series'){
        await axios.post('https://localhost:7129/api/Media/addSerie',{"title":mediaTitle.value, "description":mediaDescription.value,
        "genre":mediaGenre.value,"photoUrl":mediaPhotoUrl.value, "director":mediaDirector.value,"discriminator":mediaType.value},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).
        then((response) => {
        console.log(response.data);
    })
    }

}
function Back(){
    window.history.back();
}
</script>

<style scoped>

label{
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
}

</style>
