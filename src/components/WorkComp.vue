<template>
  <v-container class="py-8">
    <!-- Header Section -->
    <v-row class="justify-center mb-8">
      <v-col cols="12" class="text-center">
        <div class="d-flex align-center justify-center mb-4">
          <v-icon size="40" color="primary" class="mr-3">mdi-code-tags</v-icon>
          <h1 class="text-h3 text-md-h2 font-weight-bold">Works</h1>
        </div>
        <p class="text-h6 text-grey-darken-1 mb-0">
          これまでに携わった開発・制作物をご紹介します
        </p>
      </v-col>
    </v-row>

    <!-- Filter Section -->
    <v-row class="justify-center mb-6">
      <v-col cols="12" md="8">
        <v-card class="pa-4" elevation="1">
          <v-row align="center">
            <v-col cols="12" md="6">
              <v-select v-model="selectedCategory" :items="categories" label="カテゴリ"
                prepend-inner-icon="mdi-filter-variant" variant="outlined" density="compact" clearable></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete v-model="selectedTech" :items="techOptions" label="技術スタック" prepend-inner-icon="mdi-cog"
                variant="outlined" density="compact" clearable multiple chips></v-autocomplete>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Works Grid -->
    <v-row class="justify-center">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" sm="6" lg="4" v-for="work in filteredWorks" :key="work.id" class="d-flex">
            <v-card class="d-flex flex-column w-100" elevation="2" hover>
              <!-- Image Section -->
              <div class="position-relative">
                <v-img v-if="work.img" :src="work.img" :aspect-ratio="16 / 9" cover class="work-image">
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                  </template>
                </v-img>
                <div v-else class="d-flex align-center justify-center bg-grey-lighten-3" style="height: 200px;">
                  <v-icon size="64" color="grey-darken-1">mdi-image-off</v-icon>
                </div>

                <!-- Year Badge -->
                <v-chip class="position-absolute work-year-chip" color="primary" size="small"
                  style="top: 12px; left: 12px;">
                  {{ work.year }}
                </v-chip>

                <!-- Category Badge -->
                <v-chip class="position-absolute work-category-chip" :color="work.categoryColor" size="small"
                  style="top: 12px; right: 12px;" variant="elevated">
                  {{ work.category }}
                </v-chip>
              </div>

              <!-- Content Section -->
              <v-card-title class="pb-2">
                <h3 class="text-h6 line-clamp-2" v-html="work.title.replace(/\n/g, '<br />')"></h3>
              </v-card-title>

              <v-card-text class="flex-grow-1 pb-2">
                <p class="text-body-2 text-grey-darken-1 line-clamp-3 mb-4" v-html="work.text.replace(/\n/g, '<br />')">
                </p>

                <!-- Tech Stack -->
                <div class="mb-3">
                  <p class="text-caption font-weight-bold mb-2">使用技術</p>
                  <div class="d-flex flex-wrap ga-1">
                    <v-chip v-for="tech in work.techArray" :key="tech" size="x-small" variant="outlined"
                      color="secondary">
                      {{ tech }}
                    </v-chip>
                  </div>
                </div>
              </v-card-text>

              <!-- Actions -->
              <v-card-actions v-if="work.link || work.github">
                <v-spacer></v-spacer>
                <v-btn v-if="work.link" :href="work.link" target="_blank" variant="outlined" size="small"
                  prepend-icon="mdi-open-in-new">
                  詳細
                </v-btn>
                <v-btn v-if="work.github" :href="work.github" target="_blank" variant="outlined" size="small"
                  prepend-icon="mdi-github">
                  GitHub
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-if="filteredWorks.length === 0" class="justify-center">
      <v-col cols="12" class="text-center py-12">
        <v-icon size="64" color="grey-darken-1" class="mb-4">mdi-magnify-close</v-icon>
        <h3 class="text-h6 text-grey-darken-1 mb-2">該当する作品が見つかりません</h3>
        <p class="text-body-2 text-grey-darken-2">フィルターを変更してお試しください</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';

// フィルター用のリアクティブ変数
const selectedCategory = ref(null);
const selectedTech = ref([]);

// 作品データの拡張
const works = ref([
  {
    id: 1,
    year: '2023',
    img: 'img/shinkou_hp.webp',
    title: '不動産HPの改良',
    text: '住まいサポートデスク新篁のホームページ改良を行いました。既存システムを活用しつつ、ユーザビリティの向上を図りました。',
    tech: '既存システム利用',
    techArray: ['既存システム'],
    category: 'Web開発',
    categoryColor: 'blue'
  },
  {
    id: 2,
    year: '2023',
    img: 'img/gakuyusha_hp.webp',
    title: '会社HPの改良',
    text: '株式会社学侑社のホームページ改良を行いました。コーポレートサイトとしての機能性と視認性を重視した設計を実施。',
    tech: '既存システム利用',
    techArray: ['既存システム'],
    category: 'Web開発',
    categoryColor: 'blue'
  },
  {
    id: 3,
    year: '2023',
    img: 'img/borrow.webp',
    title: '社内システムの開発・運用',
    text: '社内システムの開発と運用を担当しました。Vue.jsでフロントエンド、FastAPIでバックエンドを構築し、Docker Composeで環境構築を行いました。',
    tech: 'Vue, Python(FastAPI), Docker Compose',
    techArray: ['Vue.js', 'Python', 'FastAPI', 'Docker'],
    category: 'フルスタック開発',
    categoryColor: 'green'
  },
  {
    id: 4,
    year: '2022',
    title: '大手コンテンツのHP改良',
    text: 'チームでスケジュール機能の開発を担当しました。既存のPHPシステムに機能追加を行い、ユーザー体験の向上に貢献しました。',
    tech: 'PHP',
    techArray: ['PHP'],
    category: 'Web開発',
    categoryColor: 'blue'
  },
  {
    id: 5,
    year: '2022',
    img: 'img/42_intra.webp',
    title: '42東京入学',
    text: '42東京に入学し、ピア・ツー・ピア学習を通じてC言語とシェルスクリプトを学習しました。現在はブラックホール（時間切れによる退学）状態です。',
    tech: 'C, Shell',
    techArray: ['C', 'Shell'],
    category: '学習・教育',
    categoryColor: 'purple'
  },
  {
    id: 6,
    year: '2020',
    img: 'img/sakito_hp.webp',
    title: '学生向けアンケートサイトの保守管理',
    text: '株式会社CirKitにてSAKITOの新機能実装や保守管理を担当しました。Ruby on Railsを使用したWebアプリケーションの開発・運用に携わりました。',
    tech: 'Ruby on Rails, MySQL',
    techArray: ['Ruby on Rails', 'MySQL'],
    category: 'Web開発',
    categoryColor: 'blue'
  },
  {
    id: 7,
    year: '2020',
    img: 'img/cirkit_hp.webp',
    title: 'ホームページ改修',
    text: '株式会社CirKitのホームページをスマートフォン対応させました。ReactとTypeScriptを使用してレスポンシブデザインを実装しました。',
    tech: 'React, TypeScript',
    techArray: ['React', 'TypeScript'],
    category: 'フロントエンド開発',
    categoryColor: 'orange'
  },
  {
    id: 8,
    year: '2019',
    img: 'img/ar_paper.webp',
    title: '室内情報可視化の研究',
    text: 'ARを活用した室内情報可視化システムの研究開発を行いました。UnityとC#を使用してモバイルアプリケーションを開発しました。',
    tech: 'Unity, C#, Java',
    techArray: ['Unity', 'C#', 'Java'],
    category: '研究開発',
    categoryColor: 'red'
  },
]);

// カテゴリーオプション
const categories = ref([
  { title: 'すべて', value: null },
  { title: 'Web開発', value: 'Web開発' },
  { title: 'フロントエンド開発', value: 'フロントエンド開発' },
  { title: 'フルスタック開発', value: 'フルスタック開発' },
  { title: '研究開発', value: '研究開発' },
  { title: '学習・教育', value: '学習・教育' }
]);

// 技術スタックオプション
const techOptions = computed(() => {
  const allTech = new Set();
  works.value.forEach(work => {
    work.techArray.forEach(tech => allTech.add(tech));
  });
  return Array.from(allTech).sort();
});

// フィルター済み作品リスト
const filteredWorks = computed(() => {
  let filtered = works.value;

  // カテゴリーフィルター
  if (selectedCategory.value) {
    filtered = filtered.filter(work => work.category === selectedCategory.value);
  }

  // 技術スタックフィルター
  if (selectedTech.value && selectedTech.value.length > 0) {
    filtered = filtered.filter(work =>
      selectedTech.value.some(tech => work.techArray.includes(tech))
    );
  }

  return filtered;
});
</script>