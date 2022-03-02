const url = 'https://www.random.org/integers/?num=1&min=0&max=255&col=1&base=10&format=plain&rnd=new';
const circles = [];
const circlesCount = 8;

// funkcija koja uspavljuje program odredjen broj milisekundi
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// funkcija za inicijalizaciju niza circles i za pokretanje logike
// beskonacno se izvrsavaju koraci promene boje u zutu, dohvatanje novog broja,
// logovanje tog broja, promena boje semafora u zavisnosti od dobijenog broja i 
// cekanje 1 sekundu (1000ms) pre nego sto se ponovo zatrazi novi broj
async function start() {
    for (i = circlesCount - 1; i >= 0; i--) {
        circles[i] = document.getElementById('pos' + i);
    }

    while (true)
    {
        yellow();
        var randNumber = await getRandomNumber();
        console.log('init: ' + randNumber);
        changeColor(randNumber);
        await sleep(1000);
    }
}

// poziv funkcije start
start();

// dohvatanje random broja pomocu fetch
// fetch je asinhron, sto znaci da se ne ceka da dobijemo odgovor od sajta, 
// pa se koristi await da bismo obezbedili da smo dobili odgovor pre nego sto nastavimo sa daljim izvrsavanjem
async function getRandomNumber() {
    var randNumber;

    await fetch(url, {method: 'GET'})
        .then(response =>  response.json())
        .then(data => randNumber = data)
        .then(() => console.log('getRandomNumber: ' + randNumber));

    return randNumber;
}

// konvertovanje broja u decimalnom zapisu u broj u binarnom koji vracen kroz niz koji ima 8 elemenata
// cifra najmanje tezine se nalazi u nizu na indeksu 0, a najvece tezine na indeksu 7
function convertFromDecToBin(number){
    var binaryNumber = [];
    var carry;

    var binaryPosition = 0;

    while(number > 0){
        carry = number % 2;
        number = Math.floor(number / 2);

        binaryNumber[binaryPosition++] = carry;
    }

    while (binaryPosition < circlesCount){
        binaryNumber[binaryPosition++] = 0;
    }

    return binaryNumber;
}

// promena boje svih krugova u zutu boju
function yellow(){
    for(i = 0; i < circlesCount; i++){
        circles[i].style.background = "yellow";
    }
}

// promena boje krugova u zavisnosti od binarne reprezentacije random broja
function changeColor(number){
    var binary = convertFromDecToBin(number);

    for(i = 0; i < circlesCount; i++){
        if (binary[i] == 0){
            circles[i].style.background = "red";
        }
        else {
            circles[i].style.background = "green";
        }
    }
}



