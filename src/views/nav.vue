<template>
  <!--Nav primario-->
    <aside class="color-nav d-flex flex-column">
        <div class="d-flex flex-column align-items-center">
            <div class="logo">
                <img  class="w-100 logo" :src="logoNeva" @click="ir('Dashboard')" style="cursor:pointer" alt="">
            </div>
            <div>
                <div>
                    <img :src="logoConfiguracion" @click="ir('Permisos')" style="cursor:pointer" alt="">
                </div>
                <div>
                    <img :src="logoCubo" @click="ir('Mantenedor')" style="cursor:pointer" alt="">
                </div>
                <div>
                    <img :src="logoMas" alt="">
                </div>
                <div>
                    <img :src="logoLupa" alt="">
                </div>
            </div>
        </div>
        <div class="d-flex flex-column  align-items-center">
            <div>
                 <img :src="logoConfiguracion" @click="logout" style="cursor:pointer" alt="">
            </div>
            <div>
                <img :src="logoCubo" alt="">
            </div>
            <div>
                <img :src="logoMas" alt="">
            </div>
            <div>
                <img :src="logoLupa" alt="">
            </div>
            <div class="avatar">
                <img class="img-100 rounded-circle" alt="">
            </div>
        </div>
    </aside>
    <!--Termino Nav primario-->
    
    <!--Nav secundario-->
    <div class="sidebar-panel is-generic">
        <div class="content-sidebar">
            <div class="d-flex justify-content-between align-items-center py-3">
                <h3 class="layout-title">Layaouts</h3>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.4em" height="1.4em" viewBox="0 0 24 24" data-icon="feather:x" class="iconify iconify--feather"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"></path></svg>
            </div>
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Title 1
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body">
                            <ul>
                                <li>subtitle 1</li>
                                <li>subtitle 2</li>
                                <li>subtitle 3</li>
                                <li>subtitle 4</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Title 2
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div class="accordion-body">
                            <ul>
                                <li>subtitle 1</li>
                                <li>subtitle 2</li>
                                <li>subtitle 3</li>
                                <li>subtitle 4</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Termino Nav secundario-->
</template>
<!--
<script src="assets/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="assets/js/nav.js"></script>
-->
<script>
import { reactive, toRefs, onMounted } from "vue";
import { style } from "@/assets/css/style.css";
import logoNeva from "@/assets/img/nav/logos/logo-negro.svg";
import logoConfiguracion from "@/assets/img/nav/config.svg";
import logoCubo from "@/assets/img/nav/cubo.svg";
import router from "@/router/index";
import logoLupa from "@/assets/img/nav/search.svg";
import logoMas from "@/assets/img/nav/mas.svg";

export default {
  name: "Login",
  methods: {
  },
  setup() {
    const state = reactive({
        userSelected : [],
    });

    const getUsuario = () => {
        state.userSelected = JSON.parse(localStorage.usuarioModel);
    };

    const ir = (namePageDestiny) => {
      return router.push({ name: namePageDestiny });
    };

    const logout = () => {
      localStorage.token = null;
      return router.push({
        name: "Pages",
        query: { showMsjInvalidToken: "false" },
      });
    };

    onMounted(() => {
      getUsuario();
    });

    return {
      ...toRefs(state),
      style,
      logoNeva,
      logoConfiguracion,
      logoCubo,
      logoLupa,
      logoMas,
      ir,
      logout,
    };
  },
};
</script>