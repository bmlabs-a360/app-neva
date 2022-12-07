<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
  <CRow>
    <!-- LIST -->
    <CCol :md="12">
      <CCard class="mb-4" data-aos="fade-up" data-aos-easing="ease">
        <CCardHeader>
          <CRow>
            <CCol :sm="6" :md="10" :xs="6" :lg="11">
              <strong>Gestión de Perfiles</strong>
            </CCol>
            <CCol :sm="6" :md="2" :xs="6" :lg="1">
              <div class="d-grid">
                <CButton
                  id="crear_perfil"
                  color="primary"
                  @click="
                    () => {
                      visibleModalNuevoPerfil = true;
                    }
                  "
                  ><strong>Crear</strong></CButton
                >
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell class="text-center" scope="col"
                  >Nombre perfil</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Detalle</CTableHeaderCell
                >
                <CTableHeaderCell class="text-start" scope="col"
                  >Activo</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Acciones</CTableHeaderCell
                >
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="perfil in perfiles" :key="perfil.id">
                <CTableDataCell class="text-center">{{
                  perfil.nombre
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  perfil.detalle
                }}</CTableDataCell>
                <CTableDataCell class="text-center"
                  ><CFormSwitch
                    style="cursor: pointer"
                    disabled
                    :checked="perfil.activo"
                /></CTableDataCell>
                <CTableDataCell id="acciones_perfil" class="text-center"
                  ><CButton @click="getPerfilSelected(perfil.id)"
                    ><CIcon :icon="cilPen" size="lg" /></CButton
                ></CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <!-- LIST -->

  <!-- MODAL -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalPerfil"
    @close="
      () => {
        resetPerfil();
        visibleModalPerfil = false;
      }
    "
  >
    <CModalHeader>
      <div style="display: flex">
        <CModalTitle>Perfil</CModalTitle>&nbsp;&nbsp;
        <div style="padding-top: 0.3rem">
          <CFormSwitch
            style="cursor: pointer"
            disabled
            id="activo"
            :checked="perfilSelected.activo"
          />
        </div>
      </div>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="6">
            <div class="mb-3">
              <CFormLabel for="nombre">Nombre perfil</CFormLabel>
              <CFormInput
                type="text"
                id="nombre"
                placeholder="Nombres"
                size="sm"
                disabled
                maxlength="255"
                :value="perfilSelected.nombre"
              />
            </div>
            <div class="mb-3">
              <CFormLabel for="apellidos">Detalle</CFormLabel>
              <CFormInput
                type="text"
                id="apellidos"
                placeholder="Apellidos"
                size="sm"
                disabled
                maxlength="255"
                :value="perfilSelected.detalle"
              />
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            resetPerfil();
            visibleModalPerfil = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton color="primary" @click="activarPerfil">{{
        perfilSelected.activo ? "Desactivar" : "Activar"
      }}</CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL -->

  <!-- MODAL CREAR -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalNuevoPerfil"
    @close="
      () => {
        resetNewPerfil();
        visibleModalNuevoPerfil = false;
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Nuevo perfil</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CContainer class="pt-2">
          <CRow>
            <CCol sm="12">
              <div class="mb-3">
                <CFormLabel for="nombreNew">Nombre perfil</CFormLabel>
                <CFormInput
                  type="text"
                  id="nombreNew"
                  placeholder="Nombre"
                  size="sm"
                  maxlength="255"
                />
              </div>
              <div class="mb-3">
                <CFormLabel for="detalleNew">Detalle</CFormLabel>
                <CFormInput
                  type="text"
                  id="detalleNew"
                  placeholder="Detalle"
                  size="sm"
                  maxlength="255"
                />
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </CContainer>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            resetNewPerfil();
            visibleModalNuevoPerfil = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton
        id="btnGuardarNewPerfil"
        @click="guardarNewPerfil"
        color="primary"
      >
        <CRow>
          <CCol> Guardar </CCol>
          <CCol>
            <CSpinner
              id="loading"
              style="display: none; width: 1rem; height: 1rem"
              variant="grow"
            />
          </CCol>
        </CRow>
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL CREAR -->
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import { cilPen } from "@coreui/icons";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import { permisosPerfiles } from "@/_menuOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "Perfil",
  components: {
    VOnboardingWrapper,
  },
  methods: {
    renderSteps,
  },
  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);
    const localMenuOnvoarding = permisosPerfiles;

    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const header = {
      Authorization: "Bearer " + localStorage.token,
      ApiKey,
    };

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
      tabPaneActiveKey: 1,
      perfiles: [],
      perfilSelected: {},
      visibleModalNuevoPerfil: false,
      visibleModalPerfil: false,
    });

    const getProfile = () => {
      state.perfiles = [];

      ApiNeva.get("Perfil/PerfilGetAll", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.perfiles = response.data;
          console.log(" state.perfiles ", state.perfiles);
        })
        .catch((error) => console.log(error));
    };

    const getPerfilSelected = (idperfil) => {
      state.perfilSelected = state.perfiles.find((c) => c.id === idperfil);
      state.visibleModalPerfil = true;
    };

    const resetPerfil = () => {
      state.perfilSelected = {
        activo: true,
        detalle: "",
        id: 0,
        nombre: "",
      };
    };

    const resetNewPerfil = () => {
      document.getElementById("nombreNew").value = "";
      document.getElementById("detalleNew").value = "";
    };

    const activarPerfil = () => {
      let perfil = state.perfilSelected;

      if (!perfil.id) {
        swal(
          "Activar Perfil",
          "Debe seleccionar un perfil para activar o desactivar",
          "warning"
        );
        return;
      }

      if (perfil.id) {
        //validar que sea root o administrador
        swal({
          title: "Activar Perfil",
          text: "¿Está seguro de modificar el estado del Perfil?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((resp) => {
          if (!resp) return;
          ToggleActivo(perfil);
        });
        return;
      }
      //ToggleActivo(idperfil);
    };

    const ToggleActivo = (perfil) => {
      var bodyPerfil = {
        id: perfil.id,
        nombre: perfil.nombre,
        detalle: perfil.detalle,
        activo: !perfil.activo,
      };
      ApiNeva.post("Perfil/PerfilUpdate", bodyPerfil, {
        headers: header,
      }).then((response) => {
        if (response.status != 200) return false;
        getProfile();
        swal("Registro perfil", "Se actualizó el estado del pefil", "success");
        state.visibleModalPerfil = false;
        return;
      });
    };

    const guardarNewPerfil = () => {
      showSpining(true);

      let nombre = document.getElementById("nombreNew").value;
      let detalle = document.getElementById("detalleNew").value;

      if (!nombre) {
        swal(
          "Registro perfil",
          "Debe ingresar un nombre para el perfil",
          "warning"
        );
        showSpining(false);
        return;
      }

      if (!detalle) {
        swal(
          "Registro perfil",
          "Debe ingresar un detalle para el perfil",
          "warning"
        );
        showSpining(false);
        return;
      }
      let bodyPerfil = {
        id: 0,
        nombre: nombre,
        detalle: detalle,
        activo: true,
      };

      ApiNeva.post("Perfil/PerfilInsert", bodyPerfil, { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          showSpining(false);
          state.visibleModalNuevoPerfil = false;
          getProfile();
          swal("Registro perfil", "perfil creado", "success");
          return;
        })
        .catch((error) => {
          showSpining(false);
          if (
            error.response.data.detail.includes("llave duplicada") ||
            error.response.data.detail.includes("duplicate key ")
          ) {
            swal(
              "Registro perfil",
              "El nombre  ya se encuentra registrado",
              "warning"
            );
            state.visibleModalNuevoPerfil = false;
            getProfile();
            return;
          }
          swal(
            "Registro perfil",
            "Por favor, verifique los datos ingresados sean válidos.",
            "warning"
          );
          return;
        });
    };

    const showSpining = (isActivate) => {
      if (isActivate) {
        document.getElementById("loading").style.display = "inline-block";
        document.getElementById("btnGuardarNewPerfil").disabled = true;
      } else {
        document.getElementById("loading").style.display = "none";
        document.getElementById("btnGuardarNewPerfil").disabled = false;
      }
    };

    const onBoarding = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboarding = await onBoardingHelper.getUserSeeMenu(
          user.id,
          "permisosPerfiles",
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
          "permisosPerfiles",
          header
        );
      }
    };

    onMounted(() => {
      getProfile();
      onBoarding();
      if (!state.isonboarding) {
        setTimeout(() => {
          start();
        }, 500);
      }
    });

    return {
      cilPen,
      ...toRefs(state),
      getPerfilSelected,
      resetPerfil,
      guardarNewPerfil,
      activarPerfil,
      resetNewPerfil,
      showSpining,
    };
  },
};
</script>
