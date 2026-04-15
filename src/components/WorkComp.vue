<template>
  <v-container class="py-8">
    <!-- Header Section -->
    <v-row class="justify-center mb-8">
      <v-col
        cols="12"
        class="text-center"
      >
        <div class="d-flex align-center justify-center mb-4">
          <v-icon
            size="40"
            color="primary"
            class="mr-3"
          >
            mdi-code-tags
          </v-icon>
          <h1 class="text-h3 text-md-h2 font-weight-bold">
            Works
          </h1>
        </div>
        <p class="text-h6 text-medium-emphasis mb-0">
          これまでに携わった開発・制作物をご紹介します
        </p>
      </v-col>
    </v-row>

    <!-- Filter Section -->
    <v-row class="justify-center mb-6">
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          class="pa-4"
          elevation="1"
        >
          <v-row align="center">
            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="selectedCategory"
                :items="categories"
                label="カテゴリ"
                prepend-inner-icon="mdi-filter-variant"
                variant="outlined"
                density="compact"
                clearable
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-autocomplete
                v-model="selectedTech"
                :items="techOptions"
                label="技術スタック"
                prepend-inner-icon="mdi-cog"
                variant="outlined"
                density="compact"
                clearable
                multiple
                chips
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Works Grid -->
    <v-row class="justify-center">
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="work in filteredWorks"
            :key="work.id"
            cols="12"
            sm="6"
            lg="4"
            class="d-flex"
          >
            <v-card
              class="work-card d-flex flex-column w-100"
              elevation="2"
              hover
            >
              <!-- Image Section -->
              <div class="work-media position-relative">
                <button
                  v-if="work.img"
                  type="button"
                  class="work-media-button"
                  @click="openImageDialog(work)"
                >
                  <v-img
                    :src="work.img"
                    cover
                    class="work-image"
                  >
                    <template #placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular indeterminate />
                      </div>
                    </template>
                  </v-img>
                  <span class="work-media-hint">
                    クリックで拡大
                  </span>
                </button>
                <div
                  v-else
                  class="work-media-placeholder d-flex align-center justify-center bg-surface-variant"
                >
                  <v-icon
                    size="64"
                    color="on-surface-variant"
                  >
                    mdi-image-off
                  </v-icon>
                </div>

                <!-- Year Badge -->
                <v-chip
                  class="position-absolute work-year-chip"
                  color="primary"
                  size="small"
                  style="top: 12px; left: 12px;"
                >
                  {{ work.year }}
                </v-chip>

                <!-- Category Badge -->
                <v-chip
                  class="position-absolute work-category-chip"
                  :color="work.categoryColor"
                  size="small"
                  style="top: 12px; right: 12px;"
                  variant="elevated"
                >
                  {{ work.category }}
                </v-chip>
              </div>

              <!-- Content Section -->
              <v-card-title class="pb-2">
                <h3 class="text-h6 line-clamp-2 preserve-line-breaks">
                  {{ work.title }}
                </h3>
              </v-card-title>

              <v-card-text class="flex-grow-1 pb-2">
                <p class="text-body-2 text-medium-emphasis line-clamp-3 mb-4 preserve-line-breaks">
                  {{ work.text }}
                </p>

                <!-- Tech Stack -->
                <div class="mb-3">
                  <p class="text-caption font-weight-bold mb-2">
                    使用技術
                  </p>
                  <div class="d-flex flex-wrap ga-1">
                    <v-chip
                      v-for="tech in work.techArray"
                      :key="tech"
                      size="x-small"
                      variant="outlined"
                      color="secondary"
                    >
                      {{ tech }}
                    </v-chip>
                  </div>
                </div>
              </v-card-text>

              <!-- Actions -->
              <v-card-actions v-if="work.link || work.github">
                <v-spacer />
                <v-btn
                  v-if="work.link"
                  :href="work.link"
                  target="_blank"
                  variant="outlined"
                  size="small"
                  prepend-icon="mdi-open-in-new"
                >
                  詳細
                </v-btn>
                <v-btn
                  v-if="work.github"
                  :href="work.github"
                  target="_blank"
                  variant="outlined"
                  size="small"
                  prepend-icon="mdi-github"
                >
                  GitHub
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog
      v-model="isImageDialogOpen"
      max-width="960"
    >
      <v-card
        v-if="selectedImageWork"
        class="image-dialog-card"
      >
        <v-img
          :src="selectedImageWork.img"
          :alt="selectedImageWork.title"
          contain
          class="image-dialog-content"
        />
        <v-card-actions class="px-4 pb-4">
          <div class="text-body-2 font-weight-medium">
            {{ selectedImageWork.title }}
          </div>
          <v-spacer />
          <v-btn
            variant="text"
            @click="isImageDialogOpen = false"
          >
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Empty State -->
    <v-row
      v-if="filteredWorks.length === 0"
      class="justify-center"
    >
      <v-col
        cols="12"
        class="text-center py-12"
      >
        <v-icon
          size="64"
          color="on-surface-variant"
          class="mb-4"
        >
          mdi-magnify-close
        </v-icon>
        <h3 class="text-h6 text-medium-emphasis mb-2">
          該当する作品が見つかりません
        </h3>
        <p class="text-body-2 text-medium-emphasis">
          フィルターを変更してお試しください
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  works: {
    type: Array,
    default: () => [],
  },
});

// フィルター用のリアクティブ変数
const selectedCategory = ref(null);
const selectedTech = ref([]);
const isImageDialogOpen = ref(false);
const selectedImageWork = ref(null);

// カテゴリーオプション
const categories = ref([
  { title: 'すべて', value: null },
  { title: 'AI開発', value: 'AI開発' },
  { title: 'Web開発', value: 'Web開発' },
  { title: 'フロントエンド開発', value: 'フロントエンド開発' },
  { title: 'フルスタック開発', value: 'フルスタック開発' },
  { title: '研究開発', value: '研究開発' },
  { title: '学習・教育', value: '学習・教育' },
  { title: '資料作成', value: '資料作成' },
]);

// 技術スタックオプション
const techOptions = computed(() => {
  const allTech = new Set();
  props.works.forEach(work => {
    work.techArray.forEach(tech => allTech.add(tech));
  });
  return Array.from(allTech).sort();
});

// フィルター済み作品リスト
const filteredWorks = computed(() => {
  let filtered = props.works;

  // カテゴリーフィルター
  if (selectedCategory.value) {
    filtered = filtered.filter(work => work.category === selectedCategory.value);
  }

  // 技術スタックフィルター
  if (selectedTech.value && selectedTech.value.length > 0) {
    filtered = filtered.filter(work =>
      selectedTech.value.some(tech => work.techArray.includes(tech)),
    );
  }

  return [...filtered].sort((a, b) => {
    const yearDiff = Number(b.year) - Number(a.year);
    if (yearDiff !== 0) return yearDiff;
    return b.id - a.id;
  });
});

function openImageDialog(work) {
  if (!work.img) return;
  selectedImageWork.value = work;
  isImageDialogOpen.value = true;
}
</script>

<style scoped>
.work-card {
  overflow: hidden;
}

.work-media {
  aspect-ratio: 16 / 9;
  background: rgb(var(--v-theme-surface-variant));
  overflow: hidden;
}

.work-media-button {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
}

.work-image,
.work-media-placeholder {
  width: 100%;
  height: 100%;
}

.work-media-hint {
  position: absolute;
  right: 12px;
  bottom: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgb(0 0 0 / 60%);
  color: #fff;
  font-size: 12px;
  line-height: 1.2;
}

.image-dialog-card {
  overflow: hidden;
}

.image-dialog-content {
  max-height: min(75vh, 720px);
  background: rgb(var(--v-theme-surface-variant));
}

.preserve-line-breaks {
  white-space: pre-line;
}
</style>
