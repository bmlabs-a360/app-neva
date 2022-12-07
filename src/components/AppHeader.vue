<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <!--CImage  width="140" height="60" fluid rounded alt="Logo Neva" :src="imgLogo"/-->

      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <!--CIcon :icon="logo" height="48" alt="Logo" /-->
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <div></div>
        <CNavItem>
          <CNavLink id="dashboard" @click="ir('Dashboard')" href="#">
            Dashboard
          </CNavLink>
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
  </CHeader>
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
