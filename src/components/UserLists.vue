<template>
    <div class="ListsPageContainer">
        <h1 class="Head">Lists</h1>
        <div class="ListsContainer">
            <div v-for="showlist in showLists" class="List">
                <h3 @click="loadList(showlist)" class="White">{{showlist.list.name}}</h3>
                <div v-if="showlist.show">
                    <div v-for="media in showlist.medias" :key="media.id">
                        <h3 class="White">{{media.name}}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { useRouter,useRoute } from 'vue-router';
    import axios from 'axios';
    import UserBar from '../components/UserBar.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import {type list,type media} from '@/types';

    const router = useRouter();
    const makingList = ref(false);
    const newListName = ref('');
    type showList ={
        list: list,
        medias: media[],
        show: boolean,
    }
    const showLists = ref<showList[]>([]);

    onMounted(() => {
        const route = useRoute();
        const userid = route.params.userid;
        axios.get('https://localhost:7129/api/List/getUserLists?id='+userid).
        then((response) => {
            for(let x in response.data){
                let listItem:list = {
                    id: response.data[x].id,
                    name: response.data[x].name,
                    userId: response.data[x].userId,
                }
                let showListItem:showList = {
                    list: listItem,
                    show: false,
                    medias: [],
                }
                showLists.value.push(showListItem);
            }
        })
    });

    function loadList(list: showList){ 
        if(list.show){
            list.show = false;
        }
        else{
            list.show = true;
            list.medias = [];
            axios.get('https://localhost:7129/api/List/getMediasInList?listId='+list.list.id).
            then((response) => {
                for(let x in response.data){
                    let mediaItem:media = {
                        id: response.data[x].id,
                        name: response.data[x].movietitle,
                        description: response.data[x].description,
                        discriminator: response.data[x].discriminator,
                        genre: response.data[x].genre,
                        director: response.data[x].director,
                    }
                    list.medias.push(mediaItem);
                }
                console.log(list.medias);
            })
        }
        
    }

    function MakeList(){
        console.log(makingList.value)
        makingList.value = !makingList.value;
    }
    async function submitList(){
        const user= JSON.parse(sessionStorage.getItem('user')!);
        const userid = user.id;
        await axios.post('https://localhost:7129/api/List/createList',{'userid':userid,'name': newListName.value}).
        then((response) => {
            console.log(response.data);
        })
        router.go(0);
    }
</script>

<style scoped>
.ListsPageContainer{
    display: grid;
    grid-template-rows: 10% 5% 85%;
    justify-items: center;
    object-fit:cover;
}

.Head{
    text-align: center;
    color: white;
    margin-top: 50px;
}

.ListsContainer{
    display: grid;
    grid-template-rows: 5% repeat(auto);
    justify-items: center;

}
.List{
    width: 100%;
}
.White{
    color: white;
}

</style>