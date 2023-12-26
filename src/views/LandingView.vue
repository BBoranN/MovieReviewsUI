<template>
    <div class="Landing">
        <img src="../images/Ekran görüntüsü 2023-12-12 182644.png">
        <router-view></router-view>
    </div>

</template>

<script setup lang="ts">


</script>

<style scoped>

.Landing{
    display: grid;
    grid-template-columns: 60% 40%;
    width: 100%;
    height: 100%;
    object-fit:cover;
}

img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

</style>
