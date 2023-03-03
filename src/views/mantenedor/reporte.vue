<template>
    <div id= "cabecera">
        <div id="tituloEmpresa">
            <div class="d-flex justify-content-end">
                <h1 id="titulo">INFORME DE MADUREZ A360</h1> 
            </div>
            <div class="d-flex justify-content-end">
                <h3 id="fecha"> {{fechaHoy}}</h3>
            </div>
            <div id="razonSocial">
                <div class="mt-4 bg-info text-white d-flex justify-content-between bd-highlight mb-3" >  
                    <h1 class="d-flex justify-content-start">{{rutempresa}}</h1> 
                    <h1 class="d-flex justify-content-end"> {{razonsocial}}</h1>
                </div>
            </div>
        </div>
    </div>

    
    <div id="document_container" style="width:8.3in" >
        <div class="Pagina">
            <div id="tituloEmpresa">
                <div class="d-flex justify-content-end">
                    <h1 id="titulo">INFORME DE MADUREZ A360</h1> 
                </div>
                <div class="d-flex justify-content-end">
                    <h3 id="fecha"> {{fechaHoy}}</h3>
                </div>
                <div id="razonSocial">
                    <div class="mt-4 bg-info text-white d-flex justify-content-between bd-highlight mb-3" >  
                        <h1 class="d-flex justify-content-start">{{rutempresa}}</h1> 
                        <h1 class="d-flex justify-content-end"> {{razonsocial}}</h1>
                    </div>
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
                                <CChart type="doughnut" :data="madurezGeneral" :options="{ plugins: {TextCenterPlugin} }" labels="madurez"/>
                                <div class="donut-inner">
                                </div>
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
        </div>

        <div class="Pagina">
            <div id ="puntuacionEntreAreas" class="mt-5">
                <CRow >
                    <CCol :md="12">
                        <CRow>
                            <CCol :md="12">
                                <CChart type="bar" :data="resumenPuntuacionArea" labels="puntuacionArea"/>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol :md="12" class="text-center mt-4">
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
        </div>

        <div class="Pagina">
            <div id="resultadosPorArea">
                <CRow class="mt-5">
                    <CCol :md="12">
                        <div class="p-1 bg-secondary text-white d-flex justify-content-center bd-highlight " >  
                            <h4>Resultados por &aacute;reas</h4> 
                        </div>

                        <div id="Areas">
                            <div  v-for="ima in IMA" :key="ima.id" class="Seccion">
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
                                            <CCol :md="11" class="text-start d-flex text-center mt-2">
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
                                            <CTable class="w-50">
                                                    <CTableHead class="bg-primary text-white" >
                                                        <CTableRow>
                                                            <CTableHeaderCell class="text-center" scope="col">Sub&aacute;reas maduras</CTableHeaderCell>
                                                        </CTableRow>
                                                    </CTableHead>
                                                    <CTableBody>
                                                        <CTableRow v-for="subareamadura in SubAreaMadura" :key="subareamadura.id" >
                                                            <CTableDataCell class="text-center" v-if="subareamadura.segmentacionAreaId == ima.segmentacionAreaId">{{subareamadura.nombre}}</CTableDataCell>
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
                                                        <CTableRow v-for="subareamejorar in SubAreaMejorar" :key="subareamejorar.id">
                                                            <CTableDataCell class="text-center" v-if="subareamejorar.segmentacionAreaId == ima.segmentacionAreaId">{{subareamejorar.nombre}}</CTableDataCell>
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
                                                    <CChart type="bar" :data="ima.resumenCapacidad" 
                                                        :options=" {
                                                            plugins:{horizonalLinePlugin},
                                                            responsive: true,
                                                            scales: {
                                                                x: {
                                                                    stacked: true,
                                                                },
                                                                y: {
                                                                    stacked: true
                                                                }
                                                            }
                                                        }" 
                                                    labels="resumenCapacidad"/>
                                                </CCol>
                                            </CRow>
                                        </CCol>

                                    </CRow>
                                </div>
                            </div>
                        </div>
                    </CCol>
                </CRow>
            </div>
        </div>

        <div class="Pagina">
            <div id="recomendaciones">
                <div class="p-1 bg-secondary text-white d-flex justify-content-center bd-highlight " >  
                    <h4>Recomendaciones</h4> 
                </div>
                <CRow class="mt-5">
                    <CCol :md="12">
                        <CTable>
                            <CTableHead class="bg-primary text-white">
                                <CTableRow>
                                    <CTableHeaderCell class="text-center" scope="col">Capacidad</CTableHeaderCell>
                                    <CTableHeaderCell class="text-center" scope="col">&Aacute;rea / Sub&aacute;rea</CTableHeaderCell>
                                    <CTableHeaderCell class="text-center" scope="col">Recomendaci&oacute;n</CTableHeaderCell>
                                    <CTableHeaderCell class="text-center" scope="col">Importancia para la empresa</CTableHeaderCell>
                                    <CTableHeaderCell class="text-center" scope="col">Evaluaci&oacute;n</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="recomendacion in recomendaciones " :key="recomendacion.id" class="Seccion">
                                    <CTableDataCell class="text-center"> {{recomendacion.preguntaCapacidad}}</CTableDataCell>
                                    <CTableDataCell class="text-center"> {{recomendacion.nombreArea}} / {{recomendacion.nombreSubArea}}</CTableDataCell>
                                    <CTableDataCell class="text-center"> {{recomendacion.respuestaRealimentacion}}</CTableDataCell>
                                    <CTableDataCell class="text-center"> {{recomendacion.tipoImportanciaNombre}}</CTableDataCell>
                                    <CTableDataCell class="text-center"> </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCol>
                </CRow>
            </div>
        </div>
    </div>

</template>


<style>
    .donut-inner {
        margin-top: -100px;
        margin-bottom: 100px;
    }
    .donut-inner h5 {
        margin-bottom: 5px;
        margin-top: 0;
    }
    .donut-inner span {
        font-size: 12px;
    }
    
</style>
<script>
import { reactive, toRefs, onMounted, getCurrentInstance } from "vue";
import { CChart } from "@coreui/vue-chartjs";
import ApiNeva from "@/api/ApiNeva";
import ApibackOffice from "@/api/ApiBackOffice";
import html2pdf from "html2pdf.js";
import { useRoute } from "vue-router";
export default {
  name: "Reporte",
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
        recomendaciones: [],
        SubAreaMadura: [],
        SubAreaMejorar: [],
        idEvaluacion: "",
        nombreEvaluacion: "",
    });

    const route = useRoute();
    
    const exportToPDF = () => {
        /*html2pdf(document.getElementById("document_container"), {
            filename: "Evaluacion.pdf",
            pagebreak:    { after: [".Pagina"] , avoid: ["canvas",".Seccion"]},
            html2canvas:  { dpi: 192, scale: 2, letterRendering: true},
            jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait'},
            margin:       [30, 0, 30, 0], //top, left, buttom, right
            image:        { type: 'canvas', quality: 1 },
        });*/
        //var totalPages = pdf.putTotalPages().internal.getNumberOfPages()
        //console.log("Total Pages: " + totalPages);

        var element = document.getElementById('document_container');
        var opt = {
            margin: 1,
            filename: state.nombreEvaluacion + '_' + state.fechaHoy +'Evaluacion.pdf',
            image: {
                type: 'canvas',
                quality: 0.98
            },
            html2canvas: {
                scale: 3,
                logging: true,
                dpi: 192,
                letterRendering: true
            },
            jsPDF: {
                unit: 'pt',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: { 
                after: [".Pagina"], 
                avoid: ["canvas",".Seccion"]
            },
        };
        //var cabecera = document.getElementById('cabecera');
        html2pdf().from(element).set(opt).toPdf().get('pdf').then(function(pdf) {
            var totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                //pdf.html(cabecera.innerHTML);
                pdf.setPage(i);
                pdf.setFontSize(10);
                pdf.setTextColor(100);
                pdf.text('Página ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() / 2.3), (pdf.internal.pageSize.getHeight() - 0.8));
            }
        }).save();
    };

     const horizonalLinePlugin = {
        id: 'horizontalLine',
        afterDatasetsDraw: function(chartInstance) {
            var yValue;
            var yScale = chartInstance.scales["y-axis-0"];
            var canvas = chartInstance.chart;
            var ctx = canvas.ctx;
            var index;
            var line;
            var style;
            if (chartInstance.options.horizontalLine) {
                for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
                    line = chartInstance.options.horizontalLine[index];

                    if (!line.style) {
                        style = "#080808";
                    } else {
                        style = line.style;
                    }

                    if (line.y) {
                        yValue = yScale.getPixelForValue(line.y);
                    } else {
                        yValue = 0;
                    }
                    ctx.lineWidth = 3;

                    if (yValue) {
                        window.chart = chartInstance;
                        ctx.beginPath();
                        ctx.moveTo(0, yValue);
                        ctx.lineTo(canvas.width, yValue);
                        ctx.strokeStyle = style;
                        ctx.stroke();
                    }

                    if (line.text) {
                        ctx.fillStyle = style;
                        ctx.fillText(line.text, 0, yValue + ctx.lineWidth);
                    }
                }
                return;
            }
        }
    };

    const getInfo = () => {
        state.idEvaluacion = route.query.evaluacionId;
        state.nombreEvaluacion = route.query.evaluacionNombre;
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
            "evaluacionId":  state.idEvaluacion,
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
                if (element.imsaValor >= 3){
                    state.SubAreaMadura.push( {"nombre": element.nombreSubArea, "segmentacionAreaId": element.segmentacionAreaId});
                }
                if (element.imsaValor < 3){
                    state.SubAreaMejorar.push( {"nombre": element.nombreSubArea, "segmentacionAreaId": element.segmentacionAreaId});
                }
                element.SubAreaMadura  = (element.imsaValor >= 3) ? element.nombreSubArea : "";
                element.SubAreaMejorar = (element.imsaValor < 3) ? element.nombreSubArea : "";
            });
            console.log("state.IMSA", response.data);
             console.log("state.SubAreaMadura", state.SubAreaMadura);
              console.log("state.SubAreaMejorar", state.SubAreaMejorar);
            ApibackOffice.post("Madurez/GetIMA", filtro,
                { headers: header }
            )
            .then((response) => {
                if (response.status != 200) return false;
                state.IMA = response.data;
                state.IMA.forEach((element) => {
                    element.AreaMadura  = (element.imaValor >= 3) ? element.nombreArea : "";
                    element.AreaMejorar = (element.imaValor < 3) ? element.nombreArea : "";
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
                        getRecomendacionArea();
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
        });
        console.log("IMA", state.IMA); 
    };

    const getPuntuacionArea = () => { 
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

    const getRecomendacionArea = () => { 
        let filtro = {
            id: state.IM[0].evaluacionEmpresaId
        };
        ApibackOffice.post("EvaluacionEmpresa/GetPlanMejoras", filtro,
            { headers: header }
        )
        .then((response) => {
            if (response.status != 200) return false;
            state.recomendaciones = response.data
            console.log("state.recomendaciones", state.recomendaciones);
            exportToPDF();
            return;
        })
        .catch((error) => {
            console.log("error->", error);
        });
    };

    onMounted(() => {
      getInfo();
    });

    return {
      ...toRefs(state),
      horizonalLinePlugin,
    };
  },
};
</script>
