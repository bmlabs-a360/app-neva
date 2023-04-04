<template>

<div class="col-12 d-flex mt-3 mt-sm-0 flex-column flex-sm-row justify-content-between align-items-center">
</div>
<div class="tab-content pb-2" id="pills-tabContent" v-if="perfil == 'Usuario básico'">
    <div class="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
        <div class="tab-content pb-2" id="pills-tabContent">
            <div class="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">

                <div class="card my-3 p-3 d-flex flex-column flex-lg-row align-items-center justify-content-between" v-for="evaluacion in evaluaciones" :key="evaluacion.id" >
                    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between">
                        <div class="img-left me-lg-3 btn circle-two-n2">
                            {{evaluacion.iniciales}}
                        </div>
                        <div class="me-md-3">
                            <h3 class="my-3 my-md-0 text-center text-md-start">{{evaluacion.nombre}}</h3>
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
                                    <p class="responsible-table" >{{evaluacion.estado}}% Completado</p>
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
                                    <p class="responsible-table" v-if="evaluacion.estado">{{parseFloat(evaluacion.estado).toFixed(0)}}% Completado</p>
                                    <p class="responsible-table" v-else>0% Completado</p>
                                </div>
                                <div class="d-flex align-items-center">
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
                    </div>
                    <div class="mt-3" v-if="evaluacion.estado == 100">
                        <button class="btn disabled orange order-md-1 me-lg-4 mt-lg-0" aria-disabled="true">Terminado</button>
                    </div>
                    <div class="mt-3" v-else>
                        <button class="btn orange order-md-1 me-lg-4 mt-lg-0" @click="ir('Evaluacion', evaluacion)">Responder</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
  name: "Dashboard",
  methods: {
  },
  components:{
    CChart,
    paginate: Paginate,
  },
  setup() {
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const header = {
      ApiKey,
    };

    const state = reactive({
        /*userSelected : [],
        empresas : [],
        perfil : [],*/
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
    });

    const getEvaluaciones = async () => {
        await ApiNeva.post('Evaluacion/GetEvaluacionsByUsuarioId', JSON.parse(localStorage.usuarioModel) ,{
            headers: header,
        })
            .then((response2) => {
                if (response2.status != 200) return false;
                state.evaluaciones = response2.data;
                state.evaluaciones.forEach((m) => {
                    let regex = /^[0-9]*$/;
                    let soloNumeros = regex.test(m.nombre);
                    if (soloNumeros){
                        m.iniciales = m.nombre.substring("0","2")
                    }else if (m.nombre.length < 2){
                        m.iniciales = m.nombre;
                    }else {
                        m.iniciales = m.nombre.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g).join("").substring("0","2");
                        if (m.iniciales.length < 2){
                            m.iniciales =  m.nombre.substring("0", "2");
                        }
                    }
                    let fecha = new Date(m.fechaCreacion);
                    fecha.setDate(fecha.getDate() + parseInt(m.tiempoLimite));
                    m.fechaTermino = new Date(fecha).toLocaleString().split(",")[0];
                    state.SegmentacionAreas = state.SegmentacionAreas.concat(m.segmentacionAreas);
                    return;
                });
            })
            .catch((error) => {
                state.totalevaluaciones = null;
                state.evaluaciones = null;
            });
    };

    const getUsuario = async () => {
        state.userSelected = JSON.parse(localStorage.usuarioModel);
        state.perfil = state.userSelected.perfil.nombre;
        await getEvaluaciones(false);
        await getIM();
        await getEstadoSubArea();
    };

    const getIM = async () => {
        try {
            state.evaluaciones.forEach((m) => {
            var filtro = {
                "evaluacionId":  m.id,
                "empresaId": JSON.parse(localStorage.usuarioModel).empresaId
            };
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
            .catch((error) => console.log("error en getIM",error));
            return false;
        });
        } catch (e) {
            console.log("error en evaluaciones.forEach",e)
        }
    };

    const getEstadoSubArea = async () => {
        state.SegmentacionAreas.forEach(x => {
            state.SegmentacionSubAreas = state.SegmentacionSubAreas.concat(x.segmentacionSubAreas);
        });

        let bodyEmpresa =  { 
            id: JSON.parse(localStorage.usuarioModel).empresaId 
        };

       await  ApiNeva.post("SegmentacionSubArea/GetEstadoSubAreas", bodyEmpresa ,{
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
    };
  },
};
</script>
