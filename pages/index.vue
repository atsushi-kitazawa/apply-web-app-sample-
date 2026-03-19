<script setup lang="ts">
import type { Application } from "~/server/storage/applications"

const { data, refresh, pending, error } = await useFetch<{ items: Application[] }>(
  "/api/applications"
)

const items = computed(() => data.value?.items ?? [])
</script>

<template>
  <section class="page">
    <div class="title-row">
      <div>
        <p class="eyebrow">申し込み管理</p>
        <h1>申込一覧</h1>
      </div>
      <NuxtLink class="primary" to="/apply">新規申し込み</NuxtLink>
    </div>

    <div v-if="pending" class="state">読み込み中...</div>
    <div v-else-if="error" class="state error">
      読み込みに失敗しました。
      <button type="button" class="link" @click="refresh()">再読み込み</button>
    </div>
    <div v-else-if="items.length === 0" class="state">まだ申し込みがありません。</div>

    <div v-else class="cards">
      <article v-for="item in items" :key="item.id" class="card">
        <div class="card-header">
          <div>
            <h2>{{ item.name }} ( {{ item.namekana }} )</h2>
            <p class="meta">{{ item.email }} / {{ item.phone }}</p>
          </div>
          <span class="badge">{{ item.status }}</span>
        </div>
        <p class="plan">プラン: {{ item.plan }}</p>
        <p class="message" v-if="item.message">{{ item.message }}</p>
        <p class="date">{{ new Date(item.createdAt).toLocaleString() }}</p>
        <NuxtLink class="detail" :to="`/apply/${item.id}`">詳細を見る</NuxtLink>
      </article>
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
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

.primary {
  background: #f25f5c;
  color: #fff;
  padding: 10px 18px;
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

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.card {
  background: #fff;
  border-radius: 18px;
  padding: 18px;
  border: 1px solid #ece5db;
  box-shadow: 0 10px 30px rgba(16, 24, 34, 0.08);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-header {
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

.plan {
  margin: 0;
  font-weight: 600;
}

.message {
  margin: 0;
  color: #414141;
}

.date {
  margin: 0;
  font-size: 12px;
  color: #7c7c7c;
}

.detail {
  color: #101822;
  font-weight: 600;
  text-decoration: none;
}
</style>
