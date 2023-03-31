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
        path: "/homedashboard",
        name: "HomeDashboard",
        meta: {
          middleware: [auth, log],
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/HomeDashboard.vue"),
      },
      {
        path: "/homedashboardgranempresa",
        name: "HomeDashboardGranEmpresa",
        meta: {
          middleware: [auth, log],
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/HomeDashboardGranEmpresa.vue"),
      },
      {
        path: "/homereporte",
        name: "HomeReporte",
        meta: {
          middleware: [auth, log],
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/HomeReporte.vue"),
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
          {
            path: "/permisos/nuevousuario",
            name: "NuevoUsuario",
            component: () => import("@/views/permisos/nuevousuario.vue"),
          },
          {
            path: "/permisos/editarusuario",
            name: "EditarUsuario",
            component: () => import("@/views/permisos/editarusuario.vue"),
          },
          {
            path: "/permisos/areaevaluacion",
            name: "AreaEvaluacion",
            component: () => import("@/views/permisos/areaevaluacion.vue"),
          },
        ],
      },
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
      },
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
      {
        path: "bienvenida",
        name: "Bienvenida",
        component: () => import("@/views/pages/Bienvenida"),
      },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/pages/NotFound') },
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
