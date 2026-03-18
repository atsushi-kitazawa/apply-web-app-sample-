<template>
  <div class="app">
    <header class="header">
      <div class="brand">Apply Sample</div>
      <nav class="nav">
        <NuxtLink to="/">一覧</NuxtLink>
        <NuxtLink to="/apply">申し込み</NuxtLink>
      </nav>
    </header>
    <main class="main">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;
  font-family: "Hiragino Sans", "Noto Sans JP", sans-serif;
  background: #f6f4ef;
  color: #1f1f1f;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
  background: #101822;
  color: #f8f1e5;
}

.brand {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav a {
  color: #f8f1e5;
  text-decoration: none;
  font-weight: 600;
}

.nav a.router-link-exact-active {
  text-decoration: underline;
}

.main {
  flex: 1;
  padding: 32px 28px 48px;
}
</style>
