(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&t(d)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();const x=[{nombre:"Beca de Mérito Académico",promedioMin:8.5,requiereVulnerabilidad:!1,requiereFueraManta:!1},{nombre:"Beca Socioeconómica",promedioMin:6,requiereVulnerabilidad:!0,requiereFueraManta:!1},{nombre:"Beca de Movilidad",promedioMin:7,requiereVulnerabilidad:!1,requiereFueraManta:!0},{nombre:"Beca por Discapacidad",promedioMin:6,requiereVulnerabilidad:!0,requiereFueraManta:!1}];function z(e,a,o){return x.filter(t=>!(e<t.promedioMin||t.requiereVulnerabilidad&&!a||t.requiereFueraManta&&!o))}function E(){return`
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
  `}function P(e){return e.length===0?`
      <div class="resultado-card">
        <h2>Sin becas disponibles</h2>
        <p>Con los datos ingresados no encontramos becas disponibles en este momento. Te recomendamos mejorar tu promedio o acercarte a Bienestar Universitario para más información.</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn-secondary" id="btnReintentar">Intentar de nuevo</button>
        </div>
      </div>
    `:`
    <div class="resultado-card">
      <h2>¡Felicidades!</h2>
      <p>Eres apto para las siguientes becas. Puedes continuar con tu postulación.</p>
      <ul class="becas-lista">${e.map(o=>`<li>${o.nombre}</li>`).join("")}</ul>
      <div class="btn-row" style="justify-content:center">
        <button class="btn-secondary" id="btnReintentar">Volver a verificar</button>
        <button class="btn-primary" id="btnIrPostulacion">Iniciar postulación →</button>
      </div>
    </div>
  `}function L(e){const a=document.getElementById("app");a.innerHTML=`
    ${F()}

    <section class="hero hero-verificador">
      <span class="badge">Módulo 1</span>
      <h1>Descubre tu beca ideal</h1>
      <p>Responde 3 preguntas simples y conoce tus oportunidades en la ULEAM.</p>
    </section>

    <main id="mainVerificador">
      ${E()}
    </main>

    <footer>
      <strong>BecaULEAM · Módulo 1: Verificador de Elegibilidad</strong>
      <address>Rosanna Ochoa Carrera · IS-403 · ULEAM 2026-1</address>
    </footer>
  `,document.getElementById("btnVerificar").addEventListener("click",()=>{var m,p;const o=document.getElementById("promedio"),t=document.getElementById("errorPromedio"),n=parseFloat(o.value);if(t.textContent="",isNaN(n)||n<0||n>10){t.textContent="Ingresa un promedio válido entre 0 y 10.";return}const i=document.getElementById("etnia").checked||document.getElementById("discapacidad").checked,d=document.getElementById("fueraSi").checked,u=z(n,i,d),r=document.getElementById("mainVerificador");r.innerHTML=P(u),(m=document.getElementById("btnReintentar"))==null||m.addEventListener("click",()=>{r.innerHTML=E(),N(e)}),(p=document.getElementById("btnIrPostulacion"))==null||p.addEventListener("click",()=>{e("postulacion")})})}function N(e){var a;(a=document.getElementById("btnVerificar"))==null||a.addEventListener("click",()=>{var m,p;const o=document.getElementById("promedio"),t=document.getElementById("errorPromedio"),n=parseFloat(o.value);if(t.textContent="",isNaN(n)||n<0||n>10){t.textContent="Ingresa un promedio válido entre 0 y 10.";return}const i=document.getElementById("etnia").checked||document.getElementById("discapacidad").checked,d=document.getElementById("fueraSi").checked,u=z(n,i,d),r=document.getElementById("mainVerificador");r.innerHTML=P(u),(m=document.getElementById("btnReintentar"))==null||m.addEventListener("click",()=>{r.innerHTML=E(),N(e)}),(p=document.getElementById("btnIrPostulacion"))==null||p.addEventListener("click",()=>{e("postulacion")})})}function F(e,a){return`
    <header>
      <nav>
        <span class="nav-logo">Beca<span class="acento">ULEAM</span></span>
        <div class="nav-modulos" id="navModulos">
          <button class="nav-btn activo" data-modulo="verificador">Verificador</button>
          <button class="nav-btn " data-modulo="postulacion">Postulación</button>
          <button class="nav-btn " data-modulo="seguimiento">Seguimiento</button>
          <button class="nav-btn " data-modulo="encargado">Encargado</button>
        </div>
      </nav>
    </header>
  `}const R="becauleam_solicitudes",k="becauleam_postulacion";function y(){try{const e=localStorage.getItem(R);return e?JSON.parse(e):[]}catch{return[]}}function _(e,a,o){const t=y(),n=t.findIndex(i=>i.id===e);n!==-1&&(t[n].estado=a,t[n].motivo=o,localStorage.setItem(R,JSON.stringify(t)))}function C(){try{const e=localStorage.getItem(k);return e?JSON.parse(e):{nombre:"",email:"",documentos:{}}}catch{return{nombre:"",email:"",documentos:{}}}}function A(e){localStorage.setItem(k,JSON.stringify(e))}const g=[{id:"doc_identidad",label:"Cédula de identidad",limite:"2 MB"},{id:"cert_notas",label:"Récord académico",limite:"5 MB"},{id:"planilla_luz",label:"Planilla de luz",limite:"3 MB"}];function T(e){const a=e.toLowerCase().match(/^(\d+(?:\.\d+)?)\s*mb$/);return a?Math.round(parseFloat(a[1])*1024*1024):2*1024*1024}function U(e){return e?e.length<3?"El nombre debe tener al menos 3 caracteres.":"":"El nombre es obligatorio."}function w(e){return e?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)?"":"Formato de correo inválido.":"El correo es obligatorio."}function f(e,a){const o=document.getElementById(`error_${e}`);o&&(o.textContent=a);const t=document.getElementById(e);t==null||t.classList.toggle("invalid",!!a)}function $(e){return`
    <div class="pasos">
      ${["Datos personales","Carga de archivos","Revisión final"].map((o,t)=>`
        <div class="paso ${t<e?"completado":t===e?"activo":""}">
          <div class="paso-num">${t<e?"✓":t+1}</div>
          <span>${o}</span>
        </div>
      `).join("")}
    </div>
  `}function j(){const e=C();return`
    <div class="card">
      ${$(0)}
      <h2>Datos personales</h2>
      <div class="campo">
        <label for="nombre">Nombre completo</label>
        <input type="text" id="nombre" value="${e.nombre}" placeholder="Tu nombre completo" />
        <span class="error" id="error_nombre"></span>
      </div>
      <div class="campo">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" value="${e.email}" placeholder="tucorreo@uleam.edu.ec" />
        <span class="error" id="error_email"></span>
      </div>
      <div class="btn-row">
        <button class="btn-primary" id="btnSiguiente0">Siguiente →</button>
      </div>
    </div>
  `}function H(e){const a=g.map(o=>{const t=e[o.id];return`
      <div class="campo">
        <label>${o.label} <small style="color:var(--color-gris)">(máx. ${o.limite}, solo PDF)</small></label>
        <div class="zona-drop" id="zona_${o.id}" onclick="document.getElementById('input_${o.id}').click()">
          <input type="file" id="input_${o.id}" accept=".pdf" data-docid="${o.id}" />
          <p>📎 Arrastra o haz clic para subir</p>
        </div>
        ${t?`<div class="archivo-cargado" id="cargado_${o.id}">✅ ${t.fileName}</div>`:`<div class="archivo-cargado" id="cargado_${o.id}" style="display:none"></div>`}
        <span class="error" id="error_${o.id}"></span>
      </div>
    `}).join("");return`
    <div class="card">
      ${$(1)}
      <h2>Carga de documentos</h2>
      ${a}
      <div class="btn-row">
        <button class="btn-secondary" id="btnAnterior1">← Anterior</button>
        <button class="btn-primary" id="btnSiguiente1">Siguiente →</button>
      </div>
    </div>
  `}function J(e,a,o){const t=g.map(n=>`
    <li style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--color-borde)">
      <span>${n.label}</span>
      <strong style="color:${o[n.id]?"#10B981":"#EF4444"}">
        ${o[n.id]?"✅ "+o[n.id].fileName:"❌ Pendiente"}
      </strong>
    </li>
  `).join("");return`
    <div class="card">
      ${$(2)}
      <h2>Revisión final</h2>
      <p style="margin-bottom:var(--spacing-md);color:var(--color-gris)">
        Revisa que todo esté correcto antes de enviar.
      </p>
      <div style="margin-bottom:var(--spacing-md)">
        <p><strong>Nombre:</strong> ${e}</p>
        <p><strong>Correo:</strong> ${a}</p>
      </div>
      <ul style="list-style:none;margin-bottom:var(--spacing-lg)">${t}</ul>
      <div class="btn-row">
        <button class="btn-secondary" id="btnAnterior2">← Anterior</button>
        <button class="btn-primary" id="btnEnviar">Enviar postulación ✓</button>
      </div>
    </div>
  `}function G(){return`
    <div class="resultado-card" style="margin-top:var(--spacing-lg)">
      <h2>¡Postulación enviada!</h2>
      <p style="margin-bottom:var(--spacing-lg)">
        Tu solicitud fue registrada correctamente. Puedes hacer seguimiento desde el módulo de Seguimiento.
      </p>
      <div class="btn-row" style="justify-content:center">
        <button class="btn-primary" id="btnIrSeguimiento">Ver mi seguimiento →</button>
      </div>
    </div>
  `}function K(e){const a=document.getElementById("app");let o=0,t=C();function n(){return`
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
    `}function i(){let r="";o===0?r=j():o===1?r=H(t.documentos):o===2&&(r=J(t.nombre,t.email,t.documentos)),a.innerHTML=`
      ${n()}
      <section class="hero hero-postulacion">
        <span class="badge">Módulo 2</span>
        <h1>Postulación y Documentos</h1>
        <p>Completa el formulario y sube tus documentos para postular a tu beca.</p>
      </section>
      <main>${r}</main>
      <footer>
        <strong>BecaULEAM · Módulo 2: Postulación y Documentos</strong>
        <address>José Alava Barcia · IS-403 · ULEAM 2026-1</address>
      </footer>
    `,d(),u()}function d(){document.querySelectorAll(".nav-btn[data-modulo]").forEach(r=>{r.addEventListener("click",()=>e(r.dataset.modulo))})}function u(){var r,m,p,S,I;o===0&&((r=document.getElementById("btnSiguiente0"))==null||r.addEventListener("click",()=>{const c=document.getElementById("nombre").value.trim(),s=document.getElementById("email").value.trim(),l=U(c),b=w(s);f("nombre",l),f("email",b),!(l||b)&&(t.nombre=c,t.email=s,A(t),o=1,i())})),o===1&&((m=document.getElementById("btnAnterior1"))==null||m.addEventListener("click",()=>{o=0,i()}),document.querySelectorAll("input[type='file']").forEach(c=>{c.addEventListener("change",()=>{var M;const s=(M=c.files)==null?void 0:M[0],l=c.dataset.docid,b=g.find(O=>O.id===l);if(!s)return;if(!s.name.endsWith(".pdf")){f(l,"Solo se permiten archivos PDF.");return}if(s.size>T(b.limite)){f(l,`El archivo no puede exceder ${b.limite}.`);return}f(l,""),t.documentos[l]={fileName:s.name},A(t);const B=document.getElementById(`cargado_${l}`);B.textContent=`✅ ${s.name}`,B.style.display="flex"})}),(p=document.getElementById("btnSiguiente1"))==null||p.addEventListener("click",()=>{let c=!0;g.forEach(s=>{t.documentos[s.id]||(f(s.id,"Este archivo es obligatorio."),c=!1)}),c&&(o=2,i())})),o===2&&((S=document.getElementById("btnAnterior2"))==null||S.addEventListener("click",()=>{o=1,i()}),(I=document.getElementById("btnEnviar"))==null||I.addEventListener("click",()=>{var b;const c={id:"SOL-"+Date.now(),nombreEstudiante:t.nombre,tipoBeca:"Beca socioeconómica",fecha:new Date().toLocaleDateString("es-EC"),estado:"Recibida",motivo:""},s=JSON.parse(localStorage.getItem("becauleam_solicitudes")||"[]");s.push(c),localStorage.setItem("becauleam_solicitudes",JSON.stringify(s));const l=document.querySelector("main");l.innerHTML=G(),(b=document.getElementById("btnIrSeguimiento"))==null||b.addEventListener("click",()=>{e("seguimiento")})}))}i()}const h={Recibida:"#3B82F6","En revisión":"#F59E0B",Aprobada:"#10B981",Rechazada:"#EF4444"};function V(e){return`
    <header>
      <nav>
        <span class="nav-logo">Beca<span class="acento">ULEAM</span></span>
        <div class="nav-modulos" id="navModulos">
          <button class="nav-btn" data-modulo="verificador">Verificador</button>
          <button class="nav-btn" data-modulo="postulacion">Postulación</button>
          <button class="nav-btn ${e==="seguimiento"?"activo":""}" data-modulo="seguimiento">Seguimiento</button>
          <button class="nav-btn ${e==="encargado"?"activo":""}" data-modulo="encargado">Encargado</button>
        </div>
      </nav>
    </header>
  `}function W(e){const a=["Recibida","En revisión","Aprobada"],o=e.estado==="Rechazada";return`
    <div class="timeline">
      ${a.map(n=>{let i="pendiente";return n==="Recibida"&&(i="listo"),n==="En revisión"&&(e.estado==="En revisión"||e.estado==="Aprobada")&&(i="listo"),n===e.estado&&(i="activo"),`
      <div class="timeline-step ${i}">
        <div class="timeline-dot"></div>
        <p class="step-titulo">${n}</p>
      </div>
    `}).join("")}
      ${o?`
        <div class="timeline-step rechazado">
          <div class="timeline-dot"></div>
          <p class="step-titulo">Rechazada</p>
          <p class="step-motivo">Motivo: ${e.motivo||"Sin especificar"}</p>
        </div>`:""}
    </div>
  `}function Q(){const e=y();return e.length===0?'<p class="sin-datos">Aún no tienes solicitudes. Ve a Postulación para enviar una.</p>':e.map(a=>`
    <div class="solicitud-card">
      <div class="solicitud-header">
        <div>
          <p class="solicitud-id">${a.id}</p>
          <p class="solicitud-tipo">${a.tipoBeca}</p>
          <p class="solicitud-nombre">${a.nombreEstudiante}</p>
        </div>
        <span class="estado-badge" style="background:${h[a.estado]}20;color:${h[a.estado]}">
          ${a.estado}
        </span>
      </div>
      ${W(a)}
    </div>
  `).join("")}function X(e){const a=document.getElementById("app");a.innerHTML=`
    ${V("seguimiento")}
    <section class="hero">
      <span class="badge">Módulo 3 · Seguimiento</span>
      <h1>Seguimiento de Solicitud</h1>
      <p>Consulta el estado de tu beca en todo momento.</p>
    </section>
    <main>
      <section id="misSolicitudes">
        <h2>Mis solicitudes</h2>
        ${Q()}
      </section>
    </main>
    <footer>
      <strong>BecaULEAM · Módulo 3: Seguimiento de Solicitud</strong>
      <address>Jandry Sánchez Murillo · IS-403 · ULEAM 2026-1</address>
    </footer>
  `,D(e)}function q(e){const a=document.getElementById("app");function o(){const t=y();return t.length===0?'<p class="sin-datos">No hay solicitudes registradas aún.</p>':`
      <div class="tabla-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Estudiante</th><th>Tipo beca</th><th>Fecha</th>
              <th>Estado</th><th>Cambiar estado</th><th>Motivo</th><th>Acción</th>
            </tr>
          </thead>
          <tbody>${t.map(i=>`
      <tr>
        <td>${i.id}</td>
        <td>${i.nombreEstudiante}</td>
        <td>${i.tipoBeca}</td>
        <td>${i.fecha}</td>
        <td>
          <span class="estado-badge" style="background:${h[i.estado]}20;color:${h[i.estado]}">
            ${i.estado}
          </span>
        </td>
        <td>
          <select class="select-estado" data-id="${i.id}">
            <option value="Recibida"    ${i.estado==="Recibida"?"selected":""}>Recibida</option>
            <option value="En revisión" ${i.estado==="En revisión"?"selected":""}>En revisión</option>
            <option value="Aprobada"    ${i.estado==="Aprobada"?"selected":""}>Aprobada</option>
            <option value="Rechazada"   ${i.estado==="Rechazada"?"selected":""}>Rechazada</option>
          </select>
        </td>
        <td>
          <input class="input-motivo" data-id="${i.id}" placeholder="Motivo si rechaza" value="${i.motivo}" />
        </td>
        <td>
          <button class="btn-actualizar" data-id="${i.id}">Guardar</button>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
    `}a.innerHTML=`
    ${V("encargado")}
    <section class="hero hero-encargado">
      <span class="badge">Panel del Encargado</span>
      <h1>Gestión de Solicitudes</h1>
      <p>Revisa y actualiza el estado de cada solicitud recibida.</p>
    </section>
    <main>
      <section>
        <h2>Solicitudes recibidas</h2>
        <div id="tablaContainer">${o()}</div>
      </section>
    </main>
    <footer>
      <strong>BecaULEAM · Panel del Encargado</strong>
      <address>IS-403 · ULEAM 2026-1</address>
    </footer>
  `,D(e),document.querySelectorAll(".btn-actualizar").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.id,i=document.querySelector(`.select-estado[data-id="${n}"]`),d=document.querySelector(`.input-motivo[data-id="${n}"]`),u=i.value,r=d.value.trim();if(u==="Rechazada"&&!r){alert("Debes indicar el motivo del rechazo.");return}_(n,u,r),q(e)})})}function D(e){document.querySelectorAll(".nav-btn[data-modulo]").forEach(a=>{a.addEventListener("click",()=>e(a.dataset.modulo))})}function v(e){switch(e){case"verificador":L(v);break;case"postulacion":K(v);break;case"seguimiento":X(v);break;case"encargado":q(v);break;default:L(v)}setTimeout(()=>{document.querySelectorAll(".nav-btn[data-modulo]").forEach(a=>{a.addEventListener("click",()=>v(a.dataset.modulo))})},0)}document.addEventListener("DOMContentLoaded",()=>{v("verificador")});
