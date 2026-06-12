// Módulo 2: Postulación y Documentos — José Alava
import { obtenerDatosPostulacion, guardarDatosPostulacion } from "./storage";
import type { DocumentoGuardado } from "./tipos";

interface Documento {
  id: string;
  label: string;
  limite: string;
}

const DOCUMENTOS: Documento[] = [
  { id: "doc_identidad", label: "Cédula de identidad", limite: "2 MB" },
  { id: "cert_notas", label: "Récord académico", limite: "5 MB" },
  { id: "planilla_luz", label: "Planilla de luz", limite: "3 MB" },
];

function parsearLimite(limite: string): number {
  const match = limite.toLowerCase().match(/^(\d+(?:\.\d+)?)\s*mb$/);
  return match ? Math.round(parseFloat(match[1]) * 1024 * 1024) : 2 * 1024 * 1024;
}

function validarNombre(v: string): string {
  if (!v) return "El nombre es obligatorio.";
  if (v.length < 3) return "El nombre debe tener al menos 3 caracteres.";
  return "";
}

function validarEmail(v: string): string {
  if (!v) return "El correo es obligatorio.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Formato de correo inválido.";
  return "";
}

function setError(id: string, msg: string): void {
  const el = document.getElementById(`error_${id}`);
  if (el) el.textContent = msg;
  const input = document.getElementById(id) as HTMLInputElement | null;
  input?.classList.toggle("invalid", Boolean(msg));
}

function renderizarPasos(actual: number): string {
  const pasos = ["Datos personales", "Carga de archivos", "Revisión final"];
  return `
    <div class="pasos">
      ${pasos.map((p, i) => `
        <div class="paso ${i < actual ? "completado" : i === actual ? "activo" : ""}">
          <div class="paso-num">${i < actual ? "✓" : i + 1}</div>
          <span>${p}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderizarPaso0(): string {
  const datos = obtenerDatosPostulacion();
  return `
    <div class="card">
      ${renderizarPasos(0)}
      <h2>Datos personales</h2>
      <div class="campo">
        <label for="nombre">Nombre completo</label>
        <input type="text" id="nombre" value="${datos.nombre}" placeholder="Tu nombre completo" />
        <span class="error" id="error_nombre"></span>
      </div>
      <div class="campo">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" value="${datos.email}" placeholder="tucorreo@uleam.edu.ec" />
        <span class="error" id="error_email"></span>
      </div>
      <div class="btn-row">
        <button class="btn-primary" id="btnSiguiente0">Siguiente →</button>
      </div>
    </div>
  `;
}

function renderizarPaso1(docs: Record<string, DocumentoGuardado>): string {
  const zonas = DOCUMENTOS.map((doc) => {
    const cargado = docs[doc.id];
    return `
      <div class="campo">
        <label>${doc.label} <small style="color:var(--color-gris)">(máx. ${doc.limite}, solo PDF)</small></label>
        <div class="zona-drop" id="zona_${doc.id}" onclick="document.getElementById('input_${doc.id}').click()">
          <input type="file" id="input_${doc.id}" accept=".pdf" data-docid="${doc.id}" />
          <p>📎 Arrastra o haz clic para subir</p>
        </div>
        ${cargado ? `<div class="archivo-cargado" id="cargado_${doc.id}">✅ ${cargado.fileName}</div>` : `<div class="archivo-cargado" id="cargado_${doc.id}" style="display:none"></div>`}
        <span class="error" id="error_${doc.id}"></span>
      </div>
    `;
  }).join("");

  return `
    <div class="card">
      ${renderizarPasos(1)}
      <h2>Carga de documentos</h2>
      ${zonas}
      <div class="btn-row">
        <button class="btn-secondary" id="btnAnterior1">← Anterior</button>
        <button class="btn-primary" id="btnSiguiente1">Siguiente →</button>
      </div>
    </div>
  `;
}

function renderizarPaso2(
  nombre: string,
  email: string,
  docs: Record<string, DocumentoGuardado>
): string {
  const listaDoc = DOCUMENTOS.map((d) => `
    <li style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--color-borde)">
      <span>${d.label}</span>
      <strong style="color:${docs[d.id] ? "#10B981" : "#EF4444"}">
        ${docs[d.id] ? "✅ " + docs[d.id].fileName : "❌ Pendiente"}
      </strong>
    </li>
  `).join("");

  return `
    <div class="card">
      ${renderizarPasos(2)}
      <h2>Revisión final</h2>
      <p style="margin-bottom:var(--spacing-md);color:var(--color-gris)">
        Revisa que todo esté correcto antes de enviar.
      </p>
      <div style="margin-bottom:var(--spacing-md)">
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${email}</p>
      </div>
      <ul style="list-style:none;margin-bottom:var(--spacing-lg)">${listaDoc}</ul>
      <div class="btn-row">
        <button class="btn-secondary" id="btnAnterior2">← Anterior</button>
        <button class="btn-primary" id="btnEnviar">Enviar postulación ✓</button>
      </div>
    </div>
  `;
}

function renderizarExito(): string {
  return `
    <div class="resultado-card" style="margin-top:var(--spacing-lg)">
      <h2>¡Postulación enviada!</h2>
      <p style="margin-bottom:var(--spacing-lg)">
        Tu solicitud fue registrada correctamente. Puedes hacer seguimiento desde el módulo de Seguimiento.
      </p>
      <div class="btn-row" style="justify-content:center">
        <button class="btn-primary" id="btnIrSeguimiento">Ver mi seguimiento →</button>
      </div>
    </div>
  `;
}

export function renderizarPostulacion(navCallback: (modulo: string) => void): void {
  const app = document.getElementById("app")!;
  let paso = 0;
  let datos = obtenerDatosPostulacion();

  function navbar(): string {
    return `
      <header>
        <nav>
          <span class="nav-logo">Beca<span class="acento">ULEAM</span></span>
          <div class="nav-modulos" id="navModulos">
            <button class="nav-btn" data-modulo="verificador">Verificador</button>
            <button class="nav-btn activo" data-modulo="postulacion">Postulación</button>
            <button class="nav-btn" data-modulo="seguimiento">Seguimiento</button>
            <button class="nav-btn" data-modulo="encargado">Encargado</button>
          </div>
        </nav>
      </header>
    `;
  }

  function montar(): void {
    let contenido = "";
    if (paso === 0) contenido = renderizarPaso0();
    else if (paso === 1) contenido = renderizarPaso1(datos.documentos);
    else if (paso === 2) contenido = renderizarPaso2(datos.nombre, datos.email, datos.documentos);

    app.innerHTML = `
      ${navbar()}
      <section class="hero hero-postulacion">
        <span class="badge">Módulo 2</span>
        <h1>Postulación y Documentos</h1>
        <p>Completa el formulario y sube tus documentos para postular a tu beca.</p>
      </section>
      <main>${contenido}</main>
      <footer>
        <strong>BecaULEAM · Módulo 2: Postulación y Documentos</strong>
        <address>José Alava Barcia · IS-403 · ULEAM 2026-1</address>
      </footer>
    `;

    bindNav();
    bindPaso();
  }

  function bindNav(): void {
    document.querySelectorAll<HTMLButtonElement>(".nav-btn[data-modulo]").forEach((btn) => {
      btn.addEventListener("click", () => navCallback(btn.dataset.modulo!));
    });
  }

  function bindPaso(): void {
    if (paso === 0) {
      document.getElementById("btnSiguiente0")?.addEventListener("click", () => {
        const nombre = (document.getElementById("nombre") as HTMLInputElement).value.trim();
        const email = (document.getElementById("email") as HTMLInputElement).value.trim();
        const eNombre = validarNombre(nombre);
        const eEmail = validarEmail(email);
        setError("nombre", eNombre);
        setError("email", eEmail);
        if (eNombre || eEmail) return;
        datos.nombre = nombre;
        datos.email = email;
        guardarDatosPostulacion(datos);
        paso = 1;
        montar();
      });
    }

    if (paso === 1) {
      document.getElementById("btnAnterior1")?.addEventListener("click", () => {
        paso = 0;
        montar();
      });

      document.querySelectorAll<HTMLInputElement>("input[type='file']").forEach((input) => {
        input.addEventListener("change", () => {
          const file = input.files?.[0];
          const docId = input.dataset.docid!;
          const doc = DOCUMENTOS.find((d) => d.id === docId)!;
          if (!file) return;
          if (!file.name.endsWith(".pdf")) {
            setError(docId, "Solo se permiten archivos PDF.");
            return;
          }
          if (file.size > parsearLimite(doc.limite)) {
            setError(docId, `El archivo no puede exceder ${doc.limite}.`);
            return;
          }
          setError(docId, "");
          datos.documentos[docId] = { fileName: file.name };
          guardarDatosPostulacion(datos);
          const div = document.getElementById(`cargado_${docId}`)!;
          div.textContent = `✅ ${file.name}`;
          div.style.display = "flex";
        });
      });

      document.getElementById("btnSiguiente1")?.addEventListener("click", () => {
        let valido = true;
        DOCUMENTOS.forEach((doc) => {
          if (!datos.documentos[doc.id]) {
            setError(doc.id, "Este archivo es obligatorio.");
            valido = false;
          }
        });
        if (!valido) return;
        paso = 2;
        montar();
      });
    }

    if (paso === 2) {
      document.getElementById("btnAnterior2")?.addEventListener("click", () => {
        paso = 1;
        montar();
      });

      document.getElementById("btnEnviar")?.addEventListener("click", () => {
        const nueva = {
          id: "SOL-" + Date.now(),
          nombreEstudiante: datos.nombre,
          tipoBeca: "Beca socioeconómica",
          fecha: new Date().toLocaleDateString("es-EC"),
          estado: "Recibida" as const,
          motivo: "",
        };
        const solicitudes = JSON.parse(
          localStorage.getItem("becauleam_solicitudes") || "[]"
        );
        solicitudes.push(nueva);
        localStorage.setItem("becauleam_solicitudes", JSON.stringify(solicitudes));

        const main = document.querySelector("main")!;
        main.innerHTML = renderizarExito();
        document.getElementById("btnIrSeguimiento")?.addEventListener("click", () => {
          navCallback("seguimiento");
        });
      });
    }
  }

  montar();
}