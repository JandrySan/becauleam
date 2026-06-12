import type { Solicitud, DatosPostulacion } from "./tipos";

// ── Claves localStorage ──
const CLAVE_SOLICITUDES = "becauleam_solicitudes";
const CLAVE_POSTULACION = "becauleam_postulacion";

// ── Seguimiento ──
export function obtenerSolicitudes(): Solicitud[] {
  try {
    const datos = localStorage.getItem(CLAVE_SOLICITUDES);
    if (!datos) return [];
    return JSON.parse(datos) as Solicitud[];
  } catch { return []; }
}

export function guardarSolicitud(solicitud: Solicitud): void {
  const lista = obtenerSolicitudes();
  lista.push(solicitud);
  localStorage.setItem(CLAVE_SOLICITUDES, JSON.stringify(lista));
}

export function actualizarEstado(
  id: string,
  nuevoEstado: Solicitud["estado"],
  motivo: string
): void {
  const lista = obtenerSolicitudes();
  const index = lista.findIndex((s) => s.id === id);
  if (index !== -1) {
    lista[index].estado = nuevoEstado;
    lista[index].motivo = motivo;
    localStorage.setItem(CLAVE_SOLICITUDES, JSON.stringify(lista));
  }
}

export function generarId(): string {
  return "SOL-" + Date.now();
}

// ── Postulación ──
export function obtenerDatosPostulacion(): DatosPostulacion {
  try {
    const datos = localStorage.getItem(CLAVE_POSTULACION);
    if (!datos) return { nombre: "", email: "", documentos: {} };
    return JSON.parse(datos) as DatosPostulacion;
  } catch { return { nombre: "", email: "", documentos: {} }; }
}

export function guardarDatosPostulacion(datos: DatosPostulacion): void {
  localStorage.setItem(CLAVE_POSTULACION, JSON.stringify(datos));
}
