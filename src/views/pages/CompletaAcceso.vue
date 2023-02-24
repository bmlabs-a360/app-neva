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
          <img class="img-logo cursor-pointer" @click="ir('Login')" :src="imgIcon" alt="simbolo neva360">
        </div>
        <nav class="d-flex">
            <ul class="navbar">
                <li class="nav-item">
                    <a class="nav-link col-lg-auto" @click="ir('Login')" href="#">Ingresar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link col-lg-auto"  @click="ir('Register')" href="#">Crear cuenta</a>
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
                    <!--<input class="input input w-100" type="text" v-model="comuna" placeholder="Comuna" >-->
                    <select class="form-select" v-model="comunaSelected" @change="GetComunaId">
                      <option value="0" :key="0">Seleccione comuna</option>
                      <option v-for="comuna in comunas" :value="comuna.id" :key="comuna.id">
                          {{ comuna.nombre }}
                      </option>
                    </select>
                    <!--<div class="registro-icon" for="">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:lock" data-v-e4038ad7=""><g fill="none" stroke="#EAEBEF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
                    </div>-->
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
                <div class="d-flex mt-3 mt-md-5 mb-2">
                  <label class="check mb-2"> 
                    <input type="checkbox" v-model="terminos">
                    <span class="checkmark"></span>
                  </label>
                  <label @click="visibleTerminosYCondiciones = true;" id="terminosycondiciones">Terminos y condiciones
                  </label>
                </div>
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
      visibleTerminosYCondiciones: false,
      comunas:[],
      comunaSelected:0,
      comunaNombre: "",
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
      console.log("comuna", state.comunaSelected)
      if (!state.razonsocial) {
        state.mensajeError = "Debe ingresar razón social";
        swal.fire("Registro usuario", "Debe ingresar razón social", "warning");
        return false;
      }
      if (!state.rutempresa) {
        state.mensajeError = "Debe ingresar rut empresa";
        swal.fire("Registro usuario", "Debe ingresar rut empresa", "warning");
        return false;
      }
      if (!Fn.validaRut(state.rutempresa)) {
          state.mensajeError = "Debe ingresar rut empresa";
          swal.fire("Registro usuario", "Debe ingresar rut empresa válido", "warning");
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
      if (state.comunaNombre == "") {
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
        comuna: state.comunaNombre,
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

    const GetComunas = () => {

      state.comunas = [
          {
              id: 15101,
              nombre: "Arica    (Arica)"
          },
          {
              id: 15102,
              nombre: "Camarones    (Arica)"
          },
          {
              id: 15201,
              nombre: "Putre    (Parinacota)"
          },
          {
              id: 15202,
              nombre: "General Lagos    (Parinacota)"
          },
          {
              id: 1101,
              nombre: "Iquique    (Iquique)"
          },
          {
              id: 1107,
              nombre: "Alto Hospicio    (Iquique)"
          },
          {
              id: 1401,
              nombre: "Pozo Almonte    (Tamarugal)"
          },
          {
              id: 1402,
              nombre: "Camiña    (Tamarugal)"
          },
          {
              id: 1403,
              nombre: "Colchane    (Tamarugal)"
          },
          {
              id: 1404,
              nombre: "Huara    (Tamarugal)"
          },
          {
              id: 1405,
              nombre: "Pica    (Tamarugal)"
          },
          {
              id: 2101,
              nombre: "Antofagasta    (Antofagasta)"
          },
          {
              id: 2102,
              nombre: "Mejillones    (Antofagasta)"
          },
          {
              id: 2103,
              nombre: "Sierra Gorda    (Antofagasta)"
          },
          {
              id: 2104,
              nombre: "Taltal    (Antofagasta)"
          },
          {
              id: 2201,
              nombre: "Calama    (El Loa)"
          },
          {
              id: 2202,
              nombre: "Ollagüe    (El Loa)"
          },
          {
              id: 2203,
              nombre: "San Pedro de Atacama    (El Loa)"
          },
          {
              id: 2301,
              nombre: "Tocopilla    (Tocopilla)"
          },
          {
              id: 2302,
              nombre: "María Elena    (Tocopilla)"
          },
          {
              id: 3101,
              nombre: "Copiapó    (Copiapó)"
          },
          {
              id: 3102,
              nombre: "Caldera    (Copiapó)"
          },
          {
              id: 3103,
              nombre: "Tierra Amarilla    (Copiapó)"
          },
          {
              id: 3201,
              nombre: "Chañaral    (Chañaral)"
          },
          {
              id: 3202,
              nombre: "Diego de Almagro    (Chañaral)"
          },
          {
              id: 3301,
              nombre: "Vallenar    (Huasco)"
          },
          {
              id: 3302,
              nombre: "Alto del Carmen    (Huasco)"
          },
          {
              id: 3303,
              nombre: "Freirina    (Huasco)"
          },
          {
              id: 3304,
              nombre: "Huasco    (Huasco)"
          },
          {
              id: 4101,
              nombre: "La Serena    (Elqui)"
          },
          {
              id: 4102,
              nombre: "Coquimbo    (Elqui)"
          },
          {
              id: 4103,
              nombre: "Andacollo    (Elqui)"
          },
          {
              id: 4104,
              nombre: "La Higuera    (Elqui)"
          },
          {
              id: 4105,
              nombre: "Paihuano    (Elqui)"
          },
          {
              id: 4106,
              nombre: "Vicuña    (Elqui)"
          },
          {
              id: 4201,
              nombre: "Illapel    (Choapa)"
          },
          {
              id: 4202,
              nombre: "Canela    (Choapa)"
          },
          {
              id: 4203,
              nombre: "Los Vilos    (Choapa)"
          },
          {
              id: 4204,
              nombre: "Salamanca    (Choapa)"
          },
          {
              id: 4301,
              nombre: "Ovalle    (Limarí)"
          },
          {
              id: 4302,
              nombre: "Combarbalá    (Limarí)"
          },
          {
              id: 4303,
              nombre: "Monte Patria    (Limarí)"
          },
          {
              id: 4304,
              nombre: "Punitaqui    (Limarí)"
          },
          {
              id: 4305,
              nombre: "Río Hurtado    (Limarí)"
          },
          {
              id: 5101,
              nombre: "Valparaíso    (Valparaíso)"
          },
          {
              id: 5102,
              nombre: "Casablanca    (Valparaíso)"
          },
          {
              id: 5103,
              nombre: "Concón    (Valparaíso)"
          },
          {
              id: 5104,
              nombre: "Juan Fernández    (Valparaíso)"
          },
          {
              id: 5105,
              nombre: "Puchuncaví    (Valparaíso)"
          },
          {
              id: 5107,
              nombre: "Quintero    (Valparaíso)"
          },
          {
              id: 5109,
              nombre: "Viña del Mar    (Valparaíso)"
          },
          {
              id: 5201,
              nombre: "Isla de Pascua    (Isla de Pascua)"
          },
          {
              id: 5301,
              nombre: "Los Andes    (Los Andes)"
          },
          {
              id: 5302,
              nombre: "Calle Larga    (Los Andes)"
          },
          {
              id: 5303,
              nombre: "Rinconada    (Los Andes)"
          },
          {
              id: 5304,
              nombre: "San Esteban    (Los Andes)"
          },
          {
              id: 5401,
              nombre: "La Ligua    (Petorca)"
          },
          {
              id: 5402,
              nombre: "Cabildo    (Petorca)"
          },
          {
              id: 5403,
              nombre: "Papudo    (Petorca)"
          },
          {
              id: 5404,
              nombre: "Petorca    (Petorca)"
          },
          {
              id: 5405,
              nombre: "Zapallar    (Petorca)"
          },
          {
              id: 5501,
              nombre: "Quillota    (Quillota)"
          },
          {
              id: 5502,
              nombre: "La Calera    (Quillota)"
          },
          {
              id: 5503,
              nombre: "Hijuelas    (Quillota)"
          },
          {
              id: 5504,
              nombre: "La Cruz    (Quillota)"
          },
          {
              id: 5506,
              nombre: "Nogales    (Quillota)"
          },
          {
              id: 5601,
              nombre: "San Antonio    (San Antonio)"
          },
          {
              id: 5602,
              nombre: "Algarrobo    (San Antonio)"
          },
          {
              id: 5603,
              nombre: "Cartagena    (San Antonio)"
          },
          {
              id: 5604,
              nombre: "El Quisco    (San Antonio)"
          },
          {
              id: 5605,
              nombre: "El Tabo    (San Antonio)"
          },
          {
              id: 5606,
              nombre: "Santo Domingo    (San Antonio)"
          },
          {
              id: 5701,
              nombre: "San Felipe    (San Felipe de Aconcagua)"
          },
          {
              id: 5702,
              nombre: "Catemu    (San Felipe de Aconcagua)"
          },
          {
              id: 5703,
              nombre: "Llay-Llay    (San Felipe de Aconcagua)"
          },
          {
              id: 5704,
              nombre: "Panquehue    (San Felipe de Aconcagua)"
          },
          {
              id: 5705,
              nombre: "Putaendo    (San Felipe de Aconcagua)"
          },
          {
              id: 5706,
              nombre: "Santa María    (San Felipe de Aconcagua)"
          },
          {
              id: 5801,
              nombre: "Quilpué    (Marga Marga)"
          },
          {
              id: 5802,
              nombre: "Limache    (Marga Marga)"
          },
          {
              id: 5803,
              nombre: "Olmué    (Marga Marga)"
          },
          {
              id: 5804,
              nombre: "Villa Alemana    (Marga Marga)"
          },
          {
              id: 6101,
              nombre: "Rancagua    (Cachapoal)"
          },
          {
              id: 6102,
              nombre: "Codegua    (Cachapoal)"
          },
          {
              id: 6103,
              nombre: "Coinco    (Cachapoal)"
          },
          {
              id: 6104,
              nombre: "Coltauco    (Cachapoal)"
          },
          {
              id: 6105,
              nombre: "Doñihue    (Cachapoal)"
          },
          {
              id: 6106,
              nombre: "Graneros    (Cachapoal)"
          },
          {
              id: 6107,
              nombre: "Las Cabras    (Cachapoal)"
          },
          {
              id: 6108,
              nombre: "Machalí    (Cachapoal)"
          },
          {
              id: 6109,
              nombre: "Malloa    (Cachapoal)"
          },
          {
              id: 6110,
              nombre: "Mostazal    (Cachapoal)"
          },
          {
              id: 6111,
              nombre: "Olivar    (Cachapoal)"
          },
          {
              id: 6112,
              nombre: "Peumo    (Cachapoal)"
          },
          {
              id: 6113,
              nombre: "Pichidegua    (Cachapoal)"
          },
          {
              id: 6114,
              nombre: "Quinta de Tilcoco    (Cachapoal)"
          },
          {
              id: 6115,
              nombre: "Rengo    (Cachapoal)"
          },
          {
              id: 6116,
              nombre: "Requínoa    (Cachapoal)"
          },
          {
              id: 6117,
              nombre: "San Vicente    (Cachapoal)"
          },
          {
              id: 6201,
              nombre: "Pichilemu    (Cardenal Caro)"
          },
          {
              id: 6202,
              nombre: "La Estrella    (Cardenal Caro)"
          },
          {
              id: 6203,
              nombre: "Litueche    (Cardenal Caro)"
          },
          {
              id: 6204,
              nombre: "Marchihue    (Cardenal Caro)"
          },
          {
              id: 6205,
              nombre: "Navidad    (Cardenal Caro)"
          },
          {
              id: 6206,
              nombre: "Paredones    (Cardenal Caro)"
          },
          {
              id: 6301,
              nombre: "San Fernando    (Colchagua)"
          },
          {
              id: 6302,
              nombre: "Chépica    (Colchagua)"
          },
          {
              id: 6303,
              nombre: "Chimbarongo    (Colchagua)"
          },
          {
              id: 6304,
              nombre: "Lolol    (Colchagua)"
          },
          {
              id: 6305,
              nombre: "Nancagua    (Colchagua)"
          },
          {
              id: 6306,
              nombre: "Palmilla    (Colchagua)"
          },
          {
              id: 6307,
              nombre: "Peralillo    (Colchagua)"
          },
          {
              id: 6308,
              nombre: "Placilla    (Colchagua)"
          },
          {
              id: 6309,
              nombre: "Pumanque    (Colchagua)"
          },
          {
              id: 6310,
              nombre: "Santa Cruz    (Colchagua)"
          },
          {
              id: 7101,
              nombre: "Talca    (Talca)"
          },
          {
              id: 7102,
              nombre: "Constitución    (Talca)"
          },
          {
              id: 7103,
              nombre: "Curepto    (Talca)"
          },
          {
              id: 7104,
              nombre: "Empedrado    (Talca)"
          },
          {
              id: 7105,
              nombre: "Maule    (Talca)"
          },
          {
              id: 7106,
              nombre: "Pelarco    (Talca)"
          },
          {
              id: 7107,
              nombre: "Pencahue    (Talca)"
          },
          {
              id: 7108,
              nombre: "Río Claro    (Talca)"
          },
          {
              id: 7109,
              nombre: "San Clemente    (Talca)"
          },
          {
              id: 7110,
              nombre: "San Rafael    (Talca)"
          },
          {
              id: 7201,
              nombre: "Cauquenes    (Cauquenes)"
          },
          {
              id: 7202,
              nombre: "Chanco    (Cauquenes)"
          },
          {
              id: 7203,
              nombre: "Pelluhue    (Cauquenes)"
          },
          {
              id: 7301,
              nombre: "Curicó    (Curicó)"
          },
          {
              id: 7302,
              nombre: "Hualañé    (Curicó)"
          },
          {
              id: 7303,
              nombre: "Licantén    (Curicó)"
          },
          {
              id: 7304,
              nombre: "Molina    (Curicó)"
          },
          {
              id: 7305,
              nombre: "Rauco    (Curicó)"
          },
          {
              id: 7306,
              nombre: "Romeral    (Curicó)"
          },
          {
              id: 7307,
              nombre: "Sagrada Familia    (Curicó)"
          },
          {
              id: 7308,
              nombre: "Teno    (Curicó)"
          },
          {
              id: 7309,
              nombre: "Vichuquén    (Curicó)"
          },
          {
              id: 7401,
              nombre: "Linares    (Linares)"
          },
          {
              id: 7402,
              nombre: "Colbún    (Linares)"
          },
          {
              id: 7403,
              nombre: "Longaví    (Linares)"
          },
          {
              id: 7404,
              nombre: "Parral    (Linares)"
          },
          {
              id: 7405,
              nombre: "Retiro    (Linares)"
          },
          {
              id: 7406,
              nombre: "San Javier    (Linares)"
          },
          {
              id: 7407,
              nombre: "Villa Alegre    (Linares)"
          },
          {
              id: 7408,
              nombre: "Yerbas Buenas    (Linares)"
          },
          {
              id: 16101,
              nombre: "Chillán    (Diguillín)"
          },
          {
              id: 16102,
              nombre: "Bulnes    (Diguillín)"
          },
          {
              id: 16103,
              nombre: "Chillán Viejo    (Diguillín)"
          },
          {
              id: 16104,
              nombre: "El Carmen    (Diguillín)"
          },
          {
              id: 16105,
              nombre: "Pemuco    (Diguillín)"
          },
          {
              id: 16106,
              nombre: "Pinto    (Diguillín)"
          },
          {
              id: 16107,
              nombre: "Quillón    (Diguillín)"
          },
          {
              id: 16108,
              nombre: "San Ignacio    (Diguillín)"
          },
          {
              id: 16109,
              nombre: "Yungay    (Diguillín)"
          },
          {
              id: 16201,
              nombre: "Quirihue    (Itata)"
          },
          {
              id: 16202,
              nombre: "Cobquecura    (Itata)"
          },
          {
              id: 16203,
              nombre: "Coelemu    (Itata)"
          },
          {
              id: 16204,
              nombre: "Ninhue    (Itata)"
          },
          {
              id: 16205,
              nombre: "Portezuelo    (Itata)"
          },
          {
              id: 16206,
              nombre: "Ránquil    (Itata)"
          },
          {
              id: 16207,
              nombre: "Treguaco    (Itata)"
          },
          {
              id: 16301,
              nombre: "San Carlos    (Punilla)"
          },
          {
              id: 16302,
              nombre: "Coihueco    (Punilla)"
          },
          {
              id: 16303,
              nombre: "Ñiquén    (Punilla)"
          },
          {
              id: 16304,
              nombre: "San Fabián    (Punilla)"
          },
          {
              id: 16305,
              nombre: "San Nicolás    (Punilla)"
          },
          {
              id: 8101,
              nombre: "Concepción    (Concepción)"
          },
          {
              id: 8102,
              nombre: "Coronel    (Concepción)"
          },
          {
              id: 8103,
              nombre: "Chiguayante    (Concepción)"
          },
          {
              id: 8104,
              nombre: "Florida    (Concepción)"
          },
          {
              id: 8105,
              nombre: "Hualqui    (Concepción)"
          },
          {
              id: 8106,
              nombre: "Lota    (Concepción)"
          },
          {
              id: 8107,
              nombre: "Penco    (Concepción)"
          },
          {
              id: 8108,
              nombre: "San Pedro de La Paz    (Concepción)"
          },
          {
              id: 8109,
              nombre: "Santa Juana    (Concepción)"
          },
          {
              id: 8110,
              nombre: "Talcahuano    (Concepción)"
          },
          {
              id: 8111,
              nombre: "Tomé    (Concepción)"
          },
          {
              id: 8112,
              nombre: "Hualpén    (Concepción)"
          },
          {
              id: 8201,
              nombre: "Lebu    (Arauco)"
          },
          {
              id: 8202,
              nombre: "Arauco    (Arauco)"
          },
          {
              id: 8203,
              nombre: "Cañete    (Arauco)"
          },
          {
              id: 8204,
              nombre: "Contulmo    (Arauco)"
          },
          {
              id: 8205,
              nombre: "Curanilahue    (Arauco)"
          },
          {
              id: 8206,
              nombre: "Los Álamos    (Arauco)"
          },
          {
              id: 8207,
              nombre: "Tirúa    (Arauco)"
          },
          {
              id: 8301,
              nombre: "Los Ángeles    (Biobío)"
          },
          {
              id: 8302,
              nombre: "Antuco    (Biobío)"
          },
          {
              id: 8303,
              nombre: "Cabrero    (Biobío)"
          },
          {
              id: 8304,
              nombre: "Laja    (Biobío)"
          },
          {
              id: 8305,
              nombre: "Mulchén    (Biobío)"
          },
          {
              id: 8306,
              nombre: "Nacimiento    (Biobío)"
          },
          {
              id: 8307,
              nombre: "Negrete    (Biobío)"
          },
          {
              id: 8308,
              nombre: "Quilaco    (Biobío)"
          },
          {
              id: 8309,
              nombre: "Quilleco    (Biobío)"
          },
          {
              id: 8310,
              nombre: "San Rosendo    (Biobío)"
          },
          {
              id: 8311,
              nombre: "Santa Bárbara    (Biobío)"
          },
          {
              id: 8312,
              nombre: "Tucapel    (Biobío)"
          },
          {
              id: 8313,
              nombre: "Yumbel    (Biobío)"
          },
          {
              id: 8314,
              nombre: "Alto Biobío    (Biobío)"
          },
          {
              id: 9101,
              nombre: "Temuco    (Cautín)"
          },
          {
              id: 9102,
              nombre: "Carahue    (Cautín)"
          },
          {
              id: 9103,
              nombre: "Cunco    (Cautín)"
          },
          {
              id: 9104,
              nombre: "Curarrehue    (Cautín)"
          },
          {
              id: 9105,
              nombre: "Freire    (Cautín)"
          },
          {
              id: 9106,
              nombre: "Galvarino    (Cautín)"
          },
          {
              id: 9107,
              nombre: "Gorbea    (Cautín)"
          },
          {
              id: 9108,
              nombre: "Lautaro    (Cautín)"
          },
          {
              id: 9109,
              nombre: "Loncoche    (Cautín)"
          },
          {
              id: 9110,
              nombre: "Melipeuco    (Cautín)"
          },
          {
              id: 9111,
              nombre: "Nueva Imperial    (Cautín)"
          },
          {
              id: 9112,
              nombre: "Padre Las Casas    (Cautín)"
          },
          {
              id: 9113,
              nombre: "Perquenco    (Cautín)"
          },
          {
              id: 9114,
              nombre: "Pitrufquén    (Cautín)"
          },
          {
              id: 9115,
              nombre: "Pucón    (Cautín)"
          },
          {
              id: 9116,
              nombre: "Saavedra    (Cautín)"
          },
          {
              id: 9117,
              nombre: "Teodoro Schmidt    (Cautín)"
          },
          {
              id: 9118,
              nombre: "Toltén    (Cautín)"
          },
          {
              id: 9119,
              nombre: "Vilcún    (Cautín)"
          },
          {
              id: 9120,
              nombre: "Villarrica    (Cautín)"
          },
          {
              id: 9121,
              nombre: "Cholchol    (Cautín)"
          },
          {
              id: 9201,
              nombre: "Angol    (Malleco)"
          },
          {
              id: 9202,
              nombre: "Collipulli    (Malleco)"
          },
          {
              id: 9203,
              nombre: "Curacautín    (Malleco)"
          },
          {
              id: 9204,
              nombre: "Ercilla    (Malleco)"
          },
          {
              id: 9205,
              nombre: "Lonquimay    (Malleco)"
          },
          {
              id: 9206,
              nombre: "Los Sauces    (Malleco)"
          },
          {
              id: 9207,
              nombre: "Lumaco    (Malleco)"
          },
          {
              id: 9208,
              nombre: "Purén    (Malleco)"
          },
          {
              id: 9209,
              nombre: "Renaico    (Malleco)"
          },
          {
              id: 9210,
              nombre: "Traiguén    (Malleco)"
          },
          {
              id: 9211,
              nombre: "Victoria    (Malleco)"
          },
          {
              id: 14101,
              nombre: "Valdivia    (Valdivia)"
          },
          {
              id: 14102,
              nombre: "Corral    (Valdivia)"
          },
          {
              id: 14103,
              nombre: "Lanco    (Valdivia)"
          },
          {
              id: 14104,
              nombre: "Los Lagos    (Valdivia)"
          },
          {
              id: 14105,
              nombre: "Máfil    (Valdivia)"
          },
          {
              id: 14106,
              nombre: "Mariquina    (Valdivia)"
          },
          {
              id: 14107,
              nombre: "Paillaco    (Valdivia)"
          },
          {
              id: 14108,
              nombre: "Panguipulli    (Valdivia)"
          },
          {
              id: 14201,
              nombre: "La Unión    (Ranco)"
          },
          {
              id: 14202,
              nombre: "Futrono    (Ranco)"
          },
          {
              id: 14203,
              nombre: "Lago Ranco    (Ranco)"
          },
          {
              id: 14204,
              nombre: "Río Bueno    (Ranco)"
          },
          {
              id: 10101,
              nombre: "Puerto Montt    (Llanquihue)"
          },
          {
              id: 10102,
              nombre: "Calbuco    (Llanquihue)"
          },
          {
              id: 10103,
              nombre: "Cochamó    (Llanquihue)"
          },
          {
              id: 10104,
              nombre: "Fresia    (Llanquihue)"
          },
          {
              id: 10105,
              nombre: "Frutillar    (Llanquihue)"
          },
          {
              id: 10106,
              nombre: "Los Muermos    (Llanquihue)"
          },
          {
              id: 10107,
              nombre: "Llanquihue    (Llanquihue)"
          },
          {
              id: 10108,
              nombre: "Maullín    (Llanquihue)"
          },
          {
              id: 10109,
              nombre: "Puerto Varas    (Llanquihue)"
          },
          {
              id: 10201,
              nombre: "Castro    (Chiloé)"
          },
          {
              id: 10202,
              nombre: "Ancud    (Chiloé)"
          },
          {
              id: 10203,
              nombre: "Chonchi    (Chiloé)"
          },
          {
              id: 10204,
              nombre: "Curaco de Vélez    (Chiloé)"
          },
          {
              id: 10205,
              nombre: "Dalcahue    (Chiloé)"
          },
          {
              id: 10206,
              nombre: "Puqueldón    (Chiloé)"
          },
          {
              id: 10207,
              nombre: "Queilén    (Chiloé)"
          },
          {
              id: 10208,
              nombre: "Quellón    (Chiloé)"
          },
          {
              id: 10209,
              nombre: "Quemchi    (Chiloé)"
          },
          {
              id: 10210,
              nombre: "Quinchao    (Chiloé)"
          },
          {
              id: 10301,
              nombre: "Osorno    (Osorno)"
          },
          {
              id: 10302,
              nombre: "Puerto Octay    (Osorno)"
          },
          {
              id: 10303,
              nombre: "Purranque    (Osorno)"
          },
          {
              id: 10304,
              nombre: "Puyehue    (Osorno)"
          },
          {
              id: 10305,
              nombre: "Río Negro    (Osorno)"
          },
          {
              id: 10306,
              nombre: "San Juan de la Costa    (Osorno)"
          },
          {
              id: 10307,
              nombre: "San Pablo    (Osorno)"
          },
          {
              id: 10401,
              nombre: "Chaitén    (Palena)"
          },
          {
              id: 10402,
              nombre: "Futaleufú    (Palena)"
          },
          {
              id: 10403,
              nombre: "Hualaihué    (Palena)"
          },
          {
              id: 10404,
              nombre: "Palena    (Palena)"
          },
          {
              id: 11101,
              nombre: "Coyhaique    (Coyhaique)"
          },
          {
              id: 11102,
              nombre: "Lago Verde    (Coyhaique)"
          },
          {
              id: 11201,
              nombre: "Aysén    (Aysén)"
          },
          {
              id: 11202,
              nombre: "Cisnes    (Aysén)"
          },
          {
              id: 11203,
              nombre: "Guaitecas    (Aysén)"
          },
          {
              id: 11301,
              nombre: "Cochrane    (Capitán Prat)"
          },
          {
              id: 11302,
              nombre: "O'Higgins    (Capitán Prat)"
          },
          {
              id: 11303,
              nombre: "Tortel    (Capitán Prat)"
          },
          {
              id: 11401,
              nombre: "Chile Chico    (General Carrera)"
          },
          {
              id: 11402,
              nombre: "Río Ibáñez    (General Carrera)"
          },
          {
              id: 12101,
              nombre: "Punta Arenas    (Magallanes)"
          },
          {
              id: 12102,
              nombre: "Laguna Blanca    (Magallanes)"
          },
          {
              id: 12103,
              nombre: "Río Verde    (Magallanes)"
          },
          {
              id: 12104,
              nombre: "San Gregorio    (Magallanes)"
          },
          {
              id: 12201,
              nombre: "Cabo de Hornos    (Antártica Chilena)"
          },
          {
              id: 12202,
              nombre: "Antártica    (Antártica Chilena)"
          },
          {
              id: 12301,
              nombre: "Porvenir    (Tierra del Fuego)"
          },
          {
              id: 12302,
              nombre: "Primavera    (Tierra del Fuego)"
          },
          {
              id: 12303,
              nombre: "Timaukel    (Tierra del Fuego)"
          },
          {
              id: 12401,
              nombre: "Natales    (Última Esperanza)"
          },
          {
              id: 12402,
              nombre: "Torres del Paine    (Última Esperanza)"
          },
          {
              id: 13101,
              nombre: "Santiago    (Santiago)"
          },
          {
              id: 13102,
              nombre: "Cerrillos    (Santiago)"
          },
          {
              id: 13103,
              nombre: "Cerro Navia    (Santiago)"
          },
          {
              id: 13104,
              nombre: "Conchalí    (Santiago)"
          },
          {
              id: 13105,
              nombre: "El Bosque    (Santiago)"
          },
          {
              id: 13106,
              nombre: "Estación Central    (Santiago)"
          },
          {
              id: 13107,
              nombre: "Huechuraba    (Santiago)"
          },
          {
              id: 13108,
              nombre: "Independencia    (Santiago)"
          },
          {
              id: 13109,
              nombre: "La Cisterna    (Santiago)"
          },
          {
              id: 13110,
              nombre: "La Florida    (Santiago)"
          },
          {
              id: 13111,
              nombre: "La Granja    (Santiago)"
          },
          {
              id: 13112,
              nombre: "La Pintana    (Santiago)"
          },
          {
              id: 13113,
              nombre: "La Reina    (Santiago)"
          },
          {
              id: 13114,
              nombre: "Las Condes    (Santiago)"
          },
          {
              id: 13115,
              nombre: "Lo Barnechea    (Santiago)"
          },
          {
              id: 13116,
              nombre: "Lo Espejo    (Santiago)"
          },
          {
              id: 13117,
              nombre: "Lo Prado    (Santiago)"
          },
          {
              id: 13118,
              nombre: "Macul    (Santiago)"
          },
          {
              id: 13119,
              nombre: "Maipú    (Santiago)"
          },
          {
              id: 13120,
              nombre: "Ñuñoa    (Santiago)"
          },
          {
              id: 13121,
              nombre: "Pedro Aguirre Cerda    (Santiago)"
          },
          {
              id: 13122,
              nombre: "Peñalolén    (Santiago)"
          },
          {
              id: 13123,
              nombre: "Providencia    (Santiago)"
          },
          {
              id: 13124,
              nombre: "Pudahuel    (Santiago)"
          },
          {
              id: 13125,
              nombre: "Quilicura    (Santiago)"
          },
          {
              id: 13126,
              nombre: "Quinta Normal    (Santiago)"
          },
          {
              id: 13127,
              nombre: "Recoleta    (Santiago)"
          },
          {
              id: 13128,
              nombre: "Renca    (Santiago)"
          },
          {
              id: 13129,
              nombre: "San Joaquín    (Santiago)"
          },
          {
              id: 13130,
              nombre: "San Miguel    (Santiago)"
          },
          {
              id: 13131,
              nombre: "San Ramón    (Santiago)"
          },
          {
              id: 13132,
              nombre: "Vitacura    (Santiago)"
          },
          {
              id: 13201,
              nombre: "Puente Alto    (Cordillera)"
          },
          {
              id: 13202,
              nombre: "Pirque    (Cordillera)"
          },
          {
              id: 13203,
              nombre: "San José de Maipo    (Cordillera)"
          },
          {
              id: 13301,
              nombre: "Colina    (Chacabuco)"
          },
          {
              id: 13302,
              nombre: "Lampa    (Chacabuco)"
          },
          {
              id: 13303,
              nombre: "Til Til    (Chacabuco)"
          },
          {
              id: 13401,
              nombre: "San Bernardo    (Maipo)"
          },
          {
              id: 13402,
              nombre: "Buin    (Maipo)"
          },
          {
              id: 13403,
              nombre: "Calera de Tango    (Maipo)"
          },
          {
              id: 13404,
              nombre: "Paine    (Maipo)"
          },
          {
              id: 13501,
              nombre: "Melipilla    (Melipilla)"
          },
          {
              id: 13502,
              nombre: "Alhué    (Melipilla)"
          },
          {
              id: 13503,
              nombre: "Curacaví    (Melipilla)"
          },
          {
              id: 13504,
              nombre: "María Pinto    (Melipilla)"
          },
          {
              id: 13505,
              nombre: "San Pedro    (Melipilla)"
          },
          {
              id: 13601,
              nombre: "Talagante    (Talagante)"
          },
          {
              id: 13602,
              nombre: "El Monte    (Talagante)"
          },
          {
              id: 13603,
              nombre: "Isla de Maipo    (Talagante)"
          },
          {
              id: 13604,
              nombre: "Padre Hurtado    (Talagante)"
          },
          {
              id: 13605,
              nombre: "Peñaflor    (Talagante)"
          },
      ];
    };

    const ir = (namePageDestiny) => {
      return router.push({ name: namePageDestiny });
    };

    const GetComunaId = (elemento) => {
      if ( elemento.target.options[elemento.target.selectedIndex].index == 0 ){
        state.comunaNombre = "";
        return false;
      } 
      state.comunaNombre = elemento.target.options[elemento.target.selectedIndex].innerText;
    };


    onMounted(() => {
      getAllRubro();
      getAllTamano();
      getAllNivelVenta();
      getAllRangoEmpleado();
      GetComunas();
    });

    return {
      ...toRefs(state),
      guardarUsuario,
      GetTipoSubRubroByIdRubro,
      style,
      imgIcon,
      ir,
      GetComunaId,
    }; 
  },
};
</script>
