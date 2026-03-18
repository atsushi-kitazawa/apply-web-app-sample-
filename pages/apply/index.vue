<script setup lang="ts">
const form = reactive({
  name: "",
  email: "",
  phone: "",
  plan: "standard" as "basic" | "standard" | "premium",
  message: ""
})

const submitting = ref(false)
const errorMessage = ref("")
const successId = ref("")

const submit = async () => {
  errorMessage.value = ""
  submitting.value = true
  successId.value = ""
  try {
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      plan: form.plan,
      message: form.message
    }

    const created = await $fetch<{ id: string }>("/api/applications", {
      method: "POST",
      body: payload
    })
    successId.value = created.id
  } catch (error: any) {
    errorMessage.value =
      error?.data?.statusMessage ?? "送信に失敗しました。もう一度お試しください。"
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="page">
    <div>
      <p class="eyebrow">Apply form</p>
      <h1>申し込みフォーム</h1>
      <p class="lead">必要事項を入力して送信してください。</p>
    </div>

    <form class="form" @submit.prevent="submit">
      <label>
        お名前
        <input v-model="form.name" type="text" required placeholder="山田 太郎" />
      </label>
      <label>
        メールアドレス
        <input v-model="form.email" type="email" required placeholder="taro@example.com" />
      </label>
      <label>
        電話番号
        <input v-model="form.phone" type="tel" required placeholder="090-0000-0000" />
      </label>
      <label>
        プラン
        <select v-model="form.plan" required>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
      </label>
      <label>
        メッセージ
        <textarea v-model="form.message" rows="4" placeholder="ご要望など"></textarea>
      </label>

      <button class="primary" type="submit" :disabled="submitting">
        {{ submitting ? "送信中..." : "申し込む" }}
      </button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <div v-if="successId" class="success">
        申し込みを受け付けました。
        <NuxtLink :to="`/apply/${successId}`">詳細を見る</NuxtLink>
      </div>
    </form>
  </section>
</template>

<style scoped>
.page {
  display: grid;
  gap: 24px;
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

.lead {
  margin: 8px 0 0;
  color: #4e4e4e;
}

.form {
  display: grid;
  gap: 16px;
  max-width: 480px;
  background: #fff;
  padding: 24px;
  border-radius: 18px;
  border: 1px solid #ece5db;
  box-shadow: 0 16px 30px rgba(16, 24, 34, 0.06);
}

label {
  display: grid;
  gap: 6px;
  font-weight: 600;
  color: #1f1f1f;
}

input,
select,
textarea {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #d4cec5;
  font: inherit;
}

.primary {
  background: #101822;
  color: #f8f1e5;
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}

.primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: #a72b27;
  margin: 0;
}

.success {
  background: #eff7e8;
  border-radius: 12px;
  padding: 12px;
  color: #285b2a;
}
</style>
