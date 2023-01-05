<template>
<!--
<!DOCTYPE html>

<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;600;700&family=Roboto:wght@100;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" :href="style">

</head>
-->
<!--Contenido-->
<section class="cards mb-4">
    <div class="cards-hello">
        <h2>Hola {{userSelected.nombres}}, lo estás haciendo muy bien</h2>
        <p>Empiece a utilizar nuestras herramientas de gestión de equipos y proyectos Aprende más</p>
    </div>
    <div class="cards-message flex-column">
        <div class="d-flex w-100  justify-content-between">
            <p>Inbox</p>
            <div>
                <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12.9787" cy="5.15581" r="1.65337" fill="#283252"/>
                    <circle cx="12.9786" cy="10.9427" r="1.65337" fill="#283252"/>
                    <circle cx="12.9786" cy="16.7295" r="1.65337" fill="#283252"/>
                </svg> 
            </div>
        </div>
        <div class="d-flex w-100 row cards-none">
            <div class="col-12 img-left d-flex align-items-center w-100 mb-3">
                <img class="user-photo" alt="" src="assets/img/nav/pers/02.png">
                <h3>Carolina Espinosa</h3>        
            </div>
            <div class="col-12 card p-3">
                <div class="circle d-flex align-items-center "><div class=" active me-2 "></div>
                    <h6>administrador</h6>
                    </div>
                <p class="message">Letraset sheets containing Lorem Ipsum passages, and more
                </p>
            </div>
        </div>
        <div>

        </div>
    </div>
</section>
<div class="col-12 d-flex  flex-column flex-sm-row justify-content-between align-items-center">
    <ul class="nav nav-pills mb-2 mb-sm-0" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Todos</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Importantes</button>
        </li>
    </ul>
    <div class="">
        <div class="control has-icon">
            <input class="input new w-100" type="email" placeholder="Buscador">
            <label class="form-icon search" for="">
                <svg width="24" height="24" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_258_3270)">
                        <path d="M11.7294 9.85843L9.88579 8.01574C10.5504 7.23363 10.9522 6.22242 10.9522 5.11838C10.9522 2.64697 8.93993 0.635742 6.46658 0.635742C3.99324 0.635742 1.98163 2.64697 1.98163 5.11838C1.98163 7.58979 3.9939 9.60102 6.46658 9.60102C7.45592 9.60102 8.37148 9.27843 9.11382 8.73399L10.9838 10.603C11.0866 10.7057 11.2216 10.7571 11.3566 10.7571C11.4917 10.7571 11.626 10.7057 11.7294 10.603C11.9349 10.3976 11.9349 10.0638 11.7294 9.85843ZM3.03552 5.11838C3.03552 3.22763 4.57485 1.68909 6.46658 1.68909C8.35831 1.68909 9.89765 3.22763 9.89765 5.11838C9.89765 7.00913 8.35831 8.54768 6.46658 8.54768C4.57485 8.54768 3.03552 7.00913 3.03552 5.11838Z" fill="#EAEBEF"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_258_3270">
                            <rect width="16" height="15" fill="white" transform="translate(0.932617 0.195557)"/>
                        </clipPath>
                    </defs>
                </svg>
            </label>
        </div>
    </div>
</div>
<!--content tabs-->
<div class="tab-content pb-2" id="pills-tabContent">
    <div class="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
        <!--card forma-->
        <div class="card my-3 p-3 d-flex">
            <div class="img-left">
                <img class="company" src="assets/img/clientes/logo_latam.jpeg" alt="">
            </div>
            <div>
                <h3>Sociedad Anónima Comercial Industrial (S.A.C.I) Falabella</h3>
                <div>

                </div>
            </div>
        </div>
        <!--termino card forma-->
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


<!--
<script src="assets/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="assets/js/nav.js"></script>
-->

<script>
import { reactive, toRefs, onMounted } from "vue";
import { style } from "@/assets/css/style.css";
import logoNeva from "@/assets/img/nav/logos/logo-negro.svg";
import logoConfiguracion from "@/assets/img/nav/config.svg";
import logoCubo from "@/assets/img/nav/cubo.svg";
import router from "@/router/index";
export default {
  name: "Login",
  methods: {
  },
  setup() {
    const state = reactive({
        userSelected : [],
    });

    const getUsuario = () => {
        state.userSelected = JSON.parse(localStorage.usuarioModel);
    };

    onMounted(() => {
      getUsuario();
    });

    return {
      ...toRefs(state),
      style,
      logoNeva,
      logoConfiguracion,
      logoCubo,
    };
  },
};
</script>
