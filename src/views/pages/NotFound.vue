<template>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;600;700&family=Roboto:wght@100;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" :href="style">
</head>
<body class="body-login">
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
                <div class="container card p-5 mt-5">
                    <img class="w-100 align-self-center" :src="img404" alt="persona manipulando una interfaz">
                    <div class="texto404 mb-4">
                        <h2 class="mb-2 titulobienvenida">Esta página no está disponible</h2>
                        <p class="gris-400 p-10">La página a la que intentas acceder no existe o se ha movido. Prueba a volver a la página de inicio</p>
                        <button class="btn btn-bienvenida" @click="ir('Login')">Inicio</button>
                        <p class="gris-400 p-8 pt-3 textocul mb-0">Si crees que esto es un error, contacta con nuestro equipo de</p>
                        <p class="gris-400 p-8 pt-3 pt-md-0 pt-lg-0 ">soporte@neva.cl</p>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</body>
</html>
</template>


<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import router from "@/router/index";
import { style } from "@/assets/css/style.css";
import imgIcon from "@/assets/img/neva-logo.svg";
import { useReCaptcha } from "vue-recaptcha-v3";
import img404 from "@/assets/img/ilustraciones/404.svg";
export default {
  name: "Register",
  methods: {
  },
  setup() {
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
    const header = {
      ApiKey,
    };

    const state = reactive({
    });

    const ir = (namePageDestiny) => {
      return router.push({ name: namePageDestiny });
    };

    onMounted(() => {
    });

    return {
      ...toRefs(state),
      style,
      imgIcon,
      img404,
      ir,
    }; 
  },
};
</script>
