<template>
    <div v-if="isLoggedIn" class="UpperContainer">
        <div class="User">
            <img class="ProfileImage" src="../images/noUserImage.png">
            <p v-text="username"></p>
        </div>
        <div>
            <button @click ="toggleLists" >Lists</button>
            <div v-if="showLists">
                <div v-for="list in lists" :key="list.id">
                    <button v-text="list.name"></button>
                </div>
            </div>
        </div>
        <button @click="logout">Logout</button>
    </div>
    <div v-else class="NotLoged">
        <button @click="login">Login</button>
        <button @click="register">Register</button>
    </div>
</template>

<script setup lang="ts">

    import { useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { type list } from '../types';
    const router = useRouter();
    const isLoggedIn = ref(false);
    const lists = ref<list[]>([]);
    const showLists = ref(false);
    const username = ref('');
    onMounted(() => {
        if(!sessionStorage.getItem('token')){
            isLoggedIn.value = false;
        }
        else{
            const user = JSON.parse( sessionStorage.getItem('user')!);
            username.value = user.name;
            isLoggedIn.value = true;
            const response = axios.get('https://localhost:7129/api/List/getUserLists?id='+user.id).
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
        }
    });
    function toggleLists(){
        showLists.value = !showLists.value;
    }
    function logout(){
        sessionStorage.removeItem('token');
        router.push('/Login');
    }
    function login(){
        router.push('/Login');
    }
    function register(){
        router.push('/Register');
    }
</script>

<style scoped>
    .UpperContainer{
        background-color: rgb(117, 29, 132);
        height: 100vh;
        display: grid;
        justify-items: center;
        grid-template-rows: 20% 50% 5%;
    }
    .ProfileImage{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        
    }
    .User{
        display: grid;
        place-items: center;
    }
    .NotLoged{
        background-color: rgb(117, 29, 132);
        display: grid;
        grid-template-rows: 5% 5%;
        justify-items: center;
        height: 100vh;
    }
</style>