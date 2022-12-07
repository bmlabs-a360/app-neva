<template>
  <CFooter class="justify-content-center">
    <CRow>
      <CCol>
        <a href="#" target="_blank">BM Labs</a>
        <span
          >&copy; {{ new Date().getFullYear() }}
          <CImage
            style="width: 9.5em"
            fluid
            rounded
            alt="Logo Neva"
            :src="imgLogo"
          />
        </span>
      </CCol>
    </CRow>
  </CFooter>
</template>

<script>
import { reactive, toRefs } from "vue";
import imgLogo from "@/assets/images/neva_login.png";
export default {
  name: "AppFooter",
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
      imgLogo,
    };
  },
  beforeMount() {},
};
</script>
