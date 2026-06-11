"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTicket = crearTicket;
exports.actualizarEstado = actualizarEstado;
exports.listarTickets = listarTickets;
const baseDeDatos = [];
let contadorId = 1;
function crearTicket(titulo, descripcion, reportadoPor, prioridad) {
    const nuevoTicket = {
        id: `TICKET-${contadorId++}`,
        titulo,
        descripcion,
        reportadoPor,
        prioridad,
        estado: "abierto",
        fechaCreacion: new Date(),
    };
    baseDeDatos.push(nuevoTicket);
    return nuevoTicket;
}
function actualizarEstado(id, nuevoEstado) {
    const ticket = baseDeDatos.find((t) => t.id === id);
    if (!ticket)
        return null;
    ticket.estado = nuevoEstado;
    return ticket;
}
function listarTickets() {
    return baseDeDatos;
}
