<script setup lang="ts">
import type { User } from '@/models/models';
import { type Ref, ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProfilePicture from '@/components/ProfilePicture.vue';

// Username is in the route path :username
const username = useRoute().params.username as string;
const profilePictureUrl = `${window._settings.baseUrl}/users/${username}/profilePicture`;

const user: Ref<User | null> = ref(null);
const fetchUser = async () => {
    const response = await fetch(`${window._settings.baseUrl}/users/${username}`);
    user.value = await response.json();
};

const c = computed(() => {
    return {
        badgeDisplayText: (id: string) => {
            switch (id) {
                case 'admin':
                    return 'Admin';
                case 'supporter':
                    return 'Supporter';
                default:
                    return 'Unknown';
            }
        }
    }
});

onMounted(fetchUser);
</script>

<template>
    <div class="user-view" v-if="user != null">
        <div class="user-header">
            <div class="user-header-left">
                <div class="user-header-avatar">
                    <ProfilePicture 
                        :username="user.username"
                        :size="120"
                    />
                </div>
                <div class="username-box">
                    <h1 class="display-name">{{ user.displayName }}</h1>
                    <p class="username">{{ user.username }}</p>
                    <div class="user-badges">
                        <span 
                            class="badge" 
                            v-for="badge in user.badges" 
                            :key="badge.id"
                            :style="{ backgroundColor: badge.backgroundColor, color: badge.textColor }"
                        >
                            {{ c.badgeDisplayText(badge.id) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.user-view {
    .user-header {
        display: flex;
        flex-direction: row;
        $avatarSize: 120px;

        .user-header-left {
            display: flex;
            flex-direction: row;
            column-gap: 32px;
            align-items: center;
        }

        img.user-avatar {
            width: $avatarSize;
            height: $avatarSize;

            object-fit: cover;
            border-radius: $avatarSize;
        }

        .username-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .display-name {
                font-size: 1.5rem;
                font-weight: 500;
            }
            .username {
                font-size: 1.2rem;
                font-weight: 300;
            }

            .user-badges {
                display: flex;
                flex-direction: row;
                column-gap: 8px;
                margin-top: 8px;
                .badge {
                    padding: 4px 12px;
                    border-radius: 16px;
                    font-size: 0.8rem;
                    font-weight: 500;
                    user-select: none;
                }
            }
        }
    }
}
</style>