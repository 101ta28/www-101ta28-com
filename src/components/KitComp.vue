<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-start text-center fill-height">
      <v-row class="d-flex align-start justify-center">
        <v-col cols="auto">
          <h4 class="text-h4">Profile</h4>
          <div>
            <p class="text-body-1">
              名前: 今井 竜也（いまい たつや）
              <br />
              所属: 法人部 企画委員会室 企画調整課 (2024-07-18現在)
              <br />
              メールアドレス: imai@neptune.kanazawa-it.ac.jp
            </p>
          </div>
        </v-col>
        <v-col cols="12" v-for="gpgData in gpgDataList" :key="gpgData.title">
          <v-card class="mx-auto clickable" max-width="600">
            <v-card-title primary-title class="d-flex align-center justify-center">
              <h4 class="text-h5 text-center">{{ gpgData.title }}</h4>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" v-if="gpgData.title !== 'GPG Publickey'">
                  <v-text-field readonly dense rows="3" v-model="gpgData.text" />
                </v-col>
                <v-col cols="12" v-else-if="gpgData.title === 'GPG Publickey'">
                  <v-textarea readonly dense rows="10" v-model="gpgData.text" />
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

const gpgDataList = ref([
  { title: 'GPG ID', text: 'DE0CAE2A9FEE9AC8' },
  { title: 'GPG Fingerprint', text: '735C9FA03B5009C05CAD0B4CDE0CAE2A9FEE9AC8' },
  {
    title: 'GPG Publickey', text: `-----BEGIN GPG PUBLIC KEY BLOCK-----

mDMEZpih5xYJKwYBBAHaRw8BAQdAdd5SqZoI6N3ofM7jB7ce+yIgaVhcjfn2xqI2
LkcKrb20LUltYWkgVGF0c3V5YSA8aW1haUBuZXB0dW5lLmthbmF6YXdhLWl0LmFj
LmpwPoiZBBMWCgBBFiEEc1yfoDtQCcBcrQtM3gyuKp/umsgFAmaYoecCGwMFCQWj
fckFCwkIBwICIgIGFQoJCAsCBBYCAwECHgcCF4AACgkQ3gyuKp/umsi43AD/binx
gXYEXH1TNTR+yL+3qICMfvnH0jVfECJq58oQ0b8BAN/jcc/Q2pnHeBzrtqPLf/Md
DOM/5KEeB6sYuixGvygHuDgEZpih5xIKKwYBBAGXVQEFAQEHQF8jJ8ReVIv3nKSL
l8ksNbyfBuhtszw7EWqsXQpQ9nhCAwEIB4h+BBgWCgAmFiEEc1yfoDtQCcBcrQtM
3gyuKp/umsgFAmaYoecCGwwFCQWjfckACgkQ3gyuKp/umsj2ogEA1fP75HwaeODY
84vJ1ZLuowQQIQxTod0S6PVARs8grfQBAIk4l6+/ntmx/rWft+vfCkAoEQOa8i7I
IvfWXMp9ZikM
=srfA
-----END GPG PUBLIC KEY BLOCK-----` },
])

</script>