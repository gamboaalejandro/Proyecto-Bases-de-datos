import { pool } from '../database';
var imagenes = [
    { name: "imagen1", points: 1, img: "/img/carousel1.png" },
    { name: "imagen2", points: 1, img: "/img/carousel2.png" },
    { name: "imagen3", points: 1, img: "/img/carousel3.png" },
    { name: "imagen4", points: 1, img: "/img/IKEA-Logo-1.png" },
    { name: "imagen5", points: 1, img: "/img/im1.png" },
    { name: "imagen6", points: 1, img: "/img/im2.png" },
    { name: "imagen7", points: 1, img: "/img/im3.png" },
    { name: "imagen8", points: 1, img: "/img/wood.png" }
]
console.log(imagenes.length);
document.body.onload = addElement;

function addElement() {
    const Query = await pool.query("Select * from Producto");
    console.log(Query)
        //validacion de montaje
    for (let i = 0; i < Query.length; i++) {
        var divi = "div" + "" + i + "" + "";
        var nuevo_div = document.createElement("div");
        nuevo_div.id = divi;
        var html = "  <tr> <th scope=" + "row" + "></th><td id=" + "contenidoTabla" + "></td><td id=" + "contenidoTabla" + "></td><td id=" + "contenidoTabla" + "></td><td id=" + "contenidoTabla" + "></td><td><button class=" + "btn btn-danger" + ">Borrar</button></td></tr>";
        document.body.appendChild(nuevo_div);
        document.getElementById("generar").innerHTML = html;
    }
}