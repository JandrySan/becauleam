// Módulo 1: Verificador de Elegibilidad — Rosanna Ochoa

interface Beca {
  nombre: string;
  promedioMin: number;
  requiereVulnerabilidad: boolean;
  requiereFueraManta: boolean;
}

const BECAS: Beca[] = [
  { nombre: "Beca de Mérito Académico", promedioMin: 8.5, requiereVulnerabilidad: false, requiereFueraManta: false },
  { nombre: "Beca Socioeconómica", promedioMin: 6.0, requiereVulnerabilidad: true, requiereFueraManta: false },
  { nombre: "Beca de Movilidad", promedioMin: 7.0, requiereVulnerabilidad: false, requiereFueraManta: true },
  { nombre: "Beca por Discapacidad", promedioMin: 6.0, requiereVulnerabilidad: true, requiereFueraManta: false },
];

function calcularBecas(promedio: number, vulnerable: boolean, fueraManta: boolean): Beca[] {
  return BECAS.filter((b) => {
    if (promedio < b.promedioMin) return false;
    if (b.requiereVulnerabilidad && !vulnerable) return false;
    if (b.requiereFueraManta && !fueraManta) return false;
    return true;
  });
}

function renderizarFormulario(): string {
  return `
    <div class="card">
      <h2>Responde 3 preguntas simples</h2>
      <div class="campo">
        <label for="promedio">¿Cuál es tu promedio del último semestre?</label>
        <input type="number" id="promedio" min="0" max="10" step="0.1" placeholder="Ej: 8.5" />
        <span class="error" id="errorPromedio"></span>
      </div>

      <div class="campo">
        <label>¿Perteneces a algún grupo de vulnerabilidad o etnia?</label>
        <div class="opciones-grupo">
          <label class="opcion-label">
            <input type="checkbox" id="etnia" /> Etnia / Pueblo indígena
          </label>
          <label class="opcion-label">
            <input type="checkbox" id="discapacidad" /> Discapacidad
          </label>
        </div>
      </div>

      <div class="campo">
        <label>¿Vives fuera de Manta?</label>
        <div class="opciones-grupo">
          <label class="opcion-label">
            <input type="radio" name="fueraManta" id="fueraSi" value="si" /> Sí
          </label>
          <label class="opcion-label">
            <input type="radio" name="fueraManta" id="fueraNo" value="no" checked /> No
          </label>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn-primary" id="btnVerificar">Ver mis becas disponibles</button>
      </div>
    </div>
  `;
}

function renderizarResultado(becas: Beca[]): string {
  if (becas.length === 0) {
    return `
      <div class="resultado-card">
        <h2>Sin becas disponibles</h2>
        <p>Con los datos ingresados no encontramos becas disponibles en este momento. Te recomendamos mejorar tu promedio o acercarte a Bienestar Universitario para más información.</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn-secondary" id="btnReintentar">Intentar de nuevo</button>
        </div>
      </div>
    `;
  }

  const lista = becas.map((b) => `<li>${b.nombre}</li>`).join("");
  return `
    <div class="resultado-card">
      <h2>¡Felicidades!</h2>
      <p>Eres apto para las siguientes becas. Puedes continuar con tu postulación.</p>
      <ul class="becas-lista">${lista}</ul>
      <div class="btn-row" style="justify-content:center">
        <button class="btn-secondary" id="btnReintentar">Volver a verificar</button>
        <button class="btn-primary" id="btnIrPostulacion">Iniciar postulación →</button>
      </div>
    </div>
  `;
}

export function renderizarVerificador(navCallback: (modulo: string) => void): void {
  const app = document.getElementById("app")!;

  app.innerHTML = `
    ${renderizarNavbar("verificador", navCallback)}

    <section class="hero hero-verificador">
      <span class="badge">Módulo 1</span>
      <h1>Descubre tu beca ideal</h1>
      <p>Responde 3 preguntas simples y conoce tus oportunidades en la ULEAM.</p>
    </section>

    <main id="mainVerificador">
      ${renderizarFormulario()}
    </main>

    <footer>
      <strong>BecaULEAM · Módulo 1: Verificador de Elegibilidad</strong>
      <address>Rosanna Ochoa Carrera · IS-403 · ULEAM 2026-1</address>
    </footer>
  `;

  document.getElementById("btnVerificar")!.addEventListener("click", () => {
    const promedioInput = document.getElementById("promedio") as HTMLInputElement;
    const errorEl = document.getElementById("errorPromedio")!;
    const promedio = parseFloat(promedioInput.value);

    errorEl.textContent = "";

    if (isNaN(promedio) || promedio < 0 || promedio > 10) {
      errorEl.textContent = "Ingresa un promedio válido entre 0 y 10.";
      return;
    }

    const vulnerable =
      (document.getElementById("etnia") as HTMLInputElement).checked ||
      (document.getElementById("discapacidad") as HTMLInputElement).checked;

    const fueraManta =
      (document.getElementById("fueraSi") as HTMLInputElement).checked;

    const becas = calcularBecas(promedio, vulnerable, fueraManta);
    const main = document.getElementById("mainVerificador")!;
    main.innerHTML = renderizarResultado(becas);

    document.getElementById("btnReintentar")?.addEventListener("click", () => {
      main.innerHTML = renderizarFormulario();
      bindVerificador(navCallback);
    });

    document.getElementById("btnIrPostulacion")?.addEventListener("click", () => {
      navCallback("postulacion");
    });
  });
}

function bindVerificador(navCallback: (modulo: string) => void): void {
  document.getElementById("btnVerificar")?.addEventListener("click", () => {
    const promedioInput = document.getElementById("promedio") as HTMLInputElement;
    const errorEl = document.getElementById("errorPromedio")!;
    const promedio = parseFloat(promedioInput.value);
    errorEl.textContent = "";
    if (isNaN(promedio) || promedio < 0 || promedio > 10) {
      errorEl.textContent = "Ingresa un promedio válido entre 0 y 10.";
      return;
    }
    const vulnerable =
      (document.getElementById("etnia") as HTMLInputElement).checked ||
      (document.getElementById("discapacidad") as HTMLInputElement).checked;
    const fueraManta = (document.getElementById("fueraSi") as HTMLInputElement).checked;
    const becas = calcularBecas(promedio, vulnerable, fueraManta);
    const main = document.getElementById("mainVerificador")!;
    main.innerHTML = renderizarResultado(becas);
    document.getElementById("btnReintentar")?.addEventListener("click", () => {
      main.innerHTML = renderizarFormulario();
      bindVerificador(navCallback);
    });
    document.getElementById("btnIrPostulacion")?.addEventListener("click", () => {
      navCallback("postulacion");
    });
  });
}

function renderizarNavbar(activo: string, navCallback: (m: string) => void): string {
  return `
    <header>
      <nav>
        <span class="nav-logo">Beca<span class="acento">ULEAM</span></span>
        <div class="nav-modulos" id="navModulos">
          <button class="nav-btn ${activo === "verificador" ? "activo" : ""}" data-modulo="verificador">Verificador</button>
          <button class="nav-btn ${activo === "postulacion" ? "activo" : ""}" data-modulo="postulacion">Postulación</button>
          <button class="nav-btn ${activo === "seguimiento" ? "activo" : ""}" data-modulo="seguimiento">Seguimiento</button>
          <button class="nav-btn ${activo === "encargado" ? "activo" : ""}" data-modulo="encargado">Encargado</button>
        </div>
      </nav>
    </header>
  `;
  void navCallback;
}
