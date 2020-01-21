const routers = [
  {
    path: '/',
    component: 'App.jsx',
    exact: true,
    meta: {
      title: 'App'
    }
  },
  {
    path: '/home',
    component: 'views/home',
    exact: false,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/about',
    component: 'views/about',
    exact: false,
    meta: {
      title: 'About'
    }
  }
]

export default routers
