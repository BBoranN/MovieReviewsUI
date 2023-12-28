<template>
    <div class="MyProfileMain">
        <button @click="editProfile"> Edit profile</button>
        <button @click="myLists"> My Lists</button>
        <button @click="myReviews"> My Reviews</button>
        
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import UserBar from '../components/UserBar.vue';
    const router = useRouter();

    function editProfile () {
        router.push('/myprofile/editprofile');
    };
    function myLists () {
        router.push('/myprofile/mylists');
    };
    function myReviews () {
        router.push('/myprofile/myreviews');
    };


</script>
<style scoped>

.MyProfileMain{
    display: flex;
    flex-direction: column;
    align-items: center;
}

button {
    margin-top: 10%;
    height: 10%;
    width: 90%;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #007BFF;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 10px; /* Add some space between the input and the button */
}

button:hover {
    background: #0056b3;
}

button:active {
    background: #004085;
}

</style>