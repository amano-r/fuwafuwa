function sleep(msec) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, msec)
    })
}

let ElementsList;
let timer = 1000;
const bezier = "cubic-bezier(0.2,0.3,0.8,0.7)";

function getRandomNum(start,end){
    return start + (end - start) * Math.random();
}

function getElementsList(){
    return document.getElementsByClassName('word');
}

function setDirection(){
    if(Math.random() % 2){
        return "alternate";
    }
    return "alternate-reverse";
}

function generateColor(start,end){
    if(isNaN(start)){
        console.log(start);
        start = parseInt(start,16);
        console.log(start);
    }
    if(isNaN(end)){
        end = parseInt(end,16);
    }
    let result = '';
    for(let i=0;i<3;i++){
        result += Math.floor(getRandomNum(start,end+1)).toString(16);
    }
    return result;
}

function generateBody(){
    let word = String.fromCharCode(65 + Math.floor(25 * Math.random()));  //65~90
    let back_color = generateColor(0,'f');
    let p_styles = "background-color:#" + back_color[0] + back_color[1] + back_color[2] +
                 ";animation:moveVertical infinite " + getRandomNum(1,3) + "s -" + Math.floor(getRandomNum(0,3)) + "s " + bezier + " " + setDirection() + "," + 
                            "moveHorizontal infinite " + getRandomNum(1,3) + "s -" + Math.floor(getRandomNum(0,3)) + "s " + bezier + " " + setDirection() + ";";
   let body = "<p style=\"" + p_styles + "\"></p>";
   return body;
}

function addElement(){
    let area = document.getElementById('Area');
    let body = generateBody();
    area.insertAdjacentHTML('beforeend',body);
    return 0;
}

function removeElement(){
    if (ElementsList.length != 0) {
        let num = Math.floor(getRandomNum(0, ElementsList.length));
        ElementsList[num].remove();
    }
    return 0;
}

function mainRoutine(){
    ElementsList = getElementsList();
    let num = Math.floor(6 * Math.random());
    if (num <= 1) {
        addElement();
    } else if (num <= 4) {
        removeElement();
        addElement();
    } else {
        removeElement();
    }
    return 0;
}

(async () => {
    for(;;){
        await sleep(timer);
        mainRoutine();
        timer = 1000 + 4000 * Math.random();
    }
})();