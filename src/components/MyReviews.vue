<template>
    <div class="MyReviewsContainer">
        <h1 class="Head">My Reviews</h1>
        <div class="ReviewContainer">
            <div v-for="review in reviews" :key="review.reviewId">
                <h3 class="White">{{review.mediatitle}}</h3>
                <p class="White">{{review.review}}</p>
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
    display: grid;
    grid-template-rows: 10% 90%;
    justify-items: center;
    object-fit:cover;
}
.Head{
    text-align: center;
    color: white;
    margin-top: 50px;
}
.ReviewContainer{
    display: grid;
    grid-template-rows: 1fr 1f;
    grid-gap: 20px;
    margin-top: 50px;
}
.White{
    color: white;
}   
</style>