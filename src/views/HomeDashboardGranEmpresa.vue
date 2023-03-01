<template>
    <!--Contenido-->
    <div class="row view-wrapper" v-if="perfil=='Gran empresa'">
      <div class="col-12 d-flex justify-content-between">
      </div>
      <!--Inicia Tabs-->
      <div class="col-12 d-flex mt-3 mt-sm-0 mt-lg-5 flex-sm-row justify-content-between align-items-center">
        <div class="">
          <div class="control has-icon">
            <input class="input new w-100" type="email" placeholder="Buscador">
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
        <!--<button class="btn btn-sm orange  order-md-1 me-lg-0 mt-lg-0 ">Añadir</button>-->
      </div>

      <div class="mainregister d-flex pb-2">
        <div class="card mt-3 mb-2 d-flex ">   
          <div class="table-responsive pie-table">
            <table class="table table-hover">
              <tbody>
                <tr v-for="evaluacion in evaluaciones" :key="evaluacion.id" @click="cargarGraficos(evaluacion)" class="cursor-pointer">
                  <th scope="row">
                    <div class="form-check">
                      <input class="form-check-input cursor-pointer" type="radio" name="evaluacionSelected"  @click="cargarGraficos(evaluacion)" value="" :id="evaluacion.id">
                      <label class="form-check-label" for="flexCheckDefault">
                      </label>
                    </div>
                  </th>
                  <td>
                    <div class="img-left me-lg-3">
                      {{evaluacion.nombreEmpresa}}
                    </div>
                  </td>
                  <td>
                    <div class="me-md-3">
                      <h4 class="text-center text-md-start">{{evaluacion.nombre}}</h4>
                      <div class="d-flex align-items-center data-icon justify-content-center justify-content-md-between flex-wrap">
                        <div class="d-flex align-items-center"  v-if="evaluacion.estado==100">
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
                              <p class="responsible">{{evaluacion.IM}}</p>
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
                    <button class="icons">
                      <svg xmlns="http://www.w3.org/2000/svg" @click="ir('HomeReporte', evaluacion)" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="feather:eye" class="iconify iconify--feather">
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                          <path d="M1 12s4-8 11-8s11 8 11 8s-4 8-11 8s-11-8-11-8z">
                          </path>
                          <circle cx="12" cy="12" r="3">
                          </circle>
                        </g>
                      </svg>
                    </button>
                  </td>
                  <td v-else>
                  </td>
                  <!--<td>
                    <div>
                      <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12.9787" cy="5.15581" r="1.65337" fill="#283252"/>
                        <circle cx="12.9786" cy="10.9427" r="1.65337" fill="#283252"/>
                        <circle cx="12.9786" cy="16.7295" r="1.65337" fill="#283252"/>
                      </svg>  
                  </div>
                  </td>-->
                </tr>
              </tbody>
            </table>  
          </div> 
        </div> 

        <!-- Paginacion-->
        <nav aria-label="..." class="d-flex justify-content-between align-items-center">
          <div class="d-flex">
            <p class="message">Mostrando <span>1</span> a <span>10</span> de 16 entradas</p>
          </div>
          <div class="d-flex">
            <ul class="pagination pagination-sm">
              <li class="page-item controls">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&lt;</span>
                </a>
              </li>
              <li class="page-item active" aria-current="page">
                <span class="page-link">1</span>
              </li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li> 
              
              <li class="page-item controls">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&gt;</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

      </div>
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

        <div class="cards-grafic p-3" style="visibility: hidden;"> 
          <div class="w-100">
            <!--<h3>Promedio de completado</h3>-->
          <div class="d-flex btn grafica justify-content-around">
            <!--<button class="btn circle-two-n2 order-md-2 ">
                SG
            </button>
            <button class="btn circle-two-n4 order-md-2 ">
              SG
            </button>
            <button class="btn circle-two-n1 order-md-2 ">
                SG
            </button>-->
          </div>
          <div id="gaugeCornerRadius_1"></div>
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
              <div class="circle d-flex align-items-center "><div class=" active me-2 "></div>
                <h6>administrador</h6>
              </div>
              <p class="message">Estamos aquí ante cualquier pregunta, no dudes en contactarnos.</p>
            </div>
          </div>
          <div>

          </div>
      </div>
      
      </section>
        <!-- Fin Cajas-->

    </div>
    <!--Termino Contendio-->
    <!--alerta de carga-->
    <!--<div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="liveToast" class="toast succes" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                Guardamos con exito tus avances.
              </div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>-->
    <!--Termino alerta de carga-->

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

export default {
  name: "Login",
  components:{
    CChart,
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
        empresas: [],
        perfil : [],
        evaluaciones : [],
        SegmentacionAreas : [],
        SegmentacionSubAreas : [],
        evaluacionSelected : [],

        IMA: [],
        resumenIM: [],
        resumenPuntuacionArea:[],
    });

    const getUsuario = async () => {
        state.userSelected = JSON.parse(localStorage.usuarioModel);
        state.perfil = state.userSelected.perfil.nombre;
        console.log('useer', state.userSelected);
        await getEmpesas();
        getEvaluaciones();
    };

    const getEmpesas = () => {
        state.empresas = [];
        return ApiNeva.get("Empresa/GetEmpresasByUsuarioId?idUsuario=" + JSON.parse(localStorage.usuarioModel).id , null, { headers: header })
          .then((response) => {
            if (response.status != 200) return false;
            state.empresas = response.data;
            console.log("state.empresas",state.empresas);
          })
          .catch((error) => console.log(error));
        return false;
    }

    const getEvaluaciones = () => {
      state.evaluaciones = [];
      //let empresaId = JSON.parse(localStorage.usuarioModel).empresaId;
      return Promise.all( state.empresas.map(element => 
        ApiNeva.get("Evaluacion/GetEvaluacionsByEmpresaId?empresaId=" + element.id, null, { headers: header, })
        .then(async (response) => {
            if (response.status != 200) return false;
            state.evaluaciones = response.data;
            console.log("state.evaluaciones", state.evaluaciones);
            state.evaluaciones.forEach((m) => {
                m.iniciales = m.nombre.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g).join("").substring("0","2");
                if (m.iniciales.length < 2){
                    m.iniciales =  m.nombre.substring("0", "2");
                }
                let fecha = new Date(m.fechaCreacion);
                fecha.setDate(fecha.getDate() + parseInt(m.tiempoLimite));
                m.fechaTermino = new Date(fecha).toLocaleString().split(",")[0];
                m.nombreEmpresa = element.razonSocial;
                state.SegmentacionAreas = state.SegmentacionAreas.concat(m.segmentacionAreas);
            });
            console.log("state.evaluaciones", state.evaluaciones);
            getIM();
            getEstadoSubArea();
          })
        .catch((error) => console.log(error))
      ));
      /*return ApiNeva.get("Evaluacion/GetEvaluacionsByEmpresaId?empresaId=" + empresaId, {
          headers: header,
      })
      .then((response) => {
          if (response.status != 200) return false;
          state.evaluaciones = response.data;
          console.log("state.evaluaciones", state.evaluaciones);
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
          console.log("state.evaluaciones", state.evaluaciones);
          getIM();
          getEstadoSubArea();
          
      })
      .catch((error) => console.log(error));*/
    }

    const getIM = () => {
        state.evaluaciones.forEach((m) => {
            var filtro = {
                "evaluacionId":  m.id,
                "empresaId": JSON.parse(localStorage.usuarioModel).empresaId
            }
              console.log("FILTRO", filtro);
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
                console.log("response.data", response.data);
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
                console.log("SUBESTADO",  response.data);
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
            console.log("ESTADO",  state.SegmentacionAreas);
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
            console.log("ESTADOGENERAL",  state.evaluaciones);
        })
        .catch((error) => console.log(error));
    };

    const cargarGraficos = async (evaluacionSelected) => {
      if (document.getElementById(evaluacionSelected.id) != undefined){
        document.getElementById(evaluacionSelected.id).checked = true;
      } 
      state.evaluacionSelected = evaluacionSelected;
      console.log("evaluacionSelected: ",  state.evaluacionSelected);
      await getIMA();
      getGraficoPuntuacionArea();
    };

    
    //areas
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
            console.log("state.IMA", response.data);
            let dataSet = [];
            let labels = [];
            let valorDataList = [];
            state.IMA.forEach((element) => {
                labels.push(element.nombreArea);
                valorDataList.push((element.imaValor).toFixed(2));
            });

            let elemento = {
                label: state.evaluacionSelected.nombre,
                backgroundColor:   colorAleatorio(),
                data: valorDataList
            }

            dataSet.push(elemento);

            state.resumenIM = {
                labels: labels,
                datasets: dataSet
            };
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
    
    //subareas
    const getGraficoImportanciaEstrategica = () => {
        state.evaluacionEmpresa = [];
        state.resumenImportanciaEstrategica = [];
        state.segmentacionAreaSelected = [];
        return ApibackOffice.get(
            "EvaluacionEmpresa/GetEvaluacionEmpresasByEvaluacionIdEmpresaId?evaluacionId=" + state.evaluacionSelected.id + "&empresaId=" + JSON.parse(localStorage.usuarioModel).empresaId , null ,
            { headers: header }
        )
        .then((response) => {
            if (response.status != 200) return false;
            console.log("response.data", response.data);
            state.evaluacionEmpresa = response.data.find((c) => c.evaluacionId === state.evaluacionSelected.id);
            console.log("evaluacionEmpresa: ",  state.evaluacionEmpresa);
            let labels = [];
            let dataSet = [];

            state.evaluacionEmpresa.importanciaRelativas.forEach((element) => {
                element.segmentacionArea.segmentacionSubAreas.forEach((x) => {
                    x.importanciaEstrategicas.forEach((y) => {
                        if (element.id == y.importanciaRelativaId){
                            if (state.segmentacionAreaSelected.find((m) => m.nombreSubArea == x.nombreSubArea) == undefined){
                                labels.push(x.nombreSubArea);
                            }
                            state.segmentacionAreaSelected.push( 
                                { 
                                    "id" : element.segmentacionArea.id,
                                    "nombreArea" : element.segmentacionArea.nombreArea,
                                    "idSubArea" : x.id,
                                    "nombreSubArea" : x.nombreSubArea,
                                    "valorImportanciaEstrategica" : [y.valor]
                                }
                            ); 
                        }
                    });
                });
            });

            console.log("segmentacionAreaSelected: ",  state.segmentacionAreaSelected);

            let datos = [];
            let index = 0;

            for (let i = 0; i < state.segmentacionAreaSelected.length; i++) { 
                if (datos.find((m) => m.label == state.segmentacionAreaSelected[i].nombreArea) == undefined){
                    datos.push({
                        "label" : state.segmentacionAreaSelected[i].nombreArea,
                        "backgroundColor" : colorAleatorio(),
                        "data" : state.segmentacionAreaSelected[i].valorImportanciaEstrategica,
                    });
                } else {
                    index = datos.findIndex((m) => m.label == state.segmentacionAreaSelected[i].nombreArea); 
                    datos[index].data = datos[index].data.concat(state.segmentacionAreaSelected[i].valorImportanciaEstrategica);
                }
            }

            for (let i = 0; i < datos.length; i++) { 
                dataSet.push(datos[i]);
            }

            console.log("labels: ",  labels);
            state.resumenImportanciaEstrategica = {
                labels: labels,
                datasets: dataSet,
            };
        
            console.log("resumenImportanciaEstrategica: ",  state.resumenImportanciaEstrategica);
        })
        .catch((error) => console.log(error));
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
    };
  },
};
</script>
