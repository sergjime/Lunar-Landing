//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;

var fuelValor = 100;
var terminado = false;

//al cargar por completo la página...
window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");
	combustible.innerHTML = fuelValor;

	
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = function(event){
		event.onkeyCode = 32;
		motorOn();
	}
	document.onkeyup = motorOff;
	
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){

	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	altura.innerHTML=y.toFixed(2);


	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();
		alert("Has terminado con "+v.toFixed(2)+" m/s de velocidad\nHas terminado con "+fuelValor.toFixed(2)+" l de fuel\nHas terminado con "+y.toFixed(2)+" m de altura")
		document.getElementById("velocidad").innerHTML="";
		document.getElementById("altura").innerHTML="";
		terminado = true;
		if (v>3){ 
			lose();
		}
		else { 
			win();
		}
	}
}
function motorOn(){
	//el motor da aceleración a la nave
	if (!fuelValor <= 0) {
		document.getElementById("naveIcono").src = "img/NaveFuego.png";
		a=-g;
		//mientras el motor esté activado gasta combustible
		if (timerFuel==null)
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
	}
}
function motorOff(){
	document.getElementById("naveIcono").src = "img/nave.png";
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	fuelValor-=0.1;
	if (fuelValor < 0 ) fuelValor = 0;
	combustible.innerHTML = fuelValor.toFixed(2);
	if (fuelValor === 0) {
		motorOff();
	}
}
function win(){	
	document.getElementById("nave_img").src = "img/nave.png";
	document.getElementById("win").style.display = "block";
	stop();

}

function lose(){
	document.getElementById("nave_img").src = "img/nave_rota.png";
	document.getElementById("lose").style.display = "block";
	stop();
	
	
}