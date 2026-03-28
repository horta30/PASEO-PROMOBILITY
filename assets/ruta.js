// ══════════════════════════════════════════
// PASEO PROMOBILITY — Datos oficiales
// KMZ: Paseo_Promobility_TOUR.kmz
// Grabada: 15 marzo 2026 · Pablo Horta
// ══════════════════════════════════════════

const PM = {

  meta: {
    nombre: 'Paseo Promobility',
    zona: 'Cordillera de la Costa, V Región',
    distancia: 25.9,
    alturaMax: 655,
    duracion: 31,
    fecha: '15 marzo 2026'
  },

  // 9 Waypoints oficiales depurados en Google Earth Pro
  waypoints: [
    {
      id:1, name:'INICIO / FIN', sub:'Caballito de Palo',
      lat:-32.69584, lon:-71.40572, ele:101, km:0, type:'startend',
      desc:'Punto de partida y llegada del circuito. Zona amplia para estacionamiento y campamento de marcas. Verificar presión de neumáticos y combustible antes de partir.',
      specs:[['101m','Altitud'],['0 km','Inicio'],['Asfalto','Terreno'],['≈20°C','Temp.']],
      alert:{t:'✓ Inicio del circuito', b:'Punto de reunión del grupo. Briefing de ruta aquí antes de salir.'}
    },
    {
      id:2, name:'WP2', sub:'Ascenso Cordillera — 603m',
      lat:-32.71138, lon:-71.34734, ele:603, km:5.2, type:'mid',
      desc:'Tramo de ascenso sostenido por la cordillera de la costa. Curvas cerradas con vistas al interior. El punto más alto está a menos de 500m adelante.',
      specs:[['603m','Altitud'],['5.2 km','Recorrido'],['Sinuoso','Terreno'],['≈15°C','Temp.']],
      alert:{t:'🔺 Ascenso técnico', b:'Curvas cerradas. Velocidad recomendada 40–60 km/h. Mantener distancia entre motos.'}
    },
    {
      id:3, name:'INTERSECCIÓN', sub:'La Canela',
      lat:-32.70312, lon:-71.33135, ele:350, km:7.8, type:'mid',
      desc:'Intersección clave en la ruta. Mantener derecha. Señalización reducida en esta zona.',
      specs:[['350m','Altitud'],['7.8 km','Recorrido'],['Cruce','Tipo'],['≈16°C','Temp.']],
      alert:{t:'⚠ Intersección', b:'Reducir velocidad. Verificar que todo el grupo pase antes de continuar.'}
    },
    {
      id:4, name:'STOP', sub:'Bajada Peligrosa — CIMA 655m',
      lat:-32.68066, lon:-71.37880, ele:655, km:8.9, type:'summit',
      desc:'El techo de la ruta. Vista panorámica 360°. Ideal para fotografía de producto y pausa de experiencia de marca. Descenso peligroso a continuación.',
      specs:[['655m','Altitud'],['8.9 km','Recorrido'],['Cresta','Terreno'],['≈11°C','Temp.']],
      alert:{t:'🛑 PARADA OBLIGATORIA', b:'Bajada peligrosa. Revisar frenos. Zona fotográfica premium.'}
    },
    {
      id:5, name:'WP4', sub:'La Canela',
      lat:-32.68094, lon:-71.35586, ele:208, km:13.5, type:'mid',
      desc:'Sector rural tranquilo de La Canela. Descenso activo, la ruta se ensancha. Microclima propio con vegetación mediterránea.',
      specs:[['208m','Altitud'],['13.5 km','Recorrido'],['Bajada','Terreno'],['≈18°C','Temp.']],
      alert:{t:'↘ Descenso activo', b:'Posible grava suelta en curvas. Atención a animales.'}
    },
    {
      id:6, name:'WP5', sub:'Rungue Sur',
      lat:-32.67734, lon:-71.38605, ele:243, km:17.1, type:'mid',
      desc:'Valle interior de Rungue Sur. Mayor vegetación y fauna local. Ritmo más fluido. Zona de interés para actividades de naturaleza.',
      specs:[['243m','Altitud'],['17.1 km','Recorrido'],['Valle','Terreno'],['≈19°C','Temp.']],
      alert:{t:'🌿 Fauna local', b:'Posible cruce de animales. Velocidad prudente.'}
    },
    {
      id:7, name:'INTERSECCIÓN', sub:'Caballito de Palo Alto',
      lat:-32.68898, lon:-71.39867, ele:200, km:19.2, type:'mid',
      desc:'Intersección alta antes del descenso final. Continuar recto hacia el descenso a Caballito de Palo.',
      specs:[['200m','Altitud'],['19.2 km','Recorrido'],['Cruce','Tipo'],['≈19°C','Temp.']],
      alert:{t:'→ Seguir recto', b:'Intersección con desvío. Mantener la ruta hacia el cierre del circuito.'}
    },
    {
      id:8, name:'OFF ROAD', sub:'Test Ride Zone',
      lat:-32.69616, lon:-71.40496, ele:43, km:21.5, type:'mid',
      desc:'Zona habilitada para test ride de motos adventure. Terreno irregular ideal para probar capacidades fuera del asfalto.',
      specs:[['43m','Altitud'],['21.5 km','Recorrido'],['Off road','Terreno'],['≈21°C','Temp.']],
      alert:{t:'🏍 Test Ride Zone', b:'Solo motos adventure/enduro. Zona de activación de marcas.'}
    },
    {
      id:9, name:'INTERSECCIÓN', sub:'Ruta Puchuncaví–Maite',
      lat:-32.71661, lon:-71.40682, ele:50, km:24.1, type:'mid',
      desc:'Intersección con la ruta principal Puchuncaví–Maite. Último punto antes del regreso. A 1.8 km de la llegada.',
      specs:[['50m','Altitud'],['24.1 km','Recorrido'],['Asfalto','Terreno'],['≈21°C','Temp.']],
      alert:{t:'⚠ Ruta principal', b:'Precaución con tráfico. Llegar en grupo. Casi en la meta.'}
    }
  ],

  // Destino final — siempre Caballito de Palo
  meta_lat: -32.69584,
  meta_lon: -71.40572,

  // Perfil de elevación (km%, metros)
  elevacion: [
    [0,101],[3,130],[6,165],[9,210],[12,255],[15,305],[18,365],[21,425],
    [24,495],[27,548],[30,612],[33,655],[36,640],[39,600],[42,555],[45,510],
    [48,460],[51,422],[54,382],[57,342],[60,302],[63,268],[66,232],[69,212],
    [72,222],[75,242],[78,272],[81,297],[84,312],[87,292],[90,262],[93,222],
    [96,182],[99,142],[102,102],[105,67],[108,47],[111,43],[114,49],[117,56],
    [120,76],[123,91],[126,101],[129,109]
  ],

  // Ruta GPS — coordenadas [lon, lat]
  ruta: [[-71.380807,-32.715752],[-71.381136,-32.715706],[-71.381393,-32.715394],[-71.381138,-32.715063],[-71.380435,-32.714139],[-71.380038,-32.714789],[-71.379054,-32.715506],[-71.377293,-32.714755],[-71.375145,-32.715072],[-71.373288,-32.715521],[-71.371618,-32.715411],[-71.369867,-32.714603],[-71.367429,-32.714367],[-71.366389,-32.713651],[-71.365224,-32.714025],[-71.363769,-32.71426],[-71.361681,-32.714009],[-71.360238,-32.713346],[-71.358352,-32.712291],[-71.356762,-32.71259],[-71.355038,-32.71342],[-71.354658,-32.712909],[-71.353505,-32.712535],[-71.352007,-32.712094],[-71.351225,-32.711358],[-71.352111,-32.710775],[-71.351924,-32.709574],[-71.350837,-32.709942],[-71.350102,-32.711564],[-71.348717,-32.712304],[-71.347602,-32.712148],[-71.347085,-32.710621],[-71.345694,-32.710564],[-71.342938,-32.710988],[-71.340804,-32.711164],[-71.33907,-32.710894],[-71.3382,-32.709666],[-71.33813,-32.708298],[-71.338835,-32.707599],[-71.33915,-32.706903],[-71.339397,-32.706307],[-71.339834,-32.705394],[-71.339641,-32.703449],[-71.339417,-32.702627],[-71.338625,-32.703492],[-71.33762,-32.702921],[-71.336437,-32.701814],[-71.335563,-32.702614],[-71.333692,-32.702786],[-71.331752,-32.702634],[-71.330618,-32.702883],[-71.331357,-32.703122],[-71.33039,-32.703328],[-71.330034,-32.702666],[-71.32956,-32.702129],[-71.328704,-32.70219],[-71.327776,-32.701687],[-71.326615,-32.701555],[-71.326702,-32.700648],[-71.327187,-32.699542],[-71.328018,-32.698863],[-71.329252,-32.698527],[-71.33029,-32.698602],[-71.330918,-32.699143],[-71.331328,-32.699252],[-71.332243,-32.698638],[-71.333098,-32.699196],[-71.333704,-32.699241],[-71.333033,-32.698179],[-71.332803,-32.697359],[-71.332287,-32.696576],[-71.332671,-32.695374],[-71.333706,-32.694507],[-71.334537,-32.694143],[-71.335677,-32.693372],[-71.336912,-32.692268],[-71.337913,-32.691647],[-71.339347,-32.691563],[-71.340269,-32.691176],[-71.340729,-32.690398],[-71.341036,-32.689421],[-71.341896,-32.688377],[-71.343208,-32.687644],[-71.344664,-32.686613],[-71.345999,-32.685559],[-71.346958,-32.684235],[-71.347965,-32.683327],[-71.349358,-32.682095],[-71.350945,-32.681216],[-71.352638,-32.680493],[-71.353878,-32.680512],[-71.354877,-32.681242],[-71.356415,-32.680676],[-71.357745,-32.679326],[-71.358869,-32.678971],[-71.360186,-32.678546],[-71.361505,-32.678111],[-71.363011,-32.677716],[-71.364748,-32.6776],[-71.366301,-32.678069],[-71.367886,-32.678601],[-71.36952,-32.678788],[-71.371143,-32.679102],[-71.372303,-32.679228],[-71.372731,-32.677692],[-71.373841,-32.677094],[-71.374442,-32.677953],[-71.374655,-32.678846],[-71.375857,-32.67901],[-71.37584,-32.680292],[-71.376946,-32.680145],[-71.378371,-32.680563],[-71.379184,-32.680964],[-71.379861,-32.681094],[-71.380751,-32.680447],[-71.380939,-32.679194],[-71.381688,-32.679011],[-71.382948,-32.67968],[-71.383301,-32.678731],[-71.38367,-32.678029],[-71.384452,-32.677517],[-71.385076,-32.677079],[-71.385946,-32.677292],[-71.386434,-32.678108],[-71.388043,-32.678216],[-71.388484,-32.678549],[-71.387991,-32.679763],[-71.388853,-32.681245],[-71.38999,-32.682503],[-71.390821,-32.683301],[-71.391609,-32.683096],[-71.391616,-32.681735],[-71.391889,-32.681005],[-71.392729,-32.682046],[-71.393712,-32.683301],[-71.394385,-32.684453],[-71.395463,-32.683919],[-71.396751,-32.683683],[-71.398153,-32.683747],[-71.399046,-32.684962],[-71.399542,-32.686301],[-71.398845,-32.688327],[-71.39893,-32.689242],[-71.400227,-32.690247],[-71.401029,-32.691817],[-71.401865,-32.693544],[-71.403627,-32.694626],[-71.405147,-32.695388],[-71.405945,-32.69586],[-71.406229,-32.696032],[-71.405722,-32.69587],[-71.405162,-32.696207],[-71.404638,-32.696231],[-71.40516,-32.696176],[-71.404801,-32.696303],[-71.405107,-32.696157],[-71.405561,-32.695974],[-71.40607,-32.695908],[-71.40624,-32.69644],[-71.405835,-32.697478],[-71.405382,-32.698702],[-71.405683,-32.700484],[-71.406495,-32.702542],[-71.406695,-32.704267],[-71.405836,-32.706125],[-71.405326,-32.708821],[-71.405141,-32.711327],[-71.405445,-32.713383],[-71.405731,-32.715058],[-71.406473,-32.716021],[-71.406704,-32.71664],[-71.405288,-32.717116],[-71.404062,-32.717704],[-71.40249,-32.717744],[-71.400956,-32.717771],[-71.39932,-32.717088],[-71.397285,-32.716322],[-71.394776,-32.715416],[-71.392819,-32.715443],[-71.389893,-32.715765],[-71.386907,-32.716101],[-71.383716,-32.716453],[-71.382164,-32.716346],[-71.381384,-32.715341]]

};
