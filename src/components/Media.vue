<template>
    <div class="Container">
        <div class="Search">
            <SearchDiv :value="searchTerm" @update:value="searchTerm = $event"/>
        </div>
        <div>
            <button @click="getLists">Add to a List</button>
            <div v-if="showLists">
                <div v-for="list in lists" :key="list.id">
                    <button v-text="list.name" @click="AddToThis(list)"></button>
                </div>
            </div>
        </div>
        <div class="Media" v-if="media">
            <img :src=media.photoUrl alt="../images/noMediaImage.jpg" class="MediaImg">
            <div class="MediaInfo">
                <p class="InfoText">{{media!.name}}</p>
                <p class="InfoText">Description : {{media!.description}}</p>
                <p class="InfoText">Genre : {{media!.genre}}</p>
                <p class="InfoText">Director : {{media!.director}}</p>
            </div>
            <button v-if="isAdmin" @click="DeleteFromDatabase" class="DeleteB">Delete from database</button>
        </div>

        <div class="ReviewContainer">
            <div class="NewReview">
                <button @click="NewReview">Make Review</button>
                <div v-if="reviewing">
                    <textarea v-model="userReview"></textarea>
                    <button @click="MakeReview">Submit</button>
                </div>
            </div>
            <div v-if="reviews">
                <div v-for="review in reviews" class="Review">
                    <div class="ReviewHeader" @click="goToUser(review.userId)">
                        <img :src=review.photoUrl alt="../images/noUserImage.png" class="ProfileImage">
                        <p class="ReviewText">{{review.username}}</p>
                        
                    </div>
                    <p class="Review">{{review.review}}</p>
                    <button @click="DeleteReview(review)" v-if="isAdmin" class="DeleteB">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import {ref, onMounted} from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { type media ,type mediaReview, type list} from '../types';
import SearchDiv from './SearchDiv.vue';
import router from '@/router';

const media = ref<media | null>(null);
const reviews = ref<mediaReview[]>([]);
const searchTerm = ref('');
const reviewing= ref(false);
const userReview= ref('');
const showLists= ref(false);
const lists = ref<list[]>([]);
const isAdmin = ref(false);

onMounted(async () =>{
    const user = JSON.parse( sessionStorage.getItem('user')!);
    isAdmin.value = user.isAdmin;
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
            photoUrl: response.data.photoUrl,
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
                photoUrl: response.data[x].photoUrl,
            }
            reviews.value.push(reviewItem);
        }
        console.log(reviews.value);
    })
    
    axios.get('https://localhost:7129/api/List/getUserLists?id='+user.id).
            then((response) => {
                console.log(response.data);
                for(let x in response.data){
                    let listItem:list = {
                        id: response.data[x].id,
                        name: response.data[x].name,
                        userId: response.data[x].userId,
                    }
                    lists.value.push(listItem);
                }
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
    router.go(0);
}

function getLists(){
    showLists.value = !showLists.value;
}

function goToUser(userId: number){
    router.push('/userprofile/'+userId);
}

function AddToThis(list:list){
    const user= JSON.parse(sessionStorage.getItem('user')!);
    const token = sessionStorage.getItem('token');
    const mediaId = media.value!.id;
    const listId = list.id;
    axios.post('https://localhost:7129/api/List/addRecordToList',{"listId":listId, "mediaId":mediaId},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response.data);
    })
    showLists.value = false;
    alert('Added to '+list.name);
}

function DeleteReview(review:mediaReview){
    axios.delete('https://localhost:7129/api/Review/deleteReview?id='+review.reviewId,{
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    
    }).
    then((response) => {
        console.log(response.data);
        router.go(0);
    })
}

function DeleteFromDatabase(){
    axios.delete('https://localhost:7129/api/Media/DeleteMedia?id='+media.value!.id,{
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    
    }).
    then((response) => {
        console.log(response.data);
        router.push('/home');
    })
}

</script>

<style scoped>

.Container{
/*     display: grid;
    grid-template-rows: 20% 5% 25% 50%;
    justify-items: center; */
    justify-items: center;
    align-items: center;

    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    
}
.Media{
    display: grid;
    grid-template-columns: 27% 50%;
    justify-items: center;
    align-items: center;
    width: 80%;
    height: 40%;
}
.MediaImg{
    width: 100%; /* adjust as needed *//* maintain aspect ratio */
    max-width: 70%;
    max-height: 70%;
    object-fit:contain;
}
.InfoText{
    font-weight: 500;
    color: white;
}
.ReviewContainer{
    width: 80%;
    height: 30%;
    display:flex;
    flex-direction: column;
    
    /* grid-template-rows: 10% 80%; */
}

.NewReview{
    margin-left: 5%;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
}
.ReviewText{
    font-weight: 500;
    color: white;
}

.ProfileImage{
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.ReviewHeader{
    margin-left: 5px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    align-self: self-start;
    justify-self: self-start;
}

.Review{
    width: 90%;
    background-color: rgb(46, 44, 44);
    margin-top: 1%;
    color: white;
/*     display: grid;
    grid-template-columns: 20% 60% 10%; */
    margin-left: 5%;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
}
.Search{
    margin-top: 5%;
    width: 100%;
}
.DeleteB{
    margin-left: auto;
    margin-right: 20px;
    height: 30%;
    background-color: red;
    color: white;
    border-radius: 5px;
    border: none;
    padding: 5px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}
</style>