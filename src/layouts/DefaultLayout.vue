<template>
  <Nav/>
  <div class="row view-wrapper">
    <AppHeader />
    <router-view />
  </div>
</template>
<script>
import { onMounted, ref, reactive, toRefs } from "vue";
import { CContainer } from "@coreui/vue";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
//import AppSidebar from "@/components/AppSidebar.vue";
import navOnboarding from "@/_navOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";
import { getCurrentInstance } from "vue";
import Nav from '@/views/nav.vue';
import style from "@/assets/css/style.css";

export default {
  name: "DefaultLayout",
  components: {
    AppFooter,
    AppHeader,
    CContainer,
    Nav,
  },
  methods: {
  },
  setup() {
    const wrapper = ref(null);

    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;

    /*CONFIGURACION*/
    const header = {
      Authorization: "Bearer " + localStorage.token,
      ApiKey,
    };

    const state = reactive({
      wrapper,
      steps: [],
      options: {
        overlay: {
          enabled: true,
          padding: 0,
          borderRadius: 0,
        },
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [150, 0],
              },
            },
          ],
        },
        scrollToStep: {
          enabled: true,
          options: {
            behavior: "smooth",
            block: "center",
            inline: "center",
          },
        },
        labels: {
          previousButton: "Atrás",
          nextButton: "Siguiente",
          finishButton: "Finalizar",
        },
      },
    });
    return {
      ...toRefs(state),
      style,
    };
  },
};
</script>
