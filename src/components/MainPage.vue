<template>
    <div class="Main">
        <SearchDiv :value="searchTerm" @update:value="searchTerm = $event"/>
        <div>
            <div v-for="media in medias">
                <div class="Media" @click ="goToMedia(media.name)">
                    <img :src=media.photoUrl alt="../images/noMediaImage.jpg" class="MediaImg">
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
    import {useRouter} from 'vue-router';
    import SearchDiv from './SearchDiv.vue';

    const router = useRouter();
    const searchTerm = ref('');
    const medias = ref<media[]>([]);
    
    onMounted(async () =>{
        const response = await axios.get('https://localhost:7129/api/Media/RecentlyAdded')
        .then((response) => {
            for(let x in response.data){
                let mediaItem: media = {
                    id: response.data[x].id,
                    name: response.data[x].title,
                    description: response.data[x].description,
                    discriminator: response.data[x].discriminator,
                    genre: response.data[x].genre,
                    director: response.data[x].director,
                    photoUrl: response.data[x].photoUrl,

                }
                medias.value.push(mediaItem);
            }

        })
    });

    function goToMedia(mediaName: string){
        router.push('/home/'+mediaName);
        
    }


</script>

<style scoped>

.Main{
    display: grid;
    justify-items: center;
    object-fit:cover;
}

.Media{
    display: grid;
    grid-template-columns: 30% 60%;
    align-items: center;
}
.MediaImg{
    width: 100%; /* adjust as needed */
    height: auto; /* maintain aspect ratio */
    max-width: 70%;
    max-height: 70%;
    object-fit:contain;
}
.MediaTitle{
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
    margin: 0;
}


</style>