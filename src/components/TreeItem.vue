<script setup lang="ts">
import { useTreeState } from '../composables/useTreeState'
import { ChevronDown } from 'lucide-vue-next'
import { ChevronRight } from 'lucide-vue-next'
import { Minus } from 'lucide-vue-next'
import { computed } from 'vue'

const { isOpen, toggle } = useTreeState()
const props = defineProps<{
  node: TreeDataItem // Single prop of type ApiDataItem
}>()

const displayedChildren = computed(() => {
  if (isOpen(props.node.id)) return props.node.children
  else return []
})
</script>

<template>
  <div class="item" :class="{ root: node.level === 0 }">
    <div :style="{ width: node.level * 22 + 'px' }"></div>
    <div class="icon">
      <Minus v-if="node.children.length === 0" :size="16" />
      <div v-else>
        <ChevronDown v-if="!isOpen(node.id)" :size="16" @click="toggle(node.id)" />
        <ChevronRight v-else :size="16" @click="toggle(node.id)" />
      </div>
    </div>
    <div class="title">
      {{ props.node.title }}
    </div>
  </div>

  <TreeItem :node="node" v-for="(node, index) in displayedChildren" :key="index + node.id" />
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  background-color: white;
  &.root {
    background-color: #ccc;
  }
  .icon {
    padding: 2px 6px;
    display: flex;
    align-items: center;
  }
  .title {
    padding: 4px 6px;
  }

  .spacer {
    width: 15px;
    color: blue;
  }
}
.children {
  border: 1px solid red;
}
.item:not(.root):nth-of-type(odd) {
  background-color: #eee;
}

.item:not(.root):nth-of-type(even) {
  background-color: white;
}
</style>
