// src/ticketService.ts

import { Incidente, Prioridad, EstadoIncidente } from "./types";

const baseDeDatos: Incidente[] = [];
let contadorId = 1;

export function crearTicket(
  titulo: string,
  descripcion: string,
  reportadoPor: string,
  prioridad: Prioridad
): Incidente {
  const ticket: Incidente = {
    id: `TICKET-${String(contadorId++).padStart(3, "0")}`,
    titulo,
    descripcion,
    reportadoPor,
    prioridad,
    estado: "abierto",
    fechaCreacion: new Date(),
  };
  baseDeDatos.push(ticket);
  return ticket;
}

export function actualizarEstado(id: string, nuevoEstado: EstadoIncidente): Incidente | null {
  const ticket = baseDeDatos.find((t) => t.id === id);
  if (!ticket) return null;
  ticket.estado = nuevoEstado;
  return ticket;
}

export function listarTickets(): Incidente[] {
  return baseDeDatos;
}

export function buscarTicketPorId(id: string): Incidente | undefined {
  return baseDeDatos.find((t) => t.id === id);
}