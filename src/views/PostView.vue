<script lang="ts" setup>
import Comments from '@/components/Comments.vue';
import type { Post, Comment } from '@/models/models';
import router from '@/router';
import { DateTime } from 'luxon';
import { ref, onMounted, computed } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter, type RouteLocationNormalized } from 'vue-router';



const post = ref<Post | null>(null);
const comments = ref<Comment[]>([]);

onBeforeRouteUpdate(async (to, from, next) => {
    loadPost(to);
    next();
});

onBeforeRouteLeave(async (to, from, next) => {
    post.value = null;
    next();
});

async function loadPost(to: RouteLocationNormalized){
    let postId = to.params.postId as string;
    try {
        const postResponse = await fetch(`${window._settings.baseUrl}/posts/${postId}`);
        const postData = await postResponse.json();
        post.value = postData;

        const commentsResponse = await fetch(`${window._settings.baseUrl}/posts/${postId}/comments`);
        const commentsData = await commentsResponse.json();
        comments.value = commentsData;
    } catch (e) {
        console.error(e);
    }
}

loadPost(useRouter().currentRoute.value);

let c = computed(() => {
    return {
        postedOn: post.value ? DateTime.fromISO(post.value.createdAt).toRelative(): '',
        postedOnYmd: post.value ? DateTime.fromISO(post.value.createdAt).toLocaleString(DateTime.DATETIME_MED): ''
    }
});
</script>
  

<template>
    <div v-if="post != null">
        <h2>{{ post.title }}</h2>
        <!-- A nice post metadata area -->
        <div class="post-metadata">
            <div class="post-author">/u/{{ post.author.username }}</div>
            <div class="post-divider">•</div>
            <div class="post-date">{{ c.postedOn }}</div>
        </div>
        <!-- The post body -->
        <div class="post-body">{{ post.body }}</div>
        <!-- The post's comments -->
        <h3>Comments</h3>
        <div class="post-comments">
            <Comments :comments="comments" />
        </div>
    </div>
</template>
  
<style scoped lang="scss">
.post-metadata {
    display: flex;
    font-size: 0.8em;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    column-gap: 8px;

    .post-author {
        color: var(--color-user);
        font-weight: bold;
    }
    .post-date {
        color: #999;
    }
}

.post-body {
    margin-bottom: 2rem;
}

.post-comments {
    margin-top: 24px;
}
</style>