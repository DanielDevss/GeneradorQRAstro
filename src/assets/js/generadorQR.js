// Importaciones
import QRCode from "qrcode";
import { svgAsDataUri, svgAsPngUri } from "save-svg-as-png";

// Controles de QR
const button = document.querySelector("#btnGenerar");
const buttonReset = document.querySelector("#btnReset");
const content = document.querySelector("#contentQR");
const btnPNG = document.querySelector("#btnDownloadPNG");
const btnSVG = document.querySelector("#btnDownloadSVG");

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
// const spanSize = document.querySelector("#sizePX");
// const rangeSize = document.querySelector("#sizeQR");
// const sizeUnit = 41;
// let scaleQR = 5;
// spanSize.innerHTML = sizeUnit * scaleQR;

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
// const onResize = (e) => {
//     const num = e.target.value;
//     const resize = sizeUnit * num;
//     spanSize.innerHTML = resize;
//     scaleQR = num;
// }

// Generar QR
const generarQR = (valor) => {

    try{
        QRCode.toString(valor, {type:"svg"}, async (err, svg) => {
            if(err) console.log(err);
            content.innerHTML = svg;

            const svgElement = content.querySelector("svg");
            const SVGuri = await svgAsDataUri(svgElement);
            const PNGuri = await svgAsPngUri(svgElement, {scale:5});

            btnPNG.href = PNGuri;
            btnSVG.href = SVGuri;

            btnPNG.classList.remove("bg-slate-400", "pointer-events-none");
            btnSVG.classList.remove("bg-slate-400", "pointer-events-none");
            buttonReset.classList.remove("pointer-events-none");
        });
    }
    catch(err) {
        console.error(err);
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
        valor = `https://api.whatsapp.com/send/?phone=${vNumber}&text=${vMsg}`;
    }
    generarQR(valor);
}
 
const resetQR = () => {
    btnPNG.classList.add("bg-slate-400", "pointer-events-none");
    btnSVG.classList.add("bg-slate-400", "pointer-events-none");
    buttonReset.classList.add("pointer-events-none");
    btnPNG.href = null;
    btnSVG.href = null;
    inpQRURL.value = null;
    inpNumber.value = null;
    taMsgWhats.value = null;
}


// Inicializadores
onSelect();
rLink.addEventListener("input", onSelect);
rWhats.addEventListener("input", onSelect);

buttonReset.addEventListener("click", resetQR);
button.addEventListener("click", generateQROptionSelected);
rangeSize.addEventListener("input", (e) => onResize(e));