// src/index.ts

import * as readline from "readline";
import process from "process"; // Evita por completo el error de "process"
import { crearTicket, actualizarEstado, listarTickets, buscarTicketPorId } from "./ticketService";
import { Prioridad, EstadoIncidente } from "./types";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Util: pregunta y retorna promesa
function preguntar(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, (ans: string) => resolve(ans.trim())));
}

// Util: limpia consola
function limpiar() {
  console.clear();
}

// BANNER 
function banner() {
  console.log("Scope: C27");
  console.log("============================================");
  console.log("       SISTEMA DE TICKETS - LABORATORIO     ");
  console.log("                    KINAL                   ");
  console.log("============================================");
}

// MENÚ PRINCIPAL
async function menuPrincipal() {
  limpiar();
  banner();
  console.log("  1. Agregar ticket");
  console.log("  2. Ver tickets");
  console.log("  3. Actualizar estado de ticket");
  console.log("  4. Salir\n");

  const opcion = await preguntar("  Selecciona una opción: ");

  switch (opcion) {
    case "1": await menuAgregarTicket(); break;
    case "2": await menuVerTickets(); break;
    case "3": await menuActualizarEstado(); break;
    case "4":
      console.log("\n  Hasta luego\n");
      rl.close();
      process.exit(0);
    default:
      console.log("\n  [!] Opción no válida.");
      await pausa();
      await menuPrincipal();
  }
}

// AGREGAR TICKET 
async function menuAgregarTicket() {
  limpiar();
  banner();
  console.log("  -- NUEVO TICKET --\n");

  const titulo = await preguntar("  Título del problema  : ");
  const descripcion = await preguntar("  Descripción          : ");
  const reportadoPor = await preguntar("  Tu nombre            : ");

  // Prioridad con validación
  let prioridad: Prioridad | null = null;
  while (!prioridad) {
    const input = await preguntar("  Prioridad (baja / media / alta): ");
    if (["baja", "media", "alta"].includes(input)) {
      prioridad = input as Prioridad;
    } else {
      console.log(" Solo se acepta: baja, media o alta.");
    }
  }

  const ticket = crearTicket(titulo, descripcion, reportadoPor, prioridad);

  console.log(`\n Ticket creado exitosamente`);
  console.log(`     ID     : ${ticket.id}`);
  console.log(`     Fecha  : ${ticket.fechaCreacion.toLocaleString("es-GT")}`);
  console.log(`     Estado : ${ticket.estado}\n`);

  await pausa();
  await menuPrincipal();
}

// VER TICKETS 
async function menuVerTickets() {
  limpiar();
  banner();
  console.log("  -- LISTADO DE TICKETS --\n");

  const tickets = listarTickets();

  if (tickets.length === 0) {
    console.log("  No hay tickets registrados aún.\n");
  } else {
    tickets.forEach((t) => {
      // Reemplazo de indicadores visuales sin usar emojis
      const prioridadTexto = `[${t.prioridad.toUpperCase()}]`;
      const estadoTexto = `(${t.estado.toUpperCase()})`;
  
      console.log(`   ID        : ${t.id}`);
      console.log(`   Título    : ${t.titulo}`);
      console.log(`   Reportado : ${t.reportadoPor}`);
      console.log(`   Prioridad : ${prioridadTexto}`);
      console.log(`   Estado    : ${estadoTexto}`);
      console.log(`   Fecha     : ${t.fechaCreacion.toLocaleDateString("es-GT")}`);
      console.log("  --------------------------------------------");
    });
  }

  await pausa();
  await menuPrincipal();
}

// ACTUALIZAR ESTADO 
async function menuActualizarEstado() {
  limpiar();
  banner();
  console.log("  -- ACTUALIZAR ESTADO --\n");

  const tickets = listarTickets();

  if (tickets.length === 0) {
    console.log("  No hay tickets para actualizar.\n");
    await pausa();
    await menuPrincipal();
    return;
  }

  // Muestra IDs disponibles
  console.log("  Tickets disponibles:");
  tickets.forEach((t) => {
    console.log(`    ${t.id}  ->  ${t.titulo} [${t.estado}]`);
  });

  console.log();
  const id = await preguntar("  Ingresa el ID del ticket: ");

  const ticket = buscarTicketPorId(id);
  if (!ticket) {
    console.log("\n Ticket no encontrado.");
    await pausa();
    await menuActualizarEstado();
    return;
  }

  console.log(`\n  Ticket: ${ticket.titulo}`);
  console.log(`  Estado actual: ${ticket.estado}\n`);
  console.log("  Nuevo estado:");
  console.log("    1. abierto");
  console.log("    2. en progreso");
  console.log("    3. resuelto\n");

  const opcion = await preguntar("  Selecciona (1/2/3): ");

  const estados: Record<string, EstadoIncidente> = {
    "1": "abierto",
    "2": "en progreso",
    "3": "resuelto",
  };

  if (!estados[opcion]) {
    console.log("\n  Opción no válida.");
    await pausa();
    await menuActualizarEstado();
    return;
  }

  actualizarEstado(id, estados[opcion]);
  console.log(`\n  Estado actualizado a: ${estados[opcion]}\n`);

  await pausa();
  await menuPrincipal();
}

// --- UTIL: PAUSA ---
async function pausa() {
  await preguntar("  Presiona Enter para continuar...");
}

// --- ARRANQUE ---
menuPrincipal();