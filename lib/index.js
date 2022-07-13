import {SimpleLinkedList} from './LinkedList.js';
import {bootbox_prompt,bootbox_alert} from './dialog.js';

var list = null;

//-------------------------------------------------------------//

export async function pushFront(){ //insertar al inicio
    var canvas = document.getElementById('tutorial'); 
    if(list == null)
        list = new SimpleLinkedList(canvas);

    var result = await bootbox_prompt("VALOR A ASIGNAR: ");
    if (result == null) 
        return;
    
    try {
        if (list.buscarX(result) == true)
            throw new Error("EL NODO YA SE INGRESO");

        list.pushFront(result);
        list.drawNodesLog();
        list.drawNodes(result);
    } catch(e) {
        await bootbox_alert(e.message);
    }
}

export async function pushBack(){ //insertar al final
    var canvas = document.getElementById('tutorial'); 
    if(list == null)
        list = new SimpleLinkedList(canvas);

    var result = await bootbox_prompt("VALOR A ASIGNAR: ");
    if (result == null)
        return;
        
    try {
        if (list.buscarX(result) == true)
            throw new Error("EL NODO YA SE INGRESO");
        
        list.pushBack(result);
        list.drawNodesLog();
        list.drawNodes(result);

    } catch (e) {
        await bootbox_alert(e.message);
    }
}

export async function pushBeforeX(){ //insertar antes de X
    var canvas = document.getElementById('tutorial'); 
    if(list == null)
        list = new SimpleLinkedList(canvas);

    try {
        if (list.empty()) throw new Error("LISTA VACIA");

        let nodeX = await bootbox_prompt("NODO A BUSCAR: ");
        let element = await bootbox_prompt("ELEMENTO A INSERTAR: ");
        if ( nodeX == null) 
            return;

        if (list.buscarX(element) == true)
            throw new Error("EL NODO YA SE INGRESO");

        list.pushBeforeX(element,nodeX);
        list.drawNodesLog();
        list.drawNodes(element);

    }catch (e) {
        await bootbox_alert(e.message);
    }
}

export async function pushAfterX(){ //insertar despues de X
    var canvas = document.getElementById('tutorial'); 
    if(list == null)
        list = new SimpleLinkedList(canvas);
    
    try {
        if (list.empty()) throw new Error("LISTA VACIA");

        let nodeX = await bootbox_prompt("NODO A BUSCAR: ");
        let element = await bootbox_prompt("ELEMENTO A INSERTAR: ");
        if ( nodeX == null) 
            return;

        if (list.buscarX(element) == true)
            throw new Error("EL NODO YA SE INGRESO");

        list.pushAfterX(element,nodeX);  
        list.drawNodesLog();
        list.drawNodes(element);

    }catch (e) {
        await bootbox_alert(e.message);
    }
}

//----------------------------------------------------------------------------//

export async function popFront(){
    var canvas = document.getElementById('tutorial'); 
    if(list == null)
        list = new SimpleLinkedList(canvas);

    try {
        list.popFront();
        list.drawNodesLog();
        list.drawNodes();
    } catch (e) {
        await bootbox_alert(e.message);
    }
}
export async function popBack(){
    var canvas = document.getElementById('tutorial'); 
    if(list == null)
        list = new SimpleLinkedList(canvas);	

    try {
        list.popBack();
        list.drawNodesLog();
        list.drawNodes();
    } catch (e) {
        await bootbox_alert(e.message);
    }
}

export async function popX(){
    var canvas = document.getElementById('tutorial'); 
    if(list == null)
        list = new SimpleLinkedList(canvas);

    try {
        if (list.empty()) throw new Error("LISTA VACIA");

        let nodeX = await bootbox_prompt("NODO A BUSCAR:");
        list.popX(nodeX);
        list.drawNodesLog();
        list.drawNodes();
    } catch (e) {
        await bootbox_alert(e.message);
    }
}

export async function popBeforeX(){
    var canvas = document.getElementById('tutorial');
    if(list == null)
        list = new SimpleLinkedList(canvas)

    try {
        if (list.empty()) throw new Error("LISTA VACIA");

        let nodeX = await bootbox_prompt("NODO A BUSCAR:");
        list.popBeforeX(nodeX); //obtenemos el estado de la lista
        list.drawNodesLog();
        list.drawNodes();
    } catch (e) {
        await bootbox_alert(e.message);
    }
}

export async function popAfterX(){
    var canvas = document.getElementById('tutorial'); 
    if(list == null)
        list = new SimpleLinkedList(canvas);

    try {
        if (list.empty()) throw new Error("LISTA VACIA");

        let nodeX = await bootbox_prompt("NODO A BUSCAR:");
        list.popAfterX(nodeX);
        list.drawNodesLog();
        list.drawNodes();
    } catch (e) {
        await bootbox_alert(e.message);
    }
}