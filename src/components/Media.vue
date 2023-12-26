<template>
    <div class="Container">
        <div>
            <input type="text" placeholder="Search...">
            <button>Search</button>
        </div>
        <div class="Media" v-if="media">
            <img src="../images/noMediaImage.jpg" class="MediaImg">
            <div class="MediaInfo">
                <p class="InfoText">{{media!.name}}</p>
                <p class="InfoText">Description : {{media!.description}}</p>
                <p class="InfoText">Genre : {{media!.genre}}</p>
                <p class="InfoText">Director : {{media!.director}}</p>
            </div>
        </div>

        <div class="ReviewContainer">
            <button>Make Review</button>
        </div>

    </div>
</template>

<script setup lang="ts">

import {ref, onMounted} from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { type media } from '../types';

const media = ref<media | null>(null);

onMounted(async () =>{
    const route = useRoute();
    const mediaName = route.params.name;
    const response = await axios.get('https://localhost:7129/api/Media?title='+mediaName)
    .then((response) => {
        console.log(response.data);
        let mediaItem:media = {
            id: response.data.id,
            name: response.data.title,
            description: response.data.description,
            discriminator: response.data.discriminator,
            genre: response.data.genre,
            director: response.data.director,
            //image: response.data.image,
        }
        console.log(mediaItem);
        media.value = mediaItem ;
    })
});

</script>

<style scoped>

.Container{
    display: grid;
    grid-template-rows: 20% 30% 50%;
    justify-items: center;
    height: 100%;
    width: 100%;
}
.Media{
    display: grid;
    grid-template-columns: 40% 60%;
    align-items: center;
}
.MediaImg{
    width: 100%; /* adjust as needed */
    height: auto; /* maintain aspect ratio */
    max-width: 100%;
    max-height: 100%;
    object-fit:contain;
}
.InfoText{
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
}
.ReviewContainer{

}

</style>