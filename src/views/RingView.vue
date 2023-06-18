<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { Post } from '@/models/post';
import PostVue from '@/components/Post.vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter, type RouteLocationNormalized } from 'vue-router';

let loaded: Ref<boolean> = ref(false);
let posts: Ref<Array<Post>> = ref([]);
let ringName: Ref<string> = ref('');
let multiRing: Ref<boolean> = ref(false);

// We fetch posts from the API even when the user changes route (ring)
onBeforeRouteUpdate((to, from, next) => {
    loadPosts(to);
    next();
});

onBeforeRouteLeave((to, from, next) => {
    posts.value = [];
    loaded.value = false
    next();
});

function loadPosts(to: RouteLocationNormalized){
    ringName.value = to.params.ringName as string;

    switch(ringName.value) {
        case 'popular':
        case 'all':
            multiRing.value = true;
            break;
        default:
            multiRing.value = false;
    }

    fetch(window._settings.baseUrl + '/r/' + ringName.value + '/posts')
        .then((response: { json: () => any; }) => response.json())
        .then((data: Post[]) => posts.value = data)
        .then(() => loaded.value = true);
}

loadPosts(useRouter().currentRoute.value);
</script>

<template>
    <div class="ring">
        <div class="ring-content" v-if="loaded">
            <h2>r/{{ ringName }}</h2>
            <div class="posts">
                <PostVue v-for="post in posts" :key="post.id" :post="post" :multiring="multiRing" />
            </div>
        </div>
        <div v-else>
        <div class="loading">
            <div class="loading-text">Loading ...</div>
            <font-awesome-icon class="icon fa-spin" :icon="['fas', 'circle-notch']" />
        </div>
    </div>  
    </div>
</template>

<style scoped lang="scss">
.ring {
    padding: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-width: 1200px;

    /* Posts is a collection of reddit-like entries */
    .posts {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 20px;
        row-gap: 40px;

        /* Post is a single entry */
    }
}

.loading {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    row-gap: 10px;
    width: 100px;
}
</style>