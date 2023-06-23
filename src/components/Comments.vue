<script setup lang="ts">
import type { Comment } from '@/models/models';
import { type PropType } from 'vue';
import { DateTime } from 'luxon';
import VoteContainer from './VoteContainer.vue';

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
                    <VoteContainer :score="comment.score" spacing="small" />
                    <div class="vertical-line"></div>
                </div>
                <div class="comment-right">
                    <div class="comment-metadata">
                        <div class="comment-author">/u/{{ comment.author.username }}</div>
                        <div class="comment-divider">•</div>
                        <div class="comment-date">{{ DateTime.fromISO(comment.createdAt).toRelative() }}</div>
                    </div>
                    <div class="comment-body">{{ comment.body }}</div>
                    <div class="comment-actions">
                        <div class="action reply">
                            <font-awesome-icon class="icon" :icon="['fas', 'message']" />
                            <span class="text">Reply</span>
                        </div>
                    </div>

                    <div class="comment-children" v-if="comment.replies != null">
                        <div class="comment-children-divider" v-for="(n, i) in depth"></div>
                        <Comments :comments="comment.replies" :depth="comment.depth" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.comments {
    display: flex;
    flex-direction: column;
    .comment {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: var(--color-post-background);
        border-radius: var(--generic-border-radius);
        padding: var(--generic-padding);

        .comment-content {
            display: flex;
            flex-direction: row;
            column-gap: var(--generic-column-gap);
            .comment-left {
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                width: 1rem;

                .upvote-downvote-area {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    row-gap: 2px;
                }

                .vertical-line {
                    width: 2px;
                    height: 100%;
                    margin-top: 10px;
                    background-color: var(--color-comment-vertical-line);
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
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

                .comment-actions {
                    display: flex;
                    flex-direction: row;
                    column-gap: 8px;
                    margin-top: 8px;

                    .action {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        column-gap: 4px;
                        cursor: pointer;
                        transition: color 0.1s ease-in-out;
                        font-size: 0.8rem;
                        color: var(--color-comment-actions);
                    }
                    
                }
            }
        }

        .comment-children {
            margin-top: 8px;
            .comment-children-divider {
                width: 1px;
                margin-left: 0.5rem;
                margin-right: 0.5rem;
            }
        }
    }
}
</style>