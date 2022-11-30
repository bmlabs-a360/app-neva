<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
  <CRow>
    <!-- LIST -->
    <CCol :md="12">
      <CCard
        id="listado_canal"
        class="mb-4"
        data-aos="fade-up"
        data-aos-easing="ease"
      >
        <CCardHeader>
          <CRow>
            <CCol :sm="6" :md="10" :xs="6" :lg="11">
              <strong>Canales</strong>&nbsp;<small>Listado</small>
            </CCol>
            <CCol :sm="6" :md="2" :xs="6" :lg="1">
              <div class="d-grid">
                <CButton
                  id="crear_canal"
                  color="primary"
                  class="float-end"
                  @click="abirModalCrear"
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
                  >Id</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Nombre</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Accouncode</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Medio&nbsp;Pago&nbsp;<small>default</small></CTableHeaderCell
                >
                <CTableHeaderCell class="text-start" scope="col"
                  >Activo</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Acciones</CTableHeaderCell
                >
                <!-- <CTableHeaderCell class="text-center" scope="col">Formas de pago</CTableHeaderCell>
              <CTableHeaderCell class="text-center" scope="col">Resumen</CTableHeaderCell> -->
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="canal in canales" :key="canal.id">
                <CTableDataCell class="text-center">{{
                  canal.id
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  canal.nombre
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  canal.accouncode
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  canal.defaulMedioPago
                }}</CTableDataCell>
                <CTableDataCell class="text-center"
                  ><CFormSwitch
                    style="cursor: pointer"
                    disabled
                    :checked="canal.activo"
                /></CTableDataCell>
                <CTableDataCell id="acciones_canal" class="text-center">
                  <CLink
                    v-c-tooltip="{
                      content: 'Editar información del canal',
                      placement: 'left',
                    }"
                  >
                    <CButton @click="getCanalSelected(canal.id)">
                      <CIcon :icon="cilPen" size="lg" />
                    </CButton>
                  </CLink>

                  <CLink
                    v-c-tooltip="{
                      content: 'Editar formas de pago del canal',
                      placement: 'bottom',
                    }"
                  >
                    <CButton
                      @click="
                        () => {
                          visibleModalMediosPagoList = true;
                          setIdCanalFormaPagoSelected(canal.id);
                          getFormaPagoByIdCanal(canal.id);
                        }
                      "
                    >
                      <CIcon :icon="cilWallet" size="lg" />
                    </CButton>
                  </CLink>

                  <CLink
                    v-c-tooltip="{
                      content: 'Ver resumen del canal',
                      placement: 'right',
                    }"
                  >
                    <CButton @click="getResumenBycanal(canal.id)">
                      <CIcon :icon="cilBarChart" size="lg" />
                    </CButton>
                  </CLink>
                </CTableDataCell>

                <!-- <CTableDataCell class="text-center">
                  <CButton @click="() => { visibleModalMediosPagoList = true; getFormaPagoByIdCanal(canal.id); setIdCanalFormaPagoSelected(canal.id); } ">
                    <CIcon :icon="cilWallet" size="lg" />
                  </CButton>
                </CTableDataCell>
                <CTableDataCell class="text-center">
                  <CButton @click="getResumenBycanal(canal.id)">
                    <CIcon :icon="cilBarChart" size="lg" />
                  </CButton>
                </CTableDataCell> -->
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <!-- LIST -->

  <!-- RESUMEN -->
  <CCol :md="12">
    <CCard
      id="resumen_canal"
      class="mb-4"
      data-aos="fade-up"
      data-aos-easing="ease"
    >
      <CCardBody>
        <CRow>
          <CCol :sm="5">
            <h4 id="traffic" class="card-title mb-0">Resumen Transacciones</h4>
            <div class="small text-medium-emphasis">
              {{
                getCurrenDateResumen() ||
                "Seleccione una transacción para ver su resumen"
              }}
            </div>
          </CCol>
          <CCol :sm="7" class="d-none d-md-block">
            <CButtonGroup
              class="float-end me-3"
              role="group"
              aria-label="Basic outlined example"
            >
            </CButtonGroup>
          </CCol>
        </CRow>
        <CRow> </CRow>
      </CCardBody>
      <CCardFooter>
        <CRow :xs="{ cols: 1 }" :md="{ cols: 3 }" class="text-center">
          <CCol class="mb-sm-2 mb-0">
            <div class="text-medium-emphasis">Exito</div>
            <strong
              >Cant. {{ resumenCanalSelected.totalTransaccionExito || 0 }} ({{
                resumenCanalSelected.porcentajeTransaccionExito || 0
              }}%)</strong
            >
            <CProgress
              class="mt-2"
              color="success"
              thin
              :precision="1"
              :value="resumenCanalSelected.porcentajeTransaccionExito"
            />
          </CCol>
          <CCol class="mb-sm-2 mb-0 d-md-down-none">
            <div class="text-medium-emphasis">Emitido</div>
            <strong
              >Cant. {{ resumenCanalSelected.totalTransaccionEmitido || 0 }} ({{
                resumenCanalSelected.porcentajeTransaccionEmitido || 0
              }}%)</strong
            >
            <CProgress
              class="mt-2"
              color="info"
              thin
              :precision="1"
              :value="resumenCanalSelected.porcentajeTransaccionEmitido"
            />
          </CCol>
          <CCol class="mb-sm-2 mb-0">
            <div class="text-medium-emphasis">Fracaso</div>
            <strong
              >Cant. {{ resumenCanalSelected.totalTransaccionFracaso || 0 }} ({{
                resumenCanalSelected.porcentajeTransaccionesFracaso || 0
              }}%)</strong
            >
            <CProgress
              class="mt-2"
              color="warning"
              thin
              :precision="1"
              :value="resumenCanalSelected.porcentajeTransaccionesFracaso"
            />
          </CCol>
          <CCol class="mb-sm-2 mb-0">
            <div class="text-medium-emphasis">Abandono</div>
            <strong
              >Cant.
              {{ resumenCanalSelected.totalTransaccionAbandono || 0 }} ({{
                resumenCanalSelected.porcentajeTransaccionAbandono || 0
              }}%)</strong
            >
            <CProgress
              class="mt-2"
              color="danger"
              thin
              :precision="1"
              :value="resumenCanalSelected.porcentajeTransaccionAbandono"
            />
          </CCol>
          <CCol class="mb-sm-2 mb-0 d-md-down-none">
            <div class="text-medium-emphasis">Contabilizado</div>
            <strong
              >Cant.
              {{ resumenCanalSelected.totalTransaccionContabilizado || 0 }} ({{
                resumenCanalSelected.porcentajeTransaccionContabilizado || 0
              }}%)</strong
            >
            <CProgress
              class="mt-2"
              :value="resumenCanalSelected.porcentajeTransaccionContabilizado"
              thin
              :precision="1"
            />
          </CCol>
          <CCol class="mb-sm-2 mb-0 d-md-down-none">
            <div class="text-medium-emphasis">Error</div>
            <strong
              >Cant. {{ resumenCanalSelected.totalTransaccionError || 0 }} ({{
                resumenCanalSelected.porcentajeTransaccionError || 0
              }}%)</strong
            >
            <CProgress
              class="mt-2"
              color="danger"
              thin
              :precision="1"
              :value="resumenCanalSelected.porcentajeTransaccionError"
            />
          </CCol>
        </CRow>
      </CCardFooter>
    </CCard>
  </CCol>
  <!-- RESUMEN -->

  <!-- MODAL CANAL -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalCanal"
    @close="
      () => {
        resetCanal();
        visibleModalCanal = false;
      }
    "
  >
    <CModalHeader>
      <div style="display: flex">
        <CModalTitle>Canal</CModalTitle>&nbsp;&nbsp;
        <div style="padding-top: 0.3rem">
          <CLink
            v-c-tooltip="
              'Si desactivas no se recibirán transacciones relacionadas a esté canal!'
            "
          >
            <CFormSwitch
              style="cursor: pointer"
              id="activo"
              :checked="canalSelected.activo"
            />
          </CLink>
        </div>
        <CFormInput
          type="text"
          id="idcanal"
          size="sm"
          maxlength="10"
          placeholder="Identificador único del canal"
          :disabled="disabledElements.idcanal"
          :value="canalSelected.id"
        />
      </div>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="6">
            <div class="mb-3">
              <CFormLabel for="nombre">Nombre</CFormLabel>
              <CFormInput
                type="text"
                id="nombre"
                placeholder="TEST"
                maxlength="50"
                :value="canalSelected.nombre"
              />
            </div>

            <div class="mb-3">
              <CFormLabel for="webhook">Webhook</CFormLabel>
              <CFormInput
                type="text"
                id="webhook"
                placeholder="https://example.cl"
                maxlength="100"
                :value="canalSelected.webhook"
              />
            </div>

            <div class="mb-3">
              <CFormLabel for="accouncode">Accouncode</CFormLabel>
              <CFormInput
                type="text"
                id="accouncode"
                :disabled="disabledElements.accouncode"
                maxlength="100"
                :value="canalSelected.accouncode"
              />
            </div>

            <div class="mb-3">
              <CFormLabel for="apikey">Apikey</CFormLabel>
              <CFormInput
                type="text"
                id="apikey"
                :disabled="disabledElements.apikey"
                maxlength="100"
                :value="canalSelected.apikey"
              />
            </div>

            <div class="mb-3">
              <div style="display: flex">
                <CFormLabel for="urlLogo">Logo&nbsp;&nbsp;</CFormLabel
                ><CFormSwitch
                  id="usarLogo"
                  v-c-tooltip="'Determina si se usa logo del canal'"
                  :checked="canalSelected.usarLogo"
                />
              </div>
              <CFormInput
                type="text"
                id="urlLogo"
                :value="canalSelected.urlLogo"
              />
            </div>
          </CCol>

          <CCol sm="6">
            <div class="mb-3">
              <CFormLabel for="defaul_medio_pago"
                >Medio Pago Defecto</CFormLabel
              >
              <CFormSelect
                id="defaul_medio_pago"
                v-model="canalSelected.defaulMedioPago"
              >
                <option :key="0">Seleccione una forma pago</option>
                <option
                  v-for="forma in formaspagocanal"
                  :key="forma.id"
                  :value="forma.id"
                >
                  {{ forma.nombre }} - ({{ forma.acouuntcode }})
                </option>
              </CFormSelect>
            </div>

            <div class="mb-3">
              <CFormLabel for="vigencia_transaccion"
                >Vigencia Transacción (Min)</CFormLabel
              >
              <CFormInput
                type="number"
                oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
                id="vigencia_transaccion"
                :value="canalSelected.vigenciaTransaccion"
                placeholder="60 (1 hora)"
              />
            </div>

            <div class="mb-3">
              <div style="display: flex">
                <CFormLabel for="usarGeoref"
                  >Georeferencia de transacción</CFormLabel
                >&nbsp;&nbsp;<CFormSwitch
                  id="usarGeoref"
                  :checked="canalSelected.usarGeoref"
                  v-c-tooltip="
                    'Determina si el canal georeferencia la transacción'
                  "
                />
              </div>
            </div>

            <div class="mb-3">
              <CFormLabel for="link_volvertienda">Url Volver Tienda</CFormLabel>
              <CFormInput
                type="text"
                id="link_volvertienda"
                :value="canalSelected.linkVolverTienda"
              />
            </div>

            <div class="mb-3">
              <div style="display: flex">
                <CFormLabel for="webhook_contabilidad"
                  >Webhook Contabilidad</CFormLabel
                >&nbsp;&nbsp;<CFormSwitch
                  id="usarContabilizar"
                  :checked="canalSelected.usarContabilizar"
                  v-c-tooltip="
                    'Determina si el canal debe impactar en contabilidad'
                  "
                />
              </div>
              <CFormInput
                type="text"
                id="webhook_contabilidad"
                :value="canalSelected.webhookContabilidad"
                placeholder="https://example.cl"
              />
            </div>

            <div class="mb-3">
              <CFormLabel for="autentificacion_contabilidad"
                >Autenticación Contabilidad</CFormLabel
              >
              <CFormInput
                type="text"
                id="autentificacion_contabilidad"
                :value="canalSelected.autentificacionContabilidad"
                placeholder="{ 'User': 'user', 'Pass': 'pass' }"
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
            resetCanal();
            visibleModalCanal = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton color="primary" @click="guardar">Guardar</CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL CANAL -->

  <!-- MODAL MEDIOS PAGO LIST -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalMediosPagoList"
    @close="
      () => {
        visibleModalMediosPagoList = false;
        IdCanalFormaPagoSelected = null;
      }
    "
  >
    <CModalHeader>
      <div style="display: flex">
        <CModalTitle
          >Disponibilidad formas de pago - Canal:
          {{ IdCanalFormaPagoSelected }}</CModalTitle
        >&nbsp;&nbsp;
        <div style="padding-top: 0.3rem">
          <CLink
            v-c-tooltip="
              'La formas de pago desactivadas no serán visibles desde app-habupay'
            "
          >
            <CIcon :icon="cilWarning" size="lg" />
          </CLink>
        </div>
      </div>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CTable responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell class="text-center" scope="col"
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
                >Editar</CTableHeaderCell
              >
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="frm in formaspagocanal" :key="frm.id">
              <CTableDataCell class="text-center">{{ frm.id }}</CTableDataCell>
              <CTableDataCell class="text-center">{{
                frm.nombre
              }}</CTableDataCell>
              <CTableDataCell class="text-center">{{
                frm.acouuntcode
              }}</CTableDataCell>
              <CTableDataCell class="text-center"
                ><CFormSwitch
                  :name="'chk_' + frm.id"
                  style="cursor: pointer"
                  @change="
                    toogleEstadoFormaPago(
                      frm.id,
                      !frm.canalMediopagos[0].activo
                    )
                  "
                  :checked="frm.canalMediopagos[0].activo"
              /></CTableDataCell>
              <CTableDataCell class="text-center"
                ><CButton @click="getFormaPagoSelected(frm.id)"
                  ><CIcon :icon="cilPen" size="lg" /></CButton
              ></CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CContainer>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            visibleModalMediosPagoList = false;
            IdCanalFormaPagoSelected = null;
          }
        "
      >
        Cerrar
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL MEDIOS PAGO LIST -->

  <!-- MODAL MEDIOS PAGO -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalMediosPago"
    @close="
      () => {
        visibleModalMediosPago = false;
        visibleModalMediosPagoList = true;
      }
    "
  >
    <CModalHeader>
      <div style="display: flex">
        <CModalTitle>Forma de Pago</CModalTitle>&nbsp;&nbsp;
        <div style="padding-top: 0.3rem">
          <CLink v-c-tooltip="'Si desactivas no será visible en Habupay!'">
            <CFormSwitch
              disabled
              style="cursor: pointer"
              :checked="formaPagoSelected.canalMediopagos[0].activo"
            />
          </CLink>
        </div>
      </div>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="6" class="text-center">
            <CImage
              style="max-width: 15rem; padding-top: 25%"
              fluid
              rounded
              :alt="formaPagoSelected.nombre"
              :src="getImgByFormaPago(formaPagoSelected.id)"
            />
          </CCol>

          <CCol sm="6">
            <div class="mb-3">
              <CFormLabel>Id</CFormLabel>
              <CFormInput type="text" disabled :value="formaPagoSelected.id" />
            </div>

            <div class="mb-3">
              <CFormLabel>Nombre</CFormLabel>
              <CFormInput
                type="text"
                disabled
                :value="formaPagoSelected.nombre"
              />
            </div>

            <div class="mb-3">
              <CFormLabel>Account Code</CFormLabel>
              <CFormInput
                id="accountCodeFormaPago"
                maxlength="10"
                type="text"
                :value="formaPagoSelected.acouuntcode"
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
            visibleModalMediosPago = false;
            visibleModalMediosPagoList = true;
          }
        "
      >
        Volver
      </CButton>
      <CButton color="primary" @click="guardarAccountCode">Guardar</CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL MEDIOS PAGO -->
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import { cilPen, cilBarChart, cilWallet, cilWarning } from "@coreui/icons";
import swal from "sweetalert";
import ApiNeva from "@/api/ApiNeva";

import imgTransbank from "@/assets/images/webpay_logo.png";
import imgKlap from "@/assets/images/klap_logo.png";
import imgKhipu from "@/assets/images/khipu_logo.png";
import imgMach from "@/assets/images/mach_logo.png";
import imgBestado from "@/assets/images/bancoestado_logo.png";
import imgPaypal from "@/assets/images/paypal_logo.png";
import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import { mantenedorCanal } from "@/_menuOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "Canal",
  components: {
    VOnboardingWrapper,
  },
  methods: {
    renderSteps,
  },
  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);
    const localMenuOnvoarding = mantenedorCanal;

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
                offset: [0, 5],
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
      canales: [],
      formaspagocanal: [],
      canalSelected: {},
      idcanalresumen: 0,
      IdCanalFormaPagoSelected: null,
      resumenCanalSelected: {},
      formaPagoSelected: {},
      dateSelected: "",
      visibleModalCanal: false,
      visibleModalMediosPagoList: false,
      visibleModalMediosPago: false,
      disabledElements: {
        accouncode: true,
        apikey: true,
        idcanal: true,
      },
    });

    const resetCanal = () => {
      state.canalSelected = {
        id: "",
        activo: false,
        nombre: "",
        webhook: "",
        accouncode: "",
        apikey: "",
        usarLogo: false,
        usarGeoref: false,
        urlLogo: "",
        defaulMedioPago: "",
        vigenciaTransaccion: 0,
        linkVolverTienda: "",
        usarContabilizar: false,
        webhookContabilidad: "",
        autentificacionContabilidad: "",
      };
    };

    const getAllCanal = () => {
      ApiNeva.get("Canal/Canales", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.canales = response.data;
        })
        .catch((error) => console.log(error));
    };

    const getCanalSelected = (idCanales) => {
      state.canalSelected = state.canales.find((c) => c.id == idCanales);
      getFormaPagoByIdCanal(idCanales);
      state.disabledElements.accouncode = true;
      state.disabledElements.apikey = true;
      state.disabledElements.idcanal = true;
      state.visibleModalCanal = true;
    };

    const abirModalCrear = () => {
      resetCanal();
      state.disabledElements.accouncode = false;
      state.disabledElements.apikey = false;
      state.disabledElements.idcanal = false;
      state.visibleModalCanal = true;
    };

    const getResumenBycanal = (idCanales) => {
      let date = new Date();
      let primerDia = new Date(date.getFullYear(), 0, 1).toLocaleDateString(
        "en-ZA"
      );
      let ultimoDia = new Date(
        date.getFullYear() + 1,
        11,
        31
      ).toLocaleDateString("en-ZA");

      state.dateSelected =
        "Resumen entre año: " + primerDia + " y " + ultimoDia;
      state.idcanalresumen = idCanales;
      ApiNeva.get(
        "Canal/ResumenById?id=" +
          idCanales +
          "&inicio=" +
          primerDia +
          "&fin=" +
          ultimoDia,
        { headers: header }
      )
        .then((response) => {
          if (response.status != 200) return false;
          state.resumenCanalSelected = response.data;
        })
        .catch((error) => console.log(error));
    };

    const getCurrenDateResumen = () => {
      return state.dateSelected;
    };

    const getFormaPagoByIdCanal = (idcanal) => {
      if (!idcanal) return false;
      state.formaspagocanal = [];
      ApiNeva.get("MedioPago/MediosPagoByIdCanal?idcanal=" + idcanal, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.formaspagocanal = [];
          state.formaspagocanal = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getFormaPagoSelected = (idformapago) => {
      state.formaPagoSelected = state.formaspagocanal.find(
        (f) => f.id == idformapago
      );
      state.visibleModalMediosPago = true;
      state.visibleModalMediosPagoList = false;
    };

    const toogleEstadoFormaPago = (idformapago, estado) => {
      if (!idformapago) {
        document.getElementsByName("chk_" + idformapago)[0].checked = !estado;
        return;
      }

      let titulo = !estado
        ? "Desactivar forma de pago"
        : "Activar forma de pago";

      swal({
        title: titulo,
        text: "¿Está seguro de cambiar el estado de la forma de pago?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((resp) => {
        if (!resp) {
          document.getElementsByName("chk_" + idformapago)[0].checked = !estado;
          return;
        }

        ApiNeva.post(
          "MedioPago/ToggleEstado?id=" +
            idformapago +
            "&idcanal=" +
            state.IdCanalFormaPagoSelected,
          null,
          { headers: header }
        )
          .then((response) => {
            if (response.status == 200) {
              swal(titulo, "Se ha cambiado el estado correctamente", "success");
              return;
            }
            swal(
              titulo,
              "Ha ocurrido un problema en el proceso, intente nuevamente",
              "warning"
            );
            document.getElementsByName("chk_" + idformapago)[0].checked =
              !estado;
          })
          .catch((error) => {
            document.getElementsByName("chk_" + idformapago)[0].checked =
              !estado;
            if (
              error.response.data.includes(
                "medio de pago establecido por defecto"
              )
            ) {
              swal(
                titulo,
                "No puede desactivar el medio de pago establecido por defecto",
                "warning"
              );
            }
          });
      });
    };

    const setIdCanalFormaPagoSelected = (idcanal) => {
      state.IdCanalFormaPagoSelected = idcanal;
    };

    const getImgByFormaPago = (formapago) => {
      switch (formapago) {
        case "PAYPAL":
          return imgPaypal;
        case "KLAP":
          return imgKlap;
        case "KHIPU":
          return imgKhipu;
        case "MACH":
          return imgMach;
        case "TRANSBANK":
          return imgTransbank;
        case "BESTADO":
          return imgBestado;
      }
    };

    const guardar = () => {
      let idcanal = document.getElementById("idcanal").value;
      let nombre = document.getElementById("nombre").value;
      let activo = document.getElementById("activo").checked;
      let webhook = document.getElementById("webhook").value;
      let accouncode = document.getElementById("accouncode").value;
      let apikey = document.getElementById("apikey").value;
      let usarLogo = document.getElementById("usarLogo").checked;
      let urlLogo = document.getElementById("urlLogo").value;
      let defaul_medio_pago =
        document.getElementById("defaul_medio_pago").options[
          document.getElementById("defaul_medio_pago").selectedIndex
        ].value;
      let vigencia_transaccion = document.getElementById(
        "vigencia_transaccion"
      ).value;
      let link_volvertienda =
        document.getElementById("link_volvertienda").value;
      let webhook_contabilidad = document.getElementById(
        "webhook_contabilidad"
      ).value;
      let usarContabilizar =
        document.getElementById("usarContabilizar").checked;
      let autentificacion_contabilidad = document.getElementById(
        "autentificacion_contabilidad"
      ).value;
      let usarGeoref = document.getElementById("usarGeoref").checked;

      let reg = new RegExp(/^\S*$/);
      if (!idcanal || !reg.test(idcanal)) {
        swal(
          "Valor incorrecto",
          "Debe ingresar identificador para el canal y sin espacios.",
          "warning"
        );
        return false;
      }

      if (!nombre) {
        swal("Valor incorrecto", "Debe ingresar nombre.", "warning");
        return false;
      }

      if (!accouncode) {
        swal("Valor incorrecto", "Debe ingresar accouncode.", "warning");
        return false;
      }

      if (!apikey) {
        swal("Valor incorrecto", "Debe ingresar apikey.", "warning");
        return false;
      }

      if (
        !defaul_medio_pago ||
        document.getElementById("defaul_medio_pago").selectedIndex == 0
      ) {
        swal(
          "Valor incorrecto",
          "Debe ingresar medio pago por defecto.",
          "warning"
        );
        return false;
      }

      if (vigencia_transaccion < 0) {
        swal(
          "Valor incorrecto",
          "Debe ingresar vigencia de transacción mayor a 0.",
          "warning"
        );
        return false;
      }

      if (usarLogo && !urlLogo) {
        swal(
          "Valor incorrecto",
          "Si activa el uso de logo, debe ingresar la url de la imagen.",
          "warning"
        );
        return false;
      }

      if (
        usarContabilizar &&
        (!webhook_contabilidad || !autentificacion_contabilidad)
      ) {
        swal(
          "Valor incorrecto",
          "Si activa el uso de contabilidad, debe ingresar el webwook de contabilidad y autentificación.",
          "warning"
        );
        return false;
      }

      var canal = {
        id: state.canalSelected.id || idcanal,
        nombre: nombre,
        webhook: webhook,
        accouncode: accouncode,
        apikey: apikey,
        activo: activo,
        defaulMedioPago: defaul_medio_pago,
        vigenciaTransaccion:
          vigencia_transaccion == 0 ? null : vigencia_transaccion,
        linkVolverTienda: link_volvertienda,
        usarLogo: usarLogo,
        urlLogo: urlLogo,
        usarGeoref: usarGeoref,
        webhookContabilidad: webhook_contabilidad,
        autentificacionContabilidad: autentificacion_contabilidad,
        usarContabilizar: usarContabilizar,
      };

      ApiNeva.post("Canal/InsertOrUpdate", canal, { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          swal(
            "Guardar Canal",
            "Se ha guardado correctamente.",
            "success"
          ).then(() => {
            state.visibleModalCanal = false;
            getAllCanal();
          });
        })
        .catch(() => {
          swal(
            "Guardar Canal",
            "Ha ocurrido un problema, por favor intente nuevamente.",
            "warning"
          );
        });
    };

    const guardarAccountCode = () => {
      let accountCode = document.getElementById("accountCodeFormaPago").value;
      let formpago = state.formaPagoSelected.id;

      if (!accountCode) {
        swal(
          "Valor incorrecto",
          "Debe ingresar account code para la forma de pago.",
          "warning"
        );
        return false;
      }

      if (!formpago) {
        swal(
          "Valor incorrecto",
          "Debe seleccionar una forma de pago.",
          "warning"
        );
        return false;
      }

      ApiNeva.post(
        "MedioPago/UpdateAcouuntcodeMedioPago?id=" +
          formpago +
          "&accountCode=" +
          accountCode,
        null,
        { headers: header }
      )
        .then((response) => {
          if (response.status != 200) return false;
          swal(
            "Guardar Account code",
            "Se ha guardado correctamente",
            "success"
          ).then(() => {
            state.visibleModalMediosPago = false;
            state.visibleModalMediosPagoList = true;
            getFormaPagoByIdCanal(state.IdCanalFormaPagoSelected);
          });
        })
        .catch(() => {
          swal(
            "Guardar Account code",
            "Ha ocurrido un problema, por favor intente nuevamente",
            "warning"
          ).then(() => {
            state.visibleModalMediosPago = false;
            state.visibleModalMediosPagoList = true;
          });
        });
    };
    //#endregion Funciones Locales

    const onBoarding = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboarding = await onBoardingHelper.getUserSeeMenu(
          user.id,
          "mantenedorCanal",
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
          "mantenedorCanal",
          header
        );
      }
    };

    onMounted(() => {
      getAllCanal();
      getFormaPagoByIdCanal("TEST");
      onBoarding();
      if (!state.isonboarding) {
        setTimeout(() => {
          start();
        }, 500);
      }
    });

    return {
      cilPen,
      cilBarChart,
      cilWallet,
      cilWarning,
      guardar,
      ...toRefs(state),
      getCanalSelected,
      getResumenBycanal,
      getCurrenDateResumen,
      getFormaPagoByIdCanal,
      setIdCanalFormaPagoSelected,
      getFormaPagoSelected,
      toogleEstadoFormaPago,
      resetCanal,
      abirModalCrear,
      getImgByFormaPago,
      guardarAccountCode,
    };
  },
};
</script>
