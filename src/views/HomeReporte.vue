<template>
    <!--Contenido-->
    <div v-if="!completoData" >
        <p>Cargando...</p>
    </div>
    <div class="row view-wrapper" id="document_container" v-if="!pdfBool && completoData">
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
                <section class="cards  mb-4">
                    <div class="cards-iconos-active p-3" v-if="tamanoempresa.nombre == 'Microempresa'">
                        <img :src="microEmpresaBlanco" width="50" height="50" />
                    </div>
                    <div class="cards-iconos p-3" v-else>
                        <img :src="microEmpresaNegro" width="50" height="50" />
                    </div>

                    <div class="cards-iconos-active p-3" v-if="tamanoempresa.nombre == 'Pequeña Empresa'">
                        <img :src="pequenaEmpresaBlanco" width="50" height="50" />
                    </div>
                    <div class="cards-iconos p-3" v-else>
                        <img :src="pequenaEmpresaNegro" width="50" height="50" />
                    </div>

                    <div class="cards-iconos-active p-3" v-if="tamanoempresa.nombre == 'Mediana Empresa'">
                        <img :src="medianaEmpresaBlanco" width="50" height="50" />
                    </div>
                    <div class="cards-iconos p-3" v-else>
                        <img :src="medianaEmpresaNegro" width="50" height="50" />
                    </div>

                    <div class="cards-iconos-active p-3" v-if="tamanoempresa.nombre == 'Gran Empresa'">
                        <img :src="granEmpresaBlanco" width="50" height="50"  />
                    </div>
                    <div class="cards-iconos p-3" v-else>
                        <img :src="granEmpresaNegro" width="50" height="50"  />
                    </div>
                </section>
                <section class="cards cards-resumen mt-1 mb-4 justify-content-between">
                    <div class="cards-grafictabs p-3 d-flex">
                        <div class="w-100 d-flexflex-column justify-content-between align-items-center">
                            <h2>Resultados evaluación de madurez</h2>
                            <button :disabled="muestraBotonDescarga" class="btn btn-primary" @click="downloadPDF">Descargar</button>
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
                                            v-if="resumenImportanciaRelativa"
                                            :data="resumenImportanciaRelativa"
                                            :height="285"
                                            :width="200"
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
                                                    v-if="resumenPuntuacionArea"
                                                    :data="resumenPuntuacionArea"
                                                    :height="300"
                                                    :width="200"
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
                            <div class="cards-grafictabsresultreporte">
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
                            <div class="cards-grafictabsresultreporte">
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
                                    <CChart type="doughnut" :data="ima.nivelMadurezAreas" :height="50" :width="100"
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
                                        v-if="ima.resumenCapacidad"
                                        :height="60"
                                        :width="100"
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
                                            <h4 class="text-center text-md-start uppercase" >{{top3capacidadByarea.capacidad}}</h4>
                                        </td>
                                        <!--<td class="">
                                            <h4 class="">Nivel {{parseFloat(top3capacidadByarea.imsaValor).toFixed(0)}}</h4>
                                        </td>-->
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
                                            <h4 class="text-center text-md-start uppercase">{{top3PeorCapacidadByArea.capacidad}}</h4>
                                        </td>
                                        <!--<td class="">
                                            <h4 class="">Nivel {{parseFloat(top3PeorCapacidadByArea.imsaValor).toFixed(0)}}</h4>
                                        </td>-->
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
                                <tr v-for="recomendacion in feedback " :key="recomendacion.id">
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
    <div id="document_pdf" style=" margin-top: -15000px; ">

        <div class="seccion1 p-1 d-flex justify-center">
            <button class="btn btn-primary" @click="downloadPDF">Descargar</button>
        </div>
        <div class="html2pdf__page-break"></div>
        <div id="download_pdf" >
            <div class="body-presentacion align-center ">
                <div class="contenedor py-3">
                    <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ5IiBoZWlnaHQ9IjUyIiB2aWV3Qm94PSIwIDAgMTQ5IDUyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMzUzXzU1NDApIj4KPHBhdGggZD0iTTM4LjI4NTggMEg0Ni45MDQ1VjUxLjA2ODVIMzcuNTU1NEw4LjYyMjE3IDEzLjgwNzJWNTEuMDY4NUgwVjBIOC42MjIxN0wzOC4yODU4IDM4LjEzNjlWMFoiIGZpbGw9IiMyMjM2M0UiLz4KPHBhdGggZD0iTTc0LjM4MzkgMFY4LjEwOTlINDcuMTI5NFYyMS42MjY0SDcxLjYwNzlWMjkuMjk2N0g0Ny4xMjk0VjQyLjk1ODZINzUuMjU5NlY1MS4wNjg1SDM4LjUxMDdWMEg3NC4zODM5WiIgZmlsbD0iIzIyMzYzRSIvPgo8cGF0aCBkPSJNOTEuMzQ0NCA1MS4wNjg1TDcwLjgxNTMgMEg4MC40NTg2TDk2LjM4NzYgMzguNjc2OUw5MS4zNDQ0IDUxLjA3MTlWNTEuMDY4NVoiIGZpbGw9IiMyMjM2M0UiLz4KPHBhdGggZD0iTTExMS45MzYgMEgxMjEuNTc5TDE0Mi4xMDggNTEuMDY4NUgxMzIuNDY1TDExNi43NTcgMTIuOTMxNUwxMDEuMDUgNTEuMDY4NUg5MS40MDY3TDExMS45MzYgMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMzIuNjEgMy42NTg1MkMxMzIuOTA1IDMuMjAxNjMgMTMzLjE5MiAyLjc0ODE5IDEzMy40NzkgMi4zMDE2OEMxMzMuNzY2IDEuODU1MTcgMTM0LjA1IDEuNDA1MiAxMzQuMzM4IDAuOTU1MjI1SDEzMS45ODdWMC4yOTA2NDlIMTM1LjQ4N0MxMzUuMTk5IDAuNzI2Nzc3IDEzNC45MTYgMS4xNjI5IDEzNC42MzUgMS41OTU1N0MxMzQuMzUxIDIuMDI4MjQgMTM0LjA2NCAyLjQ2MDkgMTMzLjc3IDIuODkwMTFDMTM0LjAyNiAyLjk0ODk1IDEzNC4yNjggMy4wMzg5NSAxMzQuNDkzIDMuMTcwNDhDMTM0LjcxOCAzLjI5ODU1IDEzNC45MTIgMy40NTc3NyAxMzUuMDc4IDMuNjQ4MTRDMTM1LjI0MSAzLjgzODUxIDEzNS4zNzMgNC4wNTMxMiAxMzUuNDY2IDQuMjkxOTVDMTM1LjU1OSA0LjUzMDc4IDEzNS42MDQgNC43OTAzOCAxMzUuNjA0IDUuMDcwNzVDMTM1LjYwNCA1LjM4NTczIDEzNS41NDIgNS42Nzk5NCAxMzUuNDIxIDUuOTU2ODVDMTM1LjMgNi4yMzM3NSAxMzUuMTM0IDYuNDcyNTkgMTM0LjkyNiA2LjY4MDI3QzEzNC43MTggNi44ODc5NSAxMzQuNDc2IDcuMDUwNjMgMTM0LjE5NiA3LjE3NTI0QzEzMy45MTUgNy4yOTYzOCAxMzMuNjIxIDcuMzU4NjkgMTMzLjMwNiA3LjM1ODY5QzEzMi45NyA3LjM1ODY5IDEzMi42NTUgNy4yOTI5MiAxMzIuMzY4IDcuMTYxMzlDMTMyLjA3NyA3LjAyOTg2IDEzMS44MjggNi44NDk4NyAxMzEuNjIgNi42MTc5NkMxMzEuNyA2LjUzODM1IDEzMS43OCA2LjQ2MjIgMTMxLjg2NiA2LjM4MjU5QzEzMS45NTMgNi4zMDI5OCAxMzIuMDM2IDYuMjI2ODMgMTMyLjExMiA2LjE0NzIyQzEzMi4yNTQgNi4zMTMzNiAxMzIuNDI3IDYuNDQ0OSAxMzIuNjI4IDYuNTQ4NzRDMTMyLjgyOCA2LjY1MjU4IDEzMy4wNSA2LjcwNDQ5IDEzMy4yOTIgNi43MDQ0OUMxMzMuNTE0IDYuNzA0NDkgMTMzLjcyNSA2LjY2Mjk2IDEzMy45MjYgNi41NzY0M0MxMzQuMTI2IDYuNDg5ODkgMTM0LjMgNi4zNzIyMSAxMzQuNDUyIDYuMjIzMzdDMTM0LjYwMSA2LjA3NDUzIDEzNC43MTggNS45MDE0NyAxMzQuODA1IDUuNzA0MTdDMTM0Ljg5MSA1LjUwNjg3IDEzNC45MzMgNS4yOTkxOSAxMzQuOTMzIDUuMDc3NjdDMTM0LjkzMyA0Ljg1NjE0IDEzNC44OTEgNC42NDg0NiAxMzQuODA1IDQuNDUxMTdDMTM0LjcxOCA0LjI1Mzg3IDEzNC42MDEgNC4wODQyNyAxMzQuNDUyIDMuOTQyMzVDMTM0LjMwMyAzLjgwMDQ0IDEzNC4xMjYgMy42ODYyMSAxMzMuOTI2IDMuNTk5NjhDMTMzLjcyNSAzLjUxMzE1IDEzMy41MTQgMy40NzE2MSAxMzMuMjkyIDMuNDcxNjFDMTMzLjA1IDMuNDcxNjEgMTMyLjgyMiAzLjU0MDg0IDEzMi42MDcgMy42NzU4M0wxMzIuNjEgMy42NTg1MloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMzYuOTM0IDUuMTYwODNDMTM2LjkzNCA0LjY0NTA5IDEzNy4wNDQgNC4xNjM5NyAxMzcuMjYyIDMuNzE3NDVDMTM3LjQ4IDMuMjcwOTQgMTM3Ljc2MSAyLjg1MjEyIDEzOC4xMDQgMi40Njc5MUMxMzguNDQ2IDIuMDgwMjUgMTM4LjgzIDEuNzIwMjcgMTM5LjI1MyAxLjM4NDUyQzEzOS42NzUgMS4wNDg3NyAxNDAuMDg3IDAuNzMzNzg4IDE0MC40ODggMC40Mzk1NzVDMTQwLjU2MSAwLjUyNjEwOCAxNDAuNjMgMC42MTI2NDIgMTQwLjY5NiAwLjcwMjYzNkMxNDAuNzY1IDAuNzkyNjMxIDE0MC44MzUgMC44NzkxNjQgMTQwLjkwNCAwLjk2NTY5N0MxNDAuMjk1IDEuMzc0MTMgMTM5LjggMS43NTgzNCAxMzkuNDE5IDIuMTE4MzJDMTM5LjAzOCAyLjQ3ODMgMTM4Ljc0IDIuODAwMiAxMzguNTMzIDMuMDc3MTFDMTM4LjYxOSAyLjk5NzUgMTM4LjcyIDIuOTM1MTkgMTM4LjgzNyAyLjg4MzI3QzEzOC45NTUgMi44MzQ4MiAxMzkuMDgzIDIuODA3MTIgMTM5LjIxOCAyLjgwNzEyQzEzOS41MzMgMi44MDcxMiAxMzkuODMxIDIuODY1OTcgMTQwLjEwOCAyLjk4MzY1QzE0MC4zODggMy4xMDEzNCAxNDAuNjMgMy4yNjQwMiAxNDAuODM4IDMuNDY4MjRDMTQxLjA0NiAzLjY3MjQ2IDE0MS4yMDggMy45MTEyOSAxNDEuMzMzIDQuMTg4MkMxNDEuNDU0IDQuNDY1MSAxNDEuNTE2IDQuNzU5MzIgMTQxLjUxNiA1LjA3NDNDMTQxLjUxNiA1LjM4OTI4IDE0MS40NTQgNS42ODM0OSAxNDEuMzMzIDUuOTYwNEMxNDEuMjEyIDYuMjM3MyAxNDEuMDQ2IDYuNDc2MTMgMTQwLjgzOCA2LjY4MDM1QzE0MC42MyA2Ljg4NDU3IDE0MC4zODggNy4wNDcyNSAxNDAuMTA4IDcuMTY4NEMxMzkuODI3IDcuMjg5NTUgMTM5LjUzMyA3LjM1MTg1IDEzOS4yMTggNy4zNTE4NUMxMzguOTAzIDcuMzUxODUgMTM4LjYxOSA3LjI5MzAxIDEzOC4zNDIgNy4xNzg3OEMxMzguMDY1IDcuMDY0NTYgMTM3LjgyNyA2LjkwODggMTM3LjYyMiA2LjcxMTUxQzEzNy40MTggNi41MTQyMSAxMzcuMjU1IDYuMjgyMyAxMzcuMTI3IDYuMDE1NzhDMTM3LjAwMyA1Ljc0NTc5IDEzNi45MzcgNS40NjE5NyAxMzYuOTMgNS4xNjQyOUwxMzYuOTM0IDUuMTYwODNaTTEzNy42MTkgNS4wNzQzQzEzNy42MTkgNS4yOTU4MiAxMzcuNjYgNS41MDY5NiAxMzcuNzQ0IDUuNzAwOEMxMzcuODI3IDUuODk4MDkgMTM3LjkzNyA2LjA2NzcgMTM4LjA4MyA2LjIxNjU0QzEzOC4yMjUgNi4zNjE5MSAxMzguMzk0IDYuNDc5NiAxMzguNTg4IDYuNTY2MTNDMTM4Ljc4MiA2LjY1MjY2IDEzOC45OSA2LjY5NDIgMTM5LjIxMSA2LjY5NDJDMTM5LjQzMyA2LjY5NDIgMTM5LjY0NCA2LjY1MjY2IDEzOS44NDUgNi41NjYxM0MxNDAuMDQ1IDYuNDc5NiAxNDAuMjE4IDYuMzY1MzcgMTQwLjM3MSA2LjIxNjU0QzE0MC41MiA2LjA3MTE2IDE0MC42MzcgNS44OTgwOSAxNDAuNzI0IDUuNzAwOEMxNDAuODEgNS41MDM1IDE0MC44NTIgNS4yOTU4MiAxNDAuODUyIDUuMDc0M0MxNDAuODUyIDQuODUyNzcgMTQwLjgxIDQuNjQ1MDkgMTQwLjcyNCA0LjQ0NzhDMTQwLjYzNyA0LjI1MDUgMTQwLjUyIDQuMDgwODkgMTQwLjM3MSAzLjkzODk4QzE0MC4yMjIgMy43OTcwNyAxNDAuMDQ1IDMuNjgyODQgMTM5Ljg0NSAzLjU5NjMxQzEzOS42NDQgMy41MDk3OCAxMzkuNDMzIDMuNDY4MjQgMTM5LjIxMSAzLjQ2ODI0QzEzOC45OSAzLjQ2ODI0IDEzOC43ODIgMy41MDk3OCAxMzguNTg4IDMuNTk2MzFDMTM4LjM5NCAzLjY4Mjg0IDEzOC4yMjggMy43OTcwNyAxMzguMDgzIDMuOTM4OThDMTM3Ljk0MSA0LjA4MDg5IDEzNy44MjcgNC4yNTA1IDEzNy43NDQgNC40NDc4QzEzNy42NiA0LjY0NTA5IDEzNy42MTkgNC44NTI3NyAxMzcuNjE5IDUuMDc0M1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNDIuMzg1IDMuNzU1NTVDMTQyLjM4NSAzLjI3MDk2IDE0Mi40NTQgMi44MTA2MSAxNDIuNTg5IDIuMzc3OTRDMTQyLjcyNCAxLjk0NTI3IDE0Mi45MjIgMS41Njc5OSAxNDMuMTc0IDEuMjQ2MDhDMTQzLjQyNyAwLjkyNDE4IDE0My43MzIgMC42NzE1MDMgMTQ0LjA4NSAwLjQ4NDU5MUMxNDQuNDM4IDAuMjk3NjggMTQ0LjgzNiAwLjIwNDIyNCAxNDUuMjgyIDAuMjA0MjI0QzE0NS43MjkgMC4yMDQyMjQgMTQ2LjEyMyAwLjMwMTE0MSAxNDYuNDggMC40OTQ5NzVDMTQ2LjgzMyAwLjY4ODgxIDE0Ny4xMzQgMC45NDg0MSAxNDcuMzggMS4yNzcyNEMxNDcuNjI2IDEuNjA2MDYgMTQ3LjgxNiAxLjk4NjgxIDE0Ny45NDQgMi40MTk0OEMxNDguMDcyIDIuODUyMTQgMTQ4LjEzOCAzLjMxMjUgMTQ4LjEzOCAzLjc5NzA4QzE0OC4xMzggNC4zMjY2NyAxNDguMDU1IDQuODA3NzkgMTQ3Ljg5MiA1LjI0NzM4QzE0Ny43MjYgNS42ODM1MSAxNDcuNTExIDYuMDU3MzMgMTQ3LjI0MSA2LjM2ODg1QzE0Ni45NzEgNi42ODAzNyAxNDYuNjYzIDYuOTIyNjcgMTQ2LjMxNCA3LjA5MjI3QzE0NS45NjQgNy4yNjUzNCAxNDUuNjAxIDcuMzQ4NDEgMTQ1LjIzIDcuMzQ4NDFDMTQ0Ljg2IDcuMzQ4NDEgMTQ0LjUgNy4yNTg0MSAxNDQuMTU3IDcuMDgxODlDMTQzLjgxNSA2LjkwNTM2IDE0My41MSA2LjY1NjE0IDE0My4yNDcgNi4zNDExNkMxNDIuOTg0IDYuMDI2MTggMTQyLjc3MyA1LjY0ODkgMTQyLjYyMSA1LjIwOTMxQzE0Mi40NjggNC43Njk3MiAxNDIuMzg5IDQuMjg1MTMgMTQyLjM4OSAzLjc1NTU1SDE0Mi4zODVaTTE0My4wNiAzLjc1NTU1QzE0My4wNiA0LjE3NzgzIDE0My4xMTkgNC41Njg5NiAxNDMuMjMzIDQuOTI1NDhDMTQzLjM0NyA1LjI4MiAxNDMuNTA3IDUuNTkzNTIgMTQzLjcwNCA1Ljg1MzEyQzE0My45MDUgNi4xMTI3MSAxNDQuMTM3IDYuMzIwMzkgMTQ0LjQgNi40NjkyM0MxNDQuNjYzIDYuNjE4MDcgMTQ0Ljk0MyA2LjY5NDIyIDE0NS4yMzcgNi42OTQyMkMxNDUuNTMyIDYuNjk0MjIgMTQ1LjgwMiA2LjYyMTUzIDE0Ni4wNjggNi40Nzk2MkMxNDYuMzM1IDYuMzM3NyAxNDYuNTczIDYuMTM2OTQgMTQ2Ljc3OCA1Ljg3NzM0QzE0Ni45ODIgNS42MTc3NCAxNDcuMTQ1IDUuMzEzMTUgMTQ3LjI3MyA0Ljk1MzE3QzE0Ny4zOTcgNC41OTY2NSAxNDcuNDU5IDQuMjA1NTIgMTQ3LjQ1OSAzLjc4MzI0QzE0Ny40NTkgMy40NDc0OSAxNDcuNDE4IDMuMTA0ODIgMTQ3LjMzMSAyLjc1ODY5QzE0Ny4yNDUgMi40MTI1NSAxNDcuMTEgMi4wOTc1NyAxNDYuOTMgMS44MTM3NEMxNDYuNzUgMS41Mjk5MSAxNDYuNTIxIDEuMzAxNDcgMTQ2LjI0OCAxLjEyMTQ4QzE0NS45NzUgMC45NDE0ODcgMTQ1LjY1NiAwLjg1NDk1NCAxNDUuMjgyIDAuODU0OTU0QzE0NC45MDggMC44NTQ5NTQgMTQ0LjU4NyAwLjk0MTQ4NyAxNDQuMzA2IDEuMTExMDlDMTQ0LjAyNiAxLjI4NDE2IDE0My43OTcgMS41MDkxNSAxNDMuNjE0IDEuNzg2MDVDMTQzLjQzMSAyLjA2NjQyIDE0My4yOTYgMi4zNzc5NCAxNDMuMjAyIDIuNzI0MDdDMTQzLjEwOSAzLjA3MDIxIDE0My4wNjQgMy40MTI4OCAxNDMuMDY0IDMuNzQ4NjNMMTQzLjA2IDMuNzU1NTVaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzM1M181NTQwIj4KPHJlY3Qgd2lkdGg9IjE0OC4xMzgiIGhlaWdodD0iNTEuMDcxOSIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" class="logo-presentacion">
                    <h2 class="title-presentacion">{{ fechaAno.getFullYear()}}</h2>
                    <h3 class="subtitle-presentacion">{{nombreEvaluacion}}</h3>
                    <!--<h3 class="subtitle-presentacion">A360º</h3>-->

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

                <div class="px-2">
                    <div class="graficatablas" >
                        <CChart type="radar"
                                v-if="resumenPuntuacionArea"
                                :data="resumenPuntuacionArea"
                                :height="300"
                                :width="300"
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
                            <div class="p-3" v-if="tamanoempresa.nombre == 'Microempresa'">
                                <img :src="microEmpresaNegro" />
                            </div>
                            <div class="p-3" v-else>
                                <img :src="microEmpresa" />
                            </div>

                            <div class="p-3" v-if="tamanoempresa.nombre == 'Pequeña Empresa'">
                                <img :src="pequenaEmpresaNegro" />
                            </div>
                            <div class="p-3" v-else>
                                <img :src="pequenaEmpresa" />
                            </div>

                            <div class="p-3" v-if="tamanoempresa.nombre == 'Mediana Empresa'">
                                <img :src="medianaEmpresaNegro" />
                            </div>
                                <div class="p-3" v-else>
                                <img :src="medianaEmpresa" />
                            </div>

                            <div class="p-3" v-if="tamanoempresa.nombre == 'Gran Empresa'">
                                <img :src="granEmpresaNegro" />
                            </div>
                            <div class="p-3" v-else>
                                <img :src="granEmpresa" />
                            </div>
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
                            <h6 v-if="userSelected.empresa">{{userSelected.empresa.rutEmpresa}}</h6>
                            <h6 v-if="userSelected.empresa">{{userSelected.empresa.razonSocial}}</h6>
                        </div>
                        <div class="parrafo-madurez">
                            <p>{{IM.nivelReporte}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="html2pdf__page-break"></div>

            <div class="cards-grafictabsresult pt-4">


                <div  class="px-2">
                    <div class="graficatablas" >
                        <CChart type="bar"
                                v-if="resumenImportanciaRelativa"
                                :data="resumenImportanciaRelativa"
                                :height="250"
                                :width="200"
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


                        <CChart type="bar" :data="ima.resumenCapacidad" v-if="ima.resumenCapacidad"
                                :height="200"
                                :width="400"
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
                                            <tr :v-if="capacidadvalorMayor.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length>0 && capacidadvalorMayor.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length<3"  v-for="capacidadMayor in capacidadvalorMayor" :value="capacidadMayor.segmentacionAreaId" :key="capacidadMayor.segmentacionAreaId">
                                                <td class="w-1" v-if="capacidadMayor.segmentacionAreaId === ima.segmentacionAreaId">
                                                    <h4 class="text-center text-md-start uppercase" >{{capacidadMayor.capacidad}}</h4>
                                                </td>
                                                <!--<td class="">
                                                    <h4 class="">Nivel {{parseFloat(top3capacidadByarea.imsaValor).toFixed(0)}}</h4>
                                                </td>-->
                                            </tr>
                                            <tr  v-if="capacidadvalorMayor.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length==0">
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
                                            <!--<tr v-if="top3peoresCapacidadesByarea.length >0" v-for="top3PeorCapacidadByArea in top3peoresCapacidadesByarea" :value="top3PeorCapacidadByArea.segmentacionAreaId" :key="top3PeorCapacidadByArea.segmentacionAreaId">
                                                <td class="w-1">
                                                    <h4 class="text-center text-md-start uppercase" >{{top3PeorCapacidadByArea.capacidad}}</h4>
                                                </td>-->
                                                <!--<td class="">
                                                    <h4 class="">Nivel {{parseFloat(top3PeorCapacidadByArea.imsaValor).toFixed(0)}}</h4>
                                                </td>-->
                                            <tr :v-if="capacidadvalorMenor.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length>0 && capacidadvalorMenor.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length<3"  v-for="capacidadMenor in capacidadvalorMenor" :value="capacidadMenor.segmentacionAreaId" :key="capacidadMenor.segmentacionAreaId">
                                                <td class="w-1" v-if="capacidadMenor.segmentacionAreaId === ima.segmentacionAreaId">
                                                    <h4 class="text-center text-md-start uppercase" >{{capacidadMenor.capacidad}}</h4>
                                                </td>
                                            </tr>
                                            <tr v-if="capacidadvalorMenor.filter(x=> x.segmentacionAreaId == ima.segmentacionAreaId).length==0">
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
                                    <tr v-for="recomendacion in feedback" :key="recomendacion.id">
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
    .uppercase {
        text-transform: uppercase;
    }

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
        margin-left: 30px;
        margin-right: 30px;
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

    /*table, th, tr {
        border: 1px solid #283252;
        border-collapse: collapse;
    }*/

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

    .cards-grafictabsresultreporte {
        width: 100%;
        box-shadow: 1px 10px 5px 0px rgba(224, 224, 224, 0.75);
        -webkit-box-shadow: 1px 10px 5px 0px rgba(224, 224, 224, 0.75);
        -moz-box-shadow: 1px 10px 5px 0px rgba(224, 224, 224, 0.75);
        border-radius: 8px;
        background-color: white;
        /*display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;*/
        color: black;
        padding: 0px 0px 0px 0px;
        text-align: center;
        }
        .cards-grafictabsresultreporte h2, .cards-grafictabsresultreporte .h2 {
        font-size: 20px;
        font-weight: 600;
        color: #283252;
        margin-bottom: 1.5rem;
        margin-top: 1.5rem;
        }
        .cards-grafictabsresultreporte h3, .cards-grafictabsresultreporte .h3 {
        font-size: 12px;
        font-weight: 400;
        color: #283252;
        margin-bottom: 16px;
        }
        .cards-grafictabsresultreporte p {
        font-size: 14px;
        font-weight: 200;
        text-align: justify;
        }
        .cards-grafictabsresultreporte .bodycard {
        background-color: #15ACC0;
        padding: 1rem;
        color: white;
        width: 100%;
        height: -webkit-fill-available;
        }
        .cards-grafictabsresultreporte .bodycard h2, .cards-grafictabsresultreporte .bodycard .h2 {
        color: white !important;
        }
        .cards-grafictabsresultreporte .titlecard {
        width: 100%;
        background-color: #15ACC0;
        padding: 1.5rem;
        display: flex;
        justify-content: flex-start;
        }
        .cards-grafictabsresultreporte .titlecard h3, .cards-grafictabsresultreporte .titlecard .h3 {
        font-size: 14px;
        font-weight: 600;
        color: white;
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
import granEmpresaNegro from "@/assets/img/tamanoempresa/Gran empresa.png";
import granEmpresa from "@/assets/img/tamanoempresa/Gran empresa 2.png";
import granEmpresaBlanco from "@/assets/img/tamanoempresa/Gran empresa 3.png";
import medianaEmpresaNegro from "@/assets/img/tamanoempresa/Mediana empresa.png";
import medianaEmpresa from "@/assets/img/tamanoempresa/Mediana empresa 2.png";
import medianaEmpresaBlanco from "@/assets/img/tamanoempresa/Mediana empresa 3.png";
import microEmpresaNegro from "@/assets/img/tamanoempresa/Micro empresa.png";
import microEmpresa from "@/assets/img/tamanoempresa/Micro empresa 2.png";
import microEmpresaBlanco from "@/assets/img/tamanoempresa/Micro empresa 3.png";
import pequenaEmpresaNegro from "@/assets/img/tamanoempresa/Pequena empresa.png";
import pequenaEmpresa from "@/assets/img/tamanoempresa/Pequena empresa 2.png";
import pequenaEmpresaBlanco from "@/assets/img/tamanoempresa/Pequena empresa 3.png";



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
        fechaAno : new Date(),
        pdfBool: false,
        contadorLineas:1,
        userSelected: [],
        empresa: [],
        fechaHoy : "",
        rutempresa: "",
        idempresa: "",
        tamanoempresa: [],
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
        feedback: [],
        completoData: false,
        muestraBotonDescarga: true,
    });

      const route = useRoute();
      const lineasContador = () => {
          var salida = true;

          if (state.contadorLineas == 4) {
              state.contadorLineas = 1;
              salida = true;
          } else {
              state.contadorLineas++
              salida = false;
          }
          return salida;
      };
    
    const exportToPDF = () => {
       // /*html2pdf(document.getElementById("document_container"), {
       //     filename: "Evaluacion.pdf",
       //     pagebreak:    { after: [".Pagina"] , avoid: ["canvas",".Seccion"]},
       //     html2canvas:  { dpi: 192, scale: 2, letterRendering: true},
       //     jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait'},
       //     margin:       [30, 0, 30, 0], //top, left, buttom, right
       //     image:        { type: 'canvas', quality: 1 },
       // });*/
       // //var totalPages = pdf.putTotalPages().internal.getNumberOfPages()
       // //console.log("Total Pages: " + totalPages);
       ////console.log("localStorage.usuarioModel",localStorage.usuarioModel);
        
       //var element = document.getElementById('document_pdf');
       //// var document_container = document.getElementById("document_container")
       //// if(element.style.display == ""){  
       ////         element.style.display = "none";  
       //// } else {  
       ////     element.style.display = "";  
       //// } 

       ////if(document_container.style.display == ""){  
       ////     document_container.style.display = "none";  
       //// } else {  
       ////     document_container.style.display = "";  
       //// } 


       //  //var element = document.getElementById("document_container").className.replace( /(?:^|\s)dfgd (?!\S)/g , ' fade' );

       //   // element.setAttribute("hidden", "some_class_name");
       //   //element.className.replace( /(?:^|\s)hidden(?!\S)/g , ' fade' );
       //     //if(element.style.display == ""){  
       //     //    element.style.display = "none";  
       //     //} else {  
       //     // element.style.display = "";  
       //     //}  


       //         console.log("element",element);
        
       // //      element.forEach((elemento) => {
       // //  elemento.classList.remove('tab-pane');
       // //});
        
       // //console.log("element",element);
       // var opt = {
       //     margin: 0.5,
       //     filename: state.nombreEvaluacion + '_' + state.fechaHoy +'Evaluacion.pdf',
       //     image: {
       //         type: 'canvas',
       //         quality: 0.98
       //     },
       //     html2canvas: {
       //         scale: 3,
       //         logging: true,
       //         dpi: 192,
       //         letterRendering: true
       //     },
       //     jsPDF: {
       //         unit: 'pt',
       //         format: 'A5',
       //         orientation: 'landscape'//'landscape'//'portrait'
       //     },
       //     //pagebreak: { 
       //     //    after: [".Pagina"], 
       //     //    avoid: ["canvas",".Seccion"]
       //     //},
       // };
       // //var cabecera = document.getElementById('cabecera');
       // //element.classList.remove("tab-pane");
        
        
        
        
       // //html2pdf().from(element).set(opt) .save();

       
       // html2pdf().from(element).set(opt).toPdf().get('pdf')
            
       //     //.then(function(pdf) {
       //     //var totalPages = pdf.internal.getNumberOfPages();
       // //    for (let i = 1; i <= totalPages; i++) {
       // //        //pdf.html(cabecera.innerHTML);
       // //        pdf.setPage(i);
       // //        pdf.setFontSize(10);
       // //        pdf.setTextColor(100);
       // //        pdf.text('Página ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() / 2.3), (pdf.internal.pageSize.getHeight() - 0.8));
       // //    }
       // //})          
       //     .save();
       //   state.pdfBool = !state.pdfBool;


       ////         if(element.style.display == ""){  
       ////         element.style.display = "none";  
       //// } else {  
       ////     element.style.display = "";  
       //// } 

       ////if(document_container.style.display == ""){  
       ////     document_container.style.display = "none";  
       //// } else {  
       ////     document_container.style.display = "";  
       //// } 
      };
      const downloadPDF = () => {
          var element = document.getElementById('download_pdf');

          var opt = {
              margin: 0.5,
              filename: state.nombreEvaluacion + '_' + state.fechaHoy + 'Evaluacion.pdf',
              image: {
                  type: 'jpeg',
                  quality: 0.98
              },
              html2canvas: {
                  scale: 2,
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
         // state.pdfBool = !state.pdfBool;

 
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
            await getEmpresa();
            await getIM();
            await getIMA();
            await getIMSA();
            await GetCapacidadSubAreas();
            await getFeedbackArea();
            await graficoMadurezGeneral();
            await getGraficoImportanciaRelativa();
            await getGraficoCapacidad();
            await getPuntuacionArea();
            state.completoData = true;

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

     const getEmpresa = async () => {
        let bodyEmpresa = {
            "id": state.idempresa
        }
        return ApibackOffice.post("Empresa/GetEmpresaById", bodyEmpresa,
            { headers: header }
        )
        .then((response) => {
            if (response.status != 200) return false;
            state.empresa = response.data;
            let bodyTipoTamano = {
                "id" : state.empresa.tipoTamanoEmpresaId
            }
            return ApibackOffice.post("TipoTamanoEmpresa/GetTipoTamanoEmpresaById", bodyTipoTamano,
                { headers: header }
            )
            .then((response) => {
                if (response.status != 200) return false;
                state.tamanoempresa = response.data;
            })
            .catch((error) => {
                console.log("error->", error);
            });
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
            state.nivelMadurez = state.IM.imValor.toFixed(0);
            state.nivelMadurez = parseInt(state.nivelMadurez);
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
            state.capacidadSubAreas.forEach((element) => {
                state.IMSA.forEach((x) => {
                    if (x.segmentacionSubAreaId == element.segmentacionSubAreaId){
                        if (x.imsaValor >= 4 && element.pesoRelativoCapacidadValor >= 3){
                            element.imsaValor = x.imsaValor;
                            state.capacidadvalorMayor.push(element);
                        }
                        if (x.imsaValor < 4 && element.pesoRelativoCapacidadValor >= 3 ){
                            element.imsaValor = x.imsaValor;
                            state.capacidadvalorMenor.push(element);
                        }

                    }
                });
            });
            state.capacidadvalorMayor = state.capacidadvalorMayor.sort(((a, b) =>  b.imsaValor - a.imsaValor));
            state.capacidadvalorMayor = state.capacidadvalorMayor.sort(((a, b) =>  b.pesoRelativoCapacidadValor - a.pesoRelativoCapacidadValor));
            state.capacidadvalorMenor = state.capacidadvalorMenor.sort(((a, b) =>  a.imsaValor - b.imsaValor));
            state.capacidadvalorMenor = state.capacidadvalorMenor.sort(((a, b) =>  a.pesoRelativoCapacidadValor - b.pesoRelativoCapacidadValor));
            return;
        })
        .catch((error) => {
            console.log("error->", error);
        });
    };

    const graficoMadurezGeneral = async () => {
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

    const getGraficoImportanciaRelativa = async() => {

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

    const getPuntuacionArea = async () => { 
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

                if ( element.respuestaValor != '4'){
                    state.feedback.push(element);
                }
            });
            return;
        })
        .catch((error) => {
            console.log("error->", error);
        });
    };

    const areaSelected = (ima) => { 
        state.top3capacidadesByarea = [];
        state.top3peoresCapacidadesByarea = [];
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

      onMounted(async () => {
       //   console.log("onMounted");
          getInfo();

          setTimeout(function () {
              state.muestraBotonDescarga = false;
          }, 3500);
    });

    return {
        ...toRefs(state),
        lineasContador,
        exportToPDF,
        downloadPDF,
        horizonalLinePlugin,
        areaSelected,
        resumenSelected,
        feedbackSelected,
        granEmpresaNegro,
        granEmpresa,
        granEmpresaBlanco,
        medianaEmpresaNegro,
        medianaEmpresa,
        medianaEmpresaBlanco,
        microEmpresaNegro,
        microEmpresa,
        microEmpresaBlanco,
        pequenaEmpresaNegro,
        pequenaEmpresa,
        pequenaEmpresaBlanco,
    };
  },
};
</script>
