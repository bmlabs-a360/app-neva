import * as XLSX from "xlsx";
import moment from "moment";

export function getElementsByAttribute(attr, value) {
  if ("querySelectorAll" in document) {
    return document.querySelectorAll("[" + attr + "='" + value + "']");
  } else {
    var els = document.getElementsByTagName("*"),
      result = [];

    for (var i = 0, _len = els.length; i < _len; i++) {
      var el = els[i];

      if (el.hasAttribute(attr)) {
        if (el.getAttribute(attr) === value) result.push(el);
      }
    }

    return result;
  }
}

export function difDias(fechaIni, fechaFin) {
  var ini = moment(moment(fechaIni).format("YYYY-MM-DD")).add(1, "s");
  var fin = moment(moment(fechaFin).format("YYYY-MM-DD")).add(1, "s");
  var dif = fin.diff(ini, "days");
  return dif;
}

export const Fn = {
  validaRut: function (rutCompleto) {
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rutCompleto)) return false;
    var tmp = rutCompleto.split("-");
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == "K") digv = "k";
    return Fn.dv(rut) == digv ? true : false;
  },
  dv: function (T) {
    var M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? S - 1 : "k";
  },
};

export function validateEmail(email) {
  if (
    email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    return true;
  } else {
    return false;
  }
}

export function csvToObjsTBK(content) {
  if (!content) {
    console.error("No se ha informado contenido");
    return "";
  }

  let csvText = content.split(".;\n")[1];

  if (!csvText) {
    console.error("No existe csv en el archivo informado");
    return "";
  }

  //Elimino posición final vacia
  if (csvText.endsWith("\n")) {
    csvText = csvText.trim().slice(0, -2);
  }

  var jsonObj = [];
  let arr = csvText.split("\n");
  let headers = arr[0].split(";");

  for (let i = 1; i < arr.length; i++) {
    //Elimino posición final vacia
    if (arr[i].endsWith(";")) {
      arr[i] = arr[i].trim().slice(0, -1);
    }
    let data = arr[i].split(";");
    let obj = {};
    for (let j = 0; j < data.length; j++) {
      let head = headers[j]
        .trim()
        .replace(" ", "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace("n°", "nro");
      obj[head] = data[j].trim();
    }
    jsonObj.push(obj);
  }

  return jsonObj;
}

export function csvToObjectWizard(content) {
  if (!content) {
    console.error("No se ha informado contenido");
    return "";
  }
  var jsonObj = [];
  let arr = content.split("\n");

  let headers = arr[0].split(";");
  for (let i = 1; i < arr.length - 1; i++) {
    let data = arr[i].split(";");
    let obj = {};
    for (let j = 0; j < data.length; j++) {
      let head = headers[j];
      obj[head] = data[j].trim();
    }
    jsonObj.push(obj);
  }
  return jsonObj;
}

export function csvToHeadersWizard(content) {
  if (!content) {
    console.error("No se ha informado contenido");
    return "";
  }
  var jsonObj = [];
  let arr = content.split("\n");
  let headers = arr[0].split(";");
  for (let j = 0; j < headers.length; j++) {
    let head = {
      id: j,
      name: headers[j],
    };
    jsonObj.push(head);
  }
  return jsonObj;
}
export function xlsxToHeadersWizard(content) {
  if (!content) {
    console.error("No se ha informado contenido");
    return "";
  }
  const workbook = XLSX.read(content);
  console.log("workbook", workbook);
  var letras = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  var jsonObj = [];
  try {
    for (let j = 0; j <= 25; j++) {
      //console.log("column_"+j,workbook.Sheets['Hoja1'][letras[j]+'1'].v)´
      let head = {
        id: j,
        name: workbook.Sheets["Hoja1"][letras[j] + "1"].v,
      };
      jsonObj.push(head);
    }
  } catch (error) {
    //console.log("error",error)
    //controla error celda sin datos : TypeError: Cannot read properties of undefined (reading 'v')
  }
  return jsonObj;

  //let jsonDetallePago = XLSX.utils.sheet_to_json(workbook.Sheets['Hoja1']);
  //console.log("jsonDetallePago",jsonDetallePago)
}
export function xlsxToObjectWizard(data) {
  if (!data) {
    console.error("No se ha informado contenido");
    return "";
  }
  const workbook = XLSX.read(data);
  //console.log("workbook",workbook)

  let jsonDetallePago = XLSX.utils.sheet_to_json(workbook.Sheets["Hoja1"]);
  //console.log("jsonDetallePago",jsonDetallePago)
  return jsonDetallePago;
}

export function xlsToObjsKhipu(data) {
  if (!data) {
    console.error("No se ha informado contenido");
    return "";
  }
  const workbook = XLSX.read(data);

  let jsonDetallePago = XLSX.utils.sheet_to_json(
    workbook.Sheets["Detalle de pagos"]
  );
  const objsKhipu = [];

  for (let i = 2; i < jsonDetallePago.length; i++) {
    if (!jsonDetallePago[i]["Detalle de cobros pagados"]) {
      break;
    }

    let obj = {
      codigoOperacion: jsonDetallePago[i]["Detalle de cobros pagados"] || "",
      fechaPago: jsonDetallePago[i]["__EMPTY"] || "",
      fechaRendicion: jsonDetallePago[i]["__EMPTY_1"] || "",
      motivo: jsonDetallePago[i]["__EMPTY_2"] || "",
      codIdentificador: jsonDetallePago[i]["__EMPTY_3"] || "",
      pagador: jsonDetallePago[i]["__EMPTY_4"] || "",
      rut: jsonDetallePago[i]["__EMPTY_5"] || "",
      email: jsonDetallePago[i]["__EMPTY_6"] || "",
      cuenta: jsonDetallePago[i]["__EMPTY_7"] || "",
      banco: jsonDetallePago[i]["__EMPTY_8"] || "",
      monto: jsonDetallePago[i]["__EMPTY_9"] || "",
      descuento: jsonDetallePago[i]["__EMPTY_10"] || "",
      cobrada: jsonDetallePago[i]["__EMPTY_11"] || "",
      porCobrar: jsonDetallePago[i]["__EMPTY_12"] || "",
      esquemaCobro: jsonDetallePago[i]["__EMPTY_13"] || "",
      comprobantePago: jsonDetallePago[i][">0"] || "",
    };
    objsKhipu.push(obj);
  }

  return objsKhipu;
}

export function getStyleSegunEstado(estado) {
  switch (estado) {
    case "EMITIDO":
      return "primary";
    case "EXITO":
      return "success";
    case "FRACASO":
      return "secondary";
    case "ERROR":
    case "ANULADO":
      return "danger";
    case "ABANDONO":
      return "warning";
    case "PROCESO":
      return "info";
    case "CONTABILIZADO":
    case "CONTAB":
      return "light";
    case "CONCILIADO":
      return "dark";
  }
}

export function getStyleConciliacionSegunEstado(estado) {
  switch (estado) {
    case "+":
      return "danger";
    case "D":
      return "warning";
    case "1":
      return "success";
    case "0":
      return "secondary";
  }
  gi;
}
