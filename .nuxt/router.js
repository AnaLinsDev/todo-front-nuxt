import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _cd0256e6 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _6bbf7ab9 = () => interopDefault(import('..\\pages\\task\\edit.vue' /* webpackChunkName: "pages/task/edit" */))
const _4ee67f76 = () => interopDefault(import('..\\pages\\task\\read.vue' /* webpackChunkName: "pages/task/read" */))
const _026afa68 = () => interopDefault(import('..\\pages\\task\\readAll.vue' /* webpackChunkName: "pages/task/readAll" */))
const _8d44dd02 = () => interopDefault(import('..\\pages\\user\\edit.vue' /* webpackChunkName: "pages/user/edit" */))
const _4861de78 = () => interopDefault(import('..\\pages\\user\\profile.vue' /* webpackChunkName: "pages/user/profile" */))
const _3606a6d8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/register",
    component: _cd0256e6,
    name: "register"
  }, {
    path: "/task/edit",
    component: _6bbf7ab9,
    name: "task-edit"
  }, {
    path: "/task/read",
    component: _4ee67f76,
    name: "task-read"
  }, {
    path: "/task/readAll",
    component: _026afa68,
    name: "task-readAll"
  }, {
    path: "/user/edit",
    component: _8d44dd02,
    name: "user-edit"
  }, {
    path: "/user/profile",
    component: _4861de78,
    name: "user-profile"
  }, {
    path: "/",
    component: _3606a6d8,
    name: "index"
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
