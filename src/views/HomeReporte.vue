<template>
     <!--Contenido-->
    <div class="row view-wrapper">
        <!--Inicia Tabs-->
        <div class="col-12 mt-3 mt-sm-0 mt-lg-5 flex-column flex-sm-row justify-content-between align-items-center">
            <ul class="nav nav-pills mb-2 mb-sm-0" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button @click="resumenSelected()" class="nav-link active" id="pills-resumen-tab" data-bs-toggle="pill" data-bs-target="#pills-resumen" type="button" role="tab" aria-controls="pills-resumen" aria-selected="true">Resumen</button>
                </li>
                <li class="nav-item" role="presentation" v-for="ima in IMA" :value="ima.segmentacionAreaId" :key="ima.segmentacionAreaId">
                    <button @click="areaSelected(ima)" name="areas-pills-tab" class="nav-link" :id="'pill-'+ ima.segmentacionAreaId + '-tab'" data-bs-toggle="pill" data-bs-target="#pills-estrategias" type="button" role="tab" aria-controls="pills-estrategias" aria-selected="false">{{ima.nombreArea}}</button>
                </li>
                 <li class="nav-item" role="presentation">
                <button @click="feedbackSelected()" class="nav-link" id="pills-feedback-tab" data-bs-toggle="pill" data-bs-target="#pills-feedback" type="button" role="tab" aria-controls="pills-feedback" aria-selected="false">Feedback</button>
              </li>
            </ul>
        </div>
        <!--Inicia Termina Tabs-->
        <!-- Inicio Content tabs-->
        <div class="tab-content pb-2" id="pills-tabContent">
            <!--Inicia Pills 1-->
            <div class="tab-pane fade show active " id="pills-resumen" role="tabpanel" aria-labelledby="pills-resumen-tab" tabindex="0">
                <!-- Inicio Cajas -->
                <div class="titulo-tabsinterior">
                    <h3>Resumen</h3>
                </div>
                <!--</div DIV AGREGADO POR MI -->
                <section class="cards cards-resumen mt-1 mb-4 justify-content-between">
                    <div class="cards-grafictabs p-3 d-flex">
                        <div class="w-100 d-flexflex-column justify-content-between align-items-center">
                            <h2>Resultados evaluación de madurez</h2>
                            <button class="btn btn-primary" @click="exportToPDF">Descargar</button>
                        </div>
                    </div>
                    
                    <div class="cards-grafictabs p-3">
                        <div class="w-100">
                            <h2>!Hola {{userSelected.nombres}}!, ¡Estás haciendo un gran trabajo! Solo quería recordarte acerca del índice de madurez para asegurarnos de que sigas en el camino correcto.</h2>
                            <p>El <b>índice de madurez empresarial</b>, se refiere como el grado en que una empresa ha desarrollado y adoptado buenas prácticas en sus procesos y dirección, lo que le permite operar de manera más efectiva y eficiente, alcanzando así sus objetivos y metas a largo plazo. La evaluación de la madurez empresarial, implica la medición del nivel de madurez actual de la empresa y la identificación de las áreas en las que se deben hacer mejoras para alcanzar un mayor grado de madurez y competitividad.</p>
                        </div>
                    </div>

                    
                    <div :class="claseIM">
                        <div class="catnivel">
                            <p class="niveles nivel-5 mb-0 mt-0">5</p>
                            <p class="niveles nivel-4 mb-0 mt-0">4</p>
                            <p class="niveles nivel-3 mb-0 mt-0">3</p>
                            <p class="niveles nivel-2 mb-0 mt-0">2</p>
                            <p class="niveles nivel-1 mb-0 mt-0">1</p>
                        </div>
                        <div class="w-100">
                            <h2>Madurez General</h2>
                            <p class="titlenivel">{{nivelMadurez}}</p>
                            <h2>{{IM.nivelReporte}}</h2>
                        </div>
                    </div>     
                </section>

                <section>
                    <div class="cards cards-result mt-1 mb-4 justify-content-between">
                        <div class="cards">
                            <div class="cards-grafictabsresult pt-4">
                                <div class="w-100 p-2" >
                                    <CChart
                                        type="bar"
                                        :data="resumenImportanciaRelativa"
                                        height="285"
                                        width="200"
                                        :options="{ maintainAspectRatio: false, plugins: { legend: { display: false } } }"
                                    />
                                </div>
                                <div class="bodycard">
                                    <h2>Importancia Relativa</h2>
                                    <p>Valor porcentual obtenido al analizar a la empresa dentro del tipo de “industria" a la que pertenece, donde se refleja la importancia de cada área con respecto a la actividad de la empresa. Ayuda a visualizar la relevancia de un área dentro de la compañía.</p>
                                </div>
                            </div>
                        </div>
                        <div class="cards">
                            <div class="cards-grafictabsresult pt-4">
                                <div class="w-100">
                                    <div>
                                        <div :md="12">
                                            <CChart type="radar" 
                                                :data="resumenPuntuacionArea" 
                                                height="300"
                                                width="200"
                                                :options=" {  responsive: true,  maintainAspectRatio: false,  scales: { r: { max: 100, min: 0, ticks: { stepSize: 10 } } },
                                            plugins: { legend: { display: false } } }"/> 
                                        </div>
                                    </div>
                                </div>
                                <div class="bodycard">
                                    <h2>Puntuación entre las áreas</h2>
                                     <p>Valor porcentual de cada área, en comparación con las otras, dentro de la organización. Ayuda a visualizar que área está mejor evaluada y cuales tienen una evaluación menor. Entendiendo como 100% la mejor evaluación posible</p>
                                </div>
                            </div>
                        </div>
                    
                        <div class="cards">
                            <div class="cards-grafictabsresult">
                                <div class="titlecard">
                                    <h3>AREAS MADURAS</h3>
                                </div>
                                <div class="w-100 table-responsive pie-table">
                                    <table class="table-res table-hover">
                                        <tbody>
                                            <tr v-for="areaMadura in AreasMaduras" :value="areaMadura.id" :key="areaMadura.id">
                                                <td scope="row">
                                                    <div class="min-w pt-5">
                                                        <CChart type="doughnut" :data="areaMadura.nivelMadurezAreas"/>
                                                    </div>
                                                </td>
                                                <td class="w-1">
                                                    <h4 class="text-center text-md-start">{{areaMadura.nombreArea}}</h4>
                                                </td>
                                                <td class="">
                                                    <h3 class="">Nivel {{parseFloat(areaMadura.imaValor).toFixed(0)}}</h3>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="cards">
                            <div class="cards-grafictabsresult">
                                <div class="titlecard">
                                    <h3>AREAS A MEJORAR</h3>
                                </div>
                                <div class="w-100 table-responsive pie-table">
                                    <table class="table-res table-hover">
                                        <tbody>
                                            <tr v-for="areaMejorar in AreasMejorar" :value="areaMejorar.id" :key="areaMejorar.id">
                                                <td scope="row">
                                                    <div class="min-w pt-5">
                                                        <CChart type="doughnut" :data="areaMejorar.nivelMadurezAreas"/>
                                                    </div>
                                                </td>
                                                <td class="w-1">
                                                    <h4 class="text-center text-md-start">{{areaMejorar.nombreArea}}</h4>
                                                </td>
                                                
                                                <td class="">
                                                    <h3 class="">Nivel {{parseFloat(areaMejorar.imaValor).toFixed(0)}}</h3>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div class="level-descrip d-flex flex-column">
                        <div class="d-flex justify-content-around w-100" v-for="nivelReporte in reporte.reporteItemNivelBasicos" :value="nivelReporte.id" :key="nivelReporte.id">
                            <div :class="'nivel-' + nivelReporte.orden + '-descrip'">
                                <p>{{nivelReporte.orden}}</p>
                            </div>
                            <div :class="'nivel-' + nivelReporte.orden + '-description w-100'">
                               {{nivelReporte.detalle}}
                            </div>
                        </div>
                    </div>
                </section>
                <!-- Fin Cajas-->
            </div>
            <!--Termina Pills 1-->
            <!--Inicia Pills 2-->
            <div class="tab-pane fade" :id="'pills-'+ ima.segmentacionAreaId" name="pills-areas" role="tabpanel" aria-labelledby="pills-estrategias-tab" tabindex="0" v-for="ima in IMA" :value="ima.segmentacionAreaId" :key="ima.segmentacionAreaId">
                <!-- Inicio Cajas -->
                <div class="my-5 d-flex flex-wrap justify-content-between">
                    <div>
                        <h3 class="titleafterleyend">{{ima.nombreArea}}</h3>
                    </div>
                    <div class="circle d-flex flex-wrap align-items-center">
                        <div class="leyend d-flex align-items-center">
                            <div class="grafica ">
                                <button class="btn circle-res order-md-2 ">
                                    {{ima.imaValor}}
                                </button>
                            </div>
                            <h5>Aporte IM</h5>
                        </div>

                        <div class="leyend d-flex align-items-center">
                            <div class="grafica">
                                <button class="btn circle-blue order-md-2 ">
                                    {{ima.cumplimiento}}%
                                </button>
                            </div>
                            <h5>Cumplimiento</h5>
                        </div>

                        <div class="leyend d-flex align-items-center">
                            <div class="grafica">
                                <button class="btn circle-red order-md-2 ">
                                    <p>{{ima.brecha}}%</p>
                                </button>
                            </div>
                            <h5>Brecha</h5>
                        </div>
                    </div>
                </div>

                <section class="cards mt-1 mb-4 justify-content-between">
                    <div class="cards-grafictabsnivel">
                        <div class="catnivel">
                            <p class="niveles nivel-5 mb-0 mt-0">5</p>
                            <p class="niveles nivel-4 mb-0 mt-0">4</p>
                            <p class="niveles nivel-3 mb-0 mt-0">3</p>
                            <p class="niveles nivel-2 mb-0 mt-0">2</p>
                            <p class="niveles nivel-1 mb-0 mt-0">1</p>
                        </div>

                        <div class="w-100 d-flex flex-column">
                            <div class="d-flex flex-column justify-content-center">
                                <p :class="ima.claseIMA">{{parseFloat(ima.imaValor).toFixed(0)}}</p>
                                <div> 
                                    <CChart type="doughnut" :data="ima.nivelMadurezAreas" height="100" width="100"/>
                                </div>
                            </div>
                            <div class="d-flex flex-wrap flex-column justify-content-center mt-3">
                                <h2>Madurez General</h2>
                                <h2>Tu puntuación ha sido calculada en base a las últimas métricas</h2>
                            </div>
                        </div>
                    </div> 

                    <div class="cards-backtabsresult">
                        <div class="cards-grafictabsresult pt-4">
                            <div class="w-100 p-2">
                                <CChart type="bar" :data="ima.resumenCapacidad" 
                                    height="100"
                                    width="100"
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
                            </div>
                            <div class="bodycard">
                                <h2>Nivel de desarrollo por subáreas</h2>
                                <p>El nivel de desarrollo por subáreas se refiere a la evaluación de las capacidades en relación con una empresa e industria específica. La calificación otorgada indica el grado de desarrollo de cada capacidad dentro de una subárea y, por consiguiente, dentro de un área más amplia. Los posibles resultados de esta evaluación son: Capacidad Inexistente, Poco Desarrollada, Desarrollada y Muy Desarrollada.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="cards mt-1 mb-4 justify-content-around">
                    <div class="cards-grafictabsresultsub h-100">
                        <div class="titlecard">
                            <h3>TOP 3 CAPACIDADES</h3>
                        </div>
                        <div class="w-100 table-responsive pie-table">
                            <table class="table-res table-hover">
                                <tbody>
                                    <tr v-for="top3capacidadByarea in top3capacidadesByarea" :value="top3capacidadByarea.segmentacionAreaId" :key="top3capacidadByarea.segmentacionAreaId">
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">{{top3capacidadByarea.preguntaCapacidad}}</h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="cards-grafictabsresultsub h-100">
                        <div class="titlecard">
                            <h3>3 PEORES CAPACIDADES</h3>
                        </div>
                        <div class="w-100 table-responsive pie-table">
                            <table class="table-res table-hover">
                                <tbody>
                                    <tr v-for="top3PeorCapacidadByArea in top3peoresCapacidadesByarea" :value="top3PeorCapacidadByArea.segmentacionAreaId" :key="top3PeorCapacidadByArea.segmentacionAreaId">
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">{{top3PeorCapacidadByArea.preguntaCapacidad}}</h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="cards-backtabsresult">
                        <div class="cards-grafictabsresult">
                            <div class="titlecard">
                                <h3>SUBÁREAS MADURAS</h3>
                            </div>
                            <div class="w-100 table-responsive pie-table">
                                <table class="table-res table-hover">
                                    <tbody>
                                        <tr v-for="SubAreaMadura in SubAreasMaduras" :value="SubAreaMadura.id" :key="SubAreaMadura.id" >
                                            <td scope="row" v-if="SubAreaMadura.segmentacionAreaId === ima.segmentacionAreaId">
                                                <div class="min-w">
                                                    <div id="updateConfigtestFive"></div>
                                                </div>
                                            </td>
                                            <td class="w-1" v-if="SubAreaMadura.segmentacionAreaId === ima.segmentacionAreaId">
                                                <h4 class="text-center text-md-start">{{SubAreaMadura.nombreSubArea}}</h4>
                                            </td>
                                            <td class="" v-if="SubAreaMadura.segmentacionAreaId === ima.segmentacionAreaId">
                                                <h3 class="">Nivel {{parseFloat(SubAreaMadura.imsaValor).toFixed(0)}}</h3>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="cards-backtabsresult">
                        <div class="cards-grafictabsresult">
                            <div class="titlecard">
                                <h3>SUBÁREAS A MEJORAR</h3>
                            </div>
                            <div class="w-100 table-responsive pie-table">
                                <table class="table-res table-hover">
                                    <tbody>
                                        <tr v-for="SubAreaMejorar in SubAreasMejorar" :value="SubAreaMejorar.id" :key="SubAreaMejorar.id">
                                            <td scope="row" v-if="SubAreaMejorar.segmentacionAreaId === ima.segmentacionAreaId">
                                                <div class="min-w">
                                                    <div id="updateConfigtestSeven"></div>
                                                </div>
                                            </td>
                                            <td class="w-1" v-if="SubAreaMejorar.segmentacionAreaId === ima.segmentacionAreaId">
                                                <h4 class="text-center text-md-start">{{SubAreaMejorar.nombreSubArea}}</h4>
                                            </td>
                                            <td class="" v-if="SubAreaMejorar.segmentacionAreaId === ima.segmentacionAreaId">
                                                <h3 class="">Nivel {{parseFloat(SubAreaMejorar.imsaValor).toFixed(0)}}</h3>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <!--Termina Pills 2-->
            <!-- Inicia Pills 3 -->
            <div class="tab-pane fade" id="pills-feedback" role="tabpanel" aria-labelledby="pills-feedback-tab" tabindex="0">
                <!-- Inicio Cajas -->
                <div>
                    <h3 class="titulo-tabsinterior">Feedback</h3>
                </div>
                <div class="card mt-3 mb-2 d-flex ">   
                    <div class="table-responsive pie-table">
                        <table class="table table-hover table-recomendaciones">
                            <thead>
                                <tr>
                                    <th scope="col">Capacidad</th>
                                    <th scope="col">&Aacute;rea / Sub&aacute;rea</th>
                                    <th scope="col">Feedback</th>
                                    <th scope="col">Importancia para la empresa</th>
                                    <th scope="col">Evaluaci&oacute;n</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="recomendacion in feedbacks " :key="recomendacion.id">
                                    <td v-if="recomendacion.respuestaValor != '4'">
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">{{recomendacion.preguntaCapacidad}}</h4>
                                        </div>
                                    </td>
                                    <td v-if="recomendacion.respuestaValor != '4'"> 
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">{{recomendacion.nombreArea}} / {{recomendacion.nombreSubArea}}</h4>
                                        </div>
                                    </td>
                                    <td v-if="recomendacion.respuestaValor != '4'">
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">{{recomendacion.respuestaRealimentacion}}</h4>
                                        </div>
                                    </td>
                                    <td v-if="recomendacion.respuestaValor != '4'">
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">{{recomendacion.tipoImportanciaNombre}}</h4>
                                        </div>
                                    </td>
                                    <td v-if="recomendacion.respuestaValor != '4'">
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">{{recomendacion.tipoRespuestaValorNombre}}</h4>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>  
                    </div> 
                </div> 
            </div>
            <!-- Termina Pill 3 -->
        </div>
        <!--Fin Content tabs-->
    </div>
    <!--Termino Contendio-->
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
import { colorAleatorio } from "@/Helper/util";
import swal from "sweetalert2";
export default {
  name: "Reporte",
  methods: {
    colorAleatorio,
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
        userSelected: [],
        fechaHoy : "",
        rutempresa: "",
        razonsocial: "",
        nivelMadurez: "",
        claseIM: "cards-grafictabsnivelIM",
        IM: [],
        IMA: [],
        IMSA: [],
        capacidadSubAreas: [],
        madurezGeneral: [],
        evaluaciones: [],
        resumenImportanciaRelativa: [],
        evaluacionSelected: [],
        resumenPuntuacionArea: [],
        feedbacks: [],
        idEvaluacion: "",
        nombreEvaluacion: "",
        reporte: [],
        AreasMaduras: [],
        AreasMejorar: [],
        SubAreasMaduras: [],
        SubAreasMejorar: [],
        capacidadvalorMayor: [],
        capacidadvalorMenor: [],
        top3capacidadesByarea: [],
        top3peoresCapacidadesByarea : [],

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

    const getInfo = async () => {
        state.userSelected = JSON.parse(localStorage.usuarioModel);
        state.idEvaluacion = route.query.evaluacionId;
        state.nombreEvaluacion = route.query.evaluacionNombre;
        const fecha = new Date();
        const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        let month = months[fecha.getMonth()];
        state.fechaHoy = fecha.getDate() +  " de " + month + " de " + fecha.getFullYear();

        state.rutempresa =  JSON.parse(localStorage.empresaModel).rutEmpresa;
        state.razonsocial = JSON.parse(localStorage.empresaModel).razonSocial;
        if (await getNivelReporte() != false){
            //getMadurezGeneral();
            await getIM();
            graficoMadurezGeneral();
            await getIMA();
            await getIMSA();
            await GetCapacidadSubAreas();
            getGraficoImportanciaRelativa();
            getGraficoCapacidad();
            getPuntuacionArea();
            await getRecomendacionArea();

        };
    };

    const getNivelReporte = async () => {
        let bodyEvaluacion = {
            "id" : state.idEvaluacion
        }
        return ApibackOffice.post("Reporte/GetReportesByEvaluacionId", bodyEvaluacion,
            { headers: header } 
        )
        .then((response) => {
            if (response.status != 200) return false;
            state.reporte = response.data.find((c) => c.evaluacionId === state.idEvaluacion);
            if (!state.reporte){
                swal.fire({
                    title: "Configuración Reporte",
                    text: "No tienen configurado configuración reporte",
                    icon: "warning",
                });
                return false;
            }
            return;
        })
        .catch((error) => {
            console.log("error->", error);
        });
    };

    const getIM = async () => {
        let filtro = {
            "evaluacionId": state.idEvaluacion, 
            "empresaId": JSON.parse(localStorage.usuarioModel).empresaId
        }
        return ApibackOffice.post("Madurez/GetIM", filtro,
            { headers: header }
        )
        .then((response) => {
            if (response.status != 200) return false;
            state.IM = response.data;
            state.IM = state.IM.find((c) => c.evaluacionId === state.idEvaluacion);
            if (state.reporte == undefined){
                return false;
            }
            let nivelReporte = state.reporte.reporteItemNivelBasicos.find((c) => c.orden === parseInt(state.IM.imValor.toFixed(0)));
            state.IM.nivelReporte = nivelReporte.detalle;
            state.nivelMadurez = parseInt(state.IM.imValor).toFixed(0);
        })
        .catch((error) => {
            console.log("error->", error);
        });
    };

     const getIMA = async () => {
        return ApibackOffice.get("Madurez/GetIMAReporteSubscripcionOBasico?evaluacionId="+ state.idEvaluacion + "&empresaId=" +  JSON.parse(localStorage.usuarioModel).empresaId + "&usuarioId=" +  state.userSelected.id, null,
            { headers: header } 
        )
        .then((response) => {
            if (response.status != 200) return false;
            state.IMA = response.data;
            state.IMA.forEach((element) => {
                let color = [];
                let restante = "";
                let dataSet = [];
                if (element.imaValor.toFixed(0) == 1){
                    color = "#e5342c";
                    restante = 4;
                }
                if (element.imaValor.toFixed(0) == 2){
                    color = "#f3bf4f";
                    restante = 3;
                }
                if (element.imaValor.toFixed(0) == 3){
                    color = "#fcfa62";
                    restante = 2;
                }
                if (element.imaValor.toFixed(0) == 4){
                    color = "#3070b5";
                    restante = 1;
                }
                if (element.imaValor.toFixed(0) == 5){
                    color = "#4fa95c";
                    restante = 0;
                }

                let elemento = {
                    label: [element.nombreArea],
                    backgroundColor:  [color, "#FFFFFF"],
                    data: [parseInt(element.imaValor.toFixed(0)), restante]
                }

                dataSet.push(elemento);
                element.nivelMadurezAreas = {
                    datasets: dataSet,
                };
                
                element.claseIMA = "titlenivel-" + element.imaValor.toFixed(0);
                element.imaValor = element.imaValor.toFixed(2);
                let cumplimiento = (element.imaValor / 5) * 100;
                element.cumplimiento = cumplimiento.toFixed(0);
                let brecha =  element.cumplimiento - 100;
                element.brecha = brecha.toFixed(0);

                if (element.imaValor >= 4){
                    state.AreasMaduras.push(element);
                }else{
                    state.AreasMejorar.push(element);
                }
            });
            state.AreasMaduras = state.AreasMaduras.sort(((a, b) =>  b.imaValor - a.imaValor));
            state.AreasMejorar = state.AreasMejorar.sort((x, y) => x.imaValor - y.imaValor);
        })
        .catch((error) => {
            console.log("error->", error);
        });
    };

    const getIMSA= async () => {
        let filtro = {
            "evaluacionId": state.idEvaluacion, 
            "empresaId": JSON.parse(localStorage.usuarioModel).empresaId
        }
        return ApibackOffice.post("Madurez/GetIMSA",filtro,
            { headers: header }
        )
        .then((response) => {
            if (response.status != 200) return false;
            state.IMSA = response.data;
            state.IMSA.forEach((element) => {
                if (element.imsaValor.toFixed(0) >= 4){
                    state.SubAreasMaduras.push(element);
                }else{
                    state.SubAreasMejorar.push(element);
                }
            });
            state.SubAreasMaduras = state.SubAreasMaduras.sort(((a, b) =>  b.imsaValor - a.imsaValor));
            state.SubAreasMejorar = state.SubAreasMejorar.sort((x, y) => x.imsaValor - y.imsaValor);
        })
        .catch((error) => {
            console.log("error->", error);
        });
    };

    const GetCapacidadSubAreas = async () => {
        let filtro = {
            "evaluacionId": state.idEvaluacion, 
            "empresaId": JSON.parse(localStorage.usuarioModel).empresaId
        }
        return ApibackOffice.post("Madurez/GetCapacidadSubAreas", filtro,
            { headers: header }
        )
        .then((response) => {
            if (response.status != 200) return false;
            state.capacidadSubAreas = response.data
            return;
        })
        .catch((error) => {
            console.log("error->", error);
        });
    };

    const graficoMadurezGeneral = () => {
        let color = [];
        let restante = "";
        let dataSet = [];
        if (state.IM.imValor.toFixed(0) == 1){
            color = "#EA0404";
            restante = 4;
            state.claseIM = "cards-grafictabsnivel1"
        }
        if (state.IM.imValor.toFixed(0) == 2){
            color = "#DD5004";
            restante = 3;
            state.claseIM = "cards-grafictabsnivel2"
        }
        if (state.IM.imValor.toFixed(0) == 3){
            color = "#F5E102";
            restante = 2;
            state.claseIM = "cards-grafictabsnivel3"
        }
        if (state.IM.imValor.toFixed(0) == 4){
            color = "#0152EB";
            restante = 1;
            state.claseIM = "cards-grafictabsnivel4"
        }
        if (state.IM.imValor.toFixed(0) == 5){
            color = "#3AAE3A";
            restante = 0;
            state.claseIM = "cards-grafictabsnivel5"
        }

        let elemento = {
            label: ["Madurez General"],
            backgroundColor:  [color, "#FFFFFF"],
            data: [parseInt(state.IM.imValor.toFixed(0)), restante]
        }

        dataSet.push(elemento);
        state.madurezGeneral = {
            labels: ["Madurez General"],
            datasets: dataSet,
        };
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
            label: "Evaluacion " +  state.IM.nombreEvaluacion,
            backgroundColor:  colorAleatorio(),
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
            let index = 0;
            let indexValorCapacidad = 0;
            let tipoImportancia = "";
            let valorInexistente = 0;
            let valorPocoDesarrollada = 0;
            let valorDesarrollada = 0;
            let valorMuyDesarrollada = 0;

            for (let i = 0; i < state.capacidadSubAreas.length; i++) { 
               // for (let j = 0; j < state.capacidadSubAreas.length; j++) {
                    if (/*i !== j &&*/ state.capacidadSubAreas[i].segmentacionAreaId == element.segmentacionAreaId) {
                        //if ( state.capacidadSubAreas[i].segmentacionSubAreaId ===  state.capacidadSubAreas[j].segmentacionSubAreaId) { 
                            if (datos.find((m) => m.segmentacionSubAreaId == state.capacidadSubAreas[i].segmentacionSubAreaId) == undefined){
                                labels.push(state.capacidadSubAreas[i].nombreSubArea);
                                
                                if ( state.capacidadSubAreas[i].respuestaValor == 1) valorInexistente = 1;
                                if ( state.capacidadSubAreas[i].respuestaValor == 2) valorPocoDesarrollada = 1;
                                if ( state.capacidadSubAreas[i].respuestaValor == 3) valorDesarrollada = 1;
                                if ( state.capacidadSubAreas[i].respuestaValor == 4) valorMuyDesarrollada = 1;

                                datos.push({
                                    "segmentacionSubAreaId" : state.capacidadSubAreas[i].segmentacionSubAreaId ,
                                    "nombre" : state.capacidadSubAreas[i].nombreSubArea,
                                    "capacidadValor": state.capacidadSubAreas[i].respuestaValor,
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
                                if ( state.capacidadSubAreas[i].respuestaValor == 1){
                                    tipoImportancia = "Inexistente";
                                }
                                if ( state.capacidadSubAreas[i].respuestaValor == 2){
                                    tipoImportancia = "Poco Desarrollada";
                                }
                                if ( state.capacidadSubAreas[i].respuestaValor == 3){
                                    tipoImportancia = "Desarrollada";
                                }
                                if ( state.capacidadSubAreas[i].respuestaValor == 4){
                                    tipoImportancia = "Muy Desarrollada";
                                }
                                indexValorCapacidad = datos[index].valorCapacidad.findIndex((m) => m.nombre == tipoImportancia);
                                datos[index].valorCapacidad[indexValorCapacidad].valor = datos[index].valorCapacidad[indexValorCapacidad].valor + 1;
                                datos[index].capacidadValor = datos[index].capacidadValor + state.capacidadSubAreas[i].respuestaValor;
                            }
                        //}
                    }
                //}
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
            datos = [];
            labels = [];
            valor1 = [];
            valor2 = [];
            valor3 = [];
            valor4 = [];
        });
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
        label: "Evaluacion " +  state.IM.nombreEvaluacion,
        backgroundColor:  colorAleatorio(),
        data: valorDataList,
        fill: true,
        backgroundColor: 'rgba(22, 197, 155, 0.2)',
        borderColor: 'rgb(22, 197, 155)',
        pointBackgroundColor: 'rgb(22, 197, 155)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(22, 197, 155)'
      }

      dataSet.push(elemento);

      state.resumenPuntuacionArea = {
        labels: labels,
        datasets: dataSet,
      };
    };

    const getRecomendacionArea = async () => {  
        /*let filtro = {
            id: state.IM.evaluacionEmpresaId
        };*/
        /*ApibackOffice.post("EvaluacionEmpresa/GetPlanMejoras", filtro,
            { headers: header }
        )*/
        return ApibackOffice.get("EvaluacionEmpresa/GetPlanMejorasReporteSubscripcionOBasico?evaluacionEmpresaId=" + state.IM.evaluacionEmpresaId + "&usuarioId=" + state.userSelected.id + "&evaluacionId=" + state.idEvaluacion, null,
            { headers: header }
        ) 
        .then((response) => {
            if (response.status != 200) return false;
            state.feedbacks = response.data
            state.feedbacks.forEach((element) => {
                if ( element.respuestaValor == '1'){
                    element.tipoRespuestaValorNombre = "Inexistente";
                }
                if ( element.respuestaValor == '2'){
                    element.tipoRespuestaValorNombre = "Poco Desarrollada";
                }
                if ( element.respuestaValor == '3'){
                    element.tipoRespuestaValorNombre = "Desarrollada";
                }

                state.IMSA.forEach((x) => {
                    if (x.segmentacionSubAreaId == element.segmentacionSubAreaId){
                        if (element.importanciaDetalle == "4" || element.importanciaDetalle == "3" ){
                            element.imsaValor = x.imsaValor;
                            state.capacidadvalorMayor.push(element);
                        }
                        if (element.importanciaDetalle == "1" || element.importanciaDetalle == "2" ){
                            element.imsaValor = x.imsaValor;
                            state.capacidadvalorMenor.push(element);
                        }

                    }
                });
            });
            state.capacidadvalorMayor = state.capacidadvalorMayor.sort(((a, b) =>  b.imsaValor - a.imsaValor));
            state.capacidadvalorMenor = state.capacidadvalorMenor.sort(((a, b) =>  a.imsaValor - b.imsaValor));
            return;
        })
        .catch((error) => {
            console.log("error->", error);
        });
    };

    const areaSelected = (ima) => { 
        state.top3capacidadesByarea = state.capacidadvalorMayor.filter(y => y.segmentacionAreaId == ima.segmentacionAreaId);
        if (state.top3capacidadesByarea.length > 3){
            state.top3capacidadesByarea.length = 3;
        }
        state.top3peoresCapacidadesByarea = state.capacidadvalorMenor.filter(m => m.segmentacionAreaId == ima.segmentacionAreaId);
        if (state.top3peoresCapacidadesByarea.length > 3){
            state.top3peoresCapacidadesByarea.length = 3;
        }
        
        
        let areasTab = document.getElementsByName("areas-pills-tab");
        for (let x = 0; x < areasTab.length; x++) {
            areasTab[x].classList.remove("active");
        }
        let areaPill = document.getElementsByName("pills-areas"); 
        for (let x = 0; x < areaPill.length; x++) {
            areaPill[x].classList.remove("show");
              areaPill[x].classList.remove("active");
        }
        document.getElementById("pills-resumen-tab").classList.remove("active");
        document.getElementById("pills-feedback-tab").classList.remove("active");
        document.getElementById("pills-resumen").classList.remove("show");
        document.getElementById("pills-resumen").classList.remove("active");
        document.getElementById("pills-feedback").classList.remove("show");
        document.getElementById("pills-feedback").classList.remove("active");

        document.getElementById("pill-" + ima.segmentacionAreaId+ "-tab").classList.add("active");
        document.getElementById("pills-" + ima.segmentacionAreaId).classList.add("show");
        document.getElementById("pills-" + ima.segmentacionAreaId).classList.add("active");
    };
    
    const resumenSelected = () => {  
        let areasTab = document.getElementsByName("areas-pills-tab");
        for (let x = 0; x < areasTab.length; x++) {
            areasTab[x].classList.remove("active");
        }
        let areaPill = document.getElementsByName("pills-areas"); 
         for (let x = 0; x < areaPill.length; x++) {
            areaPill[x].classList.remove("show");
              areaPill[x].classList.remove("active");
        }
        document.getElementById("pills-feedback").classList.remove("show");
        document.getElementById("pills-feedback").classList.remove("active");
        document.getElementById("pills-feedback-tab").classList.remove("active");

        
        document.getElementById("pills-resumen").classList.add("show");
        document.getElementById("pills-resumen").classList.add("active");
        document.getElementById("pills-resumen-tab").classList.add("active");
      
    };

    const feedbackSelected = () => {  
        let areasTab = document.getElementsByName("areas-pills-tab");
        for (let x = 0; x < areasTab.length; x++) {
            areasTab[x].classList.remove("active");
        }
        let areaPill = document.getElementsByName("pills-areas"); 
         for (let x = 0; x < areaPill.length; x++) {
            areaPill[x].classList.remove("show");
              areaPill[x].classList.remove("active");
        }
        document.getElementById("pills-resumen").classList.remove("show");
        document.getElementById("pills-resumen").classList.remove("active");
        document.getElementById("pills-resumen-tab").classList.remove("active");
        
        document.getElementById("pills-feedback").classList.add("show");
        document.getElementById("pills-feedback").classList.add("active");
        document.getElementById("pills-feedback-tab").classList.add("active");
      
    };

    onMounted(() => {
      getInfo();
    });

    return {
      ...toRefs(state),
      exportToPDF,
      horizonalLinePlugin,
      areaSelected,
      resumenSelected,
      feedbackSelected
    };
  },
};
</script>
