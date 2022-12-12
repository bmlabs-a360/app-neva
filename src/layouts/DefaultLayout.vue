<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div class="body flex-grow-1 px-3">
        <!--<VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />-->
        <CContainer lg>
          <router-view />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  </div>
</template>
<script>
import { onMounted, ref, reactive, toRefs } from "vue";
import { CContainer } from "@coreui/vue";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppSidebar from "@/components/AppSidebar.vue";
//import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import navOnboarding from "@/_navOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";
import { getCurrentInstance } from "vue";

export default {
  name: "DefaultLayout",
  components: {
    AppFooter,
    AppHeader,
    AppSidebar,
    CContainer,
    //VOnboardingWrapper,
  },
  methods: {
    //renderSteps,
  },
  setup() {
    const wrapper = ref(null);
   // const { start } = useVOnboarding(wrapper);

    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;

    /*CONFIGURACION*/
    const header = {
      Authorization: "Bearer " + localStorage.token,
      ApiKey,
    };

    const state = reactive({
      //isonboardinginitial: false,
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

    //let localNav = navOnboarding;
  /*
    const onBoardingInitialNav = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboardinginitial = await onBoardingHelper.getUserSeeMenuNav(
          user.id,
          header
        );
      } catch (error) {
        console.log(error);
      }

      if (!state.isonboardinginitial) {
        state.steps = localNav.map((x) => {
          return renderSteps(x);
        });
        await onBoardingHelper.setUserSeeMenuNav(user.id, header);
      }
    };
    onBoardingInitialNav();

    onMounted(() => {
      if (!state.isonboardinginitial) {
        start();
      }
    });
      */
    return {
      ...toRefs(state),
      //start,
    };
  },
};
</script>
