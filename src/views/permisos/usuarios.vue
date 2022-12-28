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
                    <CButton  @click="ModalUserNuevo()">
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
                    disabled
                /></CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <!-- LIST -->

  <!-- MODAL EDITAR USUARIO-->
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
        <CModalTitle>Modificar usuario</CModalTitle>&nbsp;&nbsp;
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
                  v-model="userSelected.nombres"
                />
              </CInputGroup>
            </div>

            <div class="mb-3">
              <CFormLabel for="pass">Contraseña*</CFormLabel>
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
                    v-model="clave"
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
                  v-model="userSelected.email"
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
              <CTableRow v-for="evaluacionEmpresa in evaluacionEmpresas" :key="evaluacionEmpresa.id">
                <CTableDataCell class="text-center">
                  {{evaluacionEmpresa.nombre}}
                </CTableDataCell>
                <CTableDataCell class="text-center">
                   <CFormCheck name="chkAsociar"
                              v-model="evaluacionEmpresa.activo"
                              :checked="evaluacionEmpresa.activo" />
                </CTableDataCell>
                <CTableDataCell class="text-center" id="acciones_usuario">
                  <CButton @click="segmentacionArea(evaluacionEmpresa)">
                    <CIcon :icon="cilPen" size="lg" />
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
      <CButton color="primary" @click="modificarUser()">Guardar</CButton>
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
        resetUser();
        visibleModalNuevoUser = false;
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
                id="activoNew"
                :checked="true"
                v-model="userSelected.activo"
              />
            </div>
          </div>
          <CCol sm="6">
            <div class="mb-3">
              <CFormLabel for="nombrenew">Nombre de usuario*</CFormLabel>
              <CInputGroup class="mb-3">
                <CInputGroupText>
                  <CIcon icon="cil-user" />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  id="nombreNew"
                  placeholder="Nombre"
                  size="sm"
                  maxlength="255"
                  v-model="userSelected.nombres"
                />
              </CInputGroup>
            </div>

            <div class="mb-3">
              <CFormLabel for="passnew">Contraseña*</CFormLabel>
              <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <div v-if="passwordFieldType != 'password'">
                      <i @click="switchVisibilityNew">
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
                      <i @click="switchVisibilityNew">
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
                    id="passwordNew"
                    :type="passwordFieldType"
                    size="sm"
                    maxlength="255"
                    v-model="userSelected.password"
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
                  id="emailNew"
                  maxlength="255"
                  size="sm"
                  v-model="userSelected.email"
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
              <CTableRow v-for="evaluacionEmpresa in evaluacionEmpresas" :key="evaluacionEmpresa.id">
                <CTableDataCell class="text-center">
                  {{evaluacionEmpresa.evaluacion.nombre}}
                </CTableDataCell>
                <CTableDataCell class="text-center">
                  <CFormCheck name="chkAsociarNew" />
                </CTableDataCell>
                <CTableDataCell class="text-center" id="acciones_usuarionew">
                  <CButton @click="segmentacionAreaNew(evaluacionEmpresa.evaluacion)">
                    <CIcon :icon="cilPen" size="lg" />
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
            visibleModalNuevoUser = false;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton color="primary" @click="crearUser()">Guardar</CButton>
    </CModalFooter>
  </CModal>
  <!-- FIN MODAL CREAR -->

  <!-- MODAL SEGMENTACION AREA CREAR  -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalSegmentacionAreaNew"
    @close="
      () => {
        resetAsociarArea();
        visibleModalSegmentacionAreaNew = false;
        visibleModalNuevoUser = true;
      }
    "
  >
     <CModalHeader>
        <CModalTitle>Asociar áreas</CModalTitle>&nbsp;&nbsp;
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <div style="display: flex">
            <CFormLabel > Asociar área a evaluación </CFormLabel>
            <div>
              <CFormInput
                  type="text"
                  id="nombreevaluacion"
                  placeholder="Evaluacion"
                  size="sm"
                  disabled
                  maxlength="255"
                />
            </div>
          </div>
          <CCol sm="12">
            <div class="mb-2">
              <CFormLabel>Asociar área*</CFormLabel>
            </div>
            <div class="mb-2" >
                <CFormLabel style="display:flex"> 
                  <CFormSwitch style="cursor: pointer" id="todoschkNew" @click="checkAll()" /> Todos
                </CFormLabel>
              <div v-for="area in segmentacionAreas" :key="area.id">
                <CFormLabel for="area">{{area.nombreArea}}</CFormLabel>
                <CFormSwitch style="cursor: pointer"
                              v-model="area.activo"
                              :checked="area.activo"
                              name="check" />
              </div>
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
            resetAsociarArea();
            visibleModalSegmentacionAreaNew = false;
            visibleModalNuevoUser = true;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton color="primary" @click="asociarArea()">Guardar</CButton>
    </CModalFooter>
  </CModal>
  <!-- FIN MODAL SEGMENTACION AREA CREAR-->

  <!-- MODAL SEGMENTACION AREA EDITAR  -->
  <CModal
    backdrop="static"
    size="lg"
    alignment="center"
    :visible="visibleModalSegmentacionArea"
    @close="
      () => {
        resetAsociarArea();
        visibleModalSegmentacionArea = false;
        visibleModalUser = true;
      }
    "
  >
     <CModalHeader>
        <CModalTitle>Asociar áreas</CModalTitle>&nbsp;&nbsp;
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <div style="display: flex">
            <CFormLabel > Asociar área a evaluación </CFormLabel>
            <div>
              <CFormInput
                  type="text"
                  id="nombreevaluacion"
                  placeholder="Evaluacion"
                  size="sm"
                  disabled
                  maxlength="255"
                  :value="evaluacion.nombre" 
                />
            </div>
          </div>
          <CCol sm="12">
            <div class="mb-2">
              <CFormLabel>Asociar área*</CFormLabel>
            </div>
              <div class="mb-2" >
                  <CFormLabel style="display:flex" > 
                    <CFormSwitch style="cursor: pointer" id="todoschk" @click="checkAll()" /> Todos
                  </CFormLabel>
                <div v-for="area in segmentacionAreas" :key="area.id">
                  <CFormLabel for="area">{{area.nombreArea}}</CFormLabel>
                  <CFormSwitch style="cursor: pointer"
                                v-model="area.activo"
                                :checked="area.activo" 
                                name="check"/>
                </div>
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
            resetAsociarArea();
            visibleModalSegmentacionArea = false;
            visibleModalUser = true;
          }
        "
      >
        Cerrar
      </CButton>
      <CButton color="primary" @click="asociarArea()">Guardar</CButton>
    </CModalFooter>
  </CModal>
  <!-- MODAL SEGMENTACION AREA EDITAR-->
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import { cilPen, cilTrash} from "@coreui/icons";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import { validateEmail, Fn, checkAll } from "@/Helper/util";
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
    checkAll,
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
    //const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
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
      uri: uri,
      empresas: [],
      usuarioEvaluacions: [],
      evaluacionEmpresas: [],
      empresaSelected: [],
      segmentacionAreas: [],
      evaluacion:null,
      usuarioAreas: [],
      userSelected: {},

      //segmentacionAreas :[],
      tabPaneActiveKey: 1,
      usuarios: [],
      //evaluaciones: [],
      /*evaluaciones: [],
      nombreEvaluacion : "",*/
      //areas: [],
      evaluacionSelected: {},
      perfiles: [],
      visibleModalNuevoUser: false,
      visibleModalSegmentacionArea: false,
      visibleModalSegmentacionAreaNew: false,
      visibleModalUser: false,
      passwordFieldType: "password",
      clave: "",

      perfilIdSelectedNew: 0,
      perfilIdSelectedEdit: [],
      perfilIdSelectedNewSolicitar: 0,
    });

    const switchVisibility = () => {
      state.passwordFieldType = state.passwordFieldType === "password" ? "text" : "password";
      state.clave = document.getElementById("password").value;
    };

    const switchVisibilityNew = () => {
      state.passwordFieldType = state.passwordFieldType === "password" ? "text" : "password";
      state.clave = document.getElementById("passwordNew").value;
    };

    const getProfile = () => {
      state.perfiles = [];
      ApiNeva.get("Perfil/GetPerfils", { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.perfiles = response.data;
          //console.log(" state.perfiles ", state.perfiles);
          getUsers();
        })
        .catch((error) => console.log(error));
    };

    const getUsers = async () => {
      state.usuarios = [];
      let empresaId = JSON.parse(localStorage.usuarioModel).empresaId;
      ApiNeva.get("Usuario/GetUsuarioByIdEmpresa?empresaId=" + empresaId, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.usuarios = response.data;
          //console.log("state.usuarios 1  ", state.usuarios);
          state.usuarios.forEach((element) => {
            if (element.perfilId == null) {
              element.perfil = { nombre: "sin definir", id: 0 };
            } else
              element.perfil = state.perfiles.find(
                (x) => x.id == element.perfilId
              );
          });
          getEmpresas();
          //getEvaluacion();
        })
        .catch((error) => console.log(error));
    };

    const getEmpresas = async () => {
      console.log("getEmpresas ");
      state.empresas = [];
      ApiNeva.post("Empresa/GetEmpresaById", JSON.parse(localStorage.empresaModel), { headers: header })
        .then((response) => {
          if (response.status != 200) return false;
          state.empresas = response.data;
          console.log("state.empresas",state.empresas);
        })
        .catch((error) => console.log(error));
    };

    const segmentacionArea = (evaluacionEmpresa) =>{
      state.evaluacion = evaluacionEmpresa;
      ApiNeva.post("SegmentacionArea/GetSegmentacionAreasByEvaluacionId", state.evaluacion, { headers: header, })
        .then((response) => {
            if (response.status != 200) return false;

            state.usuarioAreas = [];
            state.userSelected.usuarioEvaluacions.forEach(y => {
                if (y.evaluacionId == state.evaluacion.id && y.empresaId == state.evaluacion.empresaId) {
                    state.usuarioAreas = y.usuarioAreas
                }
            });

            state.segmentacionAreas = response.data;
            state.segmentacionAreas.forEach(x => {
                var areaAsuario = state.usuarioAreas.find((y) => y.segmentacionAreaId == x.id);
                x.activo = false;
                if (areaAsuario != undefined)  x.activo = areaAsuario.activo;
            });

            state.visibleModalUser = false;
            state.visibleModalSegmentacionArea = true;
        })
        .catch((error) => console.log(error));
    };

    const segmentacionAreaNew = (evaluacionEmpresa) => {
      state.evaluacion = evaluacionEmpresa;
      ApiNeva.post("SegmentacionArea/GetSegmentacionAreasByEvaluacionId", state.evaluacion, { headers: header, })
        .then((response) => {
            if (response.status != 200) return false;
            state.segmentacionAreas = response.data;
            state.segmentacionAreas.forEach(x => {
                x.activo = false;
            });
            state.visibleModalNuevoUser = false;
            state.visibleModalSegmentacionAreaNew = true;
        })
        .catch((error) => console.log(error));
    };

    const getUserSelected = (idusuario) => {
      debugger;
      state.userSelected = state.usuarios.find((c) => c.id === idusuario);
      state.visibleModalUser = true;
      //state.perfilIdSelectedEdit = state.userSelected.perfil;

      state.usuarioEvaluacions=[];
      state.empresaSelected =  state.empresas;

       cargarEvaluacion();
    };

    const cargarEvaluacion =  () => {
        state.evaluacionEmpresas = [];
        state.empresaSelected.evaluacionEmpresas.forEach(element => {
            element.evaluacion.empresaId=element.empresaId
            state.evaluacionEmpresas.push(element.evaluacion);
        });
        state.evaluacionEmpresas.forEach(element => {
          var evaluacion = state.userSelected.usuarioEvaluacions.find((y) => y.evaluacionId == element.id);
          element.activo = false;
          if (evaluacion != undefined) element.activo = evaluacion.activo;
            
        });
    };

    const ModalUserNuevo = () => {
      state.visibleModalNuevoUser = true;
      resetUser();
      state.evaluacionEmpresas = [];
      state.evaluacionEmpresas = state.empresas.evaluacionEmpresas;
    };

    const resetUser = () => {
      state.userSelected = {
        id: "",
        perfilId: "",
        empresaId: "",
        telefono: "",
        email: "",
        password: "",
        nombres: "",
        fechaUltimoAcceso: null,
        fechaCreacion: null,
        activo: true,
        empresa: [],

        perfil: [],
        usuarioEmpresas: [],
        usuarioEvaluacions: [
          {
            
            activo: true,
            empresaId: "",
            evaluacion: null,
            evaluacionId: "",
            fechaCreacion: null,
            id: "",
            usuarioAreas: [],
            usuarioId: "",
          }
        ]
      };
      state.clave = "";
      state.passwordFieldType = "password";
    }

    const resetAsociarArea = () => {
      let boxes = document.getElementsByName("check");
      for (let x = 0; x < boxes.length; x++) {
        let obj = boxes[x];
        if (obj.type == "checkbox") {
            obj.checked = false;
        }
      }
    };

    const crearUser = () => {
      debugger;
      /*let nombre = document.getElementById("nombreNew").value;
      let pass = document.getElementById("passwordNew").value;
      let email = document.getElementById("emailNew").value;
      let activo = document.getElementById("activoNew").checked; 
      let idempresa = JSON.parse(localStorage.usuarioModel).empresaId;*/
      
      let asociar = document.getElementsByName("chkAsociarNew");
      let asociarId = [];
      for (let x = 0; x < asociar.length; x++) {
        let obj = asociar[x];
        if (obj.checked) {
          asociarId.push(obj.id);
        }
      }

      if (!state.userSelected.nombres) {
          swal.fire("Registro usuario", "Debe ingresar nombre", "warning");
          return false;
      }
      if (!state.userSelected.password) {
          swal.fire("Registro usuario", "Debe ingresar contraseña", "warning");
          return false;
      }
      if (!state.userSelected.email || !validateEmail(state.userSelected.email)) {
          swal.fire("Registro usuario", "Debe ingresar un email", "warning");
          return false;
      }
      
      //state.userSelected.perfil = state.perfiles;
      //state.userSelected.perfilId = state.perfiles.id;
      state.userSelected.empresa = state.empresas;
      state.userSelected.empresaId = state.empresas.id;
      InsertOrUpdateUser(asociarId);
    };

    const InsertOrUpdateUser = (asociarId) => {
      ApiNeva.post(
        "Usuario/InsertOrUpdateUser?asociarIds=" + asociarId,
        state.userSelected,
        { headers: header }
      ).then((response) => {
        if (response.status != 200) return false;
        swal.fire(
          "Registro usuario",
          "Se agregó usuario",
          "success"
        );
        state.visibleModalNuevoUser = false;
        getProfile();
        return;
      });
    };

    const modificarUser = () => {
      debugger;
      //COMENTAR LOS DOCUMENT YA QUE SE ESTA VIENDO POR V-MODEL
      let idusuario = state.userSelected.id.toString();
      let nombre = document.getElementById("nombre").value;
      let pass = document.getElementById("password").value;
      let email = document.getElementById("email").value;
      let activo = document.getElementById("activo").checked;
      let asociar = document.getElementsByName("chkAsociar");
      let idempresa = JSON.parse(localStorage.usuarioModel).empresaId;
      let asociarId = [];
      for (let x = 0; x < asociar.length; x++) {
        let obj = asociar[x];
        if (obj.checked) {
          asociarId.push(obj.id);
        }
      }

      if (!state.userSelected.nombres) {
          swal.fire("Registro usuario", "Debe ingresar nombre", "warning");
          return false;
      }
      if (!state.userSelected.password) {
          swal.fire("Registro usuario", "Debe ingresar contraseña", "warning");
          return false;
      }
      if (!state.userSelected.email || !validateEmail(state.userSelected.email)) {
          swal.fire("Registro usuario", "Debe ingresar un email", "warning");
          return false;
      }

      if (state.userSelected.id == localStorage.iduser) {
        swal.fire({
          title: "Modificar Usuario",
          text: "¿Está seguro de modificar el estado del usuario en cesión?",
          icon: "warning",
          buttons: true,
          showDenyButton: true,
          confirmButtonText: 'Si',
          denyButtonText: 'No',
          customClass: {
            actions: 'my-actions',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          }
        }).then((resp) => {
          if (!resp.isConfirmed) return;
          Modificar(idusuario, idempresa, nombre, email, pass, activo, asociarId);
        });
        return;
      }
      Modificar(idusuario, idempresa, nombre, email, pass, activo, asociarId);
    };

    const Crear = (idempresa, nombre, email, pass, activo, asociarId) => {
      ApiNeva.post(
        "Usuario/InsertUser?&idempresa=" + idempresa + "&nombres="+ nombre +"&email=" + email +"&pass=" + pass + "&activo=" + activo + "&asociarIds=" + asociarId,
        null,
        { headers: header }
      ).then((response) => {
        if (response.status != 200) return false;
        swal.fire(
          "Registro usuario",
          "Se agregó usuario",
          "success"
        );
        state.visibleModalNuevoUser = false;
        getProfile();
        return;
      });
    };

     const Modificar = (idusuario, idempresa, nombre, email, pass, activo, asociarId) => {
      ApiNeva.post(
        "Usuario/UpdateUser?&idusuario=" + idusuario+ "&idempresa=" + idempresa + "&nombres=" + nombre + "&email=" + email + "&pass=" + pass + "&activo=" + activo + "&asociarIds=" + asociarId,
        null,
        { headers: header }
      ).then((response) => {
        if (response.status != 200) return false;
        swal.fire(
          "Registro usuario",
          "Se actualizó usuario",
          "success"
        );
        state.visibleModalUser = false;
        getProfile();
        return;
      });
    };

    const getUserDelete = (idusuario) => {

      let mensaje = "¿Está seguro de eliminar el usuario?";
      if (idusuario == localStorage.iduser) {
        mensaje = "¿Está seguro de eliminar el usuario en cesión?";
      }
      swal.fire({
        title: "Eliminar Usuario",
        text: mensaje,
        icon: "warning",
        buttons: true,
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((resp) => {
        if (!resp.isConfirmed) return;
        Eliminar(idusuario);
      });
    };

    const Eliminar = (idusuario) => {
      ApiNeva.get(
        "Usuario/DeleteUser?&idusuario=" + idusuario ,
        null,
        { headers: header }
      ).then((response) => {
        if (response.status != 200) return false;
        swal.fire(
          "Registro usuario",
          "Se elimino usuario correctamente",
          "success"
        );
        getProfile();
        return;
      });
    };

    const asociarArea = () => {
    };

    const setTextGuardarOrSolicitar = (text) => {
      document.getElementById("btnGuardarOrSolicitar").innerText = "";
      document.getElementById("btnGuardarOrSolicitar").innerText = text;
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
      getUserDelete,
      ModalUserNuevo,
      resetUser,
      InsertOrUpdateUser,
      guardarOrSolicitar,
      crearUser,
      asociarArea,
      modificarUser,
      setTextGuardarOrSolicitar,
      resetAsociarArea,
      showSpining,
      switchVisibility,
      switchVisibilityNew,
      segmentacionArea,
      segmentacionAreaNew,
    };
  },
};
</script>

<style></style>
