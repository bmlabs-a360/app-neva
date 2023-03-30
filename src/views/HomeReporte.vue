<template>
    <!--Contenido-->
    <div class="row view-wrapper" id="document_container" v-if="!pdfBool">
        <!--Inicia Tabs-->
        <div class="col-12 mt-3 mt-sm-0 mt-lg-5 flex-column flex-sm-row justify-content-between align-items-center">
            <ul class="nav nav-pills mb-2 mb-sm-0" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button @click="resumenSelected()" class="nav-link active" id="pills-resumen-tab" data-bs-toggle="pill" data-bs-target="#pills-resumen" type="button" role="tab" aria-controls="pills-resumen" aria-selected="true">Resumen</button>
                </li>
                <li class="nav-item" role="presentation" v-for="ima in IMA" :value="ima.segmentacionAreaId" :key="ima.segmentacionAreaId">
                    <div v-if="ima.activaArea">
                        <button @click="areaSelected(ima)" name="areas-pills-tab" class="nav-link" :id="'pill-'+ ima.segmentacionAreaId + '-tab'" data-bs-toggle="pill" data-bs-target="#pills-estrategias" type="button" role="tab" aria-controls="pills-estrategias" aria-selected="false">{{ima.nombreArea}}</button>
                    </div>
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
                            <button class="btn btn-primary" @click="exportToPDF ; pdfBool = !pdfBool;">ir a Descargar</button>
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
                                <div class="w-100 p-2">
                                    <CChart type="bar"
                                            :data="resumenImportanciaRelativa"
                                            height="285"
                                            width="200"
                                            :options="{ maintainAspectRatio: false, plugins: { legend: { display: false } } }" />
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
                                            plugins: { legend: { display: false } } }" />
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
                                            <tr :v-if="AreasMaduras.length >0" v-for="areaMadura in AreasMaduras" :value="areaMadura.id" :key="areaMadura.id">
                                                <td scope="row">
                                                    <div class="min-w pt-5">
                                                        <CChart type="doughnut" :data="areaMadura.nivelMadurezAreas"
                                                                :options="{circumference: 180,rotation: -90,plugins: { title: { display: true,
                                                         text:(areaMadura.cumplimiento).toString()+'%',
                                                        position: 'bottom' } }}" />
                                                    </div>
                                                </td>
                                                <td class="w-1">
                                                    <h4 class="text-center text-md-start">{{areaMadura.nombreArea}}</h4>
                                                </td>
                                                <td class="">
                                                    <h3 class="">Nivel {{parseFloat(areaMadura.imaValor).toFixed(0)}}</h3>
                                                </td>
                                            </tr>
                                            <tr v-if="AreasMaduras.length ==0">
                                                <td><h4>No existe información para mostrar</h4></td>
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
                                            <tr :v-if="AreasMejorar.length >0" v-for="areaMejorar in AreasMejorar" :value="areaMejorar.id" :key="areaMejorar.id">
                                                <td scope="row">
                                                    <div class="min-w pt-5">
                                                        <CChart type="doughnut" :data="areaMejorar.nivelMadurezAreas"
                                                                :options="{circumference: 180,rotation: -90,plugins: { title: { display: true,
                                                           text:(areaMejorar.cumplimiento).toString()+'%',
                                                         position: 'bottom' } }}" />
                                                    </div>
                                                </td>
                                                <td class="w-1">
                                                    <h4 class="text-center text-md-start">{{areaMejorar.nombreArea}}</h4>
                                                </td>

                                                <td class="">
                                                    <h3 class="">Nivel {{parseFloat(areaMejorar.imaValor).toFixed(0)}}</h3>
                                                </td>
                                            </tr>
                                            <tr v-if="AreasMejorar.length ==0">
                                                <td><h4>No existe información para mostrar</h4></td>
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
                                <button class="btn circle-red order-md-2">
                                    <p style=" color: rgb(155 155 155); ">{{ima.brecha}}%</p>
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
                                    <CChart type="doughnut" :data="ima.nivelMadurezAreas" height="50" width="100"
                                            :options="{ maintainAspectRatio: false,circumference: 180,rotation: -90, plugins: { title: { display: true,
                                    text:(ima.cumplimiento)+'%',font :{size:20},
                                    position: 'bottom' } } }" />
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
                                        height="60"
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
                                        labels="resumenCapacidad" />
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
                                    <tr :v-if="top3capacidadesByarea.length >0" v-for="top3capacidadByarea in top3capacidadesByarea" :value="top3capacidadByarea.segmentacionAreaId" :key="top3capacidadByarea.segmentacionAreaId">
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">{{top3capacidadByarea.preguntaCapacidad}}</h4>
                                        </td>
                                        <td class="">
                                            <h4 class="">Nivel {{parseFloat(top3capacidadByarea.imsaValor).toFixed(0)}}</h4>
                                        </td>
                                    </tr>
                                    <tr v-if="top3capacidadesByarea.length ==0">
                                        <td><h4>No existe información para mostrar</h4></td>
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
                                    <tr :v-if="top3peoresCapacidadesByarea.length >0" v-for="top3PeorCapacidadByArea in top3peoresCapacidadesByarea" :value="top3PeorCapacidadByArea.segmentacionAreaId" :key="top3PeorCapacidadByArea.segmentacionAreaId">
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">{{top3PeorCapacidadByArea.preguntaCapacidad}}</h4>
                                        </td>
                                        <td class="">
                                            <h4 class="">Nivel {{parseFloat(top3PeorCapacidadByArea.imsaValor).toFixed(0)}}</h4>
                                        </td>
                                    </tr>
                                    <tr v-if="top3peoresCapacidadesByarea.length ==0">
                                        <td><h4>No existe información para mostrar</h4></td>
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
                                        <tr :v-if="SubAreasMaduras.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length>0" v-for="SubAreaMadura in SubAreasMaduras" :value="SubAreaMadura.id" :key="SubAreaMadura.id">
                                            <td scope="row" v-if="SubAreaMadura.segmentacionAreaId === ima.segmentacionAreaId">
                                                <div class="min-w pt-5">
                                                    <CChart type="doughnut" :data="SubAreaMadura.nivelMadurezSubAreas"
                                                            :options="{circumference: 180,rotation: -90,plugins: { title: { display: true,
                                                         text:(SubAreaMadura.cumplimiento).toString()+'%',
                                                        position: 'bottom' } }}" />
                                                </div>
                                            </td>
                                            <td class="w-1" v-if="SubAreaMadura.segmentacionAreaId === ima.segmentacionAreaId">
                                                <h4 class="text-center text-md-start">{{SubAreaMadura.nombreSubArea}}</h4>
                                            </td>
                                            <td class="" v-if="SubAreaMadura.segmentacionAreaId === ima.segmentacionAreaId">
                                                <h3 class="">Nivel {{parseFloat(SubAreaMadura.imsaValor).toFixed(0)}}</h3>
                                            </td>
                                        </tr>
                                        <tr v-if="SubAreasMaduras.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length==0">
                                            <td><h4>No existe información para mostrar</h4></td>
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
                                        <tr :v-if="SubAreasMejorar.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length>0" v-for="SubAreaMejorar in SubAreasMejorar.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId)" :value="SubAreaMejorar.id" :key="SubAreaMejorar.id">
                                            <td scope="row" v-if="SubAreaMejorar.segmentacionAreaId === ima.segmentacionAreaId">
                                                <div class="min-w pt-5">
                                                    <CChart type="doughnut" :data="SubAreaMejorar.nivelMadurezSubAreas"
                                                            :options="{circumference: 180,rotation: -90,plugins: { title: { display: true,
                                                         text:(SubAreaMejorar.cumplimiento).toString()+'%',
                                                        position: 'bottom' } }}" />
                                                </div>
                                            </td>
                                            <td class="w-1" v-if="SubAreaMejorar.segmentacionAreaId === ima.segmentacionAreaId">
                                                <h4 class="text-center text-md-start">{{SubAreaMejorar.nombreSubArea}}</h4>
                                            </td>
                                            <td class="" v-if="SubAreaMejorar.segmentacionAreaId === ima.segmentacionAreaId">
                                                <h3 class="">Nivel {{parseFloat(SubAreaMejorar.imsaValor).toFixed(0)}}</h3>
                                            </td>
                                        </tr>
                                        <tr v-if="SubAreasMejorar.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length ==0">
                                            <td><h4>No existe información para mostrar</h4></td>
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
    <!--Contenido-->
    <!--<body class="btn" id="element-to-print">-->
    <div id="document_pdf" v-if="pdfBool">

        <div class="seccion1 p-1 d-flex justify-center">
            <button class="btn btn-primary" @click="downloadPDF">Descargar</button>
        </div>
        <div class="html2pdf__page-break"></div>
        <div id="download_pdf">
            <div class="body-presentacion align-center ">
                <div class="contenedor py-3">
                    <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ5IiBoZWlnaHQ9IjUyIiB2aWV3Qm94PSIwIDAgMTQ5IDUyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMzUzXzU1NDApIj4KPHBhdGggZD0iTTM4LjI4NTggMEg0Ni45MDQ1VjUxLjA2ODVIMzcuNTU1NEw4LjYyMjE3IDEzLjgwNzJWNTEuMDY4NUgwVjBIOC42MjIxN0wzOC4yODU4IDM4LjEzNjlWMFoiIGZpbGw9IiMyMjM2M0UiLz4KPHBhdGggZD0iTTc0LjM4MzkgMFY4LjEwOTlINDcuMTI5NFYyMS42MjY0SDcxLjYwNzlWMjkuMjk2N0g0Ny4xMjk0VjQyLjk1ODZINzUuMjU5NlY1MS4wNjg1SDM4LjUxMDdWMEg3NC4zODM5WiIgZmlsbD0iIzIyMzYzRSIvPgo8cGF0aCBkPSJNOTEuMzQ0NCA1MS4wNjg1TDcwLjgxNTMgMEg4MC40NTg2TDk2LjM4NzYgMzguNjc2OUw5MS4zNDQ0IDUxLjA3MTlWNTEuMDY4NVoiIGZpbGw9IiMyMjM2M0UiLz4KPHBhdGggZD0iTTExMS45MzYgMEgxMjEuNTc5TDE0Mi4xMDggNTEuMDY4NUgxMzIuNDY1TDExNi43NTcgMTIuOTMxNUwxMDEuMDUgNTEuMDY4NUg5MS40MDY3TDExMS45MzYgMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMzIuNjEgMy42NTg1MkMxMzIuOTA1IDMuMjAxNjMgMTMzLjE5MiAyLjc0ODE5IDEzMy40NzkgMi4zMDE2OEMxMzMuNzY2IDEuODU1MTcgMTM0LjA1IDEuNDA1MiAxMzQuMzM4IDAuOTU1MjI1SDEzMS45ODdWMC4yOTA2NDlIMTM1LjQ4N0MxMzUuMTk5IDAuNzI2Nzc3IDEzNC45MTYgMS4xNjI5IDEzNC42MzUgMS41OTU1N0MxMzQuMzUxIDIuMDI4MjQgMTM0LjA2NCAyLjQ2MDkgMTMzLjc3IDIuODkwMTFDMTM0LjAyNiAyLjk0ODk1IDEzNC4yNjggMy4wMzg5NSAxMzQuNDkzIDMuMTcwNDhDMTM0LjcxOCAzLjI5ODU1IDEzNC45MTIgMy40NTc3NyAxMzUuMDc4IDMuNjQ4MTRDMTM1LjI0MSAzLjgzODUxIDEzNS4zNzMgNC4wNTMxMiAxMzUuNDY2IDQuMjkxOTVDMTM1LjU1OSA0LjUzMDc4IDEzNS42MDQgNC43OTAzOCAxMzUuNjA0IDUuMDcwNzVDMTM1LjYwNCA1LjM4NTczIDEzNS41NDIgNS42Nzk5NCAxMzUuNDIxIDUuOTU2ODVDMTM1LjMgNi4yMzM3NSAxMzUuMTM0IDYuNDcyNTkgMTM0LjkyNiA2LjY4MDI3QzEzNC43MTggNi44ODc5NSAxMzQuNDc2IDcuMDUwNjMgMTM0LjE5NiA3LjE3NTI0QzEzMy45MTUgNy4yOTYzOCAxMzMuNjIxIDcuMzU4NjkgMTMzLjMwNiA3LjM1ODY5QzEzMi45NyA3LjM1ODY5IDEzMi42NTUgNy4yOTI5MiAxMzIuMzY4IDcuMTYxMzlDMTMyLjA3NyA3LjAyOTg2IDEzMS44MjggNi44NDk4NyAxMzEuNjIgNi42MTc5NkMxMzEuNyA2LjUzODM1IDEzMS43OCA2LjQ2MjIgMTMxLjg2NiA2LjM4MjU5QzEzMS45NTMgNi4zMDI5OCAxMzIuMDM2IDYuMjI2ODMgMTMyLjExMiA2LjE0NzIyQzEzMi4yNTQgNi4zMTMzNiAxMzIuNDI3IDYuNDQ0OSAxMzIuNjI4IDYuNTQ4NzRDMTMyLjgyOCA2LjY1MjU4IDEzMy4wNSA2LjcwNDQ5IDEzMy4yOTIgNi43MDQ0OUMxMzMuNTE0IDYuNzA0NDkgMTMzLjcyNSA2LjY2Mjk2IDEzMy45MjYgNi41NzY0M0MxMzQuMTI2IDYuNDg5ODkgMTM0LjMgNi4zNzIyMSAxMzQuNDUyIDYuMjIzMzdDMTM0LjYwMSA2LjA3NDUzIDEzNC43MTggNS45MDE0NyAxMzQuODA1IDUuNzA0MTdDMTM0Ljg5MSA1LjUwNjg3IDEzNC45MzMgNS4yOTkxOSAxMzQuOTMzIDUuMDc3NjdDMTM0LjkzMyA0Ljg1NjE0IDEzNC44OTEgNC42NDg0NiAxMzQuODA1IDQuNDUxMTdDMTM0LjcxOCA0LjI1Mzg3IDEzNC42MDEgNC4wODQyNyAxMzQuNDUyIDMuOTQyMzVDMTM0LjMwMyAzLjgwMDQ0IDEzNC4xMjYgMy42ODYyMSAxMzMuOTI2IDMuNTk5NjhDMTMzLjcyNSAzLjUxMzE1IDEzMy41MTQgMy40NzE2MSAxMzMuMjkyIDMuNDcxNjFDMTMzLjA1IDMuNDcxNjEgMTMyLjgyMiAzLjU0MDg0IDEzMi42MDcgMy42NzU4M0wxMzIuNjEgMy42NTg1MloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMzYuOTM0IDUuMTYwODNDMTM2LjkzNCA0LjY0NTA5IDEzNy4wNDQgNC4xNjM5NyAxMzcuMjYyIDMuNzE3NDVDMTM3LjQ4IDMuMjcwOTQgMTM3Ljc2MSAyLjg1MjEyIDEzOC4xMDQgMi40Njc5MUMxMzguNDQ2IDIuMDgwMjUgMTM4LjgzIDEuNzIwMjcgMTM5LjI1MyAxLjM4NDUyQzEzOS42NzUgMS4wNDg3NyAxNDAuMDg3IDAuNzMzNzg4IDE0MC40ODggMC40Mzk1NzVDMTQwLjU2MSAwLjUyNjEwOCAxNDAuNjMgMC42MTI2NDIgMTQwLjY5NiAwLjcwMjYzNkMxNDAuNzY1IDAuNzkyNjMxIDE0MC44MzUgMC44NzkxNjQgMTQwLjkwNCAwLjk2NTY5N0MxNDAuMjk1IDEuMzc0MTMgMTM5LjggMS43NTgzNCAxMzkuNDE5IDIuMTE4MzJDMTM5LjAzOCAyLjQ3ODMgMTM4Ljc0IDIuODAwMiAxMzguNTMzIDMuMDc3MTFDMTM4LjYxOSAyLjk5NzUgMTM4LjcyIDIuOTM1MTkgMTM4LjgzNyAyLjg4MzI3QzEzOC45NTUgMi44MzQ4MiAxMzkuMDgzIDIuODA3MTIgMTM5LjIxOCAyLjgwNzEyQzEzOS41MzMgMi44MDcxMiAxMzkuODMxIDIuODY1OTcgMTQwLjEwOCAyLjk4MzY1QzE0MC4zODggMy4xMDEzNCAxNDAuNjMgMy4yNjQwMiAxNDAuODM4IDMuNDY4MjRDMTQxLjA0NiAzLjY3MjQ2IDE0MS4yMDggMy45MTEyOSAxNDEuMzMzIDQuMTg4MkMxNDEuNDU0IDQuNDY1MSAxNDEuNTE2IDQuNzU5MzIgMTQxLjUxNiA1LjA3NDNDMTQxLjUxNiA1LjM4OTI4IDE0MS40NTQgNS42ODM0OSAxNDEuMzMzIDUuOTYwNEMxNDEuMjEyIDYuMjM3MyAxNDEuMDQ2IDYuNDc2MTMgMTQwLjgzOCA2LjY4MDM1QzE0MC42MyA2Ljg4NDU3IDE0MC4zODggNy4wNDcyNSAxNDAuMTA4IDcuMTY4NEMxMzkuODI3IDcuMjg5NTUgMTM5LjUzMyA3LjM1MTg1IDEzOS4yMTggNy4zNTE4NUMxMzguOTAzIDcuMzUxODUgMTM4LjYxOSA3LjI5MzAxIDEzOC4zNDIgNy4xNzg3OEMxMzguMDY1IDcuMDY0NTYgMTM3LjgyNyA2LjkwODggMTM3LjYyMiA2LjcxMTUxQzEzNy40MTggNi41MTQyMSAxMzcuMjU1IDYuMjgyMyAxMzcuMTI3IDYuMDE1NzhDMTM3LjAwMyA1Ljc0NTc5IDEzNi45MzcgNS40NjE5NyAxMzYuOTMgNS4xNjQyOUwxMzYuOTM0IDUuMTYwODNaTTEzNy42MTkgNS4wNzQzQzEzNy42MTkgNS4yOTU4MiAxMzcuNjYgNS41MDY5NiAxMzcuNzQ0IDUuNzAwOEMxMzcuODI3IDUuODk4MDkgMTM3LjkzNyA2LjA2NzcgMTM4LjA4MyA2LjIxNjU0QzEzOC4yMjUgNi4zNjE5MSAxMzguMzk0IDYuNDc5NiAxMzguNTg4IDYuNTY2MTNDMTM4Ljc4MiA2LjY1MjY2IDEzOC45OSA2LjY5NDIgMTM5LjIxMSA2LjY5NDJDMTM5LjQzMyA2LjY5NDIgMTM5LjY0NCA2LjY1MjY2IDEzOS44NDUgNi41NjYxM0MxNDAuMDQ1IDYuNDc5NiAxNDAuMjE4IDYuMzY1MzcgMTQwLjM3MSA2LjIxNjU0QzE0MC41MiA2LjA3MTE2IDE0MC42MzcgNS44OTgwOSAxNDAuNzI0IDUuNzAwOEMxNDAuODEgNS41MDM1IDE0MC44NTIgNS4yOTU4MiAxNDAuODUyIDUuMDc0M0MxNDAuODUyIDQuODUyNzcgMTQwLjgxIDQuNjQ1MDkgMTQwLjcyNCA0LjQ0NzhDMTQwLjYzNyA0LjI1MDUgMTQwLjUyIDQuMDgwODkgMTQwLjM3MSAzLjkzODk4QzE0MC4yMjIgMy43OTcwNyAxNDAuMDQ1IDMuNjgyODQgMTM5Ljg0NSAzLjU5NjMxQzEzOS42NDQgMy41MDk3OCAxMzkuNDMzIDMuNDY4MjQgMTM5LjIxMSAzLjQ2ODI0QzEzOC45OSAzLjQ2ODI0IDEzOC43ODIgMy41MDk3OCAxMzguNTg4IDMuNTk2MzFDMTM4LjM5NCAzLjY4Mjg0IDEzOC4yMjggMy43OTcwNyAxMzguMDgzIDMuOTM4OThDMTM3Ljk0MSA0LjA4MDg5IDEzNy44MjcgNC4yNTA1IDEzNy43NDQgNC40NDc4QzEzNy42NiA0LjY0NTA5IDEzNy42MTkgNC44NTI3NyAxMzcuNjE5IDUuMDc0M1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNDIuMzg1IDMuNzU1NTVDMTQyLjM4NSAzLjI3MDk2IDE0Mi40NTQgMi44MTA2MSAxNDIuNTg5IDIuMzc3OTRDMTQyLjcyNCAxLjk0NTI3IDE0Mi45MjIgMS41Njc5OSAxNDMuMTc0IDEuMjQ2MDhDMTQzLjQyNyAwLjkyNDE4IDE0My43MzIgMC42NzE1MDMgMTQ0LjA4NSAwLjQ4NDU5MUMxNDQuNDM4IDAuMjk3NjggMTQ0LjgzNiAwLjIwNDIyNCAxNDUuMjgyIDAuMjA0MjI0QzE0NS43MjkgMC4yMDQyMjQgMTQ2LjEyMyAwLjMwMTE0MSAxNDYuNDggMC40OTQ5NzVDMTQ2LjgzMyAwLjY4ODgxIDE0Ny4xMzQgMC45NDg0MSAxNDcuMzggMS4yNzcyNEMxNDcuNjI2IDEuNjA2MDYgMTQ3LjgxNiAxLjk4NjgxIDE0Ny45NDQgMi40MTk0OEMxNDguMDcyIDIuODUyMTQgMTQ4LjEzOCAzLjMxMjUgMTQ4LjEzOCAzLjc5NzA4QzE0OC4xMzggNC4zMjY2NyAxNDguMDU1IDQuODA3NzkgMTQ3Ljg5MiA1LjI0NzM4QzE0Ny43MjYgNS42ODM1MSAxNDcuNTExIDYuMDU3MzMgMTQ3LjI0MSA2LjM2ODg1QzE0Ni45NzEgNi42ODAzNyAxNDYuNjYzIDYuOTIyNjcgMTQ2LjMxNCA3LjA5MjI3QzE0NS45NjQgNy4yNjUzNCAxNDUuNjAxIDcuMzQ4NDEgMTQ1LjIzIDcuMzQ4NDFDMTQ0Ljg2IDcuMzQ4NDEgMTQ0LjUgNy4yNTg0MSAxNDQuMTU3IDcuMDgxODlDMTQzLjgxNSA2LjkwNTM2IDE0My41MSA2LjY1NjE0IDE0My4yNDcgNi4zNDExNkMxNDIuOTg0IDYuMDI2MTggMTQyLjc3MyA1LjY0ODkgMTQyLjYyMSA1LjIwOTMxQzE0Mi40NjggNC43Njk3MiAxNDIuMzg5IDQuMjg1MTMgMTQyLjM4OSAzLjc1NTU1SDE0Mi4zODVaTTE0My4wNiAzLjc1NTU1QzE0My4wNiA0LjE3NzgzIDE0My4xMTkgNC41Njg5NiAxNDMuMjMzIDQuOTI1NDhDMTQzLjM0NyA1LjI4MiAxNDMuNTA3IDUuNTkzNTIgMTQzLjcwNCA1Ljg1MzEyQzE0My45MDUgNi4xMTI3MSAxNDQuMTM3IDYuMzIwMzkgMTQ0LjQgNi40NjkyM0MxNDQuNjYzIDYuNjE4MDcgMTQ0Ljk0MyA2LjY5NDIyIDE0NS4yMzcgNi42OTQyMkMxNDUuNTMyIDYuNjk0MjIgMTQ1LjgwMiA2LjYyMTUzIDE0Ni4wNjggNi40Nzk2MkMxNDYuMzM1IDYuMzM3NyAxNDYuNTczIDYuMTM2OTQgMTQ2Ljc3OCA1Ljg3NzM0QzE0Ni45ODIgNS42MTc3NCAxNDcuMTQ1IDUuMzEzMTUgMTQ3LjI3MyA0Ljk1MzE3QzE0Ny4zOTcgNC41OTY2NSAxNDcuNDU5IDQuMjA1NTIgMTQ3LjQ1OSAzLjc4MzI0QzE0Ny40NTkgMy40NDc0OSAxNDcuNDE4IDMuMTA0ODIgMTQ3LjMzMSAyLjc1ODY5QzE0Ny4yNDUgMi40MTI1NSAxNDcuMTEgMi4wOTc1NyAxNDYuOTMgMS44MTM3NEMxNDYuNzUgMS41Mjk5MSAxNDYuNTIxIDEuMzAxNDcgMTQ2LjI0OCAxLjEyMTQ4QzE0NS45NzUgMC45NDE0ODcgMTQ1LjY1NiAwLjg1NDk1NCAxNDUuMjgyIDAuODU0OTU0QzE0NC45MDggMC44NTQ5NTQgMTQ0LjU4NyAwLjk0MTQ4NyAxNDQuMzA2IDEuMTExMDlDMTQ0LjAyNiAxLjI4NDE2IDE0My43OTcgMS41MDkxNSAxNDMuNjE0IDEuNzg2MDVDMTQzLjQzMSAyLjA2NjQyIDE0My4yOTYgMi4zNzc5NCAxNDMuMjAyIDIuNzI0MDdDMTQzLjEwOSAzLjA3MDIxIDE0My4wNjQgMy40MTI4OCAxNDMuMDY0IDMuNzQ4NjNMMTQzLjA2IDMuNzU1NTVaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzM1M181NTQwIj4KPHJlY3Qgd2lkdGg9IjE0OC4xMzgiIGhlaWdodD0iNTEuMDcxOSIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" class="logo-presentacion">
                    <h2 class="title-presentacion">2023</h2>
                    <h3 class="subtitle-presentacion">INFORME DE MADUREZ</h3>
                    <h3 class="subtitle-presentacion">A360º</h3>

                </div>
            </div>
            <div class="html2pdf__page-break"></div>

            <div class="seccion1 p-1 d-flex justify-center">
                <div style="width: 46%;">
                    <table class="table1" style="width:90%">
                        <tr>
                            <th colspan="3" style="text-align: initial;" class="titulotable">Areas Maduras </th>
                        </tr>
                        <div class="w-100 table-responsive pie-table">
                            <table class="table-res table-hover">
                                <tbody>
                                    <tr v-if="AreasMaduras.length >0" v-for="areaMadura in AreasMaduras" :value="areaMadura.id" :key="areaMadura.id">
                                        <td scope="row">
                                            <div class="min-w pt-5">
                                                <CChart type="doughnut" :data="areaMadura.nivelMadurezAreas"
                                                        :options="{circumference: 180,rotation: -90,plugins: { title: { display: true,
                                                         text:(areaMadura.cumplimiento).toString()+'%',
                                                        position: 'bottom' } }}" />
                                            </div>
                                        </td>
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">{{areaMadura.nombreArea}}</h4>
                                        </td>
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">Nivel {{parseFloat(areaMadura.imaValor).toFixed(0)}}</h4>
                                        </td>
                                    </tr>
                                    <tr v-if="AreasMaduras.length ==0">
                                        <td><h4>No existe información para mostrar</h4></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </table>
                </div>
                <div style="width: 40%;">
                    <table class="table1" style="width:100%">
                        <tr>
                            <th colspan="3" style="text-align: initial;" class="titulotable">Areas a mejorar </th>

                        </tr>
                        <div class="w-100 table-responsive pie-table">
                            <table class="table-res table-hover">
                                <tbody>
                                    <tr v-if="AreasMejorar.length >0" v-for="areaMejorar in AreasMejorar" :value="areaMejorar.id" :key="areaMejorar.id">
                                        <td scope="row">
                                            <div class="min-w pt-5">
                                                <CChart type="doughnut" :data="areaMejorar.nivelMadurezAreas"
                                                        :options="{circumference: 180,rotation: -90,plugins: { title: { display: true,
                                                           text:(areaMejorar.cumplimiento).toString()+'%',
                                                         position: 'bottom' } }}" />
                                            </div>
                                        </td>
                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">{{areaMejorar.nombreArea}}</h4>
                                        </td>

                                        <td class="w-1">
                                            <h4 class="text-center text-md-start">Nivel {{parseFloat(areaMejorar.imaValor).toFixed(0)}}</h4>
                                        </td>
                                    </tr>
                                    <tr v-if="AreasMejorar.length ==0">
                                        <td><h4>No existe información para mostrar</h4></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </table>
                </div>
            </div>

            <div class="html2pdf__page-break"></div>

            <div class="cards-grafictabsresult pt-4">

                <div style="width: 100%;" class="px-2">
                    <div class="graficatablas" style="width: 55%;">
                        <CChart type="radar"
                                :data="resumenPuntuacionArea"
                                height="300"
                                width="300"
                                :options=" {  responsive: true,  maintainAspectRatio: false,  scales: { r: { max: 100, min: 0, ticks: { stepSize: 10 } } },
                                            plugins: { legend: { display: false } } }" />
                    </div>
                </div>

                <div class="bodycard" style="width:100%;">
                    <h2>Puntuación entre las áreas</h2>
                    <p>Valor porcentual de cada área, en comparación con las otras, dentro de la organización. Ayuda a visualizar que área está mejor evaluada y cuales tienen una evaluación menor. Entendiendo como 100% la mejor evaluación posible</p>
                </div>
            </div>

            <div class="html2pdf__page-break"></div>

            <!--Madurez General-->
            <div class="contenedor">
                <div class="d-flex w-100 justify-around align-center">
                    <div class="title-madurez">
                        <h2>Madurez General</h2>
                    </div>
                    <div class="tipoempresa">
                        <div class="tipoempresa">
                            <div><img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNiA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI1LjY2MjEiIGhlaWdodD0iNDAuOTI3NyIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEwLjQyNDQgMTUuNjk3OUMxMC40MjQ0IDE1LjM1NiAxMC40MjMzIDE1LjAzNzggMTAuNDI0NCAxNC43MjAyQzEwLjQyNTQgMTQuNDUwNyAxMC41NDg1IDE0LjMyMjggMTAuODE3IDE0LjMyMjNDMTIuNjE3IDE0LjMyMTIgMTIuOTg5NiAxNC4zMjEyIDE0Ljc4OTUgMTQuMzIyM0MxNS4wNTg1IDE0LjMyMjMgMTUuMTgyNyAxNC40NDk2IDE1LjE4MzggMTQuNzE4MUMxNS4xODQ4IDE1LjAzOTQgMTUuMTgzOCAxNS4zNjAyIDE1LjE4MzggMTUuNjk3NEMxNS40Njk3IDE1LjY5NzQgMTUuNzQxMyAxNS42OTc0IDE2LjAxMzUgMTUuNjk3NEMxNi4wODk2IDE1LjY5NzQgMTYuMTY1NyAxNS42OTQ3IDE2LjI0MTggMTUuN0MxNi40MTUxIDE1LjcxMTYgMTYuNTM5OCAxNS44MzUzIDE2LjU1NTcgMTYuMDA5MkMxNi41NjE1IDE2LjA3MTUgMTYuNTU5OSAxNi4xMzQ0IDE2LjU1OTkgMTYuMTk2OEMxNi41NTk5IDE5LjI5MDQgMTYuNTU5OSAyMC45NTcyIDE2LjU1OTkgMjQuMDUwOVYyNC4yNDIyQzE2LjY0NDUgMjQuMjQyMiAxNi43MTkgMjQuMjQyMiAxNi43OTMgMjQuMjQyMkMxNy4xNjAzIDI0LjI0MjIgMTYuOTk4NSAyNC4yNDEyIDE3LjM2NTggMjQuMjQyMkMxNy41OTczIDI0LjI0MzMgMTcuNzQ3NCAyNC4zNzggMTcuNzQ5IDI0LjU4MjZDMTcuNzUwNiAyNC43ODg3IDE3LjYwNjMgMjQuOTIyOSAxNy4zNzIyIDI0LjkzMTRDMTcuMzQxIDI0LjkzMjQgMTcuMzA5MyAyNC45MzE0IDE3LjI3ODEgMjQuOTMxNEMxMy40Njg0IDI0LjkzMTQgMTIuMTk0NyAyNC45MzE0IDguMzg0OTkgMjQuOTMxNEM4LjMzMTYxIDI0LjkzMTQgOC4yNzcxOCAyNC45MzI0IDguMjI0MzMgMjQuOTI1NUM4LjAyMzUxIDI0LjkwMDIgNy45MDA5MSAyNC43NTI3IDcuOTE0MTIgMjQuNTU3N0M3LjkyNjI3IDI0LjM3NjUgOC4wNjg0MyAyNC4yNDQ5IDguMjY3MTQgMjQuMjQzM0M4LjY1MjM5IDI0LjI0MDEgOC40NTU4IDI0LjI0MjIgOC44NDEwNiAyNC4yNDIyQzguOTAzNDIgMjQuMjQyMiA4Ljk2NTc4IDI0LjI0MjIgOS4wNDkyNyAyNC4yNDIyVjI0LjA2NjJDOS4wNDkyNyAyMC45NzI2IDkuMDQ5MjcgMTkuMzA1OCA5LjA0OTI3IDE2LjIxMjFDOS4wNDkyNyAxNi4xNjMgOS4wNDgyMiAxNi4xMTM4IDkuMDQ5OCAxNi4wNjQxQzkuMDU3MiAxNS44MjkgOS4xODU2MiAxNS42OTk1IDkuNDE5MjEgMTUuNjk3NEM5LjcwMTQxIDE1LjY5NDcgOS45ODMwOCAxNS42OTY4IDEwLjI2NTMgMTUuNjk2OEMxMC4zMTM0IDE1LjY5NjggMTAuMzYxNSAxNS42OTY4IDEwLjQyNDkgMTUuNjk2OEwxMC40MjQ0IDE1LjY5NzlaTTkuNzQyNjMgMTYuMzg4NlYyNC4yMzIySDExLjEwODJDMTEuMTA4MiAyNC4xNjgyIDExLjEwODIgMjQuMTE0MyAxMS4xMDgyIDI0LjA2MUMxMS4xMDgyIDIzLjM1MzkgMTEuMTA4MiAyMi42NDYyIDExLjEwODIgMjEuOTM5MUMxMS4xMDgyIDIxLjYwOTkgMTEuMjIzOSAyMS40OTM2IDExLjU1MTEgMjEuNDkzNkMxMi44NTg1IDIxLjQ5MzYgMTIuNzM4NSAyMS40OTM2IDE0LjA0NiAyMS40OTM2QzE0LjM4OTUgMjEuNDkzNiAxNC40OTk0IDIxLjYwNTcgMTQuNDk5NCAyMS45NTU1QzE0LjQ5OTQgMjIuNjYyNiAxNC40OTk0IDIzLjM3MDMgMTQuNDk5NCAyNC4wNzczQzE0LjQ5OTQgMjQuMTI5MSAxNC40OTk0IDI0LjE4MDkgMTQuNDk5NCAyNC4yMzM4SDE1Ljg2NDRWMTYuMzg4Nkg5Ljc0MjYzWk0xMS4xMTUxIDE1LjY4NzNIMTQuNDg4OFYxNS4wMTYySDExLjExNTFWMTUuNjg3M1pNMTEuODA2OCAyMi4xODQ0VjI0LjIzMzhIMTIuNDc2OVYyMi4xODQ0SDExLjgwNjhaTTEzLjE4MTkgMjQuMjMyN0gxMy44MDE4VjIyLjE4NTlIMTMuMTgxOVYyNC4yMzI3WiIgZmlsbD0iIzI4MzI1MiIvPgo8cGF0aCBkPSJNMTQuMTUwNiAxNy43MTA4QzE0LjM3NDcgMTcuNzEwOCAxNC41OTgyIDE3LjcwODcgMTQuODIyMyAxNy43MTE0QzE1LjAzNDIgMTcuNzE0IDE1LjE4MDEgMTcuODUxNCAxNS4xODMyIDE4LjA0NTRDMTUuMTg2NCAxOC4yNDc4IDE1LjA0NDMgMTguMzkxIDE0LjgyMzQgMTguMzkzMUMxNC4zOCAxOC4zOTczIDEzLjkzNzEgMTguMzk2OCAxMy40OTM3IDE4LjM5MzFDMTMuMjcyMyAxOC4zOTE1IDEzLjEyNDMgMTguMjQ5OSAxMy4xMjM4IDE4LjA1MjJDMTMuMTIzOCAxNy44NTA0IDEzLjI3NjUgMTcuNzEyNCAxMy41MDY0IDE3LjcxMDhDMTMuNzIxNSAxNy43MDkzIDEzLjkzNjEgMTcuNzEwOCAxNC4xNTExIDE3LjcxMDhIMTQuMTUwNloiIGZpbGw9IiMyODMyNTIiLz4KPHBhdGggZD0iTTE0LjE1NDMgMTkuNDMwNUMxNC4zNzg0IDE5LjQzMDUgMTQuNjAxOSAxOS40Mjg0IDE0LjgyNiAxOS40MzFDMTUuMDM2MyAxOS40MzM3IDE1LjE4MTcgMTkuNTc0MiAxNS4xODI3IDE5Ljc2ODdDMTUuMTg0MyAxOS45NjUzIDE1LjA0NDMgMjAuMTA5NiAxNC44MzE4IDIwLjExMTdDMTQuMzggMjAuMTE2NCAxMy45Mjc2IDIwLjExNjQgMTMuNDc1OCAyMC4xMTE3QzEzLjI2NiAyMC4xMDk2IDEzLjEyMTIgMTkuOTYwNSAxMy4xMjMzIDE5Ljc2ODJDMTMuMTI1NCAxOS41NzUzIDEzLjI3MzQgMTkuNDM2MyAxMy40ODMyIDE5LjQzMDVDMTMuNDkyMSAxOS40MzA1IDEzLjUwMTEgMTkuNDMwNSAxMy41MTAxIDE5LjQzMDVDMTMuNzI1MiAxOS40MzA1IDEzLjkzOTggMTkuNDMwNSAxNC4xNTQ4IDE5LjQzMDVIMTQuMTU0M1oiIGZpbGw9IiMyODMyNTIiLz4KPHBhdGggZD0iTTExLjQ1NTQgMTcuNzEwOEMxMS42NzQ3IDE3LjcxMDggMTEuODk0IDE3LjcwOTMgMTIuMTEzMyAxNy43MTA4QzEyLjMzMzIgMTcuNzEzIDEyLjQ4MzMgMTcuODUyNSAxMi40ODQ4IDE4LjA0OTZDMTIuNDg1OSAxOC4yNDcyIDEyLjMzODUgMTguMzkxIDEyLjExNzYgMTguMzkyNkMxMS42NzQyIDE4LjM5NjMgMTEuMjMxMyAxOC4zOTYzIDEwLjc4NzkgMTguMzkyNkMxMC41NjcgMTguMzkwNSAxMC40MjMzIDE4LjI0ODMgMTAuNDI1NCAxOC4wNDdDMTAuNDI3NSAxNy44NDgzIDEwLjU3NTUgMTcuNzEyNCAxMC43OTc0IDE3LjcxMDhDMTEuMDE2OCAxNy43MDg3IDExLjIzNjEgMTcuNzEwOCAxMS40NTU0IDE3LjcxMDhaIiBmaWxsPSIjMjgzMjUyIi8+CjxwYXRoIGQ9Ik0xMS40NjIzIDIwLjExMzhDMTEuMjQzIDIwLjExMzggMTEuMDIzNiAyMC4xMTU5IDEwLjgwNDMgMjAuMTEzM0MxMC41NzE4IDIwLjExMDEgMTAuNDI0OSAxOS45NzQzIDEwLjQyNTQgMTkuNzY5OEMxMC40MjY1IDE5LjU2NjMgMTAuNTc2IDE5LjQzMTYgMTAuODA4IDE5LjQzMDVDMTEuMjM3NyAxOS40Mjg5IDExLjY2NzMgMTkuNDI4OSAxMi4wOTc1IDE5LjQzMDVDMTIuMzMgMTkuNDMxIDEyLjQ4MTcgMTkuNTY1MyAxMi40ODQ5IDE5Ljc2NzFDMTIuNDg4IDE5Ljk2OTYgMTIuMzM3NCAyMC4xMDc1IDEyLjEwNyAyMC4xMTM4QzEyLjA5OCAyMC4xMTM4IDEyLjA4OSAyMC4xMTM4IDEyLjA4MDEgMjAuMTEzOEMxMS44NzQgMjAuMTEzOCAxMS42Njg0IDIwLjExMzggMTEuNDYyMyAyMC4xMTM4WiIgZmlsbD0iIzI4MzI1MiIvPgo8cGF0aCBkPSJNNy4yNjc3OSAyOC4yODEySDcuNjkzNjFMOC43Nzk3OSAzMC45ODQxTDkuODYzNjkgMjguMjgxMkgxMC4yOTE4TDguOTQzNzQgMzEuNTk2N0g4LjYxMTI4TDcuMjY3NzkgMjguMjgxMlpNNy4xMjg4OSAyOC4yODEySDcuNTA0NjFMNy41NjYwOSAzMC4zMDMzVjMxLjU5NjdINy4xMjg4OVYyOC4yODEyWk0xMC4wNTI3IDI4LjI4MTJIMTAuNDI4NFYzMS41OTY3SDkuOTkxMlYzMC4zMDMzTDEwLjA1MjcgMjguMjgxMlpNMTEuNjc3NiAyOS4xMzI5VjMxLjU5NjdIMTEuMjU0VjI5LjEzMjlIMTEuNjc3NlpNMTEuMjIyMSAyOC40NzkzQzExLjIyMjEgMjguNDExIDExLjI0MjYgMjguMzUzMyAxMS4yODM2IDI4LjMwNjNDMTEuMzI2MSAyOC4yNTkyIDExLjM4ODQgMjguMjM1NyAxMS40NzAzIDI4LjIzNTdDMTEuNTUwOCAyOC4yMzU3IDExLjYxMjMgMjguMjU5MiAxMS42NTQ4IDI4LjMwNjNDMTEuNjk4OCAyOC4zNTMzIDExLjcyMDggMjguNDExIDExLjcyMDggMjguNDc5M0MxMS43MjA4IDI4LjU0NDYgMTEuNjk4OCAyOC42MDA4IDExLjY1NDggMjguNjQ3OEMxMS42MTIzIDI4LjY5MzQgMTEuNTUwOCAyOC43MTYyIDExLjQ3MDMgMjguNzE2MkMxMS4zODg0IDI4LjcxNjIgMTEuMzI2MSAyOC42OTM0IDExLjI4MzYgMjguNjQ3OEMxMS4yNDI2IDI4LjYwMDggMTEuMjIyMSAyOC41NDQ2IDExLjIyMjEgMjguNDc5M1pNMTMuNDIzMSAzMS4yOTYxQzEzLjUyMzMgMzEuMjk2MSAxMy42MTU5IDMxLjI3NTYgMTMuNzAwOSAzMS4yMzQ2QzEzLjc4NTkgMzEuMTkzNiAxMy44NTU4IDMxLjEzNzUgMTMuOTEwNCAzMS4wNjYxQzEzLjk2NTEgMzAuOTkzMyAxMy45OTYyIDMwLjkxMDUgMTQuMDAzOCAzMC44MTc5SDE0LjQwNDVDMTQuMzk3IDMwLjk2MzcgMTQuMzQ3NiAzMS4wOTk1IDE0LjI1NjUgMzEuMjI1NUMxNC4xNjcgMzEuMzUgMTQuMDQ5MyAzMS40NTA5IDEzLjkwMzYgMzEuNTI4NEMxMy43NTc4IDMxLjYwNDMgMTMuNTk3NyAzMS42NDIyIDEzLjQyMzEgMzEuNjQyMkMxMy4yMzc5IDMxLjY0MjIgMTMuMDc2MiAzMS42MDk2IDEyLjkzODEgMzEuNTQ0M0MxMi44MDE1IDMxLjQ3OSAxMi42ODc2IDMxLjM4OTUgMTIuNTk2NSAzMS4yNzU2QzEyLjUwNyAzMS4xNjE4IDEyLjQzOTQgMzEuMDMxMiAxMi4zOTM5IDMwLjg4NEMxMi4zNDk4IDMwLjczNTIgMTIuMzI3OCAzMC41NzgxIDEyLjMyNzggMzAuNDEyNlYzMC4zMTdDMTIuMzI3OCAzMC4xNTE1IDEyLjM0OTggMjkuOTk1MSAxMi4zOTM5IDI5Ljg0NzlDMTIuNDM5NCAyOS42OTkxIDEyLjUwNyAyOS41Njc4IDEyLjU5NjUgMjkuNDUzOUMxMi42ODc2IDI5LjM0MDEgMTIuODAxNSAyOS4yNTA1IDEyLjkzODEgMjkuMTg1MkMxMy4wNzYyIDI5LjEyIDEzLjIzNzkgMjkuMDg3MyAxMy40MjMxIDI5LjA4NzNDMTMuNjE1OSAyOS4wODczIDEzLjc4NDQgMjkuMTI2OCAxMy45Mjg2IDI5LjIwNTdDMTQuMDcyOCAyOS4yODMyIDE0LjE4NTkgMjkuMzg5NCAxNC4yNjc5IDI5LjUyNDVDMTQuMzUxNCAyOS42NTgxIDE0LjM5NyAyOS44MDk5IDE0LjQwNDUgMjkuOTc5OUgxNC4wMDM4QzEzLjk5NjIgMjkuODc4MiAxMy45NjczIDI5Ljc4NjQgMTMuOTE3MiAyOS43MDQ0QzEzLjg2ODcgMjkuNjIyNCAxMy44MDE5IDI5LjU1NzIgMTMuNzE2OSAyOS41MDg2QzEzLjYzMzQgMjkuNDU4NSAxMy41MzU1IDI5LjQzMzQgMTMuNDIzMSAyOS40MzM0QzEzLjI5NDEgMjkuNDMzNCAxMy4xODU1IDI5LjQ1OTIgMTMuMDk3NSAyOS41MTA5QzEzLjAxMSAyOS41NjEgMTIuOTQxOSAyOS42MjkzIDEyLjg5MDMgMjkuNzE1OEMxMi44NDAyIDI5LjgwMDggMTIuODAzNyAyOS44OTU3IDEyLjc4MSAzMC4wMDA0QzEyLjc1OTcgMzAuMTAzNyAxMi43NDkxIDMwLjIwOTIgMTIuNzQ5MSAzMC4zMTdWMzAuNDEyNkMxMi43NDkxIDMwLjUyMDQgMTIuNzU5NyAzMC42MjY2IDEyLjc4MSAzMC43MzE0QzEyLjgwMjIgMzAuODM2MSAxMi44Mzc5IDMwLjkzMSAxMi44ODggMzEuMDE2QzEyLjkzOTYgMzEuMTAxIDEzLjAwODcgMzEuMTY5MyAxMy4wOTUyIDMxLjIyMUMxMy4xODMzIDMxLjI3MTEgMTMuMjkyNiAzMS4yOTYxIDEzLjQyMzEgMzEuMjk2MVpNMTUuMzgyNyAyOS41MlYzMS41OTY3SDE0Ljk2MTVWMjkuMTMyOUgxNS4zNzEzTDE1LjM4MjcgMjkuNTJaTTE2LjE1MjQgMjkuMTE5MkwxNi4xNTAxIDI5LjUxMDlDMTYuMTE1MiAyOS41MDMzIDE2LjA4MTggMjkuNDk4NyAxNi4wNDk5IDI5LjQ5NzJDMTYuMDE5NSAyOS40OTQyIDE1Ljk4NDYgMjkuNDkyNiAxNS45NDUyIDI5LjQ5MjZDMTUuODQ4IDI5LjQ5MjYgMTUuNzYyMiAyOS41MDc4IDE1LjY4NzkgMjkuNTM4MkMxNS42MTM1IDI5LjU2ODUgMTUuNTUwNSAyOS42MTExIDE1LjQ5ODkgMjkuNjY1N0MxNS40NDcyIDI5LjcyMDQgMTUuNDA2MyAyOS43ODU2IDE1LjM3NTkgMjkuODYxNUMxNS4zNDcgMjkuOTM1OSAxNS4zMjgxIDMwLjAxNzkgMTUuMzE5IDMwLjEwNzVMMTUuMjAwNiAzMC4xNzU4QzE1LjIwMDYgMzAuMDI3IDE1LjIxNSAyOS44ODczIDE1LjI0MzggMjkuNzU2OEMxNS4yNzQyIDI5LjYyNjIgMTUuMzIwNSAyOS41MTA5IDE1LjM4MjcgMjkuNDEwN0MxNS40NDUgMjkuMzA5IDE1LjUyMzkgMjkuMjMgMTUuNjE5NSAyOS4xNzM5QzE1LjcxNjcgMjkuMTE2MiAxNS44MzIxIDI5LjA4NzMgMTUuOTY1NyAyOS4wODczQzE1Ljk5NiAyOS4wODczIDE2LjAzMDkgMjkuMDkxMSAxNi4wNzA0IDI5LjA5ODdDMTYuMTA5OSAyOS4xMDQ4IDE2LjEzNzIgMjkuMTExNiAxNi4xNTI0IDI5LjExOTJaTTE2LjQ2NzkgMzAuMzkyMVYzMC4zMzk3QzE2LjQ2NzkgMzAuMTYyMSAxNi40OTM3IDI5Ljk5NzQgMTYuNTQ1MyAyOS44NDU2QzE2LjU5NyAyOS42OTIzIDE2LjY3MTMgMjkuNTU5NCAxNi43Njg1IDI5LjQ0NzFDMTYuODY1NyAyOS4zMzMyIDE2Ljk4MzMgMjkuMjQ1MiAxNy4xMjE0IDI5LjE4M0MxNy4yNTk2IDI5LjExOTIgMTcuNDE0NCAyOS4wODczIDE3LjU4NiAyOS4wODczQzE3Ljc1OSAyOS4wODczIDE3LjkxNDYgMjkuMTE5MiAxOC4wNTI4IDI5LjE4M0MxOC4xOTI0IDI5LjI0NTIgMTguMzEwOSAyOS4zMzMyIDE4LjQwOCAyOS40NDcxQzE4LjUwNjcgMjkuNTU5NCAxOC41ODE4IDI5LjY5MjMgMTguNjMzNCAyOS44NDU2QzE4LjY4NTEgMjkuOTk3NCAxOC43MTA5IDMwLjE2MjEgMTguNzEwOSAzMC4zMzk3VjMwLjM5MjFDMTguNzEwOSAzMC41Njk3IDE4LjY4NTEgMzAuNzM0NCAxOC42MzM0IDMwLjg4NjJDMTguNTgxOCAzMS4wMzggMTguNTA2NyAzMS4xNzA5IDE4LjQwOCAzMS4yODQ3QzE4LjMxMDkgMzEuMzk3MSAxOC4xOTMyIDMxLjQ4NTEgMTguMDU1MSAzMS41NDg5QzE3LjkxODQgMzEuNjExMSAxNy43NjM2IDMxLjY0MjIgMTcuNTkwNSAzMS42NDIyQzE3LjQxNzUgMzEuNjQyMiAxNy4yNjE5IDMxLjYxMTEgMTcuMTIzNyAzMS41NDg5QzE2Ljk4NTYgMzEuNDg1MSAxNi44NjcyIDMxLjM5NzEgMTYuNzY4NSAzMS4yODQ3QzE2LjY3MTMgMzEuMTcwOSAxNi41OTcgMzEuMDM4IDE2LjU0NTMgMzAuODg2MkMxNi40OTM3IDMwLjczNDQgMTYuNDY3OSAzMC41Njk3IDE2LjQ2NzkgMzAuMzkyMVpNMTYuODg5MiAzMC4zMzk3VjMwLjM5MjFDMTYuODg5MiAzMC41MTUxIDE2LjkwMzYgMzAuNjMxMiAxNi45MzI0IDMwLjc0MDVDMTYuOTYxMyAzMC44NDgzIDE3LjAwNDYgMzAuOTQzOSAxNy4wNjIyIDMxLjAyNzRDMTcuMTIxNCAzMS4xMTA5IDE3LjE5NTEgMzEuMTc2OSAxNy4yODMxIDMxLjIyNTVDMTcuMzcxMiAzMS4yNzI2IDE3LjQ3MzYgMzEuMjk2MSAxNy41OTA1IDMxLjI5NjFDMTcuNzA1OSAzMS4yOTYxIDE3LjgwNjkgMzEuMjcyNiAxNy44OTM0IDMxLjIyNTVDMTcuOTgxNCAzMS4xNzY5IDE4LjA1NDMgMzEuMTEwOSAxOC4xMTIgMzEuMDI3NEMxOC4xNjk3IDMwLjk0MzkgMTguMjEyOSAzMC44NDgzIDE4LjI0MTggMzAuNzQwNUMxOC4yNzIxIDMwLjYzMTIgMTguMjg3MyAzMC41MTUxIDE4LjI4NzMgMzAuMzkyMVYzMC4zMzk3QzE4LjI4NzMgMzAuMjE4MyAxOC4yNzIxIDMwLjEwMzcgMTguMjQxOCAyOS45OTU5QzE4LjIxMjkgMjkuODg2NiAxOC4xNjg5IDI5Ljc5MDIgMTguMTA5NyAyOS43MDY3QzE4LjA1MiAyOS42MjE3IDE3Ljk3OTIgMjkuNTU0OSAxNy44OTExIDI5LjUwNjNDMTcuODA0NiAyOS40NTc3IDE3LjcwMjkgMjkuNDMzNCAxNy41ODYgMjkuNDMzNEMxNy40NzA2IDI5LjQzMzQgMTcuMzY4OSAyOS40NTc3IDE3LjI4MDggMjkuNTA2M0MxNy4xOTQzIDI5LjU1NDkgMTcuMTIxNCAyOS42MjE3IDE3LjA2MjIgMjkuNzA2N0MxNy4wMDQ2IDI5Ljc5MDIgMTYuOTYxMyAyOS44ODY2IDE2LjkzMjQgMjkuOTk1OUMxNi45MDM2IDMwLjEwMzcgMTYuODg5MiAzMC4yMTgzIDE2Ljg4OTIgMzAuMzM5N1pNNS45MTYxNyAzNi4yMzkyVjM2LjU5NjdINC4xNjA1M1YzNi4yMzkySDUuOTE2MTdaTTQuMjQ5MzQgMzMuMjgxMlYzNi41OTY3SDMuODA5ODZWMzMuMjgxMkg0LjI0OTM0Wk01LjY4MzkxIDM0LjcwNjdWMzUuMDY0Mkg0LjE2MDUzVjM0LjcwNjdINS42ODM5MVpNNS44OTM0IDMzLjI4MTJWMzMuNjQxSDQuMTYwNTNWMzMuMjgxMkg1Ljg5MzRaTTYuODk4OSAzNC42MjI0VjM2LjU5NjdINi40NzUzNlYzNC4xMzI5SDYuODc2MTNMNi44OTg5IDM0LjYyMjRaTTYuODEyMzcgMzUuMjcxNEw2LjYxNjU0IDM1LjI2NDZDNi42MTgwNiAzNS4wOTYxIDYuNjQwMDcgMzQuOTQwNSA2LjY4MjU4IDM0Ljc5NzhDNi43MjUwOSAzNC42NTM2IDYuNzg4MDkgMzQuNTI4MyA2Ljg3MTU4IDM0LjQyMjFDNi45NTUwNyAzNC4zMTU4IDcuMDU5MDYgMzQuMjMzOCA3LjE4MzU0IDM0LjE3NjFDNy4zMDgwMiAzNC4xMTY5IDcuNDUyMjQgMzQuMDg3MyA3LjYxNjE5IDM0LjA4NzNDNy43MzE1NiAzNC4wODczIDcuODM3ODMgMzQuMTA0IDcuOTM0OTggMzQuMTM3NEM4LjAzMjE0IDM0LjE2OTMgOC4xMTYzOSAzNC4yMjAyIDguMTg3NzQgMzQuMjlDOC4yNTkwOSAzNC4zNTk4IDguMzE0NSAzNC40NDk0IDguMzUzOTcgMzQuNTU4N0M4LjM5MzQ0IDM0LjY2OCA4LjQxMzE3IDM0LjgwMDEgOC40MTMxNyAzNC45NTQ5VjM2LjU5NjdINy45OTE5MVYzNC45NzU0QzcuOTkxOTEgMzQuODQ2NCA3Ljk2OTkgMzQuNzQzMSA3LjkyNTg4IDM0LjY2NTdDNy44ODMzNyAzNC41ODgzIDcuODIyNjUgMzQuNTMyMSA3Ljc0MzcxIDM0LjQ5NzJDNy42NjQ3NyAzNC40NjA4IDcuNTcyMTcgMzQuNDQyNSA3LjQ2NTkgMzQuNDQyNUM3LjM0MTQyIDM0LjQ0MjUgNy4yMzc0MyAzNC40NjQ2IDcuMTUzOTQgMzQuNTA4NkM3LjA3MDQ1IDM0LjU1MjYgNy4wMDM2NSAzNC42MTMzIDYuOTUzNTUgMzQuNjkwOEM2LjkwMzQ2IDM0Ljc2ODIgNi44NjcwMyAzNC44NTcgNi44NDQyNSAzNC45NTcyQzYuODIzIDM1LjA1NTggNi44MTIzNyAzNS4xNjA2IDYuODEyMzcgMzUuMjcxNFpNOC40MDg2MiAzNS4wMzkxTDguMTI2MjYgMzUuMTI1N0M4LjEyNzc4IDM0Ljk5MDYgOC4xNDk3OSAzNC44NjA4IDguMTkyMyAzNC43MzYzQzguMjM2MzIgMzQuNjExOCA4LjI5OTMyIDM0LjUwMSA4LjM4MTMgMzQuNDAzOEM4LjQ2NDc5IDM0LjMwNjcgOC41NjcyNiAzNC4yMyA4LjY4ODcgMzQuMTczOUM4LjgxMDE1IDM0LjExNjIgOC45NDkwNSAzNC4wODczIDkuMTA1NDEgMzQuMDg3M0M5LjIzNzQ4IDM0LjA4NzMgOS4zNTQzNyAzNC4xMDQ4IDkuNDU2MDkgMzQuMTM5N0M5LjU1OTMxIDM0LjE3NDYgOS42NDU4NCAzNC4yMjg1IDkuNzE1NjcgMzQuMzAxNEM5Ljc4NzAyIDM0LjM3MjcgOS44NDA5MSAzNC40NjQ2IDkuODc3MzUgMzQuNTc2OUM5LjkxMzc4IDM0LjY4OTIgOS45MzIgMzQuODIyOCA5LjkzMiAzNC45Nzc3VjM2LjU5NjdIOS41MDg0NlYzNC45NzMxQzkuNTA4NDYgMzQuODM1IDkuNDg2NDUgMzQuNzI3OSA5LjQ0MjQyIDM0LjY1MkM5LjM5OTkyIDM0LjU3NDYgOS4zMzkxOSAzNC41MjA3IDkuMjYwMjUgMzQuNDkwNEM5LjE4MjgzIDM0LjQ1ODUgOS4wOTAyMyAzNC40NDI1IDguOTgyNDUgMzQuNDQyNUM4Ljg4OTg1IDM0LjQ0MjUgOC44MDc4NyAzNC40NTg1IDguNzM2NTIgMzQuNDkwNEM4LjY2NTE3IDM0LjUyMjIgOC42MDUyMSAzNC41NjYzIDguNTU2NjMgMzQuNjIyNEM4LjUwODA1IDM0LjY3NzEgOC40NzA4NiAzNC43NDAxIDguNDQ1MDUgMzQuODExNEM4LjQyMDc2IDM0Ljg4MjggOC40MDg2MiAzNC45NTg3IDguNDA4NjIgMzUuMDM5MVpNMTEuMDc0MSAzNC42MDY1VjM3LjU0NEgxMC42NTA2VjM0LjEzMjlIMTEuMDM3N0wxMS4wNzQxIDM0LjYwNjVaTTEyLjczNDEgMzUuMzQ0M1YzNS4zOTIxQzEyLjczNDEgMzUuNTcxMiAxMi43MTI5IDM1LjczNzUgMTIuNjcwNCAzNS44OTA4QzEyLjYyNzkgMzYuMDQyNiAxMi41NjU2IDM2LjE3NDcgMTIuNDgzNiAzNi4yODdDMTIuNDAzMiAzNi4zOTkzIDEyLjMwMzggMzYuNDg2NiAxMi4xODUzIDM2LjU0ODlDMTIuMDY2OSAzNi42MTExIDExLjkzMTEgMzYuNjQyMiAxMS43Nzc3IDM2LjY0MjJDMTEuNjIxNCAzNi42NDIyIDExLjQ4MzIgMzYuNjE2NCAxMS4zNjMzIDM2LjU2NDhDMTEuMjQzNCAzNi41MTMyIDExLjE0MTcgMzYuNDM4IDExLjA1ODIgMzYuMzM5NEMxMC45NzQ3IDM2LjI0MDcgMTAuOTA3OSAzNi4xMjIzIDEwLjg1NzggMzUuOTg0MUMxMC44MDkyIDM1Ljg0NiAxMC43NzU4IDM1LjY5MDQgMTAuNzU3NiAzNS41MTczVjM1LjI2MjNDMTAuNzc1OCAzNS4wODAxIDEwLjgxIDM0LjkxNjkgMTAuODYwMSAzNC43NzI3QzEwLjkxMDIgMzQuNjI4NSAxMC45NzYyIDM0LjUwNTUgMTEuMDU4MiAzNC40MDM4QzExLjE0MTcgMzQuMzAwNiAxMS4yNDI2IDM0LjIyMjQgMTEuMzYxIDM0LjE2OTNDMTEuNDc5NCAzNC4xMTQ2IDExLjYxNjEgMzQuMDg3MyAxMS43NzA5IDM0LjA4NzNDMTEuOTI1OCAzNC4wODczIDEyLjA2MzEgMzQuMTE3NyAxMi4xODMxIDM0LjE3ODRDMTIuMzAzIDM0LjIzNzYgMTIuNDA0IDM0LjMyMjYgMTIuNDg1OSAzNC40MzM0QzEyLjU2NzkgMzQuNTQ0MyAxMi42Mjk0IDM0LjY3NzEgMTIuNjcwNCAzNC44MzE5QzEyLjcxMjkgMzQuOTg1MyAxMi43MzQxIDM1LjE1NiAxMi43MzQxIDM1LjM0NDNaTTEyLjMxMDYgMzUuMzkyMVYzNS4zNDQzQzEyLjMxMDYgMzUuMjIxMyAxMi4yOTc3IDM1LjEwNTkgMTIuMjcxOSAzNC45OTgyQzEyLjI0NjEgMzQuODg4OSAxMi4yMDU4IDM0Ljc5MzIgMTIuMTUxMiAzNC43MTEyQzEyLjA5ODEgMzQuNjI3OCAxMi4wMjk3IDM0LjU2MjUgMTEuOTQ2MyAzNC41MTU0QzExLjg2MjggMzQuNDY2OCAxMS43NjMzIDM0LjQ0MjUgMTEuNjQ4IDM0LjQ0MjVDMTEuNTQxNyAzNC40NDI1IDExLjQ0OTEgMzQuNDYwOCAxMS4zNzAxIDM0LjQ5NzJDMTEuMjkyNyAzNC41MzM2IDExLjIyNjcgMzQuNTgzIDExLjE3MiAzNC42NDUyQzExLjExNzQgMzQuNzA1OSAxMS4wNzI2IDM0Ljc3NTggMTEuMDM3NyAzNC44NTQ3QzExLjAwNDMgMzQuOTMyMSAxMC45NzkyIDM1LjAxMjYgMTAuOTYyNSAzNS4wOTYxVjM1LjY4NThDMTAuOTkyOSAzNS43OTIxIDExLjAzNTQgMzUuODkyMyAxMS4wOTAxIDM1Ljk4NjRDMTEuMTQ0NyAzNi4wNzkgMTEuMjE3NiAzNi4xNTQyIDExLjMwODcgMzYuMjExOUMxMS4zOTk4IDM2LjI2OCAxMS41MTQ0IDM2LjI5NjEgMTEuNjUyNSAzNi4yOTYxQzExLjc2NjQgMzYuMjk2MSAxMS44NjQzIDM2LjI3MjYgMTEuOTQ2MyAzNi4yMjU1QzEyLjAyOTcgMzYuMTc2OSAxMi4wOTgxIDM2LjExMDkgMTIuMTUxMiAzNi4wMjc0QzEyLjIwNTggMzUuOTQzOSAxMi4yNDYxIDM1Ljg0ODMgMTIuMjcxOSAzNS43NDA1QzEyLjI5NzcgMzUuNjMxMiAxMi4zMTA2IDM1LjUxNTEgMTIuMzEwNiAzNS4zOTIxWk0xMy43NzYxIDM0LjUyVjM2LjU5NjdIMTMuMzU0OFYzNC4xMzI5SDEzLjc2NDdMMTMuNzc2MSAzNC41MlpNMTQuNTQ1NyAzNC4xMTkyTDE0LjU0MzQgMzQuNTEwOUMxNC41MDg1IDM0LjUwMzMgMTQuNDc1MSAzNC40OTg3IDE0LjQ0MzMgMzQuNDk3MkMxNC40MTI5IDM0LjQ5NDIgMTQuMzc4IDM0LjQ5MjYgMTQuMzM4NSAzNC40OTI2QzE0LjI0MTQgMzQuNDkyNiAxNC4xNTU2IDM0LjUwNzggMTQuMDgxMiAzNC41MzgyQzE0LjAwNjggMzQuNTY4NSAxMy45NDM4IDM0LjYxMTEgMTMuODkyMiAzNC42NjU3QzEzLjg0MDYgMzQuNzIwNCAxMy43OTk2IDM0Ljc4NTYgMTMuNzY5MiAzNC44NjE1QzEzLjc0MDQgMzQuOTM1OSAxMy43MjE0IDM1LjAxNzkgMTMuNzEyMyAzNS4xMDc1TDEzLjU5MzkgMzUuMTc1OEMxMy41OTM5IDM1LjAyNyAxMy42MDgzIDM0Ljg4NzMgMTMuNjM3MiAzNC43NTY4QzEzLjY2NzUgMzQuNjI2MiAxMy43MTM4IDM0LjUxMDkgMTMuNzc2MSAzNC40MTA3QzEzLjgzODMgMzQuMzA5IDEzLjkxNzIgMzQuMjMgMTQuMDEyOSAzNC4xNzM5QzE0LjExIDM0LjExNjIgMTQuMjI1NCAzNC4wODczIDE0LjM1OSAzNC4wODczQzE0LjM4OTQgMzQuMDg3MyAxNC40MjQzIDM0LjA5MTEgMTQuNDYzNyAzNC4wOTg3QzE0LjUwMzIgMzQuMTA0OCAxNC41MzA1IDM0LjExMTYgMTQuNTQ1NyAzNC4xMTkyWk0xNS45OTUzIDM2LjY0MjJDMTUuODIzNyAzNi42NDIyIDE1LjY2ODEgMzYuNjEzNCAxNS41Mjg1IDM2LjU1NTdDMTUuMzkwMyAzNi40OTY1IDE1LjI3MTEgMzYuNDEzOCAxNS4xNzEgMzYuMzA3NUMxNS4wNzIzIDM2LjIwMTIgMTQuOTk2NCAzNi4wNzUyIDE0Ljk0MzIgMzUuOTI5NUMxNC44OTAxIDM1Ljc4MzggMTQuODYzNSAzNS42MjQ0IDE0Ljg2MzUgMzUuNDUxM1YzNS4zNTU3QzE0Ljg2MzUgMzUuMTU1MyAxNC44OTMxIDM0Ljk3NjkgMTQuOTUyMyAzNC44MjA1QzE1LjAxMTYgMzQuNjYyNyAxNS4wOTIgMzQuNTI5MSAxNS4xOTM3IDM0LjQxOThDMTUuMjk1NCAzNC4zMTA1IDE1LjQxMDggMzQuMjI3NyAxNS41Mzk4IDM0LjE3MTZDMTUuNjY4OSAzNC4xMTU0IDE1LjgwMjUgMzQuMDg3MyAxNS45NDA2IDM0LjA4NzNDMTYuMTE2NyAzNC4wODczIDE2LjI2ODUgMzQuMTE3NyAxNi4zOTYgMzQuMTc4NEMxNi41MjUxIDM0LjIzOTEgMTYuNjMwNiAzNC4zMjQxIDE2LjcxMjUgMzQuNDMzNEMxNi43OTQ1IDM0LjU0MTIgMTYuODU1MiAzNC42Njg3IDE2Ljg5NDcgMzQuODE2QzE2LjkzNDIgMzQuOTYxNyAxNi45NTM5IDM1LjEyMTEgMTYuOTUzOSAzNS4yOTQyVjM1LjQ4MzJIMTUuMTE0VjM1LjEzOTNIMTYuNTMyN1YzNS4xMDc1QzE2LjUyNjYgMzQuOTk4MiAxNi41MDM4IDM0Ljg5MTkgMTYuNDY0MyAzNC43ODg3QzE2LjQyNjQgMzQuNjg1NCAxNi4zNjU3IDM0LjYwMDQgMTYuMjgyMiAzNC41MzM2QzE2LjE5ODcgMzQuNDY2OCAxNi4wODQ4IDM0LjQzMzQgMTUuOTQwNiAzNC40MzM0QzE1Ljg0NSAzNC40MzM0IDE1Ljc1NjkgMzQuNDUzOSAxNS42NzY1IDM0LjQ5NDlDMTUuNTk2IDM0LjUzNDQgMTUuNTI2OSAzNC41OTM2IDE1LjQ2OTMgMzQuNjcyNUMxNS40MTE2IDM0Ljc1MTUgMTUuMzY2OCAzNC44NDc5IDE1LjMzNDkgMzQuOTYxN0MxNS4zMDMgMzUuMDc1NiAxNS4yODcxIDM1LjIwNjkgMTUuMjg3MSAzNS4zNTU3VjM1LjQ1MTNDMTUuMjg3MSAzNS41NjgyIDE1LjMwMyAzNS42NzgzIDE1LjMzNDkgMzUuNzgxNUMxNS4zNjgzIDM1Ljg4MzIgMTUuNDE2MSAzNS45NzI4IDE1LjQ3ODQgMzYuMDUwMkMxNS41NDIxIDM2LjEyNzYgMTUuNjE4OCAzNi4xODgzIDE1LjcwODMgMzYuMjMyM0MxNS43OTk0IDM2LjI3NjQgMTUuOTAyNyAzNi4yOTg0IDE2LjAxOCAzNi4yOTg0QzE2LjE2NjggMzYuMjk4NCAxNi4yOTI4IDM2LjI2OCAxNi4zOTYgMzYuMjA3M0MxNi40OTkzIDM2LjE0NjYgMTYuNTg5NiAzNi4wNjU0IDE2LjY2NyAzNS45NjM3TDE2LjkyMiAzNi4xNjYzQzE2Ljg2ODkgMzYuMjQ2OCAxNi44MDE0IDM2LjMyMzQgMTYuNzE5NCAzNi4zOTYzQzE2LjYzNzQgMzYuNDY5MiAxNi41MzY1IDM2LjUyODQgMTYuNDE2NSAzNi41NzM5QzE2LjI5ODEgMzYuNjE5NSAxNi4xNTc3IDM2LjY0MjIgMTUuOTk1MyAzNi42NDIyWk0xOC45NjM2IDM1Ljk0MzJDMTguOTYzNiAzNS44ODI0IDE4Ljk1IDM1LjgyNjMgMTguOTIyNiAzNS43NzQ3QzE4Ljg5NjggMzUuNzIxNSAxOC44NDI5IDM1LjY3MzcgMTguNzYxIDM1LjYzMTJDMTguNjgwNSAzNS41ODcyIDE4LjU1OTEgMzUuNTQ5MiAxOC4zOTY2IDM1LjUxNzNDMTguMjYgMzUuNDg4NSAxOC4xMzYzIDM1LjQ1NDMgMTguMDI1NSAzNS40MTQ5QzE3LjkxNjIgMzUuMzc1NCAxNy44MjI4IDM1LjMyNzYgMTcuNzQ1NCAzNS4yNzE0QzE3LjY2OTUgMzUuMjE1MiAxNy42MTEgMzUuMTQ5MiAxNy41NyAzNS4wNzMzQzE3LjUyOSAzNC45OTc0IDE3LjUwODYgMzQuOTA4NiAxNy41MDg2IDM0LjgwNjlDMTcuNTA4NiAzNC43MDk3IDE3LjUyOTggMzQuNjE3OSAxNy41NzIzIDM0LjUzMTRDMTcuNjE2MyAzNC40NDQ4IDE3LjY3NzggMzQuMzY4MiAxNy43NTY4IDM0LjMwMTRDMTcuODM3MiAzNC4yMzQ2IDE3LjkzMzYgMzQuMTgyMiAxOC4wNDU5IDM0LjE0NDJDMTguMTU4MyAzNC4xMDYzIDE4LjI4MzUgMzQuMDg3MyAxOC40MjE3IDM0LjA4NzNDMTguNjE5IDM0LjA4NzMgMTguNzg3NSAzNC4xMjIyIDE4LjkyNzIgMzQuMTkyMUMxOS4wNjY4IDM0LjI2MTkgMTkuMTczOSAzNC4zNTUzIDE5LjI0ODMgMzQuNDcyMkMxOS4zMjI2IDM0LjU4NzUgMTkuMzU5OCAzNC43MTU4IDE5LjM1OTggMzQuODU3SDE4LjkzODZDMTguOTM4NiAzNC43ODg3IDE4LjkxODEgMzQuNzIyNiAxOC44NzcxIDM0LjY1ODlDMTguODM3NiAzNC41OTM2IDE4Ljc3OTIgMzQuNTM5NyAxOC43MDE4IDM0LjQ5NzJDMTguNjI1OSAzNC40NTQ3IDE4LjUzMjUgMzQuNDMzNCAxOC40MjE3IDM0LjQzMzRDMTguMzA0OCAzNC40MzM0IDE4LjIwOTkgMzQuNDUxNyAxOC4xMzcgMzQuNDg4MUMxOC4wNjU3IDM0LjUyMyAxOC4wMTMzIDM0LjU2NzggMTcuOTc5OSAzNC42MjI0QzE3Ljk0OCAzNC42NzcxIDE3LjkzMjEgMzQuNzM0OCAxNy45MzIxIDM0Ljc5NTVDMTcuOTMyMSAzNC44NDEgMTcuOTM5NyAzNC44ODIgMTcuOTU0OSAzNC45MTg1QzE3Ljk3MTYgMzQuOTUzNCAxOC4wMDA0IDM0Ljk4NiAxOC4wNDE0IDM1LjAxNjRDMTguMDgyNCAzNS4wNDUyIDE4LjE0MDEgMzUuMDcyNSAxOC4yMTQ1IDM1LjA5ODRDMTguMjg4OCAzNS4xMjQyIDE4LjM4MzcgMzUuMTUgMTguNDk5MSAzNS4xNzU4QzE4LjcwMSAzNS4yMjEzIDE4Ljg2NzIgMzUuMjc2IDE4Ljk5NzggMzUuMzM5N0MxOS4xMjgzIDM1LjQwMzUgMTkuMjI1NSAzNS40ODE3IDE5LjI4OTIgMzUuNTc0M0MxOS4zNTMgMzUuNjY2OSAxOS4zODQ5IDM1Ljc3OTIgMTkuMzg0OSAzNS45MTEzQzE5LjM4NDkgMzYuMDE5MSAxOS4zNjIxIDM2LjExNzcgMTkuMzE2NiAzNi4yMDczQzE5LjI3MjUgMzYuMjk2OSAxOS4yMDggMzYuMzc0MyAxOS4xMjMgMzYuNDM5NkMxOS4wMzk1IDM2LjUwMzMgMTguOTM5MyAzNi41NTM0IDE4LjgyMjQgMzYuNTg5OUMxOC43MDcxIDM2LjYyNDggMTguNTc3MyAzNi42NDIyIDE4LjQzMzEgMzYuNjQyMkMxOC4yMTYgMzYuNjQyMiAxOC4wMzIzIDM2LjYwMzUgMTcuODgyIDM2LjUyNjFDMTcuNzMxNyAzNi40NDg3IDE3LjYxNzkgMzYuMzQ4NSAxNy41NDA0IDM2LjIyNTVDMTcuNDYzIDM2LjEwMjYgMTcuNDI0MyAzNS45NzI4IDE3LjQyNDMgMzUuODM2MUgxNy44NDc4QzE3Ljg1MzkgMzUuOTUxNSAxNy44ODczIDM2LjA0MzMgMTcuOTQ4IDM2LjExMTdDMTguMDA4OCAzNi4xNzg1IDE4LjA4MzEgMzYuMjI2MyAxOC4xNzEyIDM2LjI1NTFDMTguMjU5MiAzNi4yODI0IDE4LjM0NjUgMzYuMjk2MSAxOC40MzMxIDM2LjI5NjFDMTguNTQ4NCAzNi4yOTYxIDE4LjY0NDggMzYuMjgwOSAxOC43MjIyIDM2LjI1MDZDMTguODAxMiAzNi4yMjAyIDE4Ljg2MTIgMzYuMTc4NSAxOC45MDIxIDM2LjEyNTNDMTguOTQzMSAzNi4wNzIyIDE4Ljk2MzYgMzYuMDExNSAxOC45NjM2IDM1Ljk0MzJaTTIxLjQ3NDMgMzYuMTc1NFYzNC45MDcxQzIxLjQ3NDMgMzQuODA5OSAyMS40NTQ1IDM0LjcyNTcgMjEuNDE1MSAzNC42NTQzQzIxLjM3NzEgMzQuNTgxNSAyMS4zMTk0IDM0LjUyNTMgMjEuMjQyIDM0LjQ4NThDMjEuMTY0NiAzNC40NDYzIDIxLjA2OSAzNC40MjY2IDIwLjk1NTEgMzQuNDI2NkMyMC44NDg4IDM0LjQyNjYgMjAuNzU1NSAzNC40NDQ4IDIwLjY3NSAzNC40ODEzQzIwLjU5NjEgMzQuNTE3NyAyMC41MzM4IDM0LjU2NTUgMjAuNDg4MyAzNC42MjQ3QzIwLjQ0NDMgMzQuNjgzOSAyMC40MjIzIDM0Ljc0NzcgMjAuNDIyMyAzNC44MTZIMjAuMDAxQzIwLjAwMSAzNC43Mjc5IDIwLjAyMzggMzQuNjQwNyAyMC4wNjkzIDM0LjU1NDFDMjAuMTE0OSAzNC40Njc2IDIwLjE4MDEgMzQuMzg5NCAyMC4yNjUxIDM0LjMxOTZDMjAuMzUxNyAzNC4yNDgyIDIwLjQ1NDkgMzQuMTkyMSAyMC41NzQ4IDM0LjE1MTFDMjAuNjk2MyAzNC4xMDg2IDIwLjgzMTQgMzQuMDg3MyAyMC45ODAyIDM0LjA4NzNDMjEuMTU5MyAzNC4wODczIDIxLjMxNzIgMzQuMTE3NyAyMS40NTM4IDM0LjE3ODRDMjEuNTkxOSAzNC4yMzkxIDIxLjY5OTcgMzQuMzMxIDIxLjc3NzEgMzQuNDUzOUMyMS44NTYxIDM0LjU3NTQgMjEuODk1NSAzNC43Mjc5IDIxLjg5NTUgMzQuOTExNlYzNi4wNTkzQzIxLjg5NTUgMzYuMTQxMyAyMS45MDI0IDM2LjIyODYgMjEuOTE2IDM2LjMyMTJDMjEuOTMxMiAzNi40MTM4IDIxLjk1MzIgMzYuNDkzNSAyMS45ODIxIDM2LjU2MDJWMzYuNTk2N0gyMS41NDI2QzIxLjUyMTMgMzYuNTQ4MSAyMS41MDQ2IDM2LjQ4MzYgMjEuNDkyNSAzNi40MDMxQzIxLjQ4MDQgMzYuMzIxMiAyMS40NzQzIDM2LjI0NTMgMjEuNDc0MyAzNi4xNzU0Wk0yMS41NDcyIDM1LjEwMjlMMjEuNTUxNyAzNS4zOTg5SDIxLjEyNTlDMjEuMDA2IDM1LjM5ODkgMjAuODk4OSAzNS40MDg4IDIwLjgwNDggMzUuNDI4NUMyMC43MTA3IDM1LjQ0NjcgMjAuNjMxOCAzNS40NzQ4IDIwLjU2OCAzNS41MTI4QzIwLjUwNDIgMzUuNTUwNyAyMC40NTU3IDM1LjU5ODYgMjAuNDIyMyAzNS42NTYyQzIwLjM4ODkgMzUuNzEyNCAyMC4zNzIyIDM1Ljc3ODQgMjAuMzcyMiAzNS44NTQzQzIwLjM3MjIgMzUuOTMxOCAyMC4zODk2IDM2LjAwMjQgMjAuNDI0NSAzNi4wNjYxQzIwLjQ1OTUgMzYuMTI5OSAyMC41MTE4IDM2LjE4MDcgMjAuNTgxNyAzNi4yMTg3QzIwLjY1MyAzNi4yNTUxIDIwLjc0MDMgMzYuMjczMyAyMC44NDM1IDM2LjI3MzNDMjAuOTcyNiAzNi4yNzMzIDIxLjA4NjQgMzYuMjQ2IDIxLjE4NTEgMzYuMTkxNEMyMS4yODM4IDM2LjEzNjcgMjEuMzYxOSAzNi4wNjk5IDIxLjQxOTYgMzUuOTkxQzIxLjQ3ODggMzUuOTEyIDIxLjUxMDcgMzUuODM1NCAyMS41MTUzIDM1Ljc2MUwyMS42OTUyIDM1Ljk2MzdDMjEuNjg0NSAzNi4wMjc0IDIxLjY1NTcgMzYuMDk4IDIxLjYwODYgMzYuMTc1NEMyMS41NjE2IDM2LjI1MjggMjEuNDk4NiAzNi4zMjcyIDIxLjQxOTYgMzYuMzk4NkMyMS4zNDIyIDM2LjQ2ODQgMjEuMjQ5NiAzNi41MjY5IDIxLjE0MTggMzYuNTczOUMyMS4wMzU2IDM2LjYxOTUgMjAuOTE1NiAzNi42NDIyIDIwLjc4MiAzNi42NDIyQzIwLjYxNTEgMzYuNjQyMiAyMC40Njg2IDM2LjYwOTYgMjAuMzQyNiAzNi41NDQzQzIwLjIxODEgMzYuNDc5IDIwLjEyMDkgMzYuMzkxNyAyMC4wNTExIDM2LjI4MjRDMTkuOTgyOCAzNi4xNzE2IDE5Ljk0ODYgMzYuMDQ3OSAxOS45NDg2IDM1LjkxMTNDMTkuOTQ4NiAzNS43NzkyIDE5Ljk3NDQgMzUuNjYzMSAyMC4wMjYgMzUuNTYyOUMyMC4wNzc3IDM1LjQ2MTIgMjAuMTUyIDM1LjM3NjkgMjAuMjQ5MiAzNS4zMTAxQzIwLjM0NjQgMzUuMjQxOCAyMC40NjMzIDM1LjE5MDIgMjAuNTk5OSAzNS4xNTUzQzIwLjczNjUgMzUuMTIwNCAyMC44ODkxIDM1LjEwMjkgMjEuMDU3NiAzNS4xMDI5SDIxLjU0NzJaIiBmaWxsPSIjMjgzMjUyIi8+Cjwvc3ZnPgo=" /></div>
                            <div><img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNyA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjc4NjIgMTAuMTIzQzE0LjczMTcgMTAuMTIzIDE1LjY1MTcgMTAuMTIzIDE2LjU3MjMgMTAuMTIzQzE3LjA0MTYgMTAuMTIzIDE3LjA4MzQgMTAuMTU0MiAxNy4yMDA3IDEwLjYwMDJDMTcuMjUwOSAxMC42MDQ0IDE3LjE4MzMgMjEuMjA2MSAxNy4xODMzIDI0LjE5NTFDMTcuMTgzMyAyNC4xOTUxIDE3LjY0ODggMjQuMjExNSAxNy44MDEgMjQuMjA2MkMxOC4wMTI0IDI0LjE5ODMgMTguMTk5NSAyNC4yMzMyIDE4LjI3NDUgMjQuNDY1MkMxOC4zNDggMjQuNjkxNCAxOC4yMDM3IDI0LjgxNzIgMTguMDQ0MSAyNC45MzE4SDguOTI4NTJDOC44NDc2NyAyNC44MzE0IDguNzMzNTIgMjQuNzQyNiA4LjY5Mzg4IDI0LjYyODVDOC42MjUxOCAyNC40MzAzIDguNzk3NDYgMjQuMjMxNiA5LjAyNDcxIDI0LjIxMjZDOS4xMjI0NyAyNC4yMDQxIDkuNTE1MTMgMjQuMjA3OCA5LjY0NjcyIDI0LjIwNzhDOS42NDY3MiAyNC4xMDc5IDkuNjQ2NzIgMjQuMDE5NyA5LjY0NjcyIDIzLjkzMkM5LjY0NjcyIDE5LjUxNTUgOS42NDY3MiAxNS4wOTk2IDkuNjQ2NzIgMTAuNjgzMkM5LjY0NjcyIDEwLjIyNSA5Ljc0NzY2IDEwLjEyMjUgMTAuMjAyMSAxMC4xMjI1QzExLjA2NzIgMTAuMTIyNSAxMS45MzE4IDEwLjEyMjUgMTIuNzk2OSAxMC4xMjI1SDEzLjc4NTdMMTMuNzg2MiAxMC4xMjNaTTE2LjQyODYgMjQuMTk2MlYxMC44NjM5SDEwLjM4ODdWMjQuMTkxNEgxMi4wNzc3QzEyLjA3NzcgMjQuMDk5NSAxMi4wNzc3IDI0LjAyMzQgMTIuMDc3NyAyMy45NDczQzEyLjA3NzcgMjMuNTMyNCAxMi4wNzQgMjMuMTE3NiAxMi4wNzkzIDIyLjcwMjdDMTIuMDgzIDIyLjM5MzEgMTIuMjA5MyAyMi4yNjgzIDEyLjUxNzQgMjIuMjY2N0MxMy4xMTUxIDIyLjI2MzYgMTMuNzEyOCAyMi4yNjMgMTQuMzA5OSAyMi4yNjY3QzE0LjYxMDEgMjIuMjY4MyAxNC43NDM4IDIyLjQwNDEgMTQuNzQ3IDIyLjcwODVDMTQuNzUxMiAyMy4xMzAzIDE0Ljc0NzUgMjMuNTUyIDE0Ljc0ODYgMjMuOTc0MkMxNC43NDg2IDI0LjA0ODIgMTQuNzU1NSAyNC4xMjIyIDE0Ljc1ODYgMjQuMTk2MkgxNi40MjgxSDE2LjQyODZaTTE0LjAwNjYgMjQuMTk0MVYyMy4wMDEzSDEyLjgyMThWMjQuMjA4NEMxMi44OTg5IDI0LjIwNDcgMTMuOTMgMjQuMTk0MSAxNC4wMDY2IDI0LjE5NDFaIiBmaWxsPSIjRDlEOUQ5Ii8+CjxwYXRoIGQ9Ik0xMi4zMDgxIDE1LjU5MTFDMTIuMzA4MSAxNS42ODI1IDEyLjMxNTUgMTUuNzc0NSAxMi4zMDY1IDE1Ljg2NDlDMTIuMjg2NSAxNi4wNjIgMTIuMTYwMSAxNi4xNzE0IDExLjk3NDEgMTYuMTg1MUMxMS43OTU1IDE2LjE5ODMgMTEuNjQxMiAxNi4xMDU4IDExLjYxNjkgMTUuOTI1MUMxMS41ODczIDE1LjcwNTMgMTEuNTg4MyAxNS40NzcgMTEuNjEzMiAxNS4yNTY2QzExLjYzMzMgMTUuMDc5NSAxMS44MTk4IDE0Ljk1OTYgMTEuOTg0NyAxNC45ODU1QzEyLjE3MDIgMTUuMDE1MSAxMi4yOTE3IDE1LjEyMDggMTIuMzA4MSAxNS4zMTc0QzEyLjMxNTUgMTUuNDA4MyAxMi4zMDkyIDE1LjQ5OTcgMTIuMzA5MiAxNS41OTExSDEyLjMwODFaIiBmaWxsPSIjRDlEOUQ5Ii8+CjxwYXRoIGQ9Ik0xMy4wNDI3IDE1LjU3QzEzLjA0OSAxNS40NzIyIDEzLjA0NzQgMTUuMzcyOCAxMy4wNjM4IDE1LjI3NjdDMTMuMDk1IDE1LjA5MDYgMTMuMjI0NSAxNC45OTIzIDEzLjM5OTkgMTQuOTg2NUMxMy41NzcgMTQuOTgwNyAxMy43MjcgMTUuMDcyNyAxMy43NDg3IDE1LjI1NzFDMTMuNzc0MSAxNS40NzA2IDEzLjc3NTEgMTUuNjkxIDEzLjc1MTkgMTUuOTA0NUMxMy43MzIzIDE2LjA4NDcgMTMuNTU0OCAxNi4yMDg5IDEzLjM4OTkgMTYuMTg3N0MxMy4yMDQ0IDE2LjE2MzQgMTMuMDc3IDE2LjA2MyAxMy4wNTg1IDE1Ljg2NDhDMTMuMDQ5NSAxNS43Njc2IDEzLjA1NjkgMTUuNjY4OCAxMy4wNTY5IDE1LjU3MDVDMTMuMDUyMiAxNS41NzA1IDEzLjA0NzQgMTUuNTcwNSAxMy4wNDIxIDE1LjU3MDVMMTMuMDQyNyAxNS41N1oiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTE1LjIxODQgMTUuNTg1M0MxNS4yMTg0IDE1LjY4MzYgMTUuMjI3OSAxNS43ODI5IDE1LjIxNjMgMTUuODc5N0MxNS4xOTM2IDE2LjA2NjcgMTUuMDY4MyAxNi4xNzAzIDE0Ljg5MjMgMTYuMTg0NkMxNC43MTQyIDE2LjE5ODggMTQuNTU2MiAxNi4xMTE3IDE0LjUzMjQgMTUuOTI5OUMxNC41MDM0IDE1LjcwMzcgMTQuNTAzNCAxNS40NjggMTQuNTMyNCAxNS4yNDE4QzE0LjU1NTcgMTUuMDU5NSAxNC43MTQyIDE0Ljk3MjggMTQuODkxOCAxNC45ODcxQzE1LjA2NzIgMTUuMDAwOCAxNS4xOTM2IDE1LjEwNDQgMTUuMjE2MyAxNS4yOTE1QzE1LjIyNzkgMTUuMzg4MiAxNS4yMTg0IDE1LjQ4NzUgMTUuMjE4NCAxNS41ODU4VjE1LjU4NTNaIiBmaWxsPSIjRDlEOUQ5Ii8+CjxwYXRoIGQ9Ik0xMi4zMDc2IDIwLjQ1MDRDMTIuMzA3NiAyMC41NDE4IDEyLjMxNiAyMC42MzM4IDEyLjMwNiAyMC43MjQxQzEyLjI4MzggMjAuOTIwMiAxMi4xNTc1IDIxLjAyOTEgMTEuOTcwNCAyMS4wNDA3QzExLjc5MDcgMjEuMDUxOCAxMS42MzkxIDIwLjk1NjcgMTEuNjE1OCAyMC43NzY0QzExLjU4NzMgMjAuNTU2NiAxMS41ODc4IDIwLjMyNzggMTEuNjE0NyAyMC4xMDc5QzExLjYzNjkgMTkuOTI2MSAxMS43ODkxIDE5Ljg0MTEgMTEuOTY4MyAxOS44Mzk1QzEyLjE0MTYgMTkuODM3OSAxMi4yODU0IDE5Ljk3NTggMTIuMzA1NSAyMC4xNTZDMTIuMzE2IDIwLjI1MzMgMTIuMzA3NiAyMC4zNTIxIDEyLjMwNzYgMjAuNDUwNFoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTEzLjc4ODkgMjAuNDM4OEMxMy43NzU3IDIwLjU1NjYgMTMuNzc1NyAyMC42NzgyIDEzLjc0NTYgMjAuNzkxOEMxMy43MDA2IDIwLjk2MjUgMTMuNTY3NSAyMS4wNDg2IDEzLjM5ODQgMjEuMDQwN0MxMy4yMjEzIDIxLjAzMjggMTMuMDg1IDIwLjkzNSAxMy4wNjU0IDIwLjc0ODRDMTMuMDQ1OSAyMC41NjA4IDEzLjA0NjQgMjAuMzY5NSAxMy4wNTc1IDIwLjE4MTRDMTMuMDY5MSAxOS45ODExIDEzLjIwOTIgMTkuODQ5IDEzLjM5MTUgMTkuODM3NEMxMy41NzMzIDE5LjgyNTcgMTMuNzM2IDE5Ljk2MTYgMTMuNzY2NyAyMC4xNjQ1QzEzLjc3OTkgMjAuMjUzOCAxMy43Njg4IDIwLjM0NjMgMTMuNzY4OCAyMC40Mzc3QzEzLjc3NTcgMjAuNDM3NyAxMy43ODIgMjAuNDM4OCAxMy43ODg5IDIwLjQzOTNWMjAuNDM4OFoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTE1LjIxOTUgMjAuNDUwOUMxNS4yMTk1IDIwLjU0MjMgMTUuMjI3OSAyMC42MzQzIDE1LjIxNzkgMjAuNzI0MUMxNS4xOTU3IDIwLjkyMDcgMTUuMDY4OSAyMS4wMjkgMTQuODgxOCAyMS4wMzk2QzE0LjcwMjYgMjEuMDQ5NyAxNC41NTEgMjAuOTU2NiAxNC41Mjg4IDIwLjc3NDNDMTQuNTAxOCAyMC41NTQ1IDE0LjUwMjMgMjAuMzI2MiAxNC41Mjg4IDIwLjEwNThDMTQuNTUwNCAxOS45MjI0IDE0LjcwNDIgMTkuODMxIDE0Ljg4MTggMTkuODQwNUMxNS4wNjczIDE5Ljg1MDYgMTUuMTk3MyAxOS45NTc4IDE1LjIxODQgMjAuMTU1NUMxNS4yMjkgMjAuMjUyNyAxNS4yMiAyMC4zNTE1IDE1LjIyIDIwLjQ0OThMMTUuMjE5NSAyMC40NTA5WiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNMTIuMzA5NyAxMy4xNjdDMTIuMzA5NyAxMy4yNTEgMTIuMzE2IDEzLjMzNjEgMTIuMzA4NiAxMy40MTk2QzEyLjI4OTYgMTMuNjIxIDEyLjE1ODUgMTMuNzQ3OCAxMS45NzA5IDEzLjc1NTdDMTEuNzg0OSAxMy43NjM2IDExLjYyMzIgMTMuNjQ3NCAxMS42MDI2IDEzLjQ1MzRDMTEuNTgyIDEzLjI1OTUgMTEuNTgyNSAxMy4wNjAyIDExLjYwMiAxMi44NjU4QzExLjYyMTYgMTIuNjcxMyAxMS43ODE3IDEyLjU1NCAxMS45Njc3IDEyLjU2MDNDMTIuMTU1OSAxMi41NjY3IDEyLjI4OTEgMTIuNjkzIDEyLjMwODYgMTIuODkzMkMxMi4zMTcxIDEyLjk4MzYgMTIuMzEwMiAxMy4wNzU2IDEyLjMxMDcgMTMuMTY2NUwxMi4zMDk3IDEzLjE2N1oiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTEyLjMxMDIgMTguMDIwNUMxMi4zMTAyIDE4LjEwNDUgMTIuMzE2NSAxOC4xODk2IDEyLjMwOTEgMTguMjczMUMxMi4yOTA2IDE4LjQ3NDQgMTIuMTYwMSAxOC42MDE4IDExLjk3MjUgMTguNjEwOEMxMS43ODU0IDE4LjYxOTIgMTEuNjIzNyAxOC41MDQgMTEuNjAzMSAxOC4zMTA2QzExLjU4MiAxOC4xMTY3IDExLjU4MjUgMTcuOTE3NCAxMS42MDE1IDE3LjcyM0MxMS42MjA1IDE3LjUyODUgMTEuNzgwNyAxNy40MTAxIDExLjk2NjIgMTcuNDE1OUMxMi4xNTQ4IDE3LjQyMTcgMTIuMjg4NSAxNy41NDggMTIuMzA4MSAxNy43NDc4QzEyLjMxNzEgMTcuODM4MiAxMi4zMDk3IDE3LjkzMDEgMTIuMzA5NyAxOC4wMjFDMTIuMzA5NyAxOC4wMjEgMTIuMzA5NyAxOC4wMjEgMTIuMzEwMiAxOC4wMjFWMTguMDIwNVoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTE1LjIxODkgMTguMDI4OUMxNS4yMTg5IDE4LjExOTggMTUuMjI5IDE4LjIxMjMgMTUuMjE2OCAxOC4zMDIyQzE1LjE5MjUgMTguNDg1IDE1LjA4MiAxOC41OTIzIDE0Ljg5NzEgMTguNjA4MUMxNC43MTMyIDE4LjYyMzUgMTQuNTU5NCAxOC41NDE2IDE0LjUzNCAxOC4zNjI0QzE0LjUwMTggMTguMTM2NyAxNC40OTk3IDE3LjkwMDUgMTQuNTMwOCAxNy42NzQ5QzE0LjU1NjcgMTcuNDg2MiAxNC43MTM3IDE3LjM5ODUgMTQuOTA3NiAxNy40MTk2QzE1LjA5MTYgMTcuNDM5NyAxNS4xOTg4IDE3LjU1MTcgMTUuMjE4NCAxNy43MzUxQzE1LjIyOSAxNy44MzIzIDE1LjIyIDE3LjkzMTIgMTUuMjIgMTguMDI5NUMxNS4yMiAxOC4wMjk1IDE1LjIxOTQgMTguMDI5NSAxNS4yMTg5IDE4LjAyOTVWMTguMDI4OVoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTE1LjIyMSAxMy4xNTc1QzE1LjIyMSAxMy4yNDg0IDE1LjIyOSAxMy4zNDA4IDE1LjIxOTQgMTMuNDMwN0MxNS4xOTg4IDEzLjYyMzYgMTUuMDg3OSAxMy43Mzg4IDE0Ljg5MzQgMTMuNzUzNkMxNC42OTg0IDEzLjc2ODQgMTQuNTUxNSAxMy42NzE3IDE0LjUyNjEgMTMuNDgzQzE0LjQ5NzYgMTMuMjcwNiAxNC40OTgxIDEzLjA0ODEgMTQuNTI2MSAxMi44MzUxQzE0LjU1MDkgMTIuNjQ1OSAxNC42OTczIDEyLjU0OTIgMTQuODkyMyAxMi41NjI5QzE1LjA4NzMgMTIuNTc2NyAxNS4xOTg4IDEyLjY5MDggMTUuMjIgMTIuODg0M0MxNS4yMjk1IDEyLjk3NDEgMTUuMjIxNiAxMy4wNjY2IDE1LjIyMjEgMTMuMTU3NUgxNS4yMjFaIiBmaWxsPSIjRDlEOUQ5Ii8+CjxwYXRoIGQ9Ik0xMy43ODI1IDE4LjA0ODVDMTMuNzc1NyAxOC4xMTkzIDEzLjc3ODMgMTguMjMzNSAxMy43NTI0IDE4LjM0MTNDMTMuNzA3IDE4LjUyOTkgMTMuNTczOCAxOC42MjI5IDEzLjM4MDQgMTguNjA4MUMxMy4xOTU5IDE4LjU5MzkgMTMuMDc4MSAxOC40ODcxIDEzLjA2MjIgMTguMzAzMkMxMy4wNDY0IDE4LjEyMjUgMTMuMDQ1MyAxNy45Mzg2IDEzLjA1NjkgMTcuNzU3M0MxMy4wNzAyIDE3LjU1MTIgMTMuMjAyOCAxNy40MjY1IDEzLjM4OTQgMTcuNDE2NEMxMy41ODM4IDE3LjQwNTkgMTMuNzMyOSAxNy41Mjc0IDEzLjc2NzIgMTcuNzM1MUMxMy43ODIgMTcuODI0NCAxMy43NzczIDE3LjkxNjkgMTMuNzgzMSAxOC4wNDlMMTMuNzgyNSAxOC4wNDg1WiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNMTMuNzgzNiAxMy4xOTgyQzEzLjc3NTcgMTMuMjc0MyAxMy43NzczIDEzLjM4OSAxMy43NDk4IDEzLjQ5NTdDMTMuNzAzOCAxMy42NzM4IDEzLjU3NTkgMTMuNzY0MiAxMy4zOTE1IDEzLjc1NDFDMTMuMjA3IDEzLjc0NDEgMTMuMDgyOCAxMy42NDIxIDEzLjA2NDkgMTMuNDU4N0MxMy4wNDY0IDEzLjI3MTEgMTMuMDQ2NCAxMy4wODAzIDEzLjA1OTEgMTIuODkyMkMxMy4wNzI4IDEyLjY4ODcgMTMuMjEwNyAxMi41NjY3IDEzLjM5OTQgMTIuNTYxNEMxMy41ODc1IDEyLjU1NjEgMTMuNzI4NiAxMi42Njk3IDEzLjc2NCAxMi44Njk1QzEzLjc4MSAxMi45NjUxIDEzLjc3NjcgMTMuMDY1IDEzLjc4NDEgMTMuMTk4N0wxMy43ODM2IDEzLjE5ODJaIiBmaWxsPSIjRDlEOUQ5Ii8+CjxwYXRoIGQ9Ik01Ljc0NzIxIDMwLjI5NjVINC44NjE0MlYyOS45MzlINS43NDcyMUM1LjkxODc2IDI5LjkzOSA2LjA1NzY2IDI5LjkxMTYgNi4xNjM5MiAyOS44NTdDNi4yNzAxOSAyOS44MDIzIDYuMzQ3NjEgMjkuNzI2NCA2LjM5NjE5IDI5LjYyOTNDNi40NDYyOCAyOS41MzIxIDYuNDcxMzMgMjkuNDIxMyA2LjQ3MTMzIDI5LjI5NjhDNi40NzEzMyAyOS4xODMgNi40NDYyOCAyOS4wNzU5IDYuMzk2MTkgMjguOTc1OEM2LjM0NzYxIDI4Ljg3NTYgNi4yNzAxOSAyOC43OTUxIDYuMTYzOTIgMjguNzM0NEM2LjA1NzY2IDI4LjY3MjEgNS45MTg3NiAyOC42NDEgNS43NDcyMSAyOC42NDFINC45NjM4OVYzMS41OTY3SDQuNTI0NDFWMjguMjgxMkg1Ljc0NzIxQzUuOTk3NyAyOC4yODEyIDYuMjA5NDcgMjguMzI0NSA2LjM4MjUzIDI4LjQxMUM2LjU1NTU4IDI4LjQ5NzYgNi42ODY5IDI4LjYxNzUgNi43NzY0NiAyOC43NzA4QzYuODY2MDMgMjguOTIyNiA2LjkxMDgxIDI5LjA5NjQgNi45MTA4MSAyOS4yOTIzQzYuOTEwODEgMjkuNTA0OCA2Ljg2NjAzIDI5LjY4NjIgNi43NzY0NiAyOS44MzY1QzYuNjg2OSAyOS45ODY4IDYuNTU1NTggMzAuMTAxNCA2LjM4MjUzIDMwLjE4MDNDNi4yMDk0NyAzMC4yNTc4IDUuOTk3NyAzMC4yOTY1IDUuNzQ3MjEgMzAuMjk2NVpNOC40NzY0OCAzMS42NDIyQzguMzA0OTQgMzEuNjQyMiA4LjE0OTM0IDMxLjYxMzQgOC4wMDk2NyAzMS41NTU3QzcuODcxNTMgMzEuNDk2NSA3Ljc1MjM2IDMxLjQxMzggNy42NTIxNyAzMS4zMDc1QzcuNTUzNSAzMS4yMDEyIDcuNDc3NTkgMzEuMDc1MiA3LjQyNDQ2IDMwLjkyOTVDNy4zNzEzMyAzMC43ODM4IDcuMzQ0NzYgMzAuNjI0NCA3LjM0NDc2IDMwLjQ1MTNWMzAuMzU1N0M3LjM0NDc2IDMwLjE1NTMgNy4zNzQzNiAyOS45NzY5IDcuNDMzNTcgMjkuODIwNkM3LjQ5Mjc3IDI5LjY2MjcgNy41NzMyMyAyOS41MjkxIDcuNjc0OTQgMjkuNDE5OEM3Ljc3NjY1IDI5LjMxMDUgNy44OTIwMiAyOS4yMjc4IDguMDIxMDYgMjkuMTcxNkM4LjE1MDEgMjkuMTE1NCA4LjI4MzY5IDI5LjA4NzMgOC40MjE4MyAyOS4wODczQzguNTk3OTIgMjkuMDg3MyA4Ljc0OTczIDI5LjExNzcgOC44NzcyNSAyOS4xNzg0QzkuMDA2MjggMjkuMjM5MSA5LjExMTc5IDI5LjMyNDEgOS4xOTM3NyAyOS40MzM0QzkuMjc1NzQgMjkuNTQxMiA5LjMzNjQ2IDI5LjY2ODcgOS4zNzU5MyAyOS44MTZDOS40MTU0IDI5Ljk2MTcgOS40MzUxNCAzMC4xMjExIDkuNDM1MTQgMzAuMjk0MlYzMC40ODMySDcuNTk1MjRWMzAuMTM5M0g5LjAxMzg3VjMwLjEwNzVDOS4wMDc4IDI5Ljk5ODIgOC45ODUwMyAyOS44OTE5IDguOTQ1NTYgMjkuNzg4N0M4LjkwNzYxIDI5LjY4NTQgOC44NDY4OSAyOS42MDA0IDguNzYzMzkgMjkuNTMzNkM4LjY3OTkgMjkuNDY2OCA4LjU2NjA1IDI5LjQzMzQgOC40MjE4MyAyOS40MzM0QzguMzI2MTkgMjkuNDMzNCA4LjIzODE0IDI5LjQ1MzkgOC4xNTc2OSAyOS40OTQ5QzguMDc3MjMgMjkuNTM0NCA4LjAwODE2IDI5LjU5MzYgNy45NTA0NyAyOS42NzI1QzcuODkyNzggMjkuNzUxNSA3Ljg0OCAyOS44NDc5IDcuODE2MTIgMjkuOTYxN0M3Ljc4NDI0IDMwLjA3NTYgNy43NjgzIDMwLjIwNjkgNy43NjgzIDMwLjM1NTdWMzAuNDUxM0M3Ljc2ODMgMzAuNTY4MiA3Ljc4NDI0IDMwLjY3ODMgNy44MTYxMiAzMC43ODE1QzcuODQ5NTIgMzAuODgzMiA3Ljg5NzM0IDMwLjk3MjggNy45NTk1OCAzMS4wNTAyQzguMDIzMzQgMzEuMTI3NiA4LjEgMzEuMTg4MyA4LjE4OTU2IDMxLjIzMjRDOC4yODA2NSAzMS4yNzY0IDguMzgzODggMzEuMjk4NCA4LjQ5OTI1IDMxLjI5ODRDOC42NDgwMiAzMS4yOTg0IDguNzc0MDIgMzEuMjY4IDguODc3MjUgMzEuMjA3M0M4Ljk4MDQ4IDMxLjE0NjYgOS4wNzA4IDMxLjA2NTQgOS4xNDgyMiAzMC45NjM3TDkuNDAzMjYgMzEuMTY2M0M5LjM1MDEzIDMxLjI0NjggOS4yODI1NyAzMS4zMjM0IDkuMjAwNiAzMS4zOTYzQzkuMTE4NjIgMzEuNDY5MiA5LjAxNzY3IDMxLjUyODQgOC44OTc3NCAzMS41NzM5QzguNzc5MzMgMzEuNjE5NSA4LjYzODkxIDMxLjY0MjIgOC40NzY0OCAzMS42NDIyWk0xMS41NjEgMzIuNTQ0VjI5LjYwNjVMMTEuNTk3NCAyOS4xMzI5SDExLjk4NDVWMzIuNTQ0SDExLjU2MVpNOS45MDU1MiAzMC4zOTIxVjMwLjM0NDNDOS45MDU1MiAzMC4xNTYgOS45Mjc1MyAyOS45ODUzIDkuOTcxNTYgMjkuODMxOUMxMC4wMTU2IDI5LjY3NzEgMTAuMDgwMSAyOS41NDQzIDEwLjE2NTEgMjkuNDMzNEMxMC4yNTAxIDI5LjMyMjYgMTAuMzUyNiAyOS4yMzc2IDEwLjQ3MjUgMjkuMTc4NEMxMC41OTQgMjkuMTE3NyAxMC43MzIxIDI5LjA4NzMgMTAuODg3IDI5LjA4NzNDMTEuMDQxOCAyOS4wODczIDExLjE3NzcgMjkuMTE0NyAxMS4yOTQ2IDI5LjE2OTNDMTEuNDEzIDI5LjIyMjQgMTEuNTEzMiAyOS4zMDA2IDExLjU5NTEgMjkuNDAzOEMxMS42Nzg2IDI5LjUwNTYgMTEuNzQ0NyAyOS42Mjg1IDExLjc5MzIgMjkuNzcyN0MxMS44NDE4IDI5LjkxNyAxMS44NzUyIDMwLjA4MDEgMTEuODkzNCAzMC4yNjIzVjMwLjQ3MThDMTEuODc2NyAzMC42NTI1IDExLjg0NDEgMzAuODE0OSAxMS43OTU1IDMwLjk1OTFDMTEuNzQ2OSAzMS4xMDMzIDExLjY4MDkgMzEuMjI2MyAxMS41OTc0IDMxLjMyOEMxMS41MTU0IDMxLjQyOTcgMTEuNDE0NSAzMS41MDc5IDExLjI5NDYgMzEuNTYyNUMxMS4xNzYxIDMxLjYxNTcgMTEuMDM4OCAzMS42NDIyIDEwLjg4MjQgMzEuNjQyMkMxMC43MzA2IDMxLjY0MjIgMTAuNTk0IDMxLjYxMTEgMTAuNDcyNSAzMS41NDg5QzEwLjM1MjYgMzEuNDg2NiAxMC4yNTAxIDMxLjM5OTMgMTAuMTY1MSAzMS4yODdDMTAuMDgxNiAzMS4xNzQ3IDEwLjAxNzEgMzEuMDQyNiA5Ljk3MTU2IDMwLjg5MDhDOS45Mjc1MyAzMC43Mzc1IDkuOTA1NTIgMzAuNTcxMiA5LjkwNTUyIDMwLjM5MjFaTTEwLjMyOTEgMzAuMzQ0M1YzMC4zOTIxQzEwLjMyOTEgMzAuNTE1MSAxMC4zNDIgMzAuNjMxMiAxMC4zNjc4IDMwLjc0MDVDMTAuMzkzNiAzMC44NDgzIDEwLjQzMyAzMC45NDM5IDEwLjQ4NjIgMzEuMDI3NEMxMC41NDA4IDMxLjExMDkgMTAuNjA5MSAzMS4xNzY5IDEwLjY5MTEgMzEuMjI1NUMxMC43NzQ2IDMxLjI3MjYgMTAuODczMyAzMS4yOTYxIDEwLjk4NzEgMzEuMjk2MUMxMS4xMjY4IDMxLjI5NjEgMTEuMjQyOSAzMS4yNjU4IDExLjMzNTUgMzEuMjA1QzExLjQyOTcgMzEuMTQ0MyAxMS41MDQ4IDMxLjA2NDYgMTEuNTYxIDMwLjk2NTlDMTEuNjE3MSAzMC44NjU3IDExLjY2MDQgMzAuNzU4NyAxMS42OTA4IDMwLjY0NDlWMzAuMDk2MUMxMS42NzQxIDMwLjAxMjYgMTEuNjQ3NSAyOS45MzE0IDExLjYxMTEgMjkuODUyNEMxMS41NzYyIDI5Ljc3MzUgMTEuNTMwNiAyOS43MDI5IDExLjQ3NDQgMjkuNjQwN0MxMS40MTgzIDI5LjU3NjkgMTEuMzUgMjkuNTI2OCAxMS4yNjk1IDI5LjQ5MDRDMTEuMTkwNiAyOS40NTI0IDExLjA5OCAyOS40MzM0IDEwLjk5MTcgMjkuNDMzNEMxMC44NzYzIDI5LjQzMzQgMTAuNzc2OSAyOS40NTc3IDEwLjY5MzQgMjkuNTA2M0MxMC42MDk5IDI5LjU1NDkgMTAuNTQwOCAyOS42MjE3IDEwLjQ4NjIgMjkuNzA2N0MxMC40MzMgMjkuNzkwMiAxMC4zOTM2IDI5Ljg4NjYgMTAuMzY3OCAyOS45OTU5QzEwLjM0MiAzMC4xMDUyIDEwLjMyOTEgMzAuMjIxMyAxMC4zMjkxIDMwLjM0NDNaTTE0LjI1MTUgMzEuMDI3NFYyOS4xMzI5SDE0LjY3NTFWMzEuNTk2N0gxNC4yNzJMMTQuMjUxNSAzMS4wMjc0Wk0xNC4zMzEyIDMwLjUwODJMMTQuNTA2NiAzMC41MDM3QzE0LjUwNjYgMzAuNjY3NiAxNC40ODkxIDMwLjgxOTQgMTQuNDU0MiAzMC45NTkxQzE0LjQyMDggMzEuMDk3MiAxNC4zNjYxIDMxLjIxNzIgMTQuMjkwMiAzMS4zMTg5QzE0LjIxNDMgMzEuNDIwNiAxNC4xMTQ5IDMxLjUwMDMgMTMuOTkxOSAzMS41NThDMTMuODY5IDMxLjYxNDEgMTMuNzE5NCAzMS42NDIyIDEzLjU0MzMgMzEuNjQyMkMxMy40MjM0IDMxLjY0MjIgMTMuMzEzNCAzMS42MjQ4IDEzLjIxMzIgMzEuNTg5OUMxMy4xMTQ1IDMxLjU1NDkgMTMuMDI5NSAzMS41MDExIDEyLjk1ODEgMzEuNDI4MkMxMi44ODY4IDMxLjM1NTMgMTIuODMxNCAzMS4yNjA0IDEyLjc5MTkgMzEuMTQzNUMxMi43NTQgMzEuMDI2NyAxMi43MzUgMzAuODg2MiAxMi43MzUgMzAuNzIyM1YyOS4xMzI5SDEzLjE1NjJWMzAuNzI2OEMxMy4xNTYyIDMwLjgzNzcgMTMuMTY4NCAzMC45Mjk1IDEzLjE5MjcgMzEuMDAyNEMxMy4yMTg1IDMxLjA3MzcgMTMuMjUyNiAzMS4xMzA2IDEzLjI5NTEgMzEuMTczMkMxMy4zMzkyIDMxLjIxNDEgMTMuMzg3NyAzMS4yNDMgMTMuNDQwOSAzMS4yNTk3QzEzLjQ5NTUgMzEuMjc2NCAxMy41NTE3IDMxLjI4NDcgMTMuNjA5NCAzMS4yODQ3QzEzLjc4ODUgMzEuMjg0NyAxMy45MzA1IDMxLjI1MDYgMTQuMDM1MiAzMS4xODIzQzE0LjEzOTkgMzEuMTEyNCAxNC4yMTUxIDMxLjAxOTEgMTQuMjYwNiAzMC45MDIyQzE0LjMwNzcgMzAuNzgzOCAxNC4zMzEyIDMwLjY1MjUgMTQuMzMxMiAzMC41MDgyWk0xNi40MjI5IDMxLjY0MjJDMTYuMjUxNCAzMS42NDIyIDE2LjA5NTggMzEuNjEzNCAxNS45NTYxIDMxLjU1NTdDMTUuODE4IDMxLjQ5NjUgMTUuNjk4OCAzMS40MTM4IDE1LjU5ODYgMzEuMzA3NUMxNS40OTk5IDMxLjIwMTIgMTUuNDI0IDMxLjA3NTIgMTUuMzcwOSAzMC45Mjk1QzE1LjMxNzcgMzAuNzgzOCAxNS4yOTEyIDMwLjYyNDQgMTUuMjkxMiAzMC40NTEzVjMwLjM1NTdDMTUuMjkxMiAzMC4xNTUzIDE1LjMyMDggMjkuOTc2OSAxNS4zOCAyOS44MjA2QzE1LjQzOTIgMjkuNjYyNyAxNS41MTk3IDI5LjUyOTEgMTUuNjIxNCAyOS40MTk4QzE1LjcyMzEgMjkuMzEwNSAxNS44Mzg0IDI5LjIyNzggMTUuOTY3NSAyOS4xNzE2QzE2LjA5NjUgMjkuMTE1NCAxNi4yMzAxIDI5LjA4NzMgMTYuMzY4MiAyOS4wODczQzE2LjU0NDMgMjkuMDg3MyAxNi42OTYyIDI5LjExNzcgMTYuODIzNyAyOS4xNzg0QzE2Ljk1MjcgMjkuMjM5MSAxNy4wNTgyIDI5LjMyNDEgMTcuMTQwMiAyOS40MzM0QzE3LjIyMjIgMjkuNTQxMiAxNy4yODI5IDI5LjY2ODcgMTcuMzIyNCAyOS44MTZDMTcuMzYxOCAyOS45NjE3IDE3LjM4MTYgMzAuMTIxMSAxNy4zODE2IDMwLjI5NDJWMzAuNDgzMkgxNS41NDE3VjMwLjEzOTNIMTYuOTYwM1YzMC4xMDc1QzE2Ljk1NDIgMjkuOTk4MiAxNi45MzE1IDI5Ljg5MTkgMTYuODkyIDI5Ljc4ODdDMTYuODU0IDI5LjY4NTQgMTYuNzkzMyAyOS42MDA0IDE2LjcwOTggMjkuNTMzNkMxNi42MjYzIDI5LjQ2NjggMTYuNTEyNSAyOS40MzM0IDE2LjM2ODIgMjkuNDMzNEMxNi4yNzI2IDI5LjQzMzQgMTYuMTg0NiAyOS40NTM5IDE2LjEwNDEgMjkuNDk0OUMxNi4wMjM2IDI5LjUzNDQgMTUuOTU0NiAyOS41OTM2IDE1Ljg5NjkgMjkuNjcyNUMxNS44MzkyIDI5Ljc1MTUgMTUuNzk0NCAyOS44NDc5IDE1Ljc2MjUgMjkuOTYxN0MxNS43MzA3IDMwLjA3NTYgMTUuNzE0NyAzMC4yMDY5IDE1LjcxNDcgMzAuMzU1N1YzMC40NTEzQzE1LjcxNDcgMzAuNTY4MiAxNS43MzA3IDMwLjY3ODMgMTUuNzYyNSAzMC43ODE1QzE1Ljc5NTkgMzAuODgzMiAxNS44NDM4IDMwLjk3MjggMTUuOTA2IDMxLjA1MDJDMTUuOTY5OCAzMS4xMjc2IDE2LjA0NjQgMzEuMTg4MyAxNi4xMzYgMzEuMjMyNEMxNi4yMjcxIDMxLjI3NjQgMTYuMzMwMyAzMS4yOTg0IDE2LjQ0NTcgMzEuMjk4NEMxNi41OTQ0IDMxLjI5ODQgMTYuNzIwNCAzMS4yNjggMTYuODIzNyAzMS4yMDczQzE2LjkyNjkgMzEuMTQ2NiAxNy4wMTcyIDMxLjA2NTQgMTcuMDk0NiAzMC45NjM3TDE3LjM0OTcgMzEuMTY2M0MxNy4yOTY1IDMxLjI0NjggMTcuMjI5IDMxLjMyMzQgMTcuMTQ3IDMxLjM5NjNDMTcuMDY1IDMxLjQ2OTIgMTYuOTY0MSAzMS41Mjg0IDE2Ljg0NDIgMzEuNTczOUMxNi43MjU4IDMxLjYxOTUgMTYuNTg1MyAzMS42NDIyIDE2LjQyMjkgMzEuNjQyMlpNMTguMzc4IDI5LjY1ODlWMzEuNTk2N0gxNy45NTY3VjI5LjEzMjlIMTguMzU1MkwxOC4zNzggMjkuNjU4OVpNMTguMjc3OCAzMC4yNzE0TDE4LjEwMjQgMzAuMjY0NkMxOC4xMDM5IDMwLjA5NjEgMTguMTI5IDI5Ljk0MDUgMTguMTc3NiAyOS43OTc4QzE4LjIyNjEgMjkuNjUzNiAxOC4yOTQ1IDI5LjUyODMgMTguMzgyNSAyOS40MjIxQzE4LjQ3MDYgMjkuMzE1OCAxOC41NzUzIDI5LjIzMzggMTguNjk2NyAyOS4xNzYxQzE4LjgxOTcgMjkuMTE2OSAxOC45NTU2IDI5LjA4NzMgMTkuMTA0MyAyOS4wODczQzE5LjIyNTggMjkuMDg3MyAxOS4zMzUxIDI5LjEwNCAxOS40MzIyIDI5LjEzNzRDMTkuNTI5NCAyOS4xNjkzIDE5LjYxMjEgMjkuMjIwOSAxOS42ODA1IDI5LjI5MjNDMTkuNzUwMyAyOS4zNjM2IDE5LjgwMzQgMjkuNDU2MiAxOS44Mzk4IDI5LjU3MDFDMTkuODc2MyAyOS42ODI0IDE5Ljg5NDUgMjkuODE5OCAxOS44OTQ1IDI5Ljk4MjJWMzEuNTk2N0gxOS40NzFWMjkuOTc3N0MxOS40NzEgMjkuODQ4NiAxOS40NTIgMjkuNzQ1NCAxOS40MTQgMjkuNjY4QzE5LjM3NjEgMjkuNTg5IDE5LjMyMDcgMjkuNTMyMSAxOS4yNDc4IDI5LjQ5NzJDMTkuMTc0OSAyOS40NjA4IDE5LjA4NTQgMjkuNDQyNiAxOC45NzkxIDI5LjQ0MjZDMTguODc0NCAyOS40NDI2IDE4Ljc3ODcgMjkuNDY0NiAxOC42OTIyIDI5LjUwODZDMTguNjA3MiAyOS41NTI2IDE4LjUzMzYgMjkuNjEzMyAxOC40NzEzIDI5LjY5MDhDMTguNDEwNiAyOS43NjgyIDE4LjM2MjggMjkuODU3IDE4LjMyNzkgMjkuOTU3MkMxOC4yOTQ1IDMwLjA1NTkgMTguMjc3OCAzMC4xNjA2IDE4LjI3NzggMzAuMjcxNFpNMTkuNDY0MSAyOC4xNDQ2TDE5Ljc0ODggMjguMTY5N0MxOS43NDg4IDI4LjI4MDUgMTkuNzI2OCAyOC4zNzc2IDE5LjY4MjcgMjguNDYxMUMxOS42Mzg3IDI4LjU0NDYgMTkuNTc5NSAyOC42MDkxIDE5LjUwNTEgMjguNjU0N0MxOS40MzIyIDI4LjcwMDIgMTkuMzQ5NSAyOC43MjMgMTkuMjU2OSAyOC43MjNDMTkuMTc5NSAyOC43MjMgMTkuMTE1NyAyOC43MTI0IDE5LjA2NTYgMjguNjkxMUMxOS4wMTU1IDI4LjY2ODMgMTguOTcwOCAyOC42NDMzIDE4LjkzMTMgMjguNjE2QzE4Ljg5MTggMjguNTg3MSAxOC44NTAxIDI4LjU2MjEgMTguODA2IDI4LjU0MDhDMTguNzYzNSAyOC41MTgxIDE4LjcxMDQgMjguNTA2NyAxOC42NDY2IDI4LjUwNjdDMTguNTgyOSAyOC41MDY3IDE4LjUyOSAyOC41MzEgMTguNDg1IDI4LjU3OTVDMTguNDQyNSAyOC42MjgxIDE4LjQyMTIgMjguNjg4MSAxOC40MjEyIDI4Ljc1OTRMMTguMTM2NiAyOC43NDU4QzE4LjEzNjYgMjguNjM0OSAxOC4xNTc4IDI4LjUzNzggMTguMjAwMyAyOC40NTQzQzE4LjI0NDQgMjguMzY5MyAxOC4zMDM2IDI4LjMwMzIgMTguMzc4IDI4LjI1NjJDMTguNDUyMyAyOC4yMDc2IDE4LjUzNTEgMjguMTgzMyAxOC42MjYyIDI4LjE4MzNDMTguNjkxNCAyOC4xODMzIDE4Ljc0ODQgMjguMTk0NyAxOC43OTY5IDI4LjIxNzVDMTguODQ3IDI4LjIzODcgMTguODk0MSAyOC4yNjM4IDE4LjkzODEgMjguMjkyNkMxOC45ODIxIDI4LjMxOTkgMTkuMDI3NyAyOC4zNDUgMTkuMDc0NyAyOC4zNjc4QzE5LjEyMTggMjguMzg5IDE5LjE3NTcgMjguMzk5NiAxOS4yMzY0IDI4LjM5OTZDMTkuMzAwMiAyOC4zOTk2IDE5LjM1NDEgMjguMzc1NCAxOS4zOTgxIDI4LjMyNjhDMTkuNDQyMSAyOC4yNzY3IDE5LjQ2NDEgMjguMjE2IDE5LjQ2NDEgMjguMTQ0NlpNMjIuMDcwNCAzMS4xNzU0VjI5LjkwNzFDMjIuMDcwNCAyOS44MDk5IDIyLjA1MDcgMjkuNzI1NyAyMi4wMTEyIDI5LjY1NDNDMjEuOTczMyAyOS41ODE1IDIxLjkxNTYgMjkuNTI1MyAyMS44MzgyIDI5LjQ4NThDMjEuNzYwNyAyOS40NDY0IDIxLjY2NTEgMjkuNDI2NiAyMS41NTEzIDI5LjQyNjZDMjEuNDQ1IDI5LjQyNjYgMjEuMzUxNiAyOS40NDQ4IDIxLjI3MTIgMjkuNDgxM0MyMS4xOTIyIDI5LjUxNzcgMjEuMTMgMjkuNTY1NSAyMS4wODQ0IDI5LjYyNDdDMjEuMDQwNCAyOS42ODM5IDIxLjAxODQgMjkuNzQ3NyAyMS4wMTg0IDI5LjgxNkgyMC41OTcxQzIwLjU5NzEgMjkuNzI4IDIwLjYxOTkgMjkuNjQwNyAyMC42NjU1IDI5LjU1NDFDMjAuNzExIDI5LjQ2NzYgMjAuNzc2MyAyOS4zODk0IDIwLjg2MTMgMjkuMzE5NkMyMC45NDc4IDI5LjI0ODIgMjEuMDUxIDI5LjE5MjEgMjEuMTcxIDI5LjE1MTFDMjEuMjkyNCAyOS4xMDg2IDIxLjQyNzUgMjkuMDg3MyAyMS41NzYzIDI5LjA4NzNDMjEuNzU1NCAyOS4wODczIDIxLjkxMzMgMjkuMTE3NyAyMi4wNDk5IDI5LjE3ODRDMjIuMTg4MSAyOS4yMzkxIDIyLjI5NTkgMjkuMzMxIDIyLjM3MzMgMjkuNDUzOUMyMi40NTIyIDI5LjU3NTQgMjIuNDkxNyAyOS43MjggMjIuNDkxNyAyOS45MTE2VjMxLjA1OTNDMjIuNDkxNyAzMS4xNDEzIDIyLjQ5ODUgMzEuMjI4NiAyMi41MTIyIDMxLjMyMTJDMjIuNTI3NCAzMS40MTM4IDIyLjU0OTQgMzEuNDkzNSAyMi41NzgyIDMxLjU2MDNWMzEuNTk2N0gyMi4xMzg3QzIyLjExNzUgMzEuNTQ4MSAyMi4xMDA4IDMxLjQ4MzYgMjIuMDg4NiAzMS40MDMxQzIyLjA3NjUgMzEuMzIxMiAyMi4wNzA0IDMxLjI0NTMgMjIuMDcwNCAzMS4xNzU0Wk0yMi4xNDMzIDMwLjEwMjlMMjIuMTQ3OSAzMC4zOTg5SDIxLjcyMkMyMS42MDIxIDMwLjM5ODkgMjEuNDk1MSAzMC40MDg4IDIxLjQwMSAzMC40Mjg1QzIxLjMwNjggMzAuNDQ2OCAyMS4yMjc5IDMwLjQ3NDggMjEuMTY0MSAzMC41MTI4QzIxLjEwMDQgMzAuNTUwNyAyMS4wNTE4IDMwLjU5ODYgMjEuMDE4NCAzMC42NTYyQzIwLjk4NSAzMC43MTI0IDIwLjk2ODMgMzAuNzc4NSAyMC45NjgzIDMwLjg1NDRDMjAuOTY4MyAzMC45MzE4IDIwLjk4NTggMzEuMDAyNCAyMS4wMjA3IDMxLjA2NjFDMjEuMDU1NiAzMS4xMjk5IDIxLjEwOCAzMS4xODA3IDIxLjE3NzggMzEuMjE4N0MyMS4yNDkyIDMxLjI1NTEgMjEuMzM2NCAzMS4yNzMzIDIxLjQzOTcgMzEuMjczM0MyMS41Njg3IDMxLjI3MzMgMjEuNjgyNiAzMS4yNDYgMjEuNzgxMiAzMS4xOTE0QzIxLjg3OTkgMzEuMTM2NyAyMS45NTgxIDMxLjA2OTkgMjIuMDE1OCAzMC45OTFDMjIuMDc1IDMwLjkxMiAyMi4xMDY5IDMwLjgzNTQgMjIuMTExNCAzMC43NjFMMjIuMjkxMyAzMC45NjM3QzIyLjI4MDcgMzEuMDI3NCAyMi4yNTE4IDMxLjA5OCAyMi4yMDQ4IDMxLjE3NTRDMjIuMTU3NyAzMS4yNTI4IDIyLjA5NDcgMzEuMzI3MiAyMi4wMTU4IDMxLjM5ODZDMjEuOTM4NCAzMS40Njg0IDIxLjg0NTggMzEuNTI2OSAyMS43MzggMzEuNTczOUMyMS42MzE3IDMxLjYxOTUgMjEuNTExOCAzMS42NDIyIDIxLjM3ODIgMzEuNjQyMkMyMS4yMTEyIDMxLjY0MjIgMjEuMDY0NyAzMS42MDk2IDIwLjkzODcgMzEuNTQ0M0MyMC44MTQyIDMxLjQ3OSAyMC43MTcxIDMxLjM5MTggMjAuNjQ3MiAzMS4yODI1QzIwLjU3ODkgMzEuMTcxNiAyMC41NDQ4IDMxLjA0NzkgMjAuNTQ0OCAzMC45MTEzQzIwLjU0NDggMzAuNzc5MiAyMC41NzA2IDMwLjY2MzEgMjAuNjIyMiAzMC41NjI5QzIwLjY3MzggMzAuNDYxMiAyMC43NDgyIDMwLjM3NjkgMjAuODQ1NCAzMC4zMTAxQzIwLjk0MjUgMzAuMjQxOCAyMS4wNTk0IDMwLjE5MDIgMjEuMTk2IDMwLjE1NTNDMjEuMzMyNiAzMC4xMjA0IDIxLjQ4NTIgMzAuMTAyOSAyMS42NTM3IDMwLjEwMjlIMjIuMTQzM1pNNi41NzE1MiAzNi4yMzkyVjM2LjU5NjdINC44MTU4OFYzNi4yMzkySDYuNTcxNTJaTTQuOTA0NjkgMzMuMjgxMlYzNi41OTY3SDQuNDY1MjFWMzMuMjgxMkg0LjkwNDY5Wk02LjMzOTI2IDM0LjcwNjdWMzUuMDY0Mkg0LjgxNTg4VjM0LjcwNjdINi4zMzkyNlpNNi41NDg3NSAzMy4yODEyVjMzLjY0MUg0LjgxNTg4VjMzLjI4MTJINi41NDg3NVpNNy41NTQyNSAzNC42MjI0VjM2LjU5NjdINy4xMzA3MVYzNC4xMzI5SDcuNTMxNDhMNy41NTQyNSAzNC42MjI0Wk03LjQ2NzcyIDM1LjI3MTRMNy4yNzE4OSAzNS4yNjQ2QzcuMjczNDEgMzUuMDk2MSA3LjI5NTQyIDM0Ljk0MDUgNy4zMzc5MyAzNC43OTc4QzcuMzgwNDQgMzQuNjUzNiA3LjQ0MzQ0IDM0LjUyODMgNy41MjY5MyAzNC40MjIxQzcuNjEwNDIgMzQuMzE1OCA3LjcxNDQxIDM0LjIzMzggNy44Mzg4OSAzNC4xNzYxQzcuOTYzMzcgMzQuMTE2OSA4LjEwNzU5IDM0LjA4NzMgOC4yNzE1NCAzNC4wODczQzguMzg2OTEgMzQuMDg3MyA4LjQ5MzE4IDM0LjEwNCA4LjU5MDMzIDM0LjEzNzRDOC42ODc0OSAzNC4xNjkzIDguNzcxNzQgMzQuMjIwMiA4Ljg0MzA5IDM0LjI5QzguOTE0NDQgMzQuMzU5OCA4Ljk2OTg1IDM0LjQ0OTQgOS4wMDkzMiAzNC41NTg3QzkuMDQ4NzkgMzQuNjY4IDkuMDY4NTIgMzQuODAwMSA5LjA2ODUyIDM0Ljk1NDlWMzYuNTk2N0g4LjY0NzI2VjM0Ljk3NTRDOC42NDcyNiAzNC44NDY0IDguNjI1MjUgMzQuNzQzMSA4LjU4MTIzIDM0LjY2NTdDOC41Mzg3MiAzNC41ODgzIDguNDc4IDM0LjUzMjEgOC4zOTkwNiAzNC40OTcyQzguMzIwMTIgMzQuNDYwOCA4LjIyNzUyIDM0LjQ0MjYgOC4xMjEyNSAzNC40NDI2QzcuOTk2NzcgMzQuNDQyNiA3Ljg5Mjc4IDM0LjQ2NDYgNy44MDkyOSAzNC41MDg2QzcuNzI1OCAzNC41NTI2IDcuNjU5IDM0LjYxMzMgNy42MDg5IDM0LjY5MDhDNy41NTg4MSAzNC43NjgyIDcuNTIyMzcgMzQuODU3IDcuNDk5NiAzNC45NTcyQzcuNDc4MzUgMzUuMDU1OSA3LjQ2NzcyIDM1LjE2MDYgNy40Njc3MiAzNS4yNzE0Wk05LjA2Mzk3IDM1LjAzOTJMOC43ODE2MSAzNS4xMjU3QzguNzgzMTMgMzQuOTkwNiA4LjgwNTE0IDM0Ljg2MDggOC44NDc2NSAzNC43MzYzQzguODkxNjcgMzQuNjExOCA4Ljk1NDY3IDM0LjUwMSA5LjAzNjY0IDM0LjQwMzhDOS4xMjAxNCAzNC4zMDY3IDkuMjIyNjEgMzQuMjMgOS4zNDQwNSAzNC4xNzM5QzkuNDY1NSAzNC4xMTYyIDkuNjA0NCAzNC4wODczIDkuNzYwNzYgMzQuMDg3M0M5Ljg5MjgzIDM0LjA4NzMgMTAuMDA5NyAzNC4xMDQ4IDEwLjExMTQgMzQuMTM5N0MxMC4yMTQ3IDM0LjE3NDYgMTAuMzAxMiAzNC4yMjg1IDEwLjM3MSAzNC4zMDE0QzEwLjQ0MjQgMzQuMzcyNyAxMC40OTYzIDM0LjQ2NDYgMTAuNTMyNyAzNC41NzY5QzEwLjU2OTEgMzQuNjg5MiAxMC41ODczIDM0LjgyMjggMTAuNTg3MyAzNC45Nzc3VjM2LjU5NjdIMTAuMTYzOFYzNC45NzMxQzEwLjE2MzggMzQuODM1IDEwLjE0MTggMzQuNzI4IDEwLjA5NzggMzQuNjUyQzEwLjA1NTMgMzQuNTc0NiA5Ljk5NDU0IDM0LjUyMDcgOS45MTU2IDM0LjQ5MDRDOS44MzgxOCAzNC40NTg1IDkuNzQ1NTggMzQuNDQyNiA5LjYzNzggMzQuNDQyNkM5LjU0NTIgMzQuNDQyNiA5LjQ2MzIyIDM0LjQ1ODUgOS4zOTE4NyAzNC40OTA0QzkuMzIwNTIgMzQuNTIyMyA5LjI2MDU2IDM0LjU2NjMgOS4yMTE5OCAzNC42MjI0QzkuMTYzNCAzNC42NzcxIDkuMTI2MjEgMzQuNzQwMSA5LjEwMDQgMzQuODExNEM5LjA3NjExIDM0Ljg4MjggOS4wNjM5NyAzNC45NTg3IDkuMDYzOTcgMzUuMDM5MlpNMTEuNzI5NSAzNC42MDY1VjM3LjU0NEgxMS4zMDU5VjM0LjEzMjlIMTEuNjkzTDExLjcyOTUgMzQuNjA2NVpNMTMuMzg5NSAzNS4zNDQzVjM1LjM5MjFDMTMuMzg5NSAzNS41NzEyIDEzLjM2ODIgMzUuNzM3NSAxMy4zMjU3IDM1Ljg5MDhDMTMuMjgzMiAzNi4wNDI2IDEzLjIyMSAzNi4xNzQ3IDEzLjEzOSAzNi4yODdDMTMuMDU4NSAzNi4zOTkzIDEyLjk1OTEgMzYuNDg2NiAxMi44NDA3IDM2LjU0ODlDMTIuNzIyMyAzNi42MTExIDEyLjU4NjQgMzYuNjQyMiAxMi40MzMxIDM2LjY0MjJDMTIuMjc2NyAzNi42NDIyIDEyLjEzODYgMzYuNjE2NCAxMi4wMTg3IDM2LjU2NDhDMTEuODk4NyAzNi41MTMyIDExLjc5NyAzNi40MzgxIDExLjcxMzUgMzYuMzM5NEMxMS42MyAzNi4yNDA3IDExLjU2MzIgMzYuMTIyMyAxMS41MTMyIDM1Ljk4NDJDMTEuNDY0NiAzNS44NDYgMTEuNDMxMiAzNS42OTA0IDExLjQxMyAzNS41MTczVjM1LjI2MjNDMTEuNDMxMiAzNS4wODAxIDExLjQ2NTMgMzQuOTE3IDExLjUxNTQgMzQuNzcyN0MxMS41NjU1IDM0LjYyODUgMTEuNjMxNiAzNC41MDU2IDExLjcxMzUgMzQuNDAzOEMxMS43OTcgMzQuMzAwNiAxMS44OTggMzQuMjIyNCAxMi4wMTY0IDM0LjE2OTNDMTIuMTM0OCAzNC4xMTQ3IDEyLjI3MTQgMzQuMDg3MyAxMi40MjYzIDM0LjA4NzNDMTIuNTgxMSAzNC4wODczIDEyLjcxODUgMzQuMTE3NyAxMi44Mzg0IDM0LjE3ODRDMTIuOTU4MyAzNC4yMzc2IDEzLjA1OTMgMzQuMzIyNiAxMy4xNDEzIDM0LjQzMzRDMTMuMjIzMyAzNC41NDQzIDEzLjI4NDcgMzQuNjc3MSAxMy4zMjU3IDM0LjgzMTlDMTMuMzY4MiAzNC45ODUzIDEzLjM4OTUgMzUuMTU2IDEzLjM4OTUgMzUuMzQ0M1pNMTIuOTY1OSAzNS4zOTIxVjM1LjM0NDNDMTIuOTY1OSAzNS4yMjEzIDEyLjk1MyAzNS4xMDYgMTIuOTI3MiAzNC45OTgyQzEyLjkwMTQgMzQuODg4OSAxMi44NjEyIDM0Ljc5MzIgMTIuODA2NSAzNC43MTEzQzEyLjc1MzQgMzQuNjI3OCAxMi42ODUxIDM0LjU2MjUgMTIuNjAxNiAzNC41MTU0QzEyLjUxODEgMzQuNDY2OCAxMi40MTg3IDM0LjQ0MjYgMTIuMzAzMyAzNC40NDI2QzEyLjE5NyAzNC40NDI2IDEyLjEwNDQgMzQuNDYwOCAxMi4wMjU1IDM0LjQ5NzJDMTEuOTQ4MSAzNC41MzM2IDExLjg4MiAzNC41ODMgMTEuODI3NCAzNC42NDUyQzExLjc3MjcgMzQuNzA1OSAxMS43MjggMzQuNzc1OCAxMS42OTMgMzQuODU0N0MxMS42NTk2IDM0LjkzMjEgMTEuNjM0NiAzNS4wMTI2IDExLjYxNzkgMzUuMDk2MVYzNS42ODU5QzExLjY0ODMgMzUuNzkyMSAxMS42OTA4IDM1Ljg5MjMgMTEuNzQ1NCAzNS45ODY0QzExLjgwMDEgMzYuMDc5IDExLjg3MjkgMzYuMTU0MiAxMS45NjQgMzYuMjExOUMxMi4wNTUxIDM2LjI2OCAxMi4xNjk3IDM2LjI5NjEgMTIuMzA3OSAzNi4yOTYxQzEyLjQyMTcgMzYuMjk2MSAxMi41MTk2IDM2LjI3MjYgMTIuNjAxNiAzNi4yMjU1QzEyLjY4NTEgMzYuMTc2OSAxMi43NTM0IDM2LjExMDkgMTIuODA2NSAzNi4wMjc0QzEyLjg2MTIgMzUuOTQzOSAxMi45MDE0IDM1Ljg0ODMgMTIuOTI3MiAzNS43NDA1QzEyLjk1MyAzNS42MzEyIDEyLjk2NTkgMzUuNTE1MSAxMi45NjU5IDM1LjM5MjFaTTE0LjQzMTQgMzQuNTJWMzYuNTk2N0gxNC4wMTAyVjM0LjEzMjlIMTQuNDJMMTQuNDMxNCAzNC41MlpNMTUuMjAxMSAzNC4xMTkyTDE1LjE5ODggMzQuNTEwOUMxNS4xNjM5IDM0LjUwMzMgMTUuMTMwNSAzNC40OTg3IDE1LjA5ODYgMzQuNDk3MkMxNS4wNjgyIDM0LjQ5NDIgMTUuMDMzMyAzNC40OTI3IDE0Ljk5MzkgMzQuNDkyN0MxNC44OTY3IDM0LjQ5MjcgMTQuODEwOSAzNC41MDc4IDE0LjczNjUgMzQuNTM4MkMxNC42NjIyIDM0LjU2ODYgMTQuNTk5MiAzNC42MTExIDE0LjU0NzUgMzQuNjY1N0MxNC40OTU5IDM0LjcyMDQgMTQuNDU0OSAzNC43ODU2IDE0LjQyNDYgMzQuODYxNUMxNC4zOTU3IDM0LjkzNTkgMTQuMzc2OCAzNS4wMTc5IDE0LjM2NzcgMzUuMTA3NUwxNC4yNDkyIDM1LjE3NThDMTQuMjQ5MiAzNS4wMjcgMTQuMjYzNyAzNC44ODczIDE0LjI5MjUgMzQuNzU2OEMxNC4zMjI5IDM0LjYyNjIgMTQuMzY5MiAzNC41MTA5IDE0LjQzMTQgMzQuNDEwN0MxNC40OTM3IDM0LjMwOSAxNC41NzI2IDM0LjIzIDE0LjY2ODIgMzQuMTczOUMxNC43NjU0IDM0LjExNjIgMTQuODgwOCAzNC4wODczIDE1LjAxNDQgMzQuMDg3M0MxNS4wNDQ3IDM0LjA4NzMgMTUuMDc5NiAzNC4wOTExIDE1LjExOTEgMzQuMDk4N0MxNS4xNTg2IDM0LjEwNDggMTUuMTg1OSAzNC4xMTE2IDE1LjIwMTEgMzQuMTE5MlpNMTYuNjUwNiAzNi42NDIyQzE2LjQ3OTEgMzYuNjQyMiAxNi4zMjM1IDM2LjYxMzQgMTYuMTgzOCAzNi41NTU3QzE2LjA0NTcgMzYuNDk2NSAxNS45MjY1IDM2LjQxMzggMTUuODI2MyAzNi4zMDc1QzE1LjcyNzYgMzYuMjAxMiAxNS42NTE3IDM2LjA3NTIgMTUuNTk4NiAzNS45Mjk1QzE1LjU0NTUgMzUuNzgzOCAxNS41MTg5IDM1LjYyNDQgMTUuNTE4OSAzNS40NTEzVjM1LjM1NTdDMTUuNTE4OSAzNS4xNTUzIDE1LjU0ODUgMzQuOTc2OSAxNS42MDc3IDM0LjgyMDZDMTUuNjY2OSAzNC42NjI3IDE1Ljc0NzQgMzQuNTI5MSAxNS44NDkxIDM0LjQxOThDMTUuOTUwOCAzNC4zMTA1IDE2LjA2NjIgMzQuMjI3OCAxNi4xOTUyIDM0LjE3MTZDMTYuMzI0MiAzNC4xMTU0IDE2LjQ1NzggMzQuMDg3MyAxNi41OTYgMzQuMDg3M0MxNi43NzIxIDM0LjA4NzMgMTYuOTIzOSAzNC4xMTc3IDE3LjA1MTQgMzQuMTc4NEMxNy4xODA0IDM0LjIzOTEgMTcuMjg1OSAzNC4zMjQxIDE3LjM2NzkgMzQuNDMzNEMxNy40NDk5IDM0LjU0MTIgMTcuNTEwNiAzNC42Njg3IDE3LjU1MDEgMzQuODE2QzE3LjU4OTUgMzQuOTYxNyAxNy42MDkzIDM1LjEyMTEgMTcuNjA5MyAzNS4yOTQyVjM1LjQ4MzJIMTUuNzY5NFYzNS4xMzkzSDE3LjE4OFYzNS4xMDc1QzE3LjE4MTkgMzQuOTk4MiAxNy4xNTkyIDM0Ljg5MTkgMTcuMTE5NyAzNC43ODg3QzE3LjA4MTcgMzQuNjg1NCAxNy4wMjEgMzQuNjAwNCAxNi45Mzc1IDM0LjUzMzZDMTYuODU0IDM0LjQ2NjggMTYuNzQwMiAzNC40MzM0IDE2LjU5NiAzNC40MzM0QzE2LjUwMDMgMzQuNDMzNCAxNi40MTIzIDM0LjQ1MzkgMTYuMzMxOCAzNC40OTQ5QzE2LjI1MTQgMzQuNTM0NCAxNi4xODIzIDM0LjU5MzYgMTYuMTI0NiAzNC42NzI1QzE2LjA2NjkgMzQuNzUxNSAxNi4wMjIxIDM0Ljg0NzkgMTUuOTkwMyAzNC45NjE3QzE1Ljk1ODQgMzUuMDc1NiAxNS45NDI0IDM1LjIwNjkgMTUuOTQyNCAzNS4zNTU3VjM1LjQ1MTNDMTUuOTQyNCAzNS41NjgyIDE1Ljk1ODQgMzUuNjc4MyAxNS45OTAzIDM1Ljc4MTVDMTYuMDIzNiAzNS44ODMyIDE2LjA3MTUgMzUuOTcyOCAxNi4xMzM3IDM2LjA1MDJDMTYuMTk3NSAzNi4xMjc2IDE2LjI3NDEgMzYuMTg4MyAxNi4zNjM3IDM2LjIzMjRDMTYuNDU0OCAzNi4yNzY0IDE2LjU1OCAzNi4yOTg0IDE2LjY3MzQgMzYuMjk4NEMxNi44MjIyIDM2LjI5ODQgMTYuOTQ4MiAzNi4yNjggMTcuMDUxNCAzNi4yMDczQzE3LjE1NDYgMzYuMTQ2NiAxNy4yNDQ5IDM2LjA2NTQgMTcuMzIyNCAzNS45NjM3TDE3LjU3NzQgMzYuMTY2M0MxNy41MjQzIDM2LjI0NjggMTcuNDU2NyAzNi4zMjM0IDE3LjM3NDcgMzYuMzk2M0MxNy4yOTI4IDM2LjQ2OTIgMTcuMTkxOCAzNi41Mjg0IDE3LjA3MTkgMzYuNTczOUMxNi45NTM1IDM2LjYxOTUgMTYuODEzIDM2LjY0MjIgMTYuNjUwNiAzNi42NDIyWk0xOS42MTkgMzUuOTQzMkMxOS42MTkgMzUuODgyNCAxOS42MDUzIDM1LjgyNjMgMTkuNTc4IDM1Ljc3NDdDMTkuNTUyMiAzNS43MjE1IDE5LjQ5ODMgMzUuNjczNyAxOS40MTYzIDM1LjYzMTJDMTkuMzM1OSAzNS41ODcyIDE5LjIxNDQgMzUuNTQ5MiAxOS4wNTIgMzUuNTE3M0MxOC45MTUzIDM1LjQ4ODUgMTguNzkxNiAzNS40NTQzIDE4LjY4MDggMzUuNDE0OUMxOC41NzE1IDM1LjM3NTQgMTguNDc4MSAzNS4zMjc2IDE4LjQwMDcgMzUuMjcxNEMxOC4zMjQ4IDM1LjIxNTMgMTguMjY2NCAzNS4xNDkyIDE4LjIyNTQgMzUuMDczM0MxOC4xODQ0IDM0Ljk5NzQgMTguMTYzOSAzNC45MDg2IDE4LjE2MzkgMzQuODA2OUMxOC4xNjM5IDM0LjcwOTcgMTguMTg1MiAzNC42MTc5IDE4LjIyNzcgMzQuNTMxNEMxOC4yNzE3IDM0LjQ0NDggMTguMzMzMiAzNC4zNjgyIDE4LjQxMjEgMzQuMzAxNEMxOC40OTI2IDM0LjIzNDYgMTguNTg5IDM0LjE4MjIgMTguNzAxMyAzNC4xNDQzQzE4LjgxMzYgMzQuMTA2MyAxOC45Mzg5IDM0LjA4NzMgMTkuMDc3IDM0LjA4NzNDMTkuMjc0NCAzNC4wODczIDE5LjQ0MjkgMzQuMTIyMiAxOS41ODI1IDM0LjE5MjFDMTkuNzIyMiAzNC4yNjE5IDE5LjgyOTIgMzQuMzU1MyAxOS45MDM2IDM0LjQ3MjJDMTkuOTc4IDM0LjU4NzUgMjAuMDE1MiAzNC43MTU4IDIwLjAxNTIgMzQuODU3SDE5LjU5MzlDMTkuNTkzOSAzNC43ODg3IDE5LjU3MzQgMzQuNzIyNiAxOS41MzI0IDM0LjY1ODlDMTkuNDkzIDM0LjU5MzYgMTkuNDM0NSAzNC41Mzk3IDE5LjM1NzEgMzQuNDk3MkMxOS4yODEyIDM0LjQ1NDcgMTkuMTg3OCAzNC40MzM0IDE5LjA3NyAzNC40MzM0QzE4Ljk2MDEgMzQuNDMzNCAxOC44NjUzIDM0LjQ1MTcgMTguNzkyNCAzNC40ODgxQzE4LjcyMSAzNC41MjMgMTguNjY4NyAzNC41Njc4IDE4LjYzNTMgMzQuNjIyNEMxOC42MDM0IDM0LjY3NzEgMTguNTg3NCAzNC43MzQ4IDE4LjU4NzQgMzQuNzk1NUMxOC41ODc0IDM0Ljg0MSAxOC41OTUgMzQuODgyIDE4LjYxMDIgMzQuOTE4NUMxOC42MjY5IDM0Ljk1MzQgMTguNjU1OCAzNC45ODYgMTguNjk2NyAzNS4wMTY0QzE4LjczNzcgMzUuMDQ1MiAxOC43OTU0IDM1LjA3MjYgMTguODY5OCAzNS4wOTg0QzE4Ljk0NDIgMzUuMTI0MiAxOS4wMzkxIDM1LjE1IDE5LjE1NDQgMzUuMTc1OEMxOS4zNTYzIDM1LjIyMTMgMTkuNTIyNiAzNS4yNzYgMTkuNjUzMSAzNS4zMzk3QzE5Ljc4MzcgMzUuNDAzNSAxOS44ODA4IDM1LjQ4MTcgMTkuOTQ0NiAzNS41NzQzQzIwLjAwODQgMzUuNjY2OSAyMC4wNDAyIDM1Ljc3OTIgMjAuMDQwMiAzNS45MTEzQzIwLjA0MDIgMzYuMDE5MSAyMC4wMTc1IDM2LjExNzcgMTkuOTcxOSAzNi4yMDczQzE5LjkyNzkgMzYuMjk2OSAxOS44NjM0IDM2LjM3NDMgMTkuNzc4NCAzNi40Mzk2QzE5LjY5NDkgMzYuNTAzMyAxOS41OTQ3IDM2LjU1MzQgMTkuNDc3OCAzNi41ODk5QzE5LjM2MjQgMzYuNjI0OCAxOS4yMzI2IDM2LjY0MjIgMTkuMDg4NCAzNi42NDIyQzE4Ljg3MTMgMzYuNjQyMiAxOC42ODc2IDM2LjYwMzUgMTguNTM3MyAzNi41MjYxQzE4LjM4NzEgMzYuNDQ4NyAxOC4yNzMyIDM2LjM0ODUgMTguMTk1OCAzNi4yMjU1QzE4LjExODQgMzYuMTAyNiAxOC4wNzk3IDM1Ljk3MjggMTguMDc5NyAzNS44MzYxSDE4LjUwMzJDMTguNTA5MyAzNS45NTE1IDE4LjU0MjcgMzYuMDQzNCAxOC42MDM0IDM2LjExMTdDMTguNjY0MSAzNi4xNzg1IDE4LjczODUgMzYuMjI2MyAxOC44MjY1IDM2LjI1NTFDMTguOTE0NiAzNi4yODI1IDE5LjAwMTkgMzYuMjk2MSAxOS4wODg0IDM2LjI5NjFDMTkuMjAzOCAzNi4yOTYxIDE5LjMwMDIgMzYuMjgwOSAxOS4zNzc2IDM2LjI1MDZDMTkuNDU2NSAzNi4yMjAyIDE5LjUxNjUgMzYuMTc4NSAxOS41NTc1IDM2LjEyNTNDMTkuNTk4NSAzNi4wNzIyIDE5LjYxOSAzNi4wMTE1IDE5LjYxOSAzNS45NDMyWk0yMi4xMjk2IDM2LjE3NTRWMzQuOTA3MUMyMi4xMjk2IDM0LjgwOTkgMjIuMTA5OSAzNC43MjU3IDIyLjA3MDQgMzQuNjU0M0MyMi4wMzI1IDM0LjU4MTUgMjEuOTc0OCAzNC41MjUzIDIxLjg5NzQgMzQuNDg1OEMyMS44MTk5IDM0LjQ0NjQgMjEuNzI0MyAzNC40MjY2IDIxLjYxMDUgMzQuNDI2NkMyMS41MDQyIDM0LjQyNjYgMjEuNDEwOCAzNC40NDQ4IDIxLjMzMDQgMzQuNDgxM0MyMS4yNTE0IDM0LjUxNzcgMjEuMTg5MiAzNC41NjU1IDIxLjE0MzYgMzQuNjI0N0MyMS4wOTk2IDM0LjY4MzkgMjEuMDc3NiAzNC43NDc3IDIxLjA3NzYgMzQuODE2SDIwLjY1NjRDMjAuNjU2NCAzNC43MjggMjAuNjc5MSAzNC42NDA3IDIwLjcyNDcgMzQuNTU0MUMyMC43NzAyIDM0LjQ2NzYgMjAuODM1NSAzNC4zODk0IDIwLjkyMDUgMzQuMzE5NkMyMS4wMDcgMzQuMjQ4MiAyMS4xMTAzIDM0LjE5MjEgMjEuMjMwMiAzNC4xNTExQzIxLjM1MTYgMzQuMTA4NiAyMS40ODY3IDM0LjA4NzMgMjEuNjM1NSAzNC4wODczQzIxLjgxNDYgMzQuMDg3MyAyMS45NzI1IDM0LjExNzcgMjIuMTA5MSAzNC4xNzg0QzIyLjI0NzMgMzQuMjM5MSAyMi4zNTUxIDM0LjMzMSAyMi40MzI1IDM0LjQ1MzlDMjIuNTExNCAzNC41NzU0IDIyLjU1MDkgMzQuNzI4IDIyLjU1MDkgMzQuOTExNlYzNi4wNTkzQzIyLjU1MDkgMzYuMTQxMyAyMi41NTc3IDM2LjIyODYgMjIuNTcxNCAzNi4zMjEyQzIyLjU4NjYgMzYuNDEzOCAyMi42MDg2IDM2LjQ5MzUgMjIuNjM3NCAzNi41NjAzVjM2LjU5NjdIMjIuMTk3OUMyMi4xNzY3IDM2LjU0ODEgMjIuMTYgMzYuNDgzNiAyMi4xNDc4IDM2LjQwMzFDMjIuMTM1NyAzNi4zMjEyIDIyLjEyOTYgMzYuMjQ1MyAyMi4xMjk2IDM2LjE3NTRaTTIyLjIwMjUgMzUuMTAyOUwyMi4yMDcxIDM1LjM5ODlIMjEuNzgxMkMyMS42NjEzIDM1LjM5ODkgMjEuNTU0MyAzNS40MDg4IDIxLjQ2MDIgMzUuNDI4NUMyMS4zNjYgMzUuNDQ2OCAyMS4yODcxIDM1LjQ3NDggMjEuMjIzMyAzNS41MTI4QzIxLjE1OTYgMzUuNTUwNyAyMS4xMTEgMzUuNTk4NiAyMS4wNzc2IDM1LjY1NjJDMjEuMDQ0MiAzNS43MTI0IDIxLjAyNzUgMzUuNzc4NSAyMS4wMjc1IDM1Ljg1NDRDMjEuMDI3NSAzNS45MzE4IDIxLjA0NSAzNi4wMDI0IDIxLjA3OTkgMzYuMDY2MUMyMS4xMTQ4IDM2LjEyOTkgMjEuMTY3MiAzNi4xODA3IDIxLjIzNyAzNi4yMTg3QzIxLjMwODQgMzYuMjU1MSAyMS4zOTU2IDM2LjI3MzMgMjEuNDk4OSAzNi4yNzMzQzIxLjYyNzkgMzYuMjczMyAyMS43NDE4IDM2LjI0NiAyMS44NDA0IDM2LjE5MTRDMjEuOTM5MSAzNi4xMzY3IDIyLjAxNzMgMzYuMDY5OSAyMi4wNzUgMzUuOTkxQzIyLjEzNDIgMzUuOTEyIDIyLjE2NjEgMzUuODM1NCAyMi4xNzA2IDM1Ljc2MUwyMi4zNTA1IDM1Ljk2MzdDMjIuMzM5OSAzNi4wMjc0IDIyLjMxMSAzNi4wOTggMjIuMjY0IDM2LjE3NTRDMjIuMjE2OSAzNi4yNTI4IDIyLjE1MzkgMzYuMzI3MiAyMi4wNzUgMzYuMzk4NkMyMS45OTc2IDM2LjQ2ODQgMjEuOTA1IDM2LjUyNjkgMjEuNzk3MiAzNi41NzM5QzIxLjY5MDkgMzYuNjE5NSAyMS41NzEgMzYuNjQyMiAyMS40Mzc0IDM2LjY0MjJDMjEuMjcwNCAzNi42NDIyIDIxLjEyMzkgMzYuNjA5NiAyMC45OTc5IDM2LjU0NDNDMjAuODczNCAzNi40NzkgMjAuNzc2MyAzNi4zOTE4IDIwLjcwNjQgMzYuMjgyNUMyMC42MzgxIDM2LjE3MTYgMjAuNjA0IDM2LjA0NzkgMjAuNjA0IDM1LjkxMTNDMjAuNjA0IDM1Ljc3OTIgMjAuNjI5OCAzNS42NjMxIDIwLjY4MTQgMzUuNTYyOUMyMC43MzMgMzUuNDYxMiAyMC44MDc0IDM1LjM3NjkgMjAuOTA0NiAzNS4zMTAxQzIxLjAwMTcgMzUuMjQxOCAyMS4xMTg2IDM1LjE5MDIgMjEuMjU1MiAzNS4xNTUzQzIxLjM5MTkgMzUuMTIwNCAyMS41NDQ0IDM1LjEwMjkgMjEuNzEyOSAzNS4xMDI5SDIyLjIwMjVaIiBmaWxsPSIjRDlEOUQ5Ii8+Cjwvc3ZnPgo=" /></div>
                        </div>
                    </div>
                </div>
                <div class="primary d-flex w-100 justify-around align-center  px-2 py-2">
                    <div style="width: 50%;">
                        <h2 class="titulomadurez">{{nivelMadurez}}</h2>
                        <div class="subtitle-madurez">
                            <h4>Nivel de madurez</h4>
                        </div>
                        <div class="back-cajas">
                            <div class="cajas-madurez-5">5</div>
                            <div class="cajas-madurez-4">4</div>
                            <div class="cajas-madurez-3">3</div>
                            <div class="cajas-madurez-2">2</div>
                            <div class="cajas-madurez-1">1</div>
                        </div>
                    </div>
                    <div style="width: 50%;">
                        <div class="textos-madurez">
                            <h6>{{userSelected.empresa.rutEmpresa}}</h6>
                            <h6>{{userSelected.empresa.razonSocial}}</h6>
                        </div>
                        <div class="parrafo-madurez">
                            <p>{{IM.nivelReporte}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="html2pdf__page-break"></div>

            <div class="cards-grafictabsresult pt-4">


                <div style="width: 100%;" class="px-2">
                    <div class="graficatablas" style="width: 45%;">
                        <CChart type="bar"
                                :data="resumenImportanciaRelativa"
                                height="250"
                                width="200"
                                :options="{ maintainAspectRatio: false, plugins: { legend: { display: false } } }" />
                    </div>
                </div>



                <div class="bodycard" style="width:100%;">
                    <h2>Importancia Relativa</h2>
                    <p>
                        “Valor porcentual obtenido al analizar a la empresa dentro del tipo de “industria" a la que pertenece, donde se refleja la importancia de cada área con respecto a la actividad de la empresa. Ayuda a visualizar la relevancia de un área dentro de la compañía”
                    </p>
                </div>
            </div>

            <!--Termino Madurez General-->

            <div class="contenedor">
                <div :id="'pills-'+ ima.segmentacionAreaId" name="pills-areas" role="tabpanel" aria-labelledby="pills-estrategias-tab"
                     tabindex="0" v-for="ima in IMA" :value="ima.segmentacionAreaId" :key="ima.segmentacionAreaId">

                    <div class="html2pdf__page-break"></div>

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
                                    <button class="btn circle-red order-md-2">
                                        <p style=" color: rgb(155 155 155); ">{{ima.brecha}}%</p>
                                    </button>
                                </div>
                                <h5>Brecha</h5>
                            </div>
                        </div>
                    </div>


                    <div class="w-100 d-flex flex-column justify-center align-center">
                        <section class="cards mt-1 mb-4 justify-content-between">
                            <div style="width: 30%;">
                                <h2 class="valorestitulomadurez">{{parseFloat(ima.imaValor).toFixed(0)}}</h2>
                                <div class="valoressubtitle-madurez">
                                    <h4>Nivel de madurez</h4>
                                </div>
                                <div class="back-cajas pb-2">
                                    <div class="cajas-madurez-5">5</div>
                                    <div class="cajas-madurez-4">4</div>
                                    <div class="cajas-madurez-3">3</div>
                                    <div class="cajas-madurez-2">2</div>
                                    <div class="cajas-madurez-1">1</div>
                                </div>
                            </div>

                        </section>
                    </div>

                    <div class="html2pdf__page-break"></div>

                    <div class="cards-grafictabsresult pt-4">


                        <CChart type="bar" :data="ima.resumenCapacidad"
                                height="200"
                                width="400"
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
                                labels="resumenCapacidad" />


                        <section class="cards cards-resumen mt-1 mb-4 justify-content-between">
                            <div class="cards">
                                <div class="cards-grafictabsresult pt-4">
                                    <div class="bodycard">
                                        <h2>Nivel de desarrollo por subáreas</h2>
                                        <p>El nivel de desarrollo por subáreas se refiere a la evaluación de las capacidades en relación con una empresa e industria específica. La calificación otorgada indica el grado de desarrollo de cada capacidad dentro de una subárea y, por consiguiente, dentro de un área más amplia. Los posibles resultados de esta evaluación son: Capacidad Inexistente, Poco Desarrollada, Desarrollada y Muy Desarrollada.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>

                    <div class="html2pdf__page-break"></div>

                    <div class="seccion1 p-1 d-flex justify-center">
                        <div style="width: 46%;">
                            <table class="table1" style="width:90%">
                                <tr>
                                    <th colspan="3" style="text-align: initial;" class="titulotable">TOP 3 CAPACIDADES </th>
                                </tr>
                                <div class="w-100 table-responsive pie-table">
                                    <table class="table-res table-hover">
                                        <tbody>
                                            <tr v-if="top3capacidadesByarea.length >0" v-for="top3capacidadByarea in top3capacidadesByarea" :value="top3capacidadByarea.segmentacionAreaId" :key="top3capacidadByarea.segmentacionAreaId">
                                                <td class="w-1">
                                                    <h4 class="text-center text-md-start">{{top3capacidadByarea.preguntaCapacidad}}</h4>
                                                </td>
                                                <td class="">
                                                    <h4 class="">Nivel {{parseFloat(top3capacidadByarea.imsaValor).toFixed(0)}}</h4>
                                                </td>
                                            </tr>
                                            <tr v-if="top3capacidadesByarea.length ==0">
                                                <td><h4>No existe información para mostrar</h4></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </table>
                        </div>
                        <div style="width: 40%;">
                            <table class="table1" style="width:100%">
                                <tr>
                                    <th colspan="3" style="text-align: initial;" class="titulotable">3 PEORES CAPACIDADES </th>

                                </tr>
                                <div class="w-100 table-responsive pie-table">
                                    <table class="table-res table-hover">
                                        <tbody>
                                            <tr v-if="top3peoresCapacidadesByarea.length >0" v-for="top3PeorCapacidadByArea in top3peoresCapacidadesByarea" :value="top3PeorCapacidadByArea.segmentacionAreaId" :key="top3PeorCapacidadByArea.segmentacionAreaId">
                                                <td class="w-1">
                                                    <h4 class="text-center text-md-start">{{top3PeorCapacidadByArea.preguntaCapacidad}}</h4>
                                                </td>
                                                <td class="">
                                                    <h4 class="">Nivel {{parseFloat(top3PeorCapacidadByArea.imsaValor).toFixed(0)}}</h4>
                                                </td>
                                            </tr>
                                            <tr v-if="top3peoresCapacidadesByarea.length ==0">
                                                <td><h4>No existe información para mostrar</h4></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </table>
                        </div>
                    </div>


                    <div class="seccion1 p-1 d-flex justify-center">
                        <div style="width: 46%;">
                            <table class="table1" style="width:90%">
                                <tr>
                                    <th colspan="3" style="text-align: initial;" class="titulotable">SUBÁREAS MADURAS </th>
                                </tr>
                                <div class="w-100 table-responsive pie-table">
                                    <table class="table-res table-hover">
                                        <tbody>
                                            <tr v-if="SubAreasMaduras.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length>0" v-for="SubAreaMadura in SubAreasMaduras" :value="SubAreaMadura.id" :key="SubAreaMadura.id">
                                                <td scope="row" v-if="SubAreaMadura.segmentacionAreaId === ima.segmentacionAreaId">
                                                    <div class="min-w pt-5">
                                                        <CChart type="doughnut" :data="SubAreaMadura.nivelMadurezSubAreas"
                                                                :options="{circumference: 180,rotation: -90,plugins: { title: { display: true,
                                    text:(SubAreaMadura.cumplimiento).toString()+'%',
                                position: 'bottom' } }}" />
                                                    </div>
                                                </td>
                                                <td class="w-1" v-if="SubAreaMadura.segmentacionAreaId === ima.segmentacionAreaId">
                                                    <h4 class="text-center text-md-start">{{SubAreaMadura.nombreSubArea}}</h4>
                                                </td>
                                                <td class="w-1" v-if="SubAreaMadura.segmentacionAreaId === ima.segmentacionAreaId">
                                                    <h4 class="text-center text-md-start">Nivel {{parseFloat(SubAreaMadura.imsaValor).toFixed(0)}}</h4>
                                                </td>
                                            </tr>
                                            <tr v-if="SubAreasMaduras.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length==0">
                                                <td><h4>No existe información para mostrar</h4></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </table>
                        </div>
                        <div style="width: 40%;">
                            <table class="table1" style="width:100%">
                                <tr>
                                    <th colspan="3" style="text-align: initial;" class="titulotable">SUBÁREAS A MEJORAR</th>

                                </tr>
                                <div class="w-100 table-responsive pie-table">
                                    <table class="table-res table-hover">
                                        <tbody>
                                            <tr v-if="SubAreasMejorar.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length>0" v-for="SubAreaMejorar in SubAreasMejorar.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId)" :value="SubAreaMejorar.id" :key="SubAreaMejorar.id">
                                                <td scope="row" v-if="SubAreaMejorar.segmentacionAreaId === ima.segmentacionAreaId">
                                                    <div class="min-w pt-5">
                                                        <CChart type="doughnut" :data="SubAreaMejorar.nivelMadurezSubAreas"
                                                                :options="{circumference: 180,rotation: -90,plugins: { title: { display: true,
                                    text:(SubAreaMejorar.cumplimiento).toString()+'%',
                                position: 'bottom' } }}" />
                                                    </div>
                                                </td>
                                                <td class="w-1" v-if="SubAreaMejorar.segmentacionAreaId === ima.segmentacionAreaId">
                                                    <h4 class="text-center text-md-start">{{SubAreaMejorar.nombreSubArea}}</h4>
                                                </td>
                                                <td class="w-1" v-if="SubAreaMejorar.segmentacionAreaId === ima.segmentacionAreaId">
                                                    <h4 class="text-center text-md-start">Nivel {{parseFloat(SubAreaMejorar.imsaValor).toFixed(0)}}</h4>
                                                </td>
                                            </tr>
                                            <tr v-if="SubAreasMejorar.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length ==0">
                                                <td><h4>No existe información para mostrar</h4></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </table>
                        </div>
                    </div>
                </div>




            </div>

            <div class="html2pdf__page-break"></div>

            <div class="contenedor">
                <div id="pills-feedback" role="tabpanel" aria-labelledby="pills-feedback-tab" tabindex="0">
                    <!-- Inicio Cajas -->

                    <h3 class="titleafterleyend">Feedback</h3>


                    <div class="card mt-3 mb-2 d-flex ">
                        <div class="table-responsive pie-table">
                            <table class="table table-hover table-recomendaciones">
                                <thead>
                                    <tr>
                                        <th scope="col" style="text-align: initial;" class="titulotableaqua">Capacidad</th>
                                        <th scope="col" style="text-align: initial;" class="titulotableaqua">&Aacute;rea / Sub&aacute;rea</th>
                                        <th scope="col" style="text-align: initial;" class="titulotableaqua">Feedback</th>
                                        <th scope="col" style="text-align: initial;" class="titulotableaqua">Importancia para la empresa</th>
                                        <th scope="col" style="text-align: initial;" class="titulotableaqua">Evaluaci&oacute;n</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="recomendacion in feedbacks " :key="recomendacion.id">
                                        <td v-if="recomendacion.respuestaValor != '4'">
                                            <div class="me-md-3">
                                        <td class="text-center text-md-start">{{recomendacion.preguntaCapacidad}}</td>
                        </div>
                        </td>
<td v-if="recomendacion.respuestaValor != '4'">
        <div class="me-md-3">
    <td class="align1cont1">{{recomendacion.nombreArea}} / {{recomendacion.nombreSubArea}}</td>
    </div>
    </td>
    <td v-if="recomendacion.respuestaValor != '4'">
        <div class="me-md-3">
    <td class="text-center text-md-start">{{recomendacion.respuestaRealimentacion}}</td>
    </div>
    </td>
    <td v-if="recomendacion.respuestaValor != '4'">
        <div class="me-md-3">
    <td class="text-center text-md-start">{{recomendacion.tipoImportanciaNombre}}</td>
    </div>
    </td>
    <td v-if="recomendacion.respuestaValor != '4'">
        <div class="me-md-3">
    <td class="text-center text-md-start">{{recomendacion.tipoRespuestaValorNombre}}</td>
    </div>
    </td>

    <div v-if="lineasContador()">
        <div class="html2pdf__page-break"></div>
    </div>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    </div>
    </div>
    </div>
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


    body {
        margin: 0;
        padding: 0;

        border: none;
    }

    .contenedor {
     /*height:550px;*/
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .body-presentacion {
        background-color: #15ACC0;
        margin: 0px;
    }

    .logo-presentacion {
        width: 330px;
        object-fit: contain;
    }

    .title-presentacion {
        color: white;
        font-size: 50px;
        margin-bottom: 0.5rem;
        margin-top: 1rem;
 
    }

    .subtitle-presentacion {
        color: white;
        font-size: 40px;
        margin-bottom: 0.5rem;
        margin-top: 0.5rem;
   
    }

    .table1 td {
        align-content: end;
    }

    .titulotable {
        padding: 10px;
        font-size: 12px;
        background-color: #15ACC0;
        color: white
    }

    .seccion {
        display: flex;
    }

    .graficotabla {
        width: 80px !important;
        height: 30px !important;
    }

    table, th, tr {
        border: 1px solid #283252;
        border-collapse: collapse;
    }

    .tipoempresa {
        display: flex;
        align-items: end;
    }

        .tipoempresa img {
            width: 80px;
        }

    .title-madurez {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 500;
        color: #283252;
    }

    .titulomadurez {
        font-size: 80px;
        color: white;
        font-weight: 500;
        text-align: center;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }

    .textos-madurez h6 {
        font-size: 25px;
        font-weight: 600;
        color: #283252;
        margin-top: 20px;
        margin-bottom: 20px;
        padding-left: 3.5rem;
    }

    .back-cajas {
        display: flex;
        justify-content: center;
    }

    .cajas-madurez-5 {
        padding: .4rem;
        background-color: #283252;
        color: white;
    }

    .cajas-madurez-4 {
        padding: .4rem;
        background-color: #16C59B;
        color: #283252;
    }

    .cajas-madurez-3 {
        padding: .4rem;
        background-color: #76EFFF;
        color: #283252;
    }

    .cajas-madurez-2 {
        padding: .4rem;
        background-color: #FFC610;
        color: #283252;
    }

    .cajas-madurez-1 {
        padding: .4rem;
        background-color: #DC3545;
        color: #283252;
    }

    .subtitle-madurez {
        text-align: center;
    }

        .subtitle-madurez h4 {
            font-size: 30px;
            color: white;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .subtitle-madurez p {
            font-size: 14px;
            color: #283252;
            margin-top: 25px;
            margin-bottom: 10px;
        }

    .textograficatablas p {
        font-size: 14px;
        font-weight: 500;
        color: #283252;
    }

    .back-valores {
        display: flex;
        gap: 20px;
    }

    .valores {
        display: flex;
        gap: 20px;
        align-items: center;
    }

    .circulovalor-green {
        font-size: 9px;
        padding: 10px 6px;
        border: solid 1px #16C59B;
        border-radius: 50%;
        color: #283252;
        font-weight: 600;
        background-color: #16C59B;
        margin-bottom: 0
    }

    .circulovalor-blue {
        font-size: 9px;
        padding: 10px 6px;
        border: solid 1px #15ACC0;
        border-radius: 50%;
        color: white;
        font-weight: 600;
        background-color: #15ACC0;
        margin-bottom: 0
    }

    .circulovalor-red {
        font-size: 9px;
        padding: 10px 6px;
        border: solid 1px #DC3545;
        border-radius: 50%;
        color: white;
        font-weight: 600;
        background-color: #DC3545;
        margin-bottom: 0
    }

    .valorestitulomadurez {
        font-size: 60px;
        color: #283252;
        font-weight: 500;
        text-align: center;
        margin-bottom: .6rem;
        margin-top: .6rem;
    }

    .valoressubtitle-madurez {
        text-align: center;
    }

        .valoressubtitle-madurez h4 {
            font-size: 14px;
            color: #283252;
            margin-top: 6px;
            margin-bottom: 6px;
        }

        .valoressubtitle-madurez p {
            font-size: 10px;
            color: #283252;
            margin-top: 25px;
            margin-bottom: 10px;
        }

    .valorestabla {
        display: flex;
        align-items: flex-start;
    }

    .seccion6 {
        display: flex;
        justify-content: space-evenly;
        padding-bottom: 3rem;
    }

    .title-valores {
        font-size: 18px;
        color: #283252;
        font-weight: 500;
    }

    .subtitle-valores {
        font-size: 13px;
        color: #283252;
        font-weight: 500;
    }

    .seccion7 {
        display: flex;
        justify-content: center;
    }

    .valoresgraficotablas {
        width: 500px;
    }

    .titulotablewhite {
        padding: 20px;
        background-color: white;
        color: #283252;
    }

    .table2 td {
        padding-top: 10px;
        padding-bottom: 10px;
        align-content: end;
    }

    .porcentajeaprob {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .porcentajesucces {
        color: #15ACC0;
    }

    .porcentajewarning {
        color: #ED9A37;
    }

    .table3 td {
        padding-top: 10px;
        padding-bottom: 10px;
        align-content: end;
    }

    .table3, th {
        border: 1px solid transparent !important;
        border-collapse: collapse !important;
    }

    .titulotableaqua {
        padding: 20px;
        background-color: #283252;
        color: white;
    }

    .d-flex {
        display: flex;
    }

    .flex-column {
        flex-direction: column;
    }

    .justify-center {
        justify-content: center;
    }

    .align-center {
        align-items: center;
    }

    .w-50 {
        width: 50%;
    }

    .w-40 {
        width: 40%;
    }

    .h-100 {
        height: 100%;
    }

    .p-1 {
        padding: 1rem;
    }

    .pl-2 {
        padding-left: 2rem;
    }

    .px-1 {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    .py-1 {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .px-2 {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    .py-2 {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    .px-3 {
        padding-top: 3rem;
        padding-bottom: 3rem;
    }

    .py-3 {
        padding-left: 3rem;
        padding-right: 3rem;
    }

    .pt-1 {
        padding-top: 1rem;
    }

    .pt-3 {
        padding-top: 3rem;
    }

    .pb-2 {
        padding-bottom: 2rem;
    }

    .m-2 {
        margin: 2rem;
    }

    .m-5 {
        margin: 5rem;
    }

    .text-justify {
        text-align: justify;
    }

    .bb {
        top: -40px;
    }

    .flex-row {
        flex-direction: row;
    }

    .justify-around {
        justify-content: space-around;
    }

    .justify-between {
        justify-content: space-between;
    }

    .w-100 {
        width: 100%;
    }

    .w-80 {
        width: 80%;
    }

    .primary {
        background-color: #15ACC0;
    }

    td {
        font-size: .7rem;
    }

    h2 {
        margin: 0;
    }

    .areas .bb {
        left: -140px;
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

        pdfBool: false,
        contadorLineas:1,
        userSelected: [],
        fechaHoy : "",
        rutempresa: "",
        idempresa: "",
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
      const lineasContador = () => {

          var salida = true;

          if (state.contadorLineas == 5) {
              state.contadorLineas = 1;
              salida = true;
          } else {
              state.contadorLineas++
              salida = false;
          }
          //console.log(" state.contadorLineas", state.contadorLineas)
          return salida;
      };
    
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
       //console.log("localStorage.usuarioModel",localStorage.usuarioModel);
        
       var element = document.getElementById('document_pdf');
       // var document_container = document.getElementById("document_container")
       // if(element.style.display == ""){  
       //         element.style.display = "none";  
       // } else {  
       //     element.style.display = "";  
       // } 

       //if(document_container.style.display == ""){  
       //     document_container.style.display = "none";  
       // } else {  
       //     document_container.style.display = "";  
       // } 


         //var element = document.getElementById("document_container").className.replace( /(?:^|\s)dfgd (?!\S)/g , ' fade' );

          // element.setAttribute("hidden", "some_class_name");
          //element.className.replace( /(?:^|\s)hidden(?!\S)/g , ' fade' );
            //if(element.style.display == ""){  
            //    element.style.display = "none";  
            //} else {  
            // element.style.display = "";  
            //}  


                console.log("element",element);
        
        //      element.forEach((elemento) => {
        //  elemento.classList.remove('tab-pane');
        //});
        
        //console.log("element",element);
        var opt = {
            margin: 0.5,
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
                format: 'A5',
                orientation: 'landscape'//'landscape'//'portrait'
            },
            //pagebreak: { 
            //    after: [".Pagina"], 
            //    avoid: ["canvas",".Seccion"]
            //},
        };
        //var cabecera = document.getElementById('cabecera');
        //element.classList.remove("tab-pane");
        
        
        
        
        //html2pdf().from(element).set(opt) .save();

       
        html2pdf().from(element).set(opt).toPdf().get('pdf')
            
            //.then(function(pdf) {
            //var totalPages = pdf.internal.getNumberOfPages();
        //    for (let i = 1; i <= totalPages; i++) {
        //        //pdf.html(cabecera.innerHTML);
        //        pdf.setPage(i);
        //        pdf.setFontSize(10);
        //        pdf.setTextColor(100);
        //        pdf.text('Página ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() / 2.3), (pdf.internal.pageSize.getHeight() - 0.8));
        //    }
        //})          
            .save();
          state.pdfBool = !state.pdfBool;


       //         if(element.style.display == ""){  
       //         element.style.display = "none";  
       // } else {  
       //     element.style.display = "";  
       // } 

       //if(document_container.style.display == ""){  
       //     document_container.style.display = "none";  
       // } else {  
       //     document_container.style.display = "";  
       // } 
      };
      const downloadPDF = () => {


          var element = document.getElementById('download_pdf');
       

          console.log("element", element);


          var opt = {
              margin: 0.5,
              filename: state.nombreEvaluacion + '_' + state.fechaHoy + 'Evaluacion.pdf',
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
                  format: 'A5',
                  orientation: 'landscape'//'landscape'//'portrait'
              },

          };


          html2pdf().from(element).set(opt).toPdf().get('pdf')

    
              .save();
          state.pdfBool = !state.pdfBool;

 
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

        if (route.query.empresaId){
            state.idempresa =  route.query.empresaId;
        }else{
            state.idempresa =  JSON.parse(localStorage.empresaModel).id;
        }
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
            await getFeedbackArea();

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
            "empresaId": state.idempresa
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
            if (!nivelReporte){
                state.IM.nivelReporte = 1;
            }else{
                state.IM.nivelReporte = nivelReporte.detalle;
            }
            state.nivelMadurez = parseInt(state.IM.imValor).toFixed(0);
        })
        .catch((error) => {
            console.log("error->", error);
        });
    };

     const getIMA = async () => {
        return ApibackOffice.post("Madurez/GetIMAReporteSubscripcionOBasico?evaluacionId="+ state.idEvaluacion + "&empresaId=" +  state.idempresa , state.userSelected,
            { headers: header } 
        )
        .then((response) => {
            if (response.status != 200) return false;
            state.IMA = response.data;
            //console.log("state.IMA", state.IMA);
            state.IMA.forEach((element) => {
                let color = [];
                let restante = "";
                let restante2 = "";
                let dataSet = [];
                let cumplimiento = (element.imaValor / 5) * 100;
                let imaValor = element.imaValor.toFixed(0);

                if (imaValor == 1){
                    color = "#e5342c";
                    restante = 4;
                    restante2 = 100-cumplimiento  ;
                }
                if (imaValor == 2){
                    color = "#f3bf4f";
                    restante = 3;
                    restante2 = 100-cumplimiento  ;

                }
                if (imaValor == 3){
                    color = "#fcfa62";
                    restante = 2;
                    restante2 = 100-cumplimiento  ;

                }
                if (imaValor == 4){
                    color = "#3070b5";
                    restante = 1;
                    restante2 = 100-cumplimiento  ;

                }
                if (imaValor == 5){
                    color = "#4fa95c";
                    restante = 0;
                    restante2 = 100-cumplimiento  ;

                }

                let elemento = {
                    label: [element.nombreArea],
                    backgroundColor:  [color, "#EAE7E6"],
                    borderColor : "#A9A7A6",
                    data: [cumplimiento.toFixed(0), restante2.toFixed(0)]
                }

                dataSet.push(elemento);
                element.nivelMadurezAreas = {
                    datasets: dataSet,
                };
                
                element.claseIMA = "titlenivel-" + imaValor;
                element.imaValor = element.imaValor.toFixed(2);
                element.cumplimiento = cumplimiento.toFixed(0);
                let brecha =  element.cumplimiento - 100;
                element.brecha = brecha.toFixed(0);

                if (imaValor >= 4){
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
            "empresaId": state.idempresa
        }
        return ApibackOffice.post("Madurez/GetIMSA",filtro,
            { headers: header }
        )
        .then((response) => {
            if (response.status != 200) return false;
            state.IMSA = response.data;
            state.IMSA.forEach((element) => {
                let color = [];
                let restante = "";
                let restante2 = "";
                let dataSet = [];
                let cumplimiento = (element.imsaValor.toFixed(0) / 5) * 100;

                if (element.imsaValor.toFixed(0) == 1){
                    color = "#e5342c";
                    restante = 4;
                    restante2 = 100-cumplimiento  ;

                }
                if (element.imsaValor.toFixed(0) == 2){
                    color = "#f3bf4f";
                    restante = 3;
                    restante2 = 100-cumplimiento  ;

                }
                if (element.imsaValor.toFixed(0) == 3){
                    color = "#fcfa62";
                    restante = 2;
                    restante2 = 100-cumplimiento  ;

                }
                if (element.imsaValor.toFixed(0) == 4){
                    color = "#3070b5";
                    restante = 1;
                    restante2 = 100-cumplimiento  ;

                }
                if (element.imsaValor.toFixed(0) == 5){
                    color = "#4fa95c";
                    restante = 0;
                    restante2 = 100-cumplimiento  ;

                }
                let elemento = {
                    label: [element.nombreSubArea],
                    backgroundColor:  [color, "#EAE7E6"],
                    borderColor : "#A9A7A6",
                    data: [cumplimiento, restante2]
                }
                dataSet.push(elemento);
                element.nivelMadurezSubAreas = {
                    datasets: dataSet,
                };
                element.cumplimiento = cumplimiento.toFixed(0);

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
            "empresaId": state.idempresa
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
            var labelArea = element.pesoRelativoAreaPorc + "% " + element.nombreArea
            labels.push(labelArea);
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
        var porcentaje = ((element.imaValor / 5) * 100).toFixed(0)
        var lablePor =   porcentaje +"% " + element.nombreArea 
        labels.push(lablePor );
        valorDataList.push((element.imaValor / 5) * 100);
      });

      let elemento = {
        label: "Evaluacion " +  state.IM.nombreEvaluacion ,
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

    const getFeedbackArea = async () => {  
        /*let filtro = {
            id: state.IM.evaluacionEmpresaId
        };*/
        /*ApibackOffice.post("EvaluacionEmpresa/GetPlanMejoras", filtro,
            { headers: header }
        )*/
        return ApibackOffice.post("EvaluacionEmpresa/GetPlanMejorasReporteSubscripcionOBasico?evaluacionEmpresaId=" + state.IM.evaluacionEmpresaId + "&reporteId=" + state.reporte.id , state.userSelected,
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
               /* state.IMA.forEach((x) => {
                    if (x.segmentacionAreaId == element.segmentacionAreaId) 
                        element.activaArea = x.activaArea;
                });*/
                state.IMSA.forEach((x) => {
                    if (x.segmentacionSubAreaId == element.segmentacionSubAreaId){
                        //Se cambiara el detalle de la importancia por el imsaValor para generar mejores o peor
                       /* if (element.importanciaDetalle == "4" || element.importanciaDetalle == "3" ){
                            element.imsaValor = x.imsaValor;
                            state.capacidadvalorMayor.push(element);
                        }
                        if (element.importanciaDetalle == "1" || element.importanciaDetalle == "2" ){
                            element.imsaValor = x.imsaValor;
                            state.capacidadvalorMenor.push(element);
                        }*/
                        console.log(x.imsaValor)
                        if (x.imsaValor >= 4 ){
                            element.imsaValor = x.imsaValor;
                            state.capacidadvalorMayor.push(element);
                        }
                        if (x.imsaValor <4 ){
                            element.imsaValor = x.imsaValor;
                            state.capacidadvalorMenor.push(element);
                        }

                    }
                });
            });
            console.log("state.feedbacks", state.feedbacks);
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
        lineasContador,
        exportToPDF,
        downloadPDF,
      horizonalLinePlugin,
      areaSelected,
      resumenSelected,
      feedbackSelected
    };
  },
};
</script>
