<template>
    <div class="Container">
        <div class="InputDiv">
            <input type="text" v-model="mediaTitle" placeholder="Title" />
            <input type="text" v-model="mediaDescription" placeholder="Description" />
            <input type="text" v-model="mediaGenre" placeholder="genre">
            <input type="text" v-model ="mediaDirector" placeholder="director">
            <input type="text" v-model="mediaPhotoUrl" placeholder="photoUrl">
        </div>
        <div class="Radio">
            <input type="radio" id="movie" value="Movie" v-model="mediaType">
            <label for="movie">Movie</label>
            <input type="radio" id="series" value="Series" v-model="mediaType">
            <label for="series">Series</label>
        </div>
        <div class="AddMediaButtonDiv">
            <button @click="Add">Add</button>
            <button @click="Back">Back</button>
        </div>
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

.Container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 90%;
    height: 80%;
    margin-top: 10%;
}

input {
    padding: 10px;
    padding-right: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    transition: all 0.3s ease;
    width: 100%;
    font-size: 1rem;
}
.Radio{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 20%;
    margin-top: 5%;
}
button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #680fbb;
    color: white;
    font-size: 1.3rem;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
}

button:hover {
    background: #680fbb;
}

button:active {
    background: #004085;
}
.AddMediaButtonDiv{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 20%;
    margin-top: 5%;
}
.InputDiv{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 60%;
    margin-top: 5%;
}
</style>
