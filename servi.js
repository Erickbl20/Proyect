const path = require('path');
var promise = require('bluebird');
const express = require("express");
const restler = require('restler');
const app = express();

const bodyParser = require('body-parser');


// conexcion bd 
var options = {
  // Initialization Options
  promiseLib: promise,
  error(error, e) {
    if (e.cn) {
      console.log('CN:', e.cn);
      console.log('EVENT:', error.message || error);
    }
  }
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://slgnwcrm:0RKep0AzTuANmW2nKXAF60jcC3hbtEWu@raja.db.elephantsql.com:5432/slgnwcrm';
var db = pgp(connectionString);
db.connect()
  .then(obj => {
    console.log('Conectetado Correctamente')
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

///////////// consultas BD//////////////

async function Datos(req, res, next) {
  // Buscamos y validamos los datos enviados
  const [visita] = await Promise.all([
    db.any(
      " select nombre_tipo , " +
      "  sum(case when personas.id_persona=personas.id_persona then 1 else 0 end ) from tipos  " +
      "  inner join personas on personas.tipo=tipos.id_tipo   " +
      "   inner join paises on paises.id_pais=personas.id_pais " +
      "  group by nombre_tipo "
    )
  ]);
  console.log(visita)
  res.status(200).json({
    visita
  });
};
async function Datosxid(req, res, next){
  console.log(req.body)
  let dato = req.body.id_pais 
  console.log(dato)
  db.any('select nombre_tipo , sum(case when personas.id_persona=personas.id_persona then 1 else 0 end ) from tipos  '+
         ' inner join personas on personas.tipo=tipos.id_tipo inner join paises on paises.id_pais=personas.id_pais  WHERE paises.id_pais = $1 group by nombre_tipo ', [dato])
    .then(function(data) {
      res.status(200).json({
        data
      });
    })
    .catch(function(error) {
        // error;
    });
}
async function Pivot_Datos (req, res, next){
  var jsonToPivotjson = require("json-to-pivot-json");
  var options = {
    row: "nombre_tipo",
    column: "nombres",
    value: "nombre"
  };

  const [Pivot] = await Promise.all([
    db.any(
     'select personas.nombres, personas.edad , paises.nombre,tipos.nombre_tipo from '+
     ' personas inner join tipos   on personas.tipo=tipos.id_tipo '+
      'inner join paises on paises.id_pais=personas.id_pais '
    )
  ]);
 // console.log(Pivot)
 var output = jsonToPivotjson(Pivot, options);
  res.status(200).json({
    output
  });
}
async function Datosxnombre(req,res,next){
  let dato = req.body.nombre ;
  db.any('select nombre_tipo , sum(case when personas.id_persona=personas.id_persona then 1 else 0 end ) from tipos  '+
  ' inner join personas on personas.tipo=tipos.id_tipo inner join paises on paises.id_pais=personas.id_pais  WHERE paises.nombre = $1 group by nombre_tipo ', [dato])
.then(function(data) {
res.status(200).json({
 data
});
})
.catch(function(error) {
 // error;
});
}
async function paises(req,res,next){
  let dato = req.body.nombre ;
  db.any('select * from paises ')
.then(function(data) {
res.status(200).json({
 data
});
})
.catch(function(error) {
 // error;
});
}
// exportar modules
module.exports = {
  Datos: Datos,
  Datosxid  : Datosxid ,
  Pivot_Datos : Pivot_Datos ,
  Datosxnombre : Datosxnombre ,
  paises : paises
};
















