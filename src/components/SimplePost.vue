<script setup lang="ts">
import { ref, type PropType, type Ref, computed } from 'vue';
import type { SimplePost } from '@/models/models';
import { DateTime } from 'luxon';
import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

let props = defineProps({
    post: {
        type: Object as PropType<SimplePost>,
        required: true
    },
    multiring: {
        type: Boolean as PropType<boolean>,
        default: false
    }
});

let c = computed(() => {
    return {
        postedOn: DateTime.fromISO(props.post.createdAt).toRelative(),
        postedOnYmd: DateTime.fromISO(props.post.createdAt).toLocaleString(DateTime.DATETIME_MED)
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
            <div v-if="post.link != null" class="post-title-container">
                <a :href="post.link" class="post-link" target="_blank">
                    <span class="post-title">{{ post.title }}</span>
                </a>
            </div>
            <div v-else class="post-title-container">
                <RouterLink 
                    :to="`/r/${post.ringName}/${post.id}`" 
                    class="post-title"
                >
                <div class="post-title">{{ post.title }}</div>
                </RouterLink>
            </div>
            <div class="post-metadata">
                <div class="domain element-divider" v-if="post.domain">
                    <span class="post-domain">{{ post.domain }}</span>
                    <span class="post-divider">•</span>
                </div>
                <div class="author element-divider">
                    <span class="post-author">/u/{{ post.authorUsername }}</span>
                    <span class="post-divider">•</span>
                </div>
                <div class="date element-divider">
                    <span class="post-date" :alt="c.postedOnYmd">{{ c.postedOn }}</span>
                </div>
                <span class="nsfw-tag" v-if="post.nsfw">NSFW</span>
            </div>

            <div class="post-body" v-if="post.body != null">
                {{ post.body }}
            </div>

            <div class="post-actions">
                <RouterLink 
                    :to="`/r/${post.ringName}/${post.id}`" 
                    class="action action-comment"
                >
                    <font-awesome-icon class="icon" :icon="['fas', 'comment']" />
                    <span class="post-comment-count">{{ post.commentsCount }}</span>
                </RouterLink>
            </div>
        </div>

        <div class="post-image">
            <img :src="`https://picsum.photos/seed/${post.id}/200/300`" alt="Post Image">
        </div>
    </div>
</template>

<style scoped lang="scss">
.post {
    display: flex;
    flex-direction: row;
    width: 100%;
    column-gap: 20px;
    padding-bottom: 10px;
    

    .post-image {
        display: flex;
        width: 100px;
        max-height: 100px;
        border-radius: 5px;
        overflow: hidden;
        img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }

    .post-right {
        flex: 1;
    }

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

            .post-score {
                user-select: none;
            }
        }
    }

    .post-body {
        margin-top: 10px;
    }

    a {
        text-decoration: none;
        color: #0D47A1;

        &:visited {
            color: #651FFF;
        }
    }


    .post-right {
        display: flex;
        flex-direction: column;
        width: 100%;

        .post-title-container {
            font-size: 20px;
            line-height: 20px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .post-actions {
            display: flex;
            flex-direction: row;
            align-items: center;
            column-gap: 10px;
            margin-top: 16px;

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
        margin-top: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 10px;

        font-size: 0.8em;

        .element-divider {
            display: flex;
            column-gap: 10px;
        }

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

@media screen and (max-width: 600px) {
    .post {
        .post-image {
            display: none;
            width: 50px;
            max-height: 50px;
        }

        .post-left {
            margin-right: 8px;
        }
        
        .post-right {
            .post-metadata {
                div.date {
                    display: none;
                }

                div.author {
                    .post-divider {
                        display: none;
                    }
                }
            }
        }
    }
}
</style>
