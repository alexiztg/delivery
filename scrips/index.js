//LOGICA BOTON INSTRUCCIONES
var btn = document.getElementById('btn'),
    txt = document.getElementById('instrucciones'),
    contador = 0;

    function cambio(){
        if(contador ==0){
            txt.classList.add('noShow');
            contador = 1;
        }else{
            txt.classList.remove('noShow');
            contador = 0;
        }
    }
    btn.addEventListener('click',cambio,true)


//LOGICA BOTON Creditos
var btn1 = document.getElementById('btn1'),
    txt1 = document.getElementById('creditos'),
    contador1 = 0;

    function cambio1(){
        if(contador1 ==0){
            txt1.classList.add('noShow');
            contador1 = 1;
        }else{
            txt1.classList.remove('noShow');
            contador1 = 0;
        }
    }
    btn1.addEventListener('click',cambio1,true)

