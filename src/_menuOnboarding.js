const buscadorTransaccion = [
  {
    id: "#filtro_transaccion",
    title: "Buscador de Transacciones",
    description:
      "Múltiples filtros le permitirán encontrar sus transacciones para verificar su estado, detalle y bitácora.",
  },
  {
    id: "#buscar_transacciones",
    title: "Buscar",
    description:
      "Aquí puede accionar la búsqueda, los filtros son opcionales: si pulsa directamente en buscar mostrará todas las transacciones ordenadas desde la última transacción emitida.",
  },
  {
    id: "#limpiar_transacciones",
    title: "Limpiar",
    description: "Siempre puede limpiar todos los filtros desde aquí.",
  },
  {
    id: "#listado_transaccion",
    title: "Listado",
    description: "Aquí se muestra el resultado de su búsqueda.",
  },
  {
    id: "#descargar_transaccion",
    title: "Exportar",
    description: "Desde aquí podrá exportar las transacciones que ha buscado.",
  },
];

const buscadorConciliacion = [
  {
    id: "#filtro_conciliacion",
    title: "Buscador de Conciliaciones",
    description:
      "Múltiples filtros le permitirán encontrar los registros de conciliación cargados en el sistema; para verificar su estado, detalle y bitácora.",
  },
  {
    id: "#buscar_conciliacion",
    title: "Buscar",
    description:
      "Aquí puede accionar la búsqueda, los filtros son opcionales: si pulsa directamente en buscar mostrará todas las conciliaciones ordenadas desde la última conciliación cargada en el sistema.",
  },
  {
    id: "#limpiar_conciliacion",
    title: "Limpiar",
    description: "Siempre puede limpiar todos los filtros desde aquí.",
  },
  {
    id: "#listado_conciliacion",
    title: "Listado",
    description: "Aquí se muestra el resultado de su búsqueda.",
  },
  {
    id: "#descargar_conciliaciones",
    title: "Exportar",
    description: "Desde aquí podrá exportar las conciliaciones que ha buscado.",
  },
];

const asistenteConciliacion = [
  {
    id: "#conciliacion_asistida",
    title: "Asistente de Conciliación",
    description:
      "En está sección podrá cargar los distintos formatos de archivos de conciliación proporcionados por las pasarelas de pagos integradas.",
  },
  {
    id: "#paso1",
    title: "Primer Paso",
    description:
      "Seleccione desde su ordenador un archivo de conciliación. No importa el formato, el asistente le permitirá asignar el orden correcto en el siguiente paso.",
  },
  {
    id: "#paso2",
    title: "Segundo Paso",
    description:
      "Aquí podrá organizar las columnas de su archivo de conciliación con los datos requeridos para cargar un registro de conciliación.",
  },
  {
    id: "#paso3",
    title: "Tercer Paso",
    description:
      "Finalmente podrá visualizar un listado con el resumen de los registros de su archivo.",
  },
  {
    id: "#ejemplo_conciliacion",
    title: "Importar",
    description:
      "Siempre puede contar con un archivo ejemplo para organizar sus registros según su preferencia.",
  },
];

const automaticaConciliacion = [
  {
    id: "#conciliacion_automatica",
    title: "Conciliación Automática",
    description:
      "Algunas formas de pago cuentan con procesos para consultar sus registros de conciliación automaticamente, utilice los filtro y obtenga los registros disponibles.",
  },
  {
    id: "#conciliacion_automatica_listado",
    title: "Conciliaciones Obtenidas",
    description: "Puede visualizar los registros de conciliación obtenidos.",
  },
  {
    id: "#conciliacion_automatica_upload",
    title: "Cargar Registros",
    description:
      "Finalmente debe cargar los registros en base de datos para que sean procesados.",
  },
];

const mantenedorCanal = [
  {
    id: "#listado_canal",
    title: "Canales",
    description:
      "En habupay puede tener múltiples canales que le permitirá ordenar sus transacciones según los diversos negocios que pueda disponer su negocio.",
  },
  {
    id: "#crear_canal",
    title: "Crear Nuevo",
    description: "Puedes acceder al formulario para crear un nuevo canal.",
  },
  {
    id: "#acciones_canal",
    title: "Acciones",
    description:
      "En las acciones puedes editar, ver las formas de pago asociadas(activar/desactivar) y cargar el resumen de cada canal.",
  },
  {
    id: "#resumen_canal",
    title: "Resumen",
    description:
      "Cuando selecciona el gráfico disponible en acciones; cargará el resumen de sus transacciones.",
  },
];

const mantenedorConfiguracion = [
  {
    id: "#filtro_config",
    title: "Filtro",
    description: "Filtre las configuraciones de su sistema habupay.",
  },
  {
    id: "#crear_config",
    title: "Crear Nuevo",
    description:
      "Puedes acceder al formulario para crear una nueva configuración.",
  },
  {
    id: "#acciones_config",
    title: "Acciones",
    description:
      "Puede editar y eliminar las configuraciones, Tenga precaución de quitar valores de sus formas de pago que son necesarias para comunicar con la pasarela.",
  },
];

const mantenedorMoneda = [
  {
    id: "#crear_moneda",
    title: "Crear Nuevo",
    description: "Puedes acceder al formulario para crear una nueva moneda.",
  },
  {
    id: "#acciones_moneda",
    title: "Acciones",
    description: "Puede editar y eliminar las monedas.",
  },
];

const mantenedorFormapago = [
  {
    id: "#acciones_formapago",
    title: "Acciones",
    description:
      "Una forma de pago puede admitir diferentes tipos de monedas. Aquí podrá editar la monedas de cada forma de pago activa en su sistema.",
  },
];

const permisosUsuario = [
  {
    id: "#crear_usuario",
    title: "Creación de Usuarios",
    description:
      "Para crear usuarios dispone de dos opciones donde podrá; Enviar una solicitud de registro para que el usuario registre sus datos o llenar el formulario y proporcionar las credenciales.",
  },
  {
    id: "#acciones_usuario",
    title: "Acciones",
    description:
      "Desde la edición puede activar/desactivar y cambiar el perfil.",
  },
];

const permisosPerfiles = [
  {
    id: "#crear_perfil",
    title: "Creación de Perfiles",
    description: "Puede crear nuevo perfiles multirol.",
  },
  {
    id: "#acciones_perfil",
    title: "Acciones",
    description: "Desde la edición puede activar/desactivar.",
  },
];

const permisosRoles = [
  {
    id: "#crear_roles",
    title: "Creación de Roles",
    description:
      "Puede crear nuevos roles que cumplan funciones en su negocio.",
  },
  {
    id: "#acciones_roles",
    title: "Acciones",
    description: "Desde la edición puede activar/desactivar.",
  },
];

const permisosPrivilegios = [
  {
    id: "#crear_privilegios",
    title: "Creación de Provilegios",
    description:
      "Los privilegios son cada interacción que realiza la aplicación con el servidor, aquí puede asignar que privilegios tiene cada rol.",
  },
  {
    id: "#acciones_privilegios",
    title: "Acciones",
    description: "Desde la edición puede activar/desactivar.",
  },
];

const simuladorTransaccion = [
  {
    id: "#formulario_simulacion",
    title: "Crear Transacción",
    description:
      "Desde esté formulario podrá crear transacciones manualmente en su sistema habupay. (IMPORTANTE: Es muy recomendable que utilice esté proceso solo para probar en modo integración sus formas de pago).",
  },
  {
    id: "#guardarInfoCookie",
    title: "Recordar datos simulación",
    description:
      "Activando está opción el sistema almacenará los datos ingrasados para crear la transacción.",
  },
  {
    id: "#detalles_simulacion",
    title: "Detalle de la transacción",
    description: "Aquí puede ingresar el detalle de su transacción.",
  },
  {
    id: "#acciones_simulacion",
    title: "Acciones",
    description: "Puede editar o eliminar registros de su detalle.",
  },
  {
    id: "#crear_simulacion",
    title: "Crear transacción",
    description:
      "Finalmente el sistema creará una nueva transacción, entregando tres opciones: Abrir en una nueva ventana, copiar token y copiar link completo de la transacción.",
  },
];

export {
  buscadorTransaccion,
  buscadorConciliacion,
  asistenteConciliacion,
  automaticaConciliacion,
  mantenedorCanal,
  mantenedorConfiguracion,
  mantenedorFormapago,
  mantenedorMoneda,
  permisosPerfiles,
  permisosPrivilegios,
  permisosRoles,
  permisosUsuario,
  simuladorTransaccion,
};
