<script setup lang="ts">
import type { Comment } from '@/models/models';
import type { PropType } from 'vue';
import { DateTime } from 'luxon';

const props = defineProps({
    comments: {
        type: Array as PropType<Array<Comment>>,
        required: true
    },
    depth: {
        type: Number,
        default: 0,
    }
});
</script>

<template>
    <div class="comments">
        <div v-for="comment in comments" :key="comment.id" class="comment">
            <div class="comment-content">
                <div class="comment-left">
                    <div class="upvote-downvote-area">
                        <font-awesome-icon :icon="['fas', 'arrow-up']" class="vote-up" />
                        <span class="comment-score">{{ comment.score }}</span>
                        <font-awesome-icon :icon="['fas', 'arrow-down']" class="vote-down "/>
                    </div>
                </div>
                <div class="comment-right">
                    <div class="comment-metadata">
                        <div class="comment-author">/u/{{ comment.author.username }}</div>
                        <div class="comment-divider">•</div>
                        <div class="comment-date">{{ DateTime.fromISO(comment.createdAt).toLocaleString(DateTime.DATETIME_MED) }}</div>
                    </div>
                    <div class="comment-body">{{ comment.body }}</div>
                </div>
            </div>

            <div class="comment-children" v-if="comment.replies != null">
                <div class="comment-children-divider" v-for="(n, i) in depth"></div>
                <Comments :comments="comment.replies" :depth="comment.depth" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.comments {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .comment {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .comment-content {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            .comment-left {
                width: 1rem;
                margin-right: 1rem;

                .upvote-downvote-area {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    row-gap: 2px;
                }

            }
            .comment-right {
                display: flex;
                flex-direction: column;

                .comment-body {
                    margin-bottom: 0.5rem;
                }
                .comment-metadata {
                    display: flex;
                    color: var(--color-dimmed);
                    font-size: 0.8rem;
                    column-gap: 10px;
                    margin-bottom: 8px;
                    .comment-author {
                        font-weight: bold;
                        color: var(--color-user);
                    }
                }
            }
        }

        .comment-children {
            margin-top: 12px;
            margin-left: 2rem;
            .comment-children-divider {
                width: 1px;
                margin-left: 0.5rem;
                margin-right: 0.5rem;
            }
        }
    }
}
</style>