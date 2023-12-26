<template>
    <div class="Container">
        <div>
            <input type="text" v-model="searchTerm" placeholder="Search...">
            <button>Search</button>
        </div>
        <div>
            <div v-for="media in searchResults">
                <div class="Media" @click ="goToMedia(media.name)">
                    <img src="../images/noMediaImage.jpg" class="MediaImg">
                    <p class="MediaTitle">{{ media.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import {ref, onMounted} from 'vue';
import axios from 'axios';
import {type media} from '../types';
import {useRoute,useRouter} from 'vue-router';

const router = useRouter();
const searchResults = ref<media[]>([]);
const searchTerm = ref('');


onMounted(async () =>{
    const route = useRoute();
    searchTerm.value = Array.isArray(route.params.name) ? route.params.name[0] : route.params.name;
    const response = await axios.get('https://localhost:7129/api/Media?title='+searchTerm.value)
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
        searchResults.value.push(mediaItem);
    })
});

function goToMedia(mediaName: string){
        router.push('/home/'+mediaName);
        
    }

</script>

<style scoped>

.Container{
    display: grid;
    grid-template-rows: 20% 30% ;
    justify-items: center;
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
.MediaTitle{
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
}

</style>