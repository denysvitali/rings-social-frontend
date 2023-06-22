<script setup lang="ts">
import { ref, type PropType, type Ref, computed } from 'vue';
import type { Post } from '@/models/post';
import { DateTime } from 'luxon';
import { faF } from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

let props = defineProps({
    post: {
        type: Object as PropType<Post>,
        required: true
    },
    multiring: {
        type: Boolean as PropType<boolean>,
        default: false
    }
});

let c = computed(() => {
    return {
        postedOn: DateTime.fromISO(props.post.posted_on).toRelative(),
        postedOnYmd: DateTime.fromISO(props.post.posted_on).toLocaleString(DateTime.DATETIME_MED)
    }
});

</script>

<template>
    <div class="post">
        <div class="post-left">
            <div class="upvote-downvote-area">
                <font-awesome-icon :icon="['fas', 'arrow-up']" class="vote-up" />
                <span class="post-score">{{ post.score }}</span>
                <font-awesome-icon :icon="['fas', 'arrow-down']" class="vote-down "/>
            </div>
        </div>
        <div class="post-right">
            <div v-if="post.link != null">
                <a :href="post.link" class="post-link" target="_blank">
                    <span class="post-title">{{ post.title }}</span>
                </a>
            </div>
            <div v-else>
                <div class="post-title">{{ post.title }}</div>
                <div class="post-body">The protest is still in progress though. Subreddits that have been forced online are having votes on changing their focus. Many subs have already voted and changed their focus accordingly.</div>
            </div>
            <div class="post-actions">
                <RouterLink 
                    :to="`/r/${post.ring_name}/${post.id}`" 
                    class="action action-comment"
                >
                    <font-awesome-icon class="icon" :icon="['fas', 'comment']" />
                    <span class="post-comment-count">{{ post.commentsCount }}</span>
                </RouterLink>
            </div>
            <div class="post-metadata">
                <RouterLink 
                    :to='"/r/" + post.ring_name' 
                    class="ring-name" 
                    v-if="multiring" 
                    :style="{ backgroundColor: post.ring_color }"
                >r/{{ post.ring_name }}</RouterLink>
                <span class="post-author">{{ post.author_username }}</span>
                <span class="post-date" :alt="c.postedOnYmd">{{ c.postedOn }}</span>
                <span class="nsfw-tag" v-if="post.nsfw">NSFW</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.post {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 100%;

    .post-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50px;
        margin-right: 20px;

        .upvote-downvote-area {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;

            .vote-up, .vote-down {
                cursor: pointer;
                transition: color 0.2s ease-in-out;
            }

            .vote-up:hover {
                color: #0f0;
            }

            .vote-down:hover {
                color: #f00;
            }
        }
    }

    a {
        text-decoration: none;
        color: #0D47A1;

        &:visited {
            color: #651FFF;
        }
    }

    .post-link {
        color: var(--color-post-link);
        &:visited {
            color: var(--color-post-link-visited);
        }
    }

    .post-right {
        display: flex;
        flex-direction: column;
        width: 100%;

        .post-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .post-actions {
            display: flex;
            flex-direction: row;
            align-items: center;
            column-gap: 10px;

            margin-top: 8px;

            .action {
                cursor: pointer;
                padding: 4px;
                border-radius: 5px;
                font-size: 0.8em;
                user-select: none;
            }

            .action-comment {
                display: flex;
                flex-direction: row;
                align-items: center;
                column-gap: 5px;

                color: var(--color-action-comment);
                border: 1px solid var(--color-action-comment-border);

                &:hover {
                    background-color: var(--color-action-comment);
                    color: var(--color-action-text-hover);
                }
            }
        }
    }

    h2 {
        font-size: 24px;
        margin-bottom: 10px;
    }

    p {
        font-size: 18px;
    }

    .post-metadata {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 10px;

        font-size: 0.8em;

        .post-author {
            font-weight: bold;
        }

        .post-date {
            color: #999;
        }

        .nsfw-tag {
            color: #fff;
            background-color: #830404;
            user-select: none;
            border-radius: 4px;
            padding: 0px 4px;
            font-weight: bold;
        }

        .ring-name {
            color: #fff;
            user-select: none;
            border-radius: 4px;
            padding: 0px 4px;
            font-weight: bold;
        }
    }
}
</style>