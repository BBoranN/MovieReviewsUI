<template>
    <div class="Home">
        <div>
            <router-view></router-view>
        </div>
        <UserBar class="UserBar"></UserBar>
        
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import UserBar from '../components/UserBar.vue';
    const router = useRouter();


</script>

<style scoped>

.Home{
    display: grid;
    grid-template-columns: 85% 15%;
    object-fit:cover;
}

</style>