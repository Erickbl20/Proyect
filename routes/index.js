var express = require('express');
var router = express.Router();
var db = require('../servi');

//todos los datos 
router.post('/api/Datosxid',db.Datosxid  );
//  por id de pais
router.post('/api/Datos',db.Datos);
//Pivot de datos
router.post('/api/Pivot_Datos',db.Pivot_Datos);
//todos los datos xnombre
router.post('/api/Datosxnomobre',db.Datosxnombre  );
//todos los paises
router.post('/api/paises',db.paises  );

module.exports = router;


