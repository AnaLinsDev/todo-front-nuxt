import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _00a36c22 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _026afa68 = () => interopDefault(import('..\\pages\\task\\readAll.vue' /* webpackChunkName: "pages/task/readAll" */))
const _4861de78 = () => interopDefault(import('..\\pages\\user\\profile.vue' /* webpackChunkName: "pages/user/profile" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _00a36c22,
    name: "login"
  }, {
    path: "/task/readAll",
    component: _026afa68,
    name: "task-readAll"
  }, {
    path: "/user/profile",
    component: _4861de78,
    name: "user-profile"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
