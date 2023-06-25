<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue';
import ProfilePicture from './components/ProfilePicture.vue';

const username = "john_doe";
</script>

<template>
  <!-- A social network header -->
  <header>
    <div class="wrapper">
      <RouterLink to="/" class="logo">
        <img src="/logo.svg" alt="Rings Social"/>
      </RouterLink>

      <SearchBar class="search-bar"/>

      <!-- User Profile Info -->
      <div class="profile">
        <!-- Get username from state: -->
        <span class="username">{{ username }}</span>
        <ProfilePicture 
          :username="username"
          class="profile-picture"
        />
      </div>
    </div>
  </header>

  <div class="view">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
header {
  background-color: var(--color-header-background);
  height: 80px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);


  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 20px;      
    column-gap: 24px;
  }

  .logo {
    display: block;
    height: 100%;
    width: 40px;
    height: 40px;
    img {
      height: 100%;
    }
    cursor: pointer;
  }

  .navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  .search-bar {
    width: 80%;
    max-width: 600px;
  }

  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 12px;

    .profile-picture {
      width: 40px;
      height: 40px;
      object-fit: cover;
      img {
        width: 100%;
        height: 100%;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }
}

div.view {
  margin-top: 20px;

  padding: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-width: 1200px;
}

@media screen and (max-width: 400px){
  header {
    $imageSize: 32px;
    .logo {
      width: $imageSize;
      height: $imageSize;
      img {
        width: $imageSize;
        height: $imageSize;
      }
    }
    .search-bar {
      justify-self: stretch;
    }

    .profile {
      img {
        width: $imageSize;
        height: $imageSize;
      }
      .username {
        display: none;
      }
    }
  }
}
</style>
