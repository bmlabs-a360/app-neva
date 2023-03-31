<template>

<div class="col-12 d-flex mt-3 mt-sm-0 mt-lg-5 flex-sm-row justify-content-between align-items-center">
  <div class="">
    <div class="titlealluser">
      <h2>Asignación</h2>
      <h5>Asociar nuevas Áreas y evaluación</h5>
    </div>
  </div>
</div>
<!--Inicia Pills 1-->
<div class="">
  <div class="card mt-3 mb-2 d-flex ">   
    <div class="table-responsive pie-table">
      <table class="table table-hover allclientes">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Área</th>
            <th scope="col">Evaluación</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="area in segmentacionAreas" :key="area.id" style="cursor:pointer" @click="seleccionarArea(area.id)">
            <th scope="row" >
              <div class="form-check">
                <input class="form-check-input" type="checkbox" name="segmentacionArea" :value="area.evaluacionId" :id="area.id" :v-model="area.estadoActivo" disabled :checked="area.estadoActivo">
                <label class="form-check-label" for="flexCheckDefault">
                </label>
              </div>
            </th>
            <td>
              <div class="me-md-3">
                <h4 class="text-center text-md-start">{{area.nombreArea}}</h4>
            </div>
            </td>
            <td>
              <div class="me-md-3">
                <h4 class="text-center text-md-start">{{area.nombreEvaluacion}}</h4>
            </div>
            </td>
            <td v-if="area.estado == 0">
              <div class="d-flex align-items-center data-icon justify-content-center justify-content-md-between flex-wrap">
                <div class="d-flex align-items-center color-warning ">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_258_1364)">
                    <path d="M11.0674 5.97389V6.43389C11.0668 7.5121 10.7176 8.56123 10.0721 9.4248C9.42647 10.2884 8.51903 10.9201 7.48506 11.2258C6.4511 11.5316 5.34601 11.4948 4.33462 11.1212C3.32322 10.7475 2.45971 10.0569 1.87286 9.15243C1.28602 8.24791 1.00728 7.17792 1.07822 6.10205C1.14916 5.02617 1.56599 4.00206 2.26652 3.18243C2.96706 2.3628 3.91378 1.79158 4.96548 1.55397C6.01718 1.31635 7.11752 1.42506 8.10239 1.86389" stroke="#15ACC0" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.0674 2.43384L6.06738 7.43884L4.56738 5.93884" stroke="#15ACC0" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_258_1364">
                    <rect width="12" height="12" fill="#15ACC0" transform="translate(0.0673828 0.433838)"/>
                    </clipPath>
                    </defs>
                    </svg>
                  <p class="responsible-table">Sin Iniciar</p>
              </div>
              </div>
            </td>
            <td v-else>
              <div class="d-flex align-items-center data-icon justify-content-center justify-content-md-between flex-wrap">
                <div class="d-flex align-items-center ">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_258_1364)">
                      <path d="M11.0674 5.97389V6.43389C11.0668 7.5121 10.7176 8.56123 10.0721 9.4248C9.42647 10.2884 8.51903 10.9201 7.48506 11.2258C6.4511 11.5316 5.34601 11.4948 4.33462 11.1212C3.32322 10.7475 2.45971 10.0569 1.87286 9.15243C1.28602 8.24791 1.00728 7.17792 1.07822 6.10205C1.14916 5.02617 1.56599 4.00206 2.26652 3.18243C2.96706 2.3628 3.91378 1.79158 4.96548 1.55397C6.01718 1.31635 7.11752 1.42506 8.10239 1.86389" stroke="#15ACC0" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.0674 2.43384L6.06738 7.43884L4.56738 5.93884" stroke="#15ACC0" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_258_1364">
                        <rect width="12" height="12" fill="#15ACC0" transform="translate(0.0673828 0.433838)"/>
                      </clipPath>
                    </defs>
                    </svg>
                    <p class="responsible-table">{{parseFloat(area.estado).toFixed(0)}}% Completado</p>
                </div>
            </div>
            </td>
          </tr>
        </tbody>
      </table>  
    </div> 
  </div> 
  <div class="col-12 mt-4">
    <div class="card p-3 d-flex">
      <div class="botoncardform">
        <div class="botonesformuser  mt-2 mt-md-2 mt-lg-0"> 
          <button class="btn orange order-md-1 me-lg-4 mt-lg-0" @click="ir('Usuarios')">Cancelar</button>
        </div>
        <div class="mt-2 mt-md-2 mt-lg-0"> 
          <button class="btn bluelight order-md-1 me-lg-4 mt-lg-0" data-bs-toggle="modal" data-bs-target="#exampleModal3"  @click="AsignarArea()">Asignar</button>
          </div>
        </div>
    </div>
  </div>
</div>
<!--Termina Pills 1-->
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, ref } from "vue";
import swal from "sweetalert2";
import ApiNeva from "@/api/ApiNeva";
import { validateEmail, Fn, checkAll } from "@/Helper/util";
import { useRoute } from "vue-router";
import router from "@/router/index";

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
      usuarioId: "",
      clave: "",
      evaluaciones: [],
      segmentacionAreas: [],
      usuarioAreas: [],
      usuarioEvaluacion: [],
      segmentacionSubAreas: [],
      usuarioEvaluacion: [],
    });

    const route = useRoute();
    state.usuarioId = route.query.usuarioId;

    const getEvaluacionesAreas = async () => {
      state.evaluaciones = [];
      state.segmentacionAreas = [];
      state.segmentacionSubAreas = [];
      state.usuarioAreas = [];
      let bodyEmpresa = {
        "id": JSON.parse(localStorage.usuarioModel).empresaId
      }
      return ApiNeva.post("Evaluacion/GetEvaluacionsByEmpresaModel", bodyEmpresa, { headers: header, })
        .then((response) => {
          if (response.status != 200) return false;
          state.evaluaciones = response.data;
          state.evaluaciones.forEach((e) => {
            e.segmentacionAreas.forEach((s) => {
              s.nombreEvaluacion = e.nombre;
              state.segmentacionAreas.push(s);
            });  
            e.usuarioEvaluacions.forEach((uevaluacion) => {
              if (uevaluacion.usuarioId == state.usuarioId){
                state.usuarioEvaluacion.push(uevaluacion);
                uevaluacion.usuarioAreas.forEach((uarea) => {
                  uarea.evaluacionId = uevaluacion.evaluacionId;
                  uarea.usuarioEvaluacionId = uevaluacion.id;
                  state.usuarioAreas.push(uarea);
                });
              
              }
            });
          });

          state.segmentacionAreas.forEach((s) => {
            let user = state.usuarioAreas.find((uarea) => s.id == uarea.segmentacionAreaId && s.evaluacionId == uarea.evaluacionId);
            if (user){
              s.usuarioEvaluacionId = user.usuarioEvaluacionId;
              s.usuarioAreaId = user.id;
              s.estadoActivo = user.activo;
            }else{
              s.estadoActivo = false;
            }
          }); 

          state.segmentacionAreas.forEach((x) => {
            x.segmentacionSubAreas.forEach((y) => {
              state.segmentacionSubAreas.push(y);
            });
          });
        })
        .catch((error) => console.log(error));
    };

    const getEstadoSubArea = async () => {
      let bodyEmpresa =  { 
        id: JSON.parse(localStorage.usuarioModel).empresaId 
      };
      
      return ApiNeva.post("SegmentacionSubArea/GetEstadoSubAreas", bodyEmpresa ,{
        headers: header,
      })
        .then((response) => {
          if (response.status != 200) return false;
          response.data.forEach(x => {
            state.segmentacionSubAreas.forEach(y => {
              if (x.segmentacionSubAreaId == y.id){
                y.estado = x.respuestaPorcentaje;
              }
            });
          });
        })
        .catch((error) => console.log(error));
    };

    const getEstadoArea = async () => {
      let contador = 0
      state.segmentacionAreas.forEach (x => {
        x.estado = 0;
        contador = 0;
        state.segmentacionSubAreas.forEach(y => {
            if (y.segmentacionAreaId == x.id){
              contador++;
              x.estado = (x.estado + parseInt(y.estado));
            };
        });
        x.estado = x.estado / contador;
      });
    };

    const AsignarArea = () => {
      let areas = document.getElementsByName("segmentacionArea");
      let areaEvaluacion = [];
      let usuarioEvaluacion = [];
      let bodyUsuarioEvaluacion = [];
      state.evaluaciones.forEach((e) => {
        let usuarioEvaluacionSelected = state.usuarioEvaluacion.find((ue) => ue.evaluacionId == e.id && ue.usuarioId == state.usuarioId);
        if (usuarioEvaluacionSelected){
          usuarioEvaluacion = {
            "id": usuarioEvaluacionSelected.id,
            "usuarioId": state.usuarioId,
            "empresaId":  JSON.parse(localStorage.usuarioModel).empresaId ,
            "evaluacionId": e.id,
            "fechaCreacion": new Date(),
            "activo": true,
          };
        }else{
          usuarioEvaluacion = {
            "usuarioId": state.usuarioId,
            "empresaId":  JSON.parse(localStorage.usuarioModel).empresaId ,
            "evaluacionId": e.id,
            "fechaCreacion": new Date(),
            "activo": true,
          };
        }

        areas.forEach((a) => {
          if (a.value == e.id){
            let areaSelected = state.segmentacionAreas.find((s) => s.id == a.id );
            if (areaSelected){
              areaSelected.estadoActivo = a.checked;
              if (areaSelected.usuarioAreaId != null){
                areaEvaluacion.push({
                  "id" : areaSelected.usuarioAreaId,
                  "segmentacionAreaId": a.id,
                  "activo":  areaSelected.estadoActivo,
                  "fechaCreacion": new Date()
                })
              }else{
                areaEvaluacion.push({
                  "segmentacionAreaId": a.id,
                  "activo":  areaSelected.estadoActivo
                })
              }
            }
          }
        });

        usuarioEvaluacion.usuarioAreas = areaEvaluacion;
        areaEvaluacion = [];
        bodyUsuarioEvaluacion.push(usuarioEvaluacion);

      });
      ApiNeva.post("UsuarioEvaluacion/UsuarioEvaluacionInsertOrUpdateList" , bodyUsuarioEvaluacion, {
        headers: header,
      })
        .then(async (response) => {
          if (response.status != 200) return false;

          //await getEvaluacionesAreas();
          //await getEstadoSubArea();
          //getEstadoArea();
          swal.fire(
              "Asociar nuevas Áreas y evaluación",
              "Se modifico usuario",
              "success"
          ).then( () => {
              ir('Usuarios');
          });

        })
        .catch((error) => console.log(error));
      
    };
    
    const seleccionarArea = (areaId) => {
      let checked = document.getElementById(areaId).checked;
      if (checked){
        document.getElementById(areaId).checked = false;
      }else{
        document.getElementById(areaId).checked = true;
      }
    };

    const ir = (namePageDestiny) => {
        return router.push({ name: namePageDestiny});
    };
    
    onMounted(async () => {
      await getEvaluacionesAreas();
      await getEstadoSubArea();
      getEstadoArea();
    });

    return {
      ...toRefs(state),
      ir,
      AsignarArea,
      seleccionarArea,
    };
  },
};
</script>

<style></style>
