<template>
    <div class="Register">
        <h3>Create Account</h3>
        <input type="text" placeholder="Username" v-model="username"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <button @click="Register">Sign in to Continue</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const username = ref('');
const password = ref('');
const router = useRouter();
function Register(){
    console.log('login function called'); // Add this line
    console.log('username:', username.value); // And this line
    console.log('password:', password.value); // And this line

    axios.post('https://localhost:7129/api/User/addUser',{"username":username.value, "password":password.value,
    "email":"none","photoUrl":"none","isAdmin":false}).
    then((response) => {
        console.log(response.data);
        router.push({name:'login'});
    })
    .catch((error) => {
        console.log(error);
    });
}

</script>

<style scoped>

.Register{
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