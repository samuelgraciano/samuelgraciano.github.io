//	Hacer tienda online de informatica usando: HTML, CSS, JS
//	En el codigo javascript hay que hacer la base de datos de los productos con un vector por ejemplo...




//BASE DE DATOS
	var productos = ["Bolsas de drenaje", "Bolsa2000ml", "Bolsa de pierda", "NEBULIZADOR", "PULSO OXIMETRO", "Producto Agotado", "Producto agotado", "Producto agotado", "Producto agotado"];
	var imgGrandes = ["imagess/producto1.jpg", "imagess/producto2.jpg", "img/productos/3.jpg", "imagess/producto3.jpg", "imagess/producto4.jpg", "imagess/producto5.jpg", "img/productos/7.jpg", "img/productos/8.jpg", "img/productos/9.jpg"];
	var imgPeque = ["img/productos/1m.jpg", "img/productos/2m.jpg", "img/productos/3m.jpg", "img/productos/4m.jpg", "img/productos/5m.jpg", "img/productos/6m.jpg", "img/productos/7m.jpg", "img/productos/8m.jpg", "img/productos/9m.jpg"];
	var precios = [33000, 169000, 360000, 36000, 11000, 540000, 21000, 66000, 25000];
	
	
	var stock = [5, 2, 8, 3, 10, 0, 0, 0, 0];
	var precioTransporte = [6000, 12000, 20000, "gratis"];
	var IVA = 0.19;
	var uniUser;
	
	
//JAVASCRIPT A EJECUTARSE UNA VEZ CARGADA LA PAGINA:	
	window.onload = function(){

	
		//Se cargan los productos dentro del HTML de forna dinamica haciendo uso de los datos de la base de datos, como si de un PHP se tratase:
		var DIVS = document.getElementsByName("DIVS");
		for (i in productos){
			DIVS[i].innerHTML = '<a id="imgG'+i+'" href="' +imgGrandes[i]+ '"><img id="imgP'+i+'" class="imagen" src="' +imgPeque[i]+ '"></a><div class="etiquetas"><b><span id="pro'+i+'">' +productos[i]+ '</span>: <span id="pre'+i+'">' +precios[i]+ '$</span></b></div><div class="stock">Disponibles <span id="uni'+i+'">' +stock[i]+ '</span> <br/>¿Cuantas Unidades quiere?: <input class="uniBien" type="number" id="uniUser'+i+'" name="uniUser" value="0" size="4" /></div>';
		}
	
	
		//Rellena el campo dia y año, de la fecha de nacimiento y tarjeta de credito:
		//Fecha de nacimiento
		var fecha = new Date();
		var anio = fecha.getFullYear();
				
		for (var i=1;i<=31;i++){
			document.getElementById("fechaNacimientoDia").innerHTML = document.getElementById("fechaNacimientoDia").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
		}
				
		for (var i=anio;i>=(anio-110);i--){
			document.getElementById("fechaNacimientoAnio").innerHTML = document.getElementById("fechaNacimientoAnio").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
		}

		//Tarjeta de credito:
		for (var i=1;i<=12;i++){
			document.getElementById("mesTarjeta").innerHTML = document.getElementById("mesTarjeta").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
		}

		for (var i=anio;i<=(anio+21);i++){
			document.getElementById("anioTarjeta").innerHTML = document.getElementById("anioTarjeta").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
		}

		
	
		//Botones que llevaran a cabo la ejecucion de determinadas secuencias de codigo JavaScript:
		document.getElementById("botonTotal").onclick = validaLasUnidades;
		document.getElementById("botonDatos").onclick = pideDatos;
		document.getElementById("botonPago").onclick = validaDatosPersonales;
		document.getElementById("botonConfirmar").onclick = validaDatosPago;
	}

	
	
	
	/*-------------------COMIENZAN LAS FUNCIONES-------------------*/
	
	
	//FUNCION DE VALIDACION DE UNIDADES:
	function validaLasUnidades(elEvento) {
		
		var todoBien = true;
		uniUser = document.getElementsByName("uniUser");
		
		
		for (i in productos){
		
			if ( uniUser[i].value == "" || uniUser[i].value > stock[i] || uniUser[i].value < 0 ){
				
				todoBien = false;
				uniUser[i].className = "uniMal";
								
				//Modifica el css para quitar los formularios:
				document.getElementById("todo").className = "todoNo";
				document.getElementById("menu").className = "menuNo";
				document.getElementById("divZonaCompra").className = "divZonaCompraNo";
				document.getElementById("divTotal").className = "divsNo";
/**/			document.getElementById("divDatos").className = "divsNo";
/**/			document.getElementById("divPago").className = "divsNo";				
				
				//Deshabilita el boton de datos personales:
				document.getElementById("botonDatos").disabled = true;
/**/			document.getElementById("botonDatos").disabled = true;
/**/			document.getElementById("botonDatos").disabled = true;				
				
				//Con solo un error se para la validacion de unidades:
				return;
			}
			else{
				todoBien = true;
				uniUser[i].className = "uniBien";
			}
		}

		//Si no ha habido ni un solo error, se ejecuta la siguiente funcion que se encarga de cargar el carro de la compra:
		if (todoBien){
			calculaElTotal();
		}
	}
	
	
	
