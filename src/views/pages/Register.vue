<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
            <CRow class="justify-content-center">
                <CCol :md="9" :lg="7" :xl="7">
                    <CCard class="mx-4">
                        <CCardBody class="p-4">
                            <h1>Crea tu acceso</h1>
                            <p class="text-medium-emphasis">
                                <CIcon icon="cil-spreadsheet" /> Datos de la impresa
                            </p>

                            <CFormLabel>Nombre de usuario*</CFormLabel>
                            <CInputGroup class="mb-3">
                                <CInputGroupText>
                                <CIcon icon="cil-user" />
                                </CInputGroupText>
                                <CFormInput
                                id="nombre"
                                maxlength="150"
                                placeholder="Nombre Persona"
                                autocomplete="nombre"
                                />
                            </CInputGroup>

                            <CFormLabel>Contraseña*</CFormLabel>
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

                            <CFormLabel>Correo*</CFormLabel>
                            <CInputGroup class="mb-3">
                                <CInputGroupText>@</CInputGroupText>
                                <CFormInput
                                id="email"
                                placeholder="Email"
                                maxlength="150"
                                autocomplete="email"
                                />
                            </CInputGroup>

                            <CFormLabel>Telefono*</CFormLabel>    
                            <CInputGroup class="mb-3">
                                <CInputGroupText>
                                <CIcon icon="cil-phone" />
                                </CInputGroupText>
                                <CFormInput
                                id="telefono"
                                placeholder="1234567899"
                                autocomplete="telefono"
                                />
                            </CInputGroup>

                            <CRow>
                                <CCol :md="6" :lg="6" :xl="6">
                                    <CFormLabel>Razón Social*</CFormLabel>    
                                    <CInputGroup class="mb-3">
                                        <CFormInput
                                            id="razonsocial"
                                            maxlength="150"
                                            placeholder="Nombre Empresa"
                                            autocomplete="razonsocial"
                                            />
                                    </CInputGroup>
                                </CCol>
                                <CCol :md="6" :lg="6" :xl="6">
                                    <CFormLabel>Rut Empresa*</CFormLabel>    
                                    <CInputGroup class="mb-3">
                                        <CFormInput
                                        id="rutempresa"
                                        v-c-tooltip="{
                                            content: 'Ingrese su rut sin puntos y con guión',
                                            placement: 'right',
                                        }"
                                        placeholder="12345678-0"
                                        autocomplete="rutempresa"
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                 <CCol :md="9" :lg="7" :xl="7">
                                    <div class="mb-3 ">
                                        <CButton @click="recaptcha">Execute recaptcha</CButton>
                                    </div>
                                </CCol>
                            </CRow>
                            <div class="d-grid mb-3">
                                <CButton @click="crearUsuario" color="primary"
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
    const globalProperties = getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
    const recaptcha = async () => {
      await recaptchaLoaded()
      const token = await executeRecaptcha('login')
      console.log({ token })
    }
    const crearUsuario = async () => {
        let nombre = document.getElementById("nombre").value;
        let pass = document.getElementById("pass").value;
        let email = document.getElementById("email").value;
        let telefono = document.getElementById("telefono").value;
        let razonsocial = document.getElementById("razonsocial").value;
        let rutempresa = document.getElementById("rutempresa").value;

        if (!nombre) {
            swal.fire("Registro usuario", "Debe ingresar nombre", "warning");
            return false;
        }
        if (!pass) {
            swal.fire("Registro usuario", "Debe ingresar contraseña", "warning");
            return false;
        }
        if (!email || !validateEmail(email)) {
            swal.fire("Registro usuario", "Debe ingresar un email", "warning");
            return false;
        }
        if (!telefono) {
            swal.fire("Registro usuario", "Debe ingresar telefono", "warning");
            return false;
        }
        if (!razonsocial) {
            swal.fire("Registro usuario", "Debe ingresar razón social", "warning");
            return false;
        }
        if (!rutempresa || !Fn.validaRut(rutempresa)) {
            swal.fire("Registro usuario", "Debe ingresar rut empresa", "warning");
            return false;
        }
 
        let bodyUser = {
            nombres: nombre,
            password: pass,
            email: email,
            telefono: telefono,
            fechaCreacion: null,
            activo:true
        };
        bodyUser.empresa = {
                              rutempresa: rutempresa,
                              razonsocial: razonsocial
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
              if (error.response.data.detail.includes("llave duplicada")) {
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
    /*const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    //const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
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
      /*await recaptchaLoaded();
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
    };*/
    return {
      /*...toRefs(state),*/
      crearUsuario,
    }; 
  },
  async beforeMount() {
   /* const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    //const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
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
    /*await recaptchaLoaded();
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
    });*/
  },
};
</script>
