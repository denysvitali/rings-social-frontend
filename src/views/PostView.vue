<script lang="ts" setup>
import type { Post } from '@/models/post';
import router from '@/router';
import { type Ref, ref } from 'vue';

let postId = router.currentRoute.value.params.postId;
let post: Ref<Post | null> = ref(null);

// Fetch post
fetch(`${window._settings.baseUrl}/posts/${postId}`)
    .then((response: Response) => {
        if(response.status == 404){
            router.push('/404');
        }
        return response;
    })
    .then((response: { json: () => any; }) => response.json())
    .then((data: any) => {
        post.value = data;
    });
</script>

<template>
    <div v-if="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
    </div>
</template>