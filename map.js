require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/BasemapToggle",
  "esri/widgets/BasemapGallery",
  "esri/layers/FeatureLayer",
  "esri/layers/TileLayer",
  "esri/widgets/LayerList",
  "esri/PopupTemplate",
  "esri/renderers/ClassBreaksRenderer",
  "esri/renderers/PieChartRenderer",
  "esri/widgets/Search",
  "esri/widgets/Legend",
  "esri/layers/GraphicsLayer",
  "esri/widgets/Sketch",
  "esri/widgets/Editor",
  "esri/form/FormTemplate",
  "esri/widgets/Histogram",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D",
  "esri/widgets/Expand",
  "esri/core/Collection",
], function (
  esriConfig,
  Map,
  MapView,
  BasemapToggle,
  BasemapGallery,
  FeatureLayer,
  TileLayer,
  LayerList,
  PopupTemplate,
  ClassBreaksRenderer,
  PieChartRenderer,
  Search,
  Legend,
  GraphicsLayer,
  Sketch,
  Editor,
  FormTemplate,
  Histogram,
  DistanceMeasurement2D,
  AreaMeasurement2D,
  Expand,
  Collection
) {
  esriConfig.apiKey =
    "AAPKb4c008c921144b27af93a7a8502d9c58xppNRvcs-LDYq7FioQzWwNX3Hr-YINaT3onRCQo3vWzGwdYr_XJQXe9iLYrxRzGR";

  const myMap = new Map({
    basemap: "arcgis-imagery",
  });

  const view = new MapView({
    map: myMap,
    center: [-7.62, 33.59],
    zoom: 9,
    container: "viewDiv",
  });

  const reclamation = new FeatureLayer({
    // URL to the service
    url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Mapex_WFL1/FeatureServer/7",
  });

  const editor = new Editor({
    view: view,
    layerInfos: [
      {
        layer: reclamation, // pass in the feature layer,
        formTemplate: {
          // autocastable to FormTemplate
          elements: [
            {
              // autocastable to FieldElement
              type: "field",
              fieldName: "Objet",
              label: "objet",
            },
            {
              // autocastable to FieldElement
              type: "field",
              fieldName: "Message",
              label: "message",
            },
            {
              // autocastable to FieldElement
              type: "field",
              fieldName: "Demarche_d",
              label: "demarche",
            },

            { type: "field", fieldName: "Mail", label: "mail" },
          ],
          enabled: true, // Default is true, set to false to disable editing functionality.
          addEnabled: true, // Default is true, set to false to disable the ability to add a new feature.
          updateEnabled: true, // Default is true, set to false to disable the ability to edit an existing feature.
          deleteEnabled: false, // Default is true, set to false to disable the ability to delete features.
          attributeUpdatesEnabled: true, // Default is true, set to false to disable the ability to edit attributes in the update workflow.
          geometryUpdatesEnabled: true, // Default is true, set to false to disable the ability to edit feature geometries in the update workflow.
          attachmentsOnCreateEnabled: true, //Default is true, set to false to disable the ability to work with attachments while creating features.
          attachmentsOnUpdateEnabled: true, //Default is true, set to false to disable the ability to work with attachments while updating/deleting features.
        },
      },
    ],
  });
  // Add widget to the view
  // view.ui.add(editor, "bottom-right");
  const bgExpand = new Expand({
    view: view,
    content: editor,
  });
  myMap.add(reclamation);

  view.ui.add(bgExpand, "bottom-right");

  const communePop = new PopupTemplate({
    title: "<b>Communes de Casablanca : {COMMUNE_AR}</b>",
    content:
      "<p> PREFECTURE : {PREFECTURE} </p> + <p> Communes : {COMMUNE_AR} </p>  + <p> Surface : {Shape_Area} </p> ",
  });

  const commRenderer = {
    type: "class-breaks",
    // attribute of interest
    field: "Shape_Area",
    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 8000000,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [255, 255, 212],
          style: "solid",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "white",
            width: 1,
          },
        },
      },
      {
        minValue: 8000001,
        maxValue: 16000000,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [254, 227, 145],
          style: "solid",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "white",
            width: 1,
          },
        },
      },
      {
        minValue: 16000001,
        maxValue: 26000000,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [254, 196, 79],
          style: "solid",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "white",
            width: 1,
          },
        },
      },
      {
        minValue: 26000001,
        maxValue: 48000000,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [254, 153, 41],
          style: "solid",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "white",
            width: 1,
          },
        },
      },
      {
        minValue: 48000001,
        maxValue: 78000000,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [217, 95, 14],
          style: "solid",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "white",
            width: 1,
          },
        },
      },
      {
        minValue: 78000001,
        maxValue: 135000000,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [153, 52, 4],
          style: "solid",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "white",
            width: 1,
          },
        },
      },
    ],
  };

  let commRenderer2 = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    field: "PREFECTURE",
    defaultSymbol: { type: "simple-fill" }, // autocasts as new SimpleFillSymbol()
    uniqueValueInfos: [
      {
        // All features with value of "North" will be blue
        value: "PREFECTURE DE CASABLANCA",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [255, 255, 212],
        },
      },
      {
        // All features with value of "East" will be green
        value: "PREFECTURE DE MOHAMMEDIA",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [254, 227, 145],
        },
      },
      {
        // All features with value of "South" will be red
        value: "PROVINCE DE BEN SLIMANE",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [254, 196, 79],
        },
      },
      {
        // All features with value of "West" will be yellow
        value: "PROVINCE DE MEDIOUNA",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [217, 95, 14],
        },
      },
      {
        // All features with value of "West" will be yellow
        value: "PROVINCE DE NOUACEUR",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [254, 153, 41],
        },
      },
    ],
  };

  let commRenderer3 = {
    type: "unique-value",
    field: "COMMUNE_AR",
    defaultSymbol: { type: "simple-fill" },
    uniqueValueInfos: [
      {
        value: "ARRONDISSEMENT MOULAY R''CHID",
        symbol: {
          type: "simple-fill",
          color: "#e65154", // Rouge
        },
      },
      {
        value: "ARRONDISSEMENT SBATA",
        symbol: {
          type: "simple-fill",
          color: "green", // Vert
        },
      },
      {
        value: "ARRONDISSEMENT SIDI BELYOUT",
        symbol: {
          type: "simple-fill",
          color: "purple", // Violet
        },
      },
      {
        value: "ARRONDISSEMENT SIDI BERNOUSSI",
        symbol: {
          type: "simple-fill",
          color: "yellow", // Jaune
        },
      },
      {
        value: "ARRONDISSEMENT SIDI MOUMEN",
        symbol: {
          type: "simple-fill",
          color: "brown", // Marron
        },
      },

      {
        value: "ARRONDISSEMENT SIDI OTHMANE",
        symbol: {
          type: "simple-fill",
          color: "#67e6d1", // Turquoise
        },
      },

      {
        value: "COMMUNE DU MECHOUAR",
        symbol: {
          type: "simple-fill",
          color: "#26b6ff", // Bleu clair
        },
      },

      {
        value: "COMMUNE RURALE BENI YACKLEF",
        symbol: {
          type: "simple-fill",
          color: "#cd76d6", // Violet clair
        },
      },

      {
        value: "COMMUNE RURALE ECHELLALATE",
        symbol: {
          type: "simple-fill",
          color: "#ffca8c", // Orange clair
        },
      },

      {
        value: "COMMUNE RURALE MEJJATIA OULED TALEB",
        symbol: {
          type: "simple-fill",
          color: "#fff2b3", // Jaune clair
        },
      },

      {
        value: "COMMUNE RURALE OULED AZZOUZ",
        symbol: {
          type: "simple-fill",
          color: "#ff8cd9", // Rose clair
        },
      },

      {
        value: "COMMUNE RURALE OULED SALEH",
        symbol: {
          type: "simple-fill",
          color: "#d99d5b", // Orange brun
        },
      },

      {
        value: "COMMUNE RURALE SIDI HAJJAJ OUED HASSAR",
        symbol: {
          type: "simple-fill",
          color: "#d4b8ff", // Lavande
        },
      },

      {
        value: "COMMUNE RURALE SIDI MOUSSA BEN ALI",
        symbol: {
          type: "simple-fill",
          color: "#c8f2a9", // Vert clair
        },
      },

      {
        value: "COMMUNE RURALE SIDI MOUSSA BEN MEJDOUB",
        symbol: {
          type: "simple-fill",
          color: "#0d2644", // Bleu foncé
        },
      },
      {
        value: "MUNICIPALITE AIN HARROUDA",
        symbol: {
          type: "simple-fill",
          color: "#38627a", // Bleu gris
        },
      },
      {
        value: "MUNICIPALITE BOUSKOURA",
        symbol: {
          type: "simple-fill",
          color: "#629eb0", // Bleu-vert
        },
      },
      {
        value: "MUNICIPALITE DAR BOUAZZA",
        symbol: {
          type: "simple-fill",
          color: "#b1cdc2", // Vert pâle
        },
      },
      {
        value: "MUNICIPALITE LAHRAOUIYINE",
        symbol: {
          type: "simple-fill",
          color: "#fffcd4", // Jaune pâle
        },
      },
      {
        value: "MUNICIPALITE MANSOURIA",
        symbol: {
          type: "simple-fill",
          color: "#a60000", // Rouge foncé
        },
      },
      {
        value: "MUNICIPALITE MEDIOUNA",
        symbol: {
          type: "simple-fill",
          color: "#c0656b", // Rose foncé
        },
      },
      {
        value: "MUNICIPALITE MOHAMMEDIA",
        symbol: {
          type: "simple-fill",
          color: "#c4bcc7", // Violet pâle
        },
      },
      {
        value: "MUNICIPALITE NOUACEUR",
        symbol: {
          type: "simple-fill",
          color: "#8fb0de", // Bleu clair
        },
      },
      {
        value: "MUNICIPALITE TIT MELLIL",
        symbol: {
          type: "simple-fill",
          color: "#4596e6", // Bleu
        },
      },
    ],
  };

  const communes = new FeatureLayer({
    url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Mapex_WFL1/FeatureServer/3",
    popupTemplate: communePop,
    renderer: commRenderer,
  });
  myMap.add(communes);

  const communes2 = new FeatureLayer({
    url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Mapex_WFL1/FeatureServer/3",
    popupTemplate: communePop,
    renderer: commRenderer2,
  });
  myMap.add(communes2);

  const communes3 = new FeatureLayer({
    url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Mapex_WFL1/FeatureServer/3",
    popupTemplate: communePop,
    renderer: commRenderer3,
  });
  myMap.add(communes3);

  const popupPopulation = new PopupTemplate({
    title: "<b>Population de : {ARRONDISSE}</b>",
    content: [
      {
        type: "media",
        mediaInfos: [
          {
            type: "column-chart",
            caption: "Statistiques de Casablanca",
            value: {
              fields: ["TOTAL1994", "TOTAL2004"],
              normalizeField: null,
              tooltipField: "",
            },
          },
        ],
      },
    ],
  });

  let popRenderer = {
    type: "simple",
    symbol: {
      type: "simple-marker",
      size: 6,
      color: "black",
      outline: {
        width: 0.5,
        color: "white",
      },
    },
  };

  const sizeVisualVariable = {
    type: "size",
    field: "TOTAL2004",
    minDataValue: 3365,
    maxDataValue: 323944,
    minSize: 8,
    maxSize: 30,
  };
  popRenderer.visualVariables = [sizeVisualVariable];

  const popupVoirie = new PopupTemplate({
    title: "Voirie de Casablanca",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "NOM",
            label: "",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "LENGTH",
            label: "Longueur",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: {
              places: 1,
              digitSeparator: true,
            },
            stringFieldOption: "text-box",
          },
        ],
      },
    ],
  });

  const hotelPopup = new PopupTemplate({
    title: "{HOTEL} Info",
    content:
      "<p>Hotel: {HOTEL}</p><p>Category: {CATÉGORIE}</p><p>Address: {ADRESSE}</p><p>Phone: {PHONE1}</p>",
  });

  const bigSurfPopup = new PopupTemplate({
    title: "Info",
    content: "<p>Type: {Type}</p><p>Address: {ADRESSE}</p>",
  });

  let hotelsRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      size: 6,
      color: "white",
      outline: {
        // autocasts as new SimpleLineSymbol()
        width: 0.5,
        color: "black",
      },
    },
  };

  const hotel = new FeatureLayer({
    url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Mapex_WFL1/FeatureServer/0",
    renderer: hotelsRenderer,
    popupTemplate: {
      title: "Hotels",
      content: [
        {
          type: "text",
          text: "Hotel: {HOTEL}<br>Adresse: {ADRESSE}",
        },
        // Ajoutez d'autres éléments de contenu du popup selon vos besoins
      ],
    },
  });

  const bigSurfs = new FeatureLayer({
    url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Mapex_WFL1/FeatureServer/1",
    popupTemplate: bigSurfPopup,
  });

  myMap.add(hotel);
  myMap.add(bigSurfs);

  const parcelLayerSQL = [
    "--Categorie des hotels--",
    "CATÉGORIE = '1*'",
    "CATÉGORIE = '2*'",
    "CATÉGORIE = '3*'",
    "CATÉGORIE = '4*'",
    "CATÉGORIE ='5*' ",
    "CATÉGORIE = '5* luxe'",
    "CATÉGORIE = 'c conf'",
    "CATÉGORIE = 'C.C'",
    "CATÉGORIE = 'CC'",
    "CATÉGORIE = 'cinema'",
    "CATÉGORIE = 'Fermé'",
    "CATÉGORIE ='Maison d''Hôtes' ",
    "CATÉGORIE ='P expo' ",
    "CATÉGORIE = 'RT 1ère CAT. (c'",
    "CATÉGORIE = 'RT 2ème CAT'",
    "CATÉGORIE ='V.V.T 2ème C' ",
  ];
  let whereClause = parcelLayerSQL[0];
  const select = document.createElement("select", "");
  parcelLayerSQL.forEach(function (query) {
    let option = document.createElement("option");
    option.innerHTML = query;
    option.value = query;
    select.appendChild(option);
  });
  view.ui.add(select, "bottom-left");
  select.addEventListener("change", (event) => {
    whereClause = event.target.value;
  });
  function queryFeatureLayer(extent) {
    const parcelQuery = {
      where: whereClause, // Set by select element
      geometry: extent, // Restricted to visible extent of the map
      outFields: ["CATÉGORIE"],
      returnGeometry: true,
    };
    hotel
      .queryFeatures(parcelQuery)
      .then((results) => {
        // console.log("Feature count: " + results.features.length)
        displayResults(results);
      })
      .catch((error) => {
        console.log(error.error);
      });
  }
  select.addEventListener("change", (event) => {
    whereClause = event.target.value;
    queryFeatureLayer(view.extent);
  });
  function displayResults(results) {
    const symbol = {
      type: "simple-marker",
      color: [255, 255, 0],
      outline: {
        color: "black",
        width: 1,
      },
    };
    const popupTemplate = {
      title: "Hotel {HOTEL}",
      content:
        "Adresse : {ADRESSE} <br> Etoile : {Etoile} <br> Categorie:{CATÉGORIE}",
    };
    results.features.map((feature) => {
      feature.symbol = symbol;
      feature.popupTemplate = popupTemplate;
      return feature;
    });
    view.popup.close();
    view.graphics.removeAll();
    view.graphics.addMany(results.features);
  }

  const parcelLayerSQLSurface = [
    "--Types de grandes Surface--",
    "Type ='Acima'",
    "Type ='Grande Surface Spécialisée'",
    "Type ='LABEL VIE'",
    "Type ='Marina'",
    "Type ='Marjane'",
    "Type ='Metro'",
    "Type ='Twin Center'",
  ];
  let whereClauseSurface = parcelLayerSQLSurface[0];
  const select2 = document.createElement("select", "");
  parcelLayerSQLSurface.forEach(function (query) {
    let option = document.createElement("option");
    option.innerHTML = query;
    option.value = query;
    select2.appendChild(option);
  });
  view.ui.add(select2, "bottom-left");
  select2.addEventListener("change", (event) => {
    whereClauseSurface = event.target.value;
  });
  function queryFeatureLayerSurface(extent) {
    const parcelQuery2 = {
      where: whereClauseSurface, // Set by select element
      geometry: extent, // Restricted to visible extent of the map
      outFields: ["Type"],
      returnGeometry: true,
    };
    bigSurfs
      .queryFeatures(parcelQuery2)
      .then((results) => {
        // console.log("Feature count: " + results.features.length)
        displayResultsSurface(results);
      })
      .catch((error) => {
        console.log(error.error);
      });
  }
  select2.addEventListener("change", (event) => {
    whereClauseSurface = event.target.value;
    queryFeatureLayerSurface(view.extent);
  });
  function displayResultsSurface(results) {
    const symbol = {
      type: "simple-marker",
      color: [250, 150, 0],
      outline: {
        color: "black",
        width: 1,
      },
    };
    const popupTemplate = {
      title: "Type",
      content: "Adresse : {Type}",
    };
    results.features.map((feature) => {
      feature.symbol = symbol;
      feature.popupTemplate = popupTemplate;
      return feature;
    });
    view.popup.close();
    view.graphics.removeAll();
    view.graphics.addMany(results.features);
  }

  // Pan vers la gauche
  view.goTo({ target: view.center.offset(-500, 0), duration: 500 });

  // Pan vers la droite
  view.goTo({ target: view.center.offset(500, 0), duration: 500 });

  // Pan vers le haut
  view.goTo({ target: view.center.offset(0, 500), duration: 500 });

  // Pan vers le bas
  view.goTo({ target: view.center.offset(0, -500), duration: 500 });

  const distanceMeasurement = new DistanceMeasurement2D({ view: view });
  const areaMeasurement = new AreaMeasurement2D({ view: view });

  view.ui.add(distanceMeasurement, "top-left"); // Ajoute le widget de mesure de distance à l'interface utilisateur
  view.ui.add(areaMeasurement, "top-left"); // Ajoute le widget de mesure de surface à l'interface utilisateur

  // const legend = new Legend({
  //   view: view,
  // });

  // view.ui.add(legend, 'bottom-left');

  let popRenderer2004 = {
    type: "class-breaks",
    field: "TOTAL2004",
    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 50000, // Remplacez ces valeurs par les plages appropriées pour vos données
        symbol: {
          type: "simple-marker",
          size: 8,
          color: "#6ca0ff",
          outline: {
            width: 0.5,
            color: "black",
          },
        },
      },
      {
        minValue: 50001,
        maxValue: 100000, // Remplacez ces valeurs par les plages appropriées pour vos données
        symbol: {
          type: "simple-marker",
          size: 8,
          color: "violet",
          outline: {
            width: 0.5,
            color: "black",
          },
        },
      },
      {
        minValue: 100001,
        maxValue: 150000, // Remplacez ces valeurs par les plages appropriées pour vos données
        symbol: {
          type: "simple-marker",
          size: 8,
          color: "white",
          outline: {
            width: 0.5,
            color: "black",
          },
        },
      },
      {
        minValue: 200000,
        maxValue: 250000, // Remplacez ces valeurs par les plages appropriées pour vos données
        symbol: {
          type: "simple-marker",
          size: 8,
          color: "#4c689b",
          outline: {
            width: 0.5,
            color: "black",
          },
        },
      },
      {
        minValue: 300000,
        maxValue: 350000, // Remplacez ces valeurs par les plages appropriées pour vos données
        symbol: {
          type: "simple-marker",
          size: 8,
          color: "#343a45",
          outline: {
            width: 0.5,
            color: "black",
          },
        },
      },
    ],
  };

  let popRenderer1994 = {
    type: "class-breaks",
    field: "TOTAL1994",
    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 50000, // Remplacez ces valeurs par les plages appropriées pour vos données
        symbol: {
          type: "simple-marker",
          size: 8,
          color: "#6ca0ff",
          outline: {
            width: 0.5,
            color: "white",
          },
        },
      },
      {
        minValue: 50001,
        maxValue: 100000, // Remplacez ces valeurs par les plages appropriées pour vos données
        symbol: {
          type: "simple-marker",
          size: 8,
          color: "violet",
          outline: {
            width: 0.5,
            color: "black",
          },
        },
      },
      {
        minValue: 100001,
        maxValue: 150000, // Remplacez ces valeurs par les plages appropriées pour vos données
        symbol: {
          type: "simple-marker",
          size: 8,
          color: "white",
          outline: {
            width: 0.5,
            color: "black",
          },
        },
      },
      {
        minValue: 200000,
        maxValue: 250000, // Remplacez ces valeurs par les plages appropriées pour vos données
        symbol: {
          type: "simple-marker",
          size: 8,
          color: "#4c689b",
          outline: {
            width: 0.5,
            color: "black",
          },
        },
      },
      {
        minValue: 300000,
        maxValue: 350000, // Remplacez ces valeurs par les plages appropriées pour vos données
        symbol: {
          type: "simple-marker",
          size: 8,
          color: "#343a45",
          outline: {
            width: 0.5,
            color: "black",
          },
        },
      },
    ],
  };

  const population = new FeatureLayer({
    url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Mapex_WFL1/FeatureServer/6",
    popupTemplate: popupPopulation,
    renderer: popRenderer1994,
  });

  const population2 = new FeatureLayer({
    url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Mapex_WFL1/FeatureServer/6",
    popupTemplate: popupPopulation,
    renderer: popRenderer2004,
  });

  // const renderer = new PieChartRenderer();
  // population.renderer = {
  //   type: "pie-chart",
  //   attributes: [
  //     {
  //       field: "TOTAL2004",
  //       label: "Population 2004",
  //       color: "red",
  //     },
  //     {
  //       field: "TOTAL1994",
  //       label: "Population 1994",
  //       color: "blue",
  //     },
  //   ],
  // };

  myMap.add(population);
  myMap.add(population2);

  let voirieRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-line",
      color: "blue",
      width: "2px",
      style: "short-dot",
    },
  };

  const voirie = new FeatureLayer({
    url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Mapex_WFL1/FeatureServer/2",
    popupTemplate: popupVoirie,
    renderer: voirieRenderer,
  });
  myMap.add(voirie);

  const basemapGallery = new BasemapGallery({
    view: view,
  });

  const basemapGalleryButton = document.createElement("button");
  basemapGalleryButton.textContent = "Basemap Gallery";
  basemapGalleryButton.classList.add("custom-button");
  basemapGalleryButton.addEventListener("click", function () {
    if (basemapGallery.container.style.display === "none") {
      basemapGallery.container.style.display = "block";
      basemapGalleryButton.style.zIndex = "2";
    } else {
      basemapGallery.container.style.display = "none";
      basemapGalleryButton.style.zIndex = "auto";
    }
  });

  view.ui.add(basemapGalleryButton, "top-right");
  // view.ui.add(basemapToggle, "top-right");
  view.ui.add(basemapGallery, "top-right");

  const customStyles = document.createElement("style");
  customStyles.textContent = `
            .custom-button {
              background-color: #0079c1;
              color: #ffffff;
              padding: 10px 20px;
              border: none;
              border-radius: 4px;
              font-size: 14px;
              font-weight: bold;
              cursor: pointer;
              position: relative;
              z-index: auto;
            }
            .custom-button:hover {
              background-color: #005da6;
            }
          `;
  document.head.appendChild(customStyles);

  basemapGallery.container.style.display = "none";

  let layerList = new LayerList({
    view: view,
  });
  // Adds widget below other elements in the top left corner of the view
  // view.ui.add(layerList, {
  //   position: "top-left",
  // });

  const bgExpand3 = new Expand({
    view: view,
    content: layerList,
  });

  view.ui.add(bgExpand3, "bottom-right");

  var searchWidget = new Search({
    view: view,
  });

  view.ui.add(searchWidget, "top-right");

  var legend = new Legend({
    view: view,
  });

  const basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: "arcgis-dark-gray",
  });

  // view.ui.add(legend, "bottom-right");
  const bgExpand2 = new Expand({
    view: view,
    content: legend,
  });
  view.ui.add(bgExpand2, "bottom-right");
});
