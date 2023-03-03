<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="7">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <h1>Recuperación contraseña</h1>
              <p class="text-medium-emphasis">Ingrese su nueva contraseña</p>
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
                <CButton @click="guardar" color="primary">Guardar</CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import { useRoute } from "vue-router";
import router from "@/router/index";
import { useReCaptcha } from "vue-recaptcha-v3";
export default {
  name: "Recuperar",
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
    const guardar = async () => {
      if (!uri)
        return router.push({
          name: "Pages",
          query: { showMsjInvalidToken: "true" },
        });
      let pass = document.getElementById("pass").value;
      let pass_rep = document.getElementById("pass_rep").value;
      if (!pass) {
        swal("Nueva contraseña", "Debe ingresar una password", "warning");
        return false;
      }
      if (!pass_rep || pass != pass_rep) {
        swal(
          "Nueva contraseña",
          "Sus contraseñas deben ser iguales",
          "warning"
        );
        return false;
      }

      await recaptchaLoaded();
      await executeRecaptcha("RecuperarContrasena").then((token) => {
        ApiNeva.post(
          "Usuario/RecuperarContrasena?uri=" +
            encodeURIComponent(uri) +
            "&pass=" +
            pass,
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
              "Nueva contraseña",
              "Se ha cambiado su contraseña correctamente",
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
            }, 4000);
          })
          .catch((error) => {
            swal(
              "Nueva contraseña",
              "Por favor, verifique los datos ingresados son válidos",
              "warning"
            );
          });
      });
    };
    return {
      guardar,
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
