function recursiveAnimateTitle(string) {
    let firstLetter = string[0];
    let title = document.querySelector('title');
    title.innerHTML += firstLetter;
    if (string.length > 1) {
        setTimeout(function() {
        recursiveAnimateTitle(string.substring(1));
        }, 100);
    }
}
  
function animateTitle(string) {
    document.querySelector('title').innerHTML = "";
    recursiveAnimateTitle(string);
    return
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }  

// console.log(document.querySelector('title'))
// while (true) {
//     sleep(5000);
//     ;
// }
// sleep(5000)

function startanimate() {
    setInterval(function(){ 
        animateTitle('𝖗𝖎𝖕 𝖌𝖕𝖆 ☠')
    }, 2500);
}
