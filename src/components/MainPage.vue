<template>
    <div class="Main">
        <div class="Search">
            <SearchDiv :value="searchTerm" @update:value="searchTerm = $event"/>
        </div>
        <div class="WrapperWrapper">
            <div class="WrapperHeader">Recently Uploaded</div>
            <div v-for="media in medias" class="WrapperMedia">
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
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
}

.Media{
    display: grid;
    grid-template-columns: 30% 60%;
    align-items: center;
    /* border: 5px solid white; */
    /* padding-bottom: 10px; */
    background-color: rgb(46, 44, 44);
}
.WrapperWrapper{
    margin-top: 5%;
    width: 60%;
    max-height: 60%;
    align-items: center;
}
.MediaImg{
    width: 100%; /* adjust as needed */
    height: 100%; /* maintain aspect ratio */
    /* object-fit:contain; */
    align-self: center;
}
.MediaTitle{
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
    margin: 0;
    
}
.WrapperMedia{
    margin-top: 5%;
    width: 100%;
    
}
.WrapperHeader{
    font-size: 2rem;
    font-weight: 500;
    color: white;
    margin: 0;
    margin-left: 40%;
}

.Search{
    margin-top: 5%;
    width: 100%;
}
</style>