//1.Seleccionando Canvas
const canvas = document.querySelector("canvas")

//2.Definir el contexto 2D
 const ctx = canvas.getContext("2d")

 //Manipulacion del DOM
 const gameOver = document.getElementById("gameOver");
 const win = document.getElementById("win");

//Modificar propiedades del txt 
 ctx.font = "24px Arial"
 ctx.fillStyle = "white";


//Cargar las imagenes bici
const t0 = new Image()
const t1 = new Image()
const t2 = new Image()
const t3 = new Image()
const t4 = new Image()
const t5 = new Image()
const t6 = new Image()
const t7 = new Image()
t0.src = "./img/0.gif"
t1.src = "./img/1.gif"
t2.src = "./img/2.gif"
t3.src = "./img/3.gif"
t4.src = "./img/4.gif"
t5.src = "./img/5.gif"
t6.src = "./img/6.gif"
t7.src = "./img/7.gif"
const bikerSprites = [t0, t1, t2, t3, t4, t5, t6, t7] 

//Cargar las imagenes del enemigo
const e0 = new Image()
const e1 = new Image()
const e2 = new Image()
const e3 = new Image()
e0.src = "./img/car/c0.gif"
e1.src = "./img/car/c1.gif"
e2.src = "./img/car/c2.gif"
e3.src = "./img/car/c3.gif"
const carSprites = [e0, e1, e2, e3] 

//Cargar imagen piedra
const p0 = new Image()
const p1 = new Image()
const p2 = new Image()
const p3 = new Image()
p0.src = "./img/piedra/0.gif"
p1.src = "./img/piedra/1.gif"
p2.src = "./img/piedra/2.gif"
p3.src = "./img/piedra/3.gif"
const piedraSprites = [p0, p1, p2, p3]

//Cargar pizza 
const pizza0 = new Image()
const pizza1 = new Image()
const pizza2 = new Image()
const pizza3 = new Image()
pizza0.src = "./img/pizza/0.gif"
pizza1.src = "./img/pizza/1.gif"
pizza2.src = "./img/pizza/2.gif"
pizza3.src = "./img/pizza/3.gif" 
const pizzaSprites = [pizza0, pizza1, pizza2, pizza3]


//Cargar imagen explosion
const explosion0 = new Image()
const explosion1 = new Image()
const explosion2 = new Image()
const explosion3 = new Image()
explosion0.src = "./img/boom/0.gif"
explosion1.src = "./img/boom/1.gif"
explosion2.src = "./img/boom/2.gif"
explosion3.src = "./img/boom/3.gif"
const explosionSpites = [explosion0, explosion1, explosion2, explosion3]



//medidas canvas
//ancho 1000, alto 600
//DIMENSIONES piedra 50 x50


//Lista de enemigos y de piedras
let enemigos = []
let piedrasArreglo = []
let pizzaArreglo = []
let explosionArreglo = []

 
 //definir personaje
 class Character{
    //recibe el ctx para dibujarse
    constructor(ctx, posicionX, posicionY, imagen){
        this.nombre = "Peter"
        this.vidas = 3
        this.posicionX = posicionX
        this.posicionY= posicionY
        this.ctx = ctx
        this.imagen = imagen
        this.puntuacion = 0;

    }
    // metodo adelante
    adelante(){
        //Delimitar rango de movimiento 
        if (this.posicionX + 200 < 1000 ){
        //sumarle a su posicion en X
        this.posicionX = this.posicionX + 25
        }
        
    }
    //metodo atras
    atras(){
        //Delimitar rango de movimiento 
        if (this.posicionX > 0 ){
        this.posicionX = this.posicionX - 25
        }
    }
    //metodo subir
    subir(){
        //Delimitar rango de movimiento 
        if (this.posicionY > 0 ){
        this.posicionY = this.posicionY - 25
        }
    }
    //metodo bajar
    bajar(){
        if (this.posicionY + 110 < 600){
        this.posicionY = this.posicionY + 25
        }
    }
    //metodo brincar 
    brincar(){
        console.log("brincar");
        this.posicionY = this.posicionY - 52
        setTimeout(()=>{
            this.posicionY = this.posicionY + 52
        },4000)
    }
    //metodo dibujarse bici
    dibujarse(){
        this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY,150,110)
        //vidas y su posicion 
        this.ctx.fillText(`Vidas: ${this.vidas}`, 40, 40)
        //Pizzas recolectadas y su posicion 
        this.ctx.fillText(`Puntuacion: ${this.puntuacion}`, 300, 40)
    }

    //metodo perder vida
    perderVida(){
        this.vidas = this.vidas - 1
    }

    //metodo dispara
    disparar(){
        console.log("disparo");
        if (piedrasArreglo.length<10){
            const piedra = new Piedra(ctx, personaje.posicionX + 110 , personaje.posicionY + 50, p0)
            //Agregamos al arreglo
            piedrasArreglo.push(piedra)
        }
    }
    
    //Sumar puntos por recoreclectar pizza
    recoleccion(){
        console.log("recogiste pizza");
        this.puntuacion = this.puntuacion + 10

    }
 }

 //Instancia de mi personaje
    const personaje = new Character(ctx,40,450, t0)
    console.log(personaje)

//Definir enemigo
    class Enemy{
    //recibe el ctx para dibujarse
        constructor(ctx, posicionX, posicionY, imagen){
            this.posicionX = posicionX
            this.posicionY= posicionY
            this.ctx = ctx
            this.imagen = imagen
        }
    //atras
        atras(){
            this.posicionX = this.posicionX - 10
        }
    //dibujarse enemigo
        dibujarse(){
            this.imagen = carSprites [contadorSprites]
            this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY,300,300)
        }
    }

//Definir pizza
class Pizza{
    //recibe el ctx para dibujarse
        constructor(ctx, posicionX, posicionY, imagen){
            this.posicionX = posicionX
            this.posicionY= posicionY
            this.ctx = ctx
            this.imagen = imagen
        }
    //atras
        atras(){
            this.posicionX = this.posicionX - 10
        }
    //dibujarse pizza
        dibujarse(){
            this.imagen = pizzaSprites [contadorSprites]
            this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY,100,100)
        }
    }    


//Definir piedra
class Piedra{
    //recibe el ctx para dibujarse
        constructor(ctx, posicionX, posicionY, imagen){
            this.posicionX = posicionX
            this.posicionY= posicionY
            this.ctx = ctx
            this.imagen = imagen
        }
    //adelante
        adelante(){
            this.posicionX = this.posicionX + 30
        }
    //dibujarse piedra
        dibujarse(){
            
            //Colocar imagenes piedra   
            this.imagen = piedraSprites [contadorSprites]
            this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY, 50, 50)
        }
    } 


//Definir explision
    class Explosion{
        //recibe el ctx para dibujarse
        constructor(ctx, posicionX, posicionY, imagen){
            this.posicionX = posicionX
            this.posicionY= posicionY
            this.ctx = ctx
            this.imagen = imagen
            this.tamano = 40
        }
    //dibujarse explosion
        dibujarse(){
            
            //Colocar imagenes piedra   
            this.imagen = explosionSpites [contadorSprites]
            this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY, this.tamano, this.tamano)
            this.tamano += 5
        }
    //    

    } 
    
    //const piedra = new Piedra(ctx, personaje.posicionX , 500, p0)
    

//Contador para conteo de imagenes    
    let contadorSprites = 0
    let pause = false
    let timer = 0
    let timer1 = 0

//Ejecutar game
    let intervalId
    let intervalEnemigos
    function iniciarJuego(){

        personaje.vidas= 3;
        enemigos = []
        piedrasArreglo = []
        explosionArreglo = []
        pizzaArreglo = []
        personaje.puntuacion = 0
        timer = 0
        timer1 = 0
        gameOver.classList.add("noShow")
        win.classList.add("noShow") 
        personaje.posicionX = 40
        personaje.posicionY = 450

        intervalId = setInterval(()=>{
            //Borra el lienzo en cada update
            ctx.clearRect(0,0,1000,600)
            
            //Biker
            personaje.dibujarse()
            actualizarSprites()

            
            //Recorrer el arreglo de los enemigos y por cada uno dibujarlo y agregarle en x
            enemigos.forEach((enemigo, posicionEnemigo, indexEnemigo)=>{
                enemigo.atras()
                enemigo.dibujarse()
                //Verificar colosion en X de carro y bici
                
                //Debemos preguntar X Y
                //console.log(personaje.posicionX, enemigo.posicionX);
                if (enemigo.posicionX  <= personaje.posicionX + 87 &&
                    enemigo.posicionX  >= personaje.posicionX &&
                    //cabeza biker           llantas carro
                    personaje.posicionY <= enemigo.posicionY + 180 &&
                    //llantas bici         toldo carro
                    personaje.posicionY -50 >= enemigo.posicionY
                    ){
                    // alert("Esta chocando en X & Y")
                    // console.log("X...", personaje.posicionX, enemigo.posicionX);
                    // console.log("Y...",personaje.posicionY, enemigo.posicionY);
                    
                    //personaje pierde vida
                    personaje.perderVida()
                    enemigos.splice(indexEnemigo, 1)
                    //Quitar enemigo en el array
                    //con el metodo SPLICE el cual nos pide un arreglo y la cantidad a quitar
                    
                    

                    // //Preguntar si sigue vivo
                    if (personaje.vidas == 0){
                        //Aqui va el Game Over
                        clearInterval(intervalId);
                        clearInterval(intervalEnemigos);
                        gameOver.classList.remove("noShow");
                    }
                    if (enemigo.posicionX < 0){ 
                        enemigos.splice(posicionEnemigo, 1)
                        }
                }
            });


            //Recorrer el arreglo de las pizzas y por cada una dibujar una pizza y agregarla en x
            pizzaArreglo.forEach((pizza, posicionPizza)=>{
                pizza.atras()
                pizza.dibujarse()
                //Verificar colosion en X de carro y bici
                
                //Debemos preguntar X Y
                //console.log(personaje.posicionX, pizza.posicionX);
                if (pizza.posicionX  <= personaje.posicionX + 110 &&

                    pizza.posicionX  >= personaje.posicionX &&
                    
                    //cabeza biker           base pizza
                    personaje.posicionY <= pizza.posicionY + 50 &&

                    //llantas bici         arriba pizza
                    personaje.posicionY + 40 >= pizza.posicionY
                    ){
                    // alert("Esta chocando en X & Y")
                    // console.log("X...", personaje.posicionX, pizza.posicionX);
                    // console.log("Y...",personaje.posicionY, pizza.posicionY);
                    //personaje pierde vida
                    personaje.recoleccion()
                    //Quitar pizza en el array
                    //con el metodo SPLICE el cual nos pide un arreglo y la cantidad a quitar
                    pizzaArreglo.splice(posicionPizza, 1)

                    // //Preguntar si ya gano
                    if (personaje.puntuacion >= 50){
                        //Aqui va el Gane
                        // alert("Llegaste con el cliente")
                        // console.log("Ganaste");
                        clearInterval(intervalId);
                        clearInterval(intervalEnemigos);
                        win.classList.remove("noShow");
                    }
                }
            })

            //Recorrer el arreglo de las piedras y por cada uno dibujarlo y agregarle en x
            //Piedra
            piedrasArreglo.forEach((piedra, indexPiedra)=>{
                console.log("piedras");
                piedra.adelante()
                piedra.dibujarse()

                //Quitar piedra del arreglo si sale del rango
                if (piedra.posicionX + 25 > 1000){
                    piedrasArreglo.splice(indexPiedra, 1)
            }

                //Piedra vs Carro
                console.log("pX",piedra.posicionX);
                enemigos.forEach((enemigo, indexEnemigo)=>{
                    console.log("eX",enemigo.posicionX);
                    if (piedra.posicionX + 20 >=enemigo.posicionX && // bien
                        piedra.posicionY <= enemigo.posicionY +200 && // bien
                        piedra.posicionY - 100 >= enemigo.posicionY
                        ){
                        //Quitamos piedra
                        piedrasArreglo.splice(indexPiedra,1)
                        //Quitar carro
                        enemigos.splice(indexEnemigo, 1)
                        personaje.puntuacion = personaje.puntuacion + 1
                        //Mostrar explosion
                        console.log("explosion");
                        const explisionfnl = new Explosion(ctx, piedra.posicionX + 20, piedra.posicionY, explosion0)
                        explosionArreglo.push(explisionfnl)
                    }
                })
            })
            //Se dibuja la cantidad de piedas que quedan 
            ctx.fillText(`Piedra: ${piedrasArreglo.length}`, 550, 40)
            //Se dibuja el tiempo que ha pasado del juego 
            ctx.fillText(`Tiempo: ${timer1} segundos`, 750, 40)
            timer = timer + 1
            timer1 = Math.trunc( timer / 10)

            explosionArreglo.forEach((explosion, posExplosion) => {
                explosion.dibujarse()
                if(explosion.tamano > 80){
                    explosionArreglo.splice(posExplosion,1)
                }
        })

        },100)

    //Crear enemigos y pizzas de manera aleatoria
        intervalEnemigos = setInterval (()=>{
            //Crear enemigo --posicion en x & y, tambien la iteracion de las imagenes
            //Math.random()
            if(Math.floor(Math.random()* 2) == 1){
                //Salir desde cualquier lugar en la posicion Y
                const altura = Math.floor(Math.random() * 350)

                const Enemigo = new Enemy(ctx, 1000, altura, e0)
                enemigos.push(Enemigo)
                console.log(enemigos);

                //Pizza 
                const alturaPizza = Math.floor(Math.random() * 350)   
                const PizzaRandom = new Pizza(ctx, 1000, alturaPizza, e0)
                pizzaArreglo.push(PizzaRandom)
                console.log(pizzaArreglo);
            }

        },2000)
    }

    iniciarJuego();

 //escuchar el teclado
    window.addEventListener("keyup", (evento)=>{

    //opciones de nuestro teclado
    switch(evento.code){
        case "ArrowRight":
            personaje.adelante()
            break;
        case "ArrowLeft":
            personaje.atras()
            break;
        case "ArrowUp":
            personaje.subir()
            break;    
        case "ArrowDown":
            personaje.bajar()
            break;
        case "Space":
            personaje.brincar()
            break;  
        case "KeyD":
            personaje.disparar()    
            break; 
        case "KeyP":
            console.log("Pausa", intervalId)
            if(pause==false){
                clearInterval(intervalId)
                clearInterval(intervalEnemigos)
                pause = true
            }else{
                iniciarJuego()
                pause=false
            } 

            

            break;
    }

})


//actualizar sprites
    function actualizarSprites(){
        //Colocar imagenes bici    
        personaje.imagen = bikerSprites [contadorSprites]
        //Ciclo para conteo de imagenes bici
        if (contadorSprites < 3){
            contadorSprites ++
        }else{
            contadorSprites = 0
        }
    }


    

        
    

