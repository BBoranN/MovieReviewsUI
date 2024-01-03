<template>
    <div class = "AdditionPanel" >
        <input class="EditX" type="text" placeholder="Username" v-model="username"/>
        <input class="EditX" type="password" placeholder="Password" v-model="password"/>
        <input class="EditX" type="text" placeholder="Email" v-model="email"/>
        <input class="EditX" type="text" placeholder="PhotoUrl" v-model="photoUrl"/>
        <div class= "Button">
            <button @click="saveChanges">Save Changes</button>
        </div>
        
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

.AdditionPanel{
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 100%;
    gap: 5%;
    margin-top: 20%;
}

.EditX{
    width: 70%;
    height: 4%;
}

.Button{
    width: 100%;
    align-items: center;
    text-align: center;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #007BFF;
    color: rgb(0, 0, 0);
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 10px; 
    width: 50%;
}

button:hover {
    background: #0056b3;
}

button:active {
    background: #004085;
}




</style>