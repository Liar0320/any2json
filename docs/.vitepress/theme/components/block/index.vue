<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { debounce, clipboard } from './util'

const props = defineProps<{
  code?: string
  path:string
}>()

const codeVisible = ref(false)

const examples = inject('examples',{}) as Record<string, any>

const copied = ref(false)
const onCopy = debounce(async () => {
  const code = props.code ? decodeURIComponent(props.code) : ''
  if (code) {
    try {
      await clipboard(code)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 1000)
    } catch (error) {
      copied.value = false
    }
  }
})

const formatPathDemos = computed(() => {
  const demos = {}

  Object.keys(examples || {}).forEach((key) => {
    demos[key.replace('./', '').replace('.vue', '')] = examples[key].default
  })

  return demos
})
</script>

<template>
  <section class="demo-block-container">
    <div class="demo">
      <component :is="formatPathDemos[path]"></component>
    </div>

    <div class="desc" v-if="$slots.desc"><slot name="desc" /></div>
    
    <p class="br" />

    <div class="actions">
      <img
        class="icon"
        @click="codeVisible = !codeVisible"
        src="./svg/code.svg"
      />
    </div>

    <div v-if="codeVisible" class="code">
      <div class="copy">
        <img class="icon" @click="onCopy" src="./svg/copy.svg" />
        <span v-if="copied" class="copy-success">复制成功</span>
      </div>
      <slot name="code" />
    </div>
  </section>
</template>

<style url="./theme.css"></style>
