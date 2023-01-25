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
                <img class="img-logo" :src="imgIcon" alt="simbolo neva360">
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
  <div class="mt-5 container">
    <div class="row ">
      <div class="col-12 col-md-6 d-flex justify-content-center align-items-center mt-5 mt-lg-0 pt-5 pt-md-0">
        <form class="mt-lg-5 d-flex flex-column registro-form" action="">
          <div class="py-4 px-3 p-md-5 background-with">
            <div class="mb-4 ">
              <h2 class="mb-2 login-title">Completa tu acceso</h2>
            </div>
            <div class="">
              <div class="row">
                <div class="col-6 field">
                  <div class="control has-icon">
                    <label for="">Razón Social</label>
                    <input class="input w-100" type="text" :value="razonsocial" disabled placeholder="Razón Social" >
                    <div class="registro-icon" for="">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                    </div>
                  </div>
                </div>
                <div class="col-6 field">
                  <div class="control has-icon">
                    <label for="">Rut Empresa</label>
                    <input class="input w-100" type="text" :value="rutempresa" disabled placeholder="Rut empresa" >
                    <div class="registro-icon" for="">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                    </div>
                  </div>
                </div>
                <div class="col-6 field">
                  <div class="control has-icon">
                    <label for="">Rubro</label>
                    <select class="form-select" @change="GetTipoSubRubroByIdRubro" v-model="rubroSelected">
                      <option value="0" :key="0">Seleccione rubro</option>
                      <option v-for="rubro in rubros" :value="rubro.id" :key="rubro.id">
                          {{ rubro.nombre }}
                      </option>
                    </select>
                    <!--<div class="registro-icon" for="" >
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:user" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                    </div>
                    <div class="form-icon"></div>-->
                  </div>
                </div>
                <div class="col-6 field">
                  <div class="control has-icon">
                    <label for="">Sub Rubro</label>
                    <select class="form-select" v-model="subRubroSelected">
                      <option value="0" :key="0">Seleccione sub rubro</option>
                      <option v-for="subrubro in subrubros" :value="subrubro.id" :key="subrubro.id">
                        {{ subrubro.nombre }}
                      </option>
                    </select>
                    <!--<div class="registro-icon" for="">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                    </div>-->
                  </div>
                </div>
                <div class="col-12 field">
                  <div class="control has-icon">
                    <label for="">Comuna</label>
                    <input class="input input w-100" type="text" v-model="comuna" placeholder="Comuna" >
                    <div class="registro-icon" for="">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                    </div>
                  </div>
                </div>
                <div class="col-12 field">
                  <div class="control has-icon">
                    <label for="">Tamaño Empresa</label>
                    <select class="form-select" v-model="tamanoEmpresaSelected">
                      <option value="0" :key="0">Seleccione Tamaño</option>
                      <option v-for="tamano in tamanos" :value="tamano.id" :key="tamano.id">
                        {{ tamano.nombre }}
                      </option>
                    </select>
                    <!--<div class="registro-icon" for="">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                    </div>-->
                  </div>
                </div>
                <div class="col-12 field">
                  <div class="control has-icon">
                    <label for="">Nivel de venta</label>
                    <select class="form-select" v-model="nivelVentaSelected">
                      <option value="0" :key="0">Seleccione nivel venta</option>
                      <option v-for="nivelventa in nivelventas" :value="nivelventa.id" :key="nivelventa.id">
                        {{ nivelventa.nombre }}
                      </option>
                    </select>
                    <!--<div class="registro-icon" for="">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                    </div>-->
                  </div>
                </div>
                <div class="col-12 field">
                  <div class="control has-icon">
                    <label for="">Cantidad de empleados</label>
                    <select class="form-select" v-model="cantidadEmpleadoSelected">
                      <option value="0" :key="0">Seleccione rango</option>
                      <option v-for="rangoempleado in rangoempleados" :value="rangoempleado.id" :key="rangoempleado.id">
                        {{ rangoempleado.nombre }}
                      </option>
                    </select>
                    <!--<div class="registro-icon" for="">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                    </div>-->
                  </div>
                </div>
                <div class="alert">
                    <p>{{mensajeError}}</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="col-12 col-md-6 mt-1 mt-md-5 pt-4 pt-md-0">
        <form class="mt-lg-5 d-flex flex-column registro-form" action="">
          <div class="py-4 px-3 p-md-3 p-xl-5 background-with">
            <div class="mb-4 ">
              <h2 class="mb-2 login-title">Crea tu acceso</h2>
            </div>
            <div class="">
              <div class="row">
                <div class="col-6 ">
                  <div class="services card-producto">
                    <h3>Inicia</h3>
                    <p>Plan</p>
                  </div>
                </div>
                <div class="col-6">
                  <div class="services card-disable ">
                    <h3 class="empresa">Crece</h3>
                    <p>Contactanos</p>
                  </div>
                </div>
                <div class="mt-3 col-12">
                  <div class="services card-disable center">
                    <div>
                      <h3 class="empresa">Gran Empresa</h3>
                      <p>Contactanos</p>
                    </div>
                  </div>
                </div>
                <div class="detail">
                  <p>Fecha estimada de entrega: <span>23 de octubre</span>  Cada paquete tiene un número de seguimiento</p>
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
              </div>
              <div class="registro mb-5">
                  <button type="button" @click="guardarUsuario" aria-hidden="false" class="button button v-button is-bold is-fullwidth is-raised is-primary"><span> Ingresar </span></button>
              </div>
          </div>
        </form>
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
                            <h1>Completa tu acceso</h1>
                            <p class="text-medium-emphasis">
                                <CIcon icon="cil-spreadsheet" /> Datos de la impresa
                            </p>

                            <CRow>
                                <CCol :md="6" :lg="6" :xl="6">
                                    <CFormLabel>Razon Social</CFormLabel> 
                                    <CInputGroup class="mb-3">
                                        <CFormInput
                                            id="razonsocial"
                                            maxlength="150"
                                            placeholder="Nombre Empresa"
                                            autocomplete="razonsocial"
                                            :value="razonsocial"
                                            disabled
                                        />
                                    </CInputGroup>
                                </CCol>
                                <CCol :md="6" :lg="6" :xl="6">
                                    <CFormLabel>Rut Empresa</CFormLabel>    
                                    <CInputGroup class="mb-3">
                                        <CFormInput
                                        id="rutempresa"
                                        placeholder="12345678-0"
                                        autocomplete="rutempresa"
                                        :value="rutempresa"
                                        disabled
                                    />
                                    </CInputGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="6" :lg="6" :xl="6">
                                    <CFormLabel for="rubro">Rubro</CFormLabel>
                                    <CFormSelect
                                        id="rubro"
                                        size="sm"
                                        @change="GetTipoSubRubroByIdRubro"
                                        >
                                        <option :key="0">Seleccione rubro</option>
                                        <option
                                            v-for="rubro in rubros"
                                            :value="rubro.id"
                                            :key="rubro.id"
                                        >
                                            {{ rubro.nombre }}
                                        </option>
                                    </CFormSelect>
                                </CCol>

                                <CCol :md="6" :lg="6" :xl="6">
                                    <CFormLabel for="subRubro">Sub rubro</CFormLabel>
                                    <CFormSelect
                                        id="subRubro"
                                        size="sm"
                                        >
                                        <option :key="0">Seleccione sub rubro</option>
                                        <option
                                            v-for="subrubro in subrubros"
                                            :value="subrubro.id"
                                            :key="subrubro.id"
                                        >
                                            {{ subrubro.nombre }}
                                        </option>
                                    </CFormSelect>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="6" :lg="6" :xl="6">
                                    <CFormLabel for="comuna"  class="mt-3">Comuna</CFormLabel>
                                     <CInputGroup class="mb-3">
                                        <CFormInput
                                            id="comuna"
                                            maxlength="150"
                                            placeholder="Comuna"
                                            autocomplete="comuna"
                                        />
                                    </CInputGroup>
                                </CCol>

                                <CCol :md="6" :lg="6" :xl="6">
                                    <CFormLabel for="tamano" class="mt-3">Tamaño Empresa</CFormLabel>
                                    <CFormSelect
                                        id="tamano"
                                        size="sm"
                                        >
                                        <option :key="0">Seleccione Tamaño</option>
                                        <option
                                            v-for="tamano in tamanos"
                                            :value="tamano.id"
                                            :key="tamano.id"
                                        >
                                            {{ tamano.nombre }}
                                        </option>
                                    </CFormSelect>
                                </CCol>
                            </CRow>

                              <CRow>
                                <CCol :md="6" :lg="6" :xl="6">
                                    <CFormLabel for="nivelventa"  class="mt-3">Nivel de venta</CFormLabel>
                                     <CFormSelect
                                        id="nivelventa"
                                        size="sm"
                                        >
                                        <option :key="0">Seleccione nivel venta</option>
                                        <option
                                            v-for="nivelventa in nivelventas"
                                            :value="nivelventa.id"
                                            :key="nivelventa.id"
                                        >
                                            {{ nivelventa.nombre }}
                                        </option>
                                    </CFormSelect>
                                </CCol>

                                <CCol :md="6" :lg="6" :xl="6">
                                    <CFormLabel for="rangoempleado" class="mt-3">Cantidad de empleados</CFormLabel>
                                    <CFormSelect
                                        id="rangoempleado"
                                        size="sm"
                                        >
                                        <option :key="0">Seleccione rango</option>
                                        <option
                                            v-for="rangoempleado in rangoempleados"
                                            :value="rangoempleado.id"
                                            :key="rangoempleado.id"
                                        >
                                            {{ rangoempleado.nombre }}
                                        </option>
                                    </CFormSelect>
                                </CCol>
                            </CRow>
                            <div class="d-grid mt-3">
                                      <CFormCheck 
                                          id="chkAceptaTerminos"
                                          label="Aceptar términos y condiciones de uso"
                                          class="mt-3"
                                      />
                            </div>        
                            <div class="d-grid mt-3">
                                <CButton @click="guardarUsuario" color="primary">
                                  Crear
                                </CButton>
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
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import { style } from "@/assets/css/style.css";
import imgIcon from "@/assets/img/neva-logo.svg";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import { useRoute } from "vue-router";
import router from "@/router/index";
import { Fn } from "@/Helper/util";
import { useReCaptcha } from "vue-recaptcha-v3";
export default {
  name: "Register",
  methods: {
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
    const razonsocial = route.query.RazonSocial;
    const rutempresa = route.query.RutEmpresa;
    const state = reactive({
      razonsocial: razonsocial,
      rutempresa: rutempresa,
      uri: uri,
      rubros: [],
      subrubros: [],
      tamanos: [],
      nivelventas: [],
      rangoempleados: [],
      comuna: "",
      mensajeError: "",
      terminos: "",
      rubroSelected: 0,
      subRubroSelected:0,
      tamanoEmpresaSelected: 0,
      nivelVentaSelected: 0,
      cantidadEmpleadoSelected: 0,
    });
    const getAllRubro= () => {
      ApiNeva.get("TipoRubro/GetTipoRubros", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.rubros = response.data;
        })
        .catch((error) => console.log(error));
    };

    const GetTipoSubRubroByIdRubro = (elemento) => {
      if ( elemento.target.options[elemento.target.selectedIndex].index == 0) {  
        state.subrubros = [];
        return false;
      }
      let idrubro =
        elemento.target.options[elemento.target.selectedIndex].value;
      if (!idrubro) return false;
      ApiNeva.get("TipoSubRubro/GetTipoSubRubroByIdRubro?TipoRubroId=" + idrubro, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.subrubros = response.data;
        })
        .catch((error) => console.log(error));
    };

    const getAllTamano= () => {
      ApiNeva.get("TipoTamanoEmpresa/GetTipoTamanoEmpresas", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.tamanos = response.data;
        })
        .catch((error) => console.log(error));
    };

    const getAllNivelVenta= () => {
      ApiNeva.get("TipoNivelVenta/GetTipoNivelVentas", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.nivelventas = response.data;
        })
        .catch((error) => console.log(error));
    };

    const getAllRangoEmpleado= () => {
      ApiNeva.get("TipoCantidadEmpleado/GetTipoCantidadEmpleados", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.rangoempleados = response.data;
        })
        .catch((error) => console.log(error));
    };

    const guardarUsuario = async () => {
      state.mensajeError = "";

      if (!state.razonsocial) {
        state.mensajeError = "Debe ingresar razón social";
        swal.fire("Registro usuario", "Debe ingresar razón social", "warning");
        return false;
      }
      if (!state.rutempresa /*|| !Fn.validaRut(state.rutempresa)*/) {
        state.mensajeError = "Debe ingresar rut empresa";
        swal.fire("Registro usuario", "Debe ingresar rut empresa", "warning");
        return false;
      }
      if (state.rubroSelected == 0) {
        state.mensajeError = "Debe seleccionar rubro";
        swal.fire("Registro usuario", "Debe seleccionar rubro", "warning");
        return false;
      }
      if (state.subRubroSelected == 0) {
        state.mensajeError = "Debe seleccionar sub rubro";
        swal.fire("Registro usuario", "Debe seleccionar sub rubro", "warning");
        return false;
      }
      if (!state.comuna) {
        state.mensajeError = "Debe seleccionar comuna";
        swal.fire("Registro usuario", "Debe seleccionar comuna", "warning");
        return false;
      }
      if (state.tamanoEmpresaSelected == 0) {
        state.mensajeError = "Debe seleccionar tamaño empresa";
        swal.fire("Registro usuario", "Debe seleccionar tamaño empresa", "warning");
        return false;
      }
      if (state.nivelVentaSelected == 0) {
        state.mensajeError = "Debe seleccionar nivel venta";
        swal.fire("Registro usuario", "Debe seleccionar nivel venta", "warning");
        return false;
      }
      if (state.cantidadEmpleadoSelected == 0) {
        state.mensajeError = "Debe seleccionar rango empleados";
        swal.fire("Registro usuario", "Debe seleccionar rango empleados", "warning");
        return false;
      }
      if (!state.terminos) {
        state.mensajeError = "Debe aceptar términos y condiciones de uso";
        swal.fire("Registro usuario", "Debe aceptar términos y condiciones de uso", "warning");
        return false;
      }
      let bodyUser = {
        razonsocial: state.razonsocial,
        rutempresa: state.rutempresa,
        TipoRubroId: state.rubroSelected,
        TipoSubRubroId: state.subRubroSelected,
        comuna: state.comuna,
        TipoTamanoEmpresaId: state.tamanoEmpresaSelected,
        TipoNivelVentaId: state.nivelVentaSelected,
        TipoCantidadEmpleadoId: state.cantidadEmpleadoSelected
      };
      await recaptchaLoaded();
      await executeRecaptcha("EmpresaInsertOrUpdate").then((token) => {
        ApiNeva.post(
          "Empresa/EmpresaInsertOrUpdate?uri=" + encodeURIComponent(uri) + "&tr=" + token,
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
              "Registro de empresa",
              "Se ha completado datos para su empresa",
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
                "El email o rut ya se encuentran registrados, prueba con recuperar tu contraseña o contacta a tu administrador.",
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
    onMounted(() => {
      getAllRubro();
      getAllTamano();
      getAllNivelVenta();
      getAllRangoEmpleado();
    });

    return {
      ...toRefs(state),
      guardarUsuario,
      GetTipoSubRubroByIdRubro,
      style,
      imgIcon,
    }; 
  },
  async beforeMount() {
    /*const globalProperties =
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
    });*/
  },
};
</script>
