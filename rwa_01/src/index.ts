const title = document.createElement("label");
title.className = "title";
title.innerHTML = "How old are you?";
document.body.appendChild(title);

const inputDate = document.createElement("input");
inputDate.type = "date";
inputDate.className = "input-date";
document.body.appendChild(inputDate);

const btnShowMe = document.createElement("button");
btnShowMe.className = "btn-show-me";
btnShowMe.innerHTML = "Show me!";
document.body.appendChild(btnShowMe);

btnShowMe.onclick = ev => {

    const currentDate = new Date();
    const dateNow = new Date(currentDate.getFullYear(), currentDate.getMonth(),currentDate.getDate(), currentDate.getHours()
    , currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds()); 
    const dateInput = new Date(inputDate.value);

    const diffInDates = dateNow.getTime() - dateInput.getTime();
    
    let arrayInfo = new Array();

    const years = Math.floor(diffInDates / (1000 * 60 * 60 * 24 * 365));
    arrayInfo.push(years);
    const days = Math.floor(diffInDates / (1000 * 60 * 60 * 24));
    arrayInfo.push(days);
    const minutes = Math.floor(diffInDates / (1000 * 60 * 60));
    arrayInfo.push(minutes);
    const seconds = Math.floor(diffInDates / (1000 * 60));
    arrayInfo.push(seconds);
    const miliseconds = Math.floor(diffInDates / 1000);
    arrayInfo.push(miliseconds);

    const infoBox = document.createElement("div");
    infoBox.className = "info-box";
    document.body.appendChild(infoBox);

    let arrayInfoSuf = [" godina."," dana."," minuta."," sekundi"," milisekundi"];

    let labImate = document.createElement("label");
    labImate.innerHTML = "Imate:";
    labImate.className = "labele";
    infoBox.appendChild(labImate);

    let i : number = 0;
    arrayInfoSuf.forEach(el => {
        let labPodatak = document.createElement("label");
        labPodatak.className = "labele";
        labPodatak.innerHTML = `${arrayInfo[i]}${el}`;
        infoBox.appendChild(labPodatak);
        i++;
    });

    console.log(Math.floor(years));
    console.log(Math.floor(days));
    console.log(Math.floor(minutes));
    console.log(Math.floor(seconds));
    console.log(Math.floor(miliseconds));

};