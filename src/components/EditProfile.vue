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