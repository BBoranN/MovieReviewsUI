<template>
    <div>
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