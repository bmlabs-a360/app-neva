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
                                          id="tipoevaluacion"
                                          size="sm"
                                          @change="changeSegmentacionArea()"
                                      >
                                        <option
                                            v-for="evaluacion in evaluaciones"
                                            :value="evaluacion.id"
                                            :key="evaluacion.id"
                                        >
                                            {{ evaluacion.nombre }}
                                        </option>
                                      </CFormSelect>
                                </CCol>
                              </CRow>

                              <CRow>
                                <CCol sm="12" md="12" lg="12" class="text-center">
                                      <CFormLabel class="mt-4"> 
                                        <h6> % importancia relativa por area </h6>
                                      </CFormLabel>
                                </CCol> 
                              </CRow>   

                              <CRow v-for="area in segmentacionAreasByEvaluacion" :key="area.id">
                                <CCol sm="6" md="6" lg="6" >
                                      <CFormLabel for="tipoevaluacion" class="mt-1" > {{area.nombreArea}} </CFormLabel>
                                </CCol>     
                                <CCol sm="6" md="6" lg="6">
                                  <CFormInput
                                    :id="area.id"
                                    placeholder="Porcentaje"
                                    type="number"
                                    class="mt-1"
                                    name="porcentajeAreas"
                                  />
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
                                          @change="changeSegmentacionArea()"
                                          class="mt-2"
                                          disabled
                                      >
                                        <option
                                            :value="evaluacionSelected.id"
                                            :key="evaluacionSelected.id"
                                        >
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
                                          id="tipoAreaPaso2"
                                          size="sm"
                                          @change="changeSegmentacionSubArea()"
                                          class="mt-2"
                                      >
                                        <option
                                            v-for="segmentacionArea in segmentacionAreasByEvaluacion"
                                            :value="segmentacionArea.id"
                                            :key="segmentacionArea.id"
                                            
                                        >
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

                              <CRow v-for="subArea in segmentacionSubAreasbyAreas" :key="subArea.id" >
                                <CCol sm="6" md="6" lg="6" >
                                  <CFormLabel for="tipoSubAreaPaso2" class="mt-1"> {{subArea.nombreSubArea}}</CFormLabel>
                                </CCol>     
                                <CCol sm="6" md="6" lg="6">
                                  <CFormInput
                                    :id="subArea.id"
                                    placeholder="Porcentaje"
                                    type="number"
                                    class="mt-1"
                                    name="porcentajeSubAreas"
                                  />
                                </CCol>
                              </CRow>

                              <CRow>
                                <div class="mt-3 d-flex flex-row" style="justify-content: center;" >
                                  <CCol sm="6" md="6" lg="6">
                                      <CButton
                                        :disabled="isLoadingColumns"
                                        color="primary"
                                        @click="selectedTab = 1"
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
                                    @change="changeSegmentacionAreaPaso3()"
                                  >
                                    <option value="0" :key="0">Todos</option>
                                    <option
                                      v-for="segmentacionArea in segmentacionAreasPaso3"
                                      :key="segmentacionArea.id"
                                      :value="segmentacionArea.id"
                                    >
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
                                          id="tipoSubAreaPaso3"
                                          size="sm"
                                          class="mt-2"
                                          @change="changeSegmentacionSubAreaPaso3()"
                                      >
                                       <option value="0" :key="0">Todos</option>
                                        <option
                                            v-for="segmentacionSubArea in segmentacionSubAreasPaso3"
                                            :value="segmentacionSubArea.id"
                                            :key="segmentacionSubArea.id"
                                        >
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
                                  <CTableRow v-for="segmentacionAreaPaso3Tabla in segmentacionAreasPaso3Tabla" :key="segmentacionAreaPaso3Tabla.id">
                                    <CTableDataCell class="text-center">
                                      {{segmentacionAreaPaso3Tabla.nombreArea}}
                                    </CTableDataCell>
                                     <CTableDataCell class="text-center">
                                      {{segmentacionAreaPaso3Tabla.nombreSubArea}}
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                      <CFormCheck name="chkEstado" disabled/>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                      <CButton @click="getPregunta(segmentacionAreaPaso3Tabla)">
                                        <CIcon :icon="cilPen" size="lg" />
                                      </CButton>
                                    </CTableDataCell>
                                  </CTableRow>
                                </CTableBody>
                              </CTable>

                               <CRow>
                                <div class="mt-3 d-flex flex-row" style="justify-content: center;" >
                                  <CCol sm="6" md="6" lg="6">
                                      <CButton
                                        :disabled="isLoadingColumns"
                                        color="primary"
                                        @click="selectedTab = 2"
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
                  name="alternativa"
                  :id="alternativa.id"
                  class="form-check-input"
                />
                <CFormLabel > {{alternativa.detalle}} </CFormLabel>
              </div>
            </div>
          </CCol>
        </CRow>

        <CRow>
          <CCol sm="6" class="mt-3">
            <h5> Importancia </h5>
            <div style="display: flex">
              <CFormInput
                type="radio"
                name="importancia"
                id="muyimportante"
                class="form-check-input"
              />
              <CFormLabel > Muy importante </CFormLabel>
            </div>
            <div style="display: flex">
              <CFormInput
                type="radio"
                name="importancia"
                id="importante"
                class="form-check-input"
              />
              <CFormLabel > Importante </CFormLabel>
            </div>
            <div style="display: flex">
              <CFormInput
                type="radio"
                name="importancia"
                id="pocoimportante"
                class="form-check-input"
              />
              <CFormLabel > Poco Importante </CFormLabel>
            </div>
            <div style="display: flex">
              <CFormInput
                type="radio"
                name="importancia"
                id="irrelevante"
                class="form-check-input"
              />
              <CFormLabel > Irrelevante </CFormLabel>
            </div>
            <div style="display: flex">
              <CFormInput
                type="radio"
                name="importancia"
                id="noaplica"
                class="form-check-input"
              />
              <CFormLabel > No aplica </CFormLabel>
            </div>
          </CCol>

          <CCol sm="6" class="mt-3">
            <h5> Difencia relacionada con </h5>
            <div v-for="difRelacionada in difRelacionadas" :key="difRelacionada.id">
              <div style="display: flex">
                <CFormInput
                  type="radio"
                  :name="'difRelacionada-' + preguntaSelected.id"
                  :id="difRelacionada.id"
                  class="form-check-input"
                />
                <CFormLabel > {{difRelacionada.nombre}} </CFormLabel>
              </div>
            </div>
          </CCol>

        </CRow>
      </CContainer>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" class="text-start" @click="pasosPreguntas('atras')">
        Anterior
      </CButton>
      <CFormLabel class="text-center"> Pregunta {{preguntaSelected.orden}} de {{preguntasTotal}} </CFormLabel>
      <CButton color="primary" class="text-end"  @click="pasosPreguntas('siguiente')" >
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
      steps: [],
      evaluaciones : [],
      segmentacionAreas : [],
      segmentacionAreaSelected: [],
      segmentacionAreasByEvaluacion: [],
      evaluacionSelected: {},
      segmentacionSubAreasbyAreas: [],
      segmentacionAreasPaso3: [],
      segmentacionSubAreasPaso3: [],
      segmentacionAreasPaso3Tabla: [],
      visibleModalPreguntas : false,
      alternativas: [],
      difRelacionadas: [],
      preguntas : [],
      preguntaSelected : [],
      preguntasTotal:0,

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
          state.evaluacionSelected = state.evaluaciones[0];
          console.log("state.evaluaciones", state.evaluaciones);
          console.log("state.evaluacionSelected", state.evaluacionSelected);
          if (!state.evaluacionSelected){
            swal.fire({
              title: "Preparación áreas",
              text: "Empresa no tiene evaluaciones asignadas",
              icon: "warning",
            });
            return false;
          }
          getSegmentacionArea();
        })
        .catch((error) => console.log(error));
    };

    const getSegmentacionArea = async () => {
      state.segmentacionAreas = [];
      state.segmentacionAreasByEvaluacion = [];
      if (!state.evaluacionSelected.segmentacionAreas){
        swal.fire({
          title: "Preparación de areas",
          text: "Empresa no tiene evaluaciones asignadas",
          icon: "warning",
        });
        return false;
      }
      let areas = [];
      state.evaluaciones.forEach(x => {
        areas =  areas.concat(x.segmentacionAreas);
      });
      state.segmentacionAreas.push(areas);
      state.segmentacionAreas = state.segmentacionAreas[0];
      state.segmentacionAreas.forEach( x => {
        if (x.evaluacionId == state.evaluacionSelected.id){
           state.segmentacionAreasByEvaluacion.push(x);
        }
      });
      state.segmentacionAreaSelected = 
      console.log("state.segmentacionAreas", state.segmentacionAreas);
      console.log("state.segmentacionAreasByEvaluacion", state.segmentacionAreasByEvaluacion);
    };

    const changeSegmentacionArea = async () => {
      state.segmentacionAreasByEvaluacion = [];
      let idevaluacion = document.getElementById("tipoevaluacion").value;
      state.evaluacionSelected = state.evaluaciones.find((y) => y.id == idevaluacion);
      console.log("state.evaluacionSelected", state.evaluacionSelected);
      state.segmentacionAreas.forEach( x => {
        if (x.evaluacionId == idevaluacion){
           state.segmentacionAreasByEvaluacion.push(x);
        }
      });
    };

    const irPaso2 = async () => {
      if (!state.evaluacionSelected){
        swal.fire({
          title: "Preparación de áreas",
          text: "Debe seleccionar un tipo de evaluación",
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
      let idarea = document.getElementById("tipoAreaPaso2").value;
      state.segmentacionAreaSelected = state.segmentacionAreasByEvaluacion.find((y) => y.id == idarea);
      console.log("state.segmentacionAreaSelected", state.segmentacionAreaSelected);
      state.segmentacionSubAreasbyAreas = [];
   
      state.segmentacionAreasByEvaluacion.forEach( x => {
        if (x.id == state.segmentacionAreaSelected.id){
          state.segmentacionSubAreasbyAreas.push(x.segmentacionSubAreas);
        }
      });

      state.segmentacionSubAreasbyAreas = state.segmentacionSubAreasbyAreas[0];
      console.log("state.segmentacionSubAreasbyAreas", state.segmentacionSubAreasbyAreas);
      state.selectedTab = 2;
      state.tabs[0].colorTab = "black";
    };

    const changeSegmentacionSubArea = async () => {
      let idarea = document.getElementById("tipoAreaPaso2").value;
      state.segmentacionAreaSelected = state.segmentacionAreasByEvaluacion.find((y) => y.id == idarea);
      state.segmentacionSubAreasbyAreas = [];
      state.segmentacionSubAreasbyAreas = state.segmentacionAreaSelected.segmentacionSubAreas;
      console.log("state.segmentacionAreaSelected", state.segmentacionAreaSelected);
      console.log("state.segmentacionSubAreasbyAreas", state.segmentacionSubAreasbyAreas);
    };
    
    const irPaso3 = async () => {
      state.segmentacionAreasPaso3 = [];
      state.segmentacionAreasPaso3 = state.segmentacionAreasByEvaluacion;
      console.log("state.segmentacionAreasPaso3", state.segmentacionAreasPaso3);
      getSubAreasByPaso3();
      state.selectedTab = 3;
      state.tabs[0].colorTab = "black";
    };

    const changeSegmentacionAreaPaso3 = async () => {
      state.segmentacionSubAreasPaso3 = [];
      state.segmentacionAreasPaso3Tabla = [];
      let idarea = document.getElementById("idAreaPaso3").value;
      if (idarea == "0"){
        getSubAreasByPaso3();
        return false;
      }
      state.segmentacionSubAreasPaso3 = state.segmentacionAreasPaso3.find((y) => y.id == idarea).segmentacionSubAreas;
      console.log("state.segmentacionSubAreasPaso3", state.segmentacionSubAreasPaso3);
      state.segmentacionSubAreasPaso3.forEach (x => {
        if (x.segmentacionAreaId == idarea){
          state.segmentacionAreasPaso3.forEach(y => {
              if (x.segmentacionAreaId == y.id){
                x.nombreArea = y.nombreArea;
              };
          });
          state.segmentacionAreasPaso3Tabla.push(x);
        }
      });
      console.log("state.segmentacionAreasPaso3Tabla", state.segmentacionAreasPaso3Tabla);
    };

    const changeSegmentacionSubAreaPaso3 = async () => {
      state.segmentacionAreasPaso3Tabla = [];
      let idsubarea = document.getElementById("tipoSubAreaPaso3").value;
      if (idsubarea == "0"){
        changeSegmentacionAreaPaso3();
        return false;
      }
      state.segmentacionSubAreasPaso3.forEach (x => {
        if (x.id == idsubarea){
          state.segmentacionAreasPaso3.forEach(y => {
              if (x.segmentacionAreaId == y.id){
                x.nombreArea = y.nombreArea;
              };
          });
          state.segmentacionAreasPaso3Tabla.push(x);
        }
      });
      console.log("state.segmentacionAreasPaso3Tabla", state.segmentacionAreasPaso3Tabla);
    };

    const getSubAreasByPaso3 = async () => {
      let subAreas = [];
      state.segmentacionSubAreasPaso3 = [];
      state.segmentacionAreas.forEach(x => {
        subAreas = subAreas.concat(x.segmentacionSubAreas);
      });
      state.segmentacionSubAreasPaso3.push(subAreas);
      state.segmentacionSubAreasPaso3 = state.segmentacionSubAreasPaso3[0];

      state.segmentacionSubAreasPaso3.forEach (x => {
        state.segmentacionAreasPaso3.forEach(y => {
            if (x.segmentacionAreaId == y.id){
              x.nombreArea = y.nombreArea;
            };
        });
        state.segmentacionAreasPaso3Tabla.push(x);
      });
      console.log("state.segmentacionAreasPaso3Tabla", state.segmentacionAreasPaso3Tabla);
    };

    const getPregunta = (segmentacionArea) => {
      state.preguntas = [];
      state.preguntaSelected = [];
      state.preguntasTotal = [];
      ApiNeva.get("Pregunta/GetPreguntasByIdsEvaluacionSegmentacionAreaSubArea?idEvaluacion=" + state.evaluacionSelected.id + "&idArea=" + segmentacionArea.segmentacionAreaId + "&idSubArea=" + segmentacionArea.id , null,  {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
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
          state.visibleModalPreguntas = true;
          console.log("state.preguntas", state.preguntas);
        })
        .catch((error) => console.log(error));
      getDiferenciaRelacionada();
    };

    const getDiferenciaRelacionada = async () => {
      state.difRelacionadas = [];
      ApiNeva.post("TipoDiferenciaRelacionada/GetTipoDiferenciaRelacionadas", null,  {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.difRelacionadas = response.data;
          console.log("state.difRelacionadas", state.difRelacionadas);
        })
        .catch((error) => console.log(error));
    };

    const pasosPreguntas = async (paso) => {

      let orden = state.preguntaSelected.orden - 1;
      if (paso == "siguiente"){
        if (state.preguntaSelected.orden == state.preguntasTotal){
          return false;
        }
        state.preguntaSelected = state.preguntas[orden + 1];
      }
      if (paso == "atras"){
        if (state.preguntaSelected.orden == 1){
          return false;
        }
        state.preguntaSelected = state.preguntas[orden - 1];
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
      state.selectedTab = 1;
      if (typeof localStorage.isLoadingFile === "undefined") {
        localStorage.isLoadingFile = false;
      }
      state.isLoadingFile =
        localStorage.isLoadingFile == "false" ? false : true;

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
      changeSegmentacionArea,
      changeSegmentacionSubArea,
      changeSegmentacionAreaPaso3,
      changeSegmentacionSubAreaPaso3,
      getPregunta,
      cilPen,
      resetModalPregunta,
      pasosPreguntas,
    };
  },
};
</script>
