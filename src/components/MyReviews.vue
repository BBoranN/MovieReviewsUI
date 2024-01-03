<template>
    <div class="MyReviewsContainer">
        <h1 class="Head">My Reviews</h1>
        <div class="ReviewContainer">
            <div v-for="(review) in reviews" :key="review.reviewId" class="black-background">
                <div class="WhiteHeader">{{ review.mediatitle }}</div>
                <div class="White">{{ review.review }}</div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import UserBar from '../components/UserBar.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { type mediaReview } from '@/types';
    const router = useRouter();

    const reviews = ref<mediaReview[]>([]);
onMounted(() => {
    const user= JSON.parse(sessionStorage.getItem('user')!);
    const userid = user.id;
    axios.get('https://localhost:7129/api/Review/getReviews?userId='+userid).
    then((response) => {
        for(let x in response.data){
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
    })
});

</script>

<style scoped>

.MyReviewsContainer{
    display: flex;
    flex-direction: column ;
    justify-items: center;
    align-items: center;
    object-fit:cover;
    max-width: 100%;
}
.Head{
    text-align: center;
    color: white;
    margin-top: 50px;
}
.ReviewContainer{
    display: flex;
    flex-direction: column ;
    grid-template-rows: 1fr 1f;
    grid-gap: 35px;
    margin-top: 50px;
    background-color: black;
    margin-bottom : 00px;
    padding: 10px;
    width: 70%;
}

.WhiteHeader{
    color: white;
    display: flex;
    width: 100%;
}
.White{
    color: white;
    display: block;
    width: 100%;
    white-space: normal;
    word-wrap: break-word;
    text-overflow: ellipsis;
}   

.review-frame {
  background-color: black;
  padding: 00px; /* Add padding for better visual separation */
}
.black-background {
  background-color: #2b2c2e; /* Replace with your desired black background color */
  color: #fff; /* Text color for better visibility on dark background */
  box-sizing: border-box;
  width: 100%;
}

.gray-background {
  background-color: #2b2c2e; /* Replace with your desired gray background color */
}

.flex-item {
  max-width: 200px; /* Set the maximum width as needed */
  /* Other styles for flex items */
}
</style>