<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-start text-center fill-height">
      <v-icon class="text-h2">mdi-code-tags</v-icon>
      <h2 class="text-h2">Works</h2>
      <div class="py-3" />
      <v-row class="d-flex align-start justify-center">
        <v-col cols="12" sm="6" md="4" v-for="work in works" :key="work.title">
          <v-card class="mx-auto" max-width="344">
            <div v-if="work.img">
              <a :href="work.img" target="_blank">
                <v-img :src="work.img" :aspect-ratio="16 / 9" />
              </a>
            </div>
            <div v-else>
              <v-avatar color="grey lighten-2" size="192">
                <v-icon dark size="96">mdi-image-off</v-icon>
              </v-avatar>
            </div>
            <v-card-title primary-title>
              <div>
                <h6 class="headline mb-0" style="color: #FFA500">{{ work.year }}</h6>
                <h4 class="headline mb-0" v-html="work.title.replace(/\n/g, '<br />')" />
              </div>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <div>
                <p v-html="work.text.replace(/\n/g, '<br />')" />
                <v-divider />
                <p><b>使用技術</b><br>{{ work.tech }}</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const works = ref([
  { year: '2023年度', img: 'img/shinkou_hp.webp', title: '不動産HPの改良', text: '住まいサポートデスク新篁の\nホームページ改良を行いました。', tech: '既存システム利用' },
  { year: '2023年度', img: 'img/gakuyusha_hp.webp', title: '会社HPの改良', text: '株式会社学侑社の\nホームページ改良を行いました。', tech: '既存システム利用' },
  { year: '2023年1月', img: 'img/borrow.webp', title: '社内システムの開発・運用', text: '社内システム開発と運用を行いました。', tech: 'Vue, Python(FastAPI), Docker Compose' },
  { year: '2022年度', title: '大手コンテンツのHP改良', text: 'チームにてスケジュール機能を作成しました。', tech: 'PHP' },
  { year: '2022年2月', img: 'img/42_intra.webp', title: '42東京入学', text: '42東京に入学しました。\n今はブラックホール(時間切れによる退学)です。', tech: 'C, Shell' },
  { year: '2020年10月頃', img: 'img/sakito_hp.webp', title: '学生向けアンケートサイトの\n保守管理', text: '株式会社CirKitにて\nSAKITOの新機能実装や保守管理を行いました。', tech: 'Ruby on Rails, MySQL' },
  { year: '2020年6月頃', img: 'img/cirkit_hp.webp', title: 'ホームページ改修', text: '株式会社CirKitのホームページを\nスマートフォン対応させました。', tech: 'React, TypeScript' },
  { year: '2019年度', img: 'img/ar_paper.webp', title: '室内情報可視化の研究', text: '室内情報可視化の研究を行いました。', tech: 'Unity, C#, Java' },
])

</script>
