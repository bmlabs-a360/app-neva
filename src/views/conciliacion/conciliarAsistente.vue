<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
  <!-- LOAD FILE -->
  <CRow>
    <CCol :md="12">
      <CCard
        id="conciliacion_asistida"
        class="mb-4"
        data-aos="fade-up"
        data-aos-easing="ease"
      >
        <CCardHeader>
          <div style="display: flex">
            <CModalTitle>Proceso de Conciliación Asistida</CModalTitle
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
        <CCardBody
          >Asistente de mapeo de columnas arrastrable y carga de archivo
          <CContainer>
            <CRow>
              <div>
                <!--CModalTitle>Draggable file upload and column mapping wizard</CModalTitle-->
                <CContainer class="pt-2">
                  <CNav variant="tabs" role="tablist">
                    <CNavItem>
                      <CNavLink
                        id="paso1"
                        href="javascript:void(0);"
                        :active="selectedTab === 1"
                        @click="
                          () => {
                            selectedTab = 1;
                          }
                        "
                      >
                        <div
                          :style="{
                            'border-color': tabs[0].colorTab,
                            color: tabs[0].colorTab,
                          }"
                        >
                          {{ tabs[0].label }}
                        </div>
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        id="paso2"
                        href="javascript:void(0);"
                        :active="selectedTab === 2"
                        @click="
                          () => {
                            readFile();
                          }
                        "
                      >
                        <div
                          :style="{
                            'border-color': tabs[1].colorTab,
                            color: tabs[1].colorTab,
                          }"
                        >
                          {{ tabs[1].label }}
                        </div>
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        id="paso3"
                        href="javascript:void(0);"
                        :active="selectedTab === 3"
                        @click="
                          () => {
                            readColumns();
                          }
                        "
                      >
                        <div
                          :style="{
                            'border-color': tabs[2].colorTab,
                            color: tabs[2].colorTab,
                          }"
                        >
                          {{ tabs[2].label }}
                        </div>
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent>
                    <CTabPane
                      role="tabpanel"
                      aria-labelledby="home-tab"
                      :visible="selectedTab === 1"
                    >
                      <CContainer
                        class="pt-2"
                        :style="`background: ${tabs[0].color}; color: black;`"
                      >
                        <CModalTitle class="text-center">{{
                          tabs[0].description
                        }}</CModalTitle>
                        <br />

                        <CRow>
                          <CCol sm="12" md="4" lg="8">
                            <CLink
                              v-c-tooltip="{
                                content:
                                  '(Formatos válidos: txt, csv, xls, xlsx)',
                                placement: 'bottom',
                              }"
                            >
                              <CFormInput
                                accept=".txt,.csv,.xls,.xlsx"
                                :disabled="isLoadingFile"
                                type="file"
                                id="formFile"
                                size="sm"
                                label="Carga de archivo conciliación"
                              />
                            </CLink>
                          </CCol>
                          <CCol sm="12" md="4" lg="4">
                            <div class="text-end">
                              <CButton
                                :disabled="isLoadingFile"
                                color="primary"
                                @click="readFile"
                                >Siguiente</CButton
                              >
                            </div>
                          </CCol> </CRow
                        ><br />
                        <CButton
                          id="ejemplo_conciliacion"
                          size="sm"
                          color="info"
                          variant="outline"
                          s
                          shape="rounded-pill"
                          @click="exportEjemplo()"
                        >
                          <CIcon icon="cil-cloud-download" />&nbsp;Archivo
                          Ejemplo</CButton
                        >
                        <br /><br />
                      </CContainer>
                    </CTabPane>
                    <CTabPane
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                      :visible="selectedTab === 2"
                    >
                      <CContainer
                        class="pt-3"
                        :style="`background: ${tabs[1].color}; color: black;`"
                      >
                        <CModalTitle class="text-center">{{
                          tabs[1].description
                        }}</CModalTitle>
                        <br />
                        <CRow>
                          <CCol sm="1" md="1" lg="1">
                            <div class="text-end">
                              <CButton
                                :disabled="isLoadingColumns"
                                color="primary"
                                @click="selectedTab = 1"
                                >Anterior</CButton
                              >
                            </div>
                          </CCol>
                          <CCol sm="12" md="4" lg="4">
                            <CCol class="text-center">
                              <h6>
                                Coincidencia de asignación de columnas
                              </h6></CCol
                            >
                            <div class="text-end">
                              <draggable
                                v-model="arrayMapping"
                                group="people"
                                @start="drag = true"
                                @end="drag = false"
                                item-key="id"
                              >
                                <template #item="{ element }">
                                  <div
                                    class="list-group-item"
                                    style="
                                      cursor: pointer;
                                      border-style: solid;
                                      border-color: #e6e0e0;
                                      border-width: 1px;
                                    "
                                  >
                                    {{ element.name }}
                                  </div>
                                </template>
                              </draggable>
                            </div>
                          </CCol>
                          <CCol class="text" sm="12" md="4" lg="4">
                            <CCol class="text-center">
                              <h6>Columnas de referencia de salida</h6></CCol
                            >
                            <div class="text">
                              <draggable
                                disabled
                                v-model="arrayMatch"
                                group="people"
                                @start="drag = true"
                                @end="drag = false"
                                item-key="id"
                              >
                                <template #item="{ element }">
                                  <div
                                    class="list-group-item"
                                    style="
                                      cursor: pointer;
                                      border-style: solid;
                                      border-color: #e6e0e0;
                                      border-width: 1px;
                                    "
                                  >
                                    {{ element.name }}
                                  </div>
                                </template>
                              </draggable>
                            </div>
                          </CCol>
                          <CCol sm="4" md="1" lg="1">
                            <div class="text-end">
                              <CButton
                                :disabled="isLoadingColumns"
                                color="primary"
                                @click="readColumns"
                                >Siguiente</CButton
                              >
                            </div>
                          </CCol>
                        </CRow>
                        <br />
                      </CContainer>
                    </CTabPane>
                    <CTabPane
                      role="tabpanel"
                      aria-labelledby="contact-tab"
                      :visible="selectedTab === 3"
                    >
                      <CContainer
                        class="pt-3"
                        :style="`background: ${tabs[2].color}; color: black;`"
                      >
                        <CModalTitle class="text-center">{{
                          tabs[2].description
                        }}</CModalTitle>
                        <br />
                        <CRow>
                          <CCol :md="12">
                            <CCard
                              class="mb-4"
                              data-aos="fade-up"
                              data-aos-easing="ease"
                              data-aos-delay="300"
                            >
                              <CCardHeader>
                                <CRow>
                                  <CCol :sm="7">
                                    <strong
                                      >Listado de Conciliaciones
                                      Obtenidas</strong
                                    >&nbsp;<br />
                                  </CCol>
                                  <CCol :sm="5">
                                    <div style="padding-top: 0.3rem">
                                      <CLink
                                        v-c-tooltip="
                                          'Subir datos obtenidos de concilación'
                                        "
                                      >
                                        <CButton
                                          color="primary"
                                          @click="
                                            () => {
                                              loadData();
                                            }
                                          "
                                          >Subir
                                          <i class="cil-cloud-upload"></i>
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
                                      <CTableHeaderCell
                                        class="text-center"
                                        scope="col"
                                        >Identificador</CTableHeaderCell
                                      >
                                      <CTableHeaderCell
                                        class="text-center"
                                        scope="col"
                                        >Medio&nbsp;Pago</CTableHeaderCell
                                      >
                                      <CTableHeaderCell
                                        class="text-center"
                                        scope="col"
                                        >Tipo Movimiento</CTableHeaderCell
                                      >
                                      <CTableHeaderCell
                                        class="text-center"
                                        scope="col"
                                        >Monto Afecto</CTableHeaderCell
                                      >
                                      <CTableHeaderCell
                                        class="text-center"
                                        scope="col"
                                        >Estado</CTableHeaderCell
                                      >
                                      <CTableHeaderCell
                                        class="text-center"
                                        scope="col"
                                        >Fecha&nbsp;Venta</CTableHeaderCell
                                      >
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>
                                    <CTableRow
                                      v-if="!conciliaciones"
                                      color="warning"
                                    >
                                      <CTableDataCell
                                        colspan="9"
                                        class="text-center"
                                        ><strong id="textEmpty"
                                          >Utilice los filtos para buscar
                                          conciliaciones</strong
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
                                        cons.mediopago_id
                                      }}</CTableDataCell>
                                      <CTableDataCell class="text-center"
                                        >VENTA</CTableDataCell
                                      >
                                      <CTableDataCell class="text-center">{{
                                        formatterMoney.format(cons.monto_afecto)
                                      }}</CTableDataCell>
                                      <!--CTableDataCell class="text-center">{{ getNameEstadoConciliacion(cons.estado) }}</CTableDataCell-->
                                      <CTableDataCell class="text-center">
                                        <CBadge
                                          :color="
                                            getStyleConciliacionSegunEstado(
                                              cons.estado
                                            )
                                          "
                                        >
                                          {{
                                            getNameEstadoConciliacion(
                                              cons.estado
                                            )
                                          }}
                                        </CBadge>
                                      </CTableDataCell>
                                      <CTableDataCell class="text-center">{{
                                        new Date(
                                          cons.fecha_venta
                                        ).toLocaleString()
                                      }}</CTableDataCell>
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
                                  :next-text="'Siguiente'"
                                  :container-class="'pagination'"
                                  :page-class="'page-item'"
                                >
                                </paginate>
                              </CCardFooter>
                            </CCard>
                          </CCol>
                        </CRow>
                        <br />
                      </CContainer>
                    </CTabPane>
                  </CTabContent>
                </CContainer>
              </div>
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
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import swal from "sweetalert";
import ApiNeva from "@/api/ApiNeva";
import Paginate from "vuejs-paginate-next";
import {
  csvToObjectWizard,
  csvToHeadersWizard,
  xlsxToHeadersWizard,
  xlsxToObjectWizard,
  getStyleConciliacionSegunEstado,
  difDias,
} from "@/Helper/util";
import draggable from "vuedraggable";
import axios from "axios";
import archivoEjemplo from "@/assets/fileSample/ejemplo.xlsx";
import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import { asistenteConciliacion } from "@/_menuOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "Conciliar Draggable",
  components: {
    draggable,
    paginate: Paginate,
    VOnboardingWrapper,
  },
  methods: {
    csvToObjectWizard,
    csvToHeadersWizard,
    xlsxToHeadersWizard,
    xlsxToObjectWizard,
    difDias,
    renderSteps,
    getStyleConciliacionSegunEstado,
    difDias,
  },
  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);

    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const formatterMoney = globalProperties.$formatterMoney;
    const ApiKey = globalProperties.$apiKey;
    const localMenuOnvoarding = asistenteConciliacion;

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
      objsWizardSave: [],
      tabPaneActiveKey: 1,
      configuracionWizard: [],
      formasPago: null,
      configuracionWizard: [],
      conciliaciones: null,
      isLoadingFile: false,
      isLoadingColumns: false,
      totalconciliacion: 0,
      initialPage: 1,
      sizePage: 10,
      arrayMapping: [],
      arrayMatch: [],
      drag: false,
      jsonConciliacionBody: "",
      selectedTab: null,
      tabs: [
        {
          label: "Paso 1",
          value: 1,
          description: "Subir archivo",
          color: "#ebedef",
          colorTab: "black",
          active: true,
        },
        {
          label: "Paso 2",
          value: 2,
          description: "Asignación de columnas de coincidencia",
          color: "#ebedef",
          colorTab: "black",
          active: false,
        },
        {
          label: "Paso 3",
          value: 3,
          description: "Vista Previa",
          color: "#e6e0e0",
          colorTab: "black",
          active: false,
        },
      ],
    });

    const selectedPagination = (pageNum) => {
      state.initialPage = pageNum;
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

    const validateExtencion = (arrayTypes, extension) => {
      let isSuccess = true;

      (extension = extension.toLowerCase()), //file extension from input file
        (isSuccess = arrayTypes.indexOf(extension) > -1); //is extension in acceptable types

      if (!isSuccess) {
        swal(
          "Archivo de conciliación",
          "Por favor seleccione un archivo para conciliar con formato válido: " +
            arrayTypes.toString(),
          "warning"
        );
        return false;
      }
      return true;
    };

    const esExtencion = (arrayTypes, extension) => {
      let isSuccess = true;

      (extension = extension.toLowerCase()), //file extension from input file
        (isSuccess = arrayTypes.indexOf(extension) > -1); //is extension in acceptable types

      if (!isSuccess) return false;

      return true;
    };

    const randomKey = () => {
      var miIdRandom = Math.random().toString(36).slice(2).toString();
      return miIdRandom.substring(0, 10);
    };

    const readColumns = () => {
      var referencia_id = randomKey();
      let arrayMappingNewOrder = [];
      let arrayMappingNewOrderWizardSave = [];
      var referenciaTabla = state.configuracionWizard.filter((x) =>
        x.key.includes("WIZARD_TABLE")
      )[0].valor;
      //console.log("referenciaTabla",referenciaTabla)
      state.jsonConciliacionBody.forEach((element) => {
        var objMappingNewOrder = "{";
        var objMappingNewOrderWizard = "{";
        for (var propertyName in element) {
          if (element.hasOwnProperty(propertyName))
            for (let k = 0; k < state.arrayMatch.length; k++) {
              let headersMatch = state.arrayMatch[k];
              let headersMapping = state.arrayMapping[k];
              if (headersMapping.name == `${propertyName}`) {
                objMappingNewOrder +=
                  k == 0
                    ? `"${headersMatch.name}" : "${element[propertyName]}" , "authcode" :  "${element[propertyName]}"`
                    : `, "${headersMatch.name}" : "${element[propertyName]}" `;

                objMappingNewOrderWizard +=
                  k == 0
                    ? `"Id":"0", "ReferenciaId" :  "${referencia_id}", "ReferenciaTabla" :  "${referenciaTabla}", "${headersMatch.key}" : "${element[propertyName]}"`
                    : `, "${headersMatch.key}" : "${element[propertyName]}" `;
              }
            }
        }
        objMappingNewOrder +=
          ', "tipoMovimiento" : "VENTA", "cuotas": "0", "montoCuota": "0", "montoExento": "0", "estado": "0" }';
        objMappingNewOrderWizard += "}";
        //console.log("objMappingNewOrder",objMappingNewOrder)
        //console.log("objMappingNewOrderWizard",objMappingNewOrderWizard)
        arrayMappingNewOrder.push(JSON.parse(objMappingNewOrder));
        arrayMappingNewOrderWizardSave.push(
          JSON.parse(objMappingNewOrderWizard)
        );
      });
      state.selectedTab = 3;
      state.conciliaciones = arrayMappingNewOrder;
      state.objsWizardSave = arrayMappingNewOrderWizardSave;
    };

    const readFile = async () => {
      var fileTypesWizard = ["xls", "txt", "csv", "xlsx", "xls"];
      let file = document.getElementById("formFile").files[0];
      if (!file) {
        swal(
          "Archivo de conciliación",
          "Por favor seleccione un archivo para conciliar",
          "warning"
        );
        state.selectedTab = 1;
        state.tabs[0].colorTab = "red";
        return false;
      }
      var extension = file.name.split(".").pop().toLowerCase();
      let reader = new FileReader();

      if (!validateExtencion(fileTypesWizard, extension)) return;

      if (esExtencion(["txt", "csv"], extension)) reader.readAsText(file);
      else if (esExtencion(["xlsx", "xls"], extension))
        reader.readAsArrayBuffer(file);

      reader.onload = function () {
        let headersWizard;
        if (esExtencion(["txt", "csv"], extension))
          headersWizard = csvToHeadersWizard(reader.result);
        else if (esExtencion(["xlsx", "xls"], extension))
          headersWizard = xlsxToHeadersWizard(reader.result);
        if (!headersWizard) {
          swal(
            "Archivo de conciliación",
            "Verifique el archivo que intenta cargar cumple con el formato correcto",
            "warning"
          );
          return;
        }
        state.arrayMapping = headersWizard;
        if (esExtencion(["txt", "csv"], extension))
          state.jsonConciliacionBody = csvToObjectWizard(reader.result);
        else if (esExtencion(["xlsx", "xls"], extension))
          state.jsonConciliacionBody = xlsxToObjectWizard(reader.result);
        if (!state.jsonConciliacionBody) return;
        state.selectedTab = 2;
        state.tabs[0].colorTab = "black";
        swal(
          "Conciliación",
          "Se ha leido correctamente el archivo. Ahora arrastra las columnas de entrada para que coincida en el orden con la referencia de columnas de salida",
          "info"
        );
      };
      reader.onerror = function (error) {
        console.log(error);
        swal(
          "Archivo de conciliación",
          "Ha ocurrido un error durante la carga del archivo de conciliación",
          "warning"
        );
      };
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
      ApiNeva.post("Wizard/WizardUploader", state.objsWizardSave, {
        headers: header,
      })
        .then((response) => {
          //localStorage.isLoadingFile = false; state.isLoadingFile = false; document.getElementById('medioPagoIdLoadData').selectedIndex = 0;
          console.log("WizardUploader", response);
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
              error.response.data.detail.includes("duplicate key")||
              error.response.data.detail.includes("llave duplicada")
              )
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
            error.response.status == 500 &&
            error.response.data.detail.includes(
              "invalid transaction termination"
            )
          ) {
            swal({
              title: "Proceso de Conciliación Automática",
              text: "Transacción invalida: Una o mas transacciones ya se encuentran registrados o valor con formato invalido",
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

    const formatDecimal = (valor) => {
      if (!valor) return;
      valor = valor.toString();
      return parseFloat(valor.replace(".", "").replace(",", "."));
    };

    const exportEjemplo = async () => {
      try {
        axios
          .get(archivoEjemplo, { responseType: "blob" })
          .then((response) => {
            //console.log("response",response.data)
            const blob = new Blob([response.data], {
              type: "application/xlsx",
            });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "example.xlsx";
            link.click();
            // URL.revokeObjectURL(link.href)
          })
          .catch(console.error);
      } catch (error) {
        console.log("error", error);
      }
    };

    const oncreated = () => {
      state.selectedTab = 1;
      if (typeof localStorage.isLoadingFile === "undefined") {
        localStorage.isLoadingFile = false;
      }
      state.isLoadingFile =
        localStorage.isLoadingFile == "false" ? false : true;

      ApiNeva.get("Config/GetAll", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.configuracionWizard = response.data.filter((x) =>
            x.key.includes("WIZARD")
          );
          var columnWizar = state.configuracionWizard.filter((x) =>
            x.key.includes("WIZARD_MATCH_COLUMN")
          );
          state.arrayMatch = [];
          for (let index = 0; index < columnWizar.length; index++) {
            const element = columnWizar[index];
            let columnName = element.key
              .replace("WIZARD_MATCH_", "")
              .replace("_", "")
              .toLowerCase();
            columnName =
              columnName.charAt(0).toUpperCase() + columnName.slice(1);
            state.arrayMatch.push({
              id: index + 1,
              name: element.valor,
              key: columnName,
            });
          }
        })
        .catch((error) => console.log(error));
    };

    const onBoarding = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboarding = await onBoardingHelper.getUserSeeMenu(
          user.id,
          "asistenteConciliacion",
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
          "asistenteConciliacion",
          header
        );
      }
    };

    onMounted(() => {
      oncreated();
      onBoarding();
      if (!state.isonboarding) {
        setTimeout(() => {
          start();
        }, 500);
      }
    });

    return {
      ...toRefs(state),
      formatterMoney,
      selectedPagination,
      getNameEstadoConciliacion,
      readFile,
      loadData,
      readColumns,
      randomKey,
      exportEjemplo,
    };
  },
};
</script>
