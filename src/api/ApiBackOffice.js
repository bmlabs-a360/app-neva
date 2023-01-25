import axios from "axios";
import router from "@/router/index";
import swal from "sweetalert2";

const ApibackOffice = axios.create({
  baseURL: process.env.VUE_APP_API_BACKOFFICE_HOST,
});

ApibackOffice.interceptors.response.use(
  function (response) {
    // Any status code within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log("miError: ", error);
    if (error.message.includes("Network Error")) {
      swal.fire(
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
ApibackOffice.interceptors.request.use((config) => {

  config.headers['Content-Security-Policy'] ="default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'"
  config.headers['X-Frame-Options'] ="DENY"
  //config.headers['X-XSS-Protection'] =
  config.headers['X-Content-Type-Options'] ="nosniff"
  //config.headers['Content-Type'] =
  return config;
});

export default ApibackOffice;
