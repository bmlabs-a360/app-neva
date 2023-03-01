<template>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;600;700&family=Roboto:wght@100;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" :href="style">
</head>

<div class="body-login">
    <header class=" py-2 nav-header">
      <div class="container">
        <div class="d-flex justify-content-between">
          <div class="nav-login">
            <img class="img-logo cursor-pointer" @click="ir('Login')" :src="imgIcon" alt="simbolo neva360">
          </div>
          <nav class="d-flex">
              <ul class="navbar">
                  <li class="nav-item">
                      <a class="nav-link col-lg-auto" href="#">Ingresar</a>
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
            <div class="img-login col-sm-7 col-lg-6 d-flex justify-content-center align-items-center">
                <img class="w-100 m-5" :src="imgLogin" alt="persona manipulando una interfaz">
            </div>
            <div class="col-12 col-sm-5 col-lg-6 d-flex justify-content-center align-items-center p-md-2 p-lg-5 mt-5">
                <div class="container m-md-2 m-lg-5 center-form">
                    <div class="mb-4">
                        <img class="img-logo mb-md-3" :src="imgLogo" alt="">
                    <h2 class="mb-2">Ingresar</h2>
                    <p class="gris-400 p-10">Bienvenido de nuevo a su cuenta.</p>
                    </div>

                    <form  class="login-form" action="">
                        <div class="mb-md-4">
                            <div class="field">
                              <div class="control has-icon">
                                  <input class="input w-100 mb-2" type="email" id="email" placeholder="correo@correo.cl">
                                  <label class="label" for="" >
                                      Correo
                                  </label>
                                  <div class="form-icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:user" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                                  </div>
                              </div>
                            </div>
                            <div class="control has-icon">
                                <input class="input w-100"  id="password" :type="passwordFieldType" @keypress="buscarEnter" placeholder="Contraseña" >
                                <label class="label" for="">
                                    Contraseña
                                </label>
                                <div class="form-icon">
                                    <svg @click="switchVisibility" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                                </div>
                            </div>
                        </div>

                        <div class="login">
                          <button type="button" @click="login" aria-hidden="false" class="button button v-button is-bold is-fullwidth is-raised is-primary"><span> Ingresar </span></button>
                        </div>
                        <div class="d-flex flex-column align-items-center mt-4">
                            <a class="link-primary cursor-pointer" @click="ir('Register')">Crear una cuenta.</a>
                            <!--<a class="link-secundary" @click="abirModalRecuperacion" style="cursor:pointer;display: none;">¿Has olvidado tu contraseña?</a>-->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</html>

  <!-- MODAL LOGIN ADMINISTRADOR O CONSULTOR-->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalLoginConsultor"
    @close="
      () => {
        visibleModalLoginConsultor = false;
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Login Administrador o Consultor</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="8">
            <CFormLabel for="seleccionempresa"
              >Seleccione empresa
            </CFormLabel>
           <CFormSelect
                id="empresa"
                size="sm"
                class="mt-2"
            >
              <option
                  v-for="empresa in empresas"
                  :value="empresa.id"
                  :key="empresa.id"
              >
                  {{ empresa.razonSocial }}
              </option>
            </CFormSelect>
          </CCol>
        </CRow>
      </CContainer>
    </CModalBody>
    <CModalFooter>
      <CButton id="btnIngresarConsultor" @click="IngresarConsultor" color="primary">
        <CRow>
          <CCol> Aceptar </CCol>
        </CRow>
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- FIN MODAL LOGIN CONSULTOR -->

  <!-- MODAL RECUPERACION-->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalRecuperacion"
    @close="
      () => {
        visibleModalRecuperacion = false;
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Recuperación de Contraseña</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="8">
            <CFormLabel for="emailRecuperar"
              >Se enviará un enlace de recuperación al email
              registrado</CFormLabel
            >
            <CFormInput
              type="text"
              v-c-tooltip="{
                content: 'Ingrese el email que ha registrado en el sistema',
                placement: 'right',
              }"
              id="emailRecuperar"
              maxlength="50"
              placeholder="example@example.com"
            />
          </CCol>
        </CRow>
      </CContainer>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            visibleModalRecuperacion = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton id="btnRecuperar" @click="solicitarRecuperacion" color="primary">
        <CRow>
          <CCol> Recuperar </CCol>
          <CCol>
            <CSpinner
              id="loadingRecuperar"
              style="display: none; width: 1rem; height: 1rem"
              variant="grow"
            />
          </CCol>
        </CRow>
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- FIN MODAL RECUPERACION-->
</template>

<script>
import { getCurrentInstance, reactive, toRefs } from "vue";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import ApibackOffice from "@/api/ApiBackOffice";
import router from "@/router/index";
import { validateEmail, Fn } from "@/Helper/util";
import { useRoute } from "vue-router";
import { useReCaptcha } from "vue-recaptcha-v3";
import { style } from "@/assets/css/style.css";
import imgLogin from "@/assets/img/ilustraciones/login.svg";
import imgLogo from "@/assets/img/nav/logos/logo-negro.svg";
import imgIcon from "@/assets/img/neva-logo.svg";
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
      visibleModalRecuperacion: false,
      passwordFieldType: "password",
      clave: "",
      visibleModalLoginConsultor: false,
      empresas: [],
      dashboard: "Dashboard"

    });

    const switchVisibility = () => {
      state.passwordFieldType =
        state.passwordFieldType === "password" ? "text" : "password";
    };
    const abirModalRecuperacion = () => {
      state.visibleModalRecuperacion = true;
    };
    const solicitarRecuperacion = async () => {
      let email = document.getElementById("emailRecuperar").value;
      if (!email || !validateEmail(email)) {
        swal.fire(
          "Recuperación contraseña",
          "Debe ingresar un email válido",
          "warning"
        );
        return false;
      }
      await recaptchaLoaded();
      await executeRecaptcha("SolicitudRecuperarContrasena").then((token) => {
        ApiNeva.post(
          "Usuario/SolicitudRecuperarContrasena?email=" + email,
          null,
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
              "Recuperación contraseña",
              "Se ha enviado un enlace de recuperación a su correo eléctronico",
              "success"
            ).then(() => {
              state.visibleModalRecuperacion = false;
            });
          })
          .catch((error) => {
            console.log(error);
            swal.fire(
              "Recuperación contraseña",
              "Ha ocurrido un problema durante el proceso, por favor intente nuevamente o verifique con su administrador que el usuario existe registrado en el sistema",
              "warning"
            );
          });
      });
    };

    const login = async () => {
      let email = document.getElementById("email").value;
      let pass = document.getElementById("password").value;
      if (!email || !validateEmail(email)) {
        swal.fire("Login", "Debe ingresar email y password", "warning");
        return false;
      }
      if (!pass) {
        swal.fire("Login", "Debe ingresar email y password", "warning");
        return false;
      }
      let bodyLogin = {
        email: email,
        password: pass,
      };
      await recaptchaLoaded();

      await executeRecaptcha("Authenticate")
        .then((token) => {
          ApiNeva.post("Login/Authenticate", bodyLogin, {
            headers: {
              ApiKey,
              tokenRC: token,
            },
          })
            .then((response) => {
              if (response.status == 200) {
                accesosValidacion(response);
              } else {
                swal.fire("Login", "El email o password es incorrecto.", "warning");
              }
              return false;
            })
            .catch(() => {
              swal.fire("Login", "El email o password es incorrecto.", "warning");
            });
        })
        .catch(() => {
          swal.fire(
            "ReCaptcha ha detectado un uso abusivo y ha denegado el acceso.",
            {
              buttons: {
                cancel: "Cerrar",
                catch: {
                  text: "Mas Información!",
                  value: "info",
                },
              },
              icon: "warning",
            }
          ).then((resp) => {
            if (resp != "info") return;
            window.open("https://support.google.com/websearch/answer/86640");
          });
        });
    };
    const accesosValidacion = (response) => {
      localStorage.token = response.data.tokenBearer;
      localStorage.iduser = response.data.usuarioModel.id;
      state.dashboard = response.data.dashboard;
      localStorage.setItem(
        "usuarioModel",
        JSON.stringify(response.data.usuarioModel)
      );
       localStorage.setItem(
        "empresaModel",
        JSON.stringify(response.data.usuarioModel.empresa)
      );
      if (response.data.usuarioModel.perfil.nombre == "Consultor" || response.data.usuarioModel.perfil.nombre == "Administrador"){
        state.empresas = [];
        ApiNeva.get("Empresa/GetEmpresasByUsuarioId?idUsuario=" + response.data.usuarioModel.id , null, { headers: header })
          .then((response) => {
            if (response.status != 200) return false;
            state.empresas = response.data;
            console.log("state.empresas",state.empresas);
          })
          .catch((error) => console.log(error));
        state.visibleModalLoginConsultor = true;
        return false;
      }
      return router.push({ name: response.data.dashboard });
    };

   
    const IngresarConsultor = () => {
      
      let idempresa = document.getElementById("empresa").value;
      state.empresaSelected = state.empresas.find((c) => c.id === idempresa);
      if (!state.empresaSelected) {
         swal.fire(
            "Login",
            "Debe seleccionar una empresa",
            "warning"
          );
          return false;
      }
      let usuarioModel = JSON.parse(localStorage.usuarioModel);
      usuarioModel.empresa = state.empresaSelected;
      usuarioModel.empresaId = idempresa;
      localStorage.setItem(
        "usuarioModel",
        JSON.stringify(usuarioModel)
      );
       localStorage.setItem(
        "empresaModel",
        JSON.stringify(state.empresaSelected)
      );
      return router.push({ name: state.dashboard });
    };
    
    const buscarEnter = (elemento) => {
      if (elemento.keyCode === 13) {
        login();
      }
    };
    const onLoad = () => {
      if (showMsjInvalidToken === "true") {
        swal.fire(
          "Token invalido",
          "El token de recuperción o registro es inválido o ha vencido",
          "warning"
        );
      }
    };
    const ir = (namePageDestiny) => {
      return router.push({ name: namePageDestiny });
    };

    onLoad();

    return {
      ...toRefs(state),
      abirModalRecuperacion,
      switchVisibility,
      login,
      solicitarRecuperacion,
      buscarEnter,
      ir,
      imgLogo,
      imgLogin,
      style,
      imgIcon,
      IngresarConsultor,
    };
  },
  async beforeMount() {
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
    const header = {
      ApiKey,
    };
    if (localStorage.token != "null" && localStorage.token) {
      await recaptchaLoaded();
      await executeRecaptcha("RefreshToken").then((token) => {
        ApiNeva.post(
          "Login/RefreshToken?token=" + localStorage.token,
          null,
          {
            headers: {
              ApiKey,
              tokenRC: token,
            },
          }
        )
          .then((response) => {
            if (response.status != 200) return false;
            localStorage.token = response.data.tokenBearer;
            localStorage.iduser = response.data.usuarioModel.id;
            localStorage.setItem(
              "usuarioModel",
              JSON.stringify(response.data.usuarioModel)
            );
            return router.push({ name: "Dashboard" });
          })
          .catch((error) => console.log(error));
      });
    }
  },
};
</script>
