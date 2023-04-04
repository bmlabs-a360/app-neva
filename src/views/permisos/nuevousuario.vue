<template>
<div class="col-12 d-flex mt-3 mt-sm-0 mt-lg-5 flex-sm-row justify-content-between align-items-center">
    <div class="">
        <div class="titlealluser mb-4">
            <h2 class="">Nuevos Usuarios</h2>
        </div>
    </div>
</div>
<div class="col-12">
    <div class="card p-3 d-flex">
        <h5 class="pl-lg-3 subtitlecreateuser">Datos de usuario</h5>
    
        <div class="formusers">
            <div>
                <label for="basic-url" class="form-label">Nombres</label>
                <input  v-model="usuarioNuevo.nombres" type="text" class="form-control" id="nombres" aria-describedby="basic-addon3">
            </div>
            <div>
                <label for="basic-url" class="form-label">Contraseña</label>
                <input v-model="usuarioNuevo.password" type="password" class="form-control" id="pass" aria-describedby="basic-addon3">
            </div>
            <div>
                <label for="basic-url" class="form-label">Correo</label>
                <input v-model="usuarioNuevo.email" type="email" class="form-control" id="mail" aria-describedby="basic-addon3">
            </div>
            <div>
                <label for="basic-url" class="form-label">Telefono</label>
                <input v-model="usuarioNuevo.telefono" @keypress="soloNumeros($event)" type="text" class="form-control" id="telefono" aria-describedby="basic-addon3" maxlength="11">
            </div>
        </div>
    </div>
</div>
<div class="col-12 mt-4">
    <div class="card p-3 d-flex">
        <div class="formcreateuser">
            <div class="mb-2 mb-md-2 mb-lg-0">
                <select class="form-select" aria-label="Default select example" id="estado">
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                </select>
            </div>
            <div class="botonesformuser  mt-2 mt-md-2 mt-lg-0"> 
                <button class="btn orange order-md-1 me-lg-4 mt-lg-0" @click="ir('Usuarios')">Cancelar</button>
            </div>
            <div class="mt-2 mt-md-2 mt-lg-0"> 
                <button class="btn bluelight order-md-1 me-lg-4 mt-lg-0" @click="crearUser()">Guardar</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import { validateEmail, Fn, soloNumeros } from "@/Helper/util";
import router from "@/router/index";

export default {
  name: "Usuario",
  methods: {
    validateEmail,
    Fn,
    soloNumeros,
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
      clave: "",
    });

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
        if (state.usuarioNuevo.telefono != "" && !state.usuarioNuevo.telefono.match(/^[0-9]+$/)) {
          swal.fire("Registro usuario", "Debe ingresar teléfono válido", "warning");
          return false;
        }
      
        let activo = (document.getElementById("estado").value == 'true') ? true : false;
        let usuarioInsert = {
            "perfilId": '00000000-0000-0000-0000-000000000000',
            "empresaId": state.usuarioNuevo.empresaId,
            "email": state.usuarioNuevo.email,
            "password": state.usuarioNuevo.password,
            "nombres": state.usuarioNuevo.nombres,
            "telefono": state.usuarioNuevo.telefono,
            "activo": activo,
            "usuarioEmpresas": [
                {
                "empresaId": JSON.parse(localStorage.usuarioModel).empresaId,
                "activo": true
                }
            ],
            "usuarioEvaluacions": []
        };
        
        ApiNeva.post("Usuario/InsertUser", usuarioInsert,
            { headers: header }
        )
        .then((response) => {
            if (response.status != 200) return false;
            var usuario = response.data;
            swal.fire(
                "Guardar usuario",
                "Se guardo el usuario",
                "success"
            ).then( () => {
                ir('Usuarios');
            })

        }).catch((error) => {
            if (error.response.data.detail == undefined){
                swal.fire(
                    "Guardar usuario",
                    error.response.data,
                    "warning"
                );
            }
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

    const ir = (namePageDestiny) => {
        return router.push({ name: namePageDestiny});
    };

    onMounted(() => {
    });

    return {
      ...toRefs(state),
      ir,
      crearUser,
    };
  },
};
</script>

<style></style>
