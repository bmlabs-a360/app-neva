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
            <div class="div-img">
                <img :src="imgIcon" alt="simbolo neva360">
            </div>
        <h1 class="">Analisis 360</h1>
        </div>
        <nav class="d-flex">
            <ul class="navbar">
                <li class="nav-item">
                    <a class="nav-link col-lg-auto" href="#">Ingresar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link col-lg-auto" href="#">Crear cuenta</a>
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
                  <div class="col-12 field" v-if="password == passwordRepetir" >
                    <div class="control has-icon">
                        <label for="">Contraseña</label>
                        <input class="input input-succes w-100" type="password" v-model="password" placeholder="Contraseña" >
                        <div class="registro-icon" for="">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                        </div>
                    </div>
                  </div>
                  <div class="col-12 field" v-if="password != passwordRepetir" >
                    <div class="control has-icon">
                        <label for="">Contraseña</label>
                        <input class="input input-alert w-100" type="password" v-model="password" placeholder="Contraseña" >
                        <div class="registro-icon" for="">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                        </div>
                    </div>
                  </div>
                  <div class="col-12 field" v-if="password == passwordRepetir">
                    <div class="control has-icon">
                        <label for="">Repetir Contraseña</label>
                        <input id="verificarPass" class="input input-succes w-100" type="password" @blur="verificarPass" v-model="passwordRepetir" placeholder="Repetir Contraseña" >
                        <div class="registro-icon" for="">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                        </div>
                    </div>
                  </div>
                  <div class="col-12 field" v-if="password != passwordRepetir">
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
                          <input class="input w-100" type="email" v-model="email" placeholder="Email" >
                          <div class="registro-icon" for="">
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 field">
                      <div class="control has-icon">
                          <label for="">Teléfono</label>
                          <input class="input w-100" type="tel" v-model="telefono" placeholder="Teléfono" >
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
              <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 mt-md-5  mb-2">
                    <label class="check mb-2">Terminos y condiciones
                      <input type="checkbox" v-model="terminos">
                      <span class="checkmark"></span>
                    </label>
                    <label class="check">Terminos y condiciones
                      <input type="checkbox">
                      <span class="checkmark"></span>
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
  <!--
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
    -->
</template>


<script>
import { getCurrentInstance, reactive, toRefs } from "vue";
import { style } from "@/assets/css/style.css";
import imgIcon from "@/assets/img/icons.svg";
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
      apellido: "",
      password: "",
      passwordRepetir: "",
      email: "",
      telefono: "",
      razonSocial: "",
      rutEmpresa: "",
      terminos: false,
      mensajeError: "",
    });
    const crearUsuario = async () => {
        state.mensajeError = "";
        if (!state.nombre){
          state.mensajeError = "Debe ingresar nombre";
          swal.fire("Registro usuario", "Debe ingresar nombre", "warning");
          return false;
        }
        if (!state.apellido){
          state.mensajeError = "Debe ingresar apellido";
          swal.fire("Registro usuario", "Debe ingresar apellido", "warning");
          return false;
        }
        if (!state.password) {
          state.mensajeError = "Debe ingresar contraseña";
          swal.fire("Registro usuario", "Debe ingresar contraseña", "warning");
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
        if (!state.email || !validateEmail(state.email)) {
          state.mensajeError = "Debe ingresar un email";
          swal.fire("Registro usuario", "Debe ingresar email", "warning");
          return false;
        }
        if (!state.telefono) {
          state.mensajeError = "Debe ingresar teléfono";
          swal.fire("Registro usuario", "Debe ingresar teléfono", "warning");
          return false;
        }
        if (!state.razonSocial) {
          state.mensajeError = "Debe ingresar razón social";
          swal.fire("Registro usuario", "Debe ingresar razón social", "warning");
          return false;
        }
         if (!state.rutEmpresa/* || !Fn.validaRut(rutempresa)*/) {
          state.mensajeError = "Debe ingresar razón social";
          swal.fire("Registro usuario", "Debe ingresar razón social", "warning");
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

    const verificarPass = async () => {
      if (state.password == state.passwordRepetir){
      }
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
      ...toRefs(state),
      crearUsuario,
      style,
      imgIcon,
      verificarPass,
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
