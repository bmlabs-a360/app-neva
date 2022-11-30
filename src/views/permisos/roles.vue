<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
  <CRow>
    <!-- LIST -->
    <CCol :md="12">
      <CCard class="mb-4" data-aos="fade-up" data-aos-easing="ease">
        <CCardHeader>
          <CRow>
            <CCol :sm="6" :md="10" :xs="6" :lg="11">
              <strong>Gestión de Roles</strong>
            </CCol>
            <CCol :sm="6" :md="2" :xs="6" :lg="1">
              <div class="d-grid">
                <CButton
                  id="crear_roles"
                  color="primary"
                  @click="
                    () => {
                      visibleModalNuevorol = true;
                    }
                  "
                  ><strong>Crear</strong></CButton
                >
              </div>
            </CCol>
          </CRow>
        </CCardHeader>

        <CCardHeader>
          <CRow>
            <CCol :sm="6" :md="6" :xs="6" :lg="6"> Filtro por perfil </CCol>
            <CCol :sm="6" :md="6" :xs="6" :lg="6">
              <CFormSelect
                id="perfilIdSelected"
                v-model="perfilIdSelected"
                size="sm"
                @change="changeResumenPerfil"
              >
                <option value="0" :key="0">Todos</option>
                <option v-for="pf in perfiles" :key="pf.id" :value="pf.id">
                  {{ pf.nombre }}
                </option>
              </CFormSelect>
            </CCol>
          </CRow>
        </CCardHeader>

        <CCardBody>
          <CTable responsive>
            <CTableHead>
              <CTableRow>
                <!--CTableHeaderCell class="text-center" scope="col">Email</CTableHeaderCell-->
                <CTableHeaderCell class="text-center" scope="col"
                  >Nombre rol</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Detalle</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Perfil</CTableHeaderCell
                >
                <!--CTableHeaderCell class="text-center" scope="col">Fecha creación</CTableHeaderCell>
                <CTableHeaderCell class="text-center" scope="col">Fecha último acceso</CTableHeaderCell-->
                <CTableHeaderCell class="text-start" scope="col"
                  >Activo</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Acciones</CTableHeaderCell
                >
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="rol in roles" :key="rol.id">
                <CTableDataCell class="text-center">{{
                  rol.nombre
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  rol.detalle
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  nombrePerfil(rol)
                }}</CTableDataCell>
                <CTableDataCell class="text-center"
                  ><CFormSwitch
                    style="cursor: pointer"
                    disabled
                    :checked="rol.activo"
                /></CTableDataCell>
                <CTableDataCell class="text-center" id="acciones_roles"
                  ><CButton @click="getrolSelected(rol.id)"
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
    :visible="visibleModalrol"
    @close="
      () => {
        resetrol();
        visibleModalrol = false;
      }
    "
  >
    <CModalHeader>
      <div style="display: flex">
        <CModalTitle>Rol</CModalTitle>&nbsp;&nbsp;
        <div style="padding-top: 0.3rem">
          <CFormSwitch
            style="cursor: pointer"
            disabled
            id="activo"
            :checked="rolSelected.activo"
          />
        </div>
      </div>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="9">
            <div class="mb-3">
              <CFormLabel for="nombre">Tipo perfil</CFormLabel>
              <CFormInput
                type="text"
                id="perfil"
                placeholder="Perfil"
                size="sm"
                disabled
                maxlength="255"
                :value="nombrePerfil(rolSelected)"
              />
            </div>
            <div class="mb-3">
              <CFormLabel for="nombre">Nombre Rol</CFormLabel>
              <CFormInput
                type="text"
                id="nombreRol"
                placeholder="Nombre Rol"
                size="sm"
                disabled
                maxlength="255"
                :value="rolSelected.nombre"
              />
            </div>
            <div class="mb-3">
              <CFormLabel for="apellidos">Detalle</CFormLabel>
              <CFormInput
                type="text"
                id="detalle"
                placeholder="Detalle"
                size="sm"
                disabled
                maxlength="255"
                :value="rolSelected.detalle"
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
            resetrol();
            visibleModalrol = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton color="primary" @click="activarrol">{{
        rolSelected.activo ? "Desactivar" : "Activar"
      }}</CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL -->

  <!-- MODAL CREAR -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalNuevorol"
    @close="
      () => {
        resetNewrol();
        visibleModalNuevorol = false;
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Nuevo rol</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CContainer class="pt-2">
          <CRow>
            <CCol sm="12">
              <div class="mb-3">
                <CFormLabel for="nombreNew">Tipo perfil</CFormLabel>
                <CFormSelect
                  id="perfilIdSelectedNew"
                  v-model="perfilIdSelectedNew"
                  size="sm"
                >
                  <option value="0" :key="0">Seleccione un Perfil</option>
                  <option v-for="pf in perfiles" :key="pf.id" :value="pf.id">
                    {{ pf.nombre }}
                  </option>
                </CFormSelect>
              </div>
              <div class="mb-3">
                <CFormLabel for="nombreNew">Nombre Rol</CFormLabel>
                <CFormInput
                  type="text"
                  id="nombreNew"
                  placeholder="Nombre Rol"
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
            resetNewrol();
            visibleModalNuevorol = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton id="btnGuardarNewrol" @click="guardarNewrol" color="primary">
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
import swal from "sweetalert";
import ApiNeva from "@/api/ApiNeva";
import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import { permisosRoles } from "@/_menuOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "Rol",
  components: {
    VOnboardingWrapper,
  },
  methods: {
    renderSteps,
  },
  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);
    const localMenuOnvoarding = permisosRoles;

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
      roles: [],
      perfiles: [],
      rolSelected: {},
      perfilSelected: {},
      visibleModalNuevorol: false,
      visibleModalrol: false,
      perfilIdSelected: 0,
      perfilIdSelectedNew: 0,
    });

    const getProfile = () => {
      if (state.perfilIdSelected == 0) {
        state.perfiles = [];
        ApiNeva.get("Perfil/PerfilGetAll", { headers: header })
          .then((response) => {
            if (response.status != 200) return false;
            state.perfiles = response.data;
            state.roles.forEach((element) => {
              element.perfil = state.perfiles.find(
                (x) => x.id == element.perfilId
              );
            });
          })
          .catch((error) => console.log(error));
      } else {
        state.roles.forEach((element) => {
          element.perfil = state.perfiles.find((x) => x.id == element.perfilId);
        });
      }
    };

    const nombrePerfil = (rol) => {
      //console.log("rol", rol);
      return rol.perfil == null ? "cargando..." : rol.perfil.nombre;
    };

    const getRoles = () => {
      state.roles = [];

      ApiNeva.get("Rol/RolGetAll", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.roles = response.data;
          //console.log(" state.roles ", state.roles );
          if (state.perfilIdSelected != 0)
            state.roles = state.roles.filter(
              (x) => x.perfilId == state.perfilIdSelected
            );
          getProfile();
        })
        .catch((error) => console.log(error));
    };

    const getrolSelected = (idrol) => {
      state.rolSelected = state.roles.find((c) => c.id === idrol);
      state.visibleModalrol = true;
    };

    const changeResumenPerfil = () => {
      let perfilIdSelected =
        document.getElementById("perfilIdSelected").options[
          document.getElementById("perfilIdSelected").selectedIndex
        ].value;
      // if (!perfilIdSelected || perfilIdSelected == 0) return;

      state.perfilIdSelected = perfilIdSelected;

      //console.log("state.perfilIdSelected",state.perfilIdSelected)
      getRoles();
    };

    const resetrol = () => {
      state.rolSelected = {
        activo: true,
        detalle: "",
        id: 0,
        nombre: "",
      };
    };

    const resetNewrol = () => {
      document.getElementById("nombreNew").value = "";
      document.getElementById("detalleNew").value = "";
    };

    const activarrol = () => {
      let rol = state.rolSelected;

      if (!rol.id) {
        swal(
          "Activar rol",
          "Debe seleccionar un rol para activar o desactivar",
          "warning"
        );
        return;
      }

      if (rol.id) {
        //validar que sea root o administrador
        swal({
          title: "Activar rol",
          text: "¿Está seguro de modificar el estado del Rol?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((resp) => {
          if (!resp) return;
          ToggleActivo(rol);
        });
        return;
      }
      //ToggleActivo(idrol);
    };

    const ToggleActivo = (rol) => {
      var bodyrol = {
        id: rol.id,
        nombre: rol.nombre,
        detalle: rol.detalle,
        perfilId: rol.perfilId,
        activo: !rol.activo,
      };
      ApiNeva.post("Rol/RolUpdate", bodyrol, { headers: header }).then(
        (response) => {
          if (response.status != 200) return false;
          getRoles();
          swal("Registro rol", "Se actualizó el estado del rol", "success");
          state.visibleModalrol = false;
          return;
        }
      );
    };

    const guardarNewrol = () => {
      showSpining(true);

      let nombre = document.getElementById("nombreNew").value;
      let detalle = document.getElementById("detalleNew").value;
      let perfilIdSelectedNew = document.getElementById("perfilIdSelectedNew")
        .options[document.getElementById("perfilIdSelectedNew").selectedIndex]
        .value;
      //console.log("perfilIdSelectedNew", perfilIdSelectedNew);
      if (!nombre) {
        swal("Registro rol", "Debe ingresar un nombre para el rol", "warning");
        showSpining(false);
        return;
      }

      if (!detalle) {
        swal("Registro rol", "Debe ingresar un detalle para el rol", "warning");
        showSpining(false);
        return;
      }
      if (perfilIdSelectedNew <= 0) {
        swal(
          "Registro rol",
          "Debe seleccionar un pefil para el rol",
          "warning"
        );
        showSpining(false);
        return;
      }

      let bodyrol = {
        id: 0,
        nombre: nombre,
        detalle: detalle,
        perfilId: perfilIdSelectedNew, //aqui va el selectectArray de perfil
        activo: true,
      };

      ApiNeva.post("Rol/RolInsert", bodyrol, { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          showSpining(false);
          state.visibleModalNuevorol = false;
          getRoles();
          swal("Registro rol", "rol creado", "success");
          return;
        })
        .catch((error) => {
          showSpining(false);
          if (
            error.response.data.detail.includes("llave duplicada") ||
            error.response.data.detail.includes("duplicate key")
          ) {
            swal(
              "Registro rol",
              "El nombre  ya se encuentra registrado",
              "warning"
            );
            state.visibleModalNuevorol = false;
            getRoles();
            return;
          }
          swal(
            "Registro rol",
            "Por favor, verifique los datos ingresados sean válidos.",
            "warning"
          );
          return;
        });
    };

    const showSpining = (isActivate) => {
      if (isActivate) {
        document.getElementById("loading").style.display = "inline-block";
        document.getElementById("btnGuardarNewrol").disabled = true;
      } else {
        document.getElementById("loading").style.display = "none";
        document.getElementById("btnGuardarNewrol").disabled = false;
      }
    };

    const onBoarding = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboarding = await onBoardingHelper.getUserSeeMenu(
          user.id,
          "permisosRoles",
          header
        );
      } catch (error) {
        console.log(error);
      }

      if (!state.isonboarding) {
        state.steps = localMenuOnvoarding.map((x) => {
          return renderSteps(x);
        });
        await onBoardingHelper.setUserSeeMenu(user.id, "permisosRoles", header);
      }
    };

    onMounted(() => {
      getRoles();
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
      getrolSelected,
      resetrol,
      guardarNewrol,
      activarrol,
      changeResumenPerfil,
      resetNewrol,
      showSpining,
      nombrePerfil,
    };
  },
};
</script>
