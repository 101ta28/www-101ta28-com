<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-start text-center fill-height">
      <v-icon class="text-h2">mdi-rss</v-icon>
      <h2 class="text-h2">Contact</h2>

      <div class="py-3" />

      <v-row class="d-flex align-start justify-center">
        <v-col cols="12" v-for="contact in contactList" :key="contact.title">
          <v-card class="mx-auto clickable" max-width="600" @click="openLink(contact.link)">
            <v-card-title primary-title class="d-flex align-center justify-center">
              <v-icon class="text-h4">{{ contact.icon }}</v-icon>
              <h4 class="text-h5 text-center">{{ contact.title }}</h4>
            </v-card-title>
          </v-card>
        </v-col>
        <!-- pgpDataList -->
        <v-col cols="12" v-for="pgpData in pgpDataList" :key="pgpData.title">
          <v-card class="mx-auto clickable" max-width="600">
            <v-card-title primary-title class="d-flex align-center justify-center">
              <h4 class="text-h5 text-center">{{ pgpData.title }}</h4>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" v-if="pgpData.title !== 'PGP Publickey'">
                  <v-text-field readonly dense rows="3" v-model="pgpData.text" />
                </v-col>
                <v-col cols="12" v-else-if="pgpData.title === 'PGP Publickey'">
                  <v-textarea readonly dense rows="10" v-model="pgpData.text" />
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

const pgpDataList = ref([
  { title: 'PGP ID', text: 'ACF92881F31DA3B4' },
  { title: 'PGP Fingerprint', text: 'DDEC7C9789DA48D8798F53A4ACF92881F31DA3B4' },
  {
    title: 'PGP Publickey', text: `-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEZiioSRYJKwYBBAHaRw8BAQdAT9FdnAUKSwLmLTYsEGXlUUFNELIAbkslnQyQ
m66imfW0IUltYWkgVGF0c3V5YSA8d29ya3RhMjhAZ21haWwuY29tPoiWBBMWCAA+
FiEE3ex8l4naSNh5j1OkrPkogfMdo7QFAmYoqEkCGwMFCQlnIGcFCwkIBwIGFQoJ
CAsCBBYCAwECHgECF4AACgkQrPkogfMdo7S8ugD/X2V/eTMdjhf3OIzL90sA6/mg
ZdeD0nbxtwWW6Z/Kv2kA/09hfZbmnntP6H0yR1zUbOhs2jSAzVrPAaG5at5viUUA
tDNJbWFpIFRhdHN1eWEgKEtJVCkgPGltYWlAbmVwdHVuZS5rYW5hemF3YS1pdC5h
Yy5qcD6ImQQTFgoAQRYhBN3sfJeJ2kjYeY9TpKz5KIHzHaO0BQJmnaSGAhsDBQkJ
ZyBnBQsJCAcCAiICBhUKCQgLAgQWAgMBAh4HAheAAAoJEKz5KIHzHaO0usUBAMYB
dc5WnMOiO4ddEo5A9GW0O1vJNczwsqKSlmt4Q/94AP0T/fiKU7uaI02D1Z0HL97x
KhcUcR7p9zCVvNP6+ILjDLg4BGYoqEkSCisGAQQBl1UBBQEBB0AuDE0CExdl6eJe
OjHyVqGxSsDVJtSDrtotL30lA+J4fQMBCAeIfgQYFggAJhYhBN3sfJeJ2kjYeY9T
pKz5KIHzHaO0BQJmKKhJAhsMBQkJZyBnAAoJEKz5KIHzHaO0YrYBAM2S6j8iArjH
aX2ejqNilJTGV7Ehc/7FKq8HKp7b9F73AQDRME/+Z1vnUYix8zKdPvYtYlwq5IgN
PD8PpYoIkpy8CQ==
=0Zg/
-----END PGP PUBLIC KEY BLOCK-----
` },
])

const openLink = (link) => {
  window.open(link, '_blank')
}
</script>