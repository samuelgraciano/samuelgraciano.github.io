var http = require("http");
var fs = require("fs");
var url = require("url");




// Crea el servidor Web, que será atendido por la funcion fnServer
var server = http.createServer( fnServer );

// funcion que atiende las peticiones
function fnServer(req, res){
  console.log( "Peticion recibida: " + req.url );
  
// Descompone la URL en sus componentes
  var params = url.parse( req.url );
// convierte las partes del path en un array
  var folders = params.pathname.split("/");
  
  var archivo = params.pathname;

  console.log( "1. antes del if" );
  
  if( req.url == "/login"){
	  console.log( "1.1 Si se cumple" );
	  /// Verificar el usuario cuando llaman /login
	  verificarUsuario( req, res );
  } else if( req.url == "/registro"){
	  console.log("Me piden crear un usuario");
	  registrarUsuario( req, res );
  }
  else if ( req.url == "/" ){
	  console.log( "Pidieron el raiz /" );
	  res.end( "Hola Heroku!" );
  }
  
	  else {
	  console.log( "1.2. No se cumple" );
    paginaPorDefecto( req, res );
  }
  
  console.log( "2. Cierra IF" );

}
// Lista de usuarios del sistema
var usuarios = [
	{ usuario: "yo", clave: "secreta"},
	{ usuario: "tu", clave: "publica"}
];

function registrarUsuario( req, res ){
	
	req.on( 'data', yaLlegoElPayload );
	
	function yaLlegoElPayload( content ){
		var usr = JSON.parse( content );
		console.log( usr );
		// Añade a la lista de usuarios
		usuarios.push(  usr );
		console.log( "usuarios registrados actualmente" );
		console.log( usuarios );
		
		res.end("Ya lo guarde");
	}
	
}

function verificarUsuario( req, res ){
	console.log("Entro a verificarUsuario");
	// el evento data se ejecuta cuando este completo el content del request
	req.on( 'data', datosListos );
	
	function datosListos( content ){
		console.log( "Entro a datosListos" );
		// 1. Deserializar el objeto, que viene en content como una cadena
		var usr = JSON.parse( content );
		console.log( usr );
		// 2. Buscarlo en la lista de usuarios
		if( usuarioExiste( usr.email, usr.clave ) ){
		// 3. Enviar una respuesta
			res.writeHead(200, { 'content-type': 'text/html' });
			res.end( "Login correcto" );
		} else {
			res.writeHead(401, { 'content-type': 'text/html' });
			res.end( "Usuario incorrecto" );
		}
			
		
	}
}
/// Busca en el vector si el usuario y la clave son correctos
function usuarioExiste( nombre, clave ){
	for( var i=0; i < usuarios.length; i++ ){
		if( usuarios[i].usuario == nombre && usuarios[i].clave == clave )
			return true;
	}
	
	return false;
}


function paginaPorDefecto(req, res){
	var archivo = req.url;
	
  try{
	// cambie el archivo home.html por el el desea mostrar
	  var readStream = fs.createReadStream(  __dirname + archivo, {} );

	// Espera a que comience la conversación para entregar el archivo
	  readStream.on('open', function () {
		  res.writeHead(200, { });
		  readStream.pipe(res);
		});
		
	  readStream.on( 'error', hayError );
	  
	  function hayError(error){
		console.log( "Ocurrió un error" );
		console.log( error );
		
		res.writeHead(404, { 'content-type': 'text/html' });
		
		res.write( '<h1>Archivo no encontrado</h1>' );
		res.write( 'verifique la URL por favor' );
		res.end();
		// Equivalen a: res.end( 'Archivo no encontrado' );
	  } 
	  

  } catch ( error ) {
		console.log( "Ocurrió un error" );
		console.log( error );
	  
  }
}

// Si no recibe un numero de puerto por parametro en la linea de comando, usa el 8080
var port = process.env.PORT || 80 ;

// Ejecuta el servidor
server.listen( port );

console.log( "Servidor HTTP corriendo en el puerto " + port);
console.log( "Ctrl-c para terminar");








