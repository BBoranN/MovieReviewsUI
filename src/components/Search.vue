<template>
    <div class="Container">
        <div class="Search">
            <SearchDiv :value="searchTerm" @update:value="searchTerm = $event"/>
        </div>
        <div :key="$route.fullPath">
            <div v-for="media in searchResults">
                <div class="Media" @click ="goToMedia(media.name)">
                    <img :src=media.photoUrl alt="../images/noMediaImage.jpg" class="MediaImg">
                    <p class="MediaTitle">{{ media.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import {ref, onMounted, watch} from 'vue';
import axios from 'axios';
import {type media} from '../types';
import {useRoute,useRouter} from 'vue-router';
import SearchDiv from './SearchDiv.vue';

const router = useRouter();
const searchResults = ref<media[]>([]);
const searchTerm = ref('');
const route = useRoute();

watch(route, async (to, from) => {
    searchTerm.value = Array.isArray(to.params.name) ? to.params.name[0] : to.params.name;
    const response = await axios.get('https://localhost:7129/api/Media?title='+searchTerm.value)
    .then((response) => {
        let mediaItem:media = {
            id: response.data.id,
            name: response.data.title,
            description: response.data.description,
            discriminator: response.data.discriminator,
            genre: response.data.genre,
            director: response.data.director,
            photoUrl: response.data.photoUrl,
        }
        searchResults.value = [];
        searchResults.value.push(mediaItem);
    })
        
    }
);

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
            photoUrl : response.data.photoUrl,
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
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
}
.Media{
    display: grid;
    grid-template-columns: 40% 60%;
    align-items: center;
}
.MediaImg{
    max-width: 70%;
    max-height: 70%;
    object-fit:contain;
}
.MediaTitle{
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
}
.Search{
    margin-top: 5%;
    width: 100%;
}
</style>