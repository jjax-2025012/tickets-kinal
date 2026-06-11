import { crearTicket, actualizarEstado, listarTickets } from "./ticketService";


const t1 = crearTicket(
  "PC no enciende",
  "El equipo del puesto 3 no responde al botón de encendido",
  "Maria Lopez",
  "alta"
);

const t2 = crearTicket(
  "Teclado con teclas pegadas",
  "Varias teclas no responden correctamente en el puesto 7",
  "Carlos Ajú",
  "baja"
);

const t3 = crearTicket(
  "Monitor sin señal",
  "El monitor del puesto 12 muestra 'no signal' aunque el cable está conectado",
  "Ana Pérez",
  "media"
);

// --- Actualizar estado de un ticket ---
actualizarEstado(t1.id, "en progreso");
actualizarEstado(t2.id, "resuelto");

// --- Mostrar todos los tickets ---
console.log("\n===== TICKETS LABORATORIO C27 - KINAL =====\n");

listarTickets().forEach((ticket) => {
  console.log(`ID         : ${ticket.id}`);
  console.log(`Título     : ${ticket.titulo}`);
  console.log(`Descripción: ${ticket.descripcion}`);
  console.log(`Reportado  : ${ticket.reportadoPor}`);
  console.log(`Prioridad  : ${ticket.prioridad.toUpperCase()}`);
  console.log(`Estado     : ${ticket.estado}`);
  console.log(`Fecha      : ${ticket.fechaCreacion.toLocaleString("es-GT")}`);
  console.log("--------------------------------------------");
});