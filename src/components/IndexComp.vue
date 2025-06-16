<template>
  <v-container class="py-8">
    <!-- Hero Section -->
    <v-row class="align-center justify-center">
      <v-col cols="12" md="8" lg="6" class="text-center">
        <v-avatar size="100" class="mb-4">
          <img src="/img/ta28-icon.webp" alt="Profile Picture" class="rounded-circle"
            style="width: 100%; height: 100%;" />
        </v-avatar>

        <h1 class="text-h4 text-md-h3 mb-3 font-weight-bold">
          今井 竜也
        </h1>

        <h2 class="text-subtitle-1 text-md-h6 mb-4 text-grey-darken-1">
          Web Developer & Software Engineer
        </h2>

        <p class="text-body-2 text-md-body-1 mb-6 text-grey-darken-2">
          中学時代からプログラミングに魅力を感じ、<br class="d-none d-md-block">
          現在はWebアプリケーション開発を中心に活動しています
        </p>

        <!-- Quick Action Buttons -->
        <div class="mb-8">
          <v-btn color="primary" size="large" href="/work" class="ma-2" prepend-icon="mdi-code-tags">
            作品を見る
          </v-btn>

          <v-btn color="secondary" size="large" href="https://github.com/101ta28/resume" target="_blank" class="ma-2"
            prepend-icon="mdi-file-document-outline">
            履歴書
          </v-btn>

          <v-btn variant="outlined" size="large" href="https://blog.101ta28.com" target="_blank" class="ma-2"
            prepend-icon="mdi-post-outline">
            ブログ
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- About Section -->
    <v-row class="justify-center mb-8">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-6" elevation="2">
          <v-card-title class="text-h5 text-center mb-4">
            <v-icon left class="mr-2">mdi-account</v-icon>
            About Me
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <h3 class="text-h6 mb-3">プロフィール</h3>
                <p class="text-body-1 mb-3">
                  初めまして。今井 竜也と申します。<br>
                  中学時代にプログラミングに興味を持ち、なんやかんやで今に至ります。<br>
                  現在はWebアプリケーションの開発や、<br>
                  内製ツール作成、システム開発など<br>
                  を行っています。
                </p>
              </v-col>

              <v-col cols="12" md="6">
                <h3 class="text-h6 mb-3">興味・関心</h3>
                <v-chip-group column>
                  <v-chip color="primary" variant="outlined">Web開発</v-chip>
                  <v-chip color="primary" variant="outlined">フロントエンド</v-chip>
                  <v-chip color="primary" variant="outlined">バックエンド</v-chip>
                  <v-chip color="primary" variant="outlined">ツール開発</v-chip>
                  <v-chip color="primary" variant="outlined">オープンソース</v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Skills Section -->
    <v-row class="justify-center mb-8">
      <v-col cols="12" md="10" lg="8">
        <h2 class="text-h5 text-center mb-6">
          <v-icon left class="mr-2">mdi-tools</v-icon>
          技術スタック
        </h2>

        <v-row>
          <v-col cols="12" md="4" class="mb-3">
            <v-card class="pa-3 h-100" elevation="1">
              <v-card-title class="text-subtitle-1">
                <v-icon left color="orange">mdi-language-html5</v-icon>
                フロントエンド
              </v-card-title>
              <v-card-text>
                <v-chip-group column>
                  <v-chip size="small">Vue.js</v-chip>
                  <v-chip size="small">JavaScript</v-chip>
                  <v-chip size="small">TypeScript</v-chip>
                  <v-chip size="small">HTML/CSS</v-chip>
                  <v-chip size="small">Vuetify</v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4" class="mb-3">
            <v-card class="pa-3 h-100" elevation="1">
              <v-card-title class="text-subtitle-1">
                <v-icon left color="green">mdi-server</v-icon>
                バックエンド
              </v-card-title>
              <v-card-text>
                <v-chip-group column>
                  <v-chip size="small">Node.js</v-chip>
                  <v-chip size="small">Python</v-chip>
                  <v-chip size="small">Express</v-chip>
                  <v-chip size="small">API開発</v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4" class="mb-3">
            <v-card class="pa-3 h-100" elevation="1">
              <v-card-title class="text-subtitle-1">
                <v-icon left color="blue">mdi-hammer-wrench</v-icon>
                ツール・その他
              </v-card-title>
              <v-card-text>
                <v-chip-group column>
                  <v-chip size="small">Git</v-chip>
                  <v-chip size="small">GitHub</v-chip>
                  <v-chip size="small">Docker</v-chip>
                  <v-chip size="small">Linux</v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Contact Section -->
    <v-row class="justify-center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-4" elevation="2" color="primary" dark>
          <v-card-title class="text-h6 text-center mb-3">
            お気軽にお声がけください
          </v-card-title>

          <v-card-text class="text-center">
            <v-btn variant="outlined" size="large" href="/contact" class="ma-2" prepend-icon="mdi-email">
              お問い合わせ
            </v-btn>

            <v-btn class="text-none ma-2" variant="outlined" size="large" href="https://github.com/101ta28"
              target="_blank" prepend-icon="mdi-github">
              GitHub
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
//
</script>