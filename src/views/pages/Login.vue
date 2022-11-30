<template>
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
                  alt="Logo HabuPay"
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
                    <a
                      href="#"
                      @click="abirModalRecuperacion"
                      style="color: #afafaf"
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
  <!-- MODAL -->
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
  <!-- MODAL -->
</template>

<script>
import { getCurrentInstance, reactive, toRefs } from "vue";
import swal from "sweetalert";
import ApiNeva from "@/api/ApiNeva";
import router from "@/router/index";
import { validateEmail, Fn } from "@/Helper/util";
import { useRoute } from "vue-router";
import { useReCaptcha } from "vue-recaptcha-v3";
import imgLogo from "@/assets/images/habu_login.png";
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
    });
    const switchVisibility = () => {
      state.passwordFieldType =
        state.passwordFieldType === "password" ? "text" : "password";
    };
    const abirModalRecuperacion = () => {
      state.visibleModalRecuperacion = true;
    };
    const solicitarRecuperacion = async () => {
      showSpining(true, "btnRecuperar", "loadingRecuperar");
      let email = document.getElementById("emailRecuperar").value;
      if (!email || !validateEmail(email)) {
        swal(
          "Recuperación contraseña",
          "Debe ingresar un email válido",
          "warning"
        );
        showSpining(false, "btnRecuperar", "loadingRecuperar");
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
            swal(
              "Recuperación contraseña",
              "Se ha enviado un enlace de recuperación a su correo eléctronico",
              "success"
            ).then(() => {
              state.visibleModalRecuperacion = false;
              showSpining(false, "btnRecuperar", "loadingRecuperar");
            });
          })
          .catch((error) => {
            console.log(error);
            swal(
              "Recuperación contraseña",
              "Ha ocurrido un problema durante el proceso, por favor intente nuevamente o verifique con su administrador que el usuario existe registrado en el sistema",
              "warning"
            );
            showSpining(false, "btnRecuperar", "loadingRecuperar");
          });
      });
    };
    const showSpining = (isActivate, idbtn, idloadin) => {
      if (isActivate) {
        document.getElementById(idloadin).style.display = "inline-block";
        document.getElementById(idbtn).disabled = true;
      } else {
        document.getElementById(idloadin).style.display = "none";
        document.getElementById(idbtn).disabled = false;
      }
    };
    const login = async () => {
      showSpining(true, "btnLogin", "loading");
      let email = document.getElementById("email").value;
      let pass = document.getElementById("password").value;
      if (!email || !validateEmail(email)) {
        swal("Login", "Debe ingresar email y password", "warning");
        showSpining(false, "btnLogin", "loading");
        return false;
      }
      if (!pass) {
        swal("Login", "Debe ingresar email y password", "warning");
        showSpining(false, "btnLogin", "loading");
        return false;
      }
      let bodyLogin = {
        email: email,
        password: pass,
      };
      //await recaptchaLoaded();

      //await executeRecaptcha("Authenticate")
        //.then((token) => {
          ApiNeva.post("Login/Authenticate", bodyLogin, {
            headers: {
              ApiKey,
              tokenRC: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",//token,
            },
          })
            .then((response) => {
              if (response.status == 200) {
                accesosValidacion(response);
              } else {
                showSpining(false, "btnLogin", "loading");
                swal("Login", "El email o password es incorrecto.", "warning");
              }
              return false;
            })
            .catch(() => {
              showSpining(false, "btnLogin", "loading");
              swal("Login", "El email o password es incorrecto.", "warning");
            });
        /*})
        .catch(() => {
          showSpining(false, "btnLogin", "loading");
          swal(
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
        */
    };
    const accesosValidacion = (response) => {
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
          showSpining(false, "btnLogin", "loading");
          swal(
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
        swal(
          "Token invalido",
          "El token de recuperción o registro es inválido o ha vencido",
          "warning"
        );
      }
    };
    onLoad();
    return {
      ...toRefs(state),
      abirModalRecuperacion,
      switchVisibility,
      login,
      solicitarRecuperacion,
      buscarEnter,
      imgLogo,
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
                showSpining(false, "btnLogin", "loading");
                swal(
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
