<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    username: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        default: 64,
    }
});

const profilePictureUrl = computed(() => {
    return `${window._settings.baseUrl}/users/${props.username}/profilePicture`;
});
</script>

<template>
    <img 
        :src="profilePictureUrl"
        :alt="`${username}'s profile picture`" 
        class="profile-picture"
        :width="size"
        :height="size"
        draggable="false"
        @click="$router.push(`/u/${username}`)"
    />
</template>

<style scoped lang="scss">
    .profile-picture {
        cursor: pointer;
        object-fit: cover;
        border-radius: 100%;
        user-select: none;
    }
</style>