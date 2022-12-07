<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
  <!-- FILTRO -->
  <CRow>
    <CCol :md="12">
      <CCard
        id="filtro_conciliacion"
        class="mb-4"
        data-aos="fade-up"
        data-aos-easing="ease"
      >
        <CCardHeader>
          <CRow>
            <CCol :sm="8">
              <strong>Filtros</strong>&nbsp;<small>Conciliación</small>
            </CCol>
            <CCol :sm="2">
              <CButton
                id="limpiar_conciliacion"
                color="dark"
                class="float-end"
                @click="limpiarFiltros"
              >
                <CIcon :icon="cilSearch" /> Limpiar
              </CButton>
            </CCol>
            <CCol :sm="2">
              <CButton
                id="buscar_conciliacion"
                color="primary"
                class="float-end"
                @click="getConciliacionesByFilter(true)"
              >
                <CIcon :icon="cilSearch" /> Buscar
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CContainer>
            <CRow>
              <CCol sm="12" md="3" lg="3">
                <CFormLabel for="stampInicial">Stamp inicial</CFormLabel>
                <CFormInput
                  size="sm"
                  type="date"
                  @keypress="buscarEnter"
                  id="stampInicial"
                />
              </CCol>
              <CCol sm="12" md="3" lg="3">
                <CFormLabel for="stampFinal">Stamp final</CFormLabel>
                <CFormInput
                  size="sm"
                  type="date"
                  @keypress="buscarEnter"
                  id="stampFinal"
                />
              </CCol>
              <CCol sm="12" md="3" lg="3">
                <CFormLabel for="fechaVentaInicial"
                  >Fecha inicial venta</CFormLabel
                >
                <CFormInput
                  size="sm"
                  type="date"
                  @keypress="buscarEnter"
                  id="fechaVentaInicial"
                />
              </CCol>
              <CCol sm="12" md="3" lg="3">
                <CFormLabel for="fechaVentaFinal">Fecha final venta</CFormLabel>
                <CFormInput
                  size="sm"
                  type="date"
                  @keypress="buscarEnter"
                  id="fechaVentaFinal"
                />
              </CCol>
            </CRow>

            <CRow class="pt-2">
              <CCol sm="12" md="3" lg="3">
                <CFormLabel for="identificador">Identificador</CFormLabel>
                <CFormInput
                  size="sm"
                  type="text"
                  placeholder="Identificador de conciliación"
                  maxlength="150"
                  @keypress="buscarEnter"
                  id="identificador"
                />
              </CCol>

              <CCol sm="12" md="3" lg="3">
                <CFormLabel for="tipoMovimiento">Tipo movimiento</CFormLabel>
                <CFormInput
                  size="sm"
                  type="text"
                  placeholder="Tipo de movimiento"
                  maxlength="10"
                  @keypress="buscarEnter"
                  id="tipoMovimiento"
                />
              </CCol>

              <CCol sm="12" md="3" lg="3">
                <CFormLabel for="tipoTarjeta">Tipo tarjeta</CFormLabel>
                <CFormInput
                  size="sm"
                  type="text"
                  placeholder="Tipo de tarjeta"
                  maxlength="10"
                  @keypress="buscarEnter"
                  id="tipoTarjeta"
                />
              </CCol>

              <CCol sm="12" md="3" lg="3">
                <CFormLabel for="authCode">Authcode</CFormLabel>
                <CFormInput
                  size="sm"
                  type="text"
                  placeholder="Código de autorización"
                  maxlength="200"
                  @keypress="buscarEnter"
                  id="authCode"
                />
              </CCol>
            </CRow>

            <CRow class="pt-2">
              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="montoCuota">Monto cuotas</CFormLabel>
                <CFormInput
                  size="sm"
                  type="number"
                  placeholder="Monto de cuota"
                  oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
                  maxlength="50"
                  @keypress="buscarEnter"
                  id="montoCuota"
                />
              </CCol>

              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="cuotas">Cuotas</CFormLabel>
                <CFormInput
                  size="sm"
                  type="number"
                  placeholder="Número de cuota"
                  oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
                  maxlength="10"
                  @keypress="buscarEnter"
                  id="cuotas"
                />
              </CCol>

              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="medioPagoId">Medios pago</CFormLabel>
                <CFormSelect id="medioPagoId" size="sm">
                  <option :key="0">Seleccione una forma pago</option>
                  <option
                    v-for="forma in formasPago"
                    :value="forma.id"
                    :key="forma.id"
                  >
                    {{ forma.nombre }} - ({{ forma.acouuntcode }})
                  </option>
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow class="pt-2">
              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="montoAfecto">Monto afecto</CFormLabel>
                <CFormInput
                  size="sm"
                  type="number"
                  placeholder="Monto afecto"
                  oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
                  maxlength="50"
                  @keypress="buscarEnter"
                  id="montoAfecto"
                />
              </CCol>

              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="token">Token</CFormLabel>
                <CFormInput
                  size="sm"
                  type="text"
                  placeholder="Token de la transacción"
                  maxlength="32"
                  @keypress="buscarEnter"
                  id="token"
                />
              </CCol>

              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="conciliacionEstado">Estado</CFormLabel>
                <CFormSelect id="conciliacionEstado" size="sm">
                  <option :key="0">Seleccione una estado</option>
                  <option
                    v-for="est in estadosConciliacion"
                    :value="est.value"
                    :key="est.value"
                  >
                    {{ est.text }}
                  </option>
                </CFormSelect>
              </CCol>
            </CRow>
          </CContainer>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <!-- FILTRO -->

  <!-- LISTADO CONCILIACION -->
  <CRow>
    <CCol :md="12">
      <CCard
        id="listado_conciliacion"
        class="mb-4"
        data-aos="fade-up"
        data-aos-easing="ease"
      >
        <CCardHeader>
          <CRow>
            <CCol :sm="7">
              <strong>Listado de Conciliaciones</strong>&nbsp;<br />
            </CCol>
            <CCol :sm="5" class="d-none d-md-block">
              <CButton
                id="descargar_conciliaciones"
                color="primary"
                class="float-end"
                @click="
                  () => {
                    visibleModalExportacion = true;
                  }
                "
              >
                <CIcon icon="cil-cloud-download" />
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable responsive striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell class="text-center" scope="col"
                  >Identificador</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Medio&nbsp;Pago</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Tipo Movimiento</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col">
                  Monto Afecto&nbsp;<orderbyicon
                    v-if="conciliaciones"
                    :id="orderByConciliacion.MontoAfecto.id"
                    :defaultDirection="
                      orderByConciliacion.MontoAfecto.direction
                    "
                    :onClickOrderBy="OrderByConciliacion"
                  ></orderbyicon>
                </CTableHeaderCell>
                <CTableHeaderCell class="text-center" scope="col"
                  >Estado</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col">
                  Fecha&nbsp;Venta&nbsp;<orderbyicon
                    v-if="conciliaciones"
                    :id="orderByConciliacion.FechaVenta.id"
                    :defaultDirection="orderByConciliacion.FechaVenta.direction"
                    :onClickOrderBy="OrderByConciliacion"
                  ></orderbyicon>
                </CTableHeaderCell>
                <CTableHeaderCell class="text-center" scope="col"
                  >Acciones</CTableHeaderCell
                >
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-if="!conciliaciones" color="warning">
                <CTableDataCell colspan="9" class="text-center"
                  ><strong id="textEmpty"
                    >Utilice los filtos para buscar conciliaciones</strong
                  ></CTableDataCell
                >
              </CTableRow>

              <CTableRow
                v-for="cons in conciliaciones"
                :key="cons.identificador"
              >
                <CTableDataCell class="text-center">{{
                  cons.identificador
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  cons.mediopagoId
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  cons.tipoMovimiento
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  formatterMoney.format(cons.montoAfecto)
                }}</CTableDataCell>
                <CTableDataCell class="text-center">
                  <CBadge :color="getStyleConciliacionSegunEstado(cons.estado)">
                    {{ getNameEstadoConciliacion(cons.estado) }}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell class="text-center">{{
                  new Date(cons.fechaVenta).toLocaleString()
                }}</CTableDataCell>
                <CTableDataCell class="text-center">
                  <CButton>
                    <CIcon
                      :icon="cilZoomIn"
                      @click="
                        () => {
                          getConciliacionSelected(cons.identificador);
                        }
                      "
                      title="Ver detalles de la cociliación"
                      size="lg"
                    />
                  </CButton>
                  <CButton>
                    <CIcon
                      :icon="cilBalanceScale"
                      @click="
                        () => {
                          conciliacionManual(cons);
                        }
                      "
                      title="Conciliación manual"
                      size="lg"
                    />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
        <CCardFooter v-if="conciliaciones">
          <paginate
            v-model="initialPage"
            :page-count="totalconciliacion"
            :page-range="3"
            :margin-pages="2"
            :click-handler="selectedPagination"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'"
          >
          </paginate>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
  <!-- LISTADO CONCILIACION -->

  <!-- MODAL-EXPORTAR -->
  <CRow>
    <CModal
      size="lg"
      alignment="center"
      :visible="visibleModalExportacion"
      @close="
        () => {
          visibleModalExportacion = false;
        }
      "
    >
      <CModalHeader>
        <CModalTitle>Tipo de exportación</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CContainer>
          <CRow>
            <div class="d-grid gap-2 col-6 mx-auto">
              <CButton
                color="primary"
                variant="outline"
                shape="rounded-pill"
                @click="exportExcel('xlsx')"
                >Hoja de cálculo excel (xlsx)</CButton
              >
              <CButton
                color="primary"
                variant="outline"
                shape="rounded-pill"
                @click="exportExcel('csv')"
                >Valores separados por comas (csv)</CButton
              >
              <CButton
                color="primary"
                variant="outline"
                shape="rounded-pill"
                @click="exportExcel('txt')"
                >Texto plano (txt)</CButton
              >
            </div>
          </CRow>
        </CContainer>
      </CModalBody>
    </CModal>
  </CRow>
  <!-- MODAL-EXPORTAR -->

  <!-- MODAL CONCILIACION MANUAL -->
  <CRow>
    <CModal
      backdrop="static"
      size="xl"
      alignment="center"
      :visible="visibleModalConciliacionManual"
      @close="
        () => {
          visibleModalConciliacionManual = false;
        }
      "
    >
      <CModalHeader>
        <CModalTitle>Conciliación Manual</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CContainer>
          <CRow>
            <CCol :md="12">
              <CCard class="mb-4">
                <CCardHeader>
                  <strong>Conciliación seleccionada</strong><br />
                  <small
                    >Seleccione las columnas para filtrar las
                    transacciones</small
                  >
                </CCardHeader>
                <CCardBody>
                  <CTable responsive striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell class="text-center" scope="col">
                          Identificador
                        </CTableHeaderCell>
                        <CTableHeaderCell class="text-center" scope="col">
                          <CFormSwitch
                            id="chkMedioPago"
                            label="Medio Pago"
                            @click="getFilterConciliacion"
                            inline
                          />
                        </CTableHeaderCell>
                        <CTableHeaderCell class="text-center" scope="col">
                          Tipo Movimiento
                        </CTableHeaderCell>
                        <CTableHeaderCell class="text-center" scope="col">
                          <CFormSwitch
                            id="chkMontoAfecto"
                            disabled
                            @click="getFilterConciliacion"
                            label="Monto Afecto"
                            inline
                            checked
                          />
                        </CTableHeaderCell>
                        <CTableHeaderCell class="text-center" scope="col">
                          Estado
                        </CTableHeaderCell>
                        <CTableHeaderCell class="text-center" scope="col">
                          <CFormSwitch
                            id="chkFechaVenta"
                            @click="getFilterConciliacion"
                            label="Fecha Venta"
                            inline
                          />
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell class="text-center">{{
                          conciliacionSelectedManual.identificador
                        }}</CTableDataCell>
                        <CTableDataCell class="text-center">{{
                          conciliacionSelectedManual.mediopagoId
                        }}</CTableDataCell>
                        <CTableDataCell class="text-center">{{
                          conciliacionSelectedManual.tipoMovimiento
                        }}</CTableDataCell>
                        <CTableDataCell class="text-center">{{
                          formatterMoney.format(
                            conciliacionSelectedManual.montoAfecto
                          )
                        }}</CTableDataCell>
                        <CTableDataCell class="text-center">
                          <CBadge
                            :color="
                              getStyleConciliacionSegunEstado(
                                conciliacionSelectedManual.estado
                              )
                            "
                          >
                            {{
                              getNameEstadoConciliacion(
                                conciliacionSelectedManual.estado
                              )
                            }}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell class="text-center">{{
                          new Date(
                            conciliacionSelectedManual.fechaVenta
                          ).toLocaleString()
                        }}</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow>
            <CCol :md="12">
              <CCard class="mb-4">
                <CCardHeader>
                  <strong>Listado de transacciones</strong>
                </CCardHeader>
                <CCardBody>
                  <div style="max-height: 400px; overflow: auto">
                    <CTable responsive striped>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell class="text-center" scope="col"
                            >OC</CTableHeaderCell
                          >
                          <CTableHeaderCell class="text-center" scope="col"
                            >Canal</CTableHeaderCell
                          >
                          <CTableHeaderCell class="text-center" scope="col"
                            >Estado</CTableHeaderCell
                          >
                          <CTableHeaderCell class="text-center" scope="col"
                            >Total</CTableHeaderCell
                          >
                          <CTableHeaderCell class="text-center" scope="col"
                            >Fecha Creación</CTableHeaderCell
                          >
                          <CTableHeaderCell class="text-center" scope="col"
                            >Nombre&nbsp;cliente</CTableHeaderCell
                          >
                          <CTableHeaderCell class="text-center" scope="col"
                            >Conciliar</CTableHeaderCell
                          >
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow v-if="!trxConciliacion" color="warning">
                          <CTableDataCell colspan="9" class="text-center"
                            ><strong id="textEmpty"
                              >No existen transacciones para la linea de
                              conciliación seleccionada.</strong
                            ></CTableDataCell
                          >
                        </CTableRow>
                        <CTableRow v-for="trx in trxConciliacion" :key="trx.id">
                          <CTableDataCell class="text-center">{{
                            trx.id
                          }}</CTableDataCell>
                          <CTableDataCell class="text-center">{{
                            trx.canalId
                          }}</CTableDataCell>
                          <CTableDataCell class="text-center">
                            <CBadge
                              :color="getStyleSegunEstado(trx.estadoId)"
                              >{{
                                trx.estadoId == "CONTAB"
                                  ? "CONTABILIZADO"
                                  : trx.estadoId
                              }}</CBadge
                            >
                          </CTableDataCell>
                          <CTableDataCell class="text-center">{{
                            formatterMoney.format(trx.total)
                          }}</CTableDataCell>
                          <CTableDataCell class="text-center">{{
                            new Date(trx.fechaCreacion).toLocaleString()
                          }}</CTableDataCell>
                          <CTableDataCell class="text-center">{{
                            trx.clienteNombre
                          }}</CTableDataCell>
                          <CTableDataCell class="text-center">
                            <CButton>
                              <CIcon
                                :icon="cilCash"
                                @click="conciliarTrx(trx.id)"
                                title="Conciliar Transacción"
                                size="lg"
                              />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </CModalBody>
    </CModal>
  </CRow>
  <!-- MODAL CONCILIACION MANUAL -->

  <!-- MODAL CONCILIACION  -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalConciliacion"
    @close="
      () => {
        resetConciliacion();
        visibleModalConciliacion = false;
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Conciliación</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="6">
            <div class="mb-3">
              <CFormLabel>Identificador</CFormLabel>
              <CFormInput
                type="text"
                disabled
                v-model="conciliacionSelected.identificador"
              />
            </div>

            <div class="mb-3">
              <CFormLabel>Medio Pago</CFormLabel>
              <CFormInput
                type="text"
                disabled
                v-model="conciliacionSelected.mediopagoId"
              />
            </div>

            <div class="mb-3">
              <CFormLabel>Tipo Movimiento</CFormLabel>
              <CFormInput
                type="text"
                v-model="conciliacionSelected.tipoMovimiento"
              />
            </div>

            <div class="mb-3">
              <CFormLabel>Tipo Tarjeta</CFormLabel>
              <CFormInput
                type="text"
                disabled
                v-model="conciliacionSelected.tipoTarjeta"
              />
            </div>

            <div class="mb-3">
              <CFormLabel>Código Autorización</CFormLabel>
              <CFormInput
                type="text"
                disabled
                v-model="conciliacionSelected.authcode"
              />
            </div>
          </CCol>

          <CCol sm="6">
            <div class="mb-3">
              <CFormLabel>Monto Afecto</CFormLabel>
              <CFormInput
                type="text"
                disabled
                v-model="conciliacionSelected.montoAfecto"
                :value="formatterMoney.format(conciliacionSelected.montoAfecto)"
              />
            </div>

            <div class="mb-3">
              <CFormLabel>Monto Exento</CFormLabel>
              <CFormInput
                type="text"
                disabled
                v-model="conciliacionSelected.montoExento"
                :value="formatterMoney.format(conciliacionSelected.montoExento)"
              />
            </div>

            <div class="mb-3">
              <CFormLabel>Diferencia</CFormLabel>
              <CFormInput
                type="text"
                disabled
                v-model="conciliacionSelected.diferencia"
                :value="formatterMoney.format(conciliacionSelected.diferencia)"
              />
            </div>

            <div class="mb-3">
              <CFormLabel>Monto Cuota</CFormLabel>
              <CFormInput
                type="text"
                disabled
                v-model="conciliacionSelected.montoCuota"
                :value="formatterMoney.format(conciliacionSelected.montoCuota)"
              />
            </div>

            <div class="mb-3">
              <CFormLabel>Cuotas</CFormLabel>
              <CFormInput
                type="number"
                disabled
                v-model="conciliacionSelected.cuotas"
              />
            </div>
          </CCol>
        </CRow>

        <CRow>
          <CCol sm="6">
            <div class="mb-3">
              <CFormLabel>Estado</CFormLabel>
              <CFormSelect size="sm" v-model="conciliacionSelected.estado">
                <option :key="0">Seleccione una estado</option>
                <option
                  v-for="est in estadosConciliacion"
                  :value="est.value"
                  :key="est.value"
                >
                  {{ est.text }}
                </option>
              </CFormSelect>
            </div>

            <div class="mb-3">
              <CFormLabel>Token</CFormLabel>
              <CFormInput
                type="text"
                maxlength="32"
                v-model="conciliacionSelected.token"
              />
            </div>

            <div class="mb-3">
              <CFormLabel>Observación</CFormLabel>
              <CFormInput
                type="text"
                v-model="conciliacionSelected.observacion"
              />
            </div>
          </CCol>

          <CCol sm="6">
            <div class="mb-3">
              <CFormLabel>Stamp</CFormLabel>
              <CFormInput
                type="text"
                disabled
                v-model="conciliacionSelected.stamp"
              />
            </div>

            <div class="mb-3">
              <CFormLabel>Fecha Venta</CFormLabel>
              <CFormInput
                type="date"
                v-model="conciliacionSelected.fechaVenta"
              />
            </div>

            <div class="mb-3">
              <CFormLabel>Línea Conciliación</CFormLabel>
              <CFormInput
                type="text"
                disabled
                v-model="conciliacionSelected.linea"
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
            resetConciliacion();
            visibleModalConciliacion = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton color="primary" @click="updateconciliacion">Guardar</CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL CONCILIACION -->
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import Paginate from "vuejs-paginate-next";
import {
  cilBank,
  cilZoomIn,
  cilBalanceScale,
  cilSearch,
  cilCash,
} from "@coreui/icons";
import * as XLSX from "xlsx";
import {
  csvToObjsTBK,
  xlsToObjsKhipu,
  getStyleConciliacionSegunEstado,
  getStyleSegunEstado,
  difDias,
} from "@/Helper/util";
import orderbyicon from "@/components/OrderByIcon.vue";
import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import { buscadorConciliacion } from "@/_menuOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "Conciliar",
  components: {
    paginate: Paginate,
    orderbyicon,
    VOnboardingWrapper,
  },
  methods: {
    csvToObjsTBK,
    xlsToObjsKhipu,
    difDias,
    getStyleConciliacionSegunEstado,
    getStyleSegunEstado,
    renderSteps,
  },
  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);

    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const formatterMoney = globalProperties.$formatterMoney;
    const ApiKey = globalProperties.$apiKey;
    const localMenuOnvoarding = buscadorConciliacion;

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
                offset: [0, 8],
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
      formasPago: null,
      conciliaciones: null,
      trxConciliacion: null,
      conciliacionSelected: {},
      conciliacionSelectedManual: {},
      visibleModalExportacion: false,
      visibleModalConciliacion: false,
      visibleModalConciliacionManual: false,
      conciliacionesToExport: null,
      totalconciliacion: 0,
      initialPage: 1,
      sizePage: 10,
      estadosConciliacion: [
        {
          value: "+",
          text: "No Existe",
        },
        {
          value: "D",
          text: "Diferencia",
        },
        {
          value: "1",
          text: "Conciliado",
        },
        {
          value: "0",
          text: "No Conciliado",
        },
      ],
      orderByConciliacion: {
        MontoAfecto: {
          id: "btn_orderby_montoAfecto",
          direction: "minus",
        },
        FechaVenta: {
          id: "btn_orderby_fechaVenta",
          direction: "desc",
        },
      },
    });

    const getConciliacionSelected = (identificador) => {
      state.conciliacionSelected = state.conciliaciones.find(
        (c) => c.identificador == identificador
      );
      state.visibleModalConciliacion = true;
    };

    const selectedPagination = (pageNum) => {
      state.initialPage = pageNum;
      getConciliacionesByFilter(false);
    };

    const conciliarTrx = (idtrx) => {
      if (!idtrx) return;
      let idconciliacion = state.conciliacionSelectedManual.identificador;
      if (!idconciliacion) return;

      swal({
        title: "Conciliación",
        text: "¿Está seguro de conciliar el registro seleccionado?",
        icon: "warning",
        buttons: true,
      }).then((resp) => {
        if (!resp) return;

        ApiNeva.post(
          "Conciliacion/ConciliarTrx?idtrx=" +
            idtrx +
            "&idconciliacion=" +
            idconciliacion,
          null,
          { headers: header }
        )
          .then((response) => {
            if (response.status != 200) return false;
            state.visibleModalConciliacionManual = false;
            swal(
              "Conciliación",
              "Se ha conciliado correctamente el registro seleccionado",
              "success"
            );
            getConciliacionesByFilter(true);
          })
          .catch((error) => {
            swal(
              "Conciliación",
              "Ha ocurrido un problema conciliando",
              "warning"
            );
          });
      });
    };

    const conciliacionManual = (cons) => {
      if (!cons) return;
      if (cons.estado == "1" || cons.estado == "D") {
        swal(
          "Conciliación",
          "El registro seleccionado ya se encuentra conciliado",
          "warning"
        );
        return;
      }
      state.conciliacionSelectedManual = cons;
      getFilterConciliacion();
    };

    const getFilterConciliacion = async () => {
      let chkMedioPago = false;
      let chkMontoAfecto = true;
      let chkFechaVenta = false;

      try {
        chkMedioPago = document.getElementById("chkMedioPago").checked;
        chkMontoAfecto = document.getElementById("chkMontoAfecto").checked;
        chkFechaVenta = document.getElementById("chkFechaVenta").checked;
      } catch (error) {}

      if (!chkMedioPago && !chkMontoAfecto && !chkFechaVenta) {
        swal(
          "Búsqueda transacción",
          "Debe seleccionar al menos un checkbox para buscar transacción a conciliar",
          "warning"
        );
        return;
      }

      let txtMedioPago = state.conciliacionSelectedManual.mediopagoId;
      let txtMontoAfecto = state.conciliacionSelectedManual.montoAfecto;
      let txtFechaVenta = state.conciliacionSelectedManual.fechaVenta;

      if (!chkMedioPago) txtMedioPago = null;
      if (!chkMontoAfecto) txtMontoAfecto = null;
      if (!chkFechaVenta) txtFechaVenta = null;

      let bodyFilter = {
        fechaInicio: txtFechaVenta || null,
        fechaFin: txtFechaVenta || null,
        canalId: null,
        medioPagoId: txtMedioPago || null,
        clienteCodigo: null,
        oc: null,
        codAutorizacion: null,
        codEstado: null,
        token: null,
        montoAfecto: txtMontoAfecto || null,
      };

      try {
        let response = await ApiNeva.post(
          "Transaccion/TrxConciliar",
          bodyFilter,
          { headers: header }
        );
        response = await response;
        state.trxConciliacion = await response.data;
      } catch (error) {
        state.trxConciliacion = null;
      }
      if (state.visibleModalConciliacionManual) return;
      state.visibleModalConciliacionManual = true;
    };

    const getFilter = (directionOrderBy, idColumOrderBy) => {
      let identificador = document.getElementById("identificador").value;
      let tipoMovimiento = document.getElementById("tipoMovimiento").value;
      let tipoTarjeta = document.getElementById("tipoTarjeta").value;
      let montoAfecto = document.getElementById("montoAfecto").value;
      let authCode = document.getElementById("authCode").value;
      let cuotas = document.getElementById("cuotas").value;
      let montoCuota = document.getElementById("montoCuota").value;
      let token = document.getElementById("token").value;
      let stampInicial = document.getElementById("stampInicial").value;
      let stampFinal = document.getElementById("stampFinal").value;
      let fechaVentaInicial =
        document.getElementById("fechaVentaInicial").value;
      let fechaVentaFinal = document.getElementById("fechaVentaFinal").value;
      let conciliacionEstado =
        document.getElementById("conciliacionEstado").selectedIndex == 0
          ? ""
          : document.getElementById("conciliacionEstado").value;
      let medioPagoId =
        document.getElementById("medioPagoId").selectedIndex == 0
          ? ""
          : document.getElementById("medioPagoId").value;

      if (!stampInicial && stampFinal) {
        swal(
          "Valores incorrectos",
          "Debe seleccionar una Fecha inicio stamp",
          "warning"
        ).then(() => document.getElementById("stampInicial").focus());
        return false;
      }

      if (stampInicial && !stampFinal) {
        swal(
          "Valores incorrectos",
          "Debe seleccionar una Fecha fin stamp",
          "warning"
        ).then(() => document.getElementById("stampFinal").focus());
        return false;
      }

      var difDiaStamp = difDias(stampInicial, stampFinal);
      if (difDiaStamp < 0) {
        swal({
          title: "Valores incorrectos",
          text: "La fecha Stamp inicial es posterior a la fecha Stamp final.",
          icon: "warning",
          closeOnClickOutside: false,
        }).then(() => document.getElementById("stampFinal").focus());
        return false;
      }
      if (difDiaStamp > 360) {
        swal({
          title: "Valores incorrectos",
          text: "El intervalo de fechas de Stamp es superior a 360 días.",
          icon: "warning",
          closeOnClickOutside: false,
        }).then(() => document.getElementById("stampFinal").focus());
        return false;
      }

      if (!fechaVentaInicial && fechaVentaFinal) {
        swal(
          "Valores incorrectos",
          "Debe seleccionar una Fecha inicio venta",
          "warning"
        ).then(() => document.getElementById("fechaVentaInicial").focus());
        return false;
      }

      if (fechaVentaInicial && !fechaVentaFinal) {
        swal(
          "Valores incorrectos",
          "Debe seleccionar una Fecha fin venta",
          "warning"
        ).then(() => document.getElementById("fechaVentaFinal").focus());
        return false;
      }
      var difDiaVenta = difDias(fechaVentaInicial, fechaVentaFinal);
      if (difDiaVenta < 0) {
        swal({
          title: "Valores incorrectos",
          text: "La fecha inicial venta es posterior a la fecha final venta.",
          icon: "warning",
          closeOnClickOutside: false,
        }).then(() => document.getElementById("fechaVentaFinal").focus());
        return false;
      }
      if (difDiaVenta > 360) {
        swal({
          title: "Valores incorrectos",
          text: "El intervalo de fechas de venta es superior a 360 días.",
          icon: "warning",
          closeOnClickOutside: false,
        }).then(() => document.getElementById("fechaVentaFinal").focus());
        return false;
      }

      let bodyFilter = {
        identificador: identificador,
        medioPagoId: medioPagoId,
        tipoMovimiento: tipoMovimiento,
        tipoTarjeta: tipoTarjeta,
        montoAfecto: parseFloat(montoAfecto),
        montoExento: 0,
        authCode: authCode,
        cuotas: cuotas || 0,
        montoCuota: parseFloat(montoCuota) || 0,
        token: token,
        stampInicial: stampInicial || null,
        stampFinal: stampFinal || null,
        fechaVentaInicial: fechaVentaInicial || null,
        fechaVentaFinal: fechaVentaFinal || null,
        conciliacionEstado: conciliacionEstado,
        orderByFilter: {
          orderBy: idColumOrderBy,
          orderByOrientacion: directionOrderBy,
        },
      };

      return bodyFilter;
    };

    const getConciliacionesByFilter = (
      iniciarPage,
      direccionReturn,
      idReturn
    ) => {
      let bodyFilter = getFilter(direccionReturn, idReturn);
      if (!bodyFilter) return;

      if (iniciarPage) state.initialPage = 1;

      ApiNeva.post("Conciliacion/FilterCount", bodyFilter, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.totalconciliacion = Math.ceil(response.data / state.sizePage);
        })
        .catch(() => {
          state.totalconciliacion = null;
        });

      ApiNeva.post(
        "Conciliacion/FilterList?initialPage=" +
          state.initialPage +
          "&sizePage=" +
          state.sizePage,
        bodyFilter,
        { headers: header }
      )
        .then((response) => {
          if (response.status != 200) return false;
          state.conciliaciones = response.data;
        })
        .catch(() => {
          state.totalconciliacion = null;
          state.conciliaciones = null;
        });
    };

    const getFormasPagoAll = () => {
      ApiNeva.get("MedioPago/MediosPago", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.formasPago = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const exportExcel = async (tipoExport) => {
      let bodyFilter = getFilter();
      if (!bodyFilter) return false;

      if (!state.conciliaciones) {
        swal(
          "Exportación Datos",
          "Utilice los filtros para buscar las conciliaciones a exportar",
          "warning"
        );
        return false;
      }

      try {
        let response = await ApiNeva.post(
          "Conciliacion/ConciliacionesExport",
          bodyFilter,
          { headers: header }
        );
        response = await response;
        state.conciliacionesToExport = await response.data;
      } catch (error) {
        console.log(error);
      }

      let data = XLSX.utils.json_to_sheet(state.conciliacionesToExport);
      const workbook = XLSX.utils.book_new();
      let fechaActual = new Date()
        .toLocaleDateString("en-ZA")
        .replaceAll("/", "");
      const filename = "Conciliaciones_" + fechaActual;
      XLSX.utils.book_append_sheet(workbook, data, filename);

      switch (tipoExport) {
        case "xlsx":
          XLSX.writeFile(workbook, `${filename}.xlsx`);
          return;
        case "csv":
          XLSX.writeFile(workbook, `${filename}.csv`);
          return;
        case "txt":
          XLSX.writeFile(workbook, `${filename}.txt`);
          return;
      }
    };

    const buscarEnter = (elemento) => {
      if (elemento.keyCode === 13) {
        getConciliacionesByFilter(true);
      }
    };

    const getNameEstadoConciliacion = (estado) => {
      switch (estado) {
        case "+":
          return "No Existe";
        case "D":
          return "Diferencia";
        case "1":
          return "Conciliado";
        case "0":
          return "No Conciliado";
      }
    };

    const resetConciliacion = () => {
      state.conciliacionSelected = {
        identificador: "",
        mediopagoId: "",
        tipoMovimiento: "",
        tipoTarjeta: "",
        montoAfecto: "",
        montoExento: "",
        authcode: "",
        cuotas: "",
        montoCuota: "",
        linea: "",
        estado: "",
        token: "",
        stamp: "",
        fechaVenta: "",
        observacion: "",
        diferencia: "",
      };
    };

    const limpiarFiltros = () => {
      document.getElementById("identificador").value = "";
      document.getElementById("tipoMovimiento").value = "";
      document.getElementById("tipoTarjeta").value = "";
      document.getElementById("montoAfecto").value = "";
      document.getElementById("authCode").value = "";
      document.getElementById("cuotas").value = "";
      document.getElementById("montoCuota").value = "";
      document.getElementById("token").value = "";
      document.getElementById("stampInicial").value = "";
      document.getElementById("stampFinal").value = "";
      document.getElementById("fechaVentaInicial").value = "";
      document.getElementById("fechaVentaFinal").value = "";
      document.getElementById("conciliacionEstado").selectedIndex = 0;
      document.getElementById("medioPagoId").selectedIndex = 0;
    };

    const updateconciliacion = () => {
      if (!state.conciliacionSelected) return false;
      let concil = state.conciliacionSelected;
      //Evito afectar datos adyacentes
      delete concil.linea;

      ApiNeva.post("Conciliacion/UpdateConciliacion", concil, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.visibleModalConciliacion = false;
          getConciliacionesByFilter(true);
          swal(
            "Modificar Conciliación",
            "Se ha modificado correctamente la conciliación seleccionada",
            "success"
          );
        })
        .catch((error) => console.log(error));
    };

    const resetIconsOrderBy = (id) => {
      switch (id) {
        case state.orderByConciliacion.MontoAfecto.id:
          document
            .getElementById(state.orderByConciliacion.FechaVenta.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          break;
        case state.orderByConciliacion.FechaVenta.id:
          document
            .getElementById(state.orderByConciliacion.MontoAfecto.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          break;
      }
    };

    const OrderByConciliacion = (direction, id) => {
      resetIconsOrderBy(id);

      let idReturn = "";
      let direccionReturn = -1;
      switch (id) {
        case state.orderByConciliacion.MontoAfecto.id:
          idReturn = "MontoAfecto";
          break;
        case state.orderByConciliacion.FechaVenta.id:
          idReturn = "FechaVenta";
          break;
      }

      switch (direction) {
        case "asc":
          direccionReturn = 0;
          break;
        default:
          direccionReturn = 1;
          break;
      }

      getConciliacionesByFilter(true, direccionReturn, idReturn);
    };

    const onBoarding = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboarding = await onBoardingHelper.getUserSeeMenu(
          user.id,
          "buscadorConciliacion",
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
          "buscadorConciliacion",
          header
        );
      }
    };

    onMounted(() => {
      getFormasPagoAll();
      onBoarding();
      if (!state.isonboarding) {
        setTimeout(() => {
          start();
        }, 500);
      }
    });

    return {
      ...toRefs(state),
      cilBank,
      cilZoomIn,
      cilBalanceScale,
      cilCash,
      cilSearch,
      formatterMoney,
      getConciliacionesByFilter,
      selectedPagination,
      exportExcel,
      buscarEnter,
      getNameEstadoConciliacion,
      resetConciliacion,
      getConciliacionSelected,
      conciliacionManual,
      getFilterConciliacion,
      conciliarTrx,
      limpiarFiltros,
      updateconciliacion,
      OrderByConciliacion,
    };
  },
};
</script>

<style></style>
