import { obtenerSolicitudes, actualizarEstado } from "./storage";
const coloresEstado = {
    "Recibida": "#3B82F6",
    "En revisión": "#F59E0B",
    "Aprobada": "#10B981",
    "Rechazada": "#EF4444",
};
function navbar(activo) {
    return `
    <header>
      <nav>
        <span class="nav-logo">Beca<span class="acento">ULEAM</span></span>
        <div class="nav-modulos" id="navModulos">
          <button class="nav-btn" data-modulo="verificador">Verificador</button>
          <button class="nav-btn" data-modulo="postulacion">Postulación</button>
          <button class="nav-btn ${activo === "seguimiento" ? "activo" : ""}" data-modulo="seguimiento">Seguimiento</button>
          <button class="nav-btn ${activo === "encargado" ? "activo" : ""}" data-modulo="encargado">Encargado</button>
        </div>
      </nav>
    </header>
  `;
}
function renderizarTimeline(solicitud) {
    const pasos = ["Recibida", "En revisión", "Aprobada"];
    const esRechazada = solicitud.estado === "Rechazada";
    const pasosHtml = pasos.map((paso) => {
        let clase = "pendiente";
        if (paso === "Recibida")
            clase = "listo";
        if (paso === "En revisión" &&
            (solicitud.estado === "En revisión" || solicitud.estado === "Aprobada"))
            clase = "listo";
        if (paso === solicitud.estado)
            clase = "activo";
        return `
      <div class="timeline-step ${clase}">
        <div class="timeline-dot"></div>
        <p class="step-titulo">${paso}</p>
      </div>
    `;
    }).join("");
    return `
    <div class="timeline">
      ${pasosHtml}
      ${esRechazada ? `
        <div class="timeline-step rechazado">
          <div class="timeline-dot"></div>
          <p class="step-titulo">Rechazada</p>
          <p class="step-motivo">Motivo: ${solicitud.motivo || "Sin especificar"}</p>
        </div>` : ""}
    </div>
  `;
}
function renderizarSolicitudes() {
    const solicitudes = obtenerSolicitudes();
    if (solicitudes.length === 0) {
        return `<p class="sin-datos">Aún no tienes solicitudes. Ve a Postulación para enviar una.</p>`;
    }
    return solicitudes.map((s) => `
    <div class="solicitud-card">
      <div class="solicitud-header">
        <div>
          <p class="solicitud-id">${s.id}</p>
          <p class="solicitud-tipo">${s.tipoBeca}</p>
          <p class="solicitud-nombre">${s.nombreEstudiante}</p>
        </div>
        <span class="estado-badge" style="background:${coloresEstado[s.estado]}20;color:${coloresEstado[s.estado]}">
          ${s.estado}
        </span>
      </div>
      ${renderizarTimeline(s)}
    </div>
  `).join("");
}
export function renderizarSeguimiento(navCallback) {
    const app = document.getElementById("app");
    app.innerHTML = `
    ${navbar("seguimiento")}
    <section class="hero">
      <span class="badge">Módulo 3 · Seguimiento</span>
      <h1>Seguimiento de Solicitud</h1>
      <p>Consulta el estado de tu beca en todo momento.</p>
    </section>
    <main>
      <section id="misSolicitudes">
        <h2>Mis solicitudes</h2>
        ${renderizarSolicitudes()}
      </section>
    </main>
    <footer>
      <strong>BecaULEAM · Módulo 3: Seguimiento de Solicitud</strong>
      <address>Jandry Sánchez Murillo · IS-403 · ULEAM 2026-1</address>
    </footer>
  `;
    bindNav(navCallback);
}
export function renderizarEncargado(navCallback) {
    const app = document.getElementById("app");
    function tablaHtml() {
        const solicitudes = obtenerSolicitudes();
        if (solicitudes.length === 0) {
            return `<p class="sin-datos">No hay solicitudes registradas aún.</p>`;
        }
        const filas = solicitudes.map((s) => `
      <tr>
        <td>${s.id}</td>
        <td>${s.nombreEstudiante}</td>
        <td>${s.tipoBeca}</td>
        <td>${s.fecha}</td>
        <td>
          <span class="estado-badge" style="background:${coloresEstado[s.estado]}20;color:${coloresEstado[s.estado]}">
            ${s.estado}
          </span>
        </td>
        <td>
          <select class="select-estado" data-id="${s.id}">
            <option value="Recibida"    ${s.estado === "Recibida" ? "selected" : ""}>Recibida</option>
            <option value="En revisión" ${s.estado === "En revisión" ? "selected" : ""}>En revisión</option>
            <option value="Aprobada"    ${s.estado === "Aprobada" ? "selected" : ""}>Aprobada</option>
            <option value="Rechazada"   ${s.estado === "Rechazada" ? "selected" : ""}>Rechazada</option>
          </select>
        </td>
        <td>
          <input class="input-motivo" data-id="${s.id}" placeholder="Motivo si rechaza" value="${s.motivo}" />
        </td>
        <td>
          <button class="btn-actualizar" data-id="${s.id}">Guardar</button>
        </td>
      </tr>
    `).join("");
        return `
      <div class="tabla-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Estudiante</th><th>Tipo beca</th><th>Fecha</th>
              <th>Estado</th><th>Cambiar estado</th><th>Motivo</th><th>Acción</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
      </div>
    `;
    }
    app.innerHTML = `
    ${navbar("encargado")}
    <section class="hero hero-encargado">
      <span class="badge">Panel del Encargado</span>
      <h1>Gestión de Solicitudes</h1>
      <p>Revisa y actualiza el estado de cada solicitud recibida.</p>
    </section>
    <main>
      <section>
        <h2>Solicitudes recibidas</h2>
        <div id="tablaContainer">${tablaHtml()}</div>
      </section>
    </main>
    <footer>
      <strong>BecaULEAM · Panel del Encargado</strong>
      <address>IS-403 · ULEAM 2026-1</address>
    </footer>
  `;
    bindNav(navCallback);
    document.querySelectorAll(".btn-actualizar").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const select = document.querySelector(`.select-estado[data-id="${id}"]`);
            const input = document.querySelector(`.input-motivo[data-id="${id}"]`);
            const nuevoEstado = select.value;
            const motivo = input.value.trim();
            if (nuevoEstado === "Rechazada" && !motivo) {
                alert("Debes indicar el motivo del rechazo.");
                return;
            }
            actualizarEstado(id, nuevoEstado, motivo);
            renderizarEncargado(navCallback);
        });
    });
}
function bindNav(navCallback) {
    document.querySelectorAll(".nav-btn[data-modulo]").forEach((btn) => {
        btn.addEventListener("click", () => navCallback(btn.dataset.modulo));
    });
}
