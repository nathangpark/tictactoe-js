let array = [[0,0,0],[0,0,0],[0,0,0]];
let turncount = 0;
const space = document.getElementsByClassName("space");
const winscreen = document.querySelector('#winscreen');
const wintext = document.querySelector('#wintext');
const retrylink = document.querySelector('#retry');
console.log(space.length);
// Animates Opening
winscreen.style.cssText = 'transition: opacity 900ms; top: 13vh; opacity: 1';
function slideBoard(){
  winscreen.style.cssText = 'top: 200vh; opacity 1';
}
function hideBoard(){
  winscreen.style.cssText = 'opacity: 0';
}
setTimeout(slideBoard,100);
setTimeout(hideBoard,1000);



// to cancel transitions during window resizing (transition trigger only when mouseover) 
for (let p = 0; p < space.length; p++){
  function setTransition(){
    space[p].style.cssText = 'transition: opacity 0.1s, width 0.1s, height 0.1s, top 0.1s,left 0.1s;';
  }
  space[p].addEventListener('mouseover',function(){ 
    if (solutionCheck() == false){
      setTransition();
    }
  });
  function resetTransition(){
    space[p].style.cssText = 'transition: 0';
  }  
  space[p].addEventListener('mouseleave',function(){
    if (solutionCheck() == false){
      setTimeout(resetTransition, 100);
    }
  });
}
// cancel anim for window resize on retry button
retrylink.addEventListener('mouseover',function(){
  if (solutionCheck() == true){

    retrylink.style.cssText = 'transition: all 0.2; top 100ms, font-size 100ms, height 100ms, width: 22vh; opacity: 1';
  }
});

function resetRetryButton(){
  retrylink.style.cssText = 'transition: 0; top 100ms, font-size 100ms, height 100ms, width: 22vh; opacity: 1';
};

retrylink.addEventListener('mouseleave',function(){
  if (solutionCheck() == true){
    setTimeout(resetRetryButton, 200);
  }
});



for (let i = 0; i < space.length; i++){
  space[i].addEventListener('click',function(){
    if (space[i].innerHTML == '' && !solutionCheck()){
      turncount++;
      let input = turncount%2 == 0 ? 'O' : 'X';

      let row = i < 3 ? 0 : i < 6 ? 1 : 2
      let column = i%3;
      array[row][column] = turncount%2 == 0 ? 2 : 1;
      space[i].innerHTML = input;
      solutionCheck();  }
  });
}

// Solutions

function solutionCheck(){
  let solved = false;

  // horizontal
  for (let i = 0; i <= 2; i++){
    if (array[i][0] != 0 && array[i][0] == array[i][1] && array[i][1] == array[i][2]){
      solved = true;
      winner = array[i][0] == 1 ? 'X' : 'O';
      for (let k = 0; k <= 2; k++){
        space[3*i + k].style.cssText = "opacity: 0.9 ; transition: opacity 0.5s";
      } 
    }
  }
  
  // vertical
  for (let i = 0; i <= 2; i++){
    if (array[0][i] != 0 && array[0][i] == array[1][i] && array[1][i] == array[2][i]){
      solved = true;
      winner = array[0][i] == 1 ? 'X' : 'O';

      for (let k = 0; k <= 2; k++){
        space[i+3*k].style.cssText = "opacity: 0.9 ; transition: opacity 0.5s";
      }
    }
  }

  // diagonal 
  if (array[0][0] != 0 && array[0][0] == array[1][1] && array[1][1] == array[2][2]){
    solved = true;
    winner = array[0][0] == 1 ? 'X' : 'O';
    for (let i = 0; i <= 2; i++){
      space[4*i].style.cssText = "opacity: 0.9 ; transition: opacity 0.5s";
    }
  } 

  if (array[0][2] != 0 && array[0][2] == array[1][1] && array[1][1] == array[2][0]){
    solved = true;
    winner = array[0][2] == 1 ? 'X' : 'O';
    for (let i = 1; i <= 3; i++){
      space[2*i].style.cssText = "opacity: 0.9 ; transition: opacity 0.5s";
    }
  }

  // fullcheck
  let full = true;
  for (let i = 0; i<=2; i++){
    for (let k = 0; k<=2; k++){
      if (array[i][k] == 0){
        full = false;
      }
    }
  }
  // display

  function WinAnim(){
    winscreen.style.cssText = 'transition: top 0, opacity 900ms; top: 13vh; opacity: 1';
    wintext.style.cssText = 'transition: opacity 400ms; opacity: 1';
    retrylink.style.cssText = 'transition: opacity 900ms, top 100ms, font-size 100ms, height 100ms, width: 22vh; opacity: 1';
  }
  
  function revealcover(){
    winscreen.style.cssText = "transition: opacity 900ms; top: 13vh; opacity: 1 ";
    retrylink.style.cssText = 'transition: opacity 900ms';
    setTimeout(WinAnim, 900);
  }
  function resetWinAnim(){
    winscreen.style.cssText = 'transition: none; top: 13vh; opacity: 1';
  }
  if (solved && wintext.innerHTML == ''){
    winscreen.style.cssText = 'top: 13vh; opacity: 0';
    wintext.innerHTML = winner + ' Wins!';

    setTimeout(revealcover, 1000);
    setTimeout(resetWinAnim, 2000);

  } else if (full && !solved){
    winscreen.style.cssText = 'top: 13vh; opacity: 0';
    solved = true;
    for (let i = 0; i < space.length; i++){ // to change color of spaces to red
      space[i].style.cssText = "background-color: rgb(214, 70, 70); color: white; opacity: 0.3; \
      transition: color 0.8s, background-color 0.8s, opacity 0.8s, width 0.1s, height 0.1s, top 0.1s,left 0.1s;";
    }
    wintext.innerHTML = 'No Winner';  
    setTimeout(revealcover, 1000);
  }
  return solved; // used before to stop cancelling transitions after win
}