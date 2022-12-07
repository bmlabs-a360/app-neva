<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
  <CRow>
    <!-- LIST -->
    <CCol :md="12">
      <CCard class="mb-4" data-aos="fade-up" data-aos-easing="ease">
        <CCardHeader>
          <CRow>
            <CCol :sm="6" :md="10" :xs="6" :lg="11">
              <strong>Gestión de Privilegios</strong>
            </CCol>
            <CCol :sm="6" :md="2" :xs="6" :lg="1">
              <div class="d-grid">
                <CButton
                  id="crear_privilegios"
                  color="primary"
                  @click="
                    () => {
                      visibleModalNuevoprivilegio = true;
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
        <CCardHeader>
          <CRow>
            <CCol :sm="6" :md="6" :xs="6" :lg="6"> Filtro por rol </CCol>
            <CCol :sm="6" :md="6" :xs="6" :lg="6">
              <CFormSelect
                id="rolIdSelected"
                v-model="rolIdSelected"
                size="sm"
                @change="changeResumenRol"
              >
                <option value="0" :key="0">Seleccionar rol</option>
                <option v-for="pf in roles" :key="pf.id" :value="pf.id">
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
                  >Ámbito</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Método</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Perfil</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Rol</CTableHeaderCell
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
              <CTableRow v-for="permiso in permisos" :key="permiso.id">
                <CTableDataCell class="text-center">{{
                  permiso.nombre
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  permiso.detalle
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  nombrePerfil(permiso)
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  nombreRol(permiso)
                }}</CTableDataCell>
                <CTableDataCell class="text-center"
                  ><CFormSwitch
                    style="cursor: pointer"
                    disabled
                    :checked="permiso.activo"
                /></CTableDataCell>
                <CTableDataCell class="text-center" id="acciones_privilegios"
                  ><CButton @click="getPermisoSelected(permiso.id)"
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
    :visible="visibleModalPrivilegio"
    @close="
      () => {
        resetprivilegio();
        visibleModalPrivilegio = false;
      }
    "
  >
    <CModalHeader>
      <div style="display: flex">
        <CModalTitle>Privilegio</CModalTitle>&nbsp;&nbsp;
        <div style="padding-top: 0.3rem">
          <CFormSwitch
            style="cursor: pointer"
            disabled
            id="activo"
            :checked="permisoSelected.activo"
          />
        </div>
      </div>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <CCol sm="9">
            <div class="mb-3">
              <CFormLabel for="nombre">Perfil</CFormLabel>
              <CFormInput
                type="text"
                id="perfil"
                placeholder="Perfil"
                size="sm"
                disabled
                maxlength="255"
                :value="nombrePerfil(permisoSelected)"
              />
            </div>
            <div class="mb-3">
              <CFormLabel for="nombre">Rol</CFormLabel>
              <CFormInput
                type="text"
                id="rol"
                placeholder="Perfil"
                size="sm"
                disabled
                maxlength="255"
                :value="nombreRol(permisoSelected)"
              />
            </div>
            <div class="mb-3">
              <CFormLabel for="nombre">Ámbito de privilegio</CFormLabel>
              <CFormInput
                type="text"
                id="nombreRol"
                placeholder="Nombre Rol"
                size="sm"
                disabled
                maxlength="255"
                :value="permisoSelected.nombre"
              />
            </div>
            <div class="mb-3">
              <CFormLabel for="apellidos">Método</CFormLabel>
              <CFormInput
                type="text"
                id="detalle"
                placeholder="Detalle"
                size="sm"
                disabled
                maxlength="255"
                :value="permisoSelected.detalle"
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
            resetprivilegio();
            visibleModalPrivilegio = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton color="primary" @click="activarprivilegio">{{
        permisoSelected.activo ? "Desactivar" : "Activar"
      }}</CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL -->

  <!-- MODAL CREAR -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalNuevoprivilegio"
    @close="
      () => {
        resetNewprivilegio();
        visibleModalNuevoprivilegio = false;
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Nuevo privilegio</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CContainer class="pt-2">
          <CRow>
            <CCol sm="12">
              <div class="mb-3">
                <CFormLabel>Tipo perfil</CFormLabel>
                <CFormSelect
                  id="perfilIdSelectedNew"
                  v-model="perfilIdSelectedNew"
                  size="sm"
                  @change="changeResumenPerfilNew"
                >
                  <option value="0" :key="0">Seleccione un Perfil</option>
                  <option v-for="pf in perfiles" :key="pf.id" :value="pf.id">
                    {{ pf.nombre }}
                  </option>
                </CFormSelect>
              </div>
              <div class="mb-3">
                <CFormLabel>Tipo rol</CFormLabel>
                <CFormSelect
                  id="rolIdSelectedNew"
                  v-model="rolIdSelectedNew"
                  size="sm"
                >
                  <option value="0" :key="0">Seleccione un Rol</option>
                  <option v-for="pf in rolesNew" :key="pf.id" :value="pf.id">
                    {{ pf.nombre }}
                  </option>
                </CFormSelect>
              </div>

              <div class="mb-3">
                <CFormLabel>Privilegios disponibles</CFormLabel>
                <CFormSelect
                  id="privilegioIdSelectedNew"
                  v-model="privilegioIdSelectedNew"
                  size="sm"
                  @change="changeResumenPrivilegioNew"
                >
                  <option value="0" :key="0">Todos</option>
                  <option
                    v-for="pf in privilegioNew"
                    :key="pf.id"
                    :value="pf.id"
                  >
                    {{ pf.nombre }}
                  </option>
                </CFormSelect>
              </div>

              <div class="mb-3">
                <CFormLabel for="nombreNew">Ámbito de privilegio</CFormLabel>
                <CFormInput
                  disabled
                  type="text"
                  id="nombreNew"
                  placeholder="Todos"
                  size="sm"
                  maxlength="255"
                />
              </div>
              <div class="mb-3">
                <CFormLabel for="detalleNew">Método</CFormLabel>
                <CFormInput
                  disabled
                  type="text"
                  id="detalleNew"
                  placeholder="Todos"
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
            resetNewprivilegio();
            visibleModalNuevoprivilegio = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton
        id="btnguardarNewprivilegio"
        @click="guardarNewprivilegio"
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
import { permisosPrivilegios } from "@/_menuOnboarding.js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "Privilegios",
  components: {
    VOnboardingWrapper,
  },
  methods: {
    renderSteps,
  },
  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);
    const localMenuOnvoarding = permisosPrivilegios;

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
      permisos: [],
      permisosCopy: [],
      roles: [],
      rolesCopy: [],
      rolesNew: [],
      privilegioNew: [],
      perfiles: [],
      permisoSelected: {},
      permisoSelected: {},
      visibleModalNuevoprivilegio: false,
      visibleModalPrivilegio: false,
      perfilIdSelected: 0,
      perfilIdSelectedNew: 0,
      privilegioIdSelectedNew: 0,
      rolIdSelectedNew: 0,
      rolIdSelected: 0,
    });

    const getProfile = () => {
      state.perfiles = [];
      ApiNeva.get("Perfil/PerfilGetAll", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.perfiles = response.data;
          getRoles();
        })
        .catch((error) => console.log(error));
    };

    const getRoles = () => {
      state.roles = [];
      ApiNeva.get("Rol/RolGetAll", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.roles = response.data;
          getPermisos();
        })
        .catch((error) => console.log(error));
    };

    const getPermisos = () => {
      state.permisos = [];
      ApiNeva.get("Permiso/PermisolGetAll", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;

          state.permisos = response.data;
          state.permisos.forEach((element) => {
            element.perfilRol = state.roles.find(
              (x) => x.id == element.perfilRolId
            );
          });
          state.permisos.forEach((element) => {
            element.perfil = state.perfiles.find(
              (x) => x.id == element.perfilId
            );
          });
          state.permisosCopy = state.permisos;
          state.rolesCopy = state.roles;
          changeResumenPerfil();
          changeResumenRol();

          var privilegioNew = JSON.parse(localStorage.getItem("swaggerList"));
          state.privilegioNew = privilegioNew;
        })
        .catch((error) => console.log(error));
    };

    const changeResumenPerfil = () => {
      state.permisos = state.permisosCopy;
      state.roles = state.rolesCopy;
      let perfilIdSelected =
        document.getElementById("perfilIdSelected").options[
          document.getElementById("perfilIdSelected").selectedIndex
        ].value;
      state.perfilIdSelected = perfilIdSelected;
      let rolIdSelected =
        document.getElementById("rolIdSelected").options[
          document.getElementById("rolIdSelected").selectedIndex
        ].value;
      state.rolIdSelected = rolIdSelected;

      if (state.perfilIdSelected != 0) {
        state.roles = state.roles.filter(
          (x) => x.perfilId == state.perfilIdSelected
        );
        state.permisos = state.permisos.filter(
          (x) => x.perfilId == state.perfilIdSelected
        );
      }
      if (state.rolIdSelected != 0) {
        state.roles = state.roles.filter(
          (x) => x.perfilId == state.perfilIdSelected
        );
        state.permisos = state.permisos.filter(
          (x) => x.perfilRolId == state.rolIdSelected
        );
      }
    };

    const changeResumenPerfilNew = () => {
      state.rolesNew = [];
      let perfilIdSelectedNew = document.getElementById("perfilIdSelectedNew")
        .options[document.getElementById("perfilIdSelectedNew").selectedIndex]
        .value;
      state.perfilIdSelectedNew = perfilIdSelectedNew;
      if (state.perfilIdSelectedNew != 0) {
        state.rolesNew = state.rolesCopy.filter(
          (x) => x.perfilId == state.perfilIdSelectedNew
        );
      }
    };

    const changeResumenPrivilegioNew = () => {
      let privilegioIdSelectedNew = document.getElementById(
        "privilegioIdSelectedNew"
      ).options[
        document.getElementById("privilegioIdSelectedNew").selectedIndex
      ].value;

      if (privilegioIdSelectedNew == 0) {
        document.getElementById("nombreNew").value = "Todos";
        document.getElementById("detalleNew").value = "Todos";
      } else {
        var privilegioArray = JSON.parse(localStorage.getItem("swaggerList"));
        var privilegioAux = privilegioArray.filter(
          (x) => x.id == privilegioIdSelectedNew
        );
        document.getElementById("nombreNew").value =
          privilegioAux[0].repositorio;
        document.getElementById("detalleNew").value = privilegioAux[0].metodo;
      }
    };

    const changeResumenRolNew = () => {
      let rolIdSelectedNew =
        document.getElementById("rolIdSelectedNew").options[
          document.getElementById("rolIdSelectedNew").selectedIndex
        ].value;
      state.rolIdSelectedNew = rolIdSelectedNew;
    };

    const changeResumenRol = () => {
      state.permisos = state.permisosCopy;
      state.roles = state.rolesCopy;
      let rolIdSelected =
        document.getElementById("rolIdSelected").options[
          document.getElementById("rolIdSelected").selectedIndex
        ].value;
      state.rolIdSelected = rolIdSelected;
      if (state.rolIdSelected != 0) {
        state.permisos = state.permisos.filter(
          (x) => x.perfilRolId == state.rolIdSelected
        );
      }
      if (state.perfilIdSelected != 0) {
        state.roles = state.roles.filter(
          (x) => x.perfilId == state.perfilIdSelected
        );
        state.permisos = state.permisos.filter(
          (x) => x.perfilId == state.perfilIdSelected
        );
      }
    };

    const nombrePerfil = (permiso) => {
      return permiso.perfil == null ? "cargando..." : permiso.perfil.nombre;
    };

    const nombreRol = (permiso) => {
      return permiso.perfilRol == null
        ? "cargando..."
        : permiso.perfilRol.nombre;
    };

    const getPermisoSelected = (idpermiso) => {
      state.permisoSelected = state.permisos.find((c) => c.id === idpermiso);
      state.visibleModalPrivilegio = true;
    };

    const resetprivilegio = () => {
      state.permisoSelected = {
        activo: true,
        detalle: "",
        id: 0,
        nombre: "",
      };
    };

    const resetNewprivilegio = () => {
      document.getElementById("nombreNew").value = "";
      document.getElementById("detalleNew").value = "";
    };

    const activarprivilegio = () => {
      let permiso = state.permisoSelected;

      if (!permiso) {
        swal(
          "Activar privilegio",
          "Debe seleccionar un privilegio para activar o desactivar",
          "warning"
        );
        return;
      }

      if (permiso) {
        //validar que sea root o administrador
        swal({
          title: "Activar privilegio",
          text: "¿Está seguro de modificar el estado del Privilegio?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((resp) => {
          if (!resp) return;
          ToggleActivo(permiso);
        });
        return;
      }
      //ToggleActivo(permiso);
    };

    const ToggleActivo = (permiso) => {
      var bodypermiso = {
        id: permiso.id,
        nombre: permiso.nombre,
        detalle: permiso.detalle,
        perfilId: permiso.perfilId,
        perfilRolId: permiso.perfilRolId,
        activo: !permiso.activo,
      };
      ApiNeva.post("Permiso/PermisoUpdate", bodypermiso, {
        headers: header,
      }).then((response) => {
        if (response.status != 200) return false;
        getProfile();
        swal(
          "Registro privilegios",
          "Se actualizó el estado del privilegio",
          "success"
        );
        state.visibleModalPrivilegio = false;
        return;
      });
    };

    const guardarNewprivilegio = () => {
      showSpining(true);
      let nombre = document.getElementById("nombreNew").value;
      let detalle = document.getElementById("detalleNew").value;
      let perfilIdSelectedNew = document.getElementById("perfilIdSelectedNew")
        .options[document.getElementById("perfilIdSelectedNew").selectedIndex]
        .value;
      let rolIdSelectedNew =
        document.getElementById("rolIdSelectedNew").options[
          document.getElementById("rolIdSelectedNew").selectedIndex
        ].value;
      let privilegioIdSelectedNew = document.getElementById(
        "privilegioIdSelectedNew"
      ).options[
        document.getElementById("privilegioIdSelectedNew").selectedIndex
      ].value;
      /*if (!nombre) { 
        swal('Registro privilegio', 'Debe ingresar un nombre para el privilegio', 'warning');
        showSpining(false);
        return;
      }
      if (!detalle) {
        swal('Registro privilegio', 'Debe ingresar un detalle para el privilegio', 'warning');
        showSpining(false);
        return;
      }*/
      if (perfilIdSelectedNew <= 0) {
        swal(
          "Registro privilegio",
          "Debe seleccionar un pefil para el privilegio",
          "warning"
        );
        showSpining(false);
        return;
      }
      if (rolIdSelectedNew <= 0) {
        swal(
          "Registro privilegio",
          "Debe seleccionar un rol para el privilegio",
          "warning"
        );
        showSpining(false);
        return;
      }
      console.log("privilegioIdSelectedNew", privilegioIdSelectedNew);
      if (privilegioIdSelectedNew > 0) {
        let bodyprivilegio = {
          id: 0,
          nombre: nombre,
          detalle: detalle,
          perfilId: perfilIdSelectedNew,
          perfilRolId: rolIdSelectedNew,
          activo: true,
        };
        ApiNeva.post("Permiso/PermisoInsert", bodyprivilegio, {
          headers: header,
        })
          .then((response) => {
            if (response.status != 200) return false;
            showSpining(false);
            state.visibleModalNuevoprivilegio = false;
            getProfile();
            swal("Registro privilegio", "privilegio creado", "success");
            return;
          })
          .catch((error) => {
            showSpining(false);
            if (
              error.response.data.detail.includes("llave duplicada") ||
              error.response.data.detail.includes("duplicate key")
            ) {
              swal(
                "Registro privilegio",
                "El privilegio ya se encuentra registrado",
                "warning"
              );
              state.visibleModalNuevoprivilegio = false;
              getProfile();
              return;
            }
            swal(
              "Registro privilegio",
              "Por favor, verifique los datos ingresados sean válidos.",
              "warning"
            );
            return;
          });
      } else if (privilegioIdSelectedNew == 0) {
        var bodyprivilegioArray = [];
        var privilegioArray = JSON.parse(localStorage.getItem("swaggerList"));
        for (let index = 0; index < privilegioArray.length; index++) {
          showSpining(true);
          const element = privilegioArray[index];
          document.getElementById("nombreNew").value = element.repositorio;
          document.getElementById("detalleNew").value = element.metodo;
          let bodyprivilegio = {
            id: 0,
            nombre: element.repositorio,
            detalle: element.metodo,
            perfilId: perfilIdSelectedNew,
            perfilRolId: rolIdSelectedNew,
            activo: true,
          };
          bodyprivilegioArray.push(bodyprivilegio);
        }
        ApiNeva.post("Permiso/PermisosInsert", bodyprivilegioArray, {
          headers: header,
        })
          .then((response) => {
            if (response.status != 200) return false;
            showSpining(false);
            state.visibleModalNuevoprivilegio = false;
            getProfile();
            swal("Registro privilegio", "privilegio creado", "success");
            return;
          })
          .catch((error) => {
            showSpining(false);
            if (
              error.response.data.detail.includes("llave duplicada") ||
              error.response.data.detail.includes("duplicate key")
            ) {
              swal(
                "Registro privilegio",
                "El privilegio ya se encuentra registrado",
                "warning"
              );
              state.visibleModalNuevoprivilegio = false;
              getProfile();
              return;
            }
            swal(
              "Registro privilegio",
              "Por favor, verifique los datos ingresados sean válidos.",
              "warning"
            );
            return;
          });
      }
    };

    const showSpining = (isActivate) => {
      if (isActivate) {
        document.getElementById("loading").style.display = "inline-block";
        document.getElementById("btnguardarNewprivilegio").disabled = true;
      } else {
        document.getElementById("loading").style.display = "none";
        document.getElementById("btnguardarNewprivilegio").disabled = false;
      }
    };

    const onBoarding = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboarding = await onBoardingHelper.getUserSeeMenu(
          user.id,
          "permisosPrivilegios",
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
          "permisosPrivilegios",
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
      getPermisoSelected,
      resetprivilegio,
      guardarNewprivilegio,
      activarprivilegio,
      changeResumenPerfil,
      changeResumenPerfilNew,
      changeResumenPrivilegioNew,
      changeResumenRolNew,
      resetNewprivilegio,
      showSpining,
      nombrePerfil,
      nombreRol,
      changeResumenRol,
    };
  },
};
</script>
