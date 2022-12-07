<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="7">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <h1>Registro nuevo usuario</h1>
              <p class="text-medium-emphasis">
                Complete el siguiente formulario con sus datos
              </p>

              <CInputGroup class="mb-3">
                <CInputGroupText>
                  <CIcon icon="cil-user" />
                </CInputGroupText>
                <CFormInput
                  id="nombres"
                  maxlength="150"
                  placeholder="Nombres"
                  autocomplete="nombres"
                />
              </CInputGroup>
              <CInputGroup class="mb-3">
                <CInputGroupText>
                  <CIcon icon="cil-user" />
                </CInputGroupText>
                <CFormInput
                  id="apellidos"
                  maxlength="150"
                  placeholder="Apellidos"
                  autocomplete="apellidos"
                />
              </CInputGroup>

              <CInputGroup class="mb-3">
                <CInputGroupText>
                  <CIcon icon="cil-user" />
                </CInputGroupText>
                <CFormInput
                  id="rut"
                  v-c-tooltip="{
                    content: 'Ingrese su rut sin puntos y con guión',
                    placement: 'right',
                  }"
                  placeholder="12345678-0"
                  autocomplete="rut"
                />
              </CInputGroup>

              <CInputGroup class="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CFormInput
                  id="email"
                  placeholder="Email"
                  maxlength="150"
                  :value="email"
                  autocomplete="email"
                />
              </CInputGroup>

              <CInputGroup class="mb-3">
                <CInputGroupText>
                  <CIcon icon="cil-lock-locked" />
                </CInputGroupText>
                <CFormInput
                  id="pass"
                  type="password"
                  placeholder="Password"
                  autocomplete="new-password"
                />
              </CInputGroup>
              <CInputGroup class="mb-4">
                <CInputGroupText>
                  <CIcon icon="cil-lock-locked" />
                </CInputGroupText>
                <CFormInput
                  id="pass_rep"
                  type="password"
                  placeholder="Repeat password"
                  autocomplete="new-password"
                />
              </CInputGroup>

              <div class="d-grid">
                <CButton @click="guardarUsuario" color="primary"
                  >Crear usuario</CButton
                >
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs } from "vue";
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
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
    const header = {
      ApiKey,
    };
    const route = useRoute();
    const uri = route.query.uri;
    const email = route.query.email;
    const state = reactive({
      email: email,
      uri: uri,
    });
    const guardarUsuario = async () => {
      if (!uri)
        return router.push({
          name: "Pages",
          query: { showMsjInvalidToken: "true" },
        });
      let email = state.email;
      let nombres = document.getElementById("nombres").value;
      let apellidos = document.getElementById("apellidos").value;
      let rut = document.getElementById("rut").value;
      let pass = document.getElementById("pass").value;
      let pass_rep = document.getElementById("pass_rep").value;
      if (!email || !validateEmail(email)) {
        swal("Registro usuario", "Debe ingresar un email", "warning");
        return false;
      }
      if (!nombres) {
        swal("Registro usuario", "Debe ingresar sus nombres", "warning");
        return false;
      }
      if (!apellidos) {
        swal("Registro usuario", "Debe ingresar sus apellidos", "warning");
        return false;
      }
      if (!rut || !Fn.validaRut(rut)) {
        swal("Registro usuario", "Debe ingresar su rut", "warning");
        return false;
      }
      if (!pass) {
        swal("Registro usuario", "Debe ingresar una password", "warning");
        return false;
      }
      if (!pass_rep || pass != pass_rep) {
        swal(
          "Registro usuario",
          "Sus contraseñas deben ser iguales",
          "warning"
        );
        return false;
      }
      let bodyUser = {
        email: email,
        password: pass,
        nombres: nombres,
        apellidos: apellidos,
        rut: rut,
        fechaCreacion: null,
      };
      await recaptchaLoaded();
      await executeRecaptcha("UsuarioInsert").then((token) => {
        ApiNeva.post(
          "Usuario/Insert?uri=" + encodeURIComponent(uri) + "&tr=" + token,
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
            swal(
              "Registro usuario",
              "Se ha enviado un email para confirmar su correo eléctronico",
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
            if (error.response.data.detail.includes("llave duplicada")) {
              swal(
                "Registro usuario",
                "El email o rut ya se encuentran registrados, prueba con recuperar tu contraseña o contacta a tu administrador.",
                "warning"
              );
              return;
            }
            swal(
              "Registro usuario",
              "Por favor, verifique los datos ingresados son válidos.",
              "warning"
            );
          });
      });
    };
    return {
      ...toRefs(state),
      guardarUsuario,
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
    const route = useRoute();
    const uri = route.query.uri;

    if (!uri)
      return router.push({
        name: "Pages",
        query: { showMsjInvalidToken: "true" },
      });
    await recaptchaLoaded();
    await executeRecaptcha("ValidateSimpleToken").then((token) => {
      ApiNeva.post(
        "Login/ValidateSimpleToken?uri=" +
          encodeURIComponent(uri) +
          "&tr=" +
          token,
        null,
        {
          headers: {
            ApiKey,
            tokenRC: token,
          },
        }
      )
        .then((response) => {
          if (response.status != 200)
            router.push({
              name: "Pages",
              query: { showMsjInvalidToken: "true" },
            });
          //todo ok todo perfect
        })
        .catch(() => {
          router.push({
            name: "Pages",
            query: { showMsjInvalidToken: "true" },
          });
        });
    });
  },
};
</script>
