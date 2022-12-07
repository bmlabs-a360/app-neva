<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
  <CRow>
    <CCol :sm="12" :md="12" :lg="6">
      <CCard
        id="formulario_simulacion"
        class="mb-4"
        data-aos="fade-up"
        data-aos-easing="ease"
      >
        <CCardHeader>
          <div style="display: flex">
            <CModalTitle>Link de Pago</CModalTitle>&nbsp;&nbsp;
            <div style="padding-top: 0.3rem">
              <CLink
                v-c-tooltip="
                  'Guardar los datos ingresados en Cookie al crear un nuevo link de pago'
                "
              >
                <CFormSwitch
                  id="guardarInfoCookie"
                  v-model="guardarInfoCookie"
                  :checked="guardarInfoCookie"
                  style="cursor: pointer"
                />
              </CLink>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CContainer>
            <CRow>
              <CCol sm="12" md="6" lg="6" class="pt-1">
                <CFormLabel for="canalId">Canal</CFormLabel>
                <CFormSelect id="canalId" v-model="trx.canalId">
                  <option value="0" :key="0">Seleccione un canal</option>
                  <option v-for="cn in canales" :key="cn.id" :value="cn.id">
                    {{ cn.nombre }} - ({{ cn.accouncode }})
                  </option>
                </CFormSelect>
              </CCol>

              <CCol sm="12" md="6" lg="6" class="pt-1">
                <CFormLabel for="clienteNombre">Nombre Cliente</CFormLabel>
                <CFormInput
                  type="text"
                  id="clienteNombre"
                  maxlength="100"
                  v-model="trx.clienteNombre"
                />
              </CCol>

              <CCol sm="12" md="6" lg="6" class="pt-1">
                <CFormLabel for="clienteEmail">Email Cliente</CFormLabel>
                <CFormInput
                  type="email"
                  id="clienteEmail"
                  maxlength="100"
                  placeholder="example@example.com"
                  v-model="trx.clienteEmail"
                />
              </CCol>

              <CCol sm="12" md="6" lg="6" class="pt-1">
                <CFormLabel for="clienteCodigo">Código Cliente</CFormLabel>
                <CFormInput
                  type="text"
                  id="clienteCodigo"
                  maxlength="32"
                  placeholder="11111111-1"
                  v-model="trx.clienteCodigo"
                />
              </CCol>

              <CCol sm="12" md="6" lg="6" class="pt-1">
                <CFormLabel for="clienteTelefono">Teléfono Cliente</CFormLabel>
                <CFormInput
                  type="tel"
                  id="clienteTelefono"
                  placeholder="56991974193"
                  v-model="trx.clienteTelefono"
                />
              </CCol>

              <CCol sm="12" md="6" lg="6" class="pt-1">
                <CFormLabel for="clienteDireccion"
                  >Dirección Cliente</CFormLabel
                >
                <CFormInput
                  type="text"
                  id="clienteDireccion"
                  maxlength="100"
                  v-model="trx.clienteDireccion"
                />
              </CCol>

              <CCol sm="12" md="6" lg="6" class="pt-1">
                <CFormLabel for="clienteComuna">Comuna Cliente</CFormLabel>
                <CFormInput
                  type="text"
                  id="clienteComuna"
                  maxlength="100"
                  v-model="trx.clienteComuna"
                />
              </CCol>

              <CCol sm="12" md="6" lg="6" class="pt-1">
                <CFormLabel for="clienteRegion">Región Cliente</CFormLabel>
                <CFormInput
                  type="text"
                  id="clienteRegion"
                  maxlength="100"
                  v-model="trx.clienteRegion"
                />
              </CCol>

              <CCol sm="12" md="6" lg="6" class="pt-1">
                <CFormLabel for="categoria">Categoría</CFormLabel>
                <CFormInput
                  type="text"
                  id="categoria"
                  maxlength="25"
                  v-model="trx.categoria"
                />
              </CCol>

              <CCol sm="12" md="6" lg="6" class="pt-1">
                <CFormLabel for="moneda">Moneda</CFormLabel>
                <CFormSelect id="moneda" v-model="trx.moneda">
                  <option value="0" :key="0">Seleccione un moneda</option>
                  <option
                    v-for="mon in monedas"
                    :key="mon.id"
                    :value="mon.acronimo"
                  >
                    {{ mon.nombre }} - ({{ mon.acronimo }})
                  </option>
                </CFormSelect>
              </CCol>

              <CCol sm="12" md="6" lg="6" class="pt-1">
                <CFormLabel for="impuesto">Impuesto</CFormLabel>
                <CFormInput
                  type="number"
                  id="impuesto"
                  min="0"
                  max="100000000"
                  v-model="trx.impuesto"
                />
              </CCol>

              <CCol sm="12" md="6" lg="6" class="pt-1">
                <CFormLabel for="tarifa">Tarifa</CFormLabel>
                <CFormInput
                  type="number"
                  id="tarifa"
                  min="0"
                  max="100000000"
                  v-model="trx.tarifa"
                />
              </CCol>

              <CCol sm="12" md="12" lg="12" class="pt-1">
                <CFormLabel for="descripcion">Descripción</CFormLabel>
                <CFormInput
                  type="text"
                  id="descripcion"
                  maxlength="100"
                  v-model="trx.descripcion"
                />
              </CCol>

              <CCol sm="12" md="12" lg="12" class="pt-4">
                <div class="d-grid gap-2 col-12 mx-auto">
                  <CButton
                    id="crear_simulacion"
                    @click="crearTransaccion"
                    color="primary"
                    >Crear Link de Pago</CButton
                  >
                </div>
              </CCol>
            </CRow>
          </CContainer>
        </CCardBody>
      </CCard>
    </CCol>

    <CCol :sm="12" :md="12" :lg="6">
      <CCard
        id="detalles_simulacion"
        class="mb-4"
        data-aos="fade-up"
        data-aos-easing="ease"
      >
        <CCardHeader>
          <CRow>
            <CCol :sm="6" :md="10" :xs="6" :lg="9">
              <CModalTitle>Detalles</CModalTitle>
            </CCol>
            <CCol :sm="6" :md="2" :xs="6" :lg="3">
              <div class="d-grid">
                <CButton color="primary" @click="agregarDetalle"
                  ><strong>Agregar</strong></CButton
                >
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CContainer>
            <CRow>
              <CCol md="12" class="pt-1">
                <CFormLabel for="productoCode">Código</CFormLabel>
                <CFormInput
                  type="text"
                  @keypress="nextElementDetalleEnter('nombre')"
                  id="productoCode"
                  maxlength="40"
                />
              </CCol>

              <CCol md="12" class="pt-1">
                <CFormLabel for="nombre">Nombre</CFormLabel>
                <CFormInput
                  type="text"
                  @keypress="nextElementDetalleEnter('cantidad')"
                  id="nombre"
                  maxlength="255"
                />
              </CCol>

              <CCol md="12" class="pt-1">
                <CFormLabel for="cantidad">Cantidad</CFormLabel>
                <CFormInput
                  type="number"
                  @keypress="nextElementDetalleEnter('total')"
                  id="cantidad"
                  min="1"
                  max="9999"
                />
              </CCol>

              <CCol md="12" class="pt-1">
                <CFormLabel for="total">Total</CFormLabel>
                <CFormInput
                  type="number"
                  @keypress="agregarDetalleEnter"
                  id="total"
                  min="10"
                  max="100000000"
                />
              </CCol>

              <CCol md="12" class="pt-4">
                <CTable
                  responsive
                  style="min-height: 260px; max-height: 260px; overflow: auto"
                >
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell class="text-center" scope="col"
                        >Código</CTableHeaderCell
                      >
                      <CTableHeaderCell class="text-center" scope="col"
                        >Nombre</CTableHeaderCell
                      >
                      <CTableHeaderCell class="text-center" scope="col"
                        >Cantidad</CTableHeaderCell
                      >
                      <CTableHeaderCell class="text-center" scope="col"
                        >Total</CTableHeaderCell
                      >
                      <CTableHeaderCell class="text-center" scope="col"
                        >Acciones</CTableHeaderCell
                      >
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow
                      v-if="transaccionDetalles.length == 0"
                      color="warning"
                    >
                      <CTableDataCell colspan="6" class="text-center"
                        ><strong id="textEmpty"
                          >Ingrese detalles para generar el link de
                          pago.</strong
                        ></CTableDataCell
                      >
                    </CTableRow>

                    <CTableRow
                      v-for="(item, index) in transaccionDetalles"
                      :key="index"
                    >
                      <CTableDataCell class="text-center">{{
                        item.productoCode
                      }}</CTableDataCell>
                      <CTableDataCell class="text-center">{{
                        item.nombre
                      }}</CTableDataCell>
                      <CTableDataCell class="text-center">{{
                        item.cantidad
                      }}</CTableDataCell>
                      <CTableDataCell class="text-center">{{
                        formatterMoney.format(item.total)
                      }}</CTableDataCell>
                      <div id="acciones_simulacion">
                        <CTableDataCell class="text-center">
                          <CButton @click="editarDetalle(index)">
                            <CIcon :icon="cilPen" size="lg" />
                          </CButton>
                        </CTableDataCell>
                        <CTableDataCell class="text-center">
                          <CButton @click="quitarDetalle(index)">
                            <CIcon :icon="cilTrash" size="lg" />
                          </CButton>
                        </CTableDataCell>
                      </div>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
          </CContainer>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- MODAL-NUEVA-TRANSACCION -->
  <CRow>
    <CModal
      size="lg"
      backdrop="static"
      alignment="center"
      :visible="visibleModalNuevaTrx"
      @close="
        () => {
          visibleModalNuevaTrx = false;
        }
      "
    >
      <CModalHeader>
        <CModalTitle>Nuevo link de pago </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CContainer>
          <CRow>
            <CCol md="12">
              <CFormLabel
                >Se ha generado un nuevo link de pago con token:
                <strong>{{ nuevaTrx.trxToken }}</strong></CFormLabel
              >
            </CCol>
          </CRow>
          <CRow>
            <div class="d-grid gap-2 col-6 mx-auto pt-3">
              <CButton
                color="primary"
                variant="outline"
                shape="rounded-pill"
                @click="accionTrx('blank')"
                >Abrir en otra pestaña</CButton
              >
              <CButton
                color="primary"
                variant="outline"
                shape="rounded-pill"
                @click="accionTrx('linkCopy')"
                >Copiar link</CButton
              >
              <CButton
                color="primary"
                variant="outline"
                shape="rounded-pill"
                @click="accionTrx('tokenCopy')"
                >Copiar Token</CButton
              >
            </div>
          </CRow>
        </CContainer>
      </CModalBody>
    </CModal>
  </CRow>
  <!-- MODAL-NUEVA-TRANSACCION -->
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import { cilPen, cilTrash } from "@coreui/icons";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import { simuladorTransaccion } from "@/_menuOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "crearTransaccion",
  components: {
    VOnboardingWrapper,
  },
  methods: {
    renderSteps,
  },
  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);
    const localMenuOnvoarding = simuladorTransaccion;

    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const formatterMoney = globalProperties.$formatterMoney;
    const ApiKey = globalProperties.$apiKey;

    /*CONFIGURACION*/
    const header = {
      Authorization: "Bearer " + localStorage.token,
      ApiKey,
    };

    //#region Funciones Locales
    const state = reactive({
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
      monedas: [],
      canales: [],
      transaccionDetalles: [],
      guardarInfoCookie: false,
      visibleModalNuevaTrx: false,
      trx: {
        canalId: null,
        moneda: null,
        clienteNombre: null,
        clienteEmail: null,
        clienteCodigo: null,
        clienteTelefono: "",
        clienteDireccion: "",
        clienteComuna: "",
        clienteRegion: "",
        descripcion: "",
        categoria: "",
        impuesto: 0,
        tarifa: 0,
        transaccionDetalles: [],
      },
      nuevaTrx: {},
    });

    async function getAllCanal() {
      let response = await ApiNeva.get("Canal/Canales", {
        headers: header,
      });
      if (response.status == 200) {
        state.canales = await response.data;
        return await response.data;
      }
    }

    const getAllMonedas = () => {
      ApiNeva.get("Moneda/GetListMonedas?onlyActive=true", {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.monedas = response.data;
        })
        .catch((error) => console.log(error));
    };

    const editarDetalle = (indiceArrayDetalle) => {
      let prodSeleccionado = state.transaccionDetalles[indiceArrayDetalle];
      document.getElementById("productoCode").value =
        prodSeleccionado.productoCode;
      document.getElementById("nombre").value = prodSeleccionado.nombre;
      document.getElementById("cantidad").value = prodSeleccionado.cantidad;
      document.getElementById("total").value = prodSeleccionado.total;
    };

    const quitarDetalle = (indiceArrayDetalle) => {
      swal({
        title: "Eliminar línea de detalle",
        text: "¿Está seguro de eliminar la línea de detalle seleccionada?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((resp) => {
          if (!resp) return false;
          state.transaccionDetalles.splice(indiceArrayDetalle);
          swal(
            "Eliminar línea de detalle",
            "Se ha eliminado correctamente la línea de detalle seleccionada",
            "success"
          );
        })
        .catch((error) => console.log(error));
    };

    const limpiarAgregarDetalle = () => {
      document.getElementById("productoCode").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("cantidad").value = "";
      document.getElementById("total").value = "";
    };

    const agregarDetalle = () => {
      let productoCode = document.getElementById("productoCode").value;
      let nombre = document.getElementById("nombre").value;
      let cantidad = document.getElementById("cantidad").value;
      let total = document.getElementById("total").value;

      if (!productoCode) {
        swal(
          "Valor Incorrecto",
          "Debe ingresar un código de producto",
          "warning"
        );
        return false;
      }

      if (!nombre) {
        swal(
          "Valor Incorrecto",
          "Debe ingresar el nombre la linea de detalle",
          "warning"
        );
        return false;
      }

      if (!cantidad || cantidad <= 0) {
        swal(
          "Valor Incorrecto",
          "Debe ingresar la cantidad la linea de detalle",
          "warning"
        );
        return false;
      }

      if (!total || total <= 0) {
        swal(
          "Valor Incorrecto",
          "Debe ingresar el total de la linea de detalle",
          "warning"
        );
        return false;
      }
      let isUpdate = false;
      let accion = "agregado";
      if (state.transaccionDetalles.length != 0) {
        let updateDetalle = state.transaccionDetalles.map((elemento) => {
          if (
            elemento.productoCode.toLowerCase() == productoCode.toLowerCase()
          ) {
            elemento.nombre = nombre;
            elemento.cantidad = cantidad;
            elemento.total = total;
            accion = "modificado";
            isUpdate = true;
          }
          return elemento;
        });
        if (updateDetalle) state.transaccionDetalles = updateDetalle;
      }

      if (!isUpdate) {
        state.transaccionDetalles.push({
          productoCode,
          nombre,
          cantidad,
          total,
        });
      }
      limpiarAgregarDetalle();
      swal(
        "Línea de detalle",
        "Se ha " + accion + " correctamente la linea de detalle",
        "success"
      );
    };

    const limpiarTransaccion = () => {
      state.trx = {
        canalId: null,
        moneda: null,
        clienteNombre: null,
        clienteEmail: null,
        clienteCodigo: null,
        clienteTelefono: "",
        clienteDireccion: "",
        clienteComuna: "",
        clienteRegion: "",
        descripcion: "",
        categoria: "",
        impuesto: 0,
        tarifa: 0,
        transaccionDetalles: [],
      };
      state.transaccionDetalles = [];
    };

    const crearTransaccion = () => {
      let canalId = state.trx.canalId;
      let clienteNombre = state.trx.clienteNombre;
      let moneda = state.trx.moneda;
      let clienteEmail = state.trx.clienteEmail;
      let clienteCodigo = state.trx.clienteCodigo;
      let clienteTelefono = state.trx.clienteTelefono;
      let clienteDireccion = state.trx.clienteDireccion;
      let clienteComuna = state.trx.clienteComuna;
      let clienteRegion = state.trx.clienteRegion;
      let descripcion = state.trx.descripcion;
      let categoria = state.trx.categoria;
      let impuesto = state.trx.impuesto;
      let tarifa = state.trx.tarifa;

      if (!canalId || canalId == 0) {
        swal("Valor Incorrecto", "Debe seleccionar un canal", "warning");
        return false;
      }

      if (!clienteNombre) {
        swal(
          "Valor Incorrecto",
          "Debe ingresar el nombre del cliente",
          "warning"
        );
        return false;
      }

      if (!clienteEmail) {
        swal(
          "Valor Incorrecto",
          "Debe ingresar el correo del cliente",
          "warning"
        );
        return false;
      }

      if (!clienteCodigo) {
        swal(
          "Valor Incorrecto",
          "Debe ingresar el código del cliente",
          "warning"
        );
        return false;
      }

      if (!clienteTelefono) {
        swal(
          "Valor Incorrecto",
          "Debe ingresar el teléfono del cliente",
          "warning"
        );
        return false;
      }

      if (!moneda || moneda == 0) {
        swal("Valor Incorrecto", "Debe seleccionar una moneda", "warning");
        return false;
      }

      if (impuesto < 0) {
        swal(
          "Valor Incorrecto",
          "Debe ingresar un valor positivo para el impuesto",
          "warning"
        );
        return false;
      }

      if (tarifa < 0) {
        swal(
          "Valor Incorrecto",
          "Debe ingresar un valor positivo para la tarifa",
          "warning"
        );
        return false;
      }

      state.trx.transaccionDetalles = state.transaccionDetalles;

      if (state.guardarInfoCookie) {
        localStorage.guardarInfoCookie = true;
        localStorage.trxCreated = JSON.stringify(state.trx);
      } else {
        localStorage.trxCreated = null;
        localStorage.guardarInfoCookie = false;
      }

      ApiNeva.post("Transaccion/CrearTransaccion", state.trx, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.nuevaTrx = response.data;
          state.visibleModalNuevaTrx = true;

          if (!state.guardarInfoCookie) {
            limpiarTransaccion();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const accionTrx = (accion) => {
      switch (accion) {
        case "blank":
          window.open(state.nuevaTrx.link, "_blank");
          break;
        case "linkCopy":
          navigator.clipboard.writeText(state.nuevaTrx.link);
          swal("Copiar Link", "Se ha copiado el link de pago", "success");
          break;
        case "tokenCopy":
          navigator.clipboard.writeText(state.nuevaTrx.trxToken);
          swal(
            "Copiar Token",
            "Se ha copiado el token del link de pago",
            "success"
          );
          break;
      }
      state.visibleModalNuevaTrx = true;
    };

    const agregarDetalleEnter = (elemento) => {
      if (elemento.keyCode === 13) {
        agregarDetalle();
      }
    };

    const nextElementDetalleEnter = (idElemento) => {
      if (!idElemento) return false;
      document.getElementById(idElemento).focus();
    };

    const oncreated = () => {
      if (typeof localStorage.guardarInfoCookie === "undefined") {
        localStorage.guardarInfoCookie = false;
        state.guardarInfoCookie = false;
      }
      state.guardarInfoCookie =
        localStorage.guardarInfoCookie == "false" ? false : true;

      if (state.guardarInfoCookie && localStorage.trxCreated != "null") {
        state.trx = JSON.parse(localStorage.trxCreated);
        state.transaccionDetalles = state.trx.transaccionDetalles;
      }
    };

    const onBoarding = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboarding = await onBoardingHelper.getUserSeeMenu(
          user.id,
          "simuladorTransaccion",
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
          "simuladorTransaccion",
          header
        );
      }
    };

    onMounted(() => {
      getAllCanal();
      getAllMonedas();
      oncreated();
      onBoarding();
      if (!state.isonboarding) {
        setTimeout(() => {
          start();
        }, 500);
      }
    });

    return {
      cilPen,
      cilTrash,
      formatterMoney,
      ...toRefs(state),
      agregarDetalle,
      crearTransaccion,
      editarDetalle,
      quitarDetalle,
      accionTrx,
      agregarDetalleEnter,
      nextElementDetalleEnter,
    };
  },
};
</script>
