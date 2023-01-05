<template>
  <!--<CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      --<CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>--
      <--CImage  width="140" height="60" fluid rounded alt="Logo Neva" :src="imgLogo"/--

      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <--CIcon :icon="logo" height="48" alt="Logo" /--
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <div></div>
        <CNavItem>
          <CNavLink id="dashboard" @click="ir('Dashboard')" href="#">
            Dashboard
          </CNavLink>
        </CNavItem>
         <CNavItem>
          <CNavLink @click="ir('Mantenedor')" href="#">Evaluacion</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink @click="ir('Permisos')" href="#">Usuario</CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#" @click="logout">
            <CIcon icon="cil-lock-locked" /> Logout
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>-->

  <!--Header-->
 
  <div class="col-12 d-flex justify-content-between">
    <div class="page-title">
        <div class="py-3 d-flex align-items-center">
            <span class="me-3 menu-toggle has-chevron">
                <span class="icon-box-toggle">
                    <span class="rotate"><i aria-hidden="true" class="icon-line-top"></i><i aria-hidden="true" class="icon-line-center"></i><i aria-hidden="true" class="icon-line-bottom"></i>
                    </span>
                </span>
            </span>
            <h1 class="title">
                Tus Clientes
            </h1>
        </div>
        <div class="toolbar ml-auto desktop-toolbar">
            <div class="dropdown is-spaced is-dots is-right dropdown-trigger">
                <div tabindex="0" class="is-trigger" aria-haspopup="true">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="feather:bell" class="iconify iconify--feather"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9m-4.27 13a2 2 0 0 1-3.46 0"></path></svg>
                    <span class="new-indicator pulsate"></span>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-content">
                        <div class="heading">
                            <div class="heading-left">
                                <h6 class="heading-title">Notificación</h6>
                            </div>
                            <div class="heading-right">
                                <a href="#" class="notification-link"> Ver todas </a>
                            </div>
                        </div>
                        <ul class="notification-list">
                            <li>
                                <a class="notification-item">
                                    <div class="img-left">
                                        <img class="user-photo" alt="" src="assets/img/nav/pers/02.png">
                                    </div>
                                    <div class="user-content">
                                        <p class="user-info"><span class="name">Maria C.</span> Dejó un comentario. </p>
                                        <p class="time">1 hora antes</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="notification-item">
                                    <div class="img-left">
                                        <img class="user-photo" alt="" src="assets/img/nav/pers/01.jpg">
                                    </div>
                                    <div class="user-content">
                                        <p class="user-info"><span class="name">Pamela S.</span> Subido un archivo. </p>
                                        <p class="time">1 hora antes</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="notification-item">
                                    <div class="img-left">
                                        <img class="user-photo" alt="" src="assets/img/nav/pers/01.jpg">
                                    </div>
                                    <div class="user-content">
                                        <p class="user-info"><span class="name">Tara S.</span> Te envié un mensaje </p>
                                        <p class="time">3 hora antes</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="notification-item">
                                    <div class="img-left">
                                        <img class="user-photo" alt="" src="assets/img/nav/pers/02.png">
                                    </div>
                                    <div class="user-content">
                                        <p class="user-info"><span class="name">Francisca M.</span> Dejó un comentario. </p>
                                        <p class="time">3 hora antes</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  <!--Termino Header-->
</template> 

<script>
import AppBreadcrumb from "./AppBreadcrumb";

import imgLogo from "@/assets/images/neva_login.png";
import router from "@/router/index";

export default {
  name: "AppHeader",
  components: {
    AppBreadcrumb,
  },
  setup() {
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

    return {
      imgLogo,
      logout,
      ir,
    };
  },
};
</script>
