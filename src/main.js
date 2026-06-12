import { renderizarVerificador } from "./vistaVerificador";
import { renderizarPostulacion } from "./vistaPostulacion";
import { renderizarSeguimiento, renderizarEncargado } from "./vistaSeguimiento";
function navegar(modulo) {
    switch (modulo) {
        case "verificador":
            renderizarVerificador(navegar);
            break;
        case "postulacion":
            renderizarPostulacion(navegar);
            break;
        case "seguimiento":
            renderizarSeguimiento(navegar);
            break;
        case "encargado":
            renderizarEncargado(navegar);
            break;
        default:
            renderizarVerificador(navegar);
    }
    // Bind nav buttons después de montar cada vista
    setTimeout(() => {
        document.querySelectorAll(".nav-btn[data-modulo]").forEach((btn) => {
            btn.addEventListener("click", () => navegar(btn.dataset.modulo));
        });
    }, 0);
}
document.addEventListener("DOMContentLoaded", () => {
    navegar("verificador");
});
