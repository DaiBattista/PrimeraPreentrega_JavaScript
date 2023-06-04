const productos = {
    "remeras": 2500,
    "buzos": 4500,
    "posters": 500,
    "plushies": 1500,
    "videojuegos": 15000
};

function calcularIva(subtotal) {
    return subtotal * 0.21;
}

function pedirNombre() {
    let nombre = prompt(`Registrate para ingresar a la tienda`)
    let regex = /^[a-zA-Z]+$/;
    while (!regex.test(nombre)) {
        nombre = prompt("Sólo podes usar letras", "");
    }
    return nombre
}
function saludar(nombre) {
    alert(`¡Hola ${nombre}! Ya podes navegar en la tienda`)
}
nombre = pedirNombre()
saludar(nombre)

let comprar = prompt(`¿Qué querés comprar?
Remeras
Buzos
Posters
Plushies
Videojuegos`).toLowerCase()
let total = 0
let resultados = [];

while (true) {
    switch (comprar) {
        case "remeras":
        case "buzos":
        case "posters":
        case "plushies":
        case "videojuegos":
            let costo = productos[comprar];
            let cantidad = parseInt(prompt(`¿Cúantas ${comprar} querés? El precio de es de $${costo}`));
            let regex = /^[0-9]+$/;
            while (!regex.test(cantidad)) {
                cantidad = prompt("Sólo podes usar números", "");
            }
            let subtotal = cantidad * costo;
            total += subtotal + calcularIva(subtotal);
            resultados.push({
                nombre: comprar,
                cantidad: cantidad,
                costo: costo,
                subtotal: subtotal
            });
            break;
        default:
            alert("Solo podes elegir entre remeras, buzos, posters, plushies y videojuegos")
    }
    let atras = prompt("¿Querés elegir otro producto? (S/N)");
    if (atras === "S") {
        comprar = prompt(`¿Qué querés comprar?
        Remeras
        Buzos
        Posters
        Plushies
        Videojuegos`).toLowerCase();
    } else if (atras === "N") {
        break;
    }
    else {
        alert("Opción erronea");
    }
}

function printRecibo(resultados) {
    let recibo = `
    Recibo
    --------------------------------
    Nombre del cliente: ${nombre}
    Total: $${calcularTotal(resultados) + calcularIva(calcularTotal(resultados))}
    --------------------------------
    Detalle de la compra `;
    for (let resultado of resultados) {
        recibo += `
    ${resultado.nombre} x ${resultado.cantidad} = $${resultado.subtotal}
    `;
    }
    alert(recibo);
}

function calcularTotal(resultados) {
    let total = 0;
    for (let resultado of resultados) {
        total += resultado.subtotal;
    }
    return total;
}

function pagar() {
    let costoTotal = calcularTotal(resultados);
    let metodoPago = prompt("¿Cómo querés pagar? (efectivo/tarjeta) ").toLowerCase();
    if (metodoPago === "efectivo") {
        let efectivo = parseInt(prompt("¿Con cuanto abonas? "));
        let regex = /^[0-9]+$/;
        while (!regex.test(efectivo)) {
            efectivo = prompt("Sólo podes usar numeros", "");
        }
    if (efectivo >= costoTotal) {
        let diferencia = efectivo - costoTotal;
        alert("Tu vuelto es de $ " + diferencia);
        alert("¡Gracias por tu compra!");
    } else {
        alert("¡Uh! No te alcanza para pagar el total de tu compra.");
        pagar();
    }
} else if (metodoPago === "tarjeta") {
    let numeroTarjeta = prompt("Ingresá los 16 números de tu tarjeta: ");
    let numeroTarjetaRegex = /^[0-9]{16}$/;
        while (!numeroTarjetaRegex.test(numeroTarjeta)) {
            numeroTarjeta = prompt("El número de tarjeta debe tener 16 dígitos.", "");
        }
    let codigoSeguridad = prompt("Ingresá los 3 números de seguridad de tu tarjeta: ");
    let codigoSeguridadRegex = /^[0-9]{3}$/;
        while (!codigoSeguridadRegex.test(codigoSeguridad)) {
            codigoSeguridad = prompt("El código de seguridad debe tener 3 dígitos.", "");
        }
    let fechaVencimiento = prompt("Ingresá la fecha de vencimiento de tu tarjeta (MM/AA): ");
    let fechaVencimientoRegex = /^[0-9]{2}/;
        while (!fechaVencimientoRegex.test(fechaVencimiento)) {
            fechaVencimiento = prompt("La fecha de vencimiento de tu tarjeta debe estar en el siguiente formato MM/AA.", "");
        }
    if (numeroTarjeta && codigoSeguridad && fechaVencimiento) {
        alert("Tu tarjeta fue aceptada. ¡Gracias por tu compra!");
    } else {
        alert("Los datos cargados son incorrectos");
        pagar();
    }
} else {
    alert("Método de pago erróneo.");
    pagar();
}
}
printRecibo(resultados);
pagar();