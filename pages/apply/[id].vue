<script setup lang="ts">
import type { Application } from "~/server/storage/applications"

const route = useRoute()
const id = computed(() => String(route.params.id))

const { data, pending, error, refresh } = await useFetch<Application>(
  () => `/api/applications/${id.value}`,
  { watch: [id] }
)
</script>

<template>
  <section class="page">
    <div class="title-row">
      <div>
        <p class="eyebrow">Application</p>
        <h1>申し込み詳細</h1>
      </div>
      <NuxtLink class="ghost" to="/">一覧に戻る</NuxtLink>
    </div>

    <div v-if="pending" class="state">読み込み中...</div>
    <div v-else-if="error" class="state error">
      読み込みに失敗しました。
      <button type="button" class="link" @click="refresh()">再読み込み</button>
    </div>

    <div v-else-if="data" class="card">
      <div class="row">
        <div>
          <h2>{{ data.name }} ( {{ data.namekana }} )</h2>
          <p class="meta">{{ data.email }} / {{ data.phone }}</p>
        </div>
        <span class="badge">{{ data.status }}</span>
      </div>

      <dl class="info">
        <div>
          <dt>プラン</dt>
          <dd>{{ data.plan }}</dd>
        </div>
        <div>
          <dt>申込日時</dt>
          <dd>{{ new Date(data.createdAt).toLocaleString() }}</dd>
        </div>
      </dl>

      <div class="message">
        <p class="label">メッセージ</p>
        <p>{{ data.message || "(未入力)" }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.2em;
  color: #636d77;
  margin: 0 0 8px;
}

h1 {
  margin: 0;
  font-size: 28px;
}

.ghost {
  border: 1px solid #101822;
  color: #101822;
  padding: 8px 16px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
}

.state {
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #ece5db;
}

.state.error {
  border-color: #f25f5c;
  color: #a72b27;
}

.link {
  border: none;
  background: none;
  color: #f25f5c;
  cursor: pointer;
  font-weight: 600;
}

.card {
  background: #fff;
  border-radius: 18px;
  padding: 24px;
  border: 1px solid #ece5db;
  box-shadow: 0 16px 30px rgba(16, 24, 34, 0.06);
  display: grid;
  gap: 18px;
}

.row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.meta {
  margin: 4px 0 0;
  color: #6f6f6f;
  font-size: 13px;
}

.badge {
  background: #101822;
  color: #f8f1e5;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
}

.info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin: 0;
}

.info div {
  background: #f6f4ef;
  padding: 12px;
  border-radius: 12px;
}

.info dt {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6f6f6f;
}

.info dd {
  margin: 6px 0 0;
  font-weight: 600;
}

.message {
  background: #f6f4ef;
  border-radius: 12px;
  padding: 12px;
}

.label {
  margin: 0 0 6px;
  font-weight: 600;
}
</style>
