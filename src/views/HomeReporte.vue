<template>
     <!--Contenido-->
    <div class="row view-wrapper">
        <!--Inicia Tabs-->
        <div class="col-12 mt-3 mt-sm-0 mt-lg-5 flex-column flex-sm-row justify-content-between align-items-center">
            <ul class="nav nav-pills mb-2 mb-sm-0" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-resumen-tab" data-bs-toggle="pill" data-bs-target="#pills-resumen" type="button" role="tab" aria-controls="pills-resumen" aria-selected="true">Resumen</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-estrategias-tab" data-bs-toggle="pill" data-bs-target="#pills-estrategias" type="button" role="tab" aria-controls="pills-estrategias" aria-selected="false">Estrategias</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-finanzas-tab" data-bs-toggle="pill" data-bs-target="#pills-finanzas" type="button" role="tab" aria-controls="pills-finanzas" aria-selected="false">Finanzas</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-marketing-tab" data-bs-toggle="pill" data-bs-target="#pills-marketing" type="button" role="tab" aria-controls="pills-marketing" aria-selected="false">Marketing</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-operaciones-tab" data-bs-toggle="pill" data-bs-target="#pills-operaciones" type="button" role="tab" aria-controls="pills-operaciones" aria-selected="false">Operaciones</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-gestion-tab" data-bs-toggle="pill" data-bs-target="#pills-gestion" type="button" role="tab" aria-controls="pills-gestion" aria-selected="false">Gestion de Personas</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-comercial-tab" data-bs-toggle="pill" data-bs-target="#pills-comercial" type="button" role="tab" aria-controls="pills-comercial" aria-selected="false">Comercial y Ventas</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-recomendaciones-tab" data-bs-toggle="pill" data-bs-target="#pills-recomendaciones" type="button" role="tab" aria-controls="pills-recomendaciones" aria-selected="false">Recomendaciones</button>
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
                            <button class="btn btn-primary ">Descargar</button>
                        </div>
                    </div>
                    
                    <div class="cards-grafictabs p-3">
                        <div class="w-100">
                            <h2>Hola Cristian, lo estás haciendo muy bien</h2>
                            <p>La empresa entregó resultados acordes con lo esperado a una organización de su tamaño y estructura, alcanzando el 4to nivel en la evaluación. Esto implica que la organización posee todas las herramientas para enfrentar el desafío de seguir creciendo y diversificando sus clientes, sin embargo, es recomendable que se desarrollen o mejoren ciertas capacidades para que su buen funcionamiento sea perdurable en el tiempo.</p>
                        </div>
                    </div>

                    <div class="cards-grafictabsnivel5">
                        <div class="catnivel">
                            <p class="niveles nivel-5 mb-0 mt-0">5</p>
                            <p class="niveles nivel-4 mb-0 mt-0">4</p>
                            <p class="niveles nivel-3 mb-0 mt-0">3</p>
                            <p class="niveles nivel-2 mb-0 mt-0">2</p>
                            <p class="niveles nivel-1 mb-0 mt-0">1</p>
                        </div>
                        <div class="w-100">
                            <h2>Madurez General</h2>
                            <p class="titlenivel">5</p>
                            <h2>Tu puntuación ha sido calculada en base a las últimas métricas</h2>
                        </div>
                    </div>     
                </section>

                <section>
                    <div class="cards cards-result mt-1 mb-4 justify-content-between">
                        <div class="cards">
                            <div class="cards-grafictabsresult pt-4">
                                <div class="w-100 p-2">
                                    <div id="colorOnover_1">
                                    </div>
                                </div>
                                <div class="bodycard">
                                    <p>“Valor porcentual de cada área, en comparación con las otras, dentro de la organización. Ayuda a visualizar que área está mejor evaluada y cuales tienen una evaluación menor. Entendiendo como 100% la mejor evaluación posible”</p>
                                </div>
                            </div>
                        </div>
                        <div class="cards">
                            <div class="cards-grafictabsresult pt-4">
                                <div class="w-100">
                                    <div id="radarAxis">
                                    </div>
                                </div>
                                <div class="bodycard">
                                    <h2>Puntuación entre las áreas</h2>
                                </div>
                            </div>
                        </div>
                    
                        <div class="cards">
                            <div class="cards-grafictabsresult">
                                <div class="titlecard">
                                    <h3>1AREAS MADURAS</h3>
                                </div>
                                <div class="w-100 table-responsive pie-table">
                                    <table class="table-res table-hover">
                                        <tbody>
                                            <tr>
                                                <td scope="row">
                                                    <div class="min-w">
                                                        <div id="updateConfigtest">  
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="w-1">
                                                    <h4 class="text-center text-md-start">1Gestion de personas</h4>
                                                </td>
                                                <td class="">
                                                    <h3 class="">Nivel 4</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="row">
                                                    <div class="min-w">
                                                        <div id="updateConfigtestTwo">
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="w-1">
                                                    <h4 class="text-center text-md-start">Operaciones</h4>
                                                </td>
                                                <td class="">
                                                    <h3 class="">Nivel 4</h3>
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
                                    <h3>1AREAS A MEJORAR</h3>
                                </div>
                                <div class="w-100 table-responsive pie-table">
                                    <table class="table-res table-hover">
                                        <tbody>
                                            <tr>
                                                <td scope="row">
                                                    <div class="min-w">
                                                        <div id="updateConfigtestThree">
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="w-1">
                                                    <h4 class="text-center text-md-start">Comercial y ventas</h4>
                                                </td>
                                                
                                                <td class="">
                                                    <h3 class="">Nivel 4</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="row">
                                                    <div class="min-w">
                                                        <div id="updateConfigtestFour">
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="w-1">
                                                    <h4 class="text-center text-md-start">Estrategias</h4>
                                                </td>
                                                <td class="">
                                                    <h3 class="">Nivel 3</h3>
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
                        <div class="d-flex justify-content-around">
                            <div class="nivel-5-descrip">
                                <p>5</p>
                            </div>
                            <div class="nivel-5-description">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex modi animi natus nihil beatae tempora, excepturi fugiat tenetur repellendus iure velit qui vitae, ducimus consequuntur molestias eum atque, sunt facere.
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="nivel-4-descrip">
                                <p>4</p>
                            </div>
                            <div class="nivel-4-description">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. In veniam ab ipsa quisquam neque rerum recusandae omnis, harum minus ducimus nihil a illo alias odit animi quasi accusantium esse eum!
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="nivel-3-descrip">
                                <p>3</p>
                            </div>
                            <div class="nivel-3-description">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, modi! Illo itaque, aliquid quas quasi at laudantium quaerat nemo? Nisi, odit minima tempore ea animi sapiente nam veniam cum atque.
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="nivel-2-descrip">
                                <p>2</p>
                            </div>
                            <div class="nivel-2-description">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, modi! Illo itaque, aliquid quas quasi at laudantium quaerat nemo? Nisi, odit minima tempore ea animi sapiente nam veniam cum atque.
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="nivel-1-descrip">
                                <p>1</p>
                            </div>
                            <div class="nivel-1-description">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, modi! Illo itaque, aliquid quas quasi at laudantium quaerat nemo? Nisi, odit minima tempore ea animi sapiente nam veniam cum atque.
                            </div>
                        </div>
                    </div>
                </section>
                <!-- Fin Cajas-->
            </div>
            <!--Termina Pills 1-->
            <!--Inicia Pills 2-->
          
            <div class="tab-pane fade active" id="pills-estrategias" role="tabpanel" aria-labelledby="pills-estrategias-tab" tabindex="0">
                <!-- Inicio Cajas -->
                <div class="my-5 d-flex flex-wrap justify-content-between">
                    <div>
                        <h3 class="titleafterleyend">Estrategias</h3>
                    </div>
                    <div class="circle d-flex flex-wrap align-items-center">
                        <div class="leyend d-flex align-items-center">
                            <div class="grafica ">
                                <button class="btn circle-res order-md-2 ">
                                    0.71
                                </button>
                            </div>
                            <h5>Gestion de Personas</h5>
                        </div>

                        <div class="leyend d-flex align-items-center">
                            <div class="grafica">
                                <button class="btn circle-blue order-md-2 ">
                                    65%
                                </button>
                            </div>
                            <h5>Gestion de Personas</h5>
                        </div>

                        <div class="leyend d-flex align-items-center">
                            <div class="grafica">
                                <button class="btn circle-red order-md-2 ">
                                    <p>-35%</p>
                                </button>
                            </div>
                            <h5>Gestion de Personas</h5>
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
                                <p class="titlenivel-5">5</p>
                                <div id="updateConfigOne">
                                </div>
                            </div>
                            <div class="d-flex flex-wrap flex-column justify-content-center mt-3">
                                <h2>Madurez General</h2>
                                <h2>Tu puntuación ha sido calculada en base a las últimas métricaasasdsd</h2>
                            </div>
                            <!-- <div id="updateConfigTwo"></div>  -->
                        </div>
                    </div> 

                    <div class="cards-backtabsresult">
                        <div class="cards-grafictabsresult pt-4">
                            <div class="w-100 p-2">
                                <div id="colorOnover_2">
                                </div>
                            </div>
                            <div class="bodycard">
                                <h2>Puntuación entre las áreas</h2>
                                <p>“Valor porcentual de cada área, en comparación con las otras, dentro de la organización. Ayuda a visualizar que área está mejor evaluada y cuales tienen una evaluación menor. Entendiendo como 100% la mejor evaluación posible”</p>
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
                                    <tr>
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">SUB AREA 1</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">SUB AREA 2</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">SUB AREA 3</h4>
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
                                    <tr>
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">SUB AREA 1</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">SUB AREA 2</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">SUB AREA 3</h4>
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
                                        <tr>
                                            <td scope="row">
                                                <div class="min-w">
                                                    <div id="updateConfigtestFive"></div>
                                                </div>
                                            </td>
                                            <td class="w-1">
                                                <h4 class="text-center text-md-start">12Gestion de personas</h4>
                                            </td>
                                            <td class="">
                                                <h3 class="">Nivel 4</h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row">
                                                <div class="min-w">
                                                    <div id="updateConfigtestSix"></div>
                                                </div>
                                            </td>
                                            <td class="w-1">
                                                <h4 class="text-center text-md-start">Operaciones</h4>
                                            </td>
                                            <td class="">
                                                <h3 class="">Nivel 4</h3>
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
                                        <tr>
                                            <td scope="row">
                                                <div class="min-w">
                                                    <div id="updateConfigtestSeven"></div>
                                                </div>
                                            </td>
                                            <td class="w-1">
                                                <h4 class="text-center text-md-start">Comercial y ventas</h4>
                                            </td>
                                            <td class="">
                                                <h3 class="">Nivel 4</h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row">
                                                <div class="min-w">
                                                    <div id="updateConfigtestEight"></div>
                                                </div>
                                            </td>
                                            <td class="w-1">
                                                <h4 class="text-center text-md-start">Estrategias</h4>
                                            </td>
                                            <td class="">
                                                <h3 class="">Nivel 3</h3>
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
            <div class="tab-pane fade active" id="pills-recomendaciones" role="tabpanel" aria-labelledby="pills-recomendaciones-tab" tabindex="0">
                <!-- Inicio Cajas -->
                <div>
                    <h3 class="titulo-tabsinterior">Recomendaciones</h3>
                </div>
                <div class="card mt-3 mb-2 d-flex ">   
                    <div class="table-responsive pie-table">
                        <table class="table table-hover table-recomendaciones">
                            <thead>
                                <tr>
                                    <th scope="col">Capacidad</th>
                                    <th scope="col">Area / Subarea</th>
                                    <th scope="col">Recomendación</th>
                                    <th scope="col">Importancia para la empresa</th>
                                    <th scope="col">Evaluacion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Directrices</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Estrategia / Estrategia a Corto plazo</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Recomendación 1</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Muy Importante</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Desarrollada</h4>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Planificación</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Estrategia / Estrategia a Corto plazo</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Recomendación 1</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Importante</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Desarrollada</h4>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Análisis de Información</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Estrategia / Estrategia a Corto plazo</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Recomendación 1</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Muy Importante</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Capaciad Inexistente</h4>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Monitoreo y objetivos</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Estrategia / Estrategia a Corto plazo</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Recomendación 1</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Irrelevante</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="me-md-3">
                                            <h4 class="text-center text-md-start">Poco Desarrollada</h4>
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
            "evaluacionId":  state.idEvaluacion, //FALTA CUANDO SE ENVIE EVALUACION DISTINTA
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

    const getRecomendacionArea = () => {  //VERIFICAr como OBTENER PUNTUADCION DE AREAS
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
      //exportToPDF,
      horizonalLinePlugin,
    };
  },
};
</script>
