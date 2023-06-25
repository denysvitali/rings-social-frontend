<script setup lang="ts">
import type { Comment } from '@/models/models';
import { computed, type PropType } from 'vue';
import { DateTime } from 'luxon';
import VoteContainer from './VoteContainer.vue';
import UserLink from './UserLink.vue';
import { marked } from 'marked';
import createDOMPrufiy from 'dompurify';

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

const dompurify = createDOMPrufiy(window);

const c = computed(() => {
    return {
        renderedBody: (body: string) => {
            const renderedMd = marked.parse(body);
            const sanitized = dompurify.sanitize(renderedMd,
                {ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'code', 'pre', 'br', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']}
            );
            return sanitized;
        }
    }
});
</script>

<template>
    <div class="comments">
        <div v-for="comment in comments" :key="comment.id" class="comment" :class="{
          'comment-depth-0': comment.depth == 0,
        }">
            <div class="comment-content">
                <div class="comment-left">
                    <VoteContainer :score="comment.score" spacing="small" />
                    <div class="vertical-line"></div>
                </div>
                <div class="comment-right">
                    <div class="comment-metadata">
                        <UserLink 
                            :username="comment.author.username"
                            :admin="comment.author.admin"
                            class="comment-author"/>
                        <div class="comment-divider">•</div>
                        <div class="comment-date">{{ DateTime.fromISO(comment.createdAt).toRelative() }}</div>
                    </div>
                    <div class="comment-body" v-html="c.renderedBody(comment.body)"></div>
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

<style lang="scss">
/* 
    Not scoped, on purpose.
    Since we're rendering the markdown with marked, 
    we can't used scoped styles.
*/
.comments {
    display: flex;
    flex-direction: column;
    .comment {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        margin-bottom: 1rem;
        background-color: var(--color-post-background);
        border-radius: var(--generic-border-radius);
        padding: var(--comment-padding);

        &.comment-depth-0 {
            border: var(--generic-border);        
        }

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
                    a {
                        color: var(--color-link);
                        &:visited {
                            color: var(--color-link-visited);
                        }
                    }
                    pre {
                        display: block;
                        margin-top: 1em;
                        margin-bottom: 1em;
                        code {
                            display: block;
                            margin-top: 5px;
                            background-color: var(--color-code-background);
                            padding: var(--code-block-padding);
                        }
                    }

                    p {
                        code {
                            background-color: var(--color-code-background);
                            padding: var(--code-inline-padding);
                        }
                    }
                }
                .comment-metadata {
                    display: flex;
                    color: var(--color-dimmed);
                    font-size: 0.8rem;
                    column-gap: 10px;
                    margin-bottom: 8px;
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