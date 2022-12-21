<template>
  <!-- RESUMEN -->
  <CRow data-aos="fade-up" data-aos-easing="ease" data-aos-delay="300">
    <CCol :md="12">
      <CCard class="mb-4">
        <CCardBody>
          <CRow>
            <CCol :sm="6" :md="6" :xs="6" :lg="6">
              <h4 id="traffic" class="card-title mb-0">
                Resumen Transacciones
              </h4>

              <div class="small text-medium-emphasis">
                {{
                  getCurrenDateResumen() ||
                  "Seleccione una transacción para ver su resumen"
                }}
              </div>
            </CCol>
            <CCol :sm="6" :md="6" :xs="6" :lg="6">
              <CFormSelect
                id="idCanalResumenSelected"
                v-model="idCanalResumenSelected"
                size="sm"
                @change="changeResumenCanal"
              >
                <option value="0" :key="0">Seleccione un canal</option>
                <option v-for="cn in canales" :key="cn.id" :value="cn.id">
                  {{ cn.nombre }} - ({{ cn.accouncode }})
                </option>
              </CFormSelect>
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
                >Cant.
                {{ resumenCanalSelected.totalTransaccionEmitido || 0 }} ({{
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
                >Cant.
                {{ resumenCanalSelected.totalTransaccionFracaso || 0 }} ({{
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
                {{ resumenCanalSelected.totalTransaccionContabilizado || 0 }}
                ({{
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
  </CRow>
  <!-- RESUMEN -->

  <!-- LIST -->
  <CRow data-aos="fade-up" data-aos-easing="ease" data-aos-delay="300">
    <CCol :md="12">
      <CCard class="mb-4">
        <CCardHeader>
          <CRow>
            <CCol :sm="6" :md="6" :xs="6" :lg="6">
              <strong>Transacciones</strong>&nbsp;<small>{{
                getCurrenDateResumen()
              }}</small
              ><br />
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
                <CTableHeaderCell class="text-start" scope="col"
                  >Estado</CTableHeaderCell
                >
                <CTableHeaderCell class="text-end" scope="col"
                  >Porcentaje</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Transacciones</CTableHeaderCell
                >
                <CTableHeaderCell class="text-end" scope="col"
                  >Total</CTableHeaderCell
                >
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow
                v-for="resumen in resumenTransaccionEstado"
                :key="resumen.estado"
                :color="getStyleSegunEstado(resumen.estado)"
              >
                <CTableDataCell class="text-center">&nbsp;</CTableDataCell>
                <CTableDataCell class="text-start">{{
                  resumen.estado
                }}</CTableDataCell>
                <CTableDataCell class="text-end"
                  >{{ resumen.porcentaje }}%</CTableDataCell
                >
                <CTableDataCell class="text-center">{{
                  resumen.cantTransacciones
                }}</CTableDataCell>
                <CTableDataCell class="text-end"
                  ><strong>{{
                    formatterMoney.format(resumen.total)
                  }}</strong></CTableDataCell
                >
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <!-- LIST -->

  <!-- CHART -->
  <CRow data-aos="fade-up" data-aos-easing="ease" data-aos-delay="300">
    <CCol :md="12">
      <CCard class="mb-4">
        <CCardHeader>
          <CRow>
            <CCol :md="12">
              <strong>Transacciones por Forma de Pago</strong>&nbsp;<small
                >Resumen</small
              >
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CChart
            type="bar"
            :data="resumenTransaccionFormaPago"
            labels="Meses"
          />
        </CCardBody>
      </CCard>
    </CCol>

    <CCol :xs="12" :sm="12" :md="6">
      <CCard class="mb-4">
        <CCardHeader>
          <CRow>
            <CCol :md="12">
              <strong>Conciliación por estado</strong>&nbsp;<small
                >Resumen</small
              >
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CChart type="pie" :data="resumenConcilicionEstado" />
        </CCardBody>
      </CCard>
    </CCol>

    <CCol :xs="12" :sm="12" :md="6">
      <CCard class="mb-4">
        <CCardHeader>
          <CRow>
            <CCol :md="12">
              <strong>Total de transacciones por medio de pago</strong
              >&nbsp;<small>Resumen</small>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CChart type="doughnut" :data="resumenTransaccionFormaPagoTotal" />
        </CCardBody>
      </CCard>
    </CCol>

    <CCol :xs="12" :sm="12" :md="12">
      <CCard class="mb-4">
        <CCardHeader>
          <CRow>
            <CCol :md="12">
              <strong>Transacciones por Canal</strong>&nbsp;<small
                >Resumen</small
              >
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CChart
            type="line"
            :wrapper="false"
            :data="resumenTransaccionCanal"
            :options="{
              skipNull,
            }"
          />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <!-- CHART -->
</template>

<script>
import { getCurrentInstance, reactive, toRefs } from "vue";
import { CChart } from "@coreui/vue-chartjs";
import ApiNeva from "@/api/ApiNeva";
import { getStyleSegunEstado } from "@/Helper/util";

export default {
  name: "Dashboard",
  components: {
    CChart,
  },
  setup() {
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const formatterMoney = globalProperties.$formatterMoney;
    const ApiKey = globalProperties.$apiKey;

    const header = {
      Authorization: "Bearer " + localStorage.token,
      ApiKey,
    };

    //#region Funciones Locales
    const state = reactive({
      canales: [],
      resumenTransaccionFormaPagoTotal: [],
      resumenConcilicionEstado: [],
      resumenTransaccionEstado: [],
      resumenTransaccionFormaPago: [],
      resumenTransaccionCanal: [],
      dateSelected: "",
      dataTransaccionFormaPago: {},
      resumenCanalSelected: {},
      idCanalResumenSelected: 0,
    });

    const getCurrenDateResumen = () => {
      return state.dateSelected;
    };

    const getResumenTransaccionEstado = (idcanal) => {
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

      ApiNeva.get(
        "Transaccion/TransaccionesResumenEstado?canalId=" +
          idcanal +
          "&inicio=" +
          primerDia +
          "&fin=" +
          ultimoDia,
        { headers: header }
      )
        .then((response) => {
          if (response.status != 200) return false;
          state.resumenTransaccionEstado = response.data;
        })
        .catch((error) => console.log(error));
    };

    const getResumenTransaccionFormaPago = (idcanal) => {
      let date = new Date();
      let year = date.getFullYear();

      ApiNeva.get(
        "Transaccion/TransaccionResumenFormasPago?canalId=" +
          idcanal +
          "&anio=" +
          year,
        { headers: header }
      )
        .then((response) => {
          if (response.status != 200) return false;

          let dataSet = [];
          let labels = [];
          let data = response.data;

          //Obtengo meses para mostrar en grafico en orden
          data.forEach((element) => {
            element.mesDataList.forEach((m) => {
              if (!labels.includes(capitalize(m.mes))) {
                labels.push(capitalize(m.mes));
              }
            });
          });

          data.forEach((element) => {
            if (element.mesDataList.length < labels.length) {
              labels.forEach((l) => {
                let mesFind = element.mesDataList.find(
                  (x) => x.mes.toLowerCase() == l.toLowerCase()
                );
                if (!mesFind) {
                  element.mesDataList.push({
                    mes: l,
                    cantidad: 0,
                  });
                }
              });

              //Ordeno
              let newMesDataList = [];
              labels.forEach((l) => {
                let mesFind = element.mesDataList.find(
                  (x) => x.mes.toLowerCase() == l.toLowerCase()
                );
                newMesDataList.push(mesFind);
              });
              element.mesDataList = newMesDataList;
            }
          });

          data.forEach((element) => {
            let elemento = {
              label: element.descripcion,
              backgroundColor: getStyleSegunFormaPago(element.descripcion),
              data: element.mesDataList.map((x) => x.cantidad),
            };
            dataSet.push(elemento);
          });

          state.resumenTransaccionFormaPago = {
            labels: labels,
            datasets: dataSet,
          };
        })
        .catch((error) => console.log(error));
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

    const getResumenConciliacion = () => {
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
      ApiNeva.post(
        "Conciliacion/ConciliacionResumenEstados?inicio=" +
          primerDia +
          "&fin=" +
          ultimoDia,
        null,
        { headers: header }
      )
        .then((response) => {
          if (response.status != 200) return false;
          var dataSet = [];
          var labels = [];
          var background = [];
          var cantidades = [];
          response.data.forEach((element) => {
            labels.push(capitalize(element.estado));

            cantidades.push(element.cantidad);
            background.push(getStyleSegunEstadoConciliacion(element.estado));
          });

          dataSet.push({
            backgroundColor: background,
            data: cantidades,
          });

          state.resumenConcilicionEstado = {
            labels: labels,
            datasets: dataSet,
          };
        })
        .catch((error) => console.log(error));
    };

    const getStyleSegunEstadoConciliacion = (estado) => {
      switch (estado.toLowerCase()) {
        case "no existe":
          return "#00D8FF";
        case "diferencia":
          return "#E46651";
        case "conciliado":
          return "#41B883";
        case "no conciliado":
          return "#DD1B16";
        default:
          return "";
      }
    };

    const getResumenTransaccionCanal = () => {
      let date = new Date();
      let year = date.getFullYear();

      ApiNeva.get("Transaccion/TransaccionResumenCanal?anio=" + year, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;

          let dataSet = [];
          let labels = [];
          let data = response.data;

          data.forEach((element) => {
            element.mesDataList.forEach((m) => {
              if (!labels.includes(capitalize(m.mes))) {
                labels.push(capitalize(m.mes));
              }
            });

            let elemento = {
              label: element.descripcion,
              backgroundColor: "rgba(220, 220, 220, 0.2)",
              borderColor: "rgba(220, 220, 220, 1)",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "#fff",
              data: element.mesDataList.map((x) => x.cantidad),
            };
            dataSet.push(elemento);
          });

          state.resumenTransaccionCanal = {
            labels: labels,
            datasets: dataSet,
          };
        })
        .catch((error) => console.log(error));
    };

    async function getAllCanal() {
      let response = await ApiNeva.get("Canal/Canales", {
        headers: header,
      });
      if (response.status == 200) {
        state.canales = await response.data;
        return await response.data;
      }
    }

    const capitalize = (word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    };

    const getStyleSegunFormaPago = (formapago) => {
      switch (formapago) {
        case "TRANSBANK":
          return "#f87979";
        case "MACH":
          return "#bf7fff";
        case "KLAP":
          return "#7fff94";
        case "BESTADO":
          return "#fffa7f";
        case "PAYPAL":
          return "#7f94ff";
        case "KHIPU":
          return "#ffb07f";
        case "PAIKU":
          return "#4D39E9";
        case "MPAGO":
          return "#007EB5";
        case "PAGO46":
          return "#27C038";
        case "KLARNA":
          return "#FFE6CC";
        case "FLOW":
          return "#111111";
        case "CHEK":
          return "#8145A0";
        case "OPENPAY":
          return "#004481";
        default:
          return "dark";
      }
    };

    const changeResumenCanal = () => {
      let idCanalSelected = document.getElementById("idCanalResumenSelected")
        .options[
        document.getElementById("idCanalResumenSelected").selectedIndex
      ].value;
      if (!idCanalSelected || idCanalSelected == 0) return;

      state.idCanalResumenSelected = idCanalSelected;
      getResumenGlobalCanal(idCanalSelected);
    };

    const getResumenTransaccionFormaPagoTotal = (idcanal) => {
      let date = new Date();
      let year = date.getFullYear();

      ApiNeva.get(
        "Transaccion/TransaccionResumenFormasPagoTotal?canalId=" +
          idcanal +
          "&anio=" +
          year,
        { headers: header }
      )
        .then((response) => {
          if (response.status != 200) return false;
          let dataSet = [];
          let labels = [];
          let background = [];
          let cantidades = [];
          response.data.forEach((element) => {
            labels.push(capitalize(element.mes));

            cantidades.push(element.cantidad);
            background.push(getStyleSegunFormaPago(element.mes));
          });

          dataSet.push({
            data: cantidades,
            backgroundColor: background,
          });

          state.resumenTransaccionFormaPagoTotal = {
            labels: labels,
            datasets: dataSet,
          };
        })
        .catch((error) => console.log(error));
    };

    getAllCanal().then((cnls) => {
      if (cnls == null) return false;
      state.idCanalResumenSelected = cnls[0].id;
      getResumenGlobalCanal(cnls[0].id);
      getResumenGlobalConciliacion();
    });

    const getResumenGlobalCanal = (id) => {
      getResumenTransaccionEstado(id);
      getResumenTransaccionFormaPago(id);
      getResumenBycanal(id);
      getResumenTransaccionFormaPagoTotal(id);
      getResumenTransaccionCanal();
      //Aqui podemos agregar resumenes del canal seleccionado
    };

    const getResumenGlobalConciliacion = () => {
      getResumenConciliacion();
    };
    //#endregion Funciones Locales

    return {
      ...toRefs(state),
      getCurrenDateResumen,
      getStyleSegunEstado,
      getStyleSegunFormaPago,
      formatterMoney,
      changeResumenCanal,
    };
  },
  data() {
    return {};
  },
};
</script>
