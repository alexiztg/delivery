//1.Seleccionando Canvas
const canvas = document.querySelector("canvas")

//2.Definir el contexto 2D
 const ctx = canvas.getContext("2d")

//Modificar propiedades del txt 
 ctx.font = "24px Arial"

//Cargar las imagenes bici
const t0 = new Image()
const t1 = new Image()
const t2 = new Image()
const t3 = new Image()
const t4 = new Image()
const t5 = new Image()
const t6 = new Image()
const t7 = new Image()
t0.src = "../img/0.gif"
t1.src = "../img/1.gif"
t2.src = "../img/2.gif"
t3.src = "../img/3.gif"
t4.src = "../img/4.gif"
t5.src = "../img/5.gif"
t6.src = "../img/6.gif"
t7.src = "../img/7.gif"
const bikerSprites = [t0, t1, t2, t3, t4, t5, t6, t7] 

//Cargar las imagenes del enemigo
const e0 = new Image()
const e1 = new Image()
const e2 = new Image()
const e3 = new Image()
e0.src = "../img/car/c0.gif"
e1.src = "../img/car/c1.gif"
e2.src = "../img/car/c2.gif"
e3.src = "../img/car/c3.gif"
const carSprites = [e0, e1, e2, e3] 

//Cargar imagen piedra
const p0 = new Image()
const p1 = new Image()
const p2 = new Image()
const p3 = new Image()
p0.src = "../img/piedra/0.gif"
p1.src = "../img/piedra/1.gif"
p2.src = "../img/piedra/2.gif"
p3.src = "../img/piedra/3.gif"
const piedraSprites = [p0, p1, p2, p3]


//medidas canvas
//ancho 1000, alto 600


//Lista de enemigos y de piedras

const enemigos = []
const piedras = []


 
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
    }
    // metodo adelante
    adelante(){
        //sumarle a su posicion en X
        this.posicionX = this.posicionX + 10
    }
    //metodo atras
    atras(){
        this.posicionX = this.posicionX - 10
    }
    //metodo subir
    subir(){
        this.posicionY = this.posicionY - 10
    }
    //metodo bajar
    bajar(){
        this.posicionY = this.posicionY + 10
    }
    //metodo brincar 
    brincar(){
        console.log("brincar");
    }
    //metodo dibujarse bici
    dibujarse(){
        this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY,150,110)
        //vidas y su posicion 
        this.ctx.fillText(`Vidas: ${this.vidas}`, 40, 40)
    }

    //metodo perder vida
    perderVida(){
        this.vidas = this.vidas - 1
    }

    //metodo dispara
    disparar(){
        console.log("disparo");
        // if (piedras.length<2){
        //     const piedra = new Piedra(ctx, personaje.posicionX + 110 , 500, p0)
        //     //Agregamos al arreglo
        //     piedras.push(piedra)
        // }
        

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
            this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY,300,300)
        }
    }

//Crear enemigo --posicion en x & y, tambien la iteracion de las imagenes
    const Enemigo = new Enemy(ctx, 1000, 350, e0)

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
            this.posicionX = this.posicionX + 10
        }
    //dibujarse piedra
        dibujarse(){
            this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY, 50, 50)
        }
    }  
    
    const piedra = new Piedra(ctx, personaje.posicionX , 500, p0)
    

//Contador para conteo de imagenes    
    let contadorSprites = 0

//Ejecutar game
    setInterval(()=>{
        //Borra el lienzo en cada update
        ctx.clearRect(0,0,1000,600)
        
        //Biker
        personaje.dibujarse()
        actualizarSprites()

        //Enemigo   
        Enemigo.atras()
        Enemigo.dibujarse()

        //Recorrer el arreglo de las piedras y por cada uno dibujarlo y agregarle en x
        //Piedra
        piedras.forEach((piedra)=>{
            console.log("piedras");
            piedra.adelante()
            piedra.dibujarse()
        })
        

        //Verificar colosion en X de carro y bici
          //console.log(personaje.posicionX, Enemigo.posicionX);
        if (Enemigo.posicionX  <= personaje.posicionX + 87){
            //alert("Esta chocando en X")
            //personaje pierde vida
            personaje.perderVida()
        }


    },100)

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
    }

})


//actualizar sprites
    function actualizarSprites(){
        //Colocar imagenes bici    
        personaje.imagen = bikerSprites [contadorSprites]
        //Ciclo para conteo de imagenes bici
        if (contadorSprites < 7){
            contadorSprites ++
        }else{
            contadorSprites = 0
        }
    
        //Colocar imagenes carro   
        Enemigo.imagen = carSprites [contadorSprites]
        //Ciclo para conteo de imagenes carro
        if (contadorSprites < 3){
            contadorSprites ++
        }else{
            contadorSprites = 0
        }    


        //Colocar imagenes piedra   
        // piedra.imagen = piedraSprites [contadorSprites]
        // //Ciclo para conteo de imagenes piedra
        // if (contadorSprites < 3){
        //     contadorSprites ++
        // }else{
        //     contadorSprites = 0
        // }    
        

    }

