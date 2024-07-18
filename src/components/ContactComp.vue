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
uDgEZiioSRIKKwYBBAGXVQEFAQEHQC4MTQITF2Xp4l46MfJWobFKwNUm1IOu2i0v
fSUD4nh9AwEIB4h+BBgWCAAmFiEE3ex8l4naSNh5j1OkrPkogfMdo7QFAmYoqEkC
GwwFCQlnIGcACgkQrPkogfMdo7RitgEAzZLqPyICuMdpfZ6Oo2KUlMZXsSFz/sUq
rwcqntv0XvcBANEwT/5nW+dRiLHzMp0+9i1iXCrkiA08Pw+ligiSnLwJ
=hYiD
-----END PGP PUBLIC KEY BLOCK-----` },
])

const openLink = (link) => {
  window.open(link, '_blank')
}
</script>