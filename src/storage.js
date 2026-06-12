// ── Claves localStorage ──
const CLAVE_SOLICITUDES = "becauleam_solicitudes";
const CLAVE_POSTULACION = "becauleam_postulacion";
// ── Seguimiento ──
export function obtenerSolicitudes() {
    try {
        const datos = localStorage.getItem(CLAVE_SOLICITUDES);
        if (!datos)
            return [];
        return JSON.parse(datos);
    }
    catch {
        return [];
    }
}
export function guardarSolicitud(solicitud) {
    const lista = obtenerSolicitudes();
    lista.push(solicitud);
    localStorage.setItem(CLAVE_SOLICITUDES, JSON.stringify(lista));
}
export function actualizarEstado(id, nuevoEstado, motivo) {
    const lista = obtenerSolicitudes();
    const index = lista.findIndex((s) => s.id === id);
    if (index !== -1) {
        lista[index].estado = nuevoEstado;
        lista[index].motivo = motivo;
        localStorage.setItem(CLAVE_SOLICITUDES, JSON.stringify(lista));
    }
}
export function generarId() {
    return "SOL-" + Date.now();
}
// ── Postulación ──
export function obtenerDatosPostulacion() {
    try {
        const datos = localStorage.getItem(CLAVE_POSTULACION);
        if (!datos)
            return { nombre: "", email: "", documentos: {} };
        return JSON.parse(datos);
    }
    catch {
        return { nombre: "", email: "", documentos: {} };
    }
}
export function guardarDatosPostulacion(datos) {
    localStorage.setItem(CLAVE_POSTULACION, JSON.stringify(datos));
}
