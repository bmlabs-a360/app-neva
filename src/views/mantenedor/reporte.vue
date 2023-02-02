<template>

    <div id="document_container" class="w-100">
        <div id="tituloEmpresa">
            <div class="d-flex justify-content-end">
                <h1 id="titulo">INFORME DE MADUREZ A360</h1> 
            </div>
            <div class="d-flex justify-content-end">
                <h3 id="fecha"> {{fechaHoy}}</h3>
            </div>
        </div>
        
        <div id="razonSocial">
            <div class="mt-4 bg-info text-white d-flex justify-content-between bd-highlight mb-3" >  
                <h1 class="d-flex justify-content-start">{{rutempresa}}</h1> 
                <h1 class="d-flex justify-content-end"> {{razonsocial}}</h1>
            </div>
        </div>

        <div id="madurezGeneral">
            <CRow >
                <CCol :md="4">
                    <CRow>
                        <CCol :md="12" class="text-center">
                            <h1><strong>MADUREZ GENERAL</strong></h1>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol :md="12">
                            <CChart type="doughnut" :data="madurezGeneral" labels="madurez"/>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </div>

        <div id ="importanciaRelativa" class="mt-5">
            <CRow >
                <CCol :md="7">
                    <CRow>
                        <CCol :md="8" > 
                            <CChart type="bar" :data="resumenImportanciaRelativa" labels="importancia"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol :md="8" class="text-center">
                            <h3><strong>Importancia Relativa</strong></h3>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol :md="5">
                    <CRow>
                        <CCol :md="11" class="text-center mt-3">
                            <CFormLabel>"Valor porcentual obtenido al analizar a la empresa dentro del
                                tipo de "industria" a la que pertenece, donde se refleja la
                                importancia de cada &aacute;rea con respecto a la actividad de la
                                empresa. Ayuda a visualizar la relevancia de un &aacute;rea dentro de
                                la compañia"
                            </CFormLabel>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </div>

        <div id="tablaImportanciaRelativa" class="mt-5 d-flex" >
            <CTable class="w-50">
                <CTableHead class="bg-primary text-white">
                    <CTableRow>
                        <CTableHeaderCell class="text-center" scope="col">&Aacute;reas maduras</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow v-for="ima in IMA" :key="ima.id">
                        <CTableDataCell class="text-center" v-if="ima.AreaMadura != null">{{ima.AreaMadura}}</CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>

            <CTable  class="w-50">
                <CTableHead class="bg-primary text-white">
                    <CTableRow>
                        <CTableHeaderCell class="text-center" scope="col">&Aacute;reas a mejorar</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow v-for="ima in IMA" :key="ima.id">
                        <CTableDataCell class="text-center" v-if="ima.AreaMejorar != null">{{ima.AreaMejorar}}</CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
        </div>

        <div id ="puntuacionEntreAreas" class="mt-5">
            <CRow >
                <CCol :md="12">
                    <CRow>
                        <CCol :md="12">
                            <CChart type="bar" :data="resumenPuntuacionArea" labels="puntuacionArea"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol :md="12" class="text-center">
                            <h3><strong>Puntuaci&oacute;n entre las &aacute;reas</strong></h3>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol :md="12">
                    <CRow>
                        <CCol :md="12" class="text-center mt-5">
                            <CFormLabel>"Valor porcentual de cada &aacute;rea, en comparaci&oacute;n con las otras, dentro de la organizaci&oacute;n. Ayuda a visualizar que &aacute;rea est&aacute; mejor evaluada y cuales tienen una evaluaci&oacute;n menor. Entendiendo como 100% la mejor evaluaci&oacute;n posible"</CFormLabel>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </div>

        <div id="resultadosPorArea">
            <div class="p-1 mt-5 bg-secondary text-white d-flex justify-content-center bd-highlight " >  
                <h4>Resultados por &aacute;reas</h4> 
            </div>
        </div>

        <div id="Areas">
            <div  v-for="ima in IMA" :key="ima.id">
                <CRow class="mt-3">
                    <CCol :md="4">
                        <CRow>
                            <CCol :md="12" class="text-start text-secondary">
                                <h1><strong>{{ima.nombreArea}}</strong></h1>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol :md="12">
                                <CChart type="doughnut" :data="ima.nivelMadurezAreas" labels="madurez"/>
                            </CCol>
                        </CRow>
                    </CCol>

                     <CCol :md="8">
                        <CRow>
                            <CCol :md="11" class="text-start d-flex text-center mt-5">
                                <h4>Aporte IM</h4>
                                <div style="width: 2.5rem;height: 2.5rem;border-radius: 50%;background: #00b050;display: flex;justify-content: center;align-items: center;text-align: center;margin:0px auto;padding:5px">
                                    <b style="color:white">{{ima.imaValor}}</b>
                                </div>
                                <h4>Cumplimiento</h4>
                                <div style="width: 2.5rem;height: 2.5rem;border-radius: 50%;background: #4472c4;display: flex;justify-content: center;align-items: center;text-align: center;margin:0px auto;padding:5px">
                                    <b style="color:white">{{ima.cumplimiento}}%</b>
                                </div>
                                <h4>Brecha</h4>
                                <div style="width: 2.5rem;height: 2.5rem;border-radius: 50%;background: #ff0000;display: flex;justify-content: center;align-items: center;text-align: center;margin:0px auto;padding:5px">
                                    <b style="color:white">{{ima.brecha}}%</b>
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol :md="11" class="d-flex mt-2">
                               <CTable  class="w-50">
                                    <CTableHead class="bg-primary text-white">
                                        <CTableRow>
                                            <CTableHeaderCell class="text-center" scope="col">Sub&aacute;reas maduras</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        <CTableRow v-for="imsa in IMSA" :key="imsa.id">
                                            <CTableDataCell class="text-center" v-if="imsa.segmentacionAreaId == ima.segmentacionAreaId && imsa.SubAreaMadura != null">{{imsa.SubAreaMadura}}</CTableDataCell>
                                        </CTableRow>
                                    </CTableBody>
                                </CTable>

                                <CTable  class="w-50">
                                    <CTableHead class="bg-primary text-white">
                                        <CTableRow>
                                            <CTableHeaderCell class="text-center" scope="col">Sub&aacute;reas a mejorar</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        <CTableRow v-for="imsa in IMSA" :key="imsa.id">
                                            <CTableDataCell class="text-center" v-if="imsa.segmentacionAreaId == ima.segmentacionAreaId && imsa.SubAreaMejorar != null">{{imsa.SubAreaMejorar}}</CTableDataCell>
                                        </CTableRow>
                                    </CTableBody>
                                </CTable>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>

                <div id="capacidades" >
                    <CRow class="mt-5">
                        <CCol :md="7">
                            <CRow>
                                <CCol :md="12" class="d-flex mt-2">
                                    <CTable  class="w-60">
                                        <CTableHead class="bg-primary text-white">
                                            <CTableRow>
                                                <CTableHeaderCell class="text-center" scope="col">Top 3 capacidades</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            <CTableRow v-for="capacidadvalorMayor in ima.capacidadvalorMayor" :key="capacidadvalorMayor.id" >
                                                <CTableDataCell class="text-center" >{{capacidadvalorMayor.nombre}}</CTableDataCell>
                                            </CTableRow>
                                        </CTableBody>
                                    </CTable>

                                    <CTable  class="w-60">
                                        <CTableHead class="bg-primary text-white">
                                            <CTableRow>
                                                <CTableHeaderCell class="text-center" scope="col">Top 3 peores capacidades</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            <CTableRow v-for="capacidadvalorMenor in ima.capacidadvalorMenor" :key="capacidadvalorMenor.id" >
                                                <CTableDataCell class="text-center"> {{capacidadvalorMenor.nombre}}</CTableDataCell>
                                            </CTableRow>
                                        </CTableBody>
                                    </CTable>
                                </CCol>
                            </CRow>
                        </CCol>

                         <CCol :md="5">
                            <CRow>
                                <CCol :md="12" >
                                    <CChart type="bar" :data="ima.resumenCapacidad" labels="resumenCapacidad"/>
                                </CCol>
                            </CRow>
                        </CCol>

                    </CRow>
                </div>
            </div>
        </div>
    </div>
    <button @click="exportToPDF">Export to PDF</button>

    
</template>

<script>
import { reactive, toRefs, onMounted, getCurrentInstance } from "vue";
import { CChart } from "@coreui/vue-chartjs";
import ApiNeva from "@/api/ApiNeva";
import ApibackOffice from "@/api/ApiBackOffice";
import html2pdf from "html2pdf.js";
import Vue3Html2pdf from 'vue3-html2pdf';
export default {
  name: "Login",
  methods: {
  },
   components: {
    CChart,
    html2pdf,
  },
  setup() {
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const header = {
      ApiKey,
    };

    const state = reactive({
        fechaHoy : "",
        rutempresa: "",
        razonsocial: "",
        IM: [],
        IMA: [],
        IMSA: [],
        capacidadSubAreas: [],
        madurezGeneral: [],
        evaluaciones: [],
        resumenImportanciaRelativa: [],
        evaluacionSelected: [],
        resumenPuntuacionArea: [],
        
    });

    
    const exportToPDF = () => {
        html2pdf(document.getElementById("document_container"), {
            margin: 0.5,
            filename: "Evaluacion.pdf"
        });

    };

    const getInfo = () => {
        const fecha = new Date();
        const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        let month = months[fecha.getMonth()];
        state.fechaHoy = fecha.getDate() +  " de " + month + " de " + fecha.getFullYear();

        state.rutempresa =  JSON.parse(localStorage.empresaModel).rutEmpresa;
        state.razonsocial = JSON.parse(localStorage.empresaModel).razonSocial;

        getMadurezGeneral();
    };

    const getMadurezGeneral = () => {
        var filtro = {
            "evaluacionId": "13fe02c7-7459-4f91-ba32-e233d9f7931b",  //PARA PRUEBAS  ********* //CAMBIAR ID DE EVALUACION POR LA ENTREGADA
            "empresaId": JSON.parse(localStorage.usuarioModel).empresaId
        }
        console.log("filtro", filtro);
        ApibackOffice.post("Madurez/GetIMSA",filtro,
            { headers: header }
        )
        .then((response) => {
            if (response.status != 200) return false;
            state.IMSA = response.data;
            state.IMSA.forEach((element) => {
                element.SubAreaMadura = (element.imsaValor >= 3) ? element.nombreSubArea : null;
                element.SubAreaMejorar= (element.imsaValor < 3) ? element.nombreSubArea : null;
            });
            console.log("state.IMSA", response.data);
            ApibackOffice.post("Madurez/GetIMA", filtro,
                { headers: header }
            )
            .then((response) => {
                if (response.status != 200) return false;
                state.IMA = response.data;
                state.IMA.forEach((element) => {
                    element.AreaMadura = (element.imaValor >= 3) ? element.nombreArea : null;
                    element.AreaMejorar= (element.imaValor < 3) ? element.nombreArea : null;
                    let color = [];
                    let restante = "";
                    let dataSet = [];
                    if (element.imaValor.toFixed(0) == 1){
                        color = "#EA0404";
                        restante = 4;
                    }
                    if (element.imaValor.toFixed(0) == 2){
                        color = "#DD5004";
                        restante = 3;
                    }
                    if (element.imaValor.toFixed(0) == 3){
                        color = "#F5E102";
                        restante = 2;
                    }
                    if (element.imaValor.toFixed(0) == 4){
                        color = "#0152EB";
                        restante = 1;
                    }
                    if (element.imaValor.toFixed(0) == 5){
                        color = "#3AAE3A";
                        restante = 0;
                    }

                    let elemento = {
                        label: [element.nombreArea],
                        backgroundColor:  [color, "#FFFFFF"],
                        data: [parseInt(element.imaValor.toFixed(0)), restante]
                    }

                    dataSet.push(elemento);
                    element.nivelMadurezAreas = {
                        labels: [element.nombreArea],
                        datasets: dataSet,
                    };
                    element.imaValor = element.imaValor.toFixed(2);
                    let cumplimiento = (element.imaValor / 5) * 100;
                    element.cumplimiento = cumplimiento.toFixed(0);
                    let brecha =  element.cumplimiento - 100;
                    element.brecha = brecha.toFixed(0);
                });
                console.log("state.IMA 1111", response.data);
                ApibackOffice.post("Madurez/GetIM", filtro,
                    { headers: header }
                )
                .then((response) => {
                    if (response.status != 200) return false;
                    console.log("state.IM", response.data);
                    state.IM = response.data;
                    ApibackOffice.post("Madurez/GetCapacidadSubAreas", filtro,
                        { headers: header }
                    )
                    .then((response) => {
                        if (response.status != 200) return false;
                        console.log("state.capacidadSubAreas", response.data);
                        state.capacidadSubAreas = response.data
                        getGraficoCapacidad();
                        graficoMadurezGeneral();
                        getGraficoImportanciaRelativa();
                        getPuntuacionArea();
                        return;
                    })
                    .catch((error) => {
                        console.log("error->", error);
                    });
                })
                .catch((error) => {
                    console.log("error->", error);
                });
            })
            .catch((error) => {
                console.log("error->", error);
            });
        })
        .catch((error) => {
            console.log("error->", error);
        });
    };

    const graficoMadurezGeneral = () => {
        let color = [];
        let restante = "";
        let dataSet = [];
        if (state.IM[0].imValor.toFixed(0) == 1){
            color = "#EA0404";
            restante = 4;
        }
        if (state.IM[0].imValor.toFixed(0) == 2){
            color = "#DD5004";
            restante = 3;
        }
        if (state.IM[0].imValor.toFixed(0) == 3){
            color = "#F5E102";
            restante = 2;
        }
        if (state.IM[0].imValor.toFixed(0) == 4){
            color = "#0152EB";
            restante = 1;
        }
        if (state.IM[0].imValor.toFixed(0) == 5){
            color = "#3AAE3A";
            restante = 0;
        }

        let elemento = {
            label: ["Madurez General"],
            backgroundColor:  [color, "#FFFFFF"],
            data: [parseInt(state.IM[0].imValor.toFixed(0)), restante]
        }

        dataSet.push(elemento);
        state.madurezGeneral = {
            labels: ["Madurez General"],
            datasets: dataSet,
        };
        console.log("madurezGeneral", state.madurezGeneral);
    };

    const getGraficoImportanciaRelativa = () => {

        let dataSet = [];
        let labels = [];
        let valorDataList = [];
        state.IMA.forEach((element) => {
            labels.push(element.nombreArea);
            valorDataList.push(element.pesoRelativoAreaPorc);
        });

        let elemento = {
            label: "Evaluacion " +  state.IM[0].nombreEvaluacion,
            backgroundColor:  "#83b85f",
            data: valorDataList
        }

        dataSet.push(elemento);

        state.resumenImportanciaRelativa = {
            labels: labels,
            datasets: dataSet,
        };
    };

    const getGraficoCapacidad =  async () => {
        let dataSet = [];
        let labels = [];
        let datos = [];
        let valor1 = [];
        let valor2 = [];
        let valor3 = [];
        let valor4 = [];

        state.IMA.forEach((element) => {
            /*state.capacidadSubAreas.forEach((x) => {
                if (x.segmentacionAreaId == element.segmentacionAreaId) {
                    labels.push(x.nombreSubArea);
                    capacidad.push(x);
                    if (x.pesoRelativoCapacidadPorc >= 50 ){
                        capacidadvalorMayor.push(x);
                    }else {
                        capacidadvalorMenor.push(x);
                    }
                }
            });*/

            let index = 0;
            let indexValorCapacidad = 0;
            let tipoImportancia = "";
            let valorInexistente = 0;
            let valorPocoDesarrollada = 0;
            let valorDesarrollada = 0;
            let valorMuyDesarrollada = 0;

            for (let i = 0; i < state.capacidadSubAreas.length; i++) { 
                for (let j = 0; j < state.capacidadSubAreas.length; j++) {
                    if (i !== j && state.capacidadSubAreas[i].segmentacionAreaId == element.segmentacionAreaId) {
                        if ( state.capacidadSubAreas[i].segmentacionSubAreaId ===  state.capacidadSubAreas[j].segmentacionSubAreaId) { 
                            if (datos.find((m) => m.segmentacionSubAreaId == state.capacidadSubAreas[i].segmentacionSubAreaId) == undefined){
                                labels.push(state.capacidadSubAreas[i].nombreSubArea);
                                
                                if ( state.capacidadSubAreas[i].pesoRelativoCapacidadValor == 1) valorInexistente = 1;
                                if ( state.capacidadSubAreas[i].pesoRelativoCapacidadValor == 2) valorPocoDesarrollada = 1;
                                if ( state.capacidadSubAreas[i].pesoRelativoCapacidadValor == 3) valorDesarrollada = 1;
                                if ( state.capacidadSubAreas[i].pesoRelativoCapacidadValor == 4) valorMuyDesarrollada = 1;

                                console.log("pesoRelativoCapacidadValor", state.capacidadSubAreas[i].pesoRelativoCapacidadValor);
                                datos.push({
                                    "segmentacionSubAreaId" : state.capacidadSubAreas[i].segmentacionSubAreaId ,
                                    "nombre" : state.capacidadSubAreas[i].nombreSubArea,
                                    "capacidadValor": state.capacidadSubAreas[i].pesoRelativoCapacidadValor,
                                    "valorCapacidad" : [
                                        {
                                            "nombre" : "Inexistente", 
                                            "valor" : valorInexistente
                                        }, 
                                        { 
                                            "nombre" : "Poco Desarrollada", 
                                            "valor" : valorPocoDesarrollada
                                        }, 
                                        { 
                                            "nombre" : "Desarrollada", 
                                            "valor" : valorDesarrollada
                                        }, 
                                        { 
                                            "nombre" : "Muy Desarrollada", 
                                            "valor" : valorMuyDesarrollada
                                        } 
                                    ]
                                });
                                valorInexistente = 0;
                                valorPocoDesarrollada = 0;
                                valorDesarrollada = 0;
                                valorMuyDesarrollada = 0;
                            }else{
                                index = datos.findIndex((m) => m.segmentacionSubAreaId == state.capacidadSubAreas[i].segmentacionSubAreaId);
                                if ( state.capacidadSubAreas[i].pesoRelativoCapacidadValor == 1){
                                    tipoImportancia = "Inexistente";
                                }
                                if ( state.capacidadSubAreas[i].pesoRelativoCapacidadValor == 2){
                                    tipoImportancia = "Poco Desarrollada";
                                }
                                if ( state.capacidadSubAreas[i].pesoRelativoCapacidadValor == 3){
                                    tipoImportancia = "Desarrollada";
                                }
                                if ( state.capacidadSubAreas[i].pesoRelativoCapacidadValor == 4){
                                    tipoImportancia = "Muy Desarrollada";
                                }
                                indexValorCapacidad = datos[index].valorCapacidad.findIndex((m) => m.nombre == tipoImportancia);
                                datos[index].valorCapacidad[indexValorCapacidad].valor = datos[index].valorCapacidad[indexValorCapacidad].valor + 1;
                                datos[index].capacidadValor = datos[index].capacidadValor + state.capacidadSubAreas[i].pesoRelativoCapacidadValor;
                            }
                        }
                    }
                }
            }

            datos.forEach((y) => {
                y.valorCapacidad.forEach((x) => {
                    if ( x.nombre == "Inexistente"){
                        valor1 = valor1.concat(x.valor);
                    }
                    if ( x.nombre == "Poco Desarrollada"){
                         valor2 = valor2.concat(x.valor);
                    }
                    if ( x.nombre == "Desarrollada"){
                         valor3 = valor3.concat(x.valor);
                    }
                    if ( x.nombre == "Muy Desarrollada"){
                         valor4 = valor4.concat(x.valor);
                    }
                });
            });

            let arrayMayorMenor = datos.sort(((a, b) =>  b.capacidadValor - a.capacidadValor));
            let arrayMenorMayor = datos.sort((x, y) => x.capacidadValor - y.capacidadValor);
            if (arrayMayorMenor.length > 5){
                arrayMayorMenor.length = 3
                arrayMenorMayor.length = 3
                element.capacidadvalorMayor = arrayMayorMenor;
                element.capacidadvalorMenor = arrayMenorMayor;
            }

            if (arrayMayorMenor.length < 4){
                element.capacidadvalorMayor = arrayMayorMenor;
            }

            dataSet = [
                {
                    label: 'Inexistente',
                    backgroundColor: '#5f86cd',
                    data: valor1
                },
                {
                    label: 'Poco Desarrollada',
                    backgroundColor: '#b1b1b1   ',
                    data: valor2
                },
                {
                    label: 'Desarrollada',
                    backgroundColor: '#72a9da',
                    data: valor3
                },
                {
                    label: 'Muy Desarrollada',
                    backgroundColor: '#465f8c',
                    data: valor4
                }
            ];

            element.resumenCapacidad = {
                labels: labels,
                datasets: dataSet,
            };

            console.log("datos", datos);
            datos = [];
            labels = [];
            valor1 = [];
            valor2 = [];
            valor3 = [];
            valor4 = [];

           /*
            for (var i = 0; i < capacidad.length; i++) {
                for (var j = 0; j < capacidad.length; j++) {
                    if (capacidad[i].segmentacionSubAreaId == capacidad[j].segmentacionSubAreaId &&  i != j) { //revisamos que i sea diferente de j, para que no compare el mismo elemento exacto.
                        valorcapacidad = capacidad[i].pesoRelativoCapacidadValor;
                    }
                }
            }
            console.log("valorcapacidad", valorcapacidad);
            capacidad = [];
            valorcapacidad = [];
            

            if (capacidadvalorMayor.length > 3){
                capacidadvalorMayor.length = 3;
            }
            if (capacidadvalorMenor.length > 3) {
                capacidadvalorMenor.length = 3;
            }
            element.capacidadvalorMayor = capacidadvalorMayor.sort(((a, b) =>  b.pesoRelativoCapacidadPorc - a.pesoRelativoCapacidadPorc));
            element.capacidadvalorMenor = capacidadvalorMenor.sort((x, y) => x.pesoRelativoCapacidadPorc - y.pesoRelativoCapacidadPorc);

            state.capacidadSubAreas.forEach((y) => {
                if (y.segmentacionAreaId == element.segmentacionAreaId) valorDataList.push(y.pesoRelativoCapacidadValor);
            });

            let elemento = {
                label: "Capacidad" ,
                backgroundColor:  "#47608d",
                data: valorDataList
            }

            dataSet.push(elemento);

            element.resumenCapacidad = {
                labels: labels,
                datasets: dataSet,
            };
            dataSet = [];
            labels = [];
            valorDataList = [];
            capacidadvalorMayor = [];
            capacidadvalorMenor = [];*/

        });
    };

    const getPuntuacionArea = () => {  //VERIFICAr como OBTENER PUNTUADCION DE AREAS
      let dataSet = [];
      let labels = [];
      let valorDataList = [];
      state.IMA.forEach((element) => {
        labels.push(element.nombreArea);
        valorDataList.push((element.imaValor / 5) * 100);
      });

      let elemento = {
        label: "Evaluacion " +  state.IM[0].nombreEvaluacion,
        backgroundColor:  "#6186cc",
        data: valorDataList
      }

      dataSet.push(elemento);

      state.resumenPuntuacionArea = {
        labels: labels,
        datasets: dataSet,
      };
    };

    onMounted(() => {
      getInfo();
    });

    return {
      ...toRefs(state),
      exportToPDF
    };
  },
};
</script>
