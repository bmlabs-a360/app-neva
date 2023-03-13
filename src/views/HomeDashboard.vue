<template>
   <!--Contenido-->
    <div class="row view-wrapper" v-if="perfil == 'Consultor' || perfil == 'Usuario pro (empresa)' || perfil == 'Administrador'">
        <!--Inicia Tabs-->
        <div class="col-12 d-flex mt-3 mt-sm-0 mt-lg-5 flex-column flex-sm-row justify-content-between align-items-center">
            <ul class="nav nav-pills mb-2 mb-sm-0" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Todos</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Importantes</button>
                </li>
            </ul>
            <div class="">
                <div class="control has-icon">
                    <input class="input new w-100" type="text"  @change="getEvaluacionesPaginated(true)" id="buscadorEvaluacion" placeholder="Buscador Evaluación">
                    <label class="form-icon search" for="">
                        <svg width="24" height="24" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_258_3270)">
                                <path d="M11.7294 9.85843L9.88579 8.01574C10.5504 7.23363 10.9522 6.22242 10.9522 5.11838C10.9522 2.64697 8.93993 0.635742 6.46658 0.635742C3.99324 0.635742 1.98163 2.64697 1.98163 5.11838C1.98163 7.58979 3.9939 9.60102 6.46658 9.60102C7.45592 9.60102 8.37148 9.27843 9.11382 8.73399L10.9838 10.603C11.0866 10.7057 11.2216 10.7571 11.3566 10.7571C11.4917 10.7571 11.626 10.7057 11.7294 10.603C11.9349 10.3976 11.9349 10.0638 11.7294 9.85843ZM3.03552 5.11838C3.03552 3.22763 4.57485 1.68909 6.46658 1.68909C8.35831 1.68909 9.89765 3.22763 9.89765 5.11838C9.89765 7.00913 8.35831 8.54768 6.46658 8.54768C4.57485 8.54768 3.03552 7.00913 3.03552 5.11838Z" fill="#EAEBEF"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_258_3270">
                                    <rect width="16" height="15" fill="white" transform="translate(0.932617 0.195557)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </label>
                </div>
            </div>
        </div>
        <!--Inicia Termina Tabs-->
        <!-- Inicio Content tabs-->
        <div class="tab-content pb-2" id="pills-tabContent">
            <!--Inicia Pills 1-->
            <div class="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                <div class="card mt-3 mb-2 d-flex ">   
                    <div class="table-responsive pie-table">
                        <table class="table table-hover">
                            <tbody>
                                <tr v-for="evaluacion in evaluaciones" :key="evaluacion.id" @click="cargarGraficos(evaluacion)" class="cursor-pointer">
                                    <th scope="row">
                                        <div class="form-check">
                                            <input class="form-check-input cursor-pointer" type="radio" name="evaluacionSelected" @click="cargarGraficos(evaluacion)" value="" :id="evaluacion.id">
                                            <label class="form-check-label" for="flexCheckDefault">
                                            </label>
                                        </div>
                                    </th>
                                    <td>
                                        <div class="grafica">
                                            <button class="btn circle-two-n2 order-md-2">
                                                {{evaluacion.iniciales}}
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">{{evaluacion.nombre}}</h4>
                                            <div class="d-flex align-items-center data-icon justify-content-center justify-content-md-between flex-wrap">
                                                <div class="d-flex align-items-center " v-if="evaluacion.estado==100">
                                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_258_1364)">
                                                            <path d="M11.0674 5.97389V6.43389C11.0668 7.5121 10.7176 8.56123 10.0721 9.4248C9.42647 10.2884 8.51903 10.9201 7.48506 11.2258C6.4511 11.5316 5.34601 11.4948 4.33462 11.1212C3.32322 10.7475 2.45971 10.0569 1.87286 9.15243C1.28602 8.24791 1.00728 7.17792 1.07822 6.10205C1.14916 5.02617 1.56599 4.00206 2.26652 3.18243C2.96706 2.3628 3.91378 1.79158 4.96548 1.55397C6.01718 1.31635 7.11752 1.42506 8.10239 1.86389" stroke="#15ACC0" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M11.0674 2.43384L6.06738 7.43884L4.56738 5.93884" stroke="#15ACC0" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_258_1364">
                                                                <rect width="12" height="12" fill="#15ACC0" transform="translate(0.0673828 0.433838)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <p class="responsible-table">{{evaluacion.estado}}% Completado</p>
                                                </div>
                                                <div class="d-flex align-items-center color-warning" v-else>
                                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_258_1364)">
                                                            <path d="M11.0674 5.97389V6.43389C11.0668 7.5121 10.7176 8.56123 10.0721 9.4248C9.42647 10.2884 8.51903 10.9201 7.48506 11.2258C6.4511 11.5316 5.34601 11.4948 4.33462 11.1212C3.32322 10.7475 2.45971 10.0569 1.87286 9.15243C1.28602 8.24791 1.00728 7.17792 1.07822 6.10205C1.14916 5.02617 1.56599 4.00206 2.26652 3.18243C2.96706 2.3628 3.91378 1.79158 4.96548 1.55397C6.01718 1.31635 7.11752 1.42506 8.10239 1.86389" stroke="#15ACC0" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M11.0674 2.43384L6.06738 7.43884L4.56738 5.93884" stroke="#15ACC0" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_258_1364">
                                                                <rect width="12" height="12" fill="#15ACC0" transform="translate(0.0673828 0.433838)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <p class="responsible-table">{{parseFloat(evaluacion.estado).toFixed(0)}}% Completado</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Madurez</h4>
                                            <div class="d-flex align-items-center data-icon justify-content-center justify-content-md-between flex-wrap">
                                                <div class="d-flex align-items-center" v-if="evaluacion.estado == 100">
                                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_258_1364)">
                                                            <path d="M11.0674 5.97389V6.43389C11.0668 7.5121 10.7176 8.56123 10.0721 9.4248C9.42647 10.2884 8.51903 10.9201 7.48506 11.2258C6.4511 11.5316 5.34601 11.4948 4.33462 11.1212C3.32322 10.7475 2.45971 10.0569 1.87286 9.15243C1.28602 8.24791 1.00728 7.17792 1.07822 6.10205C1.14916 5.02617 1.56599 4.00206 2.26652 3.18243C2.96706 2.3628 3.91378 1.79158 4.96548 1.55397C6.01718 1.31635 7.11752 1.42506 8.10239 1.86389" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M11.0674 2.43384L6.06738 7.43884L4.56738 5.93884" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_258_1364">
                                                                <rect width="12" height="12" fill="white" transform="translate(0.0673828 0.433838)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <p class="responsible">{{evaluacion.IM}}</p>
                                                </div>
                                                <div class="d-flex align-items-center" v-else>
                                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_258_1364)">
                                                            <path d="M11.0674 5.97389V6.43389C11.0668 7.5121 10.7176 8.56123 10.0721 9.4248C9.42647 10.2884 8.51903 10.9201 7.48506 11.2258C6.4511 11.5316 5.34601 11.4948 4.33462 11.1212C3.32322 10.7475 2.45971 10.0569 1.87286 9.15243C1.28602 8.24791 1.00728 7.17792 1.07822 6.10205C1.14916 5.02617 1.56599 4.00206 2.26652 3.18243C2.96706 2.3628 3.91378 1.79158 4.96548 1.55397C6.01718 1.31635 7.11752 1.42506 8.10239 1.86389" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M11.0674 2.43384L6.06738 7.43884L4.56738 5.93884" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_258_1364">
                                                                <rect width="12" height="12" fill="white" transform="translate(0.0673828 0.433838)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <p class="responsible">---</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Fecha Termino</h4>
                                            <div class="d-flex align-items-center data-icon justify-content-center justify-content-md-between flex-wrap">
                                                <div class="d-flex align-items-center ">
                                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_258_1364)">
                                                            <path d="M11.0674 5.97389V6.43389C11.0668 7.5121 10.7176 8.56123 10.0721 9.4248C9.42647 10.2884 8.51903 10.9201 7.48506 11.2258C6.4511 11.5316 5.34601 11.4948 4.33462 11.1212C3.32322 10.7475 2.45971 10.0569 1.87286 9.15243C1.28602 8.24791 1.00728 7.17792 1.07822 6.10205C1.14916 5.02617 1.56599 4.00206 2.26652 3.18243C2.96706 2.3628 3.91378 1.79158 4.96548 1.55397C6.01718 1.31635 7.11752 1.42506 8.10239 1.86389" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M11.0674 2.43384L6.06738 7.43884L4.56738 5.93884" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </g>
                                                        <defs>
                                                        <clipPath id="clip0_258_1364">
                                                            <rect width="12" height="12" fill="white" transform="translate(0.0673828 0.433838)"/>
                                                        </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <p class="responsible">{{evaluacion.fechaTermino}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td v-if="evaluacion.estado == 100">
                                        <button class="btn disabled orange order-md-1 me-lg-4 mt-lg-0" aria-disabled="true">Terminado</button>
                                    </td>
                                    <td v-else>
                                        <button class="btn orange order-md-1 me-lg-4 mt-lg-0" @click="ir('Evaluacion', evaluacion)">Responder</button>
                                    </td>
                                    <td v-if="evaluacion.estado == 100"> 
                                        <button class="icons">
                                            <svg xmlns="http://www.w3.org/2000/svg" @click="ir('HomeReporte', evaluacion)" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="feather:eye" class="iconify iconify--feather cursor-pointer"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                <path d="M1 12s4-8 11-8s11 8 11 8s-4 8-11 8s-11-8-11-8z">
                                                </path>
                                                <circle cx="12" cy="12" r="3">
                                                </circle>
                                                </g>
                                            </svg>
                                        </button>
                                    </td>
                                    <td v-else> 
                                        <button class="icons" disabled>
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="feather:eye" class="iconify iconify--feather"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                <path d="M1 12s4-8 11-8s11 8 11 8s-4 8-11 8s-11-8-11-8z">
                                                </path>
                                                <circle cx="12" cy="12" r="3">
                                                </circle>
                                                </g>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>  
                    </div> 
                </div> 
                <!-- Paginacion-->
                <nav aria-label="..." class="d-flex justify-content-between align-items-center">
                    <div class="d-flex">
                        <!--<p class="message">Mostrando <span>1</span> a <span>10</span> de 16 entradas</p>-->
                    </div>
                    <div class="d-flex">
                        <paginate
                            v-model="initialPage"
                            :page-count="totalevaluaciones"
                            :page-range="3"
                            :margin-pages="2"
                            :click-handler="selectedPagination"
                            :prev-text="'<'"
                            :next-text="'>'"
                            :container-class="'pagination'"
                            :page-class="'page-item'">
                        </paginate>
                    </div>
                </nav>
                <!--Fin Paginacion-->
            </div>
            <!--Termina Pills 1-->
        </div>
        <!--Fin Content tabs-->

        <!-- Inicio Cajas -->
        <section class="cards mb-4 justify-content-between">
            <div class="cards-grafic p-3 d-flex">
                <div class="w-100">
                    <h2>Indice de madurez entre area</h2>
                    <div >
                        <div :md="12">
                            <CCard class="mb-4">
                                <CCardBody >
                                    <CChart
                                        type="bar"
                                        :data="resumenIM"
                                    />
                                </CCardBody>
                            </CCard>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="cards-grafic p-3">
                <div class="w-100">
                    <h2>Puntuación entre area</h2>
                    <div>
                        <div :md="12">
                            <CCard class="mb-4">
                                <CCardBody >
                                    <CChart
                                        type="bar"
                                        :data="resumenPuntuacionArea"
                                    />
                                </CCardBody>
                            </CCard>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cards-grafic p-3">
                <div class="w-100">
                    <h2>Porcentaje importancia relativa</h2>
                    <div :md="12">
                        <CCard class="mb-4">
                        <CCardBody >
                            <CChart type="bar" :data="resumenImportanciaRelativa" />
                        </CCardBody>
                        </CCard>
                    </div>
                </div>
            </div>

            <div class="cards-grafic">
                <div class="d-flex w-100  justify-content-between">
                    <p>Inbox</p>
                    <div>
                        <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12.9787" cy="5.15581" r="1.65337" fill="#283252"/>
                            <circle cx="12.9786" cy="10.9427" r="1.65337" fill="#283252"/>
                            <circle cx="12.9786" cy="16.7295" r="1.65337" fill="#283252"/>
                        </svg>    
                    </div>
                </div>
                <div class="d-flex w-100 row cards-none">
                    <div class="col-12 img-left d-flex align-items-center w-100 mb-3 ">
                        <img class="user-photo me-3" alt="" src="../assets/img/nav/pers/02.png">
                        <h3>{{userSelected.nombres}}</h3>        
                    </div>
                    <div class="col-12 card p-3">
                        <div class="circle d-flex align-items-center ">
                            <div class=" active me-2 ">
                            </div>
                            <h6>administrador</h6>
                        </div>
                        <p class="message">Estamos 
                        <a href="mailto:contacto@neva.cl?Subject=Contacto%20A360%20NEVA">aquí</a> ante cualquier pregunta, no dudes en contactarnos.</p>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </section>
        <!-- Fin Cajas-->
    </div>
<!--Termino Contendio-->
</template>

<script>
import { reactive, toRefs, onMounted, getCurrentInstance } from "vue";
import ApiNeva from "@/api/ApiNeva";
import ApibackOffice from "@/api/ApiBackOffice";
import { style } from "@/assets/css/style.css";
import logoNeva from "@/assets/img/nav/logos/logo-negro.svg";
import logoConfiguracion from "@/assets/img/nav/config.svg";
import logoCubo from "@/assets/img/nav/cubo.svg";
import logoLatam from "@/assets/img/clientes/logo_latam.jpg";
import logoPersona from "@/assets/img/nav/pers/02.png";
import router from "@/router/index";
import { CChart } from "@coreui/vue-chartjs";
import { colorAleatorio } from "@/Helper/util";
import Paginate from 'vuejs-paginate-next';

export default {
  name: "Login",
  components:{
    CChart,
    paginate: Paginate,
  },
  methods: {
    colorAleatorio,
  },
  setup() {
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const header = {
      ApiKey,
    };

    const state = reactive({
        userSelected : [],
        perfil : [],
        evaluaciones : [],
        SegmentacionAreas : [],
        SegmentacionSubAreas : [],
        evaluacionSelected : [],
        evaluacionEmpresa : [],

        IMA: [],
        resumenIM: [],
        resumenPuntuacionArea:[],
        resumenImportanciaRelativa: [],

        initialPage: 1,
        totalevaluaciones: 0,
        sizePage: 10,

        //resumenImportanciaEstrategica: [],
        //segmentacionAreaSelected : [],
    });

    const selectedPagination = async (pageNum) => {
        state.initialPage = pageNum;
        state.resumenIM = [];
        state.resumenPuntuacionArea = [];
        state.resumenImportanciaRelativa = [];
        await getEvaluacionesPaginated(false);
        if (state.evaluaciones.length > 0){
        cargarGraficos(state.evaluaciones[0]);
    }
    };

    const getEvaluacionesPaginated = async (iniciarPage) => {
        let buscadorEvaluacion = "";
        if (iniciarPage) {
            state.initialPage = 1
            buscadorEvaluacion = document.getElementById('buscadorEvaluacion').value;
        };
        let empresaId = JSON.parse(localStorage.usuarioModel).empresaId;
        ApiNeva.post("Evaluacion/GetEvaluacionsByEmpresaIdFilterCount?empresaId=" + empresaId + "&filter=" + buscadorEvaluacion, {
            headers: header,
        })
            .then((response) => {
                if (response.status != 200) return false;
                state.totalevaluaciones = Math.ceil(response.data / state.sizePage);
            })
            .catch(() => {
                state.totalevaluaciones = null;
            });

        return ApiNeva.post('Evaluacion/GetEvaluacionsByEmpresaIdFilterList?empresaId=' + empresaId + '&initialPage=' + state.initialPage + '&sizePage=' + state.sizePage  + "&filter=" + buscadorEvaluacion, {
            headers: header,
        })
            .then((response) => {
                if (response.status != 200) return false;
                state.evaluaciones = response.data;
                state.evaluaciones.forEach((m) => {
                    m.iniciales = m.nombre.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g).join("").substring("0","2");
                    if (m.iniciales.length < 2){
                        m.iniciales =  m.nombre.substring("0", "2");
                    }
                    let fecha = new Date(m.fechaCreacion);
                    fecha.setDate(fecha.getDate() + parseInt(m.tiempoLimite));
                    m.fechaTermino = new Date(fecha).toLocaleString().split(",")[0];
                    state.SegmentacionAreas = state.SegmentacionAreas.concat(m.segmentacionAreas);
                });
            })
            .catch(() => {
                state.totalevaluaciones = null;
                state.evaluaciones = null;
            });
    };

    const getUsuario = async () => {
        state.userSelected = JSON.parse(localStorage.usuarioModel);
        state.perfil = state.userSelected.perfil.nombre;
        await getEvaluacionesPaginated(false);
        getIM();
        await getEstadoSubArea();

        if (state.evaluaciones.length > 0){
            cargarGraficos(state.evaluaciones[0]);
        }
    };

    const getIM = () => {
        state.evaluaciones.forEach((m) => {
            var filtro = {
                "evaluacionId":  m.id,
                "empresaId": JSON.parse(localStorage.usuarioModel).empresaId
            }
            ApibackOffice.post("Madurez/GetIM", filtro, { 
                headers: header 
            })
            .then((response) => {
                if (response.status != 200) return false;
                if (response.data[0] == undefined){
                    m.IM = 0;
                }else{
                    m.IM = response.data[0].imValor.toFixed(2);
                }
            })
            .catch((error) => console.log(error));
            return false;
        });
    };

    const getEstadoSubArea = async () => {
        state.SegmentacionAreas.forEach(x => {
            state.SegmentacionSubAreas = state.SegmentacionSubAreas.concat(x.segmentacionSubAreas);
        });

        let bodyEmpresa =  { 
            id: JSON.parse(localStorage.usuarioModel).empresaId 
        };

        ApiNeva.post("SegmentacionSubArea/GetEstadoSubAreas", bodyEmpresa ,{
            headers: header,
        })
        .then((response) => {
            if (response.status != 200) return false;
            response.data.forEach(x => {
                state.SegmentacionSubAreas.forEach(y => {
                    if (x.segmentacionSubAreaId == y.id){
                        y.estado = x.respuestaPorcentaje;
                    }
                });
            });
            let contador = 0;
            let contadorArea = 0;
            let estadoGeneral = 0;
            state.SegmentacionAreas.forEach (x => {
                x.estado = 0;
                contador = 0;
                contadorArea++;
                state.SegmentacionSubAreas.forEach(y => {
                    if (y.segmentacionAreaId == x.id){
                    contador++;
                    x.estado = (x.estado + parseInt(y.estado));
                    };
                });
                x.estado = x.estado / contador;
                estadoGeneral = (estadoGeneral + x.estado);
            });
            state.evaluaciones.forEach (x => {
                x.estado = 0;
                contador = 0;
                contadorArea++;
                state.SegmentacionAreas.forEach(y => {
                    if (y.evaluacionId == x.id){
                        contador++;
                        x.estado = (x.estado + parseInt(y.estado));
                    };
                });
                x.estado = x.estado / contador;
                estadoGeneral = (estadoGeneral + x.estado);
            });
        })
        .catch((error) => console.log(error));
    };

    const cargarGraficos = async (evaluacionSelected) => {
        if (document.getElementById(evaluacionSelected.id) != undefined){
            document.getElementById(evaluacionSelected.id).checked = true;
        } 
        state.evaluacionSelected = evaluacionSelected;
        await getIMA();
        getGraficoPuntuacionArea();
    };

    const getIMA = async () => {
        var filtro = {
            "evaluacionId":   state.evaluacionSelected.id,
            "empresaId": JSON.parse(localStorage.usuarioModel).empresaId
        }
        return ApibackOffice.post("Madurez/GetIMA", filtro,
            { headers: header }
        )
        .then((response) => {
            if (response.status != 200) return false;
            state.IMA = response.data;
            let dataSetIMA = [];
            let dataSetPesoRelativo = [];
            let dataSetPuntuacionArea = [];
            let labels = [];
            let valorDataIMA = [];
            let valorDataPesoRelativo = [];
            let valorDataPuntuacionArea = [];
            state.IMA.forEach((element) => {
                labels.push(element.nombreArea);
                valorDataIMA.push((element.imaValor).toFixed(2));
                valorDataPesoRelativo.push(element.pesoRelativoAreaPorc);
                valorDataPuntuacionArea.push((element.imaValor / 5) * 100);
            });

            //#region IMA
            let elementoIMA = {
                label: state.evaluacionSelected.nombre,
                backgroundColor:   colorAleatorio(),
                data: valorDataIMA
            };
            dataSetIMA.push(elementoIMA);

            state.resumenIM = {
                labels: labels,
                datasets: dataSetIMA
            };
            //#endregion

            //#region PesoRelativo
            let elementoPesoRelativo = {
                label: state.evaluacionSelected.nombre,
                backgroundColor:   colorAleatorio(),
                data: valorDataPesoRelativo
            };

            dataSetPesoRelativo.push(elementoPesoRelativo);

            state.resumenImportanciaRelativa = {
                labels: labels,
                datasets: dataSetPesoRelativo
            };
            //#endregion

             //#region PuntuacionArea
            let elementoPuntuacionArea = {
                label: state.evaluacionSelected.nombre,
                backgroundColor:   colorAleatorio(),
                data: valorDataPuntuacionArea
            }

            dataSetPuntuacionArea.push(elementoPuntuacionArea);

            state.resumenPuntuacionArea = {
                labels: labels,
                datasets: dataSetPuntuacionArea
            };
            //#endregion
        })
        .catch((error) => {
            console.log("error->", error);
        });
    };

    const getGraficoPuntuacionArea = () => {
        let dataSet = [];
        let labels = [];
        let valorDataList = [];
        state.IMA.forEach((element) => {
            labels.push(element.nombreArea);
            valorDataList.push((element.imaValor / 5) * 100);
        });

        let elemento = {
            label: state.evaluacionSelected.nombre,
            backgroundColor:   colorAleatorio(),
            data: valorDataList
        }

        dataSet.push(elemento);

        state.resumenPuntuacionArea = {
            labels: labels,
            datasets: dataSet
        };
    };

    const ir = (namePageDestiny, evaluacion) => {
        return router.push({ name: namePageDestiny , query : {evaluacionId : evaluacion.id, evaluacionNombre: evaluacion.nombre} });
    };

    onMounted(() => {
      getUsuario();
    });

    return {
      ...toRefs(state),
      style,
      logoNeva,
      logoConfiguracion,
      logoCubo,
      logoLatam,
      logoPersona,
      ir,
      cargarGraficos,
      selectedPagination,
      getEvaluacionesPaginated
    };
  },
};
</script>
