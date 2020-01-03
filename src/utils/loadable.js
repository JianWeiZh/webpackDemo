import Loadable from 'react-loadable'
import LoadingComponent from '@/components/loading'

const loadable = ((loader, loading = LoadingComponent) => {
  return Loadable({
    loader,
    loading
  })
})

// export default loadable
export default (path) => {
  return loadable(() => import(`@/${path}`))
}
