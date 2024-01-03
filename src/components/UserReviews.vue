<template>
    <div class="MyReviewsContainer">
        <h1 class="Head">Reviews</h1>
        <div class="ReviewContainer">
            <div v-for="(review) in reviews" :key="review.reviewId" class="black-background">
            <div class="WhiteHeader">{{ review.mediatitle }}</div>
            <div class="White">{{ review.review }}</div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { useRouter,useRoute} from 'vue-router';
    import axios from 'axios';
    import UserBar from '../components/UserBar.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { type mediaReview } from '@/types';
    const router = useRouter();

    const reviews = ref<mediaReview[]>([]);
onMounted(() => {
    const route = useRoute();
    const userid = route.params.userid;
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
                photoUrl: ''
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
  padding: 00px; 
}
.black-background {
  background-color: #2b2c2e; 
  color: #fff; 
  box-sizing: border-box;
  width: 100%;
}

.gray-background {
  background-color: #2b2c2e; 
}

.flex-item {
  max-width: 200px;
}
</style>