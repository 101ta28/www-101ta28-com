<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-start text-center fill-height">
      <v-icon class="text-h2">mdi-rss</v-icon>
      <h2 class="text-h2">Contact</h2>

      <div class="py-3" />

      <v-row class="d-flex align-start justify-center">
        <v-col v-for="contact in contactList" :key="contact.title" cols="12">
          <v-card class="mx-auto clickable" max-width="600" @click="openLink(contact.link)">
            <v-card-title class="d-flex align-center justify-center" primary-title>
              <v-icon class="text-h4">{{ contact.icon }}</v-icon>
              <h4 class="text-h5 text-center">{{ contact.title }}</h4>
            </v-card-title>
          </v-card>
        </v-col>
        <!-- gpgDataList -->
        <v-col v-for="gpgData in gpgDataList" :key="gpgData.title" cols="12">
          <v-card class="mx-auto clickable" max-width="600">
            <v-card-title class="d-flex align-center justify-center" primary-title>
              <h4 class="text-h5 text-center">{{ gpgData.title }}</h4>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-if="gpgData.title !== 'GPG Publickey'" cols="12">
                  <v-text-field v-model="gpgData.text" dense readonly rows="3" />
                </v-col>
                <v-col v-else-if="gpgData.title === 'GPG Publickey'" cols="12">
                  <v-textarea v-model="gpgData.text" dense readonly rows="10" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const contactList = ref([
  { title: 'Twitter', icon: 'mdi-twitter', link: 'https://twitter.com/101ta28' },
  { title: 'GitHub', icon: 'mdi-github', link: 'https://github.com/101ta28' },
  { title: 'Instagram', icon: 'mdi-instagram', link: 'https://www.instagram.com/101ta28/' },
])

const gpgDataList = ref([
  { title: 'GPG Fingerprint', text: 'DDEC7C9789DA48D8798F53A4ACF92881F31DA3B4' },
  {
    title: 'GPG Publickey', text: `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
    -----END PGP PUBLIC KEY BLOCK-----` },
])

const openLink = (link) => {
  window.open(link, '_blank')
}
</script>
