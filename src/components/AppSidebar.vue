<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.commit({
          type: 'updateSidebarVisible',
          value: event,
        })
    "
  >
    <CSidebarBrand>
      <!--div v-if="sidebarVisible">
      <CImage   custom-class-name="sidebar-brand-full" style="width: 3.5em;"  fluid rounded alt="Logo HabuPay" :src="imgLogo"/>
      </div>
       <div v-if="!sidebarVisible">
      <CImage  custom-class-name="sidebar-brand-narrow" style="width: 3.5em;"  fluid rounded alt="Logo HabuPay" :src="imgLogoAncho"/>
      </div-->
      <CIcon
        custom-class-name="sidebar-brand-full"
        :icon="logoNegative"
        :height="55"
      />
      <CIcon
        custom-class-name="sidebar-brand-narrow"
        :icon="sygnet"
        :height="45"
      />
    </CSidebarBrand>
    <AppSidebarNav />
    <CSidebarToggler
      class="d-none d-lg-flex"
      @click="$store.commit('toggleUnfoldable')"
    />
  </CSidebar>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { AppSidebarNav } from "./AppSidebarNav";
import { logoNegative } from "@/assets/brand/logo-negative";
import { sygnet } from "@/assets/brand/sygnet";
import imgLogo from "@/assets/images/habu_login4.png";
import imgLogoAncho from "@/assets/images/habu_login2.png";
export default {
  name: "AppSidebar",
  components: {
    AppSidebarNav,
  },
  setup() {
    const store = useStore();
    return {
      imgLogo,
      imgLogoAncho,
      logoNegative,
      sygnet,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    };
  },
};
</script>
