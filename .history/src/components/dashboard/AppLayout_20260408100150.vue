<template>
  <div class="min-h-screen bg-[var(--bg)] text-[var(--text)]">
    <header
      class="h-[56px] flex items-center justify-between px-4 border-b border-[var(--border)]/70 backdrop-blur bg-black/20"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-lg bg-[var(--accent-bg)] border border-[var(--accent-border)]/70 flex items-center justify-center"
        >
          <span class="text-[var(--accent)] font-mono font-semibold">⌂</span>
        </div>
        <div class="leading-tight">
          <div class="text-[var(--text-h)] font-semibold">个人技术仪表盘</div>
          <div class="text-xs opacity-70">Code. Build. Share.</div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button class="h-9 px-3 rounded-lg bg-black/20 border border-[var(--border)]/70 hover:border-[var(--accent)]/60">
          🔍
          <span class="ml-2 text-sm">搜索</span>
        </button>
        <button class="h-9 px-3 rounded-lg bg-black/20 border border-[var(--border)]/70 hover:border-[var(--accent)]/60">
          🌙
          <span class="ml-2 text-sm">主题</span>
        </button>
        <router-link
          to="/admin"
          class="h-9 px-3 rounded-lg bg-[var(--accent-bg)]/40 border border-[var(--accent-border)]/40 hover:border-[var(--accent)]/70 text-sm font-medium flex items-center"
        >
          👤 后台入口
        </router-link>
      </div>
    </header>

    <div class="flex">
      <aside
        class="w-[240px] shrink-0 border-r border-[var(--border)]/70 bg-black/15 backdrop-blur min-h-[calc(100svh-56px)]"
      >
        <div class="p-4">
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-12 h-12 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)]/70 flex items-center justify-center"
            >
              <span class="font-mono text-[var(--accent)] font-semibold">
                <img class="w-24 rounded-full" src="../../assets/paineapple.jpg" alt="">
              </span>
            </div>
            <div class="leading-tight">
              <div class="text-[var(--text-h)] font-semibold">菠萝~</div>
              <div class="text-xs opacity-70">持续输出 · 记录成长</div>
            </div>
          </div>

          <nav class="space-y-2">
            <SidebarItem to="/" icon="📊" label="仪表盘" />
            <SidebarItem to="/garden" icon="🌿" label="知识花园" />
            <SidebarItem to="/skills" icon="🛠️" label="个人技能" :disabled="true" />
            <SidebarItem to="/timeline" icon="🧭" label="个人经历" :disabled="true" />
          </nav>
        </div>
      </aside>

      <main class="flex-1 p-6 overflow-x-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
//该主键为常驻nav栏的组件和tab栏组件
import SidebarItem from './SidebarItem.vue'
</script>

