let subtitle = document.getElementById("subtitle");


allCode = ["Computer Science Student","Full Stack Web Developer","App Developer"];
// console.log(allCode);

// =====================================


function type(text,index){
    if (index < text.length) {
        subtitle.innerHTML += text.charAt(index)
        index++;
        return true;
    }
    return false;
}

function del(index){
    if (index > 0) {
        subtitle.innerText = subtitle.innerText.slice(0, -1);
        index--;
        return true;
    } 
    return false;
}




function typeWrite(text,speed,timeout){

    let index = 0;

    let cursor = "<span class = 'cursor'>|</span>";
    subtitle.insertAdjacentHTML("afterend", cursor)


    return new Promise ((resolve)=>{

        let writeTimer = setInterval(() => {
            //type 
            if(!type(text,index++)){

                // wait for said time
                setTimeout(() => {
                   
                    // we are done return the promise
                    resolve("done");
                }, timeout);
            }
        }, speed);

    })


}




function deleteText(text,speed){
    let index = text.length;

    
    return new Promise((resolve) => {
        let deleteTimer = setInterval(() => {
            if(!del(index--)){
                clearInterval(deleteTimer);
                subtitle.parentElement.removeChild(subtitle.parentElement.lastElementChild);
                resolve("done");
            }
        }, speed);
    })
}



async function doAll(index){
    if(index > allCode.length - 1){
        return "done";
    }

    await typeWrite(allCode[index],50,1500);
    await deleteText(allCode[index],50);
    await doAll(index+1);
}



async function runDoAll() {
      await doAll(0);
      requestAnimationFrame(runDoAll);
}
  
requestAnimationFrame(runDoAll)