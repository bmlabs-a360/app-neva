<template>
  <!--<VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />-->
  <CRow>
    <!-- LIST -->
    <CCol :md="12">
      <CCard class="mb-4" data-aos="fade-up" data-aos-easing="ease">
        <CCardHeader>
          <CRow>
            <CCol :sm="6" :md="9" :xs="6" :lg="9">
              <strong>Crear Usuarios</strong>
            </CCol>
            <CCol :sm="6" :md="3" :xs="6" :lg="3">
              <div class="d-grid flex">
                <strong>Crear usuario 
                    <CButton  @click="() => {visibleModalNuevoUser = true;}">
                      <CIcon icon="cib-addthis" id="crear_usuario"/>
                    </CButton>
                  </strong>
                  
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell class="text-center" scope="col"
                  >Usuario</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Área</CTableHeaderCell
                >
                <CTableHeaderCell class="text-center" scope="col"
                  >Acción</CTableHeaderCell
                >
                <CTableHeaderCell class="text-start" scope="col"
                  >Baja/Alta</CTableHeaderCell
                >
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="user in usuarios" :key="user.id">
                <CTableDataCell class="text-center">{{
                  user.nombres
                }}</CTableDataCell>
                <CTableDataCell class="text-center">{{
                  user.area
                }}</CTableDataCell>
                <CTableDataCell class="text-center" id="acciones_usuario">
                  <CButton 
                    @click="getUserDelete(user.id)"><CIcon :icon="cilTrash" size="lg" />
                  </CButton>
                  <CButton 
                    @click="getUserSelected(user.id)"><CIcon :icon="cilPen" size="lg" />
                  </CButton>
                </CTableDataCell>
                <CTableDataCell class="text-center"
                  ><CFormSwitch
                    style="cursor: pointer"
                    :checked="user.activo"
                /></CTableDataCell>
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
    :visible="visibleModalUser"
    @close="
      () => {
        resetUser();
        visibleModalUser = false;
      }
    "
  >
    <CModalHeader>
        <CModalTitle>Crear usuario</CModalTitle>&nbsp;&nbsp;
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <div style="display: flex">
            <CFormLabel >Baja/Alta </CFormLabel>
            <div>
              <CFormSwitch
                style="cursor: pointer"
                id="activo"
                v-model="userSelected.activo"
                :checked="userSelected.activo"
              />
            </div>
          </div>
          <CCol sm="6">
            <div class="mb-3">
              <CFormLabel for="nombre">Nombre de usuario*</CFormLabel>
              <CInputGroup class="mb-3">
                <CInputGroupText>
                  <CIcon icon="cil-user" />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  id="nombre"
                  placeholder="Nombres"
                  size="sm"
                  disabled
                  maxlength="255"
                  :value="userSelected.nombres"
                />
              </CInputGroup>
            </div>

            <div class="mb-3">
              <CFormLabel for="apellidos">Contraseña*</CFormLabel>
              <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <div v-if="passwordFieldType != 'password'">
                      <i @click="switchVisibility">
                        <svg
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                          />
                          <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                          />
                        </svg>
                      </i>
                    </div>
                    <div v-if="passwordFieldType == 'password'">
                      <i @click="switchVisibility">
                        <svg
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye-slash"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                          />
                          <path
                            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
                          />
                          <path
                            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
                          />
                        </svg>
                      </i>
                    </div>
                  </CInputGroupText>
                  <CFormInput
                    id="password"
                    :type="passwordFieldType"
                    size="sm"
                    maxlength="255"
                    :value="userSelected.password"
                  ></CFormInput>
                </CInputGroup>
            </div>
          </CCol>

          <CCol sm="6">
            <div class="mb-3">
              <CFormLabel for="email">Correo*</CFormLabel>
              <CInputGroup class="mb-3">
                <CInputGroupText>
                  <CIcon icon="cil-mail" />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  id="email"
                  disabled
                  maxlength="255"
                  size="sm"
                  :value="userSelected.email"
                />
              </CInputGroup>
             
            </div>
          </CCol>

           <CCol sm="6">
            <div class="mb-3">
              <CInputGroup class="mb-3">
                <CInputGroupText>
                  <CIcon icon="cil-mail" />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  id="empresaid"
                  size="sm"
                  :value="userSelected.empresaId"
                />
              </CInputGroup>
             
            </div>
          </CCol>

          <div class="mt-3">
            <CFormLabel>Asociar evaluación y área</CFormLabel>
          </div>
          <CTable responsive>
            <CTableHead>
              <CTableRow>
                
                <CTableHeaderCell class="text-center" scope="col">
                  Evaluación
                </CTableHeaderCell>
                <CTableHeaderCell class="text-center" scope="col">
                  Asociar
                </CTableHeaderCell>
                <CTableHeaderCell class="text-center" scope="col">
                  Asociar área
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="evaluacion in evaluaciones" :key="evaluacion.id">
                <CTableDataCell class="text-center">
                  {{evaluacion.nombres}}
                </CTableDataCell>
                <CTableDataCell class="text-center">
                  {{user.area}}
                </CTableDataCell>
                <CTableDataCell class="text-center" id="acciones_usuario">
                     <CFormCheck 
                          id="chkAsociar"
                      />
                  <CButton 
                    @click="getUserSelected(user.id)"><CIcon :icon="cilPen" size="lg" />
                  </CButton>
                </CTableDataCell>
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
            resetUser();
            visibleModalUser = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton color="primary" @click="activarUser">Guardar</CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL -->

  <!-- MODAL CREAR -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalNuevoUser"
    @close="
      () => {
        resetNewUser();
        visibleModalNuevoUser = false;
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Nuevo usuario</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CNav variant="tabs" role="tablist">
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              :active="tabPaneActiveKey === 1"
              @click="
                () => {
                  tabPaneActiveKey = 1;
                  setTextGuardarOrSolicitar('Enviar solicitud');
                }
              "
            >
              Link registro
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              :active="tabPaneActiveKey === 2"
              @click="
                () => {
                  tabPaneActiveKey = 2;
                  setTextGuardarOrSolicitar('Guardar');
                }
              "
            >
              Formulario
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
                <CCol sm="12">
                  <div class="mb-3">
                    <CFormLabel>Tipo perfil</CFormLabel>
                    <CFormSelect
                      id="perfilIdSelectedNewSolicitar"
                      v-model="perfilIdSelectedNewSolicitar"
                      size="sm"
                    >
                      <option value="0" :key="0">Seleccione un Perfil</option>
                      <option
                        v-for="pf in perfiles"
                        :key="pf.id"
                        :value="pf.id"
                      >
                        {{ pf.nombre }}
                      </option>
                    </CFormSelect>
                  </div>
                </CCol>
                <CCol sm="12">
                  <div class="mb-3">
                    <CFormLabel for="NombreDestinatario"
                      >Nombre destinatario</CFormLabel
                    >
                    <CFormInput
                      type="text"
                      id="NombreDestinatario"
                      placeholder="Nombre destinatario"
                      maxlength="150"
                      size="sm"
                    />
                  </div>

                  <div class="mb-3">
                    <CFormLabel for="email">Email</CFormLabel>
                    <CLink
                      v-c-tooltip="
                        'Se enviará notificación para que el usuario complete el registro'
                      "
                    >
                      <CFormInput
                        type="text"
                        id="emailSolicitud"
                        maxlength="255"
                        size="sm"
                        placeholder="example@email.com"
                      />
                    </CLink>
                  </div>
                </CCol>
              </CRow>
            </CContainer>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="profile-tab"
            :visible="tabPaneActiveKey === 2"
          >
            <CContainer class="pt-2">
              <CRow>
                <CCol sm="12">
                  <div class="mb-3">
                    <CFormLabel>Tipo perfil</CFormLabel>
                    <CFormSelect
                      id="perfilIdSelectedNew"
                      v-model="perfilIdSelectedNew"
                      size="sm"
                    >
                      <option value="0" :key="0">Seleccione un Perfil</option>
                      <option
                        v-for="pf in perfiles"
                        :key="pf.id"
                        :value="pf.id"
                      >
                        {{ pf.nombre }}
                      </option>
                    </CFormSelect>
                  </div>

                  <!--div class="mb-3">
                  <CFormLabel for="rutNew">Rut</CFormLabel>
                  <CFormInput type="text" id="rutNew" placeholder="12345678-9" maxlength="15" size="sm"/>
                </div-->

                  <div class="mb-3">
                    <CFormLabel for="emailNew">Email</CFormLabel>
                    <CFormInput
                      type="text"
                      id="emailNew"
                      placeholder="example@email.com"
                      maxlength="255"
                      size="sm"
                    />
                  </div>

                  <div class="mb-3">
                    <CFormLabel for="nombresNew">Nombres</CFormLabel>
                    <CFormInput
                      type="text"
                      id="nombresNew"
                      placeholder="Nombres"
                      size="sm"
                      maxlength="255"
                    />
                  </div>

                  <div class="mb-3">
                    <CFormLabel for="apellidosNew">Apellidos</CFormLabel>
                    <CFormInput
                      type="text"
                      id="apellidosNew"
                      placeholder="Apellidos"
                      size="sm"
                      maxlength="255"
                    />
                  </div>

                  <!--div class="mb-4">
                  <CFormLabel for="passNew">Password</CFormLabel>
                  <CFormInput type="text" id="passNew" placeholder="Password" size="sm" maxlength="200"/>
                </div-->
                  <div class="mb-1">
                    <CFormLabel for="passNew">Password</CFormLabel>
                  </div>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <div v-if="passwordFieldType != 'password'">
                        <i @click="switchVisibility">
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-eye"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                            />
                            <path
                              d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                            />
                          </svg>
                        </i>
                      </div>
                      <div v-if="passwordFieldType == 'password'">
                        <i @click="switchVisibility">
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-eye-slash"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                            />
                            <path
                              d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
                            />
                            <path
                              d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
                            />
                          </svg>
                        </i>
                      </div>
                    </CInputGroupText>
                    <CFormInput
                      id="passNew"
                      :type="passwordFieldType"
                      v-model="clave"
                      placeholder="Password"
                      autocomplete="current-password"
                      @keypress="buscarEnter"
                    ></CFormInput>
                  </CInputGroup>
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
            resetNewUser();
            visibleModalNuevoUser = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton
        id="btnGuardarOrSolicitar"
        @click="guardarOrSolicitar"
        color="primary"
      >
        <CRow>
          <CCol> Solicitud </CCol>
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
import { cilPen, cilTrash} from "@coreui/icons";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import { validateEmail, Fn } from "@/Helper/util";
import { useRoute } from "vue-router";
import { useReCaptcha } from "vue-recaptcha-v3";
//import { onBoardingHelper, renderSteps } from "@/Helper/onBoardingHelper";
import { permisosUsuario } from "@/_menuOnboarding.js";
//import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";

export default {
  name: "Usuario",
  methods: {
    validateEmail,
    Fn,
    //renderSteps,
  },
  components: {
    //VOnboardingWrapper,
  },
  setup() {
    const wrapper = ref(null);
    //const { start } = useVOnboarding(wrapper);
    //const localMenuOnvoarding = permisosUsuario;

    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
    const header = {
      Authorization: "Bearer " + localStorage.token,
      ApiKey,
    };
    const headerRecaptcha = {
      ApiKey,
    };

    const route = useRoute();
    const uri = route.query.uri;
    //const email = route.query.email;

    const state = reactive({
      //isonboarding: false,
      wrapper,
      //steps: [],
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
      uri: uri,
      tabPaneActiveKey: 1,
      usuarios: [],
      evaluaciones: [],


      userSelected: {},
      perfiles: [],
      perfilIdSelectedNew: 0,
      perfilIdSelectedEdit: 0,
      perfilIdSelectedNewSolicitar: 0,
      visibleModalNuevoUser: false,
      visibleModalUser: false,
      passwordFieldType: "password",
      clave: "",
    });

    const switchVisibility = () => {
      state.passwordFieldType =
        state.passwordFieldType === "password" ? "text" : "password";
    };

    const getProfile = () => {
      state.perfiles = [];
      ApiNeva.get("Perfil/GetPerfils", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.perfiles = response.data;
          console.log(" state.perfiles ", state.perfiles);
          getUsers();
        })
        .catch((error) => console.log(error));
    };

    const getUsers = async () => {
      state.usuarios = [];

      ApiNeva.get("Usuario/GetAll", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.usuarios = response.data;
          console.log("state.usuarios 1  ", state.usuarios);
          state.usuarios.forEach((element) => {
            if (element.perfilId == null) {
              element.perfil = { nombre: "sin definir", id: 0 };
            } else
              element.perfil = state.perfiles.find(
                (x) => x.id == element.perfilId
              );
          });
        })
        .catch((error) => console.log(error));
    };

    const getUserSelected = (idusuario) => {
      state.userSelected = state.usuarios.find((c) => c.id === idusuario);
      state.visibleModalUser = true;
      state.perfilIdSelectedEdit = state.userSelected.perfil;
      getEvaluaciones(state.userSelected.id);
    };

    const getEvaluaciones = (usuarioId) => {
      debugger;
        let bodyUser = {
                          id : usuarioId
                      };

      ApiNeva.post(
            "Evaluacion/GetEvaluacionsByUsuarioId",
            bodyUser,
            {
              headers: {
                  ApiKey,
              },
            }
        )
        .then((response) => {
          debugger;
          if (response.status != 200) return false;
          state.evaluaciones = response.data;
        })
        .catch((error) => console.log(error));
    };


    const resetUser = () => {
      state.userSelected = {
        nombres: "",
        apellidos: "",
        //rut: '',
        activo: false,
        email: "",
        fechaCracion: "",
        fechaUltimoAcceso: "",
      };
    };

    const resetNewUser = () => {
      document.getElementById("nombresNew").value = "";
      document.getElementById("apellidosNew").value = "";
      document.getElementById("emailNew").value = "";
    };

    const setTextGuardarOrSolicitar = (text) => {
      document.getElementById("btnGuardarOrSolicitar").innerText = "";
      document.getElementById("btnGuardarOrSolicitar").innerText = text;
    };

    const activarUser = () => {
      let idusuario = state.userSelected.id.toString();
      let idperfil = document.getElementById("perfilIdSelectedEdit").options[
        document.getElementById("perfilIdSelectedEdit").selectedIndex
      ].value;

      console.log("idperfil", idperfil);
      let activo = state.userSelected.activo.toString();
      console.log("activo", activo);

      if (!idperfil) {
        swal(
          "Activar Usuario",
          "Debe seleccionar un perfil al usuario para activar o desactivar",
          "warning"
        );
        return;
      }

      if (!idusuario) {
        swal(
          "Activar Usuario",
          "Debe seleccionar un usuario para activar o desactivar",
          "warning"
        );
        return;
      }

      if (idusuario == localStorage.iduser) {
        swal({
          title: "Activar Usuario",
          text: "¿Está seguro de modificar el estado del usuario en sessión?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((resp) => {
          if (!resp) return;
          ToggleActivo(idusuario, idperfil, activo);
        });
        return;
      }
      ToggleActivo(idusuario, idperfil, activo);
    };

    const ToggleActivo = (idusuario, idperfil, activo) => {
      ApiNeva.post(
        "Usuario/ToggleActivo?idusuario=" +
          idusuario +
          "&idperfil=" +
          idperfil +
          "&activo=" +
          activo,
        null,
        { headers: header }
      ).then((response) => {
        if (response.status != 200) return false;
        getProfile();
        swal(
          "Solicitar Registro Usuario",
          "Se actualizó el estado del usuario",
          "success"
        );
        state.visibleModalUser = false;
        return;
      });
    };

    const guardarOrSolicitar = async () => {
      //showSpining(true)
      if (state.tabPaneActiveKey == 1) {
        let emailSolicitud = document.getElementById("emailSolicitud").value;
        let nombreDestinatario =
          document.getElementById("NombreDestinatario").value;
        state.perfilIdSelectedNewSolicitar = document.getElementById(
          "perfilIdSelectedNewSolicitar"
        ).options[
          document.getElementById("perfilIdSelectedNewSolicitar").selectedIndex
        ].value;

        if (state.perfilIdSelectedNewSolicitar == 0) {
          swal(
            "Registro usuario",
            "Debe seleccionar un tipo de perfil",
            "warning"
          );
          //showSpining(false);
          return;
        }

        if (!emailSolicitud || !validateEmail(emailSolicitud)) {
          swal(
            "Solicitar Registro Usuario",
            "Debe ingresar un email válido",
            "warning"
          );
          //showSpining(false);
          return;
        }

        if (!nombreDestinatario) {
          swal(
            "Solicitar Registro Usuario",
            "Debe ingresar nombre del destinatario",
            "warning"
          );
          //showSpining(false);
          return;
        }
        let idusuario = localStorage.iduser;

        let bodySolicitud = {
          idusuario: idusuario,
          emailDestinatario: emailSolicitud,
          destinatarioAlias: nombreDestinatario,
          perfilId: state.perfilIdSelectedNewSolicitar,
        };

        ApiNeva.post("Usuario/SolicitudCreacionUsuario", bodySolicitud, {
          headers: header,
        }).then((response) => {
          if (response.status != 200) {
            //showSpining(false);
            return false;
          }
          swal(
            "Solicitar Registro Usuario",
            "Se ha enviado al email indicado una solicitud de registro",
            "success"
          );
          state.visibleModalNuevoUser = false;
          getProfile();
          return;
        });
        return;
      }

      let nombres = document.getElementById("nombresNew").value;
      let apellidos = document.getElementById("apellidosNew").value;
      //let rut = document.getElementById('rutNew').value;
      let email = document.getElementById("emailNew").value;
      let password = document.getElementById("passNew").value;
      state.perfilIdSelectedNew = document.getElementById(
        "perfilIdSelectedNew"
      ).options[
        document.getElementById("perfilIdSelectedNew").selectedIndex
      ].value;
      if (state.perfilIdSelectedNew == 0) {
        swal(
          "Registro usuario",
          "Debe seleccionar un tipo de perfil",
          "warning"
        );
        //showSpining(false);
        return;
      }

      if (!email || !validateEmail(email)) {
        swal("Registro usuario", "Debe ingresar un email", "warning");
        //showSpining(false);
        return;
      }

      if (!nombres) {
        swal("Registro usuario", "Debe ingresar sus nombres", "warning");
        //showSpining(false);
        return;
      }

      if (!apellidos) {
        swal("Registro usuario", "Debe ingresar sus apellidos", "warning");
        //showSpining(false);
        return;
      }

      if (!password) {
        swal("Registro usuario", "Debe ingresar una password", "warning");
        //showSpining(false);
        return;
      }

      let bodyUser = {
        email: email,
        password: password,
        nombres: nombres,
        apellidos: apellidos,
        //rut: rut,
        fechaCreacion: null,
        perfilId: state.perfilIdSelectedNew,
      };
      console.log("route.query.uri", route.query.uri);

      ApiNeva.post(
        "Usuario/UsuarioCreate?token=" + localStorage.token,
        bodyUser,
        { headers: header }
      )
        .then((response) => {
          if (response.status != 200) return false;
          //showSpining(false);
          swal(
            "Registro usuario",
            "Se ha enviado un email al usuario para confirmar el registro",
            "success"
          );
          state.visibleModalNuevoUser = false;
          return;
        })
        .catch((error) => {
          //showSpining(false);
          if (
            error.response.data.detail.includes("llave duplicada") ||
            error.response.data.detail.includes("duplicate key")
          ) {
            swal(
              "Registro usuario",
              "El email ya se encuentran registrados",
              "warning"
            );
            state.visibleModalNuevoUser = false;
            getProfile();
            return;
          }
          swal(
            "Registro usuario",
            "Por favor, verifique los datos ingresados son válidos.",
            "warning"
          );
          return;
        });
      // });
    };

    const showSpining = (isActivate) => {
      if (isActivate) {
        document.getElementById("loading").style.display = "inline-block";
        document.getElementById("btnGuardarOrSolicitar").disabled = true;
      } else {
        document.getElementById("loading").style.display = "none";
        document.getElementById("btnGuardarOrSolicitar").disabled = false;
      }
    };

    /*const onBoarding = async () => {
      let user = JSON.parse(localStorage.getItem("usuarioModel"));
      try {
        state.isonboarding = await onBoardingHelper.getUserSeeMenu(
          user.id,
          "permisosUsuario",
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
          "permisosUsuario",
          header
        );
      }
    };*/

    onMounted(() => {
      getProfile();
      //onBoarding();
      /*if (!state.isonboarding) {
        setTimeout(() => {
          start();
        }, 500);
      }*/
    });

    return {
      cilPen,
      cilTrash,
      ...toRefs(state),
      getUserSelected,
      resetUser,
      guardarOrSolicitar,
      activarUser,
      setTextGuardarOrSolicitar,
      resetNewUser,
      showSpining,
      switchVisibility,
    };
  },
};
</script>

<style></style>
