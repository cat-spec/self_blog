//pinia状态管理
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlatformStore = defineStore('platform', {
    state: () => ({
        platformStats: [],
    }),
})