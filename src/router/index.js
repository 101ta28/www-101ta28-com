/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes } from 'vue-router/auto-routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const siteUrl = 'https://www.101ta28.com';
const seoByPath = {
  '/': {
    title: '101ta28 Site',
    description: '101ta28のポートフォリオサイトです。',
  },
  '/work': {
    title: 'Work | 101ta28 Site',
    description: '101ta28の制作実績と開発経験を紹介します。',
  },
  '/contact': {
    title: 'Contact | 101ta28 Site',
    description: '101ta28への連絡先と各種プロフィールリンクです。',
  },
};

const setMetaTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const setCanonicalLink = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

router.afterEach((to) => {
  const normalizedPath = to.path === '/' ? '/' : to.path.replace(/\/$/, '');
  const seo = seoByPath[normalizedPath];
  const canonicalPath = seo ? normalizedPath : '/';
  const canonicalUrl = new URL(canonicalPath, siteUrl).href;

  document.title = seo?.title ?? 'Not Found | 101ta28 Site';
  setMetaTag('meta[name="description"]', {
    name: 'description',
    content: seo?.description ?? '指定されたページは見つかりませんでした。',
  });
  setMetaTag('meta[name="robots"]', {
    name: 'robots',
    content: seo ? 'index,follow' : 'noindex,follow',
  });
  setCanonicalLink(canonicalUrl);
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
