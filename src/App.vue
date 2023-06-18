<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- A social network header -->
  <header>
    <div class="wrapper">
      <img class="logo" src="/logo.svg" alt="Rings Social" @click="$router.push('/')">
      <nav class="navbar">
        <RouterLink to="/" aria-label="Home">Home</RouterLink>
        <RouterLink to="/r/popular">Popular</RouterLink>
        <RouterLink to="/r/news">News</RouterLink>
      </nav>

      <div class="search-bar">
        <input type="text" placeholder="Search">
        <!-- Search Icon -->
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </div>

      <!-- User Profile Info -->
      <div class="profile">
        <!-- Get username from state: -->
        <span>john_doe</span>
        <img src="https://picsum.photos/32" alt="Profile Picture">
      </div>
    </div>
  </header>

  <div class="view">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
header {
  height: 80px;
  overflow: hidden;

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 20px;
  }

  .logo {
    height: 100%;
    cursor: pointer;
  }

  .navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  .search-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }

  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      border-radius: 50%;
      
    }

    span {
      margin-right: 10px;
    }

    &:hover {
      cursor: pointer;
    }
  }
}

div.view {
  margin-top: 20px;
}
</style>
