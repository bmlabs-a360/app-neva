<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
  <!-- FILTRO -->
  <CRow>
    <CCol :md="12">
      <CCard
        id="filtro_transaccion"
        class="mb-4"
        data-aos="fade-up"
        data-aos-easing="ease"
      >
        <CCardHeader>
          <CRow>
            <CCol :sm="8">
              <strong>Filtros</strong>&nbsp;<small>Transacción</small>
            </CCol>
            <CCol :sm="2">
              <CButton
                id="limpiar_transacciones"
                color="dark"
                class="float-end"
                @click="limpiarFiltros"
              >
                <CIcon :icon="cilSearch" /> Limpiar
              </CButton>
            </CCol>
            <CCol :sm="2">
              <CButton
                id="buscar_transacciones"
                color="primary"
                class="float-end"
                @click="getTransaccionesByFilter(true)"
              >
                <CIcon :icon="cilSearch" /> Buscar
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CContainer>
            <CRow>
              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="fechaInicio">Fecha inicio</CFormLabel>
                <CFormInput
                  size="sm"
                  type="date"
                  @keypress="buscarEnter"
                  id="fechaInicio"
                />
              </CCol>
              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="fechaFin">Fecha fin</CFormLabel>
                <CFormInput
                  size="sm"
                  type="date"
                  @keypress="buscarEnter"
                  id="fechaFin"
                />
              </CCol>
              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="token">Token</CFormLabel>
                <CFormInput
                  size="sm"
                  type="text"
                  @keypress="buscarEnter"
                  id="token"
                  placeholder="aa4b476624e54956b70c0066122bbc20"
                  maxlength="32"
                />
              </CCol>
            </CRow>

            <CRow class="pt-2">
              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="canalid">Canal</CFormLabel>
                <CFormSelect
                  id="canalid"
                  size="sm"
                  @change="getFormaPagoByIdCanal"
                >
                  <option :key="0">Seleccione un canal</option>
                  <option
                    v-for="canal in canales"
                    :value="canal.id"
                    :key="canal.id"
                  >
                    {{ canal.nombre }}
                  </option>
                </CFormSelect>
              </CCol>
              <CCol sm="12" md="4" lg="4">
                <CFormLabel
                  for="medioPagoId"
                  v-c-tooltip="'Seleccione un canal para ver su formas de pago'"
                  >Medio Pago</CFormLabel
                >
                <CFormSelect id="medioPagoId" size="sm" disabled>
                  <option :key="0">Seleccione una forma pago</option>
                  <option
                    v-for="forma in formaspagocanal"
                    :value="forma.id"
                    :key="forma.id"
                  >
                    {{ forma.nombre }} - ({{ forma.acouuntcode }})
                  </option>
                </CFormSelect>
              </CCol>
              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="clienteCodigo">Cliente código</CFormLabel>
                <CFormInput
                  size="sm"
                  type="text"
                  @keypress="buscarEnter"
                  id="clienteCodigo"
                  placeholder="Código del cliente"
                />
              </CCol>
            </CRow>

            <CRow class="pt-2">
              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="codAutorizacion"
                  >Código autorización</CFormLabel
                >
                <CFormInput
                  size="sm"
                  type="text"
                  @keypress="buscarEnter"
                  id="codAutorizacion"
                  placeholder="Código aut. forma pago"
                />
              </CCol>

              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="codEstado">Estado</CFormLabel>
                <CFormSelect id="codEstado" size="sm">
                  <option :key="0">Seleccione un estado</option>
                  <option v-for="est in estados" :value="est.id" :key="est.id">
                    {{ est.nombre == "CONTAB" ? "CONTABILIZADO" : est.nombre }}
                  </option>
                </CFormSelect>
              </CCol>

              <CCol sm="12" md="4" lg="4">
                <CFormLabel for="OC">OC</CFormLabel>
                <CFormInput
                  size="sm"
                  type="text"
                  @keypress="buscarEnter"
                  id="OC"
                  placeholder="Id de transacción"
                />
              </CCol>
            </CRow>
          </CContainer>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <!-- FILTRO -->

  <!-- LISTADO -->
  <CRow>
    <CCol :md="12">
      <CCard
        id="listado_transaccion"
        class="mb-4"
        data-aos="fade-up"
        data-aos-easing="ease"
      >
        <CCardHeader>
          <CRow>
            <CCol :sm="7">
              <strong>Listado de Transacciones</strong>&nbsp;<br />
            </CCol>
            <CCol :sm="5" class="d-none d-md-block">
              <CButton
                id="descargar_transaccion"
                color="primary"
                class="float-end"
                @click="
                  () => {
                    visibleModalExportacion = true;
                  }
                "
              >
                <CIcon icon="cil-cloud-download" />
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable responsive striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell class="text-center" scope="col">
                  OC&nbsp;<orderbyicon
                    v-if="transacciones"
                    :id="orderByTransaccion.OC.id"
                    :defaultDirection="orderByTransaccion.OC.direction"
                    :onClickOrderBy="OrderByTransaccion"
                  ></orderbyicon>
                </CTableHeaderCell>
                <CTableHeaderCell class="text-center" scope="col"
                  >Canal</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Medio&nbsp;Pago</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Estado</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col">
                  Fecha Creación&nbsp;<orderbyicon
                    v-if="transacciones"
                    :id="orderByTransaccion.FechaCreacion.id"
                    :defaultDirection="
                      orderByTransaccion.FechaCreacion.direction
                    "
                    :onClickOrderBy="OrderByTransaccion"
                  ></orderbyicon>
                </CTableHeaderCell>
                <CTableHeaderCell class="text-center" scope="col">
                  Fecha Estado&nbsp;<orderbyicon
                    v-if="transacciones"
                    :id="orderByTransaccion.FechaEstado.id"
                    :defaultDirection="orderByTransaccion.FechaEstado.direction"
                    :onClickOrderBy="OrderByTransaccion"
                  ></orderbyicon>
                </CTableHeaderCell>
                <CTableHeaderCell class="text-center" scope="col">
                  Total&nbsp;<orderbyicon
                    v-if="transacciones"
                    :id="orderByTransaccion.Total.id"
                    :defaultDirection="orderByTransaccion.Total.direction"
                    :onClickOrderBy="OrderByTransaccion"
                  ></orderbyicon>
                </CTableHeaderCell>
                <CTableHeaderCell class="text-center" scope="col"
                  >Nombre&nbsp;cliente</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Acciones</CTableHeaderCell
                >
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-if="!transacciones" color="warning">
                <CTableDataCell colspan="9" class="text-center"
                  ><strong id="textEmpty"
                    >Utilice los filtos para buscar transacciones</strong
                  ></CTableDataCell
                >
              </CTableRow>

              <CTableRow v-for="tran in transacciones" :key="tran.id">
                <CTableDataCell class="text-center">{{
                  tran.id
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  tran.canalId
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  tran.medioPago ? tran.medioPago.nombre : "Sin Forma Pago"
                }}</CTableDataCell>
                <CTableDataCell class="text-center">
                  <CBadge :color="getStyleSegunEstado(tran.estadoId)">{{
                    tran.estadoId == "CONTAB" ? "CONTABILIZADO" : tran.estadoId
                  }}</CBadge>
                </CTableDataCell>
                <CTableDataCell class="text-center">{{
                  new Date(tran.fechaCreacion).toLocaleString()
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  new Date(tran.fechaEstado).toLocaleString()
                }}</CTableDataCell>
                <CTableDataCell class="text-start">{{
                  formatterMoney.format(tran.total)
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  tran.clienteNombre
                }}</CTableDataCell>
                <CTableDataCell class="text-center">
                  <CButton @click="getTransaccionDetalle(tran.id)">
                    <CIcon
                      :icon="cilZoomIn"
                      title="Ver detalles de la transacción"
                      size="lg"
                    />
                  </CButton>
                  <CButton @click="getBitacoraByIdTrx(tran.id)">
                    <CIcon
                      :icon="cilStorage"
                      title="Ver registro de bitácora de la transacción"
                      size="lg"
                    />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
        <CCardFooter v-if="transacciones">
          <paginate
            v-model="initialPage"
            :page-count="totaltransacciones"
            :page-range="3"
            :margin-pages="2"
            :click-handler="selectedPagination"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'"
          >
          </paginate>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
  <!-- LISTADO -->

  <!-- MODAL-DETALLE -->
  <CRow>
    <CModal
      size="lg"
      alignment="center"
      :visible="visibleModalDetalle"
      @close="
        () => {
          visibleModalDetalle = false;
        }
      "
    >
      <CModalHeader>
        <CModalTitle>Transacción</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CContainer class="pt-2">
          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink
                href="javascript:void(0);"
                :active="tabPaneActiveKey === 1"
                @click="
                  () => {
                    tabPaneActiveKey = 1;
                  }
                "
              >
                Datos Transacción
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="javascript:void(0);"
                :active="tabPaneActiveKey === 2"
                @click="
                  () => {
                    tabPaneActiveKey = 2;
                  }
                "
              >
                Datos Cliente
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="javascript:void(0);"
                :active="tabPaneActiveKey === 3"
                @click="
                  () => {
                    tabPaneActiveKey = 3;
                  }
                "
              >
                Detalle
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="javascript:void(0);"
                :active="tabPaneActiveKey === 4"
                @click="
                  () => {
                    tabPaneActiveKey = 4;
                  }
                "
              >
                Devolución
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane
              role="tabpanel"
              aria-labelledby="home-tab"
              :visible="tabPaneActiveKey === 1"
            >
              <CContainer class="pt-2">
                <CRow>
                  <CCol sm="12" md="6" lg="6">
                    <CFormLabel for="canalId">Canal</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      v-model="transaccionSelectedDetalle.canalId"
                      disabled
                    />
                  </CCol>

                  <CCol sm="12" md="6" lg="6">
                    <CFormLabel for="authcode">Código autorización</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      maxlength="100"
                      v-model="transaccionSelectedDetalle.authcode"
                      disabled
                    />
                  </CCol>
                </CRow>

                <CRow class="pt-1">
                  <CCol sm="12" md="12" lg="12">
                    <CFormLabel for="urlboleta">URL DTE</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      maxlength="255"
                      v-model="transaccionSelectedDetalle.urlboleta"
                    />
                  </CCol>

                  <CCol sm="12" md="12" lg="12">
                    <CFormLabel for="descripcion">Descripción</CFormLabel>
                    <CFormTextarea
                      rows="2"
                      type="text"
                      maxlength="1000"
                      v-model="transaccionSelectedDetalle.descripcion"
                    />
                  </CCol>
                </CRow>

                <CRow class="pt-1">
                  <CCol sm="12" md="6" lg="6">
                    <CFormLabel for="categoria">Categoría</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      maxlength="25"
                      v-model="transaccionSelectedDetalle.categoria"
                    />
                  </CCol>

                  <CCol sm="12" md="6" lg="6">
                    <CFormLabel for="token">Token</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      v-model="transaccionSelectedDetalle.token"
                      disabled
                    />
                  </CCol>
                </CRow>

                <CRow class="pt-1">
                  <CCol sm="12" md="4" lg="4">
                    <CFormLabel for="id">OC</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      v-model="transaccionSelectedDetalle.id"
                      disabled
                    />
                  </CCol>

                  <CCol sm="12" md="4" lg="4">
                    <CFormLabel for="cuotas">Cuotas</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="number"
                      oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
                      maxlength="50"
                      v-model="transaccionSelectedDetalle.cuotas"
                      :value="transaccionSelectedDetalle.cuotas || 0"
                    />
                  </CCol>

                  <CCol sm="12" md="4" lg="4">
                    <CFormLabel for="extra">Extra</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      maxlength="1000"
                      v-model="transaccionSelectedDetalle.extra"
                      disabled
                    />
                  </CCol>
                </CRow>

                <CRow class="pt-1">
                  <CCol sm="12" md="6" lg="6">
                    <CFormLabel for="estadoId">Estado</CFormLabel>
                    <CFormSelect
                      id="estadoId"
                      size="sm"
                      v-model="transaccionSelectedDetalle.estadoId"
                    >
                      <option :key="0">Seleccione un estado</option>
                      <option
                        v-for="est in estados"
                        :value="est.id"
                        :key="est.id"
                      >
                        {{
                          est.nombre == "CONTAB" ? "CONTABILIZADO" : est.nombre
                        }}
                      </option>
                    </CFormSelect>
                  </CCol>

                  <CCol sm="12" md="6" lg="6">
                    <CFormLabel for="fechaEstado">Fecha Estado</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      v-model="transaccionSelectedDetalle.fechaEstado"
                      :value="
                        new Date(
                          transaccionSelectedDetalle.fechaEstado
                        ).toLocaleString()
                      "
                      disabled
                    />
                  </CCol>
                </CRow>

                <CRow class="pt-1">
                  <CCol sm="12" md="4" lg="4">
                    <CFormLabel for="fechaVencimiento"
                      >Fecha Vencimiento</CFormLabel
                    >
                    <CFormInput
                      size="sm"
                      type="text"
                      v-model="transaccionSelectedDetalle.fechaVencimiento"
                      :value="
                        new Date(
                          transaccionSelectedDetalle.fechaVencimiento
                        ).toLocaleString()
                      "
                      disabled
                    />
                  </CCol>

                  <CCol sm="12" md="4" lg="4">
                    <CFormLabel for="mediopagoId">Medio Pago</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      v-model="transaccionSelectedDetalle.mediopagoId"
                      disabled
                    />
                  </CCol>

                  <CCol sm="12" md="4" lg="4">
                    <CFormLabel for="moneda">Moneda</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      v-model="transaccionSelectedDetalle.moneda"
                      disabled
                    />
                  </CCol>
                </CRow>

                <CRow class="pt-1">
                  <CCol sm="12" md="4" lg="4">
                    <CFormLabel for="impuesto">Impuesto</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      v-model="transaccionSelectedDetalle.impuesto"
                      :value="
                        formatterMoney.format(
                          transaccionSelectedDetalle.impuesto
                        )
                      "
                      disabled
                    />
                  </CCol>

                  <CCol sm="12" md="4" lg="4">
                    <CFormLabel for="tarifa">Tarifa</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      v-model="transaccionSelectedDetalle.tarifa"
                      :value="
                        formatterMoney.format(transaccionSelectedDetalle.tarifa)
                      "
                      disabled
                    />
                  </CCol>

                  <CCol sm="12" md="4" lg="4">
                    <CFormLabel for="total">Total</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      v-model="transaccionSelectedDetalle.total"
                      :value="
                        formatterMoney.format(transaccionSelectedDetalle.total)
                      "
                      disabled
                    />
                  </CCol>
                </CRow>

                <CRow class="pt-1">
                  <CCol sm="12" md="12" lg="12">
                    <CFormLabel for="observacion">Observación</CFormLabel>
                    <CFormTextarea
                      rows="3"
                      type="text"
                      maxlength="3000"
                      v-model="transaccionSelectedDetalle.observacion"
                    />
                  </CCol>
                </CRow>
              </CContainer>
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="profile-tab"
              :visible="tabPaneActiveKey === 2"
            >
              <CContainer class="pt-3">
                <CRow>
                  <CCol sm="12" md="6" lg="6">
                    <CFormLabel for="clienteNombre">Nombre</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      maxlength="100"
                      v-model="transaccionSelectedDetalle.clienteNombre"
                    />
                  </CCol>

                  <CCol sm="12" md="6" lg="6">
                    <CFormLabel for="clienteCodigo">Código</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      maxlength="32"
                      v-model="transaccionSelectedDetalle.clienteCodigo"
                    />
                  </CCol>
                </CRow>

                <CRow class="pt-1">
                  <CCol sm="12" md="4" lg="4">
                    <CFormLabel for="clienteRegion">Región</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      maxlength="100"
                      v-model="transaccionSelectedDetalle.clienteRegion"
                    />
                  </CCol>

                  <CCol sm="12" md="4" lg="4">
                    <CFormLabel for="clienteComuna">Comuna</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      maxlength="100"
                      v-model="transaccionSelectedDetalle.clienteComuna"
                    />
                  </CCol>

                  <CCol sm="12" md="4" lg="4">
                    <CFormLabel for="clienteTelefono">Teléfono</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      maxlength="100"
                      v-model="transaccionSelectedDetalle.clienteTelefono"
                    />
                  </CCol>
                </CRow>

                <CRow class="pt-1">
                  <CCol sm="12" md="6" lg="6">
                    <CFormLabel for="clienteDireccion">Dirección</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      maxlength="100"
                      v-model="transaccionSelectedDetalle.clienteDireccion"
                    />
                  </CCol>

                  <CCol sm="12" md="6" lg="6">
                    <CFormLabel for="clienteEmail">Email</CFormLabel>
                    <CFormInput
                      size="sm"
                      type="text"
                      maxlength="100"
                      v-model="transaccionSelectedDetalle.clienteEmail"
                    />
                  </CCol>
                </CRow>
              </CContainer>
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="contact-tab"
              :visible="tabPaneActiveKey === 3"
            >
              <CContainer class="pt-3">
                <CRow>
                  <CTable responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell class="text-center" scope="col"
                          >Código</CTableHeaderCell
                        >
                        <CTableHeaderCell class="text-center" scope="col"
                          >Descripción</CTableHeaderCell
                        >
                        <CTableHeaderCell class="text-center" scope="col"
                          >Cantidad</CTableHeaderCell
                        >
                        <CTableHeaderCell class="text-center" scope="col"
                          >Total</CTableHeaderCell
                        >
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow
                        v-for="detalle in transaccionSelectedDetalle.transaccionDetalles"
                        :key="detalle.productoCode"
                      >
                        <CTableDataCell class="text-center">{{
                          detalle.productoCode
                        }}</CTableDataCell>
                        <CTableDataCell class="text-center">{{
                          detalle.nombre
                        }}</CTableDataCell>
                        <CTableDataCell class="text-center">{{
                          detalle.cantidad
                        }}</CTableDataCell>
                        <CTableDataCell class="text-center">{{
                          formatterMoney.format(detalle.total)
                        }}</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </CRow>
              </CContainer>
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="contact-tab"
              :visible="tabPaneActiveKey === 4"
            >
              <CContainer class="pt-3">
                <CRow>
                  <CCol sm="12" md="6" lg="6">
                    <CFormTextarea
                      size="sm"
                      maxlength="255"
                      placeholder="Ingrese el motivo de la devolución"
                      v-model="devolucion.motivo"
                    />
                  </CCol>
                  <CCol sm="12" md="6" lg="6">
                    <CButton color="danger" @click="devolucionTransaccion"
                      >Devolución</CButton
                    >
                  </CCol>
                </CRow>
              </CContainer>
            </CTabPane>
          </CTabContent>
        </CContainer>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          @click="
            () => {
              visibleModalDetalle = false;
            }
          "
        >
          Cerrar
        </CButton>
        <CButton color="primary" @click="updateTransaccion">Guardar</CButton>
      </CModalFooter>
    </CModal>
  </CRow>
  <!-- MODAL-DETALLE -->

  <!-- MODAL-BITACORA -->
  <CRow>
    <CModal
      size="xl"
      alignment="center"
      :visible="visibleModalBitacora"
      @close="
        () => {
          visibleModalBitacora = false;
        }
      "
    >
      <CModalHeader>
        <CModalTitle>Bitácora</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CContainer>
          <CRow>
            <CTable responsive striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell class="text-center" scope="col"
                    >Id</CTableHeaderCell
                  >
                  <CTableHeaderCell class="text-center" scope="col"
                    >OC</CTableHeaderCell
                  >
                  <CTableHeaderCell class="text-center" scope="col"
                    >Estado</CTableHeaderCell
                  >
                  <CTableHeaderCell class="text-center" scope="col"
                    >Fecha</CTableHeaderCell
                  >
                  <CTableHeaderCell class="text-start" scope="col"
                    >Descripción</CTableHeaderCell
                  >
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow
                  v-for="bit in transaccionSelectedBitacora"
                  :key="bit.id"
                >
                  <CTableDataCell class="text-center">{{
                    bit.id
                  }}</CTableDataCell>
                  <CTableDataCell class="text-center">{{
                    bit.transaccionId
                  }}</CTableDataCell>
                  <CTableDataCell class="text-center">{{
                    bit.estadoId
                  }}</CTableDataCell>
                  <CTableDataCell class="text-center">{{
                    new Date(bit.fecha).toLocaleString()
                  }}</CTableDataCell>
                  <CTableDataCell class="text-start">{{
                    bit.descripcion
                  }}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CRow>
        </CContainer>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          @click="
            () => {
              visibleModalBitacora = false;
            }
          "
        >
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  </CRow>
  <!-- MODAL-BITACORA -->

  <!-- MODAL-EXPORTAR -->
  <CRow>
    <CModal
      size="lg"
      alignment="center"
      :visible="visibleModalExportacion"
      @close="
        () => {
          visibleModalExportacion = false;
        }
      "
    >
      <CModalHeader>
        <CModalTitle>Tipo de exportación</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CContainer>
          <CRow>
            <div class="d-grid gap-2 col-6 mx-auto">
              <CButton
                color="primary"
                variant="outline"
                shape="rounded-pill"
                @click="exportExcel('xlsx')"
                >Hoja de cálculo excel (xlsx)</CButton
              >
              <CButton
                color="primary"
                variant="outline"
                shape="rounded-pill"
                @click="exportExcel('csv')"
                >Valores separados por comas (csv)</CButton
              >
              <CButton
                color="primary"
                variant="outline"
                shape="rounded-pill"
                @click="exportExcel('txt')"
                >Texto plano (txt)</CButton
              >
            </div>
          </CRow>
        </CContainer>
      </CModalBody>
    </CModal>
  </CRow>
  <!-- MODAL-EXPORTAR -->
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import swal from "sweetalert";
import { cilSearch, cilStorage, cilZoomIn } from "@coreui/icons";
import Paginate from "vuejs-paginate-next";
import * as XLSX from "xlsx";
import ApiNeva from "@/api/ApiNeva";
import { difDias, getStyleSegunEstado } from "@/Helper/util";
import orderbyicon from "@/components/OrderByIcon.vue";
import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import { buscadorTransaccion } from "@/_menuOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "Transaccion",
  components: {
    paginate: Paginate,
    orderbyicon,
    VOnboardingWrapper,
  },
  methods: {
    difDias,
    renderSteps,
  },
  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);

    /*CONFIGURACION*/
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const formatterMoney = globalProperties.$formatterMoney;
    const ApiKey = globalProperties.$apiKey;
    const localMenuOnvoarding = buscadorTransaccion;

    const header = {
      Authorization: "Bearer " + localStorage.token,
      ApiKey,
    };

    //#region Funciones Locales
    const state = reactive({
      transaccionIdSelected: null,
      isonboarding: false,
      wrapper,
      steps: [],
      options: {
        overlay: {
          enabled: true,
          padding: 0,
          borderRadius: 10,
        },
        popper: {
          placement: "left",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 10],
              },
            },
          ],
        },
        scrollToStep: {
          enabled: true,
          options: {
            behavior: "smooth",
            block: "center",
            inline: "center",
          },
        },
        labels: {
          previousButton: "Atrás",
          nextButton: "Siguiente",
          finishButton: "Finalizar",
        },
      },
      tabPaneActiveKey: 1,
      canales: [],
      formaspagocanal: [],
      estados: [],
      transaccionSelectedDetalle: {},
      transaccionSelectedBitacora: [],
      transacciones: null,
      transaccionesToExport: null,
      initialPage: 1,
      sizePage: 10,
      totaltransacciones: 0,
      visibleModalDetalle: false,
      visibleModalBitacora: false,
      visibleModalExportacion: false,
      orderByTransaccion: {
        OC: {
          id: "btn_orderby_OC",
          direction: "minus",
        },
        FechaCreacion: {
          id: "btn_orderby_fechaCreacion",
          direction: "desc",
        },
        FechaEstado: {
          id: "btn_orderby_fechaEstado",
          direction: "minus",
        },
        Total: {
          id: "btn_orderby_total",
          direction: "minus",
        },
      },
      devolucion: {
        motivo: "",
      },
    });

    const updateTransaccion = () => {
      if (!state.transaccionSelectedDetalle) return false;
      let trx = state.transaccionSelectedDetalle;

      //Evito afectar datos adyacentes
      delete trx.transaccionGeorefs;
      delete trx.medioPago;
      delete trx.transaccionDetalles;

      ApiNeva.post("Transaccion/UpdateTransaccion", trx, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.visibleModalDetalle = false;
          getTransaccionesByFilter(true);
          swal(
            "Modificar Transacción",
            "Se ha modificado correctamente la transacción seleccionada",
            "success"
          );
        })
        .catch((error) => console.log(error));
    };

    const getAllCanal = () => {
      ApiNeva.get("Canal/Canales", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.canales = response.data;
        })
        .catch((error) => console.log(error));
    };

    const getEstados = () => {
      ApiNeva.get("Estado/GetAll", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.estados = response.data;
        })
        .catch((error) => console.log(error));
    };

    const exportExcel = async (tipoExport) => {
      let bodyFilter = getFilter();
      if (!bodyFilter) return false;

      if (!state.transacciones) {
        swal(
          "Exportación Datos",
          "Utilice los filtros para buscar las transacciones a exportar",
          "warning"
        );
        return false;
      }

      try {
        let response = await ApiNeva.post(
          "Transaccion/TransaccionesExport",
          bodyFilter,
          { headers: header }
        );
        response = await response;
        state.transaccionesToExport = await response.data;
      } catch (error) {
        console.log(error);
      }

      let data = XLSX.utils.json_to_sheet(state.transaccionesToExport);
      const workbook = XLSX.utils.book_new();
      let fechaActual = new Date()
        .toLocaleDateString("en-ZA")
        .replaceAll("/", "");
      const filename = "transacciones_" + fechaActual;
      XLSX.utils.book_append_sheet(workbook, data, filename);

      switch (tipoExport) {
        case "xlsx":
          XLSX.writeFile(workbook, `${filename}.xlsx`);
          return;
        case "csv":
          XLSX.writeFile(workbook, `${filename}.csv`);
          return;
        case "txt":
          XLSX.writeFile(workbook, `${filename}.txt`);
          return;
      }
    };

    const getFormaPagoByIdCanal = (elemento) => {
      let idcanal =
        elemento.target.options[elemento.target.selectedIndex].value;
      if (!idcanal) return false;

      ApiNeva.get("MedioPago/MediosPagoByIdCanal?idcanal=" + idcanal, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.formaspagocanal = response.data;
          document.getElementById("medioPagoId").disabled = false;
        })
        .catch(() => {
          document.getElementById("medioPagoId").disabled = true;
          document.getElementById("medioPagoId").selectedIndex = 0;
        });
    };

    const getFilter = (directionOrderBy, idColumOrderBy) => {
      let fechaInicio = document.getElementById("fechaInicio").value;
      let fechaFin = document.getElementById("fechaFin").value;
      let token = document.getElementById("token").value;
      let canal =
        document.getElementById("canalid").selectedIndex == 0
          ? null
          : document.getElementById("canalid").value;
      let mediopago =
        document.getElementById("medioPagoId").selectedIndex == 0
          ? null
          : document.getElementById("medioPagoId").value;
      let clientecodigo = document.getElementById("clienteCodigo").value;
      let codigoautorziacion = document.getElementById("codAutorizacion").value;
      let estado =
        document.getElementById("codEstado").selectedIndex == 0
          ? null
          : document.getElementById("codEstado").value;
      let oc = document.getElementById("OC").value;

      if (!fechaInicio && fechaFin) {
        swal(
          "Valores incorrectos",
          "Debe seleccionar una Fecha inicio",
          "warning"
        ).then(() => document.getElementById("fechaInicio").focus());
        return false;
      }

      if (fechaInicio && !fechaFin) {
        swal(
          "Valores incorrectos",
          "Debe seleccionar una Fecha fin",
          "warning"
        ).then(() => document.getElementById("fechaFin").focus());
        return false;
      }

      var difDia = difDias(fechaInicio, fechaFin);
      if (difDia < 0) {
        swal({
          title: "Valores incorrectos",
          text: "La fecha inicial es posterior a la fecha final.",
          icon: "warning",
          closeOnClickOutside: false,
        }).then(() => document.getElementById("fechaFin").focus());
        return false;
      }
      if (difDia > 360) {
        swal({
          title: "Valores incorrectos",
          text: "El intervalo de fechas es superior a 360 días.",
          icon: "warning",
          closeOnClickOutside: false,
        }).then(() => document.getElementById("fechaFin").focus());
        return false;
      }

      let bodyFilter = {
        fechaInicio: fechaInicio || null,
        fechaFin: fechaFin || null,
        canalId: canal == 0 ? null : canal,
        medioPagoId: mediopago == 0 ? null : mediopago,
        clienteCodigo: clientecodigo || null,
        oc: oc || null,
        codAutorizacion: codigoautorziacion || null,
        codEstado: estado || null,
        token: token || null,
        montoAfecto: null,
        orderByFilter: {
          orderBy: idColumOrderBy,
          orderByOrientacion: directionOrderBy,
        },
      };

      return bodyFilter;
    };

    const getTransaccionesByFilter = (
      iniciarPage,
      directionOrderBy,
      idColumOrderBy
    ) => {
      let bodyFilter = getFilter(directionOrderBy, idColumOrderBy);
      if (!bodyFilter) return;

      if (iniciarPage) state.initialPage = 1;

      ApiNeva.post("Transaccion/TransaccionesCount", bodyFilter, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.totaltransacciones = Math.ceil(response.data / state.sizePage);
        })
        .catch(() => {
          state.totaltransacciones = null;
        });

      ApiNeva.post(
        "Transaccion/Transacciones?initialPage=" +
          state.initialPage +
          "&sizePage=" +
          state.sizePage,
        bodyFilter,
        { headers: header }
      )
        .then((response) => {
          if (response.status != 200) return false;
          state.transacciones = response.data;
        })
        .catch(() => {
          state.totaltransacciones = null;
          state.transacciones = null;
        });
    };

    const selectedPagination = (pageNum) => {
      state.initialPage = pageNum;
      getTransaccionesByFilter(false);
    };

    const getTransaccionDetalle = (idtrx) => {
      if (!idtrx) return false;
      state.transaccionIdSelected = idtrx;
      ApiNeva.get("Transaccion/TransaccionByIdTrx?idTrx=" + idtrx, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.transaccionSelectedDetalle = response.data;
          state.visibleModalDetalle = true;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getBitacoraByIdTrx = (idtrx) => {
      if (!idtrx) return false;
      ApiNeva.get("Bitacora/GetBitacorasByIdTrx?idTrx=" + idtrx, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.transaccionSelectedBitacora = response.data;
          state.visibleModalBitacora = true;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const buscarEnter = (elemento) => {
      if (elemento.keyCode === 13) {
        getTransaccionesByFilter(true);
      }
    };

    const limpiarFiltros = () => {
      document.getElementById("fechaInicio").value = "";
      document.getElementById("fechaFin").value = "";
      document.getElementById("token").value = "";
      document.getElementById("canalid").selectedIndex = 0;
      document.getElementById("medioPagoId").selectedIndex = 0;
      document.getElementById("medioPagoId").disabled = true;
      document.getElementById("clienteCodigo").value = "";
      document.getElementById("codAutorizacion").value = "";
      document.getElementById("codEstado").selectedIndex = 0;
      document.getElementById("OC").value = "";
    };

    const resetIconsOrderBy = (id, direction) => {
      switch (id) {
        case state.orderByTransaccion.OC.id:
          document
            .getElementById(state.orderByTransaccion.FechaCreacion.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          document
            .getElementById(state.orderByTransaccion.FechaEstado.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          document
            .getElementById(state.orderByTransaccion.Total.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          break;
        case state.orderByTransaccion.FechaCreacion.id:
          document
            .getElementById(state.orderByTransaccion.OC.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          document
            .getElementById(state.orderByTransaccion.FechaEstado.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          document
            .getElementById(state.orderByTransaccion.Total.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          break;
        case state.orderByTransaccion.FechaEstado.id:
          document
            .getElementById(state.orderByTransaccion.OC.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          document
            .getElementById(state.orderByTransaccion.FechaCreacion.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          document
            .getElementById(state.orderByTransaccion.Total.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          break;
        case state.orderByTransaccion.Total.id:
          document
            .getElementById(state.orderByTransaccion.OC.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          document
            .getElementById(state.orderByTransaccion.FechaCreacion.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          document
            .getElementById(state.orderByTransaccion.FechaEstado.id)
            .firstElementChild.setAttribute("class", "cil-minus");
          break;
      }
    };

    const OrderByTransaccion = (direction, id) => {
      resetIconsOrderBy(id, direction);

      let idReturn = "";
      let direccionReturn = -1;
      switch (id) {
        case state.orderByTransaccion.OC.id:
          idReturn = "OC";
          break;
        case state.orderByTransaccion.FechaEstado.id:
          idReturn = "FechaEstado";
          break;
        case state.orderByTransaccion.Total.id:
          idReturn = "Total";
          break;
        default:
          idReturn = "FechaCreacion";
          break;
      }

      switch (direction) {
        case "asc":
          direccionReturn = 0;
          break;
        default:
          direccionReturn = 1;
          break;
      }

      getTransaccionesByFilter(true, direccionReturn, idReturn);
    };

    const onBoarding = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboarding = await onBoardingHelper.getUserSeeMenu(
          user.id,
          "buscadorTransaccion",
          header
        );
      } catch (error) {
        console.log(error);
      }

      if (!state.isonboarding) {
        state.steps = localMenuOnvoarding.map((x) => {
          return renderSteps(x);
        });
        await onBoardingHelper.setUserSeeMenu(
          user.id,
          "buscadorTransaccion",
          header
        );
      }
    };

    const devolucionTransaccion = () => {
      let idtrx = state.transaccionIdSelected;
      if (!idtrx) return false;

      let motivo = state.devolucion.motivo;
      if (!motivo) {
        swal(
          "Anular Transacción",
          "Debe ingresar el motivo de la devolución",
          "warning"
        );
        return;
      }

      let user = JSON.parse(localStorage.usuarioModel);

      let bodyDevolucion = {
        idtrx,
        motivo,
        user: user.nombres + " " + user.apellidos,
      };

      ApiNeva.post("Transaccion/Devolucion", bodyDevolucion, {
        headers: header,
      })
        .then((response) => {
          if (response.status == 200) {
            swal(
              "Anular Transacción",
              "Se ha procesado correctamente la solicitud de devolución.",
              "success"
            );
            getTransaccionesByFilter(true);
            return;
          }
          swal(
            "Anular Transacción",
            "Ha ocurrido un problema intentado realizar la devolución, verifique la bitocara de la transacción para obtener más detalles.",
            "warning"
          );
        })
        .catch((error) => {
          if (
            error.response.data.detail.includes(
              "La transaccion no tiene medio de pago asociado"
            )
          ) {
            swal(
              "Anular Transacción",
              "La transacción no tiene medio de pago asociado.",
              "warning"
            );
            return;
          }

          if (
            error.response.data.detail.includes(
              "La transaccion no se puede anular se encuentra en estado fallido"
            )
          ) {
            swal(
              "Anular Transacción",
              "La transaccion no se puede anular se encuentra en estado fallido.",
              "warning"
            );
            return;
          }

          if (
            error.response.data.detail.includes(
              "La transaccion no se puede anular, ya se encuentra anulada o reversada"
            )
          ) {
            swal(
              "Anular Transacción",
              "La transacción no se puede anular, ya se encuentra anulada o reversada.",
              "warning"
            );
            return;
          }

          if (
            error.response.data.detail.includes(
              "La transaccion no tiene registrado el token en la columna extra"
            )
          ) {
            swal(
              "Anular Transacción",
              "La transacción no tiene registrado el token en la columna extra.",
              "warning"
            );
            return;
          }

          swal("Anular Transacción", error.response.data.detail, "warning");
          return;

          console.log(error);
        });
    };

    onMounted(() => {
      getAllCanal();
      getEstados();
      onBoarding();
      if (!state.isonboarding) {
        setTimeout(() => {
          start();
        }, 500);
      }
    });

    return {
      cilSearch,
      cilStorage,
      cilZoomIn,
      ...toRefs(state),
      formatterMoney,
      getFormaPagoByIdCanal,
      getTransaccionesByFilter,
      selectedPagination,
      getTransaccionDetalle,
      getBitacoraByIdTrx,
      buscarEnter,
      exportExcel,
      limpiarFiltros,
      getStyleSegunEstado,
      updateTransaccion,
      OrderByTransaccion,
      start,
      devolucionTransaccion,
    };
  },
};
</script>

<style></style>
