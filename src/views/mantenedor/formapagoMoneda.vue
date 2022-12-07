<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
  <!-- LIST -->
  <CRow>
    <CCol :md="12">
      <CCard class="mb-4" data-aos="fade-up" data-aos-easing="ease">
        <CCardHeader>
          <strong>Formas de Pago - Moneda</strong>&nbsp;<small>Listado</small>
        </CCardHeader>
        <CCardBody>
          <CTable responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell class="text-center" scope="col"
                  >&nbsp;</CTableHeaderCell
                >
                <CTableHeaderCell class="text-start" scope="col"
                  >Id</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Nombre</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Accouncode</CTableHeaderCell
                >
                <CTableHeaderCell class="text-start" scope="col"
                  >Activo</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Monedas</CTableHeaderCell
                >
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="frm in formaspago" :key="frm.id">
                <CTableDataCell class="text-center">&nbsp;</CTableDataCell>
                <CTableDataCell class="text-start">{{ frm.id }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  frm.nombre
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  frm.acouuntcode
                }}</CTableDataCell>
                <CTableDataCell class="text-center">
                  <CFormSwitch
                    style="cursor: pointer"
                    :disabled="true"
                    :checked="frm.canalMediopagos[0].activo"
                  />
                </CTableDataCell>
                <CTableDataCell id="acciones_formapago" class="text-center">
                  <CButton @click="AbrirModalFormasPagoMonedas(frm.id)">
                    <CIcon :icon="cilPen" size="lg" />
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

  <!-- MODAL MONEDAS FORMA PAGO -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalFormaPagoMoneda"
    @close="
      () => {
        visibleModalFormaPagoMoneda = false;
      }
    "
  >
    <CModalHeader>
      <CModalTitle
        >Monedas de la forma de pago {{ formaPagoSelected.nombre }}</CModalTitle
      >
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="12">
            <CRow>
              <CCol :md="12">
                <CCard>
                  <CCardBody>
                    <CTable responsive>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell class="text-center" scope="col"
                            >&nbsp;</CTableHeaderCell
                          >
                          <CTableHeaderCell class="text-start" scope="col"
                            >Nombre</CTableHeaderCell
                          >
                          <CTableHeaderCell class="text-center" scope="col"
                            >Abreviatura</CTableHeaderCell
                          >
                          <CTableHeaderCell class="text-center" scope="col"
                            >Signo</CTableHeaderCell
                          >
                          <!-- <CTableHeaderCell class="text-center" scope="col">Locale</CTableHeaderCell> -->
                          <CTableHeaderCell class="text-start" scope="col"
                            >Activo</CTableHeaderCell
                          >
                          <CTableHeaderCell class="text-center" scope="col"
                            >Quitar</CTableHeaderCell
                          >
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow
                          v-if="monedasformaspago.length <= 0"
                          color="warning"
                        >
                          <CTableDataCell colspan="6" class="text-center"
                            ><strong id="textEmpty"
                              >No existen monedas para la forma de pago.</strong
                            ></CTableDataCell
                          >
                        </CTableRow>
                        <CTableRow
                          v-for="mon in monedasformaspago"
                          :key="mon.id"
                        >
                          <CTableDataCell class="text-center"
                            >&nbsp;</CTableDataCell
                          >
                          <CTableDataCell class="text-start">{{
                            mon.nombre
                          }}</CTableDataCell>
                          <CTableDataCell class="text-center">{{
                            mon.acronimo
                          }}</CTableDataCell>
                          <CTableDataCell class="text-center">{{
                            mon.signo
                          }}</CTableDataCell>
                          <CTableDataCell class="text-center">
                            <CFormSwitch
                              style="cursor: pointer"
                              disabled
                              :checked="mon.activo"
                            />
                          </CTableDataCell>
                          <CTableDataCell class="text-center">
                            <CButton @click="quitarMoneda(mon.id)">
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
          </CCol>

          <CCol sm="12" class="pt-3">
            <div class="mb-3">
              <CFormLabel for="monedasdisponibles"
                >Monedas disponibles</CFormLabel
              >
              <CFormSelect id="monedasdisponibles">
                <option :value="0" :key="0">Seleccione una moneda</option>
                <option
                  v-for="mon in withoutmonedasformaspago"
                  :key="mon.id"
                  :value="mon.id"
                >
                  {{ mon.nombre }} - ({{ mon.acronimo }})
                </option>
              </CFormSelect>
            </div>

            <div class="mb-3">
              <CButton color="primary" @click="agregarMoneda"
                >Agregar Moneda</CButton
              >
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
            visibleModalFormaPagoMoneda = false;
          }
        "
      >
        Cerrar
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL MONEDAS FORMA PAGO -->
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import swal from "sweetalert2";
import { cilPen, cilX } from "@coreui/icons";
import ApiNeva from "@/api/ApiNeva";
import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import { mantenedorFormapago } from "@/_menuOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "FormapagoMoneda",
  components: {
    VOnboardingWrapper,
  },
  methods: {
    renderSteps,
  },
  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);
    const localMenuOnvoarding = mantenedorFormapago;

    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;

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
      formaspago: [],
      monedasformaspago: [],
      withoutmonedasformaspago: [],
      formaPagoSelected: null,
      visibleModalFormaPagoMoneda: false,
    });

    const getFormasPago = () => {
      ApiNeva.get("MedioPago/MediosPago", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.formaspago = [];
          state.formaspago = response.data;
        })
        .catch((error) => console.log(error));
    };

    const GetMonedasByMediopago = (idmediopago) => {
      ApiNeva.get(
        "Moneda/GetMonedasByMediopago?idmediopago=" + idmediopago,
        { headers: header }
      )
        .then((response) => {
          if (response.status != 200) return false;
          state.monedasformaspago = [];
          state.monedasformaspago = response.data;
        })
        .catch((error) => console.log(error));
    };

    const GetMonedasWithoutMediopago = (idmediopago) => {
      ApiNeva.get(
        "Moneda/GetMonedasWithoutMediopago?idmediopago=" + idmediopago,
        { headers: header }
      )
        .then((response) => {
          if (response.status != 200) return false;
          state.withoutmonedasformaspago = [];
          state.withoutmonedasformaspago = response.data;
        })
        .catch((error) => console.log(error));
    };

    const AbrirModalFormasPagoMonedas = (id) => {
      state.formaPagoSelected = state.formaspago.find((x) => x.id == id);
      if (!state.formaPagoSelected) return false;
      GetMonedasByMediopago(state.formaPagoSelected.id);
      GetMonedasWithoutMediopago(state.formaPagoSelected.id);
      state.visibleModalFormaPagoMoneda = true;
    };

    const agregarMoneda = () => {
      let idmoneda =
        document.getElementById("monedasdisponibles").options[
          document.getElementById("monedasdisponibles").selectedIndex
        ].value;

      if (idmoneda == 0 || !idmoneda) {
        swal(
          "Agregar Moneda",
          "Debe seleccionar una moneda para agregar a la forma de pago",
          "warning"
        );
        return false;
      }

      ApiNeva.post(
        "Moneda/AgregarMonedaMediopago?idmoneda=" +
          idmoneda +
          "&idmediopago=" +
          state.formaPagoSelected.id,
        null,
        { headers: header }
      )
        .then((response) => {
          if (response.status != 200) {
            swal(
              "Agregar Moneda",
              "Ha ocurrido un problema agregando la moneda, intente nuevamente",
              "warning"
            );
            return false;
          }
          GetMonedasByMediopago(state.formaPagoSelected.id);
          GetMonedasWithoutMediopago(state.formaPagoSelected.id);
          swal(
            "Agregar Moneda",
            "Se ha agregado la moneda correctamente a la forma de pago",
            "success"
          );
        })
        .catch(() => {
          swal(
            "Agregar Moneda",
            "Ha ocurrido un problema agregando la moneda, intente nuevamente",
            "warning"
          );
          return false;
        });
    };

    const quitarMoneda = (idmoneda) => {
      if (idmoneda == 0 || !idmoneda) {
        swal(
          "Quitar Moneda",
          "Debe seleccionar una moneda para quitar a la forma de pago",
          "warning"
        );
        return false;
      }

      swal({
        title: "Eliminar Moneda",
        text: "¿Está seguro(a) de eliminar la moneda seleccionada?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((resp) => {
          if (!resp) return false;
          ApiNeva.post(
            "Moneda/QuitarMonedaMediopago?idmoneda=" +
              idmoneda +
              "&idmediopago=" +
              state.formaPagoSelected.id,
            null,
            { headers: header }
          )
            .then((response) => {
              if (response.status != 200) {
                swal(
                  "Agregar Moneda",
                  "Ha ocurrido un problema quitando la moneda, intente nuevamente",
                  "warning"
                );
                return false;
              }
              GetMonedasByMediopago(state.formaPagoSelected.id);
              GetMonedasWithoutMediopago(state.formaPagoSelected.id);
              swal(
                "Agregar Moneda",
                "Se ha quitado la moneda correctamente a la forma de pago",
                "success"
              );
            })
            .catch(() => {
              swal(
                "Agregar Moneda",
                "Ha ocurrido un problema quitando la moneda, intente nuevamente",
                "warning"
              );
              return false;
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
          "mantenedorFormapago",
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
          "mantenedorFormapago",
          header
        );
      }
    };

    onMounted(() => {
      getFormasPago();
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
      AbrirModalFormasPagoMonedas,
      agregarMoneda,
      quitarMoneda,
    };
  },
};
</script>
