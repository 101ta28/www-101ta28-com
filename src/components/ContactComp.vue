<template>
  <v-container class="py-8">
    <!-- Header Section -->
    <v-row class="justify-center mb-8">
      <v-col cols="12" class="text-center">
        <div class="d-flex align-center justify-center mb-4">
          <v-icon size="40" color="primary" class="mr-3">mdi-email-outline</v-icon>
          <h1 class="text-h3 text-md-h2 font-weight-bold">Contact</h1>
        </div>
        <p class="text-h6 text-medium-emphasis mb-0">
          お気軽にお声がけください
        </p>
      </v-col>
    </v-row>

    <!-- Contact Methods Section -->
    <v-row class="justify-center mb-8">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-6" elevation="2">
          <v-card-title class="text-h5 text-center mb-6 text-high-emphasis">
            <v-icon left class="mr-2" color="primary">mdi-account-network</v-icon>
            連絡手段・SNS
          </v-card-title>

          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="contact in socialLinks" :key="contact.title" class="d-flex">
              <v-card class="w-100 text-center contact-card" elevation="1" hover @click="openLink(contact.link)"
                :color="contact.color" variant="outlined">
                <v-card-text class="py-6">
                  <v-icon :color="typeof contact.iconColor === 'string' ? contact.iconColor : contact.iconColor.value" size="48" class="mb-3">
                    {{ contact.icon }}
                  </v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2 text-high-emphasis">{{ contact.title }}</h3>
                  <p class="text-body-2 text-medium-emphasis mb-0">{{ contact.description }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>


    <!-- GPG Information Section -->
    <v-row class="justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-expansion-panels class="mb-4">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon class="mr-3">mdi-shield-key</v-icon>
                <span class="text-h6">GPG暗号化情報</span>
                <v-spacer></v-spacer>
                <v-chip size="small" color="secondary" variant="outlined" class="ml-4">セキュリティ</v-chip>
              </div>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <v-card class="pa-4" elevation="0">
                <v-card-text>
                  <p class="text-body-2 mb-4">
                    セキュアな通信をご希望の場合は、GPG暗号化をご利用ください。
                  </p>

                  <v-row>
                    <v-col cols="12" md="6">
                      <h4 class="text-subtitle-1 mb-2">
                        <v-icon left size="small">mdi-fingerprint</v-icon>
                        Fingerprint
                      </h4>
                      <v-text-field :value="gpgFingerprint" readonly variant="outlined" density="compact"
                        append-inner-icon="mdi-content-copy"
                        @click:append-inner="copyToClipboard(gpgFingerprint)"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="d-flex align-center">
                      <v-btn color="secondary" variant="outlined" @click="showPublicKey = !showPublicKey"
                        :prepend-icon="showPublicKey ? 'mdi-eye-off' : 'mdi-eye'">
                        {{ showPublicKey ? '公開鍵を隠す' : '公開鍵を表示' }}
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-expand-transition>
                    <div v-show="showPublicKey">
                      <v-divider class="my-4"></v-divider>
                      <h4 class="text-subtitle-1 mb-2">
                        <v-icon left size="small">mdi-key-variant</v-icon>
                        公開鍵
                      </h4>
                      <v-textarea :value="gpgPublicKey" readonly variant="outlined" rows="10" density="compact"
                        class="font-monospace" append-inner-icon="mdi-content-copy"
                        @click:append-inner="copyToClipboard(gpgPublicKey)"></v-textarea>
                    </div>
                  </v-expand-transition>
                </v-card-text>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000" location="top">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar.show = false">
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

// Social Links
const socialLinks = ref([
  {
    title: 'GitHub',
    icon: 'mdi-github',
    iconColor: computed(() => theme.global.current.value.dark ? '#fff' : '#333'),
    color: 'grey-lighten-4',
    link: 'https://github.com/101ta28',
    description: 'コードとプロジェクト'
  },
  {
    title: 'X (Twitter)',
    icon: 'mdi-twitter',
    iconColor: '#1DA1F2',
    color: 'grey-lighten-4',
    link: 'https://twitter.com/101ta28',
    description: '日々の開発やプライベート'
  },
  {
    title: 'Instagram',
    icon: 'mdi-instagram',
    iconColor: '#E4405F',
    color: 'pink-lighten-5',
    link: 'https://www.instagram.com/101ta28/',
    description: '日常の写真や趣味'
  },
  {
    title: 'Blog',
    icon: 'mdi-post-outline',
    iconColor: '#FF6B35',
    color: 'orange-lighten-5',
    link: 'https://blog.101ta28.com',
    description: '技術記事と雑記'
  },
  {
    title: 'LinkedIn',
    icon: 'mdi-linkedin',
    iconColor: '#0077B5',
    color: 'blue-lighten-4',
    link: 'https://linkedin.com/in/101ta28',
    description: 'つながりとキャリア'
  },
  {
    title: 'BlueSky',
    icon: 'mdi-butterfly',
    iconColor: '#00A4F1',
    color: 'blue-lighten-4',
    link: 'https://bsky.app/profile/101ta28.com',
    description: 'たまにつぶやく場所'
  },
]);


// GPG Information
const showPublicKey = ref(false);
const gpgFingerprint = ref('DDEC7C9789DA48D8798F53A4ACF92881F31DA3B4');
const gpgPublicKey = ref(`-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEZiioSRYJKwYBBAHaRw8BAQdAT9FdnAUKSwLmLTYsEGXlUUFNELIAbkslnQyQ
m66imfW0M0ltYWkgVGF0c3V5YSAoS0lUKSA8aW1haUBuZXB0dW5lLmthbmF6YXdh
LWl0LmFjLmpwPoiWBBMWCgA+AhsDBQsJCAcCAiICBhUKCQgLAgQWAgMBAh4HAheA
FiEE3ex8l4naSNh5j1OkrPkogfMdo7QFAmadq7YCGQEACgkQrPkogfMdo7Rh/AD/
Tr+E651+8XKTZJioocx/44TwsKNXoaRH/MQetKL/0J4A/0Z0kCQ80HiQKYAl7tE+
e/Yp67sl5rLkqshW462uqkQOiJkEExYKAEEWIQTd7HyXidpI2HmPU6Ss+SiB8x2j
tAUCZp2khgIbAwUJCWcgZwULCQgHAgIiAgYVCgkICwIEFgIDAQIeBwIXgAAKCRCs
+SiB8x2jtLrFAQDGAXXOVpzDojuHXRKOQPRltDtbyTXM8LKikpZreEP/eAD9E/34
ilO7miNNg9WdBy/e8SoXFHEe6fcwlbzT+viC4wy0IUltYWkgVGF0c3V5YSA8d29y
a3RhMjhAZ21haWwuY29tPoiQBBMWCAA4AhsDBQsJCAcCBhUKCQgLAgQWAgMBAh4B
AheAFiEE3ex8l4naSNh5j1OkrPkogfMdo7QFAmadq6cACgkQrPkogfMdo7QPpQD8
Cnona0NRR/ipE9vN8Dl2YrONVdpTt45fj/DtEmXvYIYA/3nRZF3Wu8zIzJ4i/YJH
pyJR5sQ7D9GQksyVAxvTPjUCiJYEExYIAD4WIQTd7HyXidpI2HmPU6Ss+SiB8x2j
tAUCZiioSQIbAwUJCWcgZwULCQgHAgYVCgkICwIEFgIDAQIeAQIXgAAKCRCs+SiB
8x2jtLy6AP9fZX95Mx2OF/c4jMv3SwDr+aBl14PSdvG3BZbpn8q/aQD/T2F9luae
e0/ofTJHXNRs6GzaNIDNWs8Boblq3m+JRQC4MwRmnaqgFgkrBgEEAdpHDwEBB0BR
3NuhSqwAOaNNnZVDNVfX/VjFHbnGb9+T0oMO48IgkojvBBgWCgAgAhsCFiEE3ex8
l4naSNh5j1OkrPkogfMdo7QFAmadrqQAgXYgBBkWCgAdFiEE1G3EKLf/+pAUScg6
oAq4OAECUkMFAmadqqAACgkQoAq4OAECUkNnvgD/Ts+iw5G/FD+gKSrNBCNi3Xhl
CHNsKTI+Mn0LatQhY/sBAIFw7Qem8Qt+4VhYL2t5i2/J06D+/a84d7PKHiQdZIIE
CRCs+SiB8x2jtKNzAQD6dlBrMcMfixKyuukZDHCywA5GPtyfyGnL6MuZCrxLSgD9
GXDGRQq4sMH4VldioGuRuHGK6hr27f86HhsCbcKkvwO4MwRmnaw3FgkrBgEEAdpH
DwEBB0DTLpc6BFduuTIykpcJpsmxU2WoAs6yzhNo+qHwuJzQdYh4BBgWCgAgAhsg
FiEE3ex8l4naSNh5j1OkrPkogfMdo7QFAmadr4IACgkQrPkogfMdo7R2fAEAkwK5
Oht+HjJ/HJJSWf0TsrVu8OPimprYlavahVKrXJ8A/3lTQ2jkxy+ryjTbClwxpLZk
epLvzPtOxA1vwjAFYCgPuDgEZiioSRIKKwYBBAGXVQEFAQEHQC4MTQITF2Xp4l46
MfJWobFKwNUm1IOu2i0vfSUD4nh9AwEIB4h4BBgWCAAgAhsMFiEE3ex8l4naSNh5
j1OkrPkogfMdo7QFAmadrp8ACgkQrPkogfMdo7Rw5wEA4cta6t9zbjabc5CNkR5Q
Qud1b6nBOVVkUU/EM2A3n7gA/29caNCAP5Qe2tBgOc4rFmbOwFlcks7XFlBRAhpt
4kYE
=bqle
-----END PGP PUBLIC KEY BLOCK-----`);

// Snackbar for notifications
const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
});

// Methods
const openLink = (link) => {
  window.open(link, '_blank');
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    snackbar.value = {
      show: true,
      message: 'クリップボードにコピーしました',
      color: 'success'
    };
  } catch (err) {
    snackbar.value = {
      show: true,
      message: 'コピーに失敗しました',
      color: 'error'
    };
  }
};

</script>