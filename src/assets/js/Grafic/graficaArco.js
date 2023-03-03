var chart = bb.generate({
  data: {
    columns: [
	["data", 91.4]
    ],
    type: "gauge", // for ESM specify as: gauge()
  },
  color: {
    pattern: [
      "#16C59B"
    ]
  },
  gauge: {
    max: 1000
  },
  bindto: "#updateConfigOne"
});

//grafico Estrategia .....

var chart = bb.generate({
  data: {
    x: "x",
    columns: [
	["x", "Estrategia", "Finanzas", "Marketing", "Operaciones", "Gestion de personas", "Comercial y ventas"],
	["data1", 40, 50, 40, 80, 50, 30, 100]
    ],
    type: "radar", // for ESM specify as: radar()
    labels: true
  },
  radar: {text: {
        format: function(x) { return x + "%"; }
      },
    axis: {
      max: 120,
      line: {
        show: true
      },
      text: {
        show: true
      }
    },
    level: {
      text: {
        show: false
      }
    }
  },
  color: {
    pattern: [
      "#16C59B"
    ]
  },
  bindto: "#radarAxis"
});

// Barras Stack Normalizer
var chart2 = bb.generate({
  data: {
    x: "x",
    columns: [
	["x", "Estrategia", "Finanzas", "Marketing", "Operación", "Gestion de Personas", "Comercial y Ventas"],
	["data1", 30, 280, 951, 400, 150, 546, 4528]
    ],
    type: "bar", // for ESM specify as: bar()
    groups: [
      [
        "data1",
        "data2",
        "data3"
      ]
    ],
    stack: {
      normalize: false
    }
  },
  axis: {
    x: {
      type: "category"
    }
  },
  color: {
        pattern: [
         "#16C59B"
          
       ]
      },
  bindto: "#dataStackNormalized_2"
});
//BARRAS COLOR ONOVER

// var chart = bb.generate({
//   data: {
//     columns: [
// 	["data1", 230,50, 100, 400, 150]
	
//     ],
//     groups: [
//       [
//         "data1",
//         "data2",
//         "data3"
//       ]
//     ],
//     type: "bar", // for ESM specify as: bar()
//   },
//   colors: {
    
//       data1: "red",
//       data2: "black",
//       data3: "blue"
  
//   },
//   color: {
//     pattern: [
//       "#16C59B"
      
//     ]
//   },
//   bindto: "#colorOnover_1"
// });


//BARRAS COLOR ONOVER 2

var chart = bb.generate({
  data: {
    columns: [
	["data1", 230, null, 100, 400, 150],
	["data2", null, null, null, 240, 115],
	["data3", null, 220, 140, 200, null]
    ],
    groups: [
      [
        "data1",
        "data2",
        "data3"
      ]
    ],
    type: "bar", // for ESM specify as: bar()
  },
  colors: {
    
      data1: "red",
      data2: "black",
      data3: "blue"
  
  },
  color: {
    pattern: [
      "#16C59B",
      "#C09F5A",
      "#7192F0"
    ]
  },
  bindto: "#colorOnover_2"
});

//test
var chart = bb.generate({
  data: {
    columns: [
	["data", 91.4]
    ],
    type: "gauge", // for ESM specify as: gauge()
  },
  gauge: {
    max: 1000
  },
  color: {
    pattern: [
      "#16C59B"
    ]
  },
  bindto: "#updateConfigtest"
});

setTimeout(function() {
	// update gauge.max to 100, and redraw with changed option
	chart.config("gauge.max", 100, true);
}, 1000);
//test
var chart = bb.generate({
  data: {
    columns: [
	["data", 91.4]
    ],
    type: "gauge", // for ESM specify as: gauge()
  },
  gauge: {
    max: 1000
  },
  color: {
    pattern: [
      "#16C59B"
    ]
  },
  bindto: "#updateConfigtestTwo"
});

setTimeout(function() {
	// update gauge.max to 100, and redraw with changed option
	chart.config("gauge.max", 100, true);
}, 1000);
//test
var chart = bb.generate({
  data: {
    columns: [
	["data", 91.4]
    ],
    type: "gauge", // for ESM specify as: gauge()
  },
  gauge: {
    max: 1000
  },
  color: {
    pattern: [
      "#16C59B"
    ]
  },
  bindto: "#updateConfigtest"
});

setTimeout(function() {
	// update gauge.max to 100, and redraw with changed option
	chart.config("gauge.max", 100, true);
}, 1000);
//test
var chart = bb.generate({
  data: {
    columns: [
	["data", 91.4]
    ],
    type: "gauge", // for ESM specify as: gauge()
  },
  gauge: {
    max: 1000
  },
  color: {
    pattern: [
      "#16C59B"
    ]
  },
  bindto: "#updateConfigtestThree"
});

setTimeout(function() {
	// update gauge.max to 100, and redraw with changed option
	chart.config("gauge.max", 100, true);
}, 1000);
//test
var chart = bb.generate({
  data: {
    columns: [
	["data", 91.4]
    ],
    type: "gauge", // for ESM specify as: gauge()
  },
  gauge: {
    max: 1000
  },
  color: {
    pattern: [
      "#16C59B"
    ]
  },
  bindto: "#updateConfigtestFour"
});

setTimeout(function() {
	// update gauge.max to 100, and redraw with changed option
	chart.config("gauge.max", 100, true);
}, 1000);

//
// Grafica Arco  5
var chart = bb.generate({
  data: {
    columns: [
	["data", 91.4]
    ],
    type: "gauge", // for ESM specify as: gauge()
  },
  gauge: {
    max: 1000
  },
  color: {
    pattern: [
      "#16C59B"
    ]
  },
  bindto: "#updateConfigtestFive"
});
// Grafica Arco  6
//test
var chart = bb.generate({
  data: {
    columns: [
	["data", 91.4]
    ],
    type: "gauge", // for ESM specify as: gauge()
  },
  gauge: {
    max: 1000
  },
  color: {
    pattern: [
      "#16C59B"
    ]
  },
  bindto: "#updateConfigtestSix"
});
// Grafica Arco  6
var chart = bb.generate({
  data: {
    columns: [
	["data", 91.4]
    ],
    type: "gauge", // for ESM specify as: gauge()
  },
  gauge: {
    max: 1000
  },
  color: {
    pattern: [
      "#16C59B"
    ]
  },
  bindto: "#updateConfigtestSeven"
});

// Grafica Arco  6
var chart = bb.generate({
  data: {
    columns: [
	["data", 91.4]
    ],
    type: "gauge", // for ESM specify as: gauge()
  },
  gauge: {
    max: 1000
  },
  color: {
    pattern: [
      "#16C59B"
    ]
  },
  bindto: "#updateConfigtestEight"
});
