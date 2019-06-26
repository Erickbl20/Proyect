var express = require('express');
var router = express.Router();
var db = require('../servi');

//todos los datos 
router.post('/api/Datosxid',db.Datosxid  );
//  por id de pais
router.post('/api/Datos',db.Datos);
//Pivot de datos
router.post('/api/Pivot_Datos',db.Pivot_Datos);

module.exports = router;


