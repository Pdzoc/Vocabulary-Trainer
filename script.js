document.addEventListener('keydown', (event) => {
    if(event.key=='Enter') check();
})

let infoBox = document.querySelector(".info-box");
let resField = document.querySelector('#res');
let pointsField = document.querySelector('#points');
let lab = document.querySelector('label');
let tip = document.querySelector('#tip');
let loadedData;
let sorted;
let points = 0;
let reverseMode = false;

document.getElementById('inputfile').addEventListener('change', function() {
    points = 0;
    pointsField.innerText = 'Score: '+points;
    let reader = new FileReader();
    reader.onload = () => {
        let data = reader.result.replace(/\r/g, "");
        loadedData = data.split("\n");
        sorted = loadedData.sort((a,b) => 0.5 - Math.random())
        lab.innerText = 'Loaded!';
    }
    reader.readAsText(this.files[0]);
})

let counter = 0;

function display(word) {
    document.querySelector('article').innerText = word;
}

function getUserVal() {
    let value = document.querySelector('#answer').value;
    return value;
}

function check() {
    if(document.querySelector('article').innerText.length==0) {
        infoBox.innerText = "First click Next";
    }
    else {
        let ans = getUserVal();
        if((ans == reverseMode? sorted[counter].split(" - ")[0] : sorted[counter].split(" - ")[1])) {
            if(counter < sorted.length) ++counter;
            if(counter==sorted.length) {
                sorted = sorted.sort((a,b) => 0.5 - Math.random())
                counter = 0;
            }
            document.querySelector('#answer').value = '';
            resField.style.background = 'green';
            ++points;
            pointsField.innerText = 'Score: '+points;
            tip.innerHTML = "";
            setTimeout(next, 800);
        }
        else {
            resField.style.background = 'red';
            --points;
            pointsField.innerText = 'Score: '+points;
        }
    }
}

function next() {
    infoBox.innerText = "";
    resField.style.background = "";
    if(!loadedData) {infoBox.innerText = "First load file"; return;}
    let q = reverseMode? sorted[counter].split(" - ")[1] : sorted[counter].split(" - ")[0];
    display(q);
}

function showAnswer() {
    if(document.querySelector('article').innerText.length>0)
    {
        --points;
        tip.innerHTML = sorted[counter].split(" - ")[1];
    }
    else infoBox.innerText = "First click Next";
}

function showInfo() {
    infoBox.innerText = 'Provide txt file in format: "word - translation", then click Next'
}

function typeLetter(x) {
    document.querySelector('#answer').value += x;
}
