<template>
    <div class="Container">
        <div class="Search">
            <SearchDiv :value="searchTerm" @update:value="searchTerm = $event"/>
        </div>
        <div class="SearchResults">
            <div v-for="media in searchResults" class="Media">
                <div  @click ="goToMedia(media.name)" class="MediaChild">
                    <img :src=media.photoUrl alt="../images/noMediaImage.jpg" class="MediaImg">
                    <div class="MediaTitle">{{ media.name }}</div>
                    <div class="Score">Score: {{ media.totalVotes }}</div>
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
    const response = await axios.get('https://localhost:7129/api/Media/search?title='+searchTerm.value)
    .then((response) => {
        for(let x in response.data){
            let mediaItem:media = {
                id: response.data[x].id,
                name: response.data[x].title,
                description: response.data[x].description,
                discriminator: response.data[x].discriminator,
                genre: response.data[x].genre,
                director: response.data[x].director,
                photoUrl: response.data[x].photoUrl,
                totalVotes: response.data[x].totalvotes ? response.data[x].totalvotes : 0,
            }
            searchResults.value.push(mediaItem);
        }

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
    width: 100%;
    height: 100%;
}
.SearchResults{
    display: grid;
    grid-gap: 5%;
    margin-top: 5%;
    align-items: center;
    width: 100%;
    justify-items: center;
}
.Media{
    width: 60%;
    display: grid;
    align-items: self-start;
    border: 5px solid rgb(172, 167, 167);
    justify-items: center;
    cursor: pointer;
}
.MediaChild{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.MediaImg{
    max-width: 50%;
    max-height: 50%;
    margin-right: auto;
}
.MediaTitle{
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
    margin-right: auto;
}
.Score{
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
    margin-left: auto;
}
.Search{
    margin-top: 5%;
    width: 100%;
}
</style>