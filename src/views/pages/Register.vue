<template>

<!DOCTYPE html>
<html lang="es">
<head>
 <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>registro</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;600;700&family=Roboto:wght@100;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" :href="style">
</head>
<body class="body-login">
  <header class=" py-2 nav-header">
    <div class="container">
      <div class="d-flex justify-content-between">
        <div class="nav-login">
          <img class="img-logo" @click="ir('Login')" style="cursor:pointer" :src="imgIcon" alt="simbolo neva360">
        </div>
        <nav class="d-flex">
            <ul class="navbar">
                <li class="nav-item">
                    <a class="nav-link col-lg-auto" @click="ir('Login')">Ingresar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link col-lg-auto" >Crear cuenta</a>
                </li>
            </ul>
        </nav>
      </div>
    </div>
  </header>
  <div class="mt-5 container-fluid">
    <div class="row ">
      <div class="col-12 d-flex justify-content-center align-items-center mt-5 mt-lg-0 pt-5 pt-md-0">
        <div class="container center-form d-flex justify-content-center mx-lg-5 px-lg-5">
          <form class="mt-lg-5 mx-md-5 px-lg-5 d-flex flex-column registro-form" action="">
            <div class="py-4 px-3 p-md-5 background-with">
              <div class="mb-4 ">
                <h2 class="mb-2 login-title">Crea tu acceso</h2>
              </div>
              <div class="">
                <div class="row">
                  <div class="col-12 field">
                    <div class="control has-icon">
                        <label for="">Nombre</label>
                        <input class="input w-100" type="text" v-model="nombre" placeholder="Nombre">
                        <div class="registro-icon" for="" >
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:user" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                        </div>
                        <div class="form-icon">
                        </div>
                    </div>
                  </div>
                  <!--<div class="col-6 field">
                    <div class="control has-icon">
                        <label for="">Apellido</label>
                        <input class="input w-100" type="text" v-model="apellido" placeholder="Apellido" >
                        <div class="registro-icon" for="">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                        </div>
                    </div>
                  </div>-->
                  <div class="col-12 field" v-if="(password.length > 7 && password.length < 51) && password == passwordRepetir" >
                    <div class="control has-icon">
                        <label for="">Contraseña</label>
                        <input class="input input-succes w-100" type="password" v-model="password" placeholder="Contraseña" minlength="8" maxlength="50">
                        <div class="registro-icon" for="">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                        </div>
                    </div>
                  </div>
                  <div class="col-12 field" v-else >
                    <div class="control has-icon">
                        <label for="">Contraseña</label>
                        <input class="input input-alert w-100" type="password" v-model="password" placeholder="Contraseña" minlength="8" maxlength="50">
                        <div class="registro-icon" for="">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                        </div>
                    </div>
                  </div>
                  <div class="col-12 field" v-if=" (passwordRepetir.length > 7 && passwordRepetir.length < 51) && password == passwordRepetir">
                    <div class="control has-icon">
                        <label for="">Repetir Contraseña</label>
                        <input id="verificarPass" class="input input-succes w-100" type="password" @blur="verificarPass" v-model="passwordRepetir" placeholder="Repetir Contraseña" >
                        <div class="registro-icon" for="">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                        </div>
                    </div>
                  </div>
                  <div class="col-12 field" v-else>
                      <div class="control has-icon">
                          <label for="">Repetir Contraseña</label>
                          <input id="verificarPass" class="input input-alert w-100" type="password" @blur="verificarPass" v-model="passwordRepetir" placeholder="Repetir Contraseña" >
                          <div class="registro-icon" for="">
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 field">
                      <div class="control has-icon">
                          <label for="">Email</label>
                          <input class="input w-100" type="email" v-model="email" placeholder="Email" title="">
                          <div class="registro-icon" for="">
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 field">
                      <div class="control has-icon">
                          <label for="">Teléfono</label>
                          <input class="input w-100" type="tel" v-model="telefono"  maxlength="11" placeholder="Teléfono">
                          <div class="registro-icon" for="">
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                          </div>
                      </div>
                  </div>
                  <div class="col-6 field">
                      <div class="control has-icon">
                          <label for="">Razón Social</label>
                          <input class="input w-100" type="text" v-model="razonSocial" placeholder="Razón Social" >
                          <div class="registro-icon" for="">
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                          </div>
                      </div>
                  </div>
                  <div class="col-6 field">
                      <div class="control has-icon">
                          <label for="">Rut Empresa</label>
                          <input class="input w-100" type="text" v-model="rutEmpresa" placeholder="Rut empresa" >
                          <div class="registro-icon" for="">
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                              
                          </div>
                      </div>
                  </div>
                  <div class="alert" >
                      <p>{{mensajeError}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="d-flex mt-3 mt-md-5 mb-2">
                <label class="check mb-2"> 
                  <input type="checkbox" v-model="terminos">
                  <span class="checkmark"></span>
                </label>
                <label @click="visibleTerminosYCondiciones = true;" id="terminosycondiciones">Terminos y condiciones
                </label>
              </div>
              <div class="registro mb-5">
                  <button type="button" @click="crearUsuario" aria-hidden="false" class="button button v-button is-bold is-fullwidth is-raised is-primary"><span> Ingresar </span></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div> 
</body>
</html>



<!-- MODAL TERMINO Y CONDICIONES  -->
<CModal
  backdrop="static"
  size="lg"
  alignment="center"
  :visible="visibleTerminosYCondiciones"
  @close="
    () => {
      visibleTerminosYCondiciones = false;
    }
  "
>
  <CModalHeader>
      <CModalTitle>Terminos y condiciones</CModalTitle>&nbsp;&nbsp;
  </CModalHeader>
  <CModalBody>
    <CContainer>
      <CRow>
        <CCol sm="12">
        </CCol>
      </CRow>
    </CContainer>
  </CModalBody>
  <CModalFooter>
    <CButton
      color="secondary"
      @click="
        () => {
          //resetAsociarArea();
          visibleTerminosYCondiciones = false;
        }
      "
    >
      Cerrar
    </CButton>
  </CModalFooter>
</CModal>
<!-- MODAL TERMINO Y CONDICIONES-->

</template>
<style>
  #terminosycondiciones {
    color: blue;
    cursor: pointer;
  }
  #terminosycondiciones:link {
    text-decoration: none;
  }

  #terminosycondiciones:visited {
    text-decoration: none;
  }

  #terminosycondiciones:hover {
    text-decoration: underline;
  }

  #terminosycondiciones:active {
    text-decoration: underline;
  }
</style>

<script>
import { getCurrentInstance, reactive, toRefs } from "vue";
import { style } from "@/assets/css/style.css";
import imgIcon from "@/assets/img/neva-logo.svg";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import { useRoute } from "vue-router";
import router from "@/router/index";
import { validateEmail, Fn } from "@/Helper/util";
import { useReCaptcha } from "vue-recaptcha-v3";
export default {
  name: "Register",
  methods: {
    validateEmail,
    Fn,
  },
  setup() {
    const globalProperties = getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
    const recaptcha = async () => {
      await recaptchaLoaded()
      const token = await executeRecaptcha('login')
      console.log({ token })
    }
    const header = {
      ApiKey,
    };
    const state = reactive({
      nombre: "",
      //apellido: "",
      password: "",
      passwordRepetir: "",
      email: "",
      telefono: "",
      razonSocial: "",
      rutEmpresa: "",
      terminos: false,
      mensajeError: "",
      visibleTerminosYCondiciones: false,
    });
    const crearUsuario = async () => {
        state.mensajeError = "";
        if (!state.nombre){
          state.mensajeError = "Debe ingresar nombre";
          swal.fire("Registro usuario", "Debe ingresar nombre", "warning");
          return false;
        }
        /*if (!state.apellido){
          state.mensajeError = "Debe ingresar apellido";
          swal.fire("Registro usuario", "Debe ingresar apellido", "warning");
          return false;
        }*/
        if (!state.password) {
          state.mensajeError = "Debe ingresar contraseña";
          swal.fire("Registro usuario", "Debe ingresar contraseña", "warning");
          return false;
        }
        if (state.password.length < 8 || state.password.length > 50 ){
          state.mensajeError = "Contraseña debe tener un mínimo de 8 y máximo 50 caracteres";
          swal.fire("Registro usuario", "Contraseña debe tener un mínimo de 8 y máximo 50 caracteres", "warning");
          return false;
        }
        if (!state.passwordRepetir) {
          state.mensajeError = "Debe repetir contraseña";
          swal.fire("Registro usuario", "Debe repetir contraseña", "warning");
          return false;
        }
        if (state.password != state.passwordRepetir) {
          state.mensajeError = "Contraseñas deben coincidir";
          swal.fire("Registro usuario", "Contraseñas deben coincidir", "warning");
          return false;
        }
        if (!state.email) {
          state.mensajeError = "Debe ingresar un email";
          swal.fire("Registro usuario", "Debe ingresar email", "warning");
          return false;
        }
        if (!validateEmail(state.email)) {
          state.mensajeError = "Debe ingresar un email válido";
          swal.fire("Registro usuario", "Debe ingresar email válido", "warning");
          return false;
        }
        if (!state.telefono) {
          state.mensajeError = "Debe ingresar teléfono";
          swal.fire("Registro usuario", "Debe ingresar teléfono", "warning");
          return false;
        }
        if (!state.telefono.match(/^[0-9]+$/)) {
          state.mensajeError = "Debe ingresar teléfono válido";
          swal.fire("Registro usuario", "Debe ingresar teléfono válido", "warning");
          return false;
        }
        if (!state.razonSocial) {
          state.mensajeError = "Debe ingresar razón social";
          swal.fire("Registro usuario", "Debe ingresar razón social", "warning");
          return false;
        }
        if (!state.rutEmpresa) {
          state.mensajeError = "Debe ingresar rut empresa";
          swal.fire("Registro usuario", "Debe ingresar rut empresa", "warning");
          return false;
        }
        if (!Fn.validaRut(state.rutEmpresa)) {
          state.mensajeError = "Debe ingresar rut empresa";
          swal.fire("Registro usuario", "Debe ingresar rut empresa válido", "warning");
          return false;
        }
 
        //FALTA APELLIDO
        let bodyUser = {
            nombres: state.nombre,
            password: state.password,
            email: state.email,
            telefono: state.telefono,
            fechaCreacion: null,
            activo:true
        };
        bodyUser.empresa = {
                              rutempresa: state.rutEmpresa,
                              razonsocial: state.razonSocial
                            };

        await recaptchaLoaded();
        await executeRecaptcha("UsuarioCreate").then((token) => {
        ApiNeva.post(
            "Usuario/UsuarioCreate?&tr=" + token,
            bodyUser,
            {
              headers: {
                  ApiKey,
                  tokenRC: token,
              },
            }
        )
        .then((response) => {
            if (response.status != 200) return false;
            swal.fire(
                "Registro usuario",
                "Se ha enviado un email para continuar con el proceso",
                "success"
            ).then(() => {
                router.push({
                  name: "Pages",
                  query: { showMsjInvalidToken: "false" },
                });
            });
            setTimeout(() => {
                router.push({
                  name: "Pages",
                  query: { showMsjInvalidToken: "false" },
                });
            }, 10000);
            })
            .catch((error) => {
              if (!error.response.data.detail) {
                swal.fire(
                  "Registro usuario",
                  error.response.data,
                  "warning"
                );
                return;
              }
              if (error.response.data.detail.includes("duplicate key")) {
                swal.fire(
                  "Registro usuario",
                  "El email o rut empresa ya se encuentran registrados",
                  "warning"
                );
                return;
              }
              swal.fire(
                  "Registro usuario",
                  "Por favor, verifique los datos ingresados son válidos.",
                  "warning"
              );
            });
        });
    };

    const verificarPass = async () => {
      if (state.password == state.passwordRepetir){
      }
    };

    const ir = (namePageDestiny) => {
      return router.push({ name: namePageDestiny });
    };


    return {
      ...toRefs(state),
      crearUsuario,
      style,
      imgIcon,
      verificarPass,
      ir,
    }; 
  }
};
</script>
