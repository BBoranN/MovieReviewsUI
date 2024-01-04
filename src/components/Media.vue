<template>
    <div class="Container">
        <div class="Search">
            <SearchDiv :value="searchTerm" @update:value="searchTerm = $event"/>
        </div>
        <div class="UserList">
            <button @click="getLists" class="AddListButton">Add to a List</button>
            <div v-if="showLists" class="ListContainer">
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
                <div class="VoteButtons">
                    <div class="InfoText">Total Score: {{ media.totalVotes }}</div>
                    <button class="icon-buttonUp" @click="UpVote">
                        <i class="bi bi-hand-thumbs-up" :style="{ color: hasVoted == 1 ? '#1d9719' : 'white'}"></i>
                    </button>
                    <button class="icon-buttonDown" @click="DownVote">
                        <i class="bi bi-hand-thumbs-down" :style="{ color: hasVoted == -1 ? 'red' : 'white'}"></i>
                    </button>
                </div>
                <button v-if="isAdmin" @click="DeleteFromDatabase" class="DeleteB">Delete from database</button>
            </div>
        </div>
        

        <div class="ReviewContainer">
            <div class="NewReview">
                <button @click="NewReview">Make Review</button>
                <div v-if="reviewing">
                    <textarea v-model="userReview"></textarea>
                    <button @click="MakeReview">Submit</button>
                </div>
            </div>
            <div v-if="reviews" class="Review2">
                <div v-for="review in reviews" class="Review">
                    <div class="ReviewHeader" @click="goToUser(review.userId)">
                        <img :src=review.photoUrl alt="../images/noUserImage.png" class="ProfileImage">
                        <p class="ReviewText">{{review.username}}</p>
                        
                    </div>
                    <div class="ReviewText2">{{review.review}}</div>
                    <button @click="DeleteReview(review)" v-if="isAdmin" class="DeleteB">Delete</button>
                </div>
            </div>
        </div>
        <button @click="scrollToTop" class="ScrollButton"> <i class="bi bi-arrow-up-circle"></i> </button>
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
const hasVoted = ref(0);

onMounted(async () =>{
    const user = JSON.parse( sessionStorage.getItem('user')!);
    console.log(user);
    if(user == null){
        isAdmin.value = false;
    }
    else{
        isAdmin.value = user.isAdmin;
    }
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
            totalVotes: response.data.totalvotes ? response.data.totalvotes : 0,
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

    axios.get('https://localhost:7129/api/Media/HasVoted?mediaid='+media.value!.id+'&userid='+user.id,{
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    
    }).
    then((response) => {
        hasVoted.value = response.data;
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

function UpVote(){
    const user= JSON.parse(sessionStorage.getItem('user')!);
    const token = sessionStorage.getItem('token');
    const mediaId = media.value!.id;
    axios.post('https://localhost:7129/api/Media/MakeVote',{ "mediaid":mediaId,"userid":user.id, "vote":1},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response.data);
    })
    router.go(0);
}

function DownVote(){
    const user= JSON.parse(sessionStorage.getItem('user')!);
    const token = sessionStorage.getItem('token');
    const mediaId = media.value!.id;
    axios.post('https://localhost:7129/api/Media/MakeVote',{ "mediaid":mediaId,"userid":user.id, "vote":-1},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response.data);
    })
    router.go(0);
}

const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

</script>

<style scoped>

.Container{

    justify-items: center;
    align-items: center;

    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    
}
.UserList{

    width: 80%;
    height: 5%;
    display: flex;
    flex-direction: row;
    justify-items: center;
    
}
.AddListButton{
    margin-left: 5%;
    width: 10%;
    margin-right: auto;
    background-color: #007BFF;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    border: none;
    padding: 5px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}
.ListContainer{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 7px;
}
.Media{
    margin-top: 2%;
    margin-bottom: 2%;
    background-color: rgb(25, 22, 22);
    display: grid;
    grid-template-columns: 40% 50%;
    justify-items: center;
    align-items: center;
    width: 80%;
    height: 40%;
}
.MediaImg{
    width: 100%; /* adjust as needed *//* maintain aspect ratio */
    height: 100%;
    object-fit:contain;
}
.MediaInfo{
    margin-left: 2%;
}
.InfoText{
    font-weight: 500;
    color: white;
}
.ReviewContainer{

    justify-items: center;
    align-items: center;
    width: 100%;
    height: 30%;
    display:flex;
    flex-direction: column;
    margin-top: 5 px;
}

.NewReview{
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
}
.ReviewText{
    font-weight: 500;
    color: white;
    white-space: normal;
    word-wrap: break-word;
    text-overflow: ellipsis;
}

.ProfileImage{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    cursor: pointer;
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
.Review2{
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-content: center;
    width: 80%;
}
.Review{
    width: 100%;
    background-color: rgb(46, 44, 44);
    margin-top: 1%;
    color: white;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    
    white-space: normal;
    word-wrap: break-word;
    text-overflow: ellipsis;
}

.ReviewText2{
    white-space: normal;
    word-wrap: break-word;
    text-overflow: ellipsis;
    width: 85%;
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
.DeleteB:hover {
    background: #655a5a;
}
.icon-buttonUp{
    border: none ;
    background: none;
    cursor: pointer;
    color: white;
}
.icon-buttonUp:hover {
    background-color: #1d9719; 
}

.icon-buttonUp:focus {
    outline: none;
}
.icon-buttonDown{
    border: none ;
    background: none;
    cursor: pointer;
    color: white;
}
.icon-buttonDown:hover {
    background-color: #ff0000; 
}

.icon-buttonDown:focus {
    outline: none;
}
button {
    
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #007BFF;
    color: rgb(0, 0, 0);
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 10px; 
}

button:hover {
    background: #0056b3;
}

button:active {
    background: #004085;
}

.ScrollButton {
    position: fixed;
    bottom: 20px;
    left: 20px;
    /* Add your other styles here */
    background-color: #655a5a;
}
</style>