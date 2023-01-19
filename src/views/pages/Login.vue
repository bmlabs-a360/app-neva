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

<body class="height-100">
    <div class="container-fluid">
        <div class="row">
            <div class="img-login col-sm-7 col-lg-6 d-flex justify-content-center align-items-center">
                <img class="w-100 m-5" :src="imgLogin" alt="persona manipulando una interfaz">
            </div>
            <div class="col-12 col-sm-5 col-lg-6 d-flex justify-content-center align-items-center p-md-2 p-lg-5">
                <div class="container m-md-2 m-lg-5 center-form">
                    <div class="mb-4">
                        <img class="mb-md-3" :src="imgLogo" alt="">
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
                            <a class="link-primary" @click="ir('Register')" style="cursor:pointer">Crear una cuenta.</a>
                            <!--<a class="link-secundary" @click="abirModalRecuperacion" style="cursor:pointer;display: none;">¿Has olvidado tu contraseña?</a>-->
                        </div>
                    </form>
                </div>
    
            </div>
        </div>
    </div>
</body>
</html>

  <!--
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4 pt-0">
              <CCardBody>
                <CImage
                  style="
                    width: 32em;
                    vertical-align: middle;
                    margin-left: auto;
                    margin-right: auto;
                    display: block;
                  "
                  fluid
                  rounded
                  alt="Logo Neva"
                  :src="imgLogo"
                />
                <p class="text-medium-emphasis">Accede con tu cuenta</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    id="email"
                    placeholder="example@example.cl"
                    autocomplete="username"
                    type="email"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <div v-if="passwordFieldType != 'password'">
                      <i @click="switchVisibility">
                        <svg
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                          />
                          <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                          />
                        </svg>
                      </i>
                    </div>
                    <div v-if="passwordFieldType == 'password'">
                      <i @click="switchVisibility">
                        <svg
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye-slash"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                          />
                          <path
                            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
                          />
                          <path
                            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
                          />
                        </svg>
                      </i>
                    </div>
                  </CInputGroupText>
                  <CFormInput
                    id="password"
                    :type="passwordFieldType"
                    v-model="clave"
                    placeholder="Password"
                    autocomplete="current-password"
                    @keypress="buscarEnter"
                  ></CFormInput>
                </CInputGroup>
                <CRow>
                  <CCol :xs="6">
                    <CButton
                      id="btnLogin"
                      @click="login"
                      color="primary"
                      class="px-5"
                    >
                      <CRow>
                        <CCol> Login </CCol>
                        <CCol>
                          <CSpinner
                            id="loading"
                            style="display: none; width: 1rem; height: 1rem"
                            variant="grow"
                          />
                        </CCol>
                      </CRow>
                    </CButton>
                  </CCol>
                  <CCol :xs="6" class="text-right">
                    <CNavLink id="dashboard" @click="ir('Register')" href="#" style="color: #1a0dab;" class="px-0">
                      Crea tu acceso aquí 
                    </CNavLink>
                  </CCol>
                  <CCol :xs="6" class="text-right">
                    <a
                      href="#"
                      @click="abirModalRecuperacion"
                      style="color: #afafaf; display:none"
                      class="px-0"
                    >
                      Recuperar contraseña
                    </a>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
    -->
  <!-- MODAL LOGIN CONSULTOR-->
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
      <CModalTitle>Login Consultor</CModalTitle>
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
import router from "@/router/index";
import { validateEmail, Fn } from "@/Helper/util";
import { useRoute } from "vue-router";
import { useReCaptcha } from "vue-recaptcha-v3";
import { style } from "@/assets/css/style.css";
import imgLogin from "@/assets/img/ilustraciones/login.svg";
import imgLogo from "@/assets/img/logo.svg";
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

    });
    const switchVisibility = () => {
      state.passwordFieldType =
        state.passwordFieldType === "password" ? "text" : "password";
    };
    const abirModalRecuperacion = () => {
      state.visibleModalRecuperacion = true;
    };
    const solicitarRecuperacion = async () => {
      //showSpining(true, "btnRecuperar", "loadingRecuperar");
      let email = document.getElementById("emailRecuperar").value;
      if (!email || !validateEmail(email)) {
        swal.fire(
          "Recuperación contraseña",
          "Debe ingresar un email válido",
          "warning"
        );
        //showSpining(false, "btnRecuperar", "loadingRecuperar");
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
              //showSpining(false, "btnRecuperar", "loadingRecuperar");
            });
          })
          .catch((error) => {
            console.log(error);
            swal.fire(
              "Recuperación contraseña",
              "Ha ocurrido un problema durante el proceso, por favor intente nuevamente o verifique con su administrador que el usuario existe registrado en el sistema",
              "warning"
            );
            //showSpining(false, "btnRecuperar", "loadingRecuperar");
          });
      });
    };
    /*const showSpining = (isActivate, idbtn, idloadin) => {
      if (isActivate) {
        document.getElementById(idloadin).style.display = "inline-block";
        document.getElementById(idbtn).disabled = true;
      } else {
        document.getElementById(idloadin).style.display = "none";
        document.getElementById(idbtn).disabled = false;
      }
    };*/
    const login = async () => {
      //showSpining(true, "btnLogin", "loading");
      let email = document.getElementById("email").value;
      let pass = document.getElementById("password").value;
      if (!email || !validateEmail(email)) {
        swal.fire("Login", "Debe ingresar email y password", "warning");
        //showSpining(false, "btnLogin", "loading");
        return false;
      }
      if (!pass) {
        swal.fire("Login", "Debe ingresar email y password", "warning");
        //showSpining(false, "btnLogin", "loading");
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
                //showSpining(false, "btnLogin", "loading");
                swal.fire("Login", "El email o password es incorrecto.", "warning");
              }
              return false;
            })
            .catch(() => {
              //showSpining(false, "btnLogin", "loading");
              swal.fire("Login", "El email o password es incorrecto.", "warning");
            });
        })
        .catch(() => {
          //showSpining(false, "btnLogin", "loading");
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
      localStorage.setItem(
        "usuarioModel",
        JSON.stringify(response.data.usuarioModel)
      );
       localStorage.setItem(
        "empresaModel",
        JSON.stringify(response.data.usuarioModel.empresa)
      );
      if (response.data.usuarioModel.perfil.nombre == "Consultor"){
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
      
      ApiNeva.get(process.env.VUE_APP_API_NEVA_SWAGGER, {
        headers: header,
      }).then((response2) => {
        if (response2.status == 200) {
          var asd = Object.keys(response2.data.paths).toString().split(",");
          var swaggerList = [];
          var i = 1;
          asd.forEach((element) => {
            swaggerList.push({
              id: i++,
              repositorio: element
                .toString()
                .replace("/api/v1/", "")
                .split("/")[0],
              metodo: element.toString().replace("/api/v1/", "").split("/")[1],
              nombre:
                element.toString().replace("/api/v1/", "").split("/")[0] +
                "_" +
                element.toString().replace("/api/v1/", "").split("/")[1],
            });
          });
          localStorage.setItem("swaggerList", JSON.stringify(swaggerList));
        } else {
          //showSpining(false, "btnLogin", "loading");
          swal.fire(
            "Login",
            "Problemas al obtener swagger.json. Contacte al administrador del sistema.",
            "warning"
          );
          return false;
        }
      });
      return router.push({ name: "Dashboard" });
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
      ApiNeva.get(process.env.VUE_APP_API_NEVA_SWAGGER, {
        headers: header,
      }).then((response2) => {
        if (response2.status == 200) {
          var asd = Object.keys(response2.data.paths).toString().split(",");
          var swaggerList = [];
          var i = 1;
          asd.forEach((element) => {
            swaggerList.push({
              id: i++,
              repositorio: element
                .toString()
                .replace("/api/v1/", "")
                .split("/")[0],
              metodo: element.toString().replace("/api/v1/", "").split("/")[1],
              nombre:
                element.toString().replace("/api/v1/", "").split("/")[0] +
                "_" +
                element.toString().replace("/api/v1/", "").split("/")[1],
            });
          });
          localStorage.setItem("swaggerList", JSON.stringify(swaggerList));
        } else {
          //showSpining(false, "btnLogin", "loading");
          swal.fire(
            "Login",
            "Problemas al obtener swagger.json. Contacte al administrador del sistema.",
            "warning"
          );
          return false;
        }
      });
      return router.push({ name: "Dashboard" });
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
            ApiNeva.get(process.env.VUE_APP_API_NEVA_SWAGGER, {
              headers: header,
            }).then((response2) => {
              if (response2.status == 200) {
                var asd = Object.keys(response2.data.paths)
                  .toString()
                  .split(",");
                var swaggerList = [];
                var i = 1;
                asd.forEach((element) => {
                  swaggerList.push({
                    id: i++,
                    repositorio: element
                      .toString()
                      .replace("/api/v1/", "")
                      .split("/")[0],
                    metodo: element
                      .toString()
                      .replace("/api/v1/", "")
                      .split("/")[1],
                    nombre:
                      element.toString().replace("/api/v1/", "").split("/")[0] +
                      "_" +
                      element.toString().replace("/api/v1/", "").split("/")[1],
                  });
                });
                localStorage.setItem(
                  "swaggerList",
                  JSON.stringify(swaggerList)
                );
              } else {
                //showSpining(false, "btnLogin", "loading");
                swal.fire(
                  "Login",
                  "Problemas al obtener swagger.json. Contacte al administrador del sistema.",
                  "warning"
                );
                return false;
              }
            });
            return router.push({ name: "Dashboard" });
          })
          .catch((error) => console.log(error));
      });
    }
  },
};
</script>
