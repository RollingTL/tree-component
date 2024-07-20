type LoadingState = 'idle' | 'loading'
type ApiData = ApiDataItem[]
type ApiDataItem = {
  title: string
  parent_id: number | null
  id: number
}
type TreeData = TreeDataItem[]
type TreeDataItem = {
  title: string
  parent_id: number | null
  id: number
  children: TreeData
  level: number
}
