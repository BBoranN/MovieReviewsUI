<template>
    <div class="Register">
        <h3>Create Account</h3>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Sign in to Continue</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const username = ref('');
const password = ref('');

function login(){

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