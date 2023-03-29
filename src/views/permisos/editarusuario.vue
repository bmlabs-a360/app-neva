<template>
<div class="col-12 d-flex mt-3 mt-sm-0 mt-lg-5 flex-sm-row justify-content-between align-items-center">
    <div class="">
        <div class="titlealluser mb-4">
            <h2 class="">Editar Usuarios</h2>
        </div>
    </div>
</div>
<div class="col-12">
    <div class="card p-3 d-flex">
        <h5 class="pl-lg-3 subtitlecreateuser">Datos de usuario</h5>
        <div class="formusers">
            <div>
                <label for="basic-url" class="form-label">Nombre</label>
                <input v-model="userSelected.nombres" disabled type="text" class="form-control" id="nombres" aria-describedby="basic-addon3">
            </div>
            <div>
                <label for="basic-url" class="form-label">Contraseña</label>
                <input v-model="clave" type="password" class="form-control" id="pass" aria-describedby="basic-addon3">
            </div>
            <div>
                <label for="basic-url" class="form-label">Correo</label>
                <input v-model="userSelected.email" disabled type="email" class="form-control" id="bmail" aria-describedby="basic-addon3">
            </div>
            <div>
                <label for="basic-url" class="form-label">Telefono</label>
                <input v-model="userSelected.telefono" type="text" class="form-control" id="telefono" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-12 mt-4">
        <div class="card p-3 d-flex">
            <div class="formcreateuser">
                <div class="mb-2 mb-md-2 mb-lg-0">
                    <select class="form-select" aria-label="Default select example"  v-model="userSelected.activo" :disabled="disabledActivo">
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                    </select>
                </div>
                <div class="botonesformuser  mt-2 mt-md-2 mt-lg-0"> 
                    <button class="btn orange order-md-1 me-lg-4 mt-lg-0" @click="ir('Usuarios')">Cancelar</button>
                </div>
                <div class="mt-2 mt-md-2 mt-lg-0"> 
                    <button class="btn bluelight order-md-1 me-lg-4 mt-lg-0" @click="modificarUser()">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import { validateEmail, Fn, checkAll } from "@/Helper/util";
import router from "@/router/index";
import { useRoute } from "vue-router";

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
      userOnline:null,
      usuarioId: "",
      clave: "",
      usuario: [],
      userSelected: [],
      disabledActivo: false,
    });

    const route = useRoute();
    state.usuarioId = route.query.usuarioId;
  
    const getUser = async () => {  
        state.disabledActivo = false;
        state.userSelected = [];
        ApiNeva.get("Usuario/GetUsuarioByIdUsuario?usuarioId=" + state.usuarioId, {
            headers: header,
        })
        .then((response) => {
          if (response.status != 200) return false;
          state.userSelected = response.data;
          if (JSON.parse(localStorage.usuarioModel).email == state.userSelected.email){
            state.disabledActivo = true;
          }
        })
        .catch((error) => console.log(error));
    };

    const modificarUser = () => {
        if (state.userSelected.nombres == "") {
            swal.fire("Registro usuario", "Debe ingresar nombre", "warning");
            return false;
        }
        if (state.clave != "") {
            if (state.clave.length < 8 || state.clave.length > 50) {
                swal.fire("Registro usuario", "Contraseña debe tener un mínimo de 8 y máximo 50 caracteres", "warning");
                return false;
            }
        }

        if (state.userSelected.email == "" || !validateEmail(state.userSelected.email)) {
            swal.fire("Registro usuario", "Debe ingresar un email", "warning");
            return false;
        }

        let activo = (document.getElementById("estado").value == 'true') ? true : false;
        let usuarioEdit = null;
        if (state.clave != "") {
            usuarioEdit = {
                "id": state.userSelected.id,
                "perfilId": state.userSelected.perfilId,
                "empresaId": state.userSelected.empresaId,
                "email": state.userSelected.email,
                "telefono": state.userSelected.telefono,
                "password": state.clave,
                "nombres": state.userSelected.nombres,
                "activo": activo
            };
        }
        else {
            usuarioEdit = {
                "id": state.userSelected.id,
                "perfilId": state.userSelected.perfilId,
                "empresaId": state.userSelected.empresaId,
                "email": state.userSelected.email,
                "telefono": state.userSelected.telefono,
                //"password": state.userSelected.password,
                "nombres": state.userSelected.nombres,
                "activo": activo
            };
        }

        ApiNeva.post("Usuario/UpdateUser", usuarioEdit,
            { headers: header }
        )
        .then((response) => {
            if (response.status != 200) return false;
            var usuario = response.data;
            swal.fire(
                "Editar usuario",
                "Se modifico el usuario",
                "success"
            ).then( () => {
                ir('Usuarios');
            })
            return false;
        })
        .catch((error) => {
            if (error.response.data.detail == undefined){
                swal.fire(
                    "Editar usuario",
                    error.response.data,
                    "warning"
                );
            }
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
    const ir = (namePageDestiny) => {
        return router.push({ name: namePageDestiny});
    };
    
    onMounted(() => {
        state.userOnline = JSON.parse(localStorage.usuarioModel);
        getUser();
    });

    return {
        ...toRefs(state),
        ir,
        modificarUser,
    };
  },
};
</script>

<style></style>
