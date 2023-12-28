<template>
    <div class="MyProfileMain">
        <h1 class="White">{{user?.name}}'s Profile</h1>
        <button @click="Lists"> {{user?.name}}'s Lists</button>
        <button @click="Reviews"> {{user?.name}}'s Reviews</button>
        
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
    import { useRouter,useRoute } from 'vue-router';
    import UserBar from '../components/UserBar.vue';
    import {type user} from '../types';
import axios from 'axios';
    const router = useRouter();

    const user = ref<user>()

    onMounted(async () => {
        const route = useRoute();
        const userid = route.params.userid;
        await axios.get('https://localhost:7129/api/User/getUserById?id='+userid).
        then((response) => {
            console.log(response.data)
            user.value = {
                id: response.data.id,
                name: response.data.username,
                email: response.data.email,
            }

        })
    });
    function Lists () {
        router.push('/userprofile/lists/'+user.value?.id);
    };
    function Reviews () {
        router.push('/userprofile/reviews/'+user.value?.id);
    };


</script>
<style scoped>

.MyProfileMain{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.White{
    color: white;
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

