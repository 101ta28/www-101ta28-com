<template>
  <v-app-bar elevation="1" color="surface" class="header-bar" :class="{ 'header-scrolled': isScrolled }">
    <!-- Mobile Navigation Toggle -->
    <v-app-bar-nav-icon v-if="isMobile" @click="drawer = !drawer" color="primary"></v-app-bar-nav-icon>

    <!-- Logo/Brand Section -->
    <v-app-bar-title class="d-flex align-center">
      <v-btn href="/" variant="text" class="text-none pa-0 logo-btn" :ripple="false">
        <div class="d-flex align-center">
          <v-avatar size="32" class="mr-3">
            <img src="/img/ta28-icon.webp" alt="101ta28 Logo" style="width: 100%; height: 100%;" />
          </v-avatar>
          <span class="text-h6 font-weight-bold text-primary">101ta28</span>
        </div>
      </v-btn>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Desktop Navigation -->
    <div v-if="!isMobile" class="d-flex align-center">
      <v-btn v-for="link in links" :key="link.text" :href="link.pageLink" :target="link.external ? '_blank' : '_self'"
        variant="text" class="mx-1 nav-btn" :class="{ 'nav-btn-active': isActiveRoute(link.pageLink) }"
        :prepend-icon="link.icon" size="default">
        {{ link.text }}
      </v-btn>

      <!-- Theme Toggle -->
      <v-divider vertical class="mx-3"></v-divider>
      <v-btn icon variant="text" @click="toggleTheme" class="theme-toggle-btn"
        :title="theme.global.current.value.dark ? 'ライトモードに切替' : 'ダークモードに切替'">
        <v-icon>
          {{ theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}
        </v-icon>
      </v-btn>
    </div>

    <!-- Mobile Theme Toggle -->
    <v-btn v-if="isMobile" icon variant="text" @click="toggleTheme" class="theme-toggle-btn ml-2">
      <v-icon>
        {{ theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}
      </v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary location="left" width="280" class="mobile-drawer">

    <!-- Navigation Links -->
    <v-list class="pa-2">
      <v-list-item v-for="link in links" :key="link.text" :href="link.pageLink"
        :target="link.external ? '_blank' : '_self'" class="mb-1 rounded-lg"
        :class="{ 'bg-primary-lighten-4': isActiveRoute(link.pageLink) }" lines="one">
        <template v-slot:prepend>
          <v-icon :color="isActiveRoute(link.pageLink) ? 'primary' : 'grey-darken-1'">
            {{ link.icon }}
          </v-icon>
        </template>

        <v-list-item-title class="font-weight-medium" :class="{ 'text-primary': isActiveRoute(link.pageLink) }">
          {{ link.text }}
        </v-list-item-title>

        <template v-slot:append v-if="link.external">
          <v-icon size="small" color="grey-darken-1">mdi-open-in-new</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useTheme, useDisplay } from 'vuetify';
import { useRoute } from 'vue-router';

const theme = useTheme();
const display = useDisplay();
const route = useRoute();

// Reactive variables
const drawer = ref(false);
const scrollY = ref(0);

// Computed properties
const isMobile = computed(() => display.mobile.value);
const isScrolled = computed(() => scrollY.value > 10);

// Navigation links
const links = ref([
  {
    icon: 'mdi-home',
    text: 'Home',
    pageLink: "/",
    external: false
  },
  {
    icon: 'mdi-code-tags',
    text: 'Work',
    pageLink: "/work",
    external: false
  },
  {
    icon: 'mdi-post-outline',
    text: 'Blog',
    pageLink: "https://blog.101ta28.com",
    external: true
  },
  {
    icon: 'mdi-email-outline',
    text: 'Contact',
    pageLink: "/contact",
    external: false
  },
]);

// Methods
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};

const isActiveRoute = (link) => {
  if (link === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(link);
};

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.header-bar {
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.header-scrolled {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.logo-btn:hover {
  background-color: transparent !important;
}

.nav-btn {
  text-transform: none;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
  transform: translateY(-1px);
}

.nav-btn-active {
  background-color: rgba(var(--v-theme-primary), 0.15);
  color: rgb(var(--v-theme-primary));
}

.theme-toggle-btn {
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.theme-toggle-btn:hover {
  transform: rotate(20deg);
}

.mobile-drawer {
  backdrop-filter: blur(10px);
}

.mobile-drawer .v-list-item {
  transition: all 0.2s ease;
}

.mobile-drawer .v-list-item:hover {
  transform: translateX(4px);
}

.border-b {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.border-t {
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>