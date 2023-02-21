// Grafico Barras
var chart = bb.generate({
    data: {
      columns: [
      ["data1", 30, 20, 50, 40, 60, 50]
      ],
      type: "bar", // for ESM specify as: bar()
      colors: {
        data1: "#16C59B"
      },
     
    },
    bindto: "#dataColor"
  });

// Grafico Montañas

var chart = bb.generate({
  data: {
    columns: [
	["data1", 230, 280, 251, 400, 150, 546, 158],
	["data2", 130, 357, 151, 400, 250, 250, 395],
	["data3", 330, 280, 320, 218, 450, 150, 500]
    ],
    type: "area-spline", // for ESM specify as: areaSpline()
    groups: [
      [
        "data1",
        "data2",
        "data3"
      ]
    ],
    colors: {
        data1: "#FFC7D8",
        data2: "#76EFFF",
        data3: "#16C59B",
      },
  },
  area: {
    linearGradient: true
  },
  bindto: "#linearGradient_1"
});

// Grafica Arco 

var chart = bb.generate({
  data: {
    columns: [
	["data", 77]
    ],
    type: "gauge",
    colors: {
        data: "#16C59B",
      }, // for ESM specify as: gauge()
  },
  arc: {
    cornerRadius: 15
  },
  gauge: {
    arcLength: 70,
    fullCircle: true,
    label: {
      extents: function() { return ""; }
    },
    startingAngle: -2.2,
    width: 25
  },
  bindto: "#gaugeCornerRadius_1"
});