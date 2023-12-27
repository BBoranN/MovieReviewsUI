<template>
    <div class="Container">
        <SearchDiv :value="searchTerm" @update:value="searchTerm = $event"/>
        <button>Add to a List</button>
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
            <button @click="NewReview">Make Review</button>
            <div v-if="reviewing">
                <textarea v-model="userReview"></textarea>
                <button @click="MakeReview">Submit</button>
            </div>
            <div v-if="reviews">
                <div v-for="review in reviews" class="Review">
                    <div class="ReviewHeader" @click="goToUser(review.userId)">
                        <img src="../images/noUserImage.png" class="ProfileImage">
                        <p class="Review">{{review.username}}</p>
                    </div>
                    <p class="Review">{{review.review}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import {ref, onMounted} from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { type media ,type mediaReview} from '../types';
import SearchDiv from './SearchDiv.vue';
import router from '@/router';

const media = ref<media | null>(null);
const reviews = ref<mediaReview[]>([]);
const searchTerm = ref('');
const reviewing= ref(false);
const userReview= ref('');

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

    const response2= await axios.get('https://localhost:7129/api/Review/getLastReviews?mediaId='+media.value!.id).
    then((response) => {
        for (let x in response.data){
            let reviewItem:mediaReview = {
                reviewId: response.data[x].reviewid,
                userId: response.data[x].userid,
                mediaId: response.data[x].mediaId,
                review: response.data[x].review,
                username: response.data[x].username,
                mediatitle: response.data[x].mediatitle,
            }
            reviews.value.push(reviewItem);
        }
        console.log(reviews.value);
    })
});

function NewReview(){
    reviewing.value = !reviewing.value;
}

async function MakeReview(){
    const user= sessionStorage.getItem('user');
    const userId = JSON.parse(user!).id;
    const token = sessionStorage.getItem('token');
    const mediaId = media.value!.id;
    reviewing.value = false;

    const response = await axios.post('https://localhost:7129/api/Review/addReview',{"reviewerId":userId, "reviewedId":mediaId, "review":userReview.value},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response.data);
    })
    
}

function goToUser(userId: number){
    router.push('/userprofile/'+userId);
}

</script>

<style scoped>

.Container{
    display: grid;
    grid-template-rows: 20% 5% 25% 50%;
    justify-items: center;
    height: 100%;
    width: 100%;
}
.Media{
    display: grid;
    grid-template-columns: 27% 50%;
    justify-items: center;
}
.MediaImg{
    width: 100%; /* adjust as needed */
    height: auto; /* maintain aspect ratio */
    max-width: 100%;
    max-height: 100%;
    object-fit:contain;
}
.InfoText{
    font-weight: 500;
    color: white;
}
.ReviewContainer{
    
    display:grid;
    grid-template-rows: 10% 80%;
}
.Review{
    font-weight: 500;
    color: white;
}

.ProfileImage{
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
}
.ReviewHeader{
    display: grid;
    grid-template-rows: 20% 80%;
}
.Review{
    display: grid;
    grid-template-columns: 20% 80%;
}
</style>