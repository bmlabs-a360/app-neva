import { h, resolveComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import auth from "@/middleware/auth";
import log from "@/middleware/log";

import DefaultLayout from "@/layouts/DefaultLayout";

const routes = [
  {
    path: "/",
    name: "Home",
    component: DefaultLayout,
    redirect: "/pages/login",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: {
          middleware: [auth, log],
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
      },
      {
        path: "/mantenedor",
        name: "Mantenedor",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        redirect: "/mantenedor/evaluacion",
        meta: {
          middleware: [auth, log],
        },
        children: [
          {
            path: "/mantenedor/evaluacion",
            name: "Evaluacion",
            component: () => import("@/views/mantenedor/evaluacion.vue"),
          },
          /*
          {
            path: "/mantenedor/configuracion",
            name: "Configuracion",
            component: () => import("@/views/mantenedor/configuracion.vue"),
          },
          {
            path: "/mantenedor/moneda",
            name: "Moneda",
            component: () => import("@/views/mantenedor/moneda.vue"),
          },
          {
            path: "/mantenedor/formapagoMoneda",
            name: "Forma Pago - Moneda",
            component: () => import("@/views/mantenedor/formapagoMoneda.vue"),
          },*/
        ],
      },
      /*{
        path: "/conciliacion",
        name: "Conciliacion",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        redirect: "/conciliacion/conciliar",
        meta: {
          middleware: [auth, log],
        },
        children: [
          {
            path: "/conciliacion/conciliarAutomatico",
            name: "Conciliar Automático",
            component: () =>
              import("@/views/conciliacion/conciliarAutomatico.vue"),
          },
          {
            path: "/conciliacion/conciliarAsistente",
            name: "Asistente",
            component: () =>
              import("@/views/conciliacion/conciliarAsistente.vue"),
          },
          {
            path: '/conciliacion/conciliarAsistente',
            name: 'Asistente',
            component: () => import('@/views/conciliacion/ejemplo.txt')
          },
        ],
      },*/
      {
        path: "/buscador",
        name: "Buscador",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        redirect: "/buscador/transaccion",
        meta: {
          middleware: [auth, log],
        },
        children: [
          {
            path: "/buscador/transaccion",
            name: "Transaccion",
            component: () => import("@/views/buscador/transaccion.vue"),
          },
          {
            path: "/buscador/conciliar",
            name: "Conciliar",
            component: () => import("@/views/buscador/conciliar.vue"),
          },
        ],
      },
      {
        path: "/permisos",
        name: "Permisos",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        redirect: "/permisos/usuarios",
        meta: {
          middleware: [auth, log],
        },
        children: [
          {
            path: "/permisos/usuarios",
            name: "Usuarios",
            component: () => import("@/views/permisos/usuarios.vue"),
          },
         /* {
            path: "/permisos/perfiles",
            name: "Perfiles",
            component: () => import("@/views/permisos/perfiles.vue"),
          },
          {
            path: "/permisos/roles",
            name: "roles",
            component: () => import("@/views/permisos/roles.vue"),
          },
          {
            path: "/permisos/privilegios",
            name: "privilegios",
            component: () => import("@/views/permisos/privilegios.vue"),
          },*/
        ],
      },
      /*{
        path: "/simulacion",
        name: "Simulación",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        redirect: "/simulacion/linkPago",
        meta: {
          middleware: [auth, log],
        },
        children: [
          {
            path: "/simulacion/linkPago",
            name: "Crear link de pago",
            component: () => import("@/views/simulacion/linkPago.vue"),
          },
        ],
      },*/
    ],
  },
  {
    path: "/pages",
    redirect: "/pages/login",
    name: "Pages",
    component: {
      render() {
        return h(resolveComponent("router-view"));
      },
    },
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/pages/Login"),
      },/*
      { //eliminar register 2
        path: "register2",
        name: "Register2",
        component: () => import("@/views/pages/Register2"),
      },*/
      {
        path: "recuperar",
        name: "Recuperar",
        component: () => import("@/views/pages/Recuperar"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/pages/Register"),
      },
      {
        path: "completaacceso",
        name: "CompletaAcceso",
        component: () => import("@/views/pages/CompletaAcceso"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
