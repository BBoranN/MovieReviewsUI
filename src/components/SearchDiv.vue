<template>
    <div class="SearchField">
      <input type="text" :value="value" @input="updateValue" placeholder="Search...">
      <button @click="performSearch">Search</button>
    </div>
  </template>
  
  <script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    
    const props = defineProps({
        value : String
    });
    
    const emit = defineEmits(['update:value']);
    
    const updateValue = (event: any) => {
        emit('update:value', event.target.value);
    };
    
    function performSearch () {
        console.log(props.value);
        router.push('/home/search/'+props.value);
    };
  </script>

<style scoped>
.SearchField {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 35%;
    margin: 0 auto;
    padding: 10px ;
}
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

input:focus {
    outline: none;
    border-color: #007BFF;
}

button {
    
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #9fa0a0;
    color: rgb(0, 0, 0);
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