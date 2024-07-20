<script setup lang="ts">
import { useTree } from '../composables/useTree'
import TreeItem from './TreeItem.vue'

const { treeData, loadingState, error, refresh } = useTree(
  'https://64b4c8450efb99d862694609.mockapi.io/tree/items'
)
</script>

<template>
  <section>
    <div class="button-holder">
      <button @click="refresh">Refresh</button>
    </div>
    <div class="tree-holder">
      <div v-if="loadingState === 'loading'" class="blink">Loading...</div>
      <div v-if="error">Error: {{ error }}</div>
      <div v-for="(node, index) in treeData" :key="index + node.id">
        <TreeItem :node="node" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.button-holder {
  padding: 1rem;
}
.tree-holder {
  padding: 1rem;

  .blink {
    animation: blinker 1s linear infinite;
  }
}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
