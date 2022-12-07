import axios from "axios";
import router from "@/router/index";
import swal from "sweetalert2";

const ApiNeva = axios.create({
  baseURL: process.env.VUE_APP_API_NEVA_HOST,
});

ApiNeva.interceptors.response.use(
  function (response) {
    // Any status code within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log("miError: ", error);
    if (error.message.includes("Network Error")) {
      swal(
        "Sin conexión",
        "Lo sentimos, no se ha logrado establecer conexión con el servidor. Intente en un momento.",
        "warning"
      );
      localStorage.token = null;
      return router.push({
        name: "Pages",
        query: { showMsjInvalidToken: "false" },
      });
    }

    if (typeof error.response !== "undefined") {
      if (error.response.status === 401) {
        localStorage.token = null;
        return router.push({
          name: "Pages",
          query: { showMsjInvalidToken: "false" },
        });
      }
    }

    // Any status codes outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
ApiNeva.interceptors.request.use((config) => {

  config.headers['Content-Security-Policy'] ="default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'"
  config.headers['X-Frame-Options'] ="DENY"
  //config.headers['X-XSS-Protection'] =
  config.headers['X-Content-Type-Options'] ="nosniff"
  //config.headers['Content-Type'] =
  
  var llamada = {
    repositorio: config.url.split("/")[0],
    metodo: config.url.split("/")[1].split("?")[0],
    parametro: config.url.split("/")[1].split("?")[1],
    permiso:
      config.url.split("/")[0] + "_" + config.url.split("/")[1].split("?")[0],
  };

  var usuarioModel = JSON.parse(localStorage.getItem("usuarioModel"));
  if (llamada.repositorio == "Login") return config;
  if (usuarioModel == null) return config;

  var miPrivilegio = true;
  var mensaje = "Sin mensaje";
  if (!usuarioModel.activo) {
    miPrivilegio = false;
    mensaje = "Lo sentimos, no tienes los privilegios. Usuario inactivo.";
  }
  //if (!usuarioModel.perfil.activo) {
  //  miPrivilegio = false;
  //  mensaje = "Lo sentimos, no tienes los privilegios. Perfil inactivo.";
  //}
  /*if (miPrivilegio) {
    usuarioModel.perfil.perfilRols.forEach((rol) => {
      if (!rol.activo) {
        swal(
          "Sin privilegios",
          "Lo sentimos, no tienes los privilegios. Rol " +
            rol.nombre +
            " inactivo.",
          "warning"
        );
        config.url = "";
        return config;
      } else {
        rol.perfilPermisos.forEach((permiso) => {
          if (
            !permiso.activo &&
            permiso.nombre.toUpperCase() +
              "_" +
              permiso.detalle.toUpperCase() ==
              llamada.permiso.toUpperCase()
          ) {
            swal(
              "Sin privilegios",
              "Lo sentimos, inactivo el privilegio ámbito_método  " +
                permiso.nombre +
                "_" +
                permiso.detalle +
                ".",
              "warning"
            );
            config.url = "";
            return config;
          }
        });
      }
    });
  } else {
    config.url = "";
    swal("Sin privilegios", mensaje, "warning");
  }*/
  return config;
});

export default ApiNeva;
