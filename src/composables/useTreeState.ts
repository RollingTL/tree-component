import { ref, watch } from 'vue'

const LOCAL_STORAGE_KEY = 'treeState'

const getStoredArray = (): number[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

const saveToLocalStorage = (array: number[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(array))
}

const treeStateArray = ref<number[]>(getStoredArray())

export function useTreeState() {
  watch(
    treeStateArray,
    (newArray) => {
      saveToLocalStorage(newArray)
    },
    { deep: true }
  )

  const isOpen = (num: number): boolean => {
    return treeStateArray.value.includes(num)
  }

  const setOpen = (num: number): void => {
    if (!treeStateArray.value.includes(num)) {
      treeStateArray.value = [...treeStateArray.value, num]
    }
  }

  const setClosed = (num: number): void => {
    treeStateArray.value = treeStateArray.value.filter((item) => item !== num)
  }

  const toggle = (num: number): void => {
    if (isOpen(num)) {
      setClosed(num)
    } else {
      setOpen(num)
    }
  }

  const clear = (): void => {
    treeStateArray.value = []
  }

  return { isOpen, toggle, clear }
}
