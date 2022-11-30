<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
  <!-- LIST -->
  <CRow>
    <CCol :md="12">
      <CCard class="mb-4" data-aos="fade-up" data-aos-easing="ease">
        <CCardHeader>
          <CRow>
            <CCol :sm="6" :md="10" :xs="6" :lg="11">
              <strong>Monedas</strong>&nbsp;<small>Listado</small>
            </CCol>
            <CCol :sm="6" :md="2" :xs="6" :lg="1">
              <div class="d-grid">
                <CButton
                  id="crear_moneda"
                  color="primary"
                  @click="
                    () => {
                      visibleModalMoneda = true;
                    }
                  "
                  ><strong>Crear</strong></CButton
                >
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell class="text-center" scope="col"
                  >&nbsp;</CTableHeaderCell
                >
                <CTableHeaderCell class="text-left" scope="col"
                  >Nombre</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Abreviatura</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Signo</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Locale</CTableHeaderCell
                >
                <CTableHeaderCell class="text-start" scope="col"
                  >Activo</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Acciones</CTableHeaderCell
                >
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="mon in monedas" :key="mon.id">
                <CTableDataCell class="text-center">&nbsp;</CTableDataCell>
                <CTableDataCell class="text-left">{{
                  mon.nombre
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  mon.acronimo
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  mon.signo
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  mon.locale
                }}</CTableDataCell>
                <CTableDataCell class="text-center">
                  <CFormSwitch
                    style="cursor: pointer"
                    disabled
                    v-model="mon.activo"
                    :checked="mon.activo"
                  />
                </CTableDataCell>
                <CTableDataCell id="acciones_moneda" class="text-center">
                  <CLink
                    v-c-tooltip="{
                      content: 'Editar información de la moneda',
                      placement: 'top',
                    }"
                  >
                    <CButton @click="getMondenaById(mon.id)">
                      <CIcon :icon="cilPen" size="lg" />
                    </CButton>
                  </CLink>

                  <CLink
                    v-c-tooltip="{
                      content: 'Eliminar moneda',
                      placement: 'right',
                    }"
                  >
                    <CButton @click="eliminarMoneda(mon.id)">
                      <CIcon :icon="cilX" size="lg" />
                    </CButton>
                  </CLink>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <!-- LIST -->

  <!-- MODAL CANAL -->
  <CModal
    backdrop="static"
    size="md"
    alignment="center"
    :visible="visibleModalMoneda"
    @close="
      () => {
        resetMoneda();
        visibleModalMoneda = false;
      }
    "
  >
    <CModalHeader>
      <div style="display: flex">
        <CModalTitle>Moneda</CModalTitle>&nbsp;&nbsp;
        <div style="padding-top: 0.3rem">
          <CLink
            v-c-tooltip="
              'Determina si la moneda se puede usar en la creación de transacciones!'
            "
          >
            <CFormSwitch
              style="cursor: pointer"
              id="activo"
              v-model="monedaSelected.activo"
              :checked="monedaSelected.activo"
            />
          </CLink>
        </div>
      </div>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="12">
            <div class="mb-3">
              <CFormLabel for="nombre">Nombre</CFormLabel>
              <CFormInput
                type="text"
                id="nombre"
                maxlength="100"
                v-model="monedaSelected.nombre"
              />
            </div>

            <div class="mb-3 pt-1">
              <CFormLabel for="acronimo">Abreviatura</CFormLabel>
              <CFormInput
                type="text"
                id="acronimo"
                maxlength="10"
                v-model="monedaSelected.acronimo"
              />
            </div>

            <div class="mb-3 pt-1">
              <CFormLabel for="signo">Signo</CFormLabel>
              <CFormInput
                type="text"
                id="signo"
                maxlength="10"
                v-model="monedaSelected.signo"
              />
            </div>

            <div class="mb-3 pt-1">
              <CFormLabel for="locale">Locale</CFormLabel>
              <CFormInput
                type="text"
                id="locale"
                maxlength="10"
                v-model="monedaSelected.locale"
              />
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            resetMoneda();
            visibleModalMoneda = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton color="primary" @click="guardar">Guardar</CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL CANAL -->
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import { cilPen, cilX } from "@coreui/icons";
import swal from "sweetalert";
import ApiNeva from "@/api/ApiNeva";
import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import { mantenedorMoneda } from "@/_menuOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "Moneda",
  components: {
    VOnboardingWrapper,
  },
  methods: {
    renderSteps,
  },
  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);
    const localMenuOnvoarding = mantenedorMoneda;

    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;

    /*CONFIGURACION*/
    const header = {
      Authorization: "Bearer " + localStorage.token,
      ApiKey,
    };

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
      monedas: [],
      visibleModalMoneda: false,
      monedaSelected: {
        id: 0,
        nombre: "",
        acronimo: "",
        signo: "",
        locale: "",
        activo: false,
      },
    });

    const getAllMonedas = () => {
      ApiNeva.get("Moneda/GetListMonedas", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.monedas = [];
          state.monedas = response.data;
        })
        .catch((error) => console.log(error));
    };

    const guardar = () => {
      if (!state.monedaSelected.nombre) {
        swal("Valor Incorrecto", "Debe ingresar el nombre", "warning");
        return false;
      }

      if (!state.monedaSelected.acronimo) {
        swal("Valor Incorrecto", "Debe ingresar el acrónimo", "warning");
        return false;
      }

      if (!state.monedaSelected.signo) {
        swal("Valor Incorrecto", "Debe ingresar el signo", "warning");
        return false;
      }

      if (!state.monedaSelected.locale) {
        swal("Valor Incorrecto", "Debe ingresar el locale", "warning");
        return false;
      }

      if (state.monedaSelected.id == 0) {
        if (
          state.monedas.find((m) => m.nombre == state.monedaSelected.nombre)
        ) {
          swal(
            "Valor Incorrecto",
            "El nombre de la moneda ya existe registrado",
            "warning"
          );
          return false;
        }

        if (
          state.monedas.find((m) => m.acronimo == state.monedaSelected.acronimo)
        ) {
          swal(
            "Valor Incorrecto",
            "El acrónimo de la moneda ya existe registrado",
            "warning"
          );
          return false;
        }
      }

      ApiNeva.post("Moneda/SaveMoneda", state.monedaSelected, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          let titulo =
            state.monedaSelected.id != 0 ? "Actualizar Moneda" : "Crear Moneda";
          let texto =
            state.monedaSelected.id != 0
              ? "Se ha actualizado la moneda correctamente"
              : "Se ha guardado la moneda correctamente";
          state.visibleModalMoneda = false;
          getAllMonedas();
          resetMoneda();
          swal(titulo, texto, "success");
        })
        .catch((error) => console.log(error));
    };

    const resetMoneda = () => {
      state.monedaSelected = {
        id: 0,
        nombre: "",
        acronimo: "",
        signo: "",
        locale: "",
        activo: false,
      };
    };

    const getMondenaById = (idmoneda) => {
      state.monedaSelected = state.monedas.find((m) => m.id == idmoneda);
      state.visibleModalMoneda = true;
    };

    const eliminarMoneda = (idmoneda) => {
      let toDelete = state.monedas.find((m) => m.id == idmoneda);
      swal({
        title: "Eliminar Moneda",
        text: "¿Está seguro(a) de eliminar la moneda seleccionada?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((resp) => {
          if (!resp) return false;

          ApiNeva.post("Moneda/DeleteMoneda", toDelete, {
            headers: header,
          })
            .then((response) => {
              if (response.status != 200) return false;
              swal(
                "Eliminar Moneda",
                "Se ha eliminado el registro correctamente",
                "success"
              );
              getAllMonedas();
            })
            .catch((error) => {
              console.log(error);
              swal(
                "Eliminar Moneda",
                "La moneda puede estar siendo utilizada por una forma de pago, intente desactivar",
                "warning"
              );
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const onBoarding = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboarding = await onBoardingHelper.getUserSeeMenu(
          user.id,
          "mantenedorMoneda",
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
          "mantenedorMoneda",
          header
        );
      }
    };

    onMounted(() => {
      getAllMonedas();
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
      guardar,
      resetMoneda,
      getMondenaById,
      eliminarMoneda,
    };
  },
};
</script>
