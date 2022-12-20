<template>
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
</template>


<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
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
      let razonsocial = state.razonsocial;
      let rutempresa = state.rutempresa;
      let rubro = document.getElementById("rubro");
      let subRubro = document.getElementById("subRubro");
      let comuna = document.getElementById("comuna").value;
      let tamano = document.getElementById("tamano");
      let nivelventa = document.getElementById("nivelventa");
      let rango = document.getElementById("rangoempleado");
      let chkAceptaTerminos = document.getElementById("chkAceptaTerminos").checked;
      if (!razonsocial) {
        swal.fire("Registro usuario", "Debe ingresar razón social", "warning");
        return false;
      }
      if (!rutempresa || !Fn.validaRut(rutempresa)) {
        swal.fire("Registro usuario", "Debe ingresar rut empresa", "warning");
        return false;
      }
      if (rubro.selectedIndex == 0) {
        swal.fire("Registro usuario", "Debe seleccionar rubro", "warning");
        return false;
      }
      if (subRubro.selectedIndex == 0) {
        swal.fire("Registro usuario", "Debe seleccionar sub rubro", "warning");
        return false;
      }
      if (!comuna) {
        swal.fire("Registro usuario", "Debe seleccionar comuna", "warning");
        return false;
      }
       if (tamano.selectedIndex == 0) {
        swal.fire("Registro usuario", "Debe seleccionar tamaño", "warning");
        return false;
      }
      if (nivelventa.selectedIndex == 0) {
        swal.fire("Registro usuario", "Debe seleccionar nivel venta", "warning");
        return false;
      }
      if (rango.selectedIndex == 0) {
        swal.fire("Registro usuario", "Debe seleccionar rango", "warning");
        return false;
      }
      if (!chkAceptaTerminos) {
        swal.fire("Registro usuario", "Debe aceptar términos y condiciones de uso", "warning");
        return false;
      }
      let bodyUser = {
        razonsocial: razonsocial,
        rutempresa: rutempresa,
        TipoRubroId: rubro.value,
        TipoSubRubroId: subRubro.value,
        comuna: comuna,
        TipoTamanoEmpresaId: tamano.value,
        TipoNivelVentaId: nivelventa.value,
        TipoCantidadEmpleadoId: rango.value
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
      GetTipoSubRubroByIdRubro
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
