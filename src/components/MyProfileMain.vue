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
    display: grid;
    grid-template-rows: 30% 30% 30%;
    object-fit:contain;
}


</style>