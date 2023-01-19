<template>
  <!--<VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />-->
  <!-- LOAD FILE -->
  <CRow>
    <CCol :md="12">
      <CCard
        id="conciliacion_asistida"
        class="mb-4"
        data-aos="fade-up"
        data-aos-easing="ease"
      >
        <CCardBody>
          <CContainer>
            <CRow>
                <div>
                    <!--CModalTitle>Draggable file upload and column mapping wizard</CModalTitle-->
                    <CContainer class="pt-2">
                        <CNav variant="tabs" role="tablist">
                            <CNavItem>
                                <CNavLink id="paso1"
                                    href="javascript:void(0);"
                                    :active="selectedTab === 1"
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
                            <CNavItem>
                                <CNavLink 
                                    id="paso4"
                                    href="javascript:void(0);"
                                    :active="selectedTab === 4"
                                >
                                    <div
                                        :style="{
                                            'border-color': tabs[3].colorTab,
                                            color: tabs[3].colorTab,
                                        }"
                                        >
                                        {{ tabs[3].label }}
                                    </div>  
                                </CNavLink>
                            </CNavItem>
                        </CNav>

                        <CTabContent>
                          <!--PASO 1-->
                          <CTabPane
                            role="tabpanel"
                            aria-labelledby="home-tab"
                            :visible="selectedTab === 1"
                            >
                            <CContainer
                                class="pt-2"
                                :style="`background: ${tabs[0].color}; color: black;`"
                            >  
                              <CRow>
                                <CCol sm="6" md="6" lg="6">
                                      <CFormLabel class="mt-2">1 {{tabs[0].description}}</CFormLabel>
                                </CCol>
                              </CRow>
                              <CModalTitle class="text-center">
                                Evaluación
                              </CModalTitle>
                              <br />

                              <CRow>
                                <CCol sm="6" md="6" lg="6">
                                      <CFormLabel for="tipoevaluacion"  class="mt-3">Tipo de evaluación</CFormLabel>
                                </CCol>     
                                <CCol sm="6" md="6" lg="6">
                                      <CFormSelect
                                          id="idEvaluacionSelected"
                                          size="sm"
                                          @change="changeEvaluacion"
                                          v-model="idEvaluacionSelected"
                                      >
                                        <option value="0" :key="0">Seleccione tipo evaluación</option>
                                        <option v-for="evaluacion in evaluaciones" :value="evaluacion.id" :key="evaluacion.id">
                                            {{ evaluacion.nombre }}
                                        </option>
                                      </CFormSelect>
                                </CCol>
                              </CRow>

                              <CRow>
                                <CCol sm="12" md="12" lg="12" class="text-center">
                                      <CFormLabel class="mt-4"> 
                                        <h6> % importancia relativa por área </h6>
                                      </CFormLabel>
                                </CCol> 
                              </CRow>   

                              <CRow v-for="area in segmentacionAreasByEvaluacion" :key="area.id">
                                <CCol sm="6" md="6" lg="6" >
                                      <CFormLabel for="tipoevaluacion" class="mt-1" > {{area.nombreArea}} </CFormLabel>
                                </CCol>  
                                  <CCol sm="4" md="4" lg="4">
                                    <CFormInput
                                      :id="area.id"
                                      placeholder="Porcentaje"
                                      type="range"
                                      class="mt-1"
                                      name="porcentajeAreas"
                                      min="0" 
                                      max="100"
                                      :value="area.valor"
                                      @change="CambioPorcentajePaso1(area.id)"
                                    />
                                  </CCol>
                                  <CCol sm="2" md="2" lg="2">
                                    <span :id="'porc-'+ area.id"> {{area.valor}} %</span>
                                  </CCol>
                              </CRow>

                              <CRow class="justify-content-end">
                                  <CCol sm="2" md="2" lg="2">
                                    <span class="d-none text-success" id="totalporcentaje">{{totalPorcentaje}} %</span>
                                  </CCol>
                              </CRow>

                              <CRow>
                                <CCol sm="12" md="12" lg="12">
                                    <div class="text-center mt-3" >
                                    <CButton
                                        :disabled="isLoadingFile"
                                        color="primary"
                                        @click="irPaso2"
                                        >Siguiente</CButton
                                    >
                                    </div>
                                </CCol> 
                              </CRow>
                            </CContainer>
                          </CTabPane>
                          <!--FIN PASO 1-->

                          <!--PASO 2-->
                          <CTabPane
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                            :visible="selectedTab === 2"
                            >
                            <CContainer
                                class="pt-3"
                                :style="`background: ${tabs[1].color}; color: black;`"
                            >
                              <CRow>
                                <CCol sm="6" md="6" lg="6">
                                      <CFormLabel class="mt-2">2 {{tabs[1].description}}</CFormLabel>
                                </CCol>
                              </CRow>
                              <CModalTitle class="text-center">
                                Evaluación
                              </CModalTitle>
                              <br />

                              <CRow>
                                <CCol sm="6" md="6" lg="6">
                                      <CFormLabel for="tipoevaluacion" class="mt-2">Tipo de evaluación</CFormLabel>
                                </CCol>     
                                <CCol sm="6" md="6" lg="6">
                                      <CFormSelect
                                          id="tipoevaluacionPaso2"
                                          size="sm"
                                          class="mt-2"
                                          disabled
                                      >
                                        <option :value="idEvaluacionSelected" :key="idEvaluacionSelected">
                                          {{ evaluacionSelected.nombre }}
                                        </option>
                                      </CFormSelect>
                                </CCol>
                              </CRow>

                              <CRow>
                                <CCol sm="6" md="6" lg="6">
                                      <CFormLabel for="tipoAreaPaso2" class="mt-2">Nombre área</CFormLabel>
                                </CCol>     
                                <CCol sm="6" md="6" lg="6">
                                      <CFormSelect
                                          id="idTipoAreaSelected"
                                          size="sm"
                                          v-model="idTipoAreaSelected"
                                          @change="changeSegmentacionArea"
                                          class="mt-2"
                                      >
                                        <option value="0" :key="0">Seleccione nombre área</option>
                                        <option v-for="segmentacionArea in segmentacionAreasByEvaluacion" :value="segmentacionArea.id" :key="segmentacionArea.id">
                                            {{ segmentacionArea.nombreArea }}
                                        </option>
                                      </CFormSelect>
                                </CCol>
                              </CRow>

                              <CRow>
                                <CCol sm="12" md="12" lg="12" class="text-center">
                                    <CFormLabel class="mt-4"> 
                                      <h6>% importancia estratégica por sub área</h6>
                                    </CFormLabel>
                                </CCol>
                              </CRow>

                              <CRow v-for="subArea in segmentacionSubAreasbyAreaSelected" :key="subArea.id" >
                                <CCol sm="6" md="6" lg="6" >
                                  <CFormLabel for="tipoSubAreaPaso2" class="mt-1"> {{subArea.nombreSubArea}}</CFormLabel>
                                </CCol>     
                                <CCol sm="4" md="4" lg="4">
                                  <CFormInput
                                    :id="subArea.id"
                                    placeholder="Porcentaje"
                                    type="range"
                                    class="mt-1"
                                    name="porcentajeSubAreas"
                                    min="0" 
                                    max="100"
                                    :value="subArea.valor"
                                    @change="CambioPorcentajePaso2(subArea.id)"

                                  />
                                </CCol>
                                <CCol sm="2" md="2" lg="2">
                                  <span :id="'porcPaso2-'+ subArea.id"> {{subArea.valor}} %</span>
                                </CCol>
                              </CRow>

                              <CRow class="justify-content-end">
                                  <CCol sm="2" md="2" lg="2">
                                    <span class="d-none text-success" id="totalPorcentajeSubAreas">{{totalPorcentajeSubAreas}} %</span>
                                  </CCol>
                              </CRow>

                              <CRow>
                                <div class="mt-3 d-flex flex-row" style="justify-content: center;" >
                                  <CCol sm="6" md="6" lg="6">
                                      <CButton
                                        :disabled="isLoadingColumns"
                                        color="primary"
                                        @click="selectedTab = 1; RegresarPaso1()"
                                        >Anterior
                                      </CButton>
                                  </CCol>
                                  <CCol sm="6" md="6" lg="6">
                                    <CButton
                                        :disabled="isLoadingColumns"
                                        color="primary"
                                        @click="irPaso3"
                                        >Siguiente
                                      </CButton>
                                  </CCol>
                                </div>
                              </CRow>
                            </CContainer>
                          </CTabPane>
                          <!--FIN PASO 2-->

                          <!--PASO 3-->
                          <CTabPane
                            role="tabpanel"
                            aria-labelledby="contact-tab"
                            :visible="selectedTab === 3"
                            >
                            <CContainer
                                class="pt-3"
                                :style="`background: ${tabs[2].color}; color: black;`"
                            >
                              <CRow>
                                <CCol sm="6" md="6" lg="6">
                                      <CFormLabel class="mt-2">3 {{tabs[2].description}}</CFormLabel>
                                </CCol>
                              </CRow>
                              <CModalTitle class="text-center">
                              </CModalTitle>
                              <CRow>
                                <CCol sm="6" md="6" lg="6">
                                      <CFormLabel for="nombreAreaPaso3" class="mt-2">Nombre área</CFormLabel>
                                </CCol>     
                                <CCol sm="6" md="6" lg="6">
                                  <CFormSelect
                                    id="idAreaPaso3"
                                    size="sm"
                                    @change="changeSegmentacionAreaPaso3"
                                    v-model="idAreaPaso3"
                                  >
                                    <option value="0" :key="0">Todos</option>
                                    <option v-for="segmentacionArea in allSegmentacionAreas" :key="segmentacionArea.id" :value="segmentacionArea.id">
                                      {{ segmentacionArea.nombreArea }}
                                    </option>
                                  </CFormSelect>
                                </CCol>
                              </CRow>

                              <CRow>
                                <CCol sm="6" md="6" lg="6">
                                      <CFormLabel for="tipoSubAreaPaso3" class="mt-2">Nombre Sub área</CFormLabel>
                                </CCol>     
                                <CCol sm="6" md="6" lg="6">
                                      <CFormSelect
                                          id="idTipoSubAreaPaso3"
                                          size="sm"
                                          class="mt-2"
                                          @change="changeSegmentacionSubAreaPaso3"
                                          v-model="idTipoSubAreaPaso3"
                                      >
                                        <option value="0" :key="0">Todos</option>
                                        <option v-for="segmentacionSubArea in allSegmentacionSubAreasByIdArea" :value="segmentacionSubArea.id" :key="segmentacionSubArea.id">
                                          {{ segmentacionSubArea.nombreSubArea }}
                                        </option>
                                      </CFormSelect>
                                </CCol>
                              </CRow>

                              <CTable responsive class="mt-4">
                                <CTableHead>
                                  <CTableRow>
                                    <CTableHeaderCell class="text-center" scope="col">
                                      Área
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="text-center" scope="col">
                                      Sub Área
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="text-center" scope="col">
                                      Estado
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="text-center" scope="col">
                                      Preguntas
                                    </CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  <CTableRow v-for="tablaSegmentacionArea in tablaSegmentacionAreas" :key="tablaSegmentacionArea.id">
                                    <CTableDataCell class="text-center">
                                      {{tablaSegmentacionArea.nombreArea}}
                                    </CTableDataCell>
                                     <CTableDataCell class="text-center">
                                      {{tablaSegmentacionArea.nombreSubArea}}
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                      <CFormCheck name="chkEstado" disabled/>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                      <CButton @click="getPregunta(tablaSegmentacionArea)">
                                        <CIcon :icon="cilPen" size="lg" />
                                      </CButton>
                                    </CTableDataCell>
                                  </CTableRow>
                                </CTableBody>
                              </CTable>

                               <CRow>
                                <div class="mt-3 d-flex flex-row" style="justify-content: center;" >
                                  <CCol v-if="perfilSelected && (perfilSelected.nombre == 'Usuario pro (empresa)' )" sm="6" md="6" lg="6">
                                      <CButton
                                        :disabled="isLoadingColumns"
                                        color="primary"
                                        @click="selectedTab = 2; RegresarPaso2"
                                        >Anterior
                                      </CButton>
                                  </CCol>
                                  <CCol sm="6" md="6" lg="6">
                                    <CButton
                                        :disabled="isLoadingColumns"
                                        color="primary"
                                        @click="irPaso4"
                                        >Siguiente
                                      </CButton>
                                  </CCol>
                                </div>
                              </CRow>
                            </CContainer>
                            </CTabPane>
                        </CTabContent>
                    </CContainer>
                </div>
            </CRow>
          </CContainer>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- MODAL PREGUNTAS -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalPreguntas"
    @close="
      () => {
        resetModalPregunta();
        visibleModalPreguntas = false;
      }
    "
  >
     <CModalHeader>
        <CModalTitle>Preguntas</CModalTitle>&nbsp;&nbsp;
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="12">
            <div class="mb-2 text-center">
              <h4> {{preguntaSelected.detalle}}</h4>
            </div>
          </CCol>
          <CCol sm="12">
            <div class="mt-3 text-center">
              <h5> Alternativas </h5>
            </div>
          </CCol>

          <CCol sm="12 mt-1">
            <div v-for="alternativa in preguntaSelected.alternativas" :key="alternativa.id">
              <div style="display: flex">
                <CFormInput
                  type="radio"
                  name="alternativas"
                  class="form-check-input"
                  v-model="alternativaSelected"
                  :value="alternativa.id"
                />
                <CFormLabel > {{alternativa.detalle}} </CFormLabel>
              </div>
            </div>
          </CCol>
        </CRow>

        <CRow>
          <CCol sm="6" class="mt-3">
            <h5> Importancia </h5>
            <div v-for="tipoImportancia in tiposImportancia" :key="tipoImportancia.id">
              <div style="display: flex">
                <CFormInput
                  type="radio"
                  name="tipoImportancias"
                  class="form-check-input"
                  v-model="tipoImportanciaSelected"
                  :value="tipoImportancia.id"
                />
                <CFormLabel > {{tipoImportancia.nombre}} </CFormLabel>
              </div>
            </div>
          </CCol>

          <CCol sm="6" class="mt-3" v-if="perfilSelected && (perfilSelected.nombre=='Consultor' )">
            <h5> Deficiencia relacionada con </h5>
            <div v-for="defRelacionada in defRelacionadas" :key="defRelacionada.id">
              <div style="display: flex">
                <CFormInput
                  type="radio"
                  name="defRelacionada"
                  class="form-check-input"
                  v-model="defRelacionadaSelected"
                  :value="defRelacionada.id"
                />
                <CFormLabel > {{defRelacionada.nombre}} </CFormLabel>
              </div>
            </div>
          </CCol>

        </CRow>
      </CContainer>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" class="text-start" @click="pasosPreguntas('atras') ; getRespuesta();">
        Anterior
      </CButton>
      <CFormLabel class="text-center"> Pregunta {{preguntaSelected.orden}} de {{preguntasTotal}} </CFormLabel>
      <CButton color="primary" class="text-end"  @click="addRespuesta();" >
        Siguiente
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL PREGUNTAS -->

</template>



<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import swal from "sweetalert2";
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
import { cilPen } from "@coreui/icons";
//import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "Evaluacion",
  components: {
    draggable,
    paginate: Paginate,
    //VOnboardingWrapper,
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
    //const wrapper = ref(null);
    //const { start } = useVOnboarding(wrapper);

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
     // wrapper,
      //steps: [],
      perfilSelected: [],
      idEvaluacionSelected: "0",
      evaluaciones : [],
      evaluacionSelected: [],
      porcentajesAreaSelected: [],
      segmentacionAreas : [],
      totalPorcentaje : 0,
      totalPorcentajeSubAreas: 0,
      segmentacionAreasByEvaluacion: [],
      idTipoAreaSelected: "0",
      segmentacionAreaSelected: [],
      segmentacionSubAreasbyAreaSelected: [],
      importanciaRelativaSelected: [],
      porcentajesSubAreasSelected: [],
      allSegmentacionAreas: [],
      allSegmentacionSubAreas: [],
      tablaSegmentacionAreas: [],
      allSegmentacionSubAreasByIdArea: [],

      visibleModalPreguntas : false,
      idAreaPaso3: "0",
      idTipoSubAreaPaso3: "0",
      evaluacionPaso3: [],
      alternativaSelected: [],
      defRelacionadas: [],
      defRelacionadaSelected: [],
      tiposImportancia : [],
      tipoImportanciaSelected: [],
      preguntas : [],
      preguntaSelected : [],
      preguntasTotal:0,

      respuestaSelected: [],

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
          description: "Preparación áreas",
          color: "#ebedef",
          colorTab: "black",
          active: true,
        },
        {
          label: "Paso 2",
          value: 2,
          description: "Preparación sub áreas",
          color: "#ebedef",
          colorTab: "black",
          active: false,
        },
        {
          label: "Paso 3",
          value: 3,
          description: "Levantamiento y entrevista",
          color: "#ebedef",
          colorTab: "black",
          active: false,
        },
        {
          label: "Paso 4",
          value: 4,
          description: "Preguntas",
          color: "#ebedef",
          colorTab: "black",
          active: false,
        },
      ],
    });

    const getEvaluaciones = async () => {
      state.evaluaciones = [];
      let empresaId = JSON.parse(localStorage.usuarioModel).empresaId;
      ApiNeva.get("Evaluacion/GetEvaluacionsByEmpresaId?empresaId=" + empresaId, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.evaluaciones = response.data;
          console.log("state.evaluaciones", state.evaluaciones);
        })
        .catch((error) => console.log(error));
    };

    const changeEvaluacion = async () => {
      let idEvaluacionSelected = document.getElementById("idEvaluacionSelected")
        .options[
        document.getElementById("idEvaluacionSelected").selectedIndex
      ].value;

      limpiarPaso1();

      if (!idEvaluacionSelected || idEvaluacionSelected == 0){
        document.getElementById("totalporcentaje").classList.add("d-none");
        return;
      } 

      state.idEvaluacionSelected = idEvaluacionSelected;
      state.evaluacionSelected = state.evaluaciones.find((y) => y.id == idEvaluacionSelected);
      state.evaluaciones.forEach(x => {
        state.segmentacionAreas = state.segmentacionAreas.concat(x.segmentacionAreas);
      });

      getSegmentacionAreaByevaluacionPorcentajes();

      document.getElementById("totalporcentaje").classList.remove("d-none");
      console.log("state.segmentacionAreas", state.segmentacionAreas);
      console.log("state.segmentacionAreasByEvaluacion", state.segmentacionAreasByEvaluacion);
    };

    const limpiarPaso1 = async () => {
      state.evaluacionSelected = [];
      state.segmentacionAreas = [];
      state.segmentacionAreasByEvaluacion = [];
      state.porcentajesAreaSelected = [];
      state.totalPorcentaje = 0;
    };

    const getSegmentacionAreaByevaluacionPorcentajes = async () =>{

      let bodySegmentacionArea = {
          id: state.evaluacionSelected.evaluacionEmpresas[0].id,
      };
      ApiNeva.post("ImportanciaRelativa/GetImportanciaRelativasByEvaluacionEmpresaId", bodySegmentacionArea , {
        headers: header,
      })
      .then((response) => {
        if (response.status != 200) return false;
        state.porcentajesAreaSelected = response.data;
        console.log("state.porcentajesAreaSelected", state.porcentajesAreaSelected);

        state.segmentacionAreas.forEach( x => {
          if (x.evaluacionId == state.idEvaluacionSelected){
            if (state.porcentajesAreaSelected.length == 0) x.valor = 0;
            state.porcentajesAreaSelected.forEach( y => {
              if (y.segmentacionAreaId == x.id){
                if ( y.valor != undefined) {
                  x.valor = y.valor;
                  state.totalPorcentaje += parseInt(y.valor);
                }else{
                   x.valor = 0;
                }
              }
            });
            state.segmentacionAreasByEvaluacion.push(x);
          }
        });
      });
    };

    const CambioPorcentajePaso1 = async (idarea) => {
      document.getElementById("porc-"+idarea).innerHTML=document.getElementById(idarea).value + "%";
      let idAreasPorcentajes = document.getElementsByName("porcentajeAreas");
      state.totalPorcentaje = 0;
      idAreasPorcentajes.forEach((element) => {
        state.totalPorcentaje += parseInt(element.value);
      });
      if (state.totalPorcentaje > 100){
        document.getElementById("totalporcentaje").classList.remove("text-success");
        document.getElementById("totalporcentaje").classList.add("text-danger");
        return;
      }
      document.getElementById("totalporcentaje").classList.remove("text-danger");
      document.getElementById("totalporcentaje").classList.add("text-success");
    };

    const RegresarPaso1 = async () => {
      state.idTipoAreaSelected = "0";
      state.idEvaluacionSelected = state.evaluacionSelected.id;
      state.segmentacionAreaSelected = [];
      state.segmentacionSubAreasbyAreaSelected = [];
      document.getElementById("totalPorcentajeSubAreas").classList.add("d-none");
    };

    const irPaso2 = async () => {
      if (state.idEvaluacionSelected == "0"){
        swal.fire({
          title: "Preparación de áreas",
          text: "Seleccione tipo evaluación",
          icon: "warning",
        });
        return false;
      }

      if (!state.segmentacionAreasByEvaluacion){
        swal.fire({
          title: "Preparación de áreas",
          text: "Empresa no tiene áreas asignadas",
          icon: "warning",
        });
        return false;
      }
      
      if (state.totalPorcentaje > 100){
        swal.fire({
          title: "Preparación de áreas",
          text: "No puede sobrepasar el 100% de importancia entre las área",
          icon: "warning",
        });
        return false;
      }
      
      guardarPorcentajeAreas();
      state.selectedTab = 2;
      state.tabs[0].colorTab = "black";
    };

    const guardarPorcentajeAreas = async () => {
      let idAreasPorcentajes = document.getElementsByName("porcentajeAreas");
      idAreasPorcentajes.forEach((element) => {
        let bodyImportanciaRelativa = {
            evaluacionEmpresaId: state.evaluacionSelected.evaluacionEmpresas[0].id,
            segmentacionAreaId: element.id,
            valor: element.value,
            activo: true,
        };
        
        ApiNeva.post("ImportanciaRelativa/ImportanciaRelativaInsertOrUpdate", bodyImportanciaRelativa , {
          headers: header,
        })
        .then((response) => {
          if (response.status != 200){
            swal.fire({
              title: "Preparación de áreas",
              text: "Error al guardar porcentajes",
              icon: "warning",
            });
            return false;
          }
        })
        .catch((error) => console.log(error));
      });
    };

    const CambioPorcentajePaso2 = async (idsubarea) => {
      document.getElementById("porcPaso2-"+idsubarea).innerHTML=document.getElementById(idsubarea).value + "%";
      let idSubAreasPorcentajes = document.getElementsByName("porcentajeSubAreas");
      state.totalPorcentajeSubAreas = 0;
      idSubAreasPorcentajes.forEach((element) => {
        state.totalPorcentajeSubAreas += parseInt(element.value);
      });
      if (state.totalPorcentajeSubAreas > 100){
        document.getElementById("totalPorcentajeSubAreas").classList.remove("text-success");
        document.getElementById("totalPorcentajeSubAreas").classList.add("text-danger");
        return;
      }
      document.getElementById("totalPorcentajeSubAreas").classList.remove("text-danger");
      document.getElementById("totalPorcentajeSubAreas").classList.add("text-success");
    };


    const changeSegmentacionArea = async () => {
      let idTipoAreaSelected = document.getElementById("idTipoAreaSelected")
        .options[
        document.getElementById("idTipoAreaSelected").selectedIndex
      ].value;

      limpiarPaso2();

      if (idTipoAreaSelected == 0){
        document.getElementById("totalPorcentajeSubAreas").classList.add("d-none");
        return;
      } 

      state.idTipoAreaSelected = idTipoAreaSelected;
      state.segmentacionAreaSelected = state.segmentacionAreasByEvaluacion.find((y) => y.id == idTipoAreaSelected);

      getSegmentacionSubAreaByAreaPorcentajes();

      document.getElementById("totalPorcentajeSubAreas").classList.remove("d-none");
      console.log("state.segmentacionAreaSelected", state.segmentacionAreaSelected);
    };

    const limpiarPaso2 = async () => {
      state.segmentacionAreaSelected = [];
      state.segmentacionSubAreasbyAreaSelected = [];
      state.totalPorcentajeSubAreas = 0;
      state.idTipoAreaSelected  = 0;
      state.importanciaRelativaSelected = [];
    };

    const getSegmentacionSubAreaByAreaPorcentajes = async () => {
      state.importanciaRelativaSelected = state.porcentajesAreaSelected.find((y) => y.evaluacionEmpresaId == state.evaluacionSelected.evaluacionEmpresas[0].id && y.segmentacionAreaId == state.segmentacionAreaSelected.id);
      console.log("state.importanciaRelativaSelected", state.importanciaRelativaSelected);

      ApiNeva.post("ImportanciaEstrategica/GetImportanciaEstrategicasByImportanciaRelativaId", state.importanciaRelativaSelected , {
        headers: header,
      })
      .then((response) => {
        if (response.status != 200) return false;
        state.porcentajesSubAreasSelected = response.data;
        console.log("state.porcentajesSubAreasSelected", state.porcentajesSubAreasSelected);

        state.segmentacionAreaSelected.segmentacionSubAreas.forEach( x => {
            if (state.porcentajesSubAreasSelected.length == 0) x.valor = 0;
            state.porcentajesSubAreasSelected.forEach( y => {
            if (y.segmentacionSubAreaId == x.id ){
                if ( y.valor != undefined) {
                  x.valor = y.valor;
                  state.totalPorcentajeSubAreas += parseInt(y.valor);
                }else {
                   x.valor = 0;
                }
              }
            });
            state.segmentacionSubAreasbyAreaSelected.push(x);
        });
        console.log("state.segmentacionSubAreasbyAreaSelected", state.segmentacionSubAreasbyAreaSelected);
      });
    };

    const irPaso3 = async () => {
      if (state.idTipoAreaSelected == "0"){
        swal.fire({
          title: "Preparación sub áreas",
          text: "Seleccione nombre área",
          icon: "warning",
        });
        return false;
      }
      if (state.totalPorcentajeSubAreas > 100){
        swal.fire({
          title: "Preparación sub áreas",
          text: "No puede sobrepasar el 100% de importancia entre las sub área",
          icon: "warning",
        });
        return false;
      }
      guardarPorcentajeSubAreas();
      getAllAreas();
      state.idAreaPaso3 = "0";
      state.idTipoSubAreaPaso3 = "0";
      state.selectedTab = 3;
      state.tabs[0].colorTab = "black";
    };

    const guardarPorcentajeSubAreas = async () => {
      let idSubAreasPorcentajes = document.getElementsByName("porcentajeSubAreas");
      idSubAreasPorcentajes.forEach((element) => {
        let bodyImportanciaEstrategica = {
            importanciaRelativaId: state.importanciaRelativaSelected.id,
            segmentacionSubAreaId: element.id,
            valor: element.value,
            activo: true,
        };
        
        ApiNeva.post("ImportanciaEstrategica/ImportanciaEstrategicaInsertOrUpdate", bodyImportanciaEstrategica , {
          headers: header,
        })
        .then((response) => {
          if (response.status != 200){
            swal.fire({
              title: "Preparación de sub áreas",
              text: "Error al guardar porcentajes" + error,
              icon: "warning",
            });
            return false;
          }
        })
        .catch((error) => console.log(error));
      });
    };

    const getAllAreas = async () => {
      state.allSegmentacionAreas = [];
      state.allSegmentacionSubAreas = [];
      state.tablaSegmentacionAreas = [];
      let empresaId = JSON.parse(localStorage.usuarioModel).empresaId;
      ApiNeva.get("Evaluacion/GetEvaluacionsByEmpresaId?empresaId=" + empresaId, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.evaluacionPaso3 = response.data;
          console.log("state.evaluacionPaso3", state.evaluacionPaso3);
          response.data.forEach(x => {
            state.allSegmentacionAreas = state.allSegmentacionAreas.concat(x.segmentacionAreas);
          });
          console.log("state.allSegmentacionAreas", state.allSegmentacionAreas);

          state.allSegmentacionAreas.forEach(x => {
            state.allSegmentacionSubAreas = state.allSegmentacionSubAreas.concat(x.segmentacionSubAreas);
          });
          console.log("state.allSegmentacionSubAreas", state.allSegmentacionSubAreas);

          cargarTablaPaso3();
          
        })
        .catch((error) => console.log(error));
    };

    const cargarTablaPaso3 = async () => {
      state.tablaSegmentacionAreas = [];
      state.allSegmentacionSubAreasByIdArea = [];

      state.allSegmentacionSubAreas.forEach (x => {
        state.allSegmentacionAreas.forEach(y => {
            if (x.segmentacionAreaId == y.id){
              x.nombreArea = y.nombreArea;
            };
        });
        state.tablaSegmentacionAreas.push(x);
      });
      state.allSegmentacionSubAreasByIdArea = state.allSegmentacionSubAreas;
      console.log("state.tablaSegmentacionAreas", state.tablaSegmentacionAreas);
    };

    const changeSegmentacionAreaPaso3 = async () => {
       let idAreaPaso3 = document.getElementById("idAreaPaso3")
        .options[
        document.getElementById("idAreaPaso3").selectedIndex
      ].value;

      state.idTipoSubAreaPaso3 = "0";
      state.allSegmentacionSubAreasByIdArea = [];
      state.tablaSegmentacionAreas = [];

      if (idAreaPaso3 == "0"){
        cargarTablaPaso3();
        return false;
      }

      state.allSegmentacionSubAreas.forEach (x => {
        if (x.segmentacionAreaId == idAreaPaso3){
          state.allSegmentacionAreas.forEach(y => {
              if (x.segmentacionAreaId == y.id){
                x.nombreArea = y.nombreArea;
              };
          });
          state.tablaSegmentacionAreas.push(x);
          state.allSegmentacionSubAreasByIdArea.push(x);
        }
      });
      console.log("state.tablaSegmentacionAreas", state.tablaSegmentacionAreas);
    };

    const changeSegmentacionSubAreaPaso3 = async () => {
      let idTipoSubAreaPaso3 = document.getElementById("idTipoSubAreaPaso3")
        .options[
        document.getElementById("idTipoSubAreaPaso3").selectedIndex
      ].value;

      
      if (idTipoSubAreaPaso3 == "0"){
        cargarTablaPaso3();
        return false;
      }

      state.tablaSegmentacionAreas = [];

      state.allSegmentacionSubAreas.forEach (x => {
        if ( x.id == idTipoSubAreaPaso3 ){
          state.allSegmentacionAreas.forEach(y => {
            if (x.segmentacionAreaId == y.id){
              x.nombreArea = y.nombreArea;
            };
          });
          state.tablaSegmentacionAreas.push(x);
        }
      });
      console.log("state.tablaSegmentacionAreas", state.tablaSegmentacionAreas);

    };

    const RegresarPaso2 = async () => {
      state.idAreaPaso3 = "0";
      state.idTipoSubAreaPaso3 = "0";
    };

    const getPregunta = (segmentacionArea) => {
      state.preguntas = [];
      state.preguntaSelected = [];
      state.preguntasTotal = [];
      ApiNeva.get("Pregunta/GetPreguntasByIdsSegmentacionAreaSubArea?idArea=" + segmentacionArea.segmentacionAreaId + "&idSubArea=" + segmentacionArea.id , null,  {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;;
          state.preguntas = response.data;
          state.preguntaSelected = response.data[0];
          state.preguntasTotal = response.data.length;
          if (!state.preguntaSelected){
            swal.fire({
              title: "Preguntas",
              text: "Sub área no tiene preguntas asignadas",
              icon: "warning",
            });
            return false;
          }
          let orden = 0;
          state.preguntas.forEach((element) => {
            orden++;
            element.orden = orden;
          });

          state.visibleModalPreguntas = true;
          console.log("state.preguntas", state.preguntas);
          getTipoimportancia();
          if (state.perfilSelected.nombre == "Consultor") getDeficienciaRelacionada();
          getRespuesta();
        })
        .catch((error) => console.log(error));
    };

    const getTipoimportancia = async () => {
      state.tiposImportancia = [];
      ApiNeva.post("TipoImportancia/GetTipoImportancias", null,  {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.tiposImportancia = response.data;
          console.log("state.tiposImportancia", state.tiposImportancia);
        })
        .catch((error) => console.log(error));
    };

    const getDeficienciaRelacionada = async () => {
      state.defRelacionadas = [];
      ApiNeva.post("TipoDiferenciaRelacionada/GetTipoDiferenciaRelacionadas", null,  {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.defRelacionadas = response.data;
          console.log("state.defRelacionadas", state.defRelacionadas);
        })
        .catch((error) => console.log(error));
    };

    const addRespuesta= () => {
      if (state.alternativaSelected == ""){
         swal.fire({
            title: "Preguntas",
            text: "Debe seleccionar una alternativa",
            icon: "warning",
          });
          return false;
      }
      if (state.tipoImportanciaSelected == ""){
         swal.fire({
            title: "Preguntas",
            text: "Debe seleccionar un tipo importancia",
            icon: "warning",
          });
          return false;
      }
      if (state.perfilSelected.nombre == "Consultor"){
        if (state.defRelacionadaSelected == ""){
          swal.fire({
              title: "Preguntas",
              text: "Debe seleccionar una deficiencia relacionada",
              icon: "warning",
            });
            return false;
        }
      }

      let EvaluacionEmpresa = "";
      for (let index = 0; index < state.evaluacionPaso3.length; index++) {
        EvaluacionEmpresa =  state.evaluacionPaso3[index].evaluacionEmpresas.find((y) => y.evaluacionId == state.preguntaSelected.evaluacionId && y.empresaId == JSON.parse(localStorage.usuarioModel).empresaId);
        if (EvaluacionEmpresa) break;
      }

      let alternativa = state.preguntaSelected.alternativas.find((y) => y.id == state.alternativaSelected);
      let idRespuesta = state.respuestaSelected ? state.respuestaSelected.id : "00000000-0000-0000-0000-000000000000";
      let idDefRelacionada = state.perfilSelected.nombre == "Consultor" ? state.defRelacionadaSelected : "00000000-0000-0000-0000-000000000000";

      let bodyRespuesta = {
        id: idRespuesta,
        alternativaId: state.alternativaSelected,
        preguntaId: state.preguntaSelected.id,
        evaluacionEmpresaId: EvaluacionEmpresa.id,
        tipoImportanciaId: state.tipoImportanciaSelected,
        tipoDiferenciaRelacionadaId: idDefRelacionada,
        valor: alternativa.valor,
        realimentacion: alternativa.retroalimentacion,
        activo: true,
        usuarioId: localStorage.iduser
      };
      ApiNeva.post("Respuesta/InsertOrUpdate", bodyRespuesta,  {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) {
            swal.fire({
                title: "Preguntas",
                text: "Error al guardar pregunta" + error,
                icon: "warning",
              });
              return false;
          }
          pasosPreguntas("siguiente");
        })
        .catch((error) => console.log(error));
    };

    const pasosPreguntas = async (paso) => {
      let orden = state.preguntaSelected.orden - 1;
      if (paso == "siguiente"){ 
        if (state.preguntasTotal <= state.preguntaSelected.orden ){
          swal.fire(
            "Preguntas",
            "No existen mas preguntas asociadas",
            "warning"
          );
          return false;
        }
        limpiarRespuestas("alternativas");
        limpiarRespuestas("tipoImportancias");
        if (state.perfilSelected.nombre == "Consultor"){
          limpiarRespuestas("defRelacionada");
        }
        state.alternativaSelected = [];
        state.tipoImportanciaSelected = [];
        state.defRelacionadaSelected = [];

        if (state.preguntaSelected.orden == state.preguntasTotal){
          return false;
        }
        state.preguntaSelected = state.preguntas[orden + 1];
        getRespuesta();
      }
      if (paso == "atras"){
        if (state.preguntaSelected.orden == 1){
          return false;
        }
        state.preguntaSelected = state.preguntas[orden - 1];
      }
    };

    const getRespuesta = () => {
      let EvaluacionEmpresa = "";
      state.respuestaSelected = [];
      for (let index = 0; index < state.evaluacionPaso3.length; index++) {
        EvaluacionEmpresa =  state.evaluacionPaso3[index].evaluacionEmpresas.find((y) => y.evaluacionId == state.preguntaSelected.evaluacionId && y.empresaId == JSON.parse(localStorage.usuarioModel).empresaId);
        if (EvaluacionEmpresa) break;
      }

       let bodyRespuesta = {
        preguntaId: state.preguntaSelected.id,
        evaluacionEmpresaId: EvaluacionEmpresa.id,
        usuarioId: localStorage.iduser
      };

      ApiNeva.post("Respuesta/GetRespuestaByIdsPreguntaUsuarioEvaluacionEmpresa", bodyRespuesta,  {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.respuestaSelected = response.data;
          console.log("state.respuestaSelected", state.respuestaSelected);
          if (state.respuestaSelected) cargarRespuestas();
        })
        .catch((error) => console.log(error));
    };

    const cargarRespuestas = async () => {
      let alternativas = document.getElementsByName("alternativas");
      for (let x = 0; x < alternativas.length; x++) {
        let obj = alternativas[x];
        obj.checked = false;
        if (obj.value == state.respuestaSelected.alternativaId){
          obj.checked = true;
          state.alternativaSelected = obj.value;
        }
      };

      let tipoImportancias = document.getElementsByName("tipoImportancias");
      for (let x = 0; x < tipoImportancias.length; x++) {
        let obj = tipoImportancias[x];
        obj.checked = false;
        if (obj.value == state.respuestaSelected.tipoImportanciaId){
          obj.checked = true;
          state.tipoImportanciaSelected = obj.value;
        }
      };

      if (state.perfilSelected.nombre == "Consultor"){
        let defRelacionada = document.getElementsByName("defRelacionada");
        for (let x = 0; x < defRelacionada.length; x++) {
          let obj = defRelacionada[x];
          obj.checked = false;
          if (obj.value == state.respuestaSelected.tipoDiferenciaRelacionadaId){
            obj.checked = true;
            state.defRelacionadaSelected = obj.value;
          }
        }
      }
    };

    const limpiarRespuestas = async (name) => {
      let radios = document.getElementsByName(name);
      for (let x = 0; x < radios.length; x++) {
        let obj = radios[x];
        obj.checked = false;
      }
    };

    const resetModalPregunta = () => {
    };

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
      state.perfilSelected = JSON.parse(localStorage.usuarioModel).perfil;
      state.selectedTab = 1;
      if (state.perfilSelected.nombre != "Usuario pro (empresa)") {
        getAllAreas();
        state.selectedTab = 3;
      }
      /*if (typeof localStorage.isLoadingFile === "undefined") {
        localStorage.isLoadingFile = false;
      }
      state.isLoadingFile =
        localStorage.isLoadingFile == "false" ? false : true;
      */
      /*ApiNeva.get("Config/GetAll", { headers: header })
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
        .catch((error) => console.log(error));*/
    };

    /*const onBoarding = async () => {
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
    };*/

    onMounted(() => {
      getEvaluaciones();
      oncreated();
      //onBoarding();
      /*if (!state.isonboarding) {
        setTimeout(() => {
          start();
        }, 500);
      }*/
    });

    return {
      ...toRefs(state),

      formatterMoney,
      selectedPagination,
      getNameEstadoConciliacion,

      irPaso2,
      irPaso3,

      loadData,
      readColumns,
      randomKey,
      exportEjemplo,

      changeEvaluacion,
      changeSegmentacionArea,
      changeSegmentacionAreaPaso3,
      changeSegmentacionSubAreaPaso3,
      getPregunta,
      cilPen,
      resetModalPregunta,
      RegresarPaso1,
      RegresarPaso2,
      CambioPorcentajePaso1,
      CambioPorcentajePaso2,
      addRespuesta,
      getRespuesta,
      pasosPreguntas,
    };
  },
};
</script>
