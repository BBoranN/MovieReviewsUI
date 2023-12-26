<template>
    <div class="Main">
        <div>
            <input type="text" v-model="searchTerm" placeholder="Search...">
            <button @click="search">Search</button>
        </div>
        <div>
            <div v-for="media in medias">
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
    import {useRouter} from 'vue-router';

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
                    //image: response.data[x].image,

                }
                medias.value.push(mediaItem);
            }

        })
    });

    function goToMedia(mediaName: string){
        router.push('/home/'+mediaName);
        
    }

    function search(){
        router.push('/home/search/'+searchTerm.value);
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
    margin: 0;
}


</style>