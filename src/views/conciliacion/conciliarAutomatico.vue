<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
  <!-- LOAD FILE -->
  <CRow>
    <CCol :md="12">
      <CCard
        id="conciliacion_automatica"
        class="mb-4"
        data-aos="fade-up"
        data-aos-easing="ease"
      >
        <CCardHeader>
          <div style="display: flex">
            <CModalTitle>Proceso de Conciliación Automática</CModalTitle
            >&nbsp;&nbsp;
            <div style="padding-top: 0.3rem">
              <CLink
                v-c-tooltip="
                  'El proceso de conciliación es automático y se ejecuta cada 5 min.'
                "
              >
                <CIcon :icon="cilWarning" size="lg" />
              </CLink>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CContainer>
            <CRow>
              <CCol sm="12" md="3" lg="3">
                <CFormLabel for="stampInicial">
                  Medio de Pago <CIcon :icon="cilBank"
                /></CFormLabel>
                <CFormSelect
                  id="medioPagoIdLoadData"
                  size="sm"
                  v-on:click="medioPagoClic"
                >
                  <option :key="0">Seleccione una forma pago</option>
                  <option value="PAYPAL" :key="'PAYPAL'">Paypal</option>
                  <option value="MPAGOPRO" :key="'MPAGOPRO'">
                    Mercado Pago Pro
                  </option>
                  <option disabled value="TRANSBANK" :key="'TRANSBANK'">
                    Transbank
                  </option>
                  <option disabled value="KHIPU" :key="'KHIPU'">Khipu</option>
                  <!--option
                    v-for="(formaPago, i) in formasPago"
                    :value="formaPago.nombre"
                    :key="i"
                    :disabled= "(formaPago.nombre== 'PAYPAL' || formaPago.nombre== 'MPAGOPRO')==false"
                    >{{ formaPago.nombre }}
                    <img height="22" style="margin: 0 6px 0 0;" :src="formaPago.imgurl">
                    </option-->
                </CFormSelect>
              </CCol>

              <CCol sm="12" md="3" lg="3">
                <CFormLabel for="fechaVentaInicial"
                  >Fecha inicial venta</CFormLabel
                >
                <CFormInput
                  :disabled="fechaDisabled"
                  size="sm"
                  type="date"
                  id="fechaVentaInicialObtener"
                  v-model="fechaVentaInicialObtener"
                />
              </CCol>

              <CCol sm="12" md="3" lg="3">
                <CFormLabel for="fechaVentaFinal">Fecha final venta</CFormLabel>
                <CFormInput
                  :disabled="fechaDisabled"
                  size="sm"
                  type="date"
                  id="fechaVentaFinalObtener"
                  v-model="fechaVentaFinalObtener"
                />
              </CCol>

              <CCol sm="12" md="3" lg="3">
                <CFormLabel></CFormLabel>
                <div class="text-end">
                  <CLink v-c-tooltip="'Obtener registros de conciliación'">
                    <CButton
                      color="primary"
                      @click="
                        () => {
                          readData();
                        }
                      "
                      >Buscar
                      <CIcon :icon="cilSearch" />
                    </CButton>
                  </CLink>
                </div>
              </CCol>
            </CRow>
            <CRow class="pt-2">
              <CCol sm="12" md="12" lg="12">
                <small
                  >El proceso de conciliación automaticó puede tomar algunos
                  minutos en obtener, válidar y almacenar la información, cuando
                  esta superan 50.000 registros.<br />(Puede usar el sistema con
                  normalidad: Se notificará una vez terminado el proceso)</small
                >
              </CCol>
            </CRow>
          </CContainer>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <!-- LOAD FILE -->

  <!-- LISTADO CONCILIACION -->
  <CRow>
    <CCol :md="12">
      <CCard
        id="conciliacion_automatica_listado"
        class="mb-4"
        data-aos="fade-up"
        data-aos-easing="ease"
      >
        <CCardHeader>
          <CRow>
            <CCol :sm="7">
              <strong>Listado de Conciliaciones Obtenidas</strong>&nbsp;<br />
            </CCol>
            <CCol :sm="5">
              <div style="padding-top: 0.3rem">
                <CLink v-c-tooltip="'Subir datos obtenidos de concilación'">
                  <CButton
                    id="conciliacion_automatica_upload"
                    color="primary"
                    @click="
                      () => {
                        loadData();
                      }
                    "
                    >upload
                    <CIcon icon="cil-cloud-upload" size="lg" />
                  </CButton>
                </CLink>
              </div>
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
                <CTableHeaderCell class="text-center" scope="col"
                  >Monto Afecto</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Estado</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Fecha&nbsp;Venta</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Quitar</CTableHeaderCell
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
                <!--CTableDataCell class="text-center">{{ getNameEstadoConciliacion(cons.estado)}}</CTableDataCell-->
                <CTableDataCell class="text-center">
                  <CBadge :color="getStyleConciliacionSegunEstado(cons.estado)">
                    {{ getNameEstadoConciliacion(cons.estado) }}
                  </CBadge>
                </CTableDataCell>

                <CTableDataCell class="text-center">{{
                  new Date(cons.fechaVenta).toLocaleString()
                }}</CTableDataCell>
                <CTableDataCell class="text-center">
                  <CButton @click="quitar(cons)">
                    <CIcon
                      :icon="cilDelete"
                      title="Quitar de la lista"
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
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import swal from "sweetalert";
import ApiNeva from "@/api/ApiNeva";
import Paginate from "vuejs-paginate-next";
import {
  cilBank,
  cilWarning,
  cilSearch,
  cilCash,
  cilDelete,
  cilCloudUpload,
} from "@coreui/icons";
import { getStyleConciliacionSegunEstado, difDias } from "@/Helper/util";
import moment from "moment";
import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import { automaticaConciliacion } from "@/_menuOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "Conciliar",
  components: {
    paginate: Paginate,
    VOnboardingWrapper,
  },
  methods: {
    renderSteps,
    difDias,
    getStyleConciliacionSegunEstado,
  },
  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);

    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const formatterMoney = globalProperties.$formatterMoney;
    const ApiKey = globalProperties.$apiKey;
    const localMenuOnvoarding = automaticaConciliacion;

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
      fechaVentaInicialObtener: null,
      fechaVentaFinalObtener: null,
      fechaDisabled: true,
      formasPago: null,
      conciliaciones: null,
      isLoadingFile: false,
      totalconciliacion: 0,
      initialPage: 1,
      sizePage: 10,
    });

    const medioPagoClic = () => {
      let medioPagoIdLoadData =
        document.getElementById("medioPagoIdLoadData").selectedIndex == 0
          ? null
          : document.getElementById("medioPagoIdLoadData").value;
      switch (medioPagoIdLoadData) {
        case "PAYPAL":
          state.fechaDisabled = false;
          state.fechaVentaInicialObtener = moment()
            .add(-1, "months")
            .format("YYYY-MM-DD");
          state.fechaVentaFinalObtener = moment()
            .add(1, "minutes")
            .format("YYYY-MM-DD");
          break;
        case "MPAGOPRO":
          state.fechaDisabled = false;
          state.fechaVentaInicialObtener = moment()
            .add(-12, "months")
            .format("YYYY-MM-DD");
          state.fechaVentaFinalObtener = moment()
            .add(1, "minutes")
            .format("YYYY-MM-DD");
          break;
        case "TRANSBANK":
          state.fechaDisabled = true;
          break;
        case "KHIPU":
          state.fechaDisabled = true;
          break;
        default:
          state.fechaDisabled = true;
          state.fechaVentaInicialObtener = null;
          state.fechaVentaFinalObtener = null;
          break;
      }
    };

    const selectedPagination = (pageNum) => {
      state.initialPage = pageNum;
    };

    const getFormasPagoAll = () => {
      ApiNeva.get("MedioPago/MediosPago", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.formasPago = response.data;
          //console.log("getFormasPagoAll() => state.formasPago:",state.formasPago )
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
    //getFormasPagoAll();

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

    const readData = async () => {
      let medioPagoIdLoadData =
        document.getElementById("medioPagoIdLoadData").selectedIndex == 0
          ? null
          : document.getElementById("medioPagoIdLoadData").value;
      let fechaVentaInicialObtener = document.getElementById(
        "fechaVentaInicialObtener"
      ).value;
      let fechaVentaFinalObtener = document.getElementById(
        "fechaVentaFinalObtener"
      ).value;

      if (!medioPagoIdLoadData) {
        swal(
          "Proceso de Conciliación Automática",
          "Debe seleccionar el medio de pago de conciliación",
          "warning"
        );
        return false;
      }
      if (!fechaVentaInicialObtener) {
        swal(
          "Proceso de Conciliación Automática",
          "Debe seleccionar fecha inicial de venta de conciliación",
          "warning"
        );
        return false;
      }
      if (!fechaVentaFinalObtener) {
        swal(
          "Proceso de Conciliación Automática",
          "Debe seleccionar fecha final de venta de conciliación",
          "warning"
        );
        return false;
      }

      //#region validación fecha por medo de pago
      var difHoy = difDias(
        fechaVentaFinalObtener,
        moment().add(1, "minutes").format("YYYY-MM-DD")
      );
      if (difHoy < 0) {
        swal({
          title: "Proceso de Conciliación Automática",
          text: "La fecha de venta final no puede ser mayor a la fecha actual",
          icon: "warning",
          closeOnClickOutside: false,
        });
        return;
      }
      var difDia = difDias(fechaVentaInicialObtener, fechaVentaFinalObtener);
      if (difDia < 0) {
        swal({
          title: "Proceso de Conciliación Automática",
          text: "La fecha inicial de ventas es posterior a la fecha de venta final. Utilice o modifique los filtros de fechas de inicio y fin de ventas para buscar las conciliaciones en un medio de pago",
          icon: "warning",
          closeOnClickOutside: false,
        });
        return;
      }
      if (medioPagoIdLoadData != "MPAGOPRO") {
        if (difDia > 31) {
          swal({
            title: "Proceso de Conciliación Automática",
            text: "El intervalo de fechas es superior a 31 días. Utilice o modifique los filtros de fechas de inicio y fin de ventas para buscar las conciliaciones en un medio de pago",
            icon: "warning",
            closeOnClickOutside: false,
          });
          return;
        }
      } else {
        //medioPagoIdLoadData=="MPAGOPRO"
        if (difDia > 365) {
          swal({
            title: "Proceso de Conciliación Automática",
            text: "El intervalo de fechas es superior a 12 meses. Utilice o modifique los filtros de fechas de inicio y fin de ventas para buscar las conciliaciones en un medio de pago",
            icon: "warning",
            closeOnClickOutside: false,
          });
          return;
        }
      }
      //#endregion

      var filtro =
        "startDate=" +
        fechaVentaInicialObtener +
        "T00:00:00.000Z&endDate=" +
        fechaVentaFinalObtener +
        "T00:00:00.000Z";
      switch (medioPagoIdLoadData) {
        case "PAYPAL":
          ApiNeva.get("Paypal/PaypalTransactionDetailsGet?" + filtro, {
            headers: header,
          })
            .then((response) => {
              let jsonConciliacionBody = "";
              jsonConciliacionBody = PaypalToConciliacionBody(
                response.data.transaction_details,
                medioPagoIdLoadData
              );
              if (!jsonConciliacionBody) return;
              state.conciliaciones = jsonConciliacionBody;
              //localStorage.isLoadingFile = true; state.isLoadingFile = true;
              if (jsonConciliacionBody.length == 0) {
                swal({
                  title: "Proceso de Conciliación Automática",
                  text: "No existen información de conciliación. Utilice o modifique los filtros de fechas de inicio y fin de ventas para buscar las conciliaciones en un medio de pago",
                  icon: "warning",
                  closeOnClickOutside: false,
                });
                return;
              }
              swal({
                title: "Proceso de Conciliación Automática",
                text: "Se ha obtenido correctamente la información de conciliación. No olvide subir los datos de conciliación con el botón upload para ser procesados",
                icon: "success",
                closeOnClickOutside: false,
              });
              return;
            })
            .catch((error) => {
              if (
                error.response.status == 500 &&
                (error.response.data.detail.includes("same key value") ||
                  error.response.data.detail.includes("duplicate key"))
              ) {
                swal({
                  title: "Proceso de Conciliación Automática",
                  text: "Uno o mas registros ya se encuentran registrados",
                  icon: "warning",
                  closeOnClickOutside: false,
                });
                return;
              }
              if (
                error.response.status == 500 &&
                error.response.data.detail.includes(
                  "PAYPAL_INVALID_REQUEST_details"
                )
              ) {
                var errorDetalle = JSON.parse(
                  error.response.data.detail.replace(
                    "PAYPAL_INVALID_REQUEST_details",
                    ""
                  )
                );
                swal({
                  title: "Proceso de Conciliación Automática",
                  text:
                    "PAYPAL_INVALID_REQUEST: " +
                    errorDetalle[0].issue +
                    ". (" +
                    errorDetalle[0].field +
                    ")",
                  icon: "warning",
                  closeOnClickOutside: false,
                });
                return;
              }
              swal({
                title: "Proceso de Conciliación Automática",
                text: "Ha ocurrido un error durante la obtencion de datos de conciliación",
                icon: "warning",
                closeOnClickOutside: false,
                allowOutsideClick: false,
              });
            });

          break;
        case "MPAGOPRO":
          ApiNeva.get(
            "MercadoPagoPro/MercadoPagoProPaymentsGet?" + filtro,
            { headers: header }
          )
            .then((response) => {
              // console.log("response => MercadoPagoProPaymentsGet",response)
              let jsonConciliacionBody = MpagoProToConciliacionBody(
                response.data,
                medioPagoIdLoadData
              );

              if (!jsonConciliacionBody) return;
              state.conciliaciones = jsonConciliacionBody;
              //localStorage.isLoadingFile = true; state.isLoadingFile = true;
              if (jsonConciliacionBody.length == 0) {
                swal({
                  title: "Proceso de Conciliación Automática",
                  text: "No existen información de conciliación. Utilice o modifique los filtros de fechas de inicio y fin de ventas para buscar las conciliaciones en un medio de pago",
                  icon: "warning",
                  closeOnClickOutside: false,
                });
                return;
              }
              state.conciliaciones = state.conciliaciones.filter(
                (x) =>
                  difDias(fechaVentaInicialObtener, x.fechaVenta) >= 0 &&
                  difDias(fechaVentaFinalObtener, x.fechaVenta) <= 0
              );

              swal({
                title: "Proceso de Conciliación Automática",
                text: "Se ha obtenido correctamente la información de conciliación. No olvide subir los datos de conciliación con el botón upload para ser procesados",
                icon: "success",
                closeOnClickOutside: false,
              });
              return;
            })
            .catch((error) => {
              if (
                error.response.status == 500 &&
                (error.response.data.detail.includes("same key value") ||
                  error.response.data.detail.includes("duplicate key"))
              ) {
                swal({
                  title: "Proceso de Conciliación Automática",
                  text: "Uno o mas registros ya se encuentran registrados",
                  icon: "warning",
                  closeOnClickOutside: false,
                });
                return;
              }
              if (
                error.response.status == 500 &&
                error.response.data.detail.includes(
                  "PAYPAL_INVALID_REQUEST_details"
                )
              ) {
                var errorDetalle = JSON.parse(
                  error.response.data.detail.replace(
                    "PAYPAL_INVALID_REQUEST_details",
                    ""
                  )
                );
                swal({
                  title: "Proceso de Conciliación Automática",
                  text:
                    "PAYPAL_INVALID_REQUEST: " +
                    errorDetalle[0].issue +
                    ". (" +
                    errorDetalle[0].field +
                    ")",
                  icon: "warning",
                  closeOnClickOutside: false,
                });
                return;
              }
              swal({
                title: "Proceso de Conciliación Automática",
                text: "Ha ocurrido un error durante la obtencion de datos de conciliación",
                icon: "warning",
                closeOnClickOutside: false,
                allowOutsideClick: false,
              });
            });

          break;
        case "TRANSBANK":
          break;
        case "KHIPU":
          break;
      }
    };

    const loadData = async () => {
      // console.log("loadData")

      if (state.conciliaciones == undefined) {
        swal({
          title: "Proceso de Conciliación Automática",
          text: "No se han informado datos de conciliación para guardar. Utilice o modifique los filtros de fechas de inicio y fin de ventas para buscar las conciliaciones en un medio de pago",
          icon: "warning",
          closeOnClickOutside: false,
        });
        return;
      }
      //localStorage.isLoadingFile = true; state.isLoadingFile = true;
      ApiNeva.post("Conciliacion/GuardarList", state.conciliaciones, {
        headers: header,
      })
        .then((response) => {
          //localStorage.isLoadingFile = false; state.isLoadingFile = false; document.getElementById('medioPagoIdLoadData').selectedIndex = 0;
          //console.log("GuardarListPaypal",response)
          swal({
            title: "Proceso de Conciliación Automática",
            text: "Se ha cargado correctamente y se ha comenzado a procesar la información de conciliación, puede usar el sistema con normalidad",
            icon: "success",
            closeOnClickOutside: false,
          });
          return;
        })
        .catch((error) => {
          //localStorage.isLoadingFile = false; state.isLoadingFile = false;
          if (
            error.response.status == 500 &&
            (error.response.data.detail.includes("same key value") ||
              error.response.data.detail.includes("duplicate key"))
          ) {
            swal({
              title: "Proceso de Conciliación Automática",
              text: "Una o mas transacciones ya se encuentran registrados",
              icon: "warning",
              closeOnClickOutside: false,
            });
            return;
          }
          if (
            error.response.status == 400 &&
            error.response.data.includes(
              "No se han informado lineas de conciliacion para guardar"
            )
          ) {
            swal({
              title: "Proceso de Conciliación Automática",
              text: "No se han informado datos de conciliación para guardar",
              icon: "warning",
              closeOnClickOutside: false,
            });
            return;
          }
          swal({
            title: "Proceso de Conciliación Automática",
            text: "Ha ocurrido un error durante la carga de datos de conciliación",
            icon: "warning",
            closeOnClickOutside: false,
            allowOutsideClick: false,
          });
        });
    };

    const MpagoProToConciliacionBody = (objsMpagoPro, mediopagoid) => {
      //console.log("objsMpagoPro0",objsMpagoPro)
      if (!objsMpagoPro) return;
      let objsConciliacion = [];

      for (let i = 0; i < objsMpagoPro.results.length; i++) {
        let line = objsMpagoPro.results[i];

        try {
          if (
            line.status.toUpperCase() === "APPROVED" &&
            line.status_detail.toUpperCase() == "ACCREDITED"
          ) {
            let obj = {
              identificador: line.external_reference,
              mediopagoId: mediopagoid,
              tipoMovimiento: "VENTA",
              tipoTarjeta: line.payment_type_id,
              montoAfecto: formatDecimal(line.transaction_amount),
              montoExento: 0,
              authcode: line.external_reference,
              cuotas: 0,
              montoCuota: 0,
              linea: JSON.stringify(line),
              estado: "0", //definido 0 en BD para inciar proceso de conciliacion
              token: null, //Se define en el proceso de conciliacion
              stamp: null, //definido now() en BD
              fechaVenta: moment(
                line.date_created,
                "YYYY-MM-DDTHH:mm:ss.SSSZ"
              ).format(),
              observacion: "", //Se define en el proceso de conciliacion
              diferencia: 0, //Se define en el proceso de conciliacion
              estadoMpagoPro:
                "(" + line.status + " - " + line.status_detail + ")",
            };
            //console.log("obj",obj)
            objsConciliacion.push(obj);
          }
        } catch (error) {
          console.log("line error read MpagoProToConciliacionBody: ", error);
        }
      }

      return objsConciliacion;
    };

    const PaypalToConciliacionBody = (objsPaypal, mediopagoid) => {
      //console.log("objsPaypal",objsPaypal)
      if (!objsPaypal) return;
      let objsConciliacion = [];

      for (let i = 0; i < objsPaypal.length; i++) {
        let line = objsPaypal[i];
        /*
            transaction_info:
            available_balance: {currency_code: 'USD', value: '43408.30'}
            ending_balance: {currency_code: 'USD', value: '43408.30'}
            fee_amount: {currency_code: 'USD', value: '-66.86'}
            paypal_account_id: "LXSXKZELEL3ZE"
            protection_eligibility: "01"
            transaction_amount: {currency_code: 'USD', value: '1330.00'}
            transaction_event_code: "T0006"
            transaction_id: "6SF46633L45099640"
            transaction_initiation_date: "2022-06-24T16:13:25-04:00"
            transaction_status: "S"
            transaction_updated_date: "2022-06-24T16:13:25-04:00"
         */
        try {
          //console.log("line",line)
          // console.log("moment(date[0]",moment(line.transaction_info.transaction_initiation_date, 'YYYY-MM-DDTHH:mm:ss-hh:mm').format())
          let obj = {
            identificador: line.transaction_info.transaction_id,
            mediopagoId: mediopagoid,
            tipoMovimiento: "VENTA",
            tipoTarjeta: line.transaction_info.transaction_amount.currency_code,
            montoAfecto: formatDecimal(
              line.transaction_info.transaction_amount.value
            ),
            montoExento: 0,
            authcode: line.transaction_info.transaction_id,
            cuotas: 0,
            montoCuota: 0,
            linea: JSON.stringify(line),
            estado: "0", //definido 0 en BD para inciar proceso de conciliacion
            token: null, //Se define en el proceso de conciliacion
            stamp: null, //definido now() en BD
            fechaVenta: moment(
              line.transaction_info.transaction_initiation_date,
              "YYYY-MM-DDTHH:mm:ss-hh:mm"
            ).format(),
            observacion: "", //Se define en el proceso de conciliacion
            diferencia: 0, //Se define en el proceso de conciliacion
          };
          // console.log("obj",obj)
          objsConciliacion.push(obj);
        } catch (error) {
          console.log("lerrorine", error);
        }
      }

      return objsConciliacion;
    };

    const formatDecimal = (valor) => {
      if (!valor) return;
      valor = valor.toString();
      return parseFloat(valor.replace(".", "").replace(",", "."));
    };

    const oncreated = () => {
      if (typeof localStorage.isLoadingFile === "undefined") {
        localStorage.isLoadingFile = false;
      }
      state.isLoadingFile =
        localStorage.isLoadingFile == "false" ? false : true;
    };

    const onBoarding = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboarding = await onBoardingHelper.getUserSeeMenu(
          user.id,
          "automaticaConciliacion",
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
          "automaticaConciliacion",
          header
        );
      }
    };

    onMounted(() => {
      getFormasPagoAll();
      oncreated();
      onBoarding();
      if (!state.isonboarding) {
        setTimeout(() => {
          start();
        }, 500);
      }
    });
    const quitar = (value) => {
      //console.log("Quitar fnx:item ",value)
      state.conciliaciones = state.conciliaciones.filter(function (item) {
        return item !== value;
      });
    };

    return {
      ...toRefs(state),
      cilBank,
      cilWarning,
      cilCash,
      cilDelete,
      cilCloudUpload,
      cilSearch,
      formatterMoney,

      selectedPagination,
      getNameEstadoConciliacion,
      readData,
      loadData,
      medioPagoClic,
      quitar,
    };
  },
};
</script>

<style></style>
