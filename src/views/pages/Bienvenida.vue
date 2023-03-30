<template>
<!DOCTYPE html>
<html lang="es">
 <header class=" py-2 nav-header">
    <div class="container">
        <div class="d-flex justify-content-between">
        <div class="nav-login">
                <img class="img-logo" :src="imgIcon" alt="simbolo neva360">
        </div>
        <nav class="d-flex">
            <ul class="navbar">
                <li class="nav-item">
                    <a class="nav-link col-lg-auto" @click="ir('Login')">Ingresar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link col-lg-auto" @click="ir('Register')">Crear cuenta</a>
                </li>
            </ul>
        </nav>
    </div>
    </div>
</header>
<div class="mt-5 container-fluid">
    <div class="row">
        <div class="col-sm-12 col-lg-12 d-flex justify-content-center align-items-center">
            <img class="w-100 imgbienvenida" :src="imgBienvenida" alt="persona manipulando una interfaz">
        </div>
        <div class="col-12 col-sm-12 col-lg-12 textosbienvenida p-md-2 p-lg-1 mt-1 mt-lg-0 pt-5 pt-md-0">
            <div class="container m-md-2 m-lg-5 ">
                <div class="mb-4">
                <h2 class="mb-2 titulobienvenida">Bienvenido a Neva</h2>
                <p class="gris-400 p-10">Ahora tienes acceso a descubrir el verdadero potencial de tu empresa</p>
                <button class="btn btn-bienvenida" @click="ir('Login')" >Ingresar</button>
                </div>
            </div>
        </div>
    </div>
</div>
</html>

</template>

<script>
import { getCurrentInstance, reactive, toRefs } from "vue";
import { validateEmail, Fn } from "@/Helper/util";
import { useRoute } from "vue-router";
import { useReCaptcha } from "vue-recaptcha-v3";
import imgIcon from "@/assets/img/neva-logo.svg";
import imgBienvenida from "@/assets/img/ilustraciones/imgbienvenida.svg"
import router from "@/router/index";
export default {
  name: "Login",
  methods: {
    validateEmail,
    Fn,
  },
  setup() {
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

    const header = {
      ApiKey,
    };
    const route = useRoute();
    const showMsjInvalidToken = route.query.showMsjInvalidToken || "false";
    const state = reactive({

    });

    const ir = (namePageDestiny) => {
      return router.push({ name: namePageDestiny });
    };
    
    return {
      ...toRefs(state),
      ir,
      imgBienvenida,
      imgIcon,
    };
  },
};
</script>
