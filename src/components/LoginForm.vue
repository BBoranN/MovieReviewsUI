<template>
    <div class="Loginform">
        <div class="Header">Welcome to Movie Review</div>
        <div class="FormContainer">
            <input type="text" placeholder="Username" v-model="username"/>
            <input type="password" placeholder="Password" v-model="password"/>
            <button @click="login">Sign in</button>
            <div @click="createAccount" class="CreateAccount">Create Account</div>
        </div>
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

function createAccount(){
    router.push('/register');
}

</script>

<style scoped>

.Loginform{
/*     display: grid;
    place-items: center;
    grid-template-rows: 20% 60%; */
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.FormContainer{
/*     display: grid;
    place-items: center;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 15px; */
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    border-radius: 10px;
    width:50%;
}

h3{
    font-size: 2rem;
    font-weight: 500;
    color: white;
}
input {
    padding: 10px 0;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
    background: #f5f5f5;
    transition: all 0.3s ease;
    width: 100%;
    font-size: 1rem;
}
input:focus {
    outline: none;
    box-shadow: 0 0 5px 2px rgba(0,0,0,0.1);
    background: #e8e8e8;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #680fbb;
    color: white;
    font-size: 1.3rem;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
}

button:hover {
    background: #680fbb;
}

button:active {
    background: #004085;
}
.Header{
/*     color: #7520c4;
    padding-bottom: 10px;
    font-size: 2.5rem;
    font-weight: 500;
    font-family: 'Roboto', sans-serif; */
    color: #FFFFFF;
    background: #000000;
    text-shadow: #FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, #FF2D95 0px 0px 40px, #FF2D95 0px 0px 50px, #FF2D95 0px 0px 75px;
    font-size: 2.5vw;
}
.CreateAccount{
    color: #bc7bcb;
    font-size: 0.9rem;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    
}
    
</style>