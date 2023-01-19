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
                <img class="user-photo" alt="" :src="logoPersona">
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
<div class="col-12 d-flex mt-3 mt-sm-0 flex-column flex-sm-row justify-content-between align-items-center">
    <!--<ul class="nav nav-pills mb-2 mb-sm-0" id="pills-tab" role="tablist">
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
    </div>-->
</div>
<!--content tabs-->
<div class="tab-content pb-2" id="pills-tabContent">
    <div class="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
        <!--content tabs-->
        <div class="tab-content pb-2" id="pills-tabContent">
            <div class="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                <!--card forma-->

                <div class="card my-3 p-3 d-flex flex-column flex-lg-row align-items-center justify-content-between" v-for="empresa in empresas" :key="empresa.id">
                    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between">
                        <div class="img-left me-lg-3">
                            <!--<img class="company" :src="logoLatam" alt="">-->
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
                                    <p class="responsible">Cristian Vistoso</p>
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

                    <!--<div class="d-flex">
                        <button class="btn circle order-md-2 ">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.4583 14.875L8.49999 11.3333L3.54166 14.875V3.54167C3.54166 3.16594 3.69091 2.80561 3.95659 2.53993C4.22226 2.27426 4.5826 2.125 4.95832 2.125H12.0417C12.4174 2.125 12.7777 2.27426 13.0434 2.53993C13.3091 2.80561 13.4583 3.16594 13.4583 3.54167V14.875Z" stroke="#283252" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>      
                        </button>
                        <button class="btn secundary order-md-1 me-lg-4 mt-3 mt-lg-0">Primary</button>
                    </div> -->  
                </div>
                <div class="card my-3 p-3 d-flex flex-column flex-lg-row align-items-center justify-content-between">
                    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between">
                        <div class="img-left me-lg-3">
                            <img class="company" :src="logoLatam" alt="">
                        </div>
                        <div class="me-md-3">
                            <h3 class="my-3 my-md-0 text-center text-md-start">Sociedad Anónima Comercial Industrial (S.A.C.I) Falabella</h3>
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
                                    <p class="responsible">Cristian Vistoso</p>
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
                                    <p class="responsible">15-01-2023</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--<div class="d-flex">
                        <button class="btn circle order-md-2 ">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.4583 14.875L8.49999 11.3333L3.54166 14.875V3.54167C3.54166 3.16594 3.69091 2.80561 3.95659 2.53993C4.22226 2.27426 4.5826 2.125 4.95832 2.125H12.0417C12.4174 2.125 12.7777 2.27426 13.0434 2.53993C13.3091 2.80561 13.4583 3.16594 13.4583 3.54167V14.875Z" stroke="#283252" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>  
                        </button>
                        <button class="btn secundary order-md-1 me-lg-4 mt-3 mt-lg-0">Primary</button>
                    </div>-->
                        
                </div>
                <!--<div class="card my-3 p-3 d-flex flex-column flex-lg-row align-items-center justify-content-between">
                    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between">
                        <div class="img-left me-lg-3">
                            <img class="company" :src="logoLatam" alt="">
                        </div>
                        <div class="me-md-3">
                            <h3 class="my-3 my-md-0 text-center text-md-start">Sociedad Anónima Comercial Industrial (S.A.C.I) Falabella</h3>
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
                                    <p class="responsible">Cristian Vistoso</p>
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
                                    <p class="responsible">15-01-2023</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex">
                        <button class="btn circle order-md-2 ">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.4583 14.875L8.49999 11.3333L3.54166 14.875V3.54167C3.54166 3.16594 3.69091 2.80561 3.95659 2.53993C4.22226 2.27426 4.5826 2.125 4.95832 2.125H12.0417C12.4174 2.125 12.7777 2.27426 13.0434 2.53993C13.3091 2.80561 13.4583 3.16594 13.4583 3.54167V14.875Z" stroke="#283252" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>   
                        </button>
                        <button class="btn secundary order-md-1 me-lg-4 mt-3 mt-lg-0">Primary</button>
                    </div> 
                </div>-->
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


<!--
<script src="assets/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="assets/js/nav.js"></script>
-->

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
    });

    const getUsuario = () => {
        state.userSelected = JSON.parse(localStorage.usuarioModel);
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
            console.log("state.empresas",state.empresas);
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
