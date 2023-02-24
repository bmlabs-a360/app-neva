<template>
    <!--Nav primario-->
    <aside class="color-nav nav-user d-flex flex-column" v-if="perfil == 'Usuario pro (empresa)'">
        <div class="d-flex flex-column align-items-center" >
            <div class="logo">
                <img  class="w-100 logo cursor-pointer" :src="logoNeva" @click="ir('HomeDashboard')" alt="">
            </div>
            <div>
                <div>
                    <img :src="logoConfiguracion" @click="AbrirMenu" class="cursor-pointer" alt="">
                </div>
            </div>
        </div>
        <div class="d-flex flex-column  align-items-center">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" @click="logout" class="cursor-pointer"> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="77.155 272.034 351.75 272.034 351.75 272.033 351.75 240.034 351.75 240.033 77.155 240.033 152.208 164.98 152.208 164.98 152.208 164.979 129.58 142.353 15.899 256.033 15.9 256.034 15.899 256.034 129.58 369.715 152.208 347.088 152.208 347.087 152.208 347.087 77.155 272.034" class="ci-primary"/> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="160 16 160 48 464 48 464 464 160 464 160 496 496 496 496 16 160 16" class="ci-primary"/> 
                </svg>
            </div>
        </div>
    </aside>

    <aside class="color-nav nav-user d-flex flex-column" v-if="perfil == 'Consultor'">
        <div class="d-flex flex-column align-items-center">
            <div class="logo">
                <img  class="w-100 logo cursor-pointer" :src="logoNeva" @click="ir('HomeDashboard')" alt="">
            </div>
            <div>
            </div>
        </div>
        <div class="d-flex flex-column  align-items-center">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" @click="logout" class="cursor-pointer"> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="77.155 272.034 351.75 272.034 351.75 272.033 351.75 240.034 351.75 240.033 77.155 240.033 152.208 164.98 152.208 164.98 152.208 164.979 129.58 142.353 15.899 256.033 15.9 256.034 15.899 256.034 129.58 369.715 152.208 347.088 152.208 347.087 152.208 347.087 77.155 272.034" class="ci-primary"/> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="160 16 160 48 464 48 464 464 160 464 160 496 496 496 496 16 160 16" class="ci-primary"/> 
                </svg>
            </div>
        </div>
    </aside>

    <aside class="color-nav nav-user d-flex flex-column" v-if="perfil == 'Gran empresa'">
        <div class="d-flex flex-column align-items-center">
            <div class="logo">
                <img  class="w-100 logo cursor-pointer" :src="logoNeva" @click="ir('HomeDashboardGranEmpresa')" alt="">
            </div>
            <div>
            </div>
        </div>
        <div class="d-flex flex-column  align-items-center">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" @click="logout" class="cursor-pointer"> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="77.155 272.034 351.75 272.034 351.75 272.033 351.75 240.034 351.75 240.033 77.155 240.033 152.208 164.98 152.208 164.98 152.208 164.979 129.58 142.353 15.899 256.033 15.9 256.034 15.899 256.034 129.58 369.715 152.208 347.088 152.208 347.087 152.208 347.087 77.155 272.034" class="ci-primary"/> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="160 16 160 48 464 48 464 464 160 464 160 496 496 496 496 16 160 16" class="ci-primary"/> 
                </svg>
            </div>
        </div>
    </aside>

    <aside class="color-nav d-flex flex-column" v-if="perfil == 'Usuario básico'">
        <div class="d-flex flex-column align-items-center">
            <div class="logo">
                <img  class="w-100 logo cursor-pointer" :src="logoNevaNegro" @click="ir('Dashboard')" alt="">
            </div>
            <div>
            </div>
        </div>
        <div class="d-flex flex-column  align-items-center">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" @click="logout" class="cursor-pointer"> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="77.155 272.034 351.75 272.034 351.75 272.033 351.75 240.034 351.75 240.033 77.155 240.033 152.208 164.98 152.208 164.98 152.208 164.979 129.58 142.353 15.899 256.033 15.9 256.034 15.899 256.034 129.58 369.715 152.208 347.088 152.208 347.087 152.208 347.087 77.155 272.034" class="ci-primary"/> 
                  <polygon fill="var(--ci-primary-color, currentColor)" points="160 16 160 48 464 48 464 464 160 464 160 496 496 496 496 16 160 16" class="ci-primary"/> 
                </svg>
            </div>
        </div>
    </aside>
    <!--Termino Nav primario-->
    
    
  <!--Nav secundario-->
  <div class="sidebar-panel is-generic">
    <div class="content-sidebar">
      <div class="d-flex justify-content-between align-items-center py-3">
        <h3 class="layout-title">Opciones</h3>
        <button class="close" @click="cerrarMenu">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.4em" height="1.4em" viewBox="0 0 24 24" data-icon="feather:x" class="iconify iconify--feather"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"></path></svg>
        </button>
      </div>
      <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              Usuarios
            </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
            <div class="accordion-body">
              <ul>
                <li @click="ir('Permisos')" class="cursor-pointer">Crear Usuario</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Termino Nav secundario-->

</template>
<script>
import { reactive, toRefs, onMounted } from "vue";
import { style } from "@/assets/css/style.css";
import logoNeva from "@/assets/img/nav/logos/logo-blanco.svg";
import logoNevaNegro from "@/assets/img/nav/logos/logo-negro.svg";
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
        perfil : [],
        menuOpen: false,
    });

    const getUsuario = () => {
        state.userSelected = JSON.parse(localStorage.usuarioModel);
        state.perfil = state.userSelected.perfil.nombre;
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

    const cerrarMenu = () => {
        const colorNav = document.querySelector('.color-nav');
        const sider = document.querySelector('.sidebar-panel');
        const viewWrapper = document.querySelector('.view-wrapper');
        colorNav.classList.remove('active');
        sider.classList.remove('active');
        viewWrapper.classList.remove('is-pushed-full');
        state.menuOpen=false;
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
      logoNevaNegro,
      ir,
      logout,
      AbrirMenu,
      cerrarMenu,
    };
  },
};
</script>