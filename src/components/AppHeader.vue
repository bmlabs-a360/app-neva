<template>
  <!--Header-->
  <div class="col-12 d-flex justify-content-between" v-if="perfil == 'Consultor' || perfil == 'Usuario pro (empresa)' || perfil == 'Administrador'">
    <div class="page-title mt-5 pt-5 pt-sm-0 mt-sm-0" >
        <div class="py-3 d-flex align-items-center">
            <div class="nav-media img-left">
                <span class="me-3 menu-toggle has-chevron">
                    <span class="icon-box-toggle" @click="AbrirMenu">
                        <span class="rotate"><i aria-hidden="true" class="icon-line-top"></i><i aria-hidden="true" class="icon-line-center"></i><i aria-hidden="true" class="icon-line-bottom"></i>
                        </span>
                    </span>
                </span>
                <img  class="logo d-block d-sm-none" @click="ir('HomeDashboard')" :src="logoNegro" alt="">
                <img class="user-photo me-sm-3 d-block mt-1" alt="" :src="logoPers" >
            </div>
            <h1 class="title">
              <CContainer fluid>
                  <AppBreadcrumb />
             </CContainer>
            </h1>
        </div>
        <div class="toolbar ml-auto desktop-toolbar">
          <!-- Icono 3-->
          <div class="dropdown is-spaced is-dots is-right dropdown-trigger">
              <div tabindex="0" class="is-trigger" aria-haspopup="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 512 512" @click="logout" class="cursor-pointer"> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="77.155 272.034 351.75 272.034 351.75 272.033 351.75 240.034 351.75 240.033 77.155 240.033 152.208 164.98 152.208 164.98 152.208 164.979 129.58 142.353 15.899 256.033 15.9 256.034 15.899 256.034 129.58 369.715 152.208 347.088 152.208 347.087 152.208 347.087 77.155 272.034" class="ci-primary"/> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="160 16 160 48 464 48 464 464 160 464 160 496 496 496 496 16 160 16" class="ci-primary"/> 
                </svg>
              </div>
          </div>
          <!--Fin Icono 3-->
        </div>
    </div> 
  </div>

  <div class="col-12 d-flex justify-content-between" v-else-if="perfil == 'Usuario básico'">
    <div class="page-title mt-5 pt-5 pt-sm-0 mt-sm-0" >
        <div class="py-3 d-flex align-items-center">
            <div class="nav-media img-left">
                <span class="me-3 menu-toggle has-chevron">
                    <span class="icon-box-toggle">
                        <span class="rotate"><i aria-hidden="true" class="icon-line-top"></i><i aria-hidden="true" class="icon-line-center"></i><i aria-hidden="true" class="icon-line-bottom"></i>
                        </span>
                    </span>
                </span>
                <img  class="logo d-block d-sm-none" @click="ir('Dashboard')" :src="logoNegro" alt="">
                <img class="user-photo me-sm-3 d-block mt-1" alt="" :src="logoPers">
            </div>
            <h1 class="title">
              Tus Evaluaciones
            </h1>
        </div>
        <div class="toolbar ml-auto desktop-toolbar">
          <!-- Icono 3-->
          <div class="dropdown is-spaced is-dots is-right dropdown-trigger">
              <div tabindex="0" class="is-trigger" aria-haspopup="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 512 512" @click="logout" class="cursor-pointer"> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="77.155 272.034 351.75 272.034 351.75 272.033 351.75 240.034 351.75 240.033 77.155 240.033 152.208 164.98 152.208 164.98 152.208 164.979 129.58 142.353 15.899 256.033 15.9 256.034 15.899 256.034 129.58 369.715 152.208 347.088 152.208 347.087 152.208 347.087 77.155 272.034" class="ci-primary"/> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="160 16 160 48 464 48 464 464 160 464 160 496 496 496 496 16 160 16" class="ci-primary"/> 
                </svg>
              </div>
          </div>
          <!--Fin Icono 3-->
        </div>
    </div> 
  </div>

  <div class="col-12 d-flex justify-content-between" v-else-if="perfil == 'Gran empresa'">
    <div class="page-title mt-5 pt-5 pt-sm-0 mt-sm-0" >
        <div class="py-3 d-flex align-items-center">
            <div class="nav-media img-left">
                <span class="me-3 menu-toggle has-chevron">
                    <span class="icon-box-toggle">
                        <span class="rotate"><i aria-hidden="true" class="icon-line-top"></i><i aria-hidden="true" class="icon-line-center"></i><i aria-hidden="true" class="icon-line-bottom"></i>
                        </span>
                    </span>
                </span>
                <img  class="logo d-block d-sm-none" @click="ir('HomeDashboardGranEmpresa')" :src="logoNegro" alt="">
                <img class="user-photo me-sm-3 d-block mt-1" alt="" :src="logoPers">
            </div>
            <h1 class="title">
              Gran Empresa
            </h1>
        </div>
        <div class="toolbar ml-auto desktop-toolbar">
          <!-- Icono 3-->
          <div class="dropdown is-spaced is-dots is-right dropdown-trigger">
              <div tabindex="0" class="is-trigger" aria-haspopup="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 512 512" @click="logout" class="cursor-pointer"> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="77.155 272.034 351.75 272.034 351.75 272.033 351.75 240.034 351.75 240.033 77.155 240.033 152.208 164.98 152.208 164.98 152.208 164.979 129.58 142.353 15.899 256.033 15.9 256.034 15.899 256.034 129.58 369.715 152.208 347.088 152.208 347.087 152.208 347.087 77.155 272.034" class="ci-primary"/> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="160 16 160 48 464 48 464 464 160 464 160 496 496 496 496 16 160 16" class="ci-primary"/> 
                </svg>
              </div>
          </div>
          <!--Fin Icono 3-->
        </div>
    </div> 
  </div>

  <div class="col-12 d-flex justify-content-between" v-else>
    <div class="page-title mt-5 pt-5 pt-sm-0 mt-sm-0" >
        <div class="py-3 d-flex align-items-center">
            <div class="nav-media img-left">
                <span class="me-3 menu-toggle has-chevron">
                    <span class="icon-box-toggle">
                        <span class="rotate"><i aria-hidden="true" class="icon-line-top"></i><i aria-hidden="true" class="icon-line-center"></i><i aria-hidden="true" class="icon-line-bottom"></i>
                        </span>
                    </span>
                </span>
                <img  class="logo d-block d-sm-none" @click="ir('Dashboard')" :src="logoNegro" alt="">
                <img class="user-photo me-sm-3 d-block mt-1" alt="" :src="logoPers">
            </div>
            <h1 class="title">
              Tus Evaluaciones
            </h1>
        </div>
        <div class="toolbar ml-auto desktop-toolbar">
          <!-- Icono 3-->
          <div class="dropdown is-spaced is-dots is-right dropdown-trigger">
              <div tabindex="0" class="is-trigger" aria-haspopup="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 512 512" @click="logout" class="cursor-pointer"> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="77.155 272.034 351.75 272.034 351.75 272.033 351.75 240.034 351.75 240.033 77.155 240.033 152.208 164.98 152.208 164.98 152.208 164.979 129.58 142.353 15.899 256.033 15.9 256.034 15.899 256.034 129.58 369.715 152.208 347.088 152.208 347.087 152.208 347.087 77.155 272.034" class="ci-primary"/> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="160 16 160 48 464 48 464 464 160 464 160 496 496 496 496 16 160 16" class="ci-primary"/> 
                </svg>
              </div>
          </div>
          <!--Fin Icono 3-->
        </div>
    </div> 
  </div>
  <!--Termino Header-->
</template> 

<script>
import { reactive, onMounted, toRefs} from "vue";
import AppBreadcrumb from "./AppBreadcrumb";

import imgLogo from "@/assets/images/neva_login.png";
import router from "@/router/index";
import logoNegro from "@/assets/img/nav/logos/logo-negro.svg";
import logoPers from "@/assets/img/nav/pers/02.png";
import cilAccountLogout from "@coreui/vue";

export default {
  name: "AppHeader",
  components: {
    AppBreadcrumb,
  },
  setup() {

    const state = reactive({
        userSelected : [],
        empresas : [],
        perfil : [],
        menuOpen: false,
        dropdown: false,
    });

    const logout = () => {
      localStorage.token = null;
      return router.push({
        name: "Pages",
        query: { showMsjInvalidToken: "false" },
      });
    };

    const ir = (namePageDestiny) => {
      return router.push({ name: namePageDestiny });
    };

    const getUsuario = () => {
        state.userSelected = JSON.parse(localStorage.usuarioModel);
        if (state.userSelected.nombres.length > 2){
          state.userSelected.iniciales =  state.userSelected.nombres.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g).join("").substring("0","2");
        } else {
            state.userSelected.iniciales = state.userSelected.nombres;
        }
        state.perfil = state.userSelected.perfil.nombre;
    };

    const AbrirMenu = () => {
        const sider = document.querySelector('.sidebar-panel');
        const viewWrapper = document.querySelector('.view-wrapper');
        const colorNav =document.querySelector('.color-nav');
        if (!state.menuOpen) {
          sider.classList.add('active');
          colorNav.classList.add('active');
          viewWrapper.classList.add('is-pushed-full');
          state.menuOpen=true;  
        }else {
            sider.classList.remove('active');
            viewWrapper.classList.remove('is-pushed-full');
            colorNav.classList.remove('active');
            state.menuOpen=false;
        }
    };

    onMounted(() => {
      getUsuario();
    });

    return {
      ...toRefs(state),
      imgLogo,
      logoNegro,
      logoPers,
      cilAccountLogout,
      logout,
      ir,
      AbrirMenu
    };
  },
};
</script>
