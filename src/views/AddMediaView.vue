<template>
    <div class="Container">
        <div class="CenterContainer">
            <h2 class="TitleText">Add a Media</h2>
            <div class="MediaContainer">
                <label for="mediaTitle">Title:</label>
                <input type="text" id="mediaTitle" v-model="mediaTitle" placeholder="Title" />
            </div>

            <div class="DescContainer">
                <label for="mediaDescription">Description:</label>
                <input type="text" id="mediaDescription" v-model="mediaDescription" placeholder="Description" />
            </div>

            <div class="InputContainer">
                <label for="mediaGenre">Genre:</label>
                <input type="text" id="mediaGenre" v-model="mediaGenre" placeholder="Genre" />
            </div>

            <div class="InputContainer">
                <label for="mediaDirector">Director:</label>
                <input type="text" id="mediaDirector" v-model="mediaDirector" placeholder="Director" />
            </div>

            <div class="InputContainer">
                <label for="mediaPhotoUrl">Photo URL:</label>
                <input type="text" id="mediaPhotoUrl" v-model="mediaPhotoUrl" placeholder="Photo URL" />
            </div>

            <div class="CheckContainer">
                <label>Type:</label>
                <input type="radio" id="movie" value="Movie" v-model="mediaType" />
                <label for="movie">Movie</label>
                <input type="radio" id="series" value="Series" v-model="mediaType" />
                <label for="series">Series</label>
            </div>

            <div class="InputContainer">
                <button class="Button" @click="Add">Add</button>
                <button class="Button" @click="Back">Back</button>
            </div>
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

.Container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.MediaContainer{
    flex-direction: column;
    display: flex;

}

.DescContainer{
    flex-direction: column;
    display: flex;
}

.CenterContainer {
    text-align: center;
    max-width: 800px;
    width: 100%;
    min-height: 400px; /* Set a minimum height for the center container */
    padding: 20px;
    box-sizing: border-box;
}

.InputContainer {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column; /* Elements inside InputContainer will be stacked vertically */
    
}

.TitleText{
    color: #8C52FF; /* Set the color to white */
    margin: 0; /* Remove default margin */
    padding: 20px; /* Add padding for space */
    width: 100%; /* Make it wide */
    box-sizing: border-box; /* Include padding in the width */
}

.Button{
    background-color: #8C52FF;
}

label {
    margin-bottom: 5px;
    color: white;
    ;
}

</style>
