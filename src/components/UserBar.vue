<template>
    <div v-if="isLoggedIn" class="UpperContainer">
        <div class="User">
            <img :src="photoUrl" class="ProfileImage" alt="../images/noUserImage.png" @click="goToProfile">
            <div class="username">{{ username }}</div>
        </div>
        <div class="AddMedia">
            <button v-if="isAdmin" @click="addMedia">Add New Media</button>
            <button v-else @click ="toggleLists" >Lists</button>
            <div v-if="showLists">
                <div v-for="list in lists" :key="list.id">
                    <button v-text="list.name"></button>
                </div>
            </div>
        </div>
        <div class="Logout">
            <button @click="logout">Logout</button>
        </div>
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
    const photoUrl = ref('');
    const isAdmin = ref(false);
    onMounted(() => {
        if(!sessionStorage.getItem('token')){
            isLoggedIn.value = false;
        }
        else{
            console.log(sessionStorage.getItem('token'));
            const user = JSON.parse( sessionStorage.getItem('user')!);
            isAdmin.value = user.isAdmin;
            username.value = user.name;
            photoUrl.value = user.photoUrl;
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
        sessionStorage.removeItem('user');
        router.push({ name: 'login' });
    }
    function login(){
        router.push({ name: 'login' });
    }
    function register(){
        router.push('/Register');
    }
    function goToProfile(){
        router.push('/MyProfile');
    }
    function addMedia(){
        router.push('/AddMedia');
    }
</script>

<style scoped>
    .UpperContainer{
        background-color: #8C52FF;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-items: center;
        grid-template-rows: 20% 50% 5%;
    }
    .ProfileImage{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        
    }
    .User{
        margin-top: 16%;
        display: grid;
        place-items: center;
        cursor: pointer;
    }
    .NotLoged{
        background-color: #8C52FF;
        display: grid;
        grid-template-rows: 5% 5%;
        justify-items: center;
        height: 100vh;
    }
    button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #000000;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background: #0056b3;
}

button:active {
    background: #004085;
}
.username {
    font-size: 1.5rem;
    color: #000000;
    font-weight: bold;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.Logout{
    width: 100%;
    display:  flex;
    justify-content: center;
    align-self: flex-end;
    margin-left: auto;
    margin-top: auto;
    margin-bottom: 10%;
}
.AddMedia{
    margin-top: 30%;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>