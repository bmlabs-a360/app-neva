<template>
<div class="col-12 d-flex mt-3 mt-sm-0 flex-column flex-sm-row justify-content-between align-items-center">
</div>
<!--content tabs-->
<div class="tab-content pb-2" id="pills-tabContent" v-if="perfil == 'Usuario básico'">
    <div class="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
        <!--content tabs-->
        <div class="tab-content pb-2" id="pills-tabContent">
            <div class="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                <!--card forma-->

                <div class="card my-3 p-3 d-flex flex-column flex-lg-row align-items-center justify-content-between" v-for="empresa in empresas" :key="empresa.id">
                    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between">
                        <div class="img-left me-lg-3 btn circle-two-n2">
                            {{empresa.iniciales}}
                        </div>
                        <div class="me-md-3">
                            <h3 class="my-3 my-md-0 text-center text-md-start">{{empresa.razonSocial}}</h3>
                            <div class="d-flex align-items-center data-icon justify-content-center justify-content-md-between flex-wrap">
                                <div class="d-flex align-items-center ">
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_258_1364)">
                                            <path d="M11.0674 5.97389V6.43389C11.0668 7.5121 10.7176 8.56123 10.0721 9.4248C9.42647 10.2884 8.51903 10.9201 7.48506 11.2258C6.4511 11.5316 5.34601 11.4948 4.33462 11.1212C3.32322 10.7475 2.45971 10.0569 1.87286 9.15243C1.28602 8.24791 1.00728 7.17792 1.07822 6.10205C1.14916 5.02617 1.56599 4.00206 2.26652 3.18243C2.96706 2.3628 3.91378 1.79158 4.96548 1.55397C6.01718 1.31635 7.11752 1.42506 8.10239 1.86389" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M11.0674 2.43384L6.06738 7.43884L4.56738 5.93884" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_258_1364">
                                                <rect width="12" height="12" fill="white" transform="translate(0.0673828 0.433838)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <p class="responsible">{{userSelected.nombres}}</p>
                                </div>
                                <div class="d-flex align-items-center">
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_258_1364)">
                                            <path d="M11.0674 5.97389V6.43389C11.0668 7.5121 10.7176 8.56123 10.0721 9.4248C9.42647 10.2884 8.51903 10.9201 7.48506 11.2258C6.4511 11.5316 5.34601 11.4948 4.33462 11.1212C3.32322 10.7475 2.45971 10.0569 1.87286 9.15243C1.28602 8.24791 1.00728 7.17792 1.07822 6.10205C1.14916 5.02617 1.56599 4.00206 2.26652 3.18243C2.96706 2.3628 3.91378 1.79158 4.96548 1.55397C6.01718 1.31635 7.11752 1.42506 8.10239 1.86389" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M11.0674 2.43384L6.06738 7.43884L4.56738 5.93884" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_258_1364">
                                                <rect width="12" height="12" fill="white" transform="translate(0.0673828 0.433838)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <p class="responsible">Plan  Primer</p>
                                </div>
                                <div class="d-flex align-items-center">
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_258_1364)">
                                            <path d="M11.0674 5.97389V6.43389C11.0668 7.5121 10.7176 8.56123 10.0721 9.4248C9.42647 10.2884 8.51903 10.9201 7.48506 11.2258C6.4511 11.5316 5.34601 11.4948 4.33462 11.1212C3.32322 10.7475 2.45971 10.0569 1.87286 9.15243C1.28602 8.24791 1.00728 7.17792 1.07822 6.10205C1.14916 5.02617 1.56599 4.00206 2.26652 3.18243C2.96706 2.3628 3.91378 1.79158 4.96548 1.55397C6.01718 1.31635 7.11752 1.42506 8.10239 1.86389" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M11.0674 2.43384L6.06738 7.43884L4.56738 5.93884" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_258_1364">
                                                <rect width="12" height="12" fill="white" transform="translate(0.0673828 0.433838)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <p class="responsible">50%</p>
                                </div>
                                <div class="d-flex align-items-center">
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_258_1364)">
                                            <path d="M11.0674 5.97389V6.43389C11.0668 7.5121 10.7176 8.56123 10.0721 9.4248C9.42647 10.2884 8.51903 10.9201 7.48506 11.2258C6.4511 11.5316 5.34601 11.4948 4.33462 11.1212C3.32322 10.7475 2.45971 10.0569 1.87286 9.15243C1.28602 8.24791 1.00728 7.17792 1.07822 6.10205C1.14916 5.02617 1.56599 4.00206 2.26652 3.18243C2.96706 2.3628 3.91378 1.79158 4.96548 1.55397C6.01718 1.31635 7.11752 1.42506 8.10239 1.86389" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M11.0674 2.43384L6.06738 7.43884L4.56738 5.93884" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_258_1364">
                                                <rect width="12" height="12" fill="white" transform="translate(0.0673828 0.433838)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <p class="responsible">{{empresa.fechaCreacion}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--termino card forma-->
        </div>
                
    </div>
    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sed aliquam ipsa dolorem molestias veritatis numquam maxime quod aut, quo beatae vitae tempora, eveniet cupiditate. Ex ullam unde saepe accusamus!
        Necessitatibus nesciunt rerum fugit labore reiciendis laudantium nobis rem corrupti beatae a. Laborum ea recusandae ipsa minima error? Ratione natus consequatur dolores quos magnam sed accusamus nihil distinctio voluptas in!
        Maxime qui perspiciatis laborum illo illum ut dignissimos. Quibusdam voluptates blanditiis asperiores facilis, quaerat esse aliquam modi. Eum, eveniet similique! Praesentium ratione quidem nobis atque, ea rem odit voluptatibus tempora.
        Modi sint sequi totam, laborum libero cum ex suscipit perferendis praesentium temporibus facere deleniti exercitationem consequuntur velit consequatur quis. Rerum quod quibusdam sequi nostrum beatae nemo velit repellendus in at.
        Aliquid eius vitae sed repellendus quas? At deserunt ducimus commodi quam consequuntur facere, fuga reprehenderit sit ea debitis optio accusantium molestiae eos totam perspiciatis suscipit nam. Deserunt magni corrupti nesciunt?
    </div>
</div>
<!--Termino Contendio-->
<!--
</html>
-->
</template>

<script>
import { reactive, toRefs, onMounted, getCurrentInstance } from "vue";
import ApiNeva from "@/api/ApiNeva";
import { style } from "@/assets/css/style.css";
import logoNeva from "@/assets/img/nav/logos/logo-negro.svg";
import logoConfiguracion from "@/assets/img/nav/config.svg";
import logoCubo from "@/assets/img/nav/cubo.svg";
import logoLatam from "@/assets/img/clientes/logo_latam.jpg";
import logoPersona from "@/assets/img/nav/pers/02.png";
import router from "@/router/index";
export default {
  name: "Login",
  methods: {
  },
  setup() {
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const ApiKey = globalProperties.$apiKey;
    const header = {
      ApiKey,
    };

    const state = reactive({
        userSelected : [],
        empresas : [],
        perfil : [],
    });

    const getUsuario = () => {
        state.userSelected = JSON.parse(localStorage.usuarioModel);
        state.perfil = state.userSelected.perfil.nombre;
        getEmpesas();
    };

    const getEmpesas = () => {
        state.empresas = [];
        ApiNeva.get("Empresa/GetEmpresasByUsuarioId?idUsuario=" + JSON.parse(localStorage.usuarioModel).id , null, { headers: header })
          .then((response) => {
            if (response.status != 200) return false;
            state.empresas = response.data;
            state.empresas.forEach((m) => {
              m.fechaCreacion = m.fechaCreacion.substring(0, '10');
              m.iniciales = m.razonSocial.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g).join("").substring("0","2");
            });
          })
          .catch((error) => console.log(error));
        return false;
    }

    onMounted(() => {
      getUsuario();
    });

    return {
      ...toRefs(state),
      style,
      logoNeva,
      logoConfiguracion,
      logoCubo,
      logoLatam,
      logoPersona,
    };
  },
};
</script>
