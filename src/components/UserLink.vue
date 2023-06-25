<script setup lang="ts">
const props = defineProps({
    username: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <RouterLink 
        :to="`/u/${props.username}`" 
        class="user-link"
        :class="{ 'is-admin': props.admin }"
    >
        {{ props.username }}
    </RouterLink>
</template>

<style scoped lang="scss">
.user-link,.user-link:visited {
    color: var(--color-user);
    font-weight: bold;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }

    &.is-admin {
        color: var(--color-admin);
    }
}
</style>