//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Lugares  = mongoose.model('lugares');

//GET - Return all lugares in the DB
exports.findAllLugares = function(req, res) {
	Lugares.find(function(err, listaLugares) {
    if(err) res.send(500, err.message);

    console.log('GET api/Lugares')
		res.status(200).jsonp(listaLugares);
	});
};

//GET - Return a lugar with specified ID
exports.findById = function(req, res) {
	Lugares.findById(req.params.id, function(err, lugares) {
    if(err) return res.send(500, err.message);

    console.log('GET api/lugares/' + req.params.id);
		res.status(200).jsonp(lugares);
	});
};

//POST - Insert a new lugar in the DB
exports.addLugar = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var lugaresJson = new Lugares({
		title:    req.body.title,
		image: 	  req.body.image,
		description:  req.body.description,
		latitud:   req.body.latitud,
		longitud:  req.body.longitud,
		qr:    req.body.qr,
		direccion:  req.body.direccion,
		tipo: req.body.tipo
	});


	lugaresJson.save(function(err, lugares) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(lugaresJson);
	});

	//lugaresJson.save(function(err, lugares) {
		//if(err) return res.send(500, err.message);
		//quitar ahora
		/*asi estaba
	console.log('GET api/Lugares');
    res.status(200).jsonp(lugaresJson);*/
	//});
};

/*exports.deleteLugar = function(req, res) {
    Lugares.findById({_id:req.params.id}).exec(function(err, lugares){
        if(lugares) {
           lugares.remove();
        }
    });
}*/

exports.deleteLugar = function(req, res) {  
    Lugares.findById({_id:req.params.id}).exec(function(err, lugares){
        lugares.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};