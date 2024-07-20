import { ref, onMounted } from 'vue'
import axios from 'axios'

export function useTree(url: string) {
  const apiData = ref<ApiData | null>(null)
  const loadingState = ref<LoadingState>('idle')
  const error = ref<string | null>(null)
  const treeData = ref<TreeData | null>(null)

  const fetchData = async () => {
    loadingState.value = 'loading'
    error.value = null

    try {
      const response = await axios.get<ApiData>(url)
      apiData.value = response.data
      treeData.value = buildTree(response.data)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value = err.message
      } else {
        error.value = 'Error'
      }
    } finally {
      loadingState.value = 'idle'
    }
  }

  const refresh = () => {
    fetchData()
  }
  onMounted(() => {
    fetchData()
  })

  return { treeData, loadingState, error, refresh }
}

function buildTree(items: ApiData): TreeData {
  const itemMap = new Map<number, TreeDataItem>()
  const roots: TreeDataItem[] = []

  items.forEach((item) => itemMap.set(item.id, { ...item, children: [], level: 0 }))

  const addChildren = (parentId: number | null, currentLevel: number): void => {
    items.forEach((item) => {
      if (item.parent_id === parentId) {
        const node = itemMap.get(item.id)!
        node.level = currentLevel
        const parent = itemMap.get(parentId!)
        if (parent) {
          parent.children.push(node)
        } else {
          roots.push(node)
        }
        addChildren(item.id, currentLevel + 1)
      }
    })
  }

  addChildren(null, 0)

  return roots
}
