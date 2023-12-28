<template>
    <div class="Loginform">
        <h3>Welcome to Movie Review</h3>
        <input type="text" placeholder="Username" v-model="username"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <button @click="login">Sign in to Continue</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { type user } from '../types';

const username = ref('');
const password = ref('');
const router = useRouter();

function login(){
    console.log('login function called'); // Add this line
    console.log('username:', username.value); // And this line
    console.log('password:', password.value); // And this line
    
    axios.post('https://localhost:7129/api/User/Login',{"username":username.value, "password":password.value}).
    then((response) => {
        sessionStorage.setItem('token', response.data.token);
        let user:user ={
            name: response.data.user.username,
            id: response.data.user.id,
            isAdmin: response.data.user.isAdmin,
            email: response.data.user.email,
            photoUrl: response.data.user.photoUrl
        }
        sessionStorage.setItem('user', JSON.stringify(user));
        router.push('/home');
    })
    .catch((error) => {
        console.log(error);
    });
}

</script>

<style scoped>

.Loginform{
    display: grid;
    place-items: center;
    grid-template-rows: 2fr 1fr 1fr 1fr;
}

h3{
    font-size: 2rem;
    font-weight: 500;
    color: white;
}
</style>