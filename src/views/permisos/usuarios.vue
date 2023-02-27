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
                    <CButton  @click="visibleModalNuevoUser = true; evaluaciones.forEach(element => {element.asociar = false;});">
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
                    @click="getUserDelete(user)"><CIcon :icon="cilTrash" size="lg" />
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

  <!-- MODAL CREAR -->
  <CModal
    backdrop="static"
    size="xl"
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
        <CModalTitle>Crear usuario</CModalTitle>&nbsp;&nbsp;
    </CModalHeader>
    <CModalBody>
      <CContainer>
        <CRow>
          <div style="display: flex">
            <CFormLabel >Baja/Alta </CFormLabel>
            <div>
              <!--<CFormSwitch
                style="cursor: pointer"
                id="activoNew"
                :checked="true"
                v-model="activoUserNew"
              />-->
              <CFormSwitch
                style="cursor: pointer"
                id="activoNew"
                :checked="true"
                v-model="usuarioNuevo.activo"
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
                <!--<CFormInput
                  type="text"
                  id="nombreNew"
                  placeholder="Nombre"
                  size="sm"
                  maxlength="255"
                  v-model="nombreUserNew"
                />-->
                <CFormInput
                  type="text"
                  id="nombreNew"
                  placeholder="Nombre"
                  size="sm"
                  maxlength="255"
                  v-model="usuarioNuevo.nombres"
                />
              </CInputGroup>
            </div>

            <div class="mb-3">
              <CFormLabel for="passnew">Contraseña*</CFormLabel>
              <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <div v-if="passwordFieldType != 'password'">
                      <i @click="switchVisibility('passwordNew')">
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
                      <i @click="switchVisibility('passwordNew')">
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
                  <!--<CFormInput
                    id="passwordNew"
                    :type="passwordFieldType"
                    size="sm"
                    maxlength="255"
                    v-model="passUserNew"
                    placeholder="Contraseña"
                  ></CFormInput>-->
                  <CFormInput
                    id="passwordNew"
                    :type="passwordFieldType"
                    size="sm"
                    maxlength="255"
                    v-model="usuarioNuevo.password"
                    placeholder="Contraseña"
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
                <!--<CFormInput
                  type="text"
                  id="emailNew"
                  maxlength="255"
                  size="sm"
                  placeholder="Correo"
                  v-model="emailUserNew"
                />-->
                <CFormInput
                  type="text"
                  id="emailNew"
                  maxlength="255"
                  size="sm"
                  placeholder="Correo"
                  v-model="usuarioNuevo.email"
                />
              </CInputGroup>
            </div>

            <div class="mb-3">
              <CFormLabel for="email">Telefono</CFormLabel>
              <CInputGroup class="mb-3">
                <CInputGroupText>
                  <CIcon icon="cil-mail" />
                </CInputGroupText>
                <!--<CFormInput
                  type="text"
                  id="telefonoNew"
                  maxlength="255"
                  size="sm"
                  placeholder="telefono"
                  v-model="telefonoUserNew"
                />-->
                <CFormInput
                  type="text"
                  id="telefonoNew"
                  maxlength="255"
                  size="sm"
                  placeholder="telefono"
                  v-model="usuarioNuevo.telefono"
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
                  {{evaluacion.nombre}}
                </CTableDataCell>
                <CTableDataCell class="text-center">
                  <CFormCheck name="chkAsociarNew" :value="evaluacion.id" v-model="evaluacion.asociar" />
                </CTableDataCell>
                <CTableDataCell class="text-center" id="acciones_usuarionew">
                  <CButton :disabled="!evaluacion.asociar" @click="getSegmentacionAreaNew(evaluacion)">
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
            resetNewUser();
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
    size="xl"
    alignment="center"
    :visible="visibleModalSegmentacionAreaNew"
    @close="
      () => {
        //resetAsociarArea();
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
                  v-model="evaluacion.nombre"
                />
            </div>
          </div>
          <CCol sm="12">
            <div class="mb-2">
              <CFormLabel>Asociar área*</CFormLabel>
            </div>
            <div class="mb-2" >
                <CFormLabel style="display:flex"> 
                  <CFormSwitch style="cursor: pointer" id="todoschkAreaNew" @click="checkAll('checkAreaNewUser', 'todoschkAreaNew');seleccionarSegmentacionAreaNew()" /> Todos
                </CFormLabel>
              <div v-for="area in segmentacionAreas" :key="area.id">
                <CFormLabel for="area">{{area.nombreArea}}</CFormLabel>
                <CFormSwitch style="cursor: pointer"
                            name="checkAreaNewUser"
                            :id="area.id"
                            v-model="area.activoSegmentacionAreas"
                            :checked="area.activoSegmentacionAreas"/>
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
            //resetAsociarArea();
            visibleModalSegmentacionAreaNew = false;
            visibleModalNuevoUser = true;
          }
        "
      >
        Cerrar
      </CButton>
      <!--<CButton color="primary" @click="asociarArea()">Guardar</CButton>-->
      <CButton color="primary" @click="visibleModalSegmentacionAreaNew = false; visibleModalNuevoUser = true;">Listo</CButton>
    </CModalFooter>
  </CModal>
  <!-- FIN MODAL SEGMENTACION AREA CREAR-->

  <!-- MODAL EDITAR USUARIO-->
  <CModal
    backdrop="static"
    size="xl"
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
              <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <div v-if="passwordFieldType != 'password'">
                      <i @click="switchVisibility('password')">
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
                      <i @click="switchVisibility('password')">
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
                    placeholder="Contraseña"
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
            <div class="mb-3">
              <CFormLabel for="email">Telefono</CFormLabel>
              <CInputGroup class="mb-3">
                <CInputGroupText>
                  <CIcon icon="cil-mail" />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  id="telefonoNew"
                  maxlength="255"
                  size="sm"
                  placeholder="telefono"
                  v-model="userSelected.telefono"
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
                  {{evaluacion.nombre}}
                </CTableDataCell>
                <CTableDataCell class="text-center">
                   <CFormCheck name="chkAsociar" :checked="evaluacion.asociar"  v-model="evaluacion.asociar" />
                </CTableDataCell>
                <CTableDataCell class="text-center" id="acciones_usuario">
                  <CButton :disabled="!evaluacion.asociar" @click="getSegmentacionArea(evaluacion)">
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
  <!-- FIN MODAL EDITAR -->

  <!-- MODAL SEGMENTACION AREA EDITAR  -->
  <CModal
    backdrop="static"
    size="xl"
    alignment="center"
    :visible="visibleModalSegmentacionArea"
    @close="
      () => {
        //resetAsociarArea();
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
                  :v-model="evaluacion.nombre"
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
                    <CFormSwitch style="cursor: pointer" id="todoschkArea" @click="checkAll('checkArea', 'todoschkArea'); seleccionarSegmentacionArea()" /> Todos
                  </CFormLabel>
                <div v-for="area in segmentacionAreas" :key="area.id">
                  <CFormLabel for="area">{{area.nombreArea}}</CFormLabel>
                  <CFormSwitch style="cursor: pointer"
                                v-model="area.activo"
                                :checked="area.activo" 
                                name="checkArea"/>
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
            //resetAsociarArea();
            visibleModalSegmentacionArea = false;
            visibleModalUser = true;
          }
        "
      >
        Cerrar
      </CButton>
      <!--<CButton color="primary" @click="asociarArea()">Guardar</CButton>-->
      <CButton color="primary" @click="visibleModalSegmentacionArea = false; visibleModalUser = true;">Listo</CButton>
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

export default {
  name: "Usuario",
  methods: {
    validateEmail,
    Fn,
    checkAll,
  },
  components: {
  },
  setup() {
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const header = {
      Authorization: "Bearer " + localStorage.token,
      ApiKey,
    };
    const headerRecaptcha = {
      ApiKey,
    };

    const state = reactive({
      usuarioNuevo: [],
      passwordFieldType: "password",
      clave: "",
      usuarios: [],
      evaluaciones: [],
      userSelected: [],
      segmentacionAreas: [],
      evaluacion: [],
      visibleModalUser: false,
      visibleModalSegmentacionArea: false,
      visibleModalSegmentacionAreaNew: false,
      visibleModalNuevoUser: false,
      usuarioAreas: [],
      usuarioEvaluacion: [],
    });


    const switchVisibility = (tipo) => {
      state.passwordFieldType = state.passwordFieldType === "password" ? "text" : "password";
      state.clave = document.getElementById(tipo).value;
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
          console.log("state.usuarios", state.usuarios);
          getEvaluaciones();
        })
        .catch((error) => console.log(error));
    };

    const getEvaluaciones = async () => {
      state.evaluaciones = [];
      let empresaId = JSON.parse(localStorage.usuarioModel).empresaId;
      ApiNeva.get("Evaluacion/GetEvaluacionsByEmpresaId?empresaId=" + empresaId, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          response.data.forEach(element => {
            element.asociar = false;
          });
          state.evaluaciones = response.data;
          console.log("state.evaluaciones", state.evaluaciones);
        })
        .catch((error) => console.log(error));
    };

    const getSegmentacionAreaNew = (evaluacionEmpresa) => {
      state.evaluacion = evaluacionEmpresa;
      ApiNeva.post("SegmentacionArea/GetSegmentacionAreasByEvaluacionId", state.evaluacion, { headers: header, })
        .then((response) => {
          if (response.status != 200) return false;
          state.segmentacionAreas = response.data;
          state.segmentacionAreas.forEach(x => {
            x.activoSegmentacionAreas = false;
          });
          state.evaluaciones.forEach(element => {
              if (element.id == evaluacionEmpresa.id) {
                  element.segmentacionAreas = [];
                  element.segmentacionAreas = state.segmentacionAreas
              }
          });
          console.log("state.evaluaciones", state.evaluaciones);
          state.visibleModalNuevoUser = false;
          state.visibleModalSegmentacionAreaNew = true;
        })
        .catch((error) => console.log(error));
    };

    const crearUser = () => {
      state.usuarioNuevo.empresaId = JSON.parse(localStorage.usuarioModel).empresaId;
      state.usuarioNuevo.empresa =  JSON.parse(localStorage.usuarioModel).empresa;

      if (!state.usuarioNuevo.nombres) {
          swal.fire("Registro usuario", "Debe ingresar nombre", "warning");
          return false;
      }
      if (!state.usuarioNuevo.password) {
          swal.fire("Registro usuario", "Debe ingresar contraseña", "warning");
          return false;
      }
      
      if (state.usuarioNuevo.password.length < 8 || state.usuarioNuevo.password.length > 50 ){
        swal.fire("Registro usuario", "Contraseña debe tener un mínimo de 8 y máximo 50 caracteres", "warning");
        return false;
      }
      if (!state.usuarioNuevo.email || !validateEmail(state.usuarioNuevo.email)) {
          swal.fire("Registro usuario", "Debe ingresar un email", "warning");
          return false;
      }
      if (!state.usuarioNuevo.activo) state.usuarioNuevo.activo = true;

      state.usuarioNuevo.usuarioEvaluacions = [];
      state.evaluaciones.forEach(evaluacion => {
        var usuarioAreas = [];
        let activoSegmentacionAreas = false;
        evaluacion.segmentacionAreas.forEach(segmentacionArea => {
          activoSegmentacionAreas = (segmentacionArea.activoSegmentacionAreas) ? segmentacionArea.activoSegmentacionAreas : false;
          var usuarioArea =
          {
              "segmentacionAreaId": segmentacionArea.id,
              "activo": activoSegmentacionAreas
          }
          usuarioAreas.push(usuarioArea);
        });
        var usuarioEvaluacion =
        {
            "empresaId": state.usuarioNuevo.empresaId,
            "evaluacionId": evaluacion.id,
            "activo": evaluacion.asociar,
            "usuarioAreas": usuarioAreas
        };
        state.usuarioNuevo.usuarioEvaluacions.push(usuarioEvaluacion);
      });
      let usuarioInsert = {
          "perfilId": '00000000-0000-0000-0000-000000000000',
          "empresaId": state.usuarioNuevo.empresaId,
          "email": state.usuarioNuevo.email,
          "password": state.usuarioNuevo.password,
          "nombres": state.usuarioNuevo.nombres,
          "telefono": state.usuarioNuevo.telefono,
          "activo": state.usuarioNuevo.activo,
          "usuarioEmpresas": [
            {
              "empresaId": state.usuarioNuevo.empresaId,
              "activo": true
            }
          ],
          "usuarioEvaluacions": state.usuarioNuevo.usuarioEvaluacions
      };
      console.log("usuarioInsert", usuarioInsert);
      
      ApiNeva.post("Usuario/InsertUser", usuarioInsert,
        { headers: header }
      )
      .then((response) => {
        if (response.status != 200) return false;
        var usuario = response.data;
        console.log("usuario", usuario);
        getUsers();
        swal.fire(
            "Guardar usuario",
            "Se guardo el usuario",
            "success"
        );
        resetNewUser();
        state.visibleModalNuevoUser = false;
      }).catch((error) => {
        if (error.response.data.detail.includes("llave duplicada") || error.response.data.detail.includes("duplicate key") || error.response.data.detail.includes("pk_empresa_id")) {
          swal.fire(
              "Guardar usuario",
              "Por favor, verifique los datos ingresados son válidos. Mas detalle: " + error.response.data.detail,
              "warning"
          );
        } else {
          swal.fire(
            "Guardar usuario",
            "Por favor, verifique los datos ingresados son válidos. Mas detalle: " + error.response.data.detail,
            "warning"
          );
          return;
        }
      });
    };

    const resetNewUser = () => {
      state.passwordFieldType = "password";
      state.segmentacionAreas = [];
      state.usuarioNuevo = [];
      state.evaluaciones.forEach(element => {
        element.asociar = false;
      });
    };

    const getUserSelected = (idusuario) => {
      state.userSelected = state.usuarios.find((c) => c.id === idusuario);
      console.log("state.userSelected", state.userSelected);
      state.visibleModalUser = true;
      getUsuarioEvaluacionByEvaluacionEmpresa();
    };

    const getUsuarioEvaluacionByEvaluacionEmpresa = () => {
      state.evaluaciones.forEach(element => {
        var evaluacion = state.userSelected.usuarioEvaluacions.find((y) => y.evaluacionId == element.id);
        element.asociar = false;
        if (evaluacion != undefined) element.asociar = evaluacion.activo;
      });
      console.log("state.evaluaciones", state.evaluaciones);
    };

    const getSegmentacionArea = (evaluacionEmpresa) =>{
      state.evaluacion = evaluacionEmpresa;
        ApiNeva.post("SegmentacionArea/GetSegmentacionAreasByEvaluacionId", evaluacionEmpresa, { headers: header, })
          .then((response) => {
              if (response.status != 200) return false;
              state.usuarioAreas = [];
              evaluacionEmpresa.segmentacionAreas = [];
              state.userSelected.usuarioEvaluacions.forEach(y => {
                if (y.evaluacionId == state.evaluacion.id && y.empresaId == JSON.parse(localStorage.usuarioModel).empresaId) {
                  state.usuarioAreas = y.usuarioAreas
                }
              });
              state.segmentacionAreas = response.data;
              state.segmentacionAreas.forEach(x => {
                var areaAsuario = state.usuarioAreas.find((y) => y.segmentacionAreaId == x.id);
                x.activo = false;
                if (areaAsuario != undefined) {
                  x.idusuarioArea = areaAsuario.id;
                  x.activo = areaAsuario.activo;
                } 
              });
              evaluacionEmpresa.segmentacionAreas = state.segmentacionAreas;
              console.log("state.segmentacionAreas", state.segmentacionAreas);
              state.visibleModalUser = false;
              state.visibleModalSegmentacionArea = true;
          })
          .catch((error) => console.log(error));
    };

    const modificarUser = () => {

      if (state.userSelected.nombres == "") {
        swal.fire("Registro usuario", "Debe ingresar nombre", "warning");
        return false;
      }
      if (state.clave == "") {
        swal.fire("Registro usuario", "Debe ingresar contraseña", "warning");
        return false;
      }
      if (state.clave.length < 8 || state.clave.length > 50 ){
        swal.fire("Registro usuario", "Contraseña debe tener un mínimo de 8 y máximo 50 caracteres", "warning");
        return false;
      }
      if (state.userSelected.email == "" || !validateEmail(state.userSelected.email)) {
        swal.fire("Registro usuario", "Debe ingresar un email", "warning");
        return false;
      }

      state.usuarioEvaluacion = state.userSelected.usuarioEvaluacions;
      state.userSelected.usuarioEvaluacions = [];
      var usuarioArea = {};
      console.log("evaluaciones 1111", state.evaluaciones);
      state.evaluaciones.forEach(evaluacion => {
        var usuarioAreas = [];
        var UsuarioEvaluacionSelected = state.usuarioEvaluacion.find((y) => y.evaluacionId == evaluacion.id);
        evaluacion.segmentacionAreas.forEach(segmentacionArea => {
          //if (segmentacionArea.idusuarioArea){
            if (UsuarioEvaluacionSelected){
              usuarioArea =
              {
                  "id": segmentacionArea.idusuarioArea,
                  "usuarioEvaluacionId": UsuarioEvaluacionSelected.id, 
                  "segmentacionAreaId": segmentacionArea.id,
                  "activo": segmentacionArea.activo
              }
              usuarioAreas.push(usuarioArea);
            }else{
                usuarioArea =
                {
                    "segmentacionAreaId": segmentacionArea.id,
                    "activo": segmentacionArea.activo
                }
                usuarioAreas.push(usuarioArea);
            }
          //}
        });
        if (UsuarioEvaluacionSelected){
          var usuarioEvaluacion =
          {
              "id" : UsuarioEvaluacionSelected.id,
              "usuarioId": state.userSelected.id,
              "empresaId": state.userSelected.empresaId,
              "evaluacionId": evaluacion.id,
              "activo": evaluacion.asociar,
              "usuarioAreas": usuarioAreas
          };
          state.userSelected.usuarioEvaluacions.push(usuarioEvaluacion);
        }else{
          var usuarioEvaluacion =
          {
              "usuarioId": state.userSelected.id,
              "empresaId": state.userSelected.empresaId,
              "evaluacionId": evaluacion.id,
              "activo": evaluacion.asociar,
              "usuarioAreas": usuarioAreas
          };
          state.userSelected.usuarioEvaluacions.push(usuarioEvaluacion);
        }
      });
      console.log("state.userSelected.usuarioEvaluacions", state.userSelected.usuarioEvaluacions);
      let usuarioEdit = {
          "id": state.userSelected.id,
          "perfilId": state.userSelected.perfilId,
          "empresaId": state.userSelected.empresaId,
          "email": state.userSelected.email,
          "telefono": state.userSelected.telefono,
          "password": state.userSelected.password,
          "nombres": state.userSelected.nombres,
          "activo": state.userSelected.activo,
          "usuarioEmpresas": [
            {
                "usuarioId": state.userSelected.id,
                "empresaId": state.userSelected.empresaId,
                "activo": true
            }
          ],
          "usuarioEvaluacions": state.userSelected.usuarioEvaluacions
      };
      console.log("usuarioEdit", usuarioEdit);
      ApiNeva.post("Usuario/UpdateUser", usuarioEdit,
        { headers: header }
      )
      .then((response) => {
          if (response.status != 200) return false;
          var usuario = response.data;
          console.log("Update", usuario)
          getUsers();
          swal.fire(
              "Editar usuario",
              "Se modifico el usuario",
              "success"
          );
          resetUser();
          state.visibleModalUser = false;
          return;
      })
      .catch((error) => {
        if (error.response.data.detail.includes("llave duplicada") || error.response.data.detail.includes("duplicate key") || error.response.data.detail.includes("pk_empresa_id")) {
          swal.fire(
              "Editar usuario",
              "Por favor, verifique los datos ingresados son válidos. Mas detalle: " + error.response.data.detail,
              "warning"
          );
          return;
        } else {
          swal.fire(
              "Guardar usuario",
              "Por favor, verifique los datos ingresados son válidos. Mas detalle: " + error.response.data.detail,
              "warning"
          );
          return;
        }
      });
    };

    const resetUser = () => {
      state.passwordFieldType = "password";
      state.clave = "";
      state.segmentacionAreas = [];
      state.evaluaciones.forEach(element => {
        element.asociar = false;
      });
    };

    const seleccionarSegmentacionArea = () => {
      if ( document.getElementById("todoschkArea").checked == true){
        state.segmentacionAreas.forEach(x => {
          x.activo = true;
        });
      }else{
        state.segmentacionAreas.forEach(x => {
          x.activo = false;
        });
      }
    };

    
    const seleccionarSegmentacionAreaNew = () => {
      if ( document.getElementById("todoschkAreaNew").checked == true){
        state.segmentacionAreas.forEach(x => {
          x.activoSegmentacionAreas = true;
        });
      }else{
        state.segmentacionAreas.forEach(x => {
          x.activoSegmentacionAreas = false;
        });
      }
    };

    

    const getUserDelete = (user) => {
      //console.log("user", user);
      swal.fire({
          title: '¿Está seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
      }).then((result) => {

        if (result.isConfirmed) {
          var usuarioId =
          {
              id: user.id,
          }
            ApiNeva.post("Usuario/DeleteCascade", usuarioId, { headers: header }
          )
          .then((response) => {
              if (response.status != 200) return false;

              console.log("response.data", response.data);
              swal.fire(
                  'Eliminar!',
                  'El usuario y todas sus dependencias fueron eliminadas.',
                  'success'
              )
              //recargar usuarios   
              getUsers();
              return;
            })
            .catch((error) => {
                console.log("error->", error.response.data.detail);
                if (
                    error.response.data.detail.includes("llave duplicada") ||
                    error.response.data.detail.includes("duplicate key")
                ) {
                    swal.fire(
                        "Eliminar usuarios",
                        "Existen datos relacionados imposible de eliminar. Mas detalle: " + error.response.data.detail,
                        "warning"
                    );
                } else
                    swal.fire(
                        "Eliminar usuario",
                        "Por favor, verifique los datos relacionados. Mas detalle: " + error.response.data.detail, 
                        "warning"
                    );
            });
          }

        })
      };
    
    onMounted(() => {
      getUsers();
    });

    return {
      cilPen,
      cilTrash,
      ...toRefs(state),
      switchVisibility,
      getUserSelected,
      resetUser,
      resetNewUser,
      getSegmentacionArea,
      getSegmentacionAreaNew,
      crearUser,
      modificarUser,
      getUserDelete,
      seleccionarSegmentacionArea,
      seleccionarSegmentacionAreaNew,
    };
  },
};
</script>

<style></style>
