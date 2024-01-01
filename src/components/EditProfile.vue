<template>
    <div >
        <input type="text" placeholder="Username" v-model="username"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <input type="text" placeholder="Email" v-model="email"/>
        <input type="text" placeholder="PhotoUrl" v-model="photoUrl"/>
        <button @click="saveChanges">Save Changes</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import {useRouter}from 'vue-router';

const username = ref('');
const password = ref('');
const email = ref('');
const photoUrl = ref('');

const router = useRouter();

async function saveChanges(){
    if(!sessionStorage.getItem('token')){
        alert('Please login to edit your profile');
        return;
    }
    else if(username.value == '' || password.value == '' || email.value == '' || photoUrl.value == ''){
        alert('Please fill out all fields');
        return;
    }
    const user = JSON.parse( sessionStorage.getItem('user')!);
    const userid= user.id;
    const token = sessionStorage.getItem('token');
    await axios.put('https://localhost:7129/api/User/updateUser',{"id":userid,"username":username.value, "password":password.value,
    "email":email.value,"photoUrl":photoUrl.value},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).
    then((response) => {
        console.log(response.data);
        sessionStorage.clear();
        router.push({name:'login'});
    })
}

</script>

<style scoped>
input {
    padding: 10px;
    padding-right: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    transition: all 0.3s ease;
    width: 100%;
    font-size: 1rem;
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