<template>
  <ul class="is-hidden-desktop">
    <li><router-link to="/" class="has-text-primary nav-link">Set-up</router-link></li>
    <li><router-link to="/chat" class="has-text-primary nav-link">Chat</router-link></li>
    <li><router-link to="/wiki" class="has-text-primary nav-link">Wiki</router-link></li>
  </ul>
  <div class="app-container">
    <aside class="sidebar is-hidden-mobile">
      <div class="menu is-size-4">
        <p class="menu-label has-text-white p-2">
          Menu
        </p>
        <ul class="menu-list">
          <li><router-link to="/" class="has-text-primary p-4">Set-up</router-link></li>
          <li><router-link to="/chat" class="has-text-primary p-4">Chat</router-link></li>
          <div class="dropdown is-hoverable p-4">
            <div class="dropdown-trigger">
              <button class="button has-text-primary is-size-4" aria-haspopup="true" aria-controls="dropdown-menu4">
                <span>Wiki &darr;</span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu4" role="menu">
              <div class="dropdown-content 4">
                <div class="dropdown-item">
                  <router-link to="/setup-wiki" class="has-text-primary p-4 is-size-5">Start</router-link>
                </div>
                <div class="dropdown-item">
                  <router-link to="/chat-wiki" class="has-text-primary p-4 is-size-5">Chat</router-link>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </aside>
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
}

.sidebar {
  width: 13em;
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  border-right: 2px solid #00b89c;
}

.menu-label {
  border-bottom: 2px solid #00b89c;
}
.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  margin-left: 13em;
}

.menu-list {
  padding: unset;
  margin: unset;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}

@media (hover: hover) {
  a:hover {
    background-color: #04D1B2 !important;
  }
}

.button {
  background-color: unset !important;
  padding: unset;
  border: none;
}

.nav-link {
  display: block;
  padding: 0.5em 1em !important;
  margin: 0.2em 0 !important;
}

.dropdown-content {
  background-color: unset;

}
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>