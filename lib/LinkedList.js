class Node  {
    info = 0;
    next = null;
};

export class SimpleLinkedList {
    #first = null; //cabeza de la lista
    canvas = null;

    constructor (canvas) {
        this.canvas = canvas;
    }
    //-------------------------------------------//
    numNode(){
        let temp = this.#first;
        let i = 0;
        while(temp != null){
            i++;
            temp = temp.next;
        }
        return i;
    }
    buscarX(DATO){
        var	tmp = this.#first;
        while(tmp != null){
            if(tmp.info === DATO)
                return true
            tmp = tmp.next; //
        }
        return false;
    }

    empty() {
        return (this.#first == null);
    }

    //------------INSERCIONNES------------------//

    pushFront(_info) {  //agregar al inicio
        let P = this.#first;
        let aux = new Node();
        aux.info = _info;
        if(this.#first != null){ //verificar si la lista esta vacia 
            aux.next = P;
            P = aux; //actualizamos el inicio
        }
        else{
            P = aux; //actualizamos el inicio
        }
        this.#first = P;
    }

    pushBack(_info) {  //agregar al final
        let aux = this.#first; // aux nos sirve para iterar
        if(this.#first != null){
            while(aux.next != null) //iteramos hasta el ultimo nodo
                aux = aux.next;
            let aux2 = new Node(); //nodo para insercion 
            aux2.info = _info;
            aux.next = aux2;
        }
        else{
            throw new Error("LISTA VACIA");
        }
    } //no es necesario actualizar el #first

    pushBeforeX(_info, X) { // insertar antes de algun elemento X
        let P = this.#first;
        let Q = P;
        let T = P;
        let band = 1;
        while (Q.info != X && band == 1) {
            if (Q.next != null) {
                T = Q;
                Q = Q.next;
            }
            else band = 0;
        }
        if (band == 1) {
            let aux = new Node();
            aux.info = _info;
            if (P == Q) { //en caso de que se quiera insertar al antes del primer nodo
                aux.next = P;
                P = aux;
            }
            else {
                T.next = aux;
                aux.next = Q;
            }
        }
        else throw new Error("EL NODO NO EXISTE!");
        this.#first = P;
    }

    pushAfterX(_info, X) { //insertar despues de X
        let Q = this.#first;
        let band = 1;
        while (Q.info != X && band == 1) {
            if (Q.next != null) {
                Q = Q.next;
            }
            else band = 0;
        }
        if (band == 1) {
            let aux = new Node();
            aux.info = _info;
            //---------------
            aux.next = Q.next;
            Q.next = aux;
        }
        else throw new Error("EL NODO NO EXISTE!");
    }

    //-----------ELIMINACIONES----------------//

    popFront() { //elimina el primer nodo
        let P = this.#first;
        if (P != null) {
            P = P.next;
        }
        else{
            throw new Error("LISTA VACIA"); //lista vacia
        }
        this.#first = P; //actualizamos
    }
        
    popBack() { //elimina el ultimo nodo
        let P = this.#first;
        if (P != null) {
            let Q = this.#first;
            let T = Q;
            if (P.next == null) {
                this.#first = null;
            }else {
                while (Q.next != null) {
                    T = Q;
                    Q = Q.next; 
                }
                T.next = Q.next; // aislamos el ultimo nodo
            }
        }
        else{
            throw new Error("LISTA VACIA"); //lista vacia
        }
    }

    popX(X) { // elimina el elemento con info X
        let P = this.#first;
        let Q = P;
        let T = null;
        let band = 1;
        while (Q.info != X && band == 1) {
            if (Q.next != null) {
                T = Q;
                Q = Q.next;
            }
            else band = 0;
        }
        if (band == 0) throw new Error("NO SE ENCONTRO EL ELEMENTO");  //elemento no encontrado
        else if (P == Q) P = Q.next; //si el elemento a elmininar es el primero
        else T.next = Q.next;
        this.#first = P; //actualizamos el inicio;
    }

    popBeforeX(X) { //elimina antes de X
        let P = this.#first;
        if (P.info == X) {
            throw new Error("EL NODO ANTERIOR NO EXISTE!"); 
        }
        else {
            let Q = P;
            let T = P;
            let R = null;
            let band = 1;
            while(Q.info != X && band == 1) {
                if (Q.next != null) {
                    R = T;
                    T = Q;
                    Q = Q.next;
                }
                else band = 0;
            }
            if (band == 0) throw new Error("EL NODO CON ELEMENTO " + X + " NO EXISTE");
            else {
                if (P.next == Q) { //si se quiere eliminar el primer nodo
                    P = Q;
                }
                else {
                    R.next = Q;
                } 
            }
        }
        this.#first = P;
    }

    popAfterX(X) { //eliminar despues de X -- no es necesario actualizar #first
        let Q = this.#first;
        let band = 1;
        while ( Q.info != X && band == 1) {
            if (Q.next != null) {
                Q = Q.next;
            }
            else {
                band = 0;
                throw new Error("EL NODO NO EXISTE!");
            }
        }
        if (Q.next == null && band == 1) {
            throw new Error("NO EXISTE UN NODO POSTERIOR AL SELECCIONADO."); ; // ultimo nodo
        }
        else {
            Q.next = Q.next.next; // eliminacion
        }
    }
//--------------------------------------------------------------------------------------------------//

    //DIBUJAR EN CONSOLA
    drawNodesLog() {
        var	tmp = this.#first;
        var cad = "";
        while(tmp != null) {
            cad += tmp.info + "::";
            tmp = tmp.next;
        }
        console.log(cad);
    }

    // CANVAS
    drawNodes(valor) {
        // -- aumentamos el tamaño del canva proporcional al numero de nodos
        let cv_witdh = document.getElementById('tutorial');
        let zoom = 80 * this.numNode();
        cv_witdh.style.width = "calc(100% + "+zoom+"px)";
        //----------------------------------------------------
        var canvas = this.canvas;
        var ctx = canvas.getContext('2d');
        var radio = 40;
        var s = getComputedStyle(canvas);// Nos sirve para redimensionar los dibujos
        let w = s.width;
        let h = s.height;
        canvas.width = w.split("px")[0];
        canvas.height = h.split("px")[0]; //

        var	tmp = this.#first;
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        var x = 100;
        var y = 100;
        var ctd = 0;	
        
        var nodo = null;

        while(tmp != null){

            if(valor != undefined && tmp.info == valor){
                //Dibujar circulo
                ctx.beginPath();
                ctx.fillStyle = "orange";
                ctx.arc(x,y,40,0,2*Math.PI);
                ctx.fill();
                
                nodo={};
                nodo.x = x;
                nodo.y = y;
                nodo.info = tmp.info;
            }
            else{
             //Dibujar rectangulo
                ctx.beginPath();
                ctx.fillStyle = "rgb(40, 7, 53)";
                ctx.arc(x,y,40,0,2*Math.PI);
                ctx.fill();
            } 

            //texto
            ctx.fillStyle="gray";
            ctx.font = '20px Arial';
            ctx.fillText(tmp.info,x-12,y+8);
            ctx.closePath();

            //Dibujar flecha
            //linea de la flecha
            if (tmp.next == null){
                ctx.beginPath();
                ctx.moveTo(x+radio,y);
                ctx.lineTo(x+radio+20,y);
                ctx.lineTo(x+radio+20,y+70);
                ctx.lineTo(100,y+70);
                ctx.lineTo(100,y+70-20);
                ctx.stroke();

                ctx.beginPath();
                ctx.fillStyle="black";
                ctx.moveTo(95,y+50);
                ctx.lineTo(100,y+50-5);
                ctx.lineTo(105,y+50);
                ctx.closePath();
                ctx.fill();

            }
            else {
                ctx.beginPath();
                ctx.moveTo(x+radio,y);
                ctx.lineTo(x+radio+20,y);
                ctx.closePath();
                ctx.stroke();
                /**/
                //cabeza de la flecha
                ctx.beginPath();
                ctx.fillStyle="black";
                ctx.moveTo(x+radio+20,y-5);
                ctx.lineTo(x+radio+20+5,y);
                ctx.lineTo(x+radio+20,y+5);
                ctx.closePath();
                ctx.fill();
            }
            ctd++;
            x = 100 + (110)*ctd;
            tmp = tmp.next;
        }

        if(nodo!=null){

            setTimeout(function(){
                ctx.beginPath();
                ctx.fillStyle = "rgb(40, 7, 53)";//purple
                ctx.arc(nodo.x,nodo.y,radio+1,0,2*Math.PI);
                ctx.fill();
                //texto

                ctx.fillStyle="white";
                ctx.font = 'bold 20px Arial';
                ctx.fillText(nodo.info,nodo.x-12,nodo.y+8);
                ctx.closePath();

            },2000);
           
        }
    }

}