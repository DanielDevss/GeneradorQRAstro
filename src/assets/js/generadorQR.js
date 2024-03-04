import QRCode from "qrcode";

const button = document.querySelector("#btnGenerar");
const buttonReset = document.querySelector("#btnReset");
const inpQRURL = document.querySelector("#inpURLQr");
const responseIMG = document.querySelector("#imgResponseQR");
const downloadA = document.querySelector("#downloadQR");

const spanSize = document.querySelector("#sizePX");
const rangeSize = document.querySelector("#sizeQR");
const sizeUnit = 41;
let scaleQR = 5;

spanSize.innerHTML = sizeUnit * scaleQR;

const onResize = (e) => {
    const num = e.target.value;
    const resize = sizeUnit * num;
    spanSize.innerHTML = resize;
    scaleQR = num;
}

const generarQRString = (valor) => {

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

const resetQR = () => {
    downloadA.classList.add("pointer-events-none", "bg-slate-400");
    buttonReset.classList.add("pointer-events-none", "bg-slate-400", "text-slate-900");
    responseIMG.classList.add("opacity-0")
    responseIMG.src = null;
    downloadA.href = null;
    inpQRURL.value = null;
}

buttonReset.addEventListener("click", resetQR);
button.addEventListener("click", () => generarQRString(inpQRURL.value));
rangeSize.addEventListener("input", (e) => onResize(e));