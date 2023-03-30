<template>
<div class="col-12 d-flex mt-3 mt-sm-0 mt-lg-5 flex-sm-row justify-content-between align-items-center">
  <div class="">
    <div class="titlealluser">
        <h2>Usuarios</h2>
    </div>
  </div>
  <button class="btn btn-sm bluelight  order-md-1 me-lg-0 mt-lg-0 " @click="ir('NuevoUsuario', null)">Nuevo Usuario</button>
</div>
<!--Inicia Pills lista usuario-->
<div class="">
  <div class="card mt-3 mb-2 d-flex ">   
    <div class="table-responsive pie-table">
      <table class="table table-hover allclientes">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" colspan="2">Usuarios</th>
            <!--<th scope="col">Áreas</th>-->
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usuarios" :key="user.id">
            <th scope="row">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                </label>
              </div>
            </th>

            <td>
              <div class="grafica">
                <button class="btn circle-two-n2 order-md-2 ">
                    {{user.iniciales}}
                </button>
              </div>
            </td>

            <td>
              <div class="me-md-3">
                <h4 class="text-center text-md-start">{{user.nombres}}</h4>
            </div>
            </td>

            <!--<td>
              <div class="me-md-3">
                <h4 class="text-center text-md-start">{{user.area}}</h4>
              </div>
            </td>-->

            <td v-if="user.activo">
              <button class="btn bluelight order-md-1 me-lg-4 mt-lg-0" disabled>Activo</button>
            </td>
              <td v-else>
              <button class="btn disabled orange order-md-1 me-lg-4 mt-lg-0" aria-disabled="true">Inactivo</button>
            </td>

            <td>
              <div class="iconstableuser">
                <div>
                  <a @click="ir('AreaEvaluacion', user)">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_298_5504)">
                      <path d="M14.6826 7.23436V7.80936C14.6819 9.15713 14.2454 10.4685 13.4385 11.548C12.6315 12.6275 11.4972 13.4172 10.2047 13.7993C8.91226 14.1814 7.5309 14.1356 6.26666 13.6685C5.00242 13.2014 3.92303 12.3382 3.18947 11.2075C2.45591 10.0769 2.10749 8.7394 2.19617 7.39456C2.28484 6.04972 2.80587 4.76957 3.68154 3.74503C4.55721 2.7205 5.74061 2.00648 7.05524 1.70945C8.36986 1.41243 9.74528 1.54832 10.9764 2.09686" stroke="#283252" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14.6826 2.80933L8.43262 9.06558L6.55762 7.19058" stroke="#283252" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_298_5504">
                        <rect width="15" height="15" fill="white" transform="translate(0.932617 0.309326)"/>
                      </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
                <div>
                  <a @click="ir('EditarUsuario', user)" >
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" >
                      <path d="M12.9325 8.00933V14.1427C12.9325 14.3178 12.898 14.4911 12.831 14.6529C12.764 14.8147 12.6658 14.9617 12.542 15.0855C12.4182 15.2093 12.2712 15.3075 12.1094 15.3745C11.9477 15.4415 11.7743 15.476 11.5992 15.476H3.5992C3.24558 15.476 2.90644 15.3355 2.65639 15.0855C2.40634 14.8354 2.26587 14.4963 2.26587 14.1427V6.14266C2.26587 5.78904 2.40634 5.4499 2.65639 5.19985C2.90644 4.9498 3.24558 4.80933 3.5992 4.80933H9.18187" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15.0814 2.67066L15.082 2.67137C15.0927 2.68305 15.1002 2.69968 15.0991 2.7239C15.098 2.7494 15.0872 2.77574 15.0671 2.79589C15.0671 2.79596 15.067 2.79604 15.0669 2.79611L14.774 3.08755L14.6551 2.96883L14.9573 2.66811L14.9577 2.66768C14.9659 2.65951 14.9756 2.65309 14.9864 2.6488C14.9971 2.64451 15.0086 2.64245 15.0202 2.64273C15.0317 2.643 15.0431 2.64562 15.0537 2.65043C15.0642 2.65523 15.0736 2.66211 15.0814 2.67066ZM7.0426 10.568L13.4731 4.14944L13.592 4.26896L7.17326 10.6993L6.97629 10.7655L7.0426 10.568ZM7.14394 10.7287C7.14407 10.7286 7.14419 10.7284 7.14432 10.7283L7.14394 10.7287ZM7.01362 10.597C7.01357 10.597 7.01352 10.597 7.01348 10.5971L7.01362 10.597Z" stroke="#5A5A5A"/>
                    </svg>
                  </a>
                </div>
                <div>
                  <a data-bs-toggle="modal" data-bs-target="#exampleModal" @click="getUserDelete(user)" :disabled="deleteUserDisabled(user)">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" >
                      <path d="M2.93262 4.80937H14.9326M13.5993 4.80937V14.1427C13.5993 14.4963 13.4588 14.8355 13.2088 15.0855C12.9587 15.3356 12.6196 15.476 12.266 15.476H5.59928C5.24566 15.476 4.90652 15.3356 4.65647 15.0855C4.40643 14.8355 4.26595 14.4963 4.26595 14.1427V4.80937M6.26595 4.80937V3.47603C6.26595 3.12241 6.40643 2.78327 6.65648 2.53322C6.90652 2.28318 7.24566 2.1427 7.59928 2.1427H10.266C10.6196 2.1427 10.9587 2.28318 11.2088 2.53322C11.4588 2.78327 11.5993 3.12241 11.5993 3.47603V4.80937" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>  
    </div> 
  </div> 
  <!-- Paginacion-->
  <nav aria-label="..." class="d-flex justify-content-between align-items-center">
    <div class="d-flex">
    <p class="message">Mostrando <span>1</span> a <span>10</span> de 16 entradas</p>
    </div>
    <div class="d-flex">
      <ul class="pagination pagination-sm">
        <li class="page-item controls">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&lt;</span>
          </a>
        </li>
        <li class="page-item active" aria-current="page">
          <span class="page-link">1</span>
        </li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li> 
        
        <li class="page-item controls">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&gt;</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <!--Fin Paginacion-->
</div>
<!--Termina Pills lista usuario-->
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import router from "@/router/index";


export default {
  name: "Usuario",
  methods: {
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
      usuarios: [],
      userSelected: [],
    });

    const getUsers = async () => {
      state.usuarios = [];
      let empresaId = JSON.parse(localStorage.usuarioModel).empresaId;
      ApiNeva.get("Usuario/GetUsuarioByIdEmpresa?empresaId=" + empresaId, {
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          state.usuarios = response.data;
          state.usuarios.forEach((m) => {
            if (m.nombres.length < 2){
                 m.iniciales = m.nombres
            } else {
              m.iniciales = m.nombres.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g).join("").substring("0","2");
              if (m.iniciales.length < 2){
                  m.iniciales =  m.nombres.substring("0", "2");
              }
            }
            return;
          });
        })
        .catch((error) => console.log(error));
    };

    const getUserSelected = (idusuario) => {
    };

    const deleteUserDisabled = (user) => {
      var salida = false;
      if (state.userOnline.email == user.email)
          salida= true;
      return salida;
    };

    const getUserDelete = (user) => {
      swal.fire({
          title: '¿Seguro que quieres eliminar este usuario?',
          text: 'Luego de esta acción no puede ser reversado ni recuperar las respuestas realizadas.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#15ACC0',
          cancelButtonColor: '#ED9A37',
          confirmButtonText: 'Eliminar'
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
            swal.fire(
                'Eliminar!',
                'El usuario y todas sus dependencias fueron eliminadas.',
                'success'
            ) 
            getUsers();
            return;
          })
          .catch((error) => {
            if (error.response.data.detail.includes("llave duplicada") || error.response.data.detail.includes("duplicate key")) {
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
      state.userOnline = JSON.parse(localStorage.usuarioModel);
      getUsers();
    });

    const ir = (namePageDestiny, usuario) => {
      if (usuario){
        return router.push({ name: namePageDestiny , query : {usuarioId : usuario.id} });
      }else{
        return router.push({ name: namePageDestiny});
      }
    };

    return {
      ...toRefs(state),
      ir,
      getUserSelected,
      getUserDelete,
      deleteUserDisabled,
    };
  },
};
</script>

<style></style>
