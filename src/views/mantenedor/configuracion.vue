<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
  <!-- LIST -->
  <CRow>
    <CCol :md="12">
      <CCard class="mb-4" data-aos="fade-up" data-aos-easing="ease">
        <CCardHeader>
          <CRow>
            <CCol :sm="6" :md="10" :xs="6" :lg="11">
              <strong>Configuraciones</strong>&nbsp;<small>Listado</small>
            </CCol>
            <CCol :sm="6" :md="2" :xs="6" :lg="1">
              <div class="d-grid">
                <CButton
                  id="crear_config"
                  color="primary"
                  @click="
                    () => {
                      resetConfig();
                      visibleModalConfigselected = true;
                    }
                  "
                  ><strong>Crear</strong></CButton
                >
              </div>
            </CCol>
            <div id="filtro_config">
              <CCol :sm="6" :md="2" :xs="6" :lg="1"> Filtro: </CCol>
              <CCol :sm="6" :md="2" :xs="6" :lg="2">
                <CFormSelect
                  id="configuracionIdSelectedCombobox"
                  v-model="configuracionIdSelectedCombobox"
                  size="sm"
                  @change="changeResumenConfiguracionCombobox"
                >
                  <option value="0" :key="0">Todos</option>
                  <option
                    v-for="conf in configuracionCombobox"
                    :key="conf.key"
                    :value="conf.key"
                  >
                    {{ conf.key }}
                  </option>
                </CFormSelect>
              </CCol>
            </div>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable responsive striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell class="text-center" scope="col"
                  >&nbsp;</CTableHeaderCell
                >
                <CTableHeaderCell class="text-start" scope="col"
                  >Key</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Acciones</CTableHeaderCell
                >
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="conf in configuraciones" :key="conf.key">
                <CTableDataCell class="text-start">&nbsp;</CTableDataCell>
                <CTableDataCell class="text-start">{{
                  conf.key
                }}</CTableDataCell>
                <CTableDataCell id="acciones_config" class="text-center">
                  <CButton @click="getConfiguracionSelected(conf.key)">
                    <CIcon :icon="cilPen" size="lg" />
                  </CButton>
                  <CButton @click="eliminar(conf.key)">
                    <CIcon :icon="cilX" size="lg" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <!-- LIST -->

  <!-- MODAL CONFIG -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalConfigselected"
    @close="
      () => {
        resetConfig();
        visibleModalConfigselected = false;
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Configuración</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="12">
            <CForm>
              <div class="mb-3">
                <CFormLabel for="key">Key</CFormLabel>
                <CFormInput
                  type="text"
                  id="key"
                  placeholder="Identificador de la configuración"
                  maxlength="50"
                  :value="configuracionSelected.key"
                />
              </div>
            </CForm>
            <CForm>
              <div class="mb-3">
                <div v-if="passwordFieldType == 'password'">
                  <CFormLabel for="valor"
                    >Valor
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
                  </CFormLabel>
                  <CFormInput
                    id="valor"
                    placeholder="Valor de la configuración"
                    rows="3"
                    maxlength="255"
                    v-model="configuracionSelected.valor"
                    :type="passwordFieldType"
                  />
                </div>
                <div v-if="passwordFieldType != 'password'">
                  <CFormLabel for="valor"
                    >Valor
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
                  </CFormLabel>
                  <CFormTextarea
                    id="valor"
                    placeholder="Valor de la configuración"
                    rows="3"
                    maxlength="255"
                    v-model="configuracionSelected.valor"
                    visib
                  >
                  </CFormTextarea>
                </div>
              </div>
            </CForm>
            <CForm>
              <div class="mb-3">
                <CFormLabel for="descripcion">Descripción</CFormLabel>
                <CFormTextarea
                  id="descripcion"
                  placeholder="Descripción de la configuración"
                  rows="3"
                  maxlength="255"
                  :value="configuracionSelected.descripcion"
                ></CFormTextarea>
              </div>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            resetConfig();
            visibleModalConfigselected = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton color="primary" @click="guardar">Guardar</CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL CONFIG -->
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import { cilPen, cilX } from "@coreui/icons";
import swal from "sweetalert";
import ApiNeva from "@/api/ApiNeva";
import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import { mantenedorConfiguracion } from "@/_menuOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "Configuracion",
  components: {
    VOnboardingWrapper,
  },
  methods: {
    renderSteps,
  },
  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);
    const localMenuOnvoarding = mantenedorConfiguracion;

    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;

    /*CONFIGURACION*/
    const header = {
      Authorization: "Bearer " + localStorage.token,
      ApiKey,
    };

    //#region Funciones Locales
    const state = reactive({
      isonboarding: false,
      wrapper,
      steps: [],
      options: {
        overlay: {
          enabled: true,
          padding: 0,
          borderRadius: 10,
        },
        popper: {
          placement: "left",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 10],
              },
            },
          ],
        },
        scrollToStep: {
          enabled: true,
          options: {
            behavior: "smooth",
            block: "center",
            inline: "center",
          },
        },
        labels: {
          previousButton: "Atrás",
          nextButton: "Siguiente",
          finishButton: "Finalizar",
        },
      },
      configuraciones: [],
      configuracionesFull: [],
      configuracionSelected: {},
      visibleModalConfigselected: false,
      configuracionCombobox: [],
      configuracionIdSelectedCombobox: null,
      passwordFieldType: "password",
      clave: "",
    });

    const switchVisibility = () => {
      state.passwordFieldType =
        state.passwordFieldType === "password" ? "textarea" : "password";
    };

    const getConfiguraciones = () => {
      ApiNeva.get("Config/GetAll", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.configuraciones = response.data;
          //tratamiento de data y filtro
          state.configuraciones.sort(function (a, b) {
            if (a.key > b.key) return 1;
            if (a.key < b.key) return -1;
            return 0;
          });
          state.configuracionesFull = state.configuraciones;
          var auxData = [];
          state.configuraciones.forEach((element) => {
            auxData.push(element.key.split("_")[0]);
          });
          const unique = [...new Set(auxData)];
          unique.sort();
          unique.forEach((element) => {
            state.configuracionCombobox.push({ key: element });
          });
          console.log(
            "state.configuracionCombobox",
            state.configuracionCombobox
          );
          //Logica para filtro a partir del comboboxSelected fin
        })
        .catch((error) => console.log(error));
    };

    const getConfiguracionSelected = (keyConfig) => {
      state.configuracionSelected = state.configuraciones.find(
        (c) => c.key == keyConfig
      );
      state.visibleModalConfigselected = true;
    };

    const changeResumenConfiguracionCombobox = () => {
      let configuracionIdSelectedCombobox = document.getElementById(
        "configuracionIdSelectedCombobox"
      ).options[
        document.getElementById("configuracionIdSelectedCombobox").selectedIndex
      ].value;
      state.configuracionIdSelectedCombobox = configuracionIdSelectedCombobox;
      if (configuracionIdSelectedCombobox == 0)
        state.configuraciones = state.configuracionesFull;
      else
        state.configuraciones = state.configuracionesFull.filter((x) =>
          x.key.includes(configuracionIdSelectedCombobox)
        );
    };

    const resetConfig = () => {
      state.configuracionSelected = {
        key: "",
        valor: "",
        descripcion: "",
      };
    };

    const eliminar = (keyConfig) => {
      swal(
        "Eliminar Configuración",
        "¿Está seguro de eliminar la configuración: " + keyConfig + "?",
        "warning"
      )
        .then((response) => {
          if (!response) return;
          ApiNeva.delete("Config/Delete?key=" + keyConfig, {
            headers: header,
          })
            .then((respuesta) => {
              if (respuesta.status != 200) throw "Error";
              swal(
                "Eliminar Configuración",
                "Se ha eliminado correctamente el registro.",
                "success"
              );
            })
            .catch(() => {
              swal(
                "Eliminar Configuración",
                "Ha ocurrido un problema eliminando el registro.",
                "warning"
              );
            })
            .finally(() => {
              getConfiguraciones();
              resetConfig();
              state.visibleModalConfigselected = false;
            });
        })
        .catch((error) => error);
    };

    const guardar = () => {
      let key = document.getElementById("key").value;
      let valor = document.getElementById("valor").value;
      let descripcion = document.getElementById("descripcion").value;

      if (!key) {
        swal("Valor incorrecto", "Debe ingresar key.", "warning");
        return false;
      }

      if (!valor) {
        swal("Valor incorrecto", "Debe ingresar valor.", "warning");
        return false;
      }

      let bodyConfig = {
        key,
        valor,
        descripcion: descripcion || null,
      };

      ApiNeva.post("Config/New", bodyConfig, { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          swal(
            "Guardar Configuración",
            "Se ha guardado correctamente el registro.",
            "success"
          );
        })
        .catch(() => {
          swal(
            "Guardar Configuración",
            "Ha ocurrido un error guardando el registro.",
            "warning"
          );
        })
        .finally(() => {
          getConfiguraciones();
          resetConfig();
          state.visibleModalConfigselected = false;
        });
    };
    //#endregion Funciones Locales

    const onBoarding = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboarding = await onBoardingHelper.getUserSeeMenu(
          user.id,
          "mantenedorConfiguracion",
          header
        );
      } catch (error) {
        console.log(error);
      }

      if (!state.isonboarding) {
        state.steps = localMenuOnvoarding.map((x) => {
          return renderSteps(x);
        });
        await onBoardingHelper.setUserSeeMenu(
          user.id,
          "mantenedorConfiguracion",
          header
        );
      }
    };

    onMounted(() => {
      getConfiguraciones();
      onBoarding();
      if (!state.isonboarding) {
        setTimeout(() => {
          start();
        }, 500);
      }
    });

    return {
      cilPen,
      cilX,
      ...toRefs(state),
      getConfiguracionSelected,
      changeResumenConfiguracionCombobox,
      resetConfig,
      eliminar,
      guardar,
      switchVisibility,
    };
  },
};
</script>

<style></style>
