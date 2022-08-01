const views = document.querySelector('.views');
const texts = [];

texts[0] = "Welcome to parcel delivery app";
texts[1] = "We offer great affordable services ";
texts[2] = "Swift,Reliable and Efficient";
texts[3] = "Make your orders with comfort";
texts[4] = "We pickup and deliver anywhere";

function changeText(){
    views.innerHTML = texts[Math.floor(Math.random() * texts.length)];
}
setInterval(changeText, 2000);