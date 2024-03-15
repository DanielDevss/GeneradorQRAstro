// Importaciones
import QRCode from "qrcode";

// Controles de QR
const button = document.querySelector("#btnGenerar");
const buttonReset = document.querySelector("#btnReset");
const responseIMG = document.querySelector("#imgResponseQR");
const downloadA = document.querySelector("#downloadQR");

// Enlace
const inpQRURL = document.querySelector("#inpURLQr");

// Whatsapp
const inpNumber = document.querySelector("#inpNumber");
const taMsgWhats = document.querySelector("#taMsgWhats");

// Secciones
const sWhats = document.querySelector("#sWhatsapp");
const sLink = document.querySelector("#sEnlace");

//Selectores
const rLink = document.querySelector("#rLink");
const rWhats = document.querySelector("#rWhatsapp");

// Configuraciones
const spanSize = document.querySelector("#sizePX");
const rangeSize = document.querySelector("#sizeQR");
const sizeUnit = 41;
let scaleQR = 5;
spanSize.innerHTML = sizeUnit * scaleQR;

// Funciones de Selectores
const onSelect = (e) => {
    if(rLink.checked){
        sLink.classList.remove("hidden");
        sWhats.classList.add("hidden");
    }
    if(rWhats.checked){
        sLink.classList.add("hidden");
        sWhats.classList.remove("hidden");
    }
}

// Funciones del QR
const onResize = (e) => {
    const num = e.target.value;
    const resize = sizeUnit * num;
    spanSize.innerHTML = resize;
    scaleQR = num;
}

const generarQR = (valor) => {

    try { 
        QRCode.toDataURL(valor, { scale: scaleQR }, (err, url) => {
            if(err) {
                console.log(`Error al crear QR: ${err.message}`);
                return;
            }
            responseIMG.src = url;
            responseIMG.classList.remove("opacity-0")
            downloadA.href = url;
            downloadA.download = "CodigoQR.png"
            downloadA.classList.remove("pointer-events-none", "bg-slate-400");
            buttonReset.classList.remove("pointer-events-none", "bg-slate-400", "text-slate-900");
        });
    }
    catch(err) {
        console.error(`Error al generar: ${err.message}`);
    }
}

const generateQROptionSelected = () => {
    let valor;
    if(rLink.checked) {
        valor = inpQRURL.value;
    }
    if(rWhats.checked) {
        const vNumber = inpNumber.value;
        const vMsg = taMsgWhats.value;
        valor = `https://api.whatsapp.com/send/?phone=${vNumber}&text=${vMsg}`
    }
    generarQR(valor);
}
 
const resetQR = () => {
    downloadA.classList.add("pointer-events-none", "bg-slate-400");
    buttonReset.classList.add("pointer-events-none", "bg-slate-400", "text-slate-900");
    responseIMG.classList.add("opacity-0")
    responseIMG.src = null;
    downloadA.href = null;
    inpQRURL.value = null;
}

// Inicializadores
onSelect();
rLink.addEventListener("input", onSelect);
rWhats.addEventListener("input", onSelect);

buttonReset.addEventListener("click", resetQR);
button.addEventListener("click", generateQROptionSelected);
rangeSize.addEventListener("input", (e) => onResize(e));