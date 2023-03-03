<template>
  <div class="container mb-5">
    <!-- Progress bar -->
    <div class="progressbar">
        <div class="progress" id="progress"></div>
        <div class="progress-step progress-step-active" data-title="Preparaci&oacute;n"></div>
        <div class="progress-step" data-title="Importancia estrat&eacute;gica"></div>
        <div class="progress-step" data-title="Evaluaci&oacute;n"></div>
    </div>
  </div>

  <div class="col-12 d-flex justify-content-between">
    <div class="card my-3 d-flex flex-column flex-lg-row align-items-center justify-content-between w-100">
      <form action="#" class="w-100">
        <!-- Steps -->
        <div class="form-step form-step-active">
          <!--header form-->
          <div class="border-bottom p-3">
            <div class="d-flex flex-column flex-sm-row  justify-content-between align-items-center">
              <div class="d-flex justify-content-center align-items-center">
                <h1 class="title-form text-center mx-2">Preparaci&oacute;n</h1> 
                <b class="tooltips">
                    <p class="mb-0 circles">?</p>
                    <span class="tooltips-box">El % de Importancia por área debe ser completada de
                      manera precisa, reflejando la importancia de cada área en relación con
                      la actividad de la empresa. Si una área no es relevante para su empresa
                      y/o industria específica, se debe dejar con un 0%. Es importante
                      asegurar que la suma total de todas las áreas alcance exactamente el
                      100%.
                    </span>
                  </b>
              </div> 
              <div class="btns-group">
                <button type="button" class="button button v-button is-bold is-fullwidth is-raised is-primary btn-next" @click="irPaso2">Siguiente</button>
              </div>
            </div>     
          </div>
          <!--main form-->
          <div class="container">
            <div class="row align-items-center">
              <div class="col-12 col-md-6">
                <div class="input-group d-flex flex-column  gris-400">
                  <label for="username">Seleccione Evaluaci&oacute;n</label>
                  <select id="idEvaluacionSelected" @change="changeEvaluacion" v-model="idEvaluacionSelected" class="form-select w-100" >
                    <option value="0" :key="0">Seleccione tipo evaluación</option>
                    <option :value="evaluaciones.id">
                        {{ evaluaciones.nombre }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-12 col-md-6 cont-range gris-400">
                <h3 class="mb-3" >% importancia por áreas</h3>
                <div v-for="area in segmentacionAreasByEvaluacion" :key="area.id">
                  <label class="form-label"> {{area.nombreArea}}</label>
                  <div class="d-flex">
                    <CFormInput :id="area.id" type="range" class="slider" name="porcentajeAreas" min="0" max="100" :value="area.valor" @change="CambioPorcentajePaso1(area.id)"/>
                    <span :id="'porc-'+ area.id"> {{area.valor}}%</span>
                  </div>
                </div>
                <div class="d-flex justify-content-end amount d-none" id="totalporcentajediv">
                  <p>Total <span :value="totalPorcentaje" id="totalporcentaje" >{{totalPorcentaje}}%</span></p>
                </div>
              </div>
            </div>
          </div>

          <!--footer form-->
          <div class="border-bottom p-3">
            <div class="d-flex flex-column flex-sm-row  justify-content-between align-items-center">
              <h1 class="title-form text-center">Preparación</h1> 
              <div class="btns-group">
                <button type="button" class="button button v-button is-bold is-fullwidth is-raised is-primary btn-next" @click="irPaso2">Siguiente</button>
              </div>
            </div>   
          </div>
        </div>

        <div class="form-step">
          <div class="border-bottom p-3">
            <div class="d-flex flex-column flex-sm-row  justify-content-between align-items-center">
              <div class="d-flex justify-content-center align-items-center">
                <h1 class="title-form text-center">Importancia estrat&eacute;gica</h1> 
                <b class="tooltips p-2">
                  <p class="mb-0 circles">?</p>
                  <span class="tooltips-box">Importancia estratégica debe ser completada con un
                    porcentaje que refleje la importancia de cada subárea en relación con
                    el área en cuestión. Si una subárea no es relevante, debe ser registrada
                    con un 0%. Es esencial asegurar que la sumatoria de todas las subáreas
                    dentro de una área sea igual a 100%
                  </span>
                </b>
              </div>
              <div class="btns-group">
                  <button type="button" class="button button v-button is-bold is-fullwidth is-raised is-primary btn-prev" @click="SiguienteAtras(0)">Anterior</button>
                  <button type="button" class="button button v-button is-bold is-fullwidth is-raised is-primary btn-next" @click="irPaso3">Siguiente</button>
                </div>
            </div> 
          </div>
          <!--main form-->
          <div class="container">
            <div class="row align-items-center">
              <div class="col-12 col-md-6">
                <div class="input-group d-flex flex-column  gris-400">
                  <label for="username">Nombre de la evaluaci&oacute;n</label>
                  <select class="form-select w-100" disabled>
                    <option :value="idEvaluacionSelected" :key="idEvaluacionSelected">
                      {{ evaluacionSelected.nombre }}
                    </option>
                  </select>
                </div>

                <div class="input-group d-flex flex-column  gris-400">
                  <label for="username">Nombre &aacute;rea</label>
                  <select class="form-select w-100" id="idTipoAreaSelected" v-model="idTipoAreaSelected" @change="changeSegmentacionArea" @click="guardarSubAreasChange">
                    <option value="0" :key="0">Seleccione nombre área</option>
                    <option v-for="segmentacionArea in segmentacionAreasByEvaluacion" :value="segmentacionArea.id" :key="segmentacionArea.id">
                        {{ segmentacionArea.nombreArea }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-12 col-md-6 cont-range gris-400">
                <h3 class="mb-3" >% Importancia estratégica</h3>
                <div v-for="subArea in segmentacionSubAreasbyAreaSelected" :key="subArea.id">
                  <label class="form-label">{{subArea.nombreSubArea}}</label>
                  <div class="d-flex">
                    <CFormInput :id="subArea.id" type="range" class="slider" min="0" max="100" name="porcentajeSubAreas" :value="subArea.valor" @change="CambioPorcentajePaso2(subArea.id)"/>
                    <span :id="'porcPaso2-'+ subArea.id"> {{subArea.valor}}%</span>
                  </div>
                </div>
                <div class="d-flex justify-content-end amount d-none" id="totalPorcentajeSubAreasDiv">
                  <p>Total <span id="totalPorcentajeSubAreas">{{totalPorcentajeSubAreas}}%</span></p>
                </div>
              </div>
            </div>
          </div>


          <div class="border-bottom p-3">
            <div class="d-flex flex-column flex-sm-row  justify-content-between align-items-center">
              <h1 class="title-form text-center">Importancia estrat&eacute;gica</h1> 
              <div class="btns-group">
                <button type="button" class="button button v-button is-bold is-fullwidth is-raised is-primary btn-prev" @click="SiguienteAtras(0)">Anterior</button>
                <button type="button" class="button button v-button is-bold is-fullwidth is-raised is-primary btn-next" @click="irPaso3">Siguiente</button>
              </div>
            </div>
          </div>
        </div>

        <div class="form-step">
          <div class="border-bottom p-3">
            <div class="d-flex flex-column flex-sm-row  justify-content-between align-items-center">
              <div class="d-flex justify-content-center align-items-center">
                <h1 class="title-form text-center" v-if="perfilSelected && (perfilSelected.nombre == 'Usuario pro (empresa)' )" >{{evaluacionSelected.nombre}}</h1>
                <h1 class="title-form text-center" v-if="perfilSelected && (perfilSelected.nombre != 'Usuario pro (empresa)' )" >Evaluaci&oacute;n</h1>
                <b class="tooltips p-2">
                  <p class="mb-0 circles">?</p>
                  <span class="tooltips-box">Para comenzar esta evaluación, es necesario ingresar a cada área y contestar las 
                    preguntas que se desplegarán.
                    Para que Neva logre entregar su máxima efectividad, es necesario que las preguntas sean 
                    respondidas con la máxima honestidad.
                  </span>
                </b> 
              </div>
              <div class="btns-group">
                <button type="button" class="button button v-button is-bold is-fullwidth is-raised is-primary btn-prev" v-if="perfilSelected && (perfilSelected.nombre == 'Usuario pro (empresa)' )"  @click="SiguienteAtras(1)">Anterior</button>
                <button type="button" class="button button v-button is-bold is-fullwidth is-raised" id="liveToastBtn" @click="() => { modalGuardarRespuestas = true; }">Guardar</button>
              </div>
            </div>
          </div>

          <!--main-->
          <div>
            <table id="customers">
              <tr>
                <th>Área</th>
                <th class="text-center">Porcentaje</th>
                <th class="text-end pe-4">Responder</th>
              </tr>
              <tr v-for="tablaSegmentacionArea in tablaSegmentacionAreas" :key="tablaSegmentacionArea.id">
                <td>{{tablaSegmentacionArea.nombreArea}}</td>
                <td class="table-progress" v-if="tablaSegmentacionArea.estado < 100">
                  <svg width="13" height="14" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_376_6978)">
                      <path d="M11 5.78188V6.24188C10.9994 7.32009 10.6503 8.36921 10.0047 9.23279C9.35908 10.0964 8.45164 10.7281 7.41768 11.0338C6.38372 11.3395 5.27863 11.3028 4.26724 10.9292C3.25584 10.5555 2.39233 9.86493 1.80548 8.96041C1.21863 8.05589 0.939896 6.98591 1.01084 5.91003C1.08178 4.83416 1.4986 3.81004 2.19914 2.99041C2.89968 2.17079 3.84639 1.59957 4.89809 1.36195C5.9498 1.12433 7.05013 1.23304 8.035 1.67188" stroke="#ED9A37" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11 2.24194L6 7.24694L4.5 5.74694" stroke="#ED9A37" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_376_6978">
                        <rect width="13" height="13" fill="white" transform="translate(0 0.241943)"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <p>{{parseFloat(tablaSegmentacionArea.estado).toFixed(0)}}% Completado</p>
                </td>
                <td class="table-finish" v-else>
                  <svg width="13" height="14" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_376_6978)">
                      <path d="M11 5.78188V6.24188C10.9994 7.32009 10.6503 8.36921 10.0047 9.23279C9.35908 10.0964 8.45164 10.7281 7.41768 11.0338C6.38372 11.3395 5.27863 11.3028 4.26724 10.9292C3.25584 10.5555 2.39233 9.86493 1.80548 8.96041C1.21863 8.05589 0.939896 6.98591 1.01084 5.91003C1.08178 4.83416 1.4986 3.81004 2.19914 2.99041C2.89968 2.17079 3.84639 1.59957 4.89809 1.36195C5.9498 1.12433 7.05013 1.23304 8.035 1.67188" stroke="#ED9A37" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11 2.24194L6 7.24694L4.5 5.74694" stroke="#ED9A37" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_376_6978">
                      <rect width="13" height="13" fill="white" transform="translate(0 0.241943)"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <p>{{tablaSegmentacionArea.estado}}% Completado</p>
                </td>
                <td class="text-end pe-4">
                  <button type="button" class="button button is-bold is-raised is-primary btn-next" @click="SiguienteAtras(3);getPregunta(tablaSegmentacionArea)">Responder</button>
                </td>
              </tr>
            </table>
          </div>
          <div class="p-3">
            <div class="d-flex flex-column flex-sm-row  justify-content-between align-items-center">
              <h1 class="title-form text-center" v-if="perfilSelected && (perfilSelected.nombre == 'Usuario pro (empresa)' )" >{{evaluacionSelected.nombre}}</h1> 
              <div class="btns-group">
                <button type="button" class="button button v-button is-bold is-fullwidth is-raised is-primary btn-prev" v-if="perfilSelected && (perfilSelected.nombre == 'Usuario pro (empresa)' )"  @click="SiguienteAtras(1)">Anterior</button>
                <button type="button" class="button button v-button is-bold is-fullwidth is-raised" id="liveToastBtn" v-if="estadoGeneral == 100" @click="ir('HomeReporte')">Enviar</button>
              </div>
            </div>
          </div>
        </div>

        <div class="form-step">
          <!--header form-->
          <div class="px-3">
            <div class="d-flex flex-column flex-sm-row  justify-content-between align-items-center">
              <div class="d-flex justify-content-center align-items-center">
                <h1 class="title-form text-center mx-2">{{preguntaSelected.nombreEvaluacion}}</h1>
                <b class="tooltips">
                  <p class="mb-0 circles">?</p>
                  <span class="tooltips-box">Contesta cada pregunta con la mayor honestidad posible y analiza que 
                    tan importante es para la organización.
                  </span>
                </b>
              </div>
              <div class="btns-group">
                <button type="button" class="button button v-button is-bold is-fullwidth is-raised is-primary btn-prev" @click="VolverAreasResponder()">Volver</button>
              </div>
            </div>     
          </div>
          <!--main form-->
          <div class="p-3">
            <h3 class="mb-3 color-yellow" >{{preguntaSelected.nombreArea}}</h3>
            <div class="evaluation">
              <div>
                <h4>{{preguntaSelected.nombreSubArea}}</h4>
              </div>
              <form>
                <div class="mb-4">
                  <h5>{{preguntaSelected.detalle}}</h5>
                  <div class="d-flex flex-column">
                    <div class="form-check form-check-inline" v-for="alternativa in preguntaSelected.alternativas" :key="alternativa.id">
                      <input class="form-check-input" type="radio" name="alternativas" :value="alternativa.id" v-model="alternativaSelected">
                      <label class="form-check-label" >{{alternativa.detalle}}</label>
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <h5>Importancia</h5>
                  <div class="d-flex flex-column">
                    <div class="form-check form-check-inline" v-for="tipoImportancia in tiposImportancia" :key="tipoImportancia.id">
                      <input class="form-check-input" type="radio" name="tipoImportancias" :value="tipoImportancia.id" v-model="tipoImportanciaSelected">
                      <label class="form-check-label" >{{tipoImportancia.nombre}}</label>
                    </div>
                  </div>
                </div>
                <div class="mb-4" v-if="perfilSelected && (perfilSelected.nombre=='Consultor')">
                  <h5>Deficiencia relacionada con</h5>
                  <div class="d-flex flex-column">
                    <div class="form-check form-check-inline" v-for="defRelacionada in defRelacionadas" :key="defRelacionada.id">
                      <input class="form-check-input" type="radio" name="defRelacionada" :value="defRelacionada.id" v-model="defRelacionadaSelected">
                      <label class="form-check-label" >{{defRelacionada.nombre}} </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!--footer form-->
          <div class="card-form m-3 p-3">
            <div class="d-flex flex-column flex-sm-row  justify-content-between align-items-center">
              <p class="text-center">
                <span>{{preguntaSelected.orden}}</span> de <span>{{preguntasTotal}}</span> preguntas
              </p> 
              <div class="btns-group">
                <button type="button" class="button button v-button is-bold is-fullwidth is-raised is-secundary btn-prev" @click="pasosPreguntas('atras') ; getRespuesta();">Anterior</button>
                <button type="button" class="button button v-button is-bold is-fullwidth is-raised is-primary btn-next"  @click="addRespuesta();">Siguiente</button>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  </div>

  
  <!-- MODAL RECUPERACION-->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="modalGuardarRespuestas"
    @close="() => { modalGuardarRespuestas = false; }"
  >
    <CModalHeader>
      <CModalTitle>Guardar Respuestas</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="8">
            <CFormLabel  >Se ha guardado con exito respuestas</CFormLabel>
          </CCol>
        </CRow>
      </CContainer>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { modalGuardarRespuestas = false; }">
        Cerrar
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- FIN MODAL RECUPERACION-->

</template>



<script>
import { getCurrentInstance, reactive, toRefs, onMounted } from "vue";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import { cilPen } from "@coreui/icons";
import router from "@/router/index";
import { useRoute } from "vue-router";

export default {
  name: "Evaluacion",
  components: {
  },
  methods: {
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

    const state = reactive({
      isonboarding: false,
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
      importanciaRelativa: [],
      importanciaRelativaSelected: [],
      porcentajesSubAreasSelected: [],
      allSegmentacionAreas: [],
      allSegmentacionSubAreas: [],
      tablaSegmentacionAreas: [],
      allSegmentacionSubAreasByIdArea: [],
      idAreaPaso3: "0",
      idTipoSubAreaPaso3: "0",
      evaluacionPaso3: [],
      usuarioArea: [],
      alternativaSelected: [],
      defRelacionadas: [],
      defRelacionadaSelected: [],
      tiposImportancia : [],
      tipoImportanciaSelected: [],
      preguntas : [],
      preguntaSelected : [],
      preguntasTotal:0,
      estadoGeneral: 0,

      respuestaSelected: [],
      nombreAreaSelected: "",
      nombreSubAreaSelected: "",
      modalGuardarRespuestas: false,
    });

    const route = useRoute();
      if (route.query.evaluacionId){
      state.idEvaluacionSelected = route.query.evaluacionId;
    }

    const getEvaluaciones = async () => {
      state.evaluaciones = [];
      let empresaId = JSON.parse(localStorage.usuarioModel).empresaId;
      return ApiNeva.get("Evaluacion/GetEvaluacionsByEmpresaId?empresaId=" + empresaId, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.evaluaciones = response.data.find((y) => y.id == state.idEvaluacionSelected);
        })
        .catch((error) => console.log(error));
    };

    const changeEvaluacion = async () => {
      state.idTipoAreaSelected = "0";
      let idEvaluacionSelected = document.getElementById("idEvaluacionSelected")
        .options[
        document.getElementById("idEvaluacionSelected").selectedIndex
      ].value;

      limpiarPaso1();

      if (!idEvaluacionSelected || idEvaluacionSelected == 0){
        state.totalPorcentaje = 0;
        document.getElementById("totalporcentajediv").classList.add("d-none");
        return;
      } 

      state.idEvaluacionSelected = idEvaluacionSelected;
      state.evaluacionSelected = state.evaluaciones;
      state.segmentacionAreas =  state.evaluaciones.segmentacionAreas;

      getSegmentacionAreaByevaluacionPorcentajes();

      document.getElementById("totalporcentajediv").classList.remove("d-none");
    };

    const limpiarPaso1 = async () => {
      state.evaluacionSelected = [];
      state.segmentacionAreas = [];
      state.segmentacionAreasByEvaluacion = [];
      state.totalPorcentaje = 0;
    };

    const getSegmentacionAreaByevaluacionPorcentajes = async () =>{
      state.porcentajesAreaSelected = [];
      let evaluacionEmpresaId = state.evaluacionSelected.evaluacionEmpresas.find((y) => y.evaluacionId == state.evaluacionSelected.id).id;
      let bodySegmentacionArea = {
          id: evaluacionEmpresaId,
      };
      ApiNeva.post("ImportanciaRelativa/GetImportanciaRelativasByEvaluacionEmpresaId", bodySegmentacionArea , {
        headers: header,
      })
      .then((response) => {
        if (response.status != 200) return false;
        state.porcentajesAreaSelected = response.data;

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
      if (state.totalPorcentaje != 100 ){
        document.getElementById("totalporcentaje").classList.remove("text-success");
        document.getElementById("totalporcentaje").classList.add("text-danger");
        return;
      }
      document.getElementById("totalporcentaje").classList.remove("text-danger");
      document.getElementById("totalporcentaje").classList.add("text-success");
    };

    const irPaso2 = async () => {
      state.idTipoAreaSelected = "0";
      state.idEvaluacionSelected = state.evaluacionSelected.id;
      state.segmentacionAreaSelected = [];
      state.segmentacionSubAreasbyAreaSelected = [];
      document.getElementById("totalPorcentajeSubAreasDiv").classList.add("d-none");
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
      
      if (state.totalPorcentaje < 100){
        swal.fire({
          title: "Preparación de áreas",
          text: "No puede ser menor al 100% de importancia entre las áreas",
          icon: "warning",
        });
        return false;
      }

      if (state.totalPorcentaje > 100){
        swal.fire({
          title: "Preparación de áreas",
          text: "No puede sobrepasar el 100% de importancia entre las áreas",
          icon: "warning",
        });
        return false;
      }
      
      guardarPorcentajeAreas();
    };

    const guardarPorcentajeAreas = async () => {
       state.ImportanciaRelativa = [];
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
          state.ImportanciaRelativa = state.ImportanciaRelativa.concat(response.data);
          SiguienteAtras(1); //Se avanza a Paso Importancia Estrategica
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
      if (state.totalPorcentajeSubAreas != 100){
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
        state.totalPorcentajeSubAreas = 0;
        document.getElementById("totalPorcentajeSubAreasDiv").classList.add("d-none");
        return;
      } 

      state.idTipoAreaSelected = idTipoAreaSelected;
      state.segmentacionAreaSelected = state.segmentacionAreasByEvaluacion.find((y) => y.id == idTipoAreaSelected);

      getSegmentacionSubAreaByAreaPorcentajes();

      document.getElementById("totalPorcentajeSubAreasDiv").classList.remove("d-none");
    };

    const limpiarPaso2 = async () => {
      state.segmentacionAreaSelected = [];
      state.segmentacionSubAreasbyAreaSelected = [];
      state.totalPorcentajeSubAreas = 0;
      state.idTipoAreaSelected  = "0";
      state.importanciaRelativaSelected = [];
    };

    const getSegmentacionSubAreaByAreaPorcentajes = async () => {
      let evaluacionEmpresaId = state.evaluacionSelected.evaluacionEmpresas.find((y) => y.evaluacionId == state.evaluacionSelected.id).id;
      state.importanciaRelativaSelected = state.ImportanciaRelativa.find((y) => y.evaluacionEmpresaId == evaluacionEmpresaId && y.segmentacionAreaId == state.segmentacionAreaSelected.id);

      ApiNeva.post("ImportanciaEstrategica/GetImportanciaEstrategicasByImportanciaRelativaId", state.importanciaRelativaSelected , {
        headers: header,
      })
      .then((response) => {
        if (response.status != 200) return false;
        state.porcentajesSubAreasSelected = response.data;

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
        if (state.totalPorcentajeSubAreas == 100){
          document.getElementById("totalPorcentajeSubAreas").classList.remove("text-danger");
          document.getElementById("totalPorcentajeSubAreas").classList.add("text-success");
        }else{
          document.getElementById("totalPorcentajeSubAreas").classList.remove("text-success");
          document.getElementById("totalPorcentajeSubAreas").classList.add("text-danger");
        }
      })
      .catch((error) => console.log(error));
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
      if (state.totalPorcentajeSubAreas < 100){
        swal.fire({
          title: "Preparación sub áreas",
          text: "No puede ser menor al 100% de importancia entre las sub áreas",
          icon: "warning",
        });
        return false;
      }
      if (state.totalPorcentajeSubAreas > 100){
        swal.fire({
          title: "Preparación sub áreas",
          text: "No puede sobrepasar el 100% de importancia entre las sub áreas",
          icon: "warning",
        });
        return false;
      }
      guardarPorcentajeSubAreas();
      state.idAreaPaso3 = "0";
      state.idTipoSubAreaPaso3 = "0";
    };

    const guardarSubAreasChange = async () => {
      let idSubAreasPorcentajes = document.getElementsByName("porcentajeSubAreas");
      let largo = 0;
      let total = 0;
      if (idSubAreasPorcentajes.length > 0){
        idSubAreasPorcentajes.forEach((element) => {
          total = total + parseInt(element.value)
        });
        if (total < 100){
          swal.fire({
            title: "Preparación sub áreas",
            text: "No puede ser menor al 100% de importancia entre las sub áreas",
            icon: "warning",
          });
          return false;
        }
        if (total > 100){
          swal.fire({
            title: "Preparación sub áreas",
            text: "No puede sobrepasar el 100% de importancia entre las sub áreas",
            icon: "warning",
          });
          return false;
        }
        let evaluacionEmpresaId = state.evaluacionSelected.evaluacionEmpresas.find((y) => y.evaluacionId == state.evaluacionSelected.id).id;
        state.importanciaRelativaSelected = state.ImportanciaRelativa.find((y) => y.evaluacionEmpresaId == evaluacionEmpresaId && y.segmentacionAreaId == state.segmentacionAreaSelected.id);
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
            largo++;
            if (response.status != 200){
              swal.fire({
                title: "Preparación de sub áreas",
                text: "Error al guardar porcentajes" + error,
                icon: "warning",
              });
              return false;
            }
            if (largo >= idSubAreasPorcentajes.length){
            }
          })
          .catch((error) => console.log(error));
        });
      }
    };

    const guardarPorcentajeSubAreas = async () => {
      let idSubAreasPorcentajes = document.getElementsByName("porcentajeSubAreas");
      let largo = 0;
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
          largo++;
          if (response.status != 200){
            swal.fire({
              title: "Preparación de sub áreas",
              text: "Error al guardar porcentajes" + error,
              icon: "warning",
            });
            return false;
          }
          if (largo >= idSubAreasPorcentajes.length){
            getUsuarioAreasByEvaluacionSelected();
          }
        })
        .catch((error) => console.log(error));
      });
    };

    const getUsuarioAreasByEvaluacionSelected = async () => {
      state.evaluacionPaso3 = [];
      state.allSegmentacionAreas = [];
      state.allSegmentacionSubAreas = [];

      state.evaluacionPaso3.push(state.evaluacionSelected);
      state.allSegmentacionAreas = state.segmentacionAreasByEvaluacion;
      state.allSegmentacionAreas.forEach(x => {
        state.allSegmentacionSubAreas = state.allSegmentacionSubAreas.concat(x.segmentacionSubAreas);
      }); 
      
      state.tablaSegmentacionAreas = [];
      getEstadoSubArea();
    };

    const getUsuarioAreas = async () => {
      let bodyUsuarioEvaluacion = {
        id: localStorage.iduser
      }
        ApiNeva.post("UsuarioEvaluacion/GetUsuarioEvaluacionsByUsuarioId", bodyUsuarioEvaluacion ,{
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.usuarioArea = response.data;
          getAllAreas();
        })
        .catch((error) => console.log(error));
    };

    const getAllAreas = async () => {
      state.allSegmentacionAreas = [];
      state.allSegmentacionSubAreas = [];
      state.tablaSegmentacionAreas = [];
      
      ApiNeva.get("Evaluacion/GetEvaluacionsByEmpresaId?empresaId=" + JSON.parse(localStorage.usuarioModel).empresaId , {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.evaluacionPaso3 = response.data;
          response.data.forEach(x => {
            state.allSegmentacionAreas = state.allSegmentacionAreas.concat(x.segmentacionAreas);
          });

          let areas = [];
          state.allSegmentacionAreas.forEach(element => {
            state.usuarioArea.forEach(x => {
              x.usuarioAreas.forEach(y => {
                if (y.segmentacionAreaId == element.id && y.activo){
                  areas = areas.concat(element);
                }
              });
            });
          });

          state.allSegmentacionAreas = areas;

          state.allSegmentacionAreas.forEach(x => {
            state.allSegmentacionSubAreas = state.allSegmentacionSubAreas.concat(x.segmentacionSubAreas);
          });
          getEstadoSubArea();
        })
        .catch((error) => console.log(error));
    };

    const getEstadoSubArea = async () => {
      let bodyEmpresa =  { 
        id: JSON.parse(localStorage.usuarioModel).empresaId 
      };

      ApiNeva.post("SegmentacionSubArea/GetEstadoSubAreas", bodyEmpresa ,{
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          response.data.forEach(x => {
            state.allSegmentacionSubAreas.forEach(y => {
              if (x.segmentacionSubAreaId == y.id){
                y.estado = x.respuestaPorcentaje;
              }
            });
          });
          cargarTablaPaso3();
        })
        .catch((error) => console.log(error));
    };


    const cargarTablaPaso3 = async () => {
      state.tablaSegmentacionAreas = [];
      state.estadoGeneral = 0;
      let contador = 0;
      let contadorArea = 0;
      let estadoGeneral = 0;
      state.allSegmentacionAreas.forEach (x => {
        x.estado = 0;
        contador = 0;
        contadorArea++;
        state.allSegmentacionSubAreas.forEach(y => {
            if (y.segmentacionAreaId == x.id){
              contador++;
              x.estado = (x.estado + parseInt(y.estado));
            };
        });
        x.estado = x.estado / contador;
        estadoGeneral = (estadoGeneral + x.estado);
        state.tablaSegmentacionAreas.push(x);
      });

      state.estadoGeneral = estadoGeneral / contadorArea;
      
      SiguienteAtras(2); //Se avanza a Paso Evaluacion
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
    };

    const getPregunta = (segmentacionArea) => {
      state.preguntas = [];
      state.preguntaSelected = [];
      state.preguntasTotal = [];
      state.nombreAreaSelected = segmentacionArea.nombreArea;
      state.nombreSubAreaSelected = segmentacionArea.nombreSubArea;

      let bodySegmentacionArea = {
        id: segmentacionArea.id
      };
      ApiNeva.post("Pregunta/GetPreguntasBySegmentacionAreaId" , bodySegmentacionArea,  {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;;
          state.preguntas = response.data;
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
          let segmentacionArea = [];
          let segmentacionSubArea = [];
          let evaluacion = [];
          state.preguntas.forEach((element) => {
            orden++;
            element.orden = orden;
            segmentacionArea = state.allSegmentacionAreas.find((y) => y.id == element.segmentacionAreaId);
            element.nombreArea = segmentacionArea.nombreArea;
            segmentacionSubArea = state.allSegmentacionSubAreas.find((y) => y.id == element.segmentacionSubAreaId);
            element.nombreSubArea = segmentacionSubArea.nombreSubArea;
            evaluacion = state.evaluaciones;
            element.nombreEvaluacion = evaluacion.nombre;
          });
          state.preguntaSelected = state.preguntas[0];
          getTipoimportancia();
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
           if (state.perfilSelected.nombre == "Consultor") {
            getDeficienciaRelacionada();
           } else {
            getRespuesta();
           }
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
          getRespuesta();
        })
        .catch((error) => console.log(error));
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
        evaluacionEmpresaId: EvaluacionEmpresa.id
      };

      ApiNeva.post("Respuesta/GetRespuestaByIdsPreguntaUsuarioEvaluacionEmpresa", bodyRespuesta,  {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.respuestaSelected = response.data;
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

    const limpiarRespuestas = async (name) => {
      let radios = document.getElementsByName(name);
      for (let x = 0; x < radios.length; x++) {
        let obj = radios[x];
        obj.checked = false;
      }
    };

    const VolverAreasResponder = async () => {
      limpiarRespuestas("alternativas");
      limpiarRespuestas("tipoImportancias");
      state.alternativaSelected = [];
      state.tipoImportanciaSelected = [];
      if (state.perfilSelected.nombre == "Consultor"){
        limpiarRespuestas("defRelacionada");
        state.defRelacionadaSelected = [];
        getUsuarioAreas();
        return;
      }
      getUsuarioAreasByEvaluacionSelected();
    };

    const oncreated = () => {
      if (route.query.evaluacionId){
        changeEvaluacion();
      }
      state.perfilSelected = JSON.parse(localStorage.usuarioModel).perfil;
      SiguienteAtras(0);
      if (state.perfilSelected.nombre != "Usuario pro (empresa)") {
        SiguienteAtras(2);
        getUsuarioAreas();
      }else{
        
      }
    };

    const SiguienteAtras = async (formStepsNum) => {
      const formSteps = document.querySelectorAll(".form-step");
      const progressBar = document.querySelector(".progressbar");
      formSteps.forEach((formStep) => {
        formStep.classList.contains("form-step-active") &&
          formStep.classList.remove("form-step-active");
      });
      formSteps[formStepsNum].classList.add("form-step-active");

      const progressSteps = document.querySelectorAll(".progress-step");
      progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum + 1) {
          progressStep.classList.add("progress-step-active");
        } else {
          progressStep.classList.remove("progress-step-active");
        }
      });

      const progressActive = document.querySelectorAll(".progress-step-active");

      progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
      
      if (formStepsNum===3) {
        progressBar.classList.add("d-none")
      }
      else if (formStepsNum<3) {
        progressBar.classList.remove("d-none")
      }
    };

    const ir = (namePageDestiny) => {
      return router.push({ name: namePageDestiny, query: {evaluacionId: state.evaluacionSelected.id, evaluacionNombre: state.evaluacionSelected.nombre } });
    };

    onMounted(async () => {
      await getEvaluaciones();
      oncreated();
    });

    return {
      ...toRefs(state),
      SiguienteAtras,

      formatterMoney,

      irPaso2,
      irPaso3,


      changeEvaluacion,
      changeSegmentacionArea,
      changeSegmentacionSubAreaPaso3,
      getPregunta,
      cilPen,
      CambioPorcentajePaso1,
      CambioPorcentajePaso2,
      addRespuesta,
      getRespuesta,
      pasosPreguntas,
      VolverAreasResponder,
      ir,
      guardarSubAreasChange,
    };
  },
};
</script>
