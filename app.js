function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

function addToInput (inputElement){
  if(inputElement.value === ''){
    inputElement.value = 0;
  }
  inputElement.value =+inputElement.value +1;
}

function removeFromInput(inputElement){
  if(inputElement.value === ''){
    inputElement.value = 0;
  }else if(+inputElement.value != 0){
    inputElement.value = +inputElement.value -1;
  }
}
//Apply function to each of the inputs
document.querySelectorAll(".number-field").forEach((field) => {
  setInputFilter(field, function (value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
  });
  field.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowUp'){
      addToInput(e.target);
    }else if(e.key === 'ArrowDown'){
      removeFromInput(e.target)
    }
  })
});

document.querySelectorAll('.veg-container .water-buttons-group a').forEach(button=>{
  button.addEventListener('click', (e)=>{
    e.preventDefault();
    if(e.target.classList.contains('veg-water-increment')){
      console.log('asd')
      addToInput(document.querySelector('#veg-gallons-week'));
    }else if(e.target.classList.contains('veg-water-substraction')){
      removeFromInput(document.querySelector('#veg-gallons-week'));
    }
  })
})

document.querySelectorAll('.flow-container .water-buttons-group a').forEach(button=>{
  button.addEventListener('click', (e)=>{
    e.preventDefault();
    if(e.target.classList.contains('flow-water-increment')){
      addToInput(document.querySelector('#flow-gallons-week'));
    }else if(e.target.classList.contains('flow-water-substraction')){
      removeFromInput(document.querySelector('#flow-gallons-week'));
    }
  })
})




document.querySelector(".input-fields").addEventListener("submit", (e) => {
  e.preventDefault();

  const vegWeek = +document.querySelector('.veg-radio:checked').value;
  const vegWeeklyWater = +document.querySelector('#veg-gallons-week').value;
  const flowWeek = +document.querySelector('.flow-radio:checked').value;
  const flowWeeklyWater = +document.querySelector('#flow-gallons-week').value;
  let partA = (vegWeek * vegWeeklyWater *4.06) + (flowWeek * flowWeeklyWater * 2.7),
      partB = (vegWeek * vegWeeklyWater *2.73) + (flowWeek * flowWeeklyWater * 1.814),
      bloom = (flowWeek * flowWeeklyWater * 2.1),
      frontRowSi = (vegWeek*(0.5*vegWeeklyWater))+(flowWeek*(0.5*flowWeeklyWater)),
      cleanUp = (vegWeek*(0.5*vegWeeklyWater))+(flowWeek*(0.5*flowWeeklyWater)),
      triologic = (vegWeek*(0.5*vegWeeklyWater))+(flowWeek*(0.5*flowWeeklyWater));

    let triologicMl = Math.ceil(triologic),
    leftTriologic = triologicMl,
    triologic500 = 0,
    triologic1G = 0,
    triologic2_5G = 0;

    while(leftTriologic > 0){
      leftTriologic -= 500
      triologic500++;
      if(triologic500 === 7 && triologic1G != 2){
        triologic500 = 0;
        triologic1G += 1;
      }else if(triologic500 === 7 && triologic1G == 2){
        console.log(triologic500)
        triologic500 = 0;
        triologic1G = 0;
        triologic2_5G++;
      }
    }


      let partAGram = Math.ceil(partA),
          partA5 = Math.ceil(Math.ceil(partA)/2267.96) % 5 === 0 ? 0 : Math.ceil(Math.ceil(partA)/2267.96)%5,
          partA25 = Math.floor(Math.ceil(Math.ceil(partA)/2267.96) / 5)
          partBGram= Math.ceil(partB),
          partB5= Math.ceil(Math.ceil(partB)/2267.96) % 5 === 0 ? 0 : Math.ceil(Math.ceil(partB)/2267.96)%5,
          partB25= Math.floor(Math.ceil(Math.ceil(partB)/2267.96) / 5),
          bloomGram= Math.ceil(bloom),
          bloom5= Math.ceil(Math.ceil(bloom)/2267.96) % 5 === 0 ? 0 : Math.ceil(Math.ceil(bloom)/2267.96)%5,
          bloom25= Math.floor(Math.ceil(Math.ceil(bloom)/2267.96) / 5),
          cleanUpGram= Math.ceil(cleanUp),
          cleanUp5= Math.ceil(Math.ceil(cleanUp)/2267.96) % 5 === 0 ? 0 : Math.ceil(Math.ceil(cleanUp)/2267.96)%5,
          cleanUp25= Math.floor(Math.ceil(Math.ceil(cleanUp)/2267.96) / 5),
          frontRowSiMl= Math.ceil(frontRowSi),
          frontRowSi1Q= Math.ceil(Math.ceil(frontRowSi)/946.353) % 4 === 0 ? 0 : Math.ceil(Math.ceil(frontRowSi)/946.353)%4,
          frontRowSi1G= Math.floor(Math.ceil(Math.ceil(frontRowSi)/946.353) / 4),
          triologicMl= triologicMl,
          triologic500= triologic500,
          triologic1G=triologic1G,
          triologic2_5G=triologic2_5G;
      let partARow = document.querySelector('.partARow'),
          partBRow = document.querySelector('.partBRow'),
          bloomRow = document.querySelector('.bloomRow'),
          cleanUpRow = document.querySelector('.cleanUpRow'),
          frontRowSiRow = document.querySelector('.frontRowSiRow'),
          triologicRow = document.querySelector('.triologicRow');
    partARow.querySelector('.weight-quantity').innerHTML = partAGram + 'g';
    partARow.querySelector('.quantity1').innerHTML = partA5;
    partARow.querySelector('.quantity2').innerHTML = partA25;

    partBRow.querySelector('.weight-quantity').innerHTML = partBGram + 'g';
    partBRow.querySelector('.quantity1').innerHTML = partB5;
    partBRow.querySelector('.quantity2').innerHTML = partB25;
    
    bloomRow.querySelector('.weight-quantity').innerHTML = bloomGram + 'g';
    bloomRow.querySelector('.quantity1').innerHTML = bloom5;
    bloomRow.querySelector('.quantity2').innerHTML = bloom25;

    cleanUpRow.querySelector('.weight-quantity').innerHTML = cleanUpGram + 'g';
    cleanUpRow.querySelector('.quantity1').innerHTML = cleanUp5;
    cleanUpRow.querySelector('.quantity2').innerHTML = cleanUp25;

    frontRowSiRow.querySelector('.weight-quantity').innerHTML = frontRowSiMl + 'mL';
    frontRowSiRow.querySelector('.quantity1').innerHTML = frontRowSi1Q;
    frontRowSiRow.querySelector('.quantity2').innerHTML = frontRowSi1G;

    triologicRow.querySelector('.weight-quantity').innerHTML = triologicMl + 'mL';
    triologicRow.querySelector('.quantity1').innerHTML = triologic500;
    triologicRow.querySelector('.quantity2').innerHTML = triologic1G;
    triologicRow.querySelector('.quantity3').innerHTML = triologic2_5G;

      document.querySelector('.estimator-container').classList.add('show');
      setTimeout (()=>{
          document.querySelector('.results').style.display = 'block';
          setTimeout(()=>{document.querySelector('.results').classList.add('show')},100);
      },1000);
});


const openModalBtn = document.querySelector('#modalOpen');
const closeModalBtn = document.querySelector('#modalClose');
const usageEstimator = document.querySelector('#usage-estimator');
const mainContent = document.querySelector('.main-content');
const mainBody = document.querySelector('body');
let animationInProgress = false,
    modalOpen = false;

const isChildOf = (element, parentToCheck)=>{
  while(element != mainBody && element != document.querySelector('html')){
    if(element === parentToCheck)
      return true;
    element = element.parentElement;
  }
  return false;
}



const openModal = ()=>{
  if(!animationInProgress){
    animationInProgress = true;
    usageEstimator.classList.toggle('hidden');
    setTimeout(() => {
      usageEstimator.classList.toggle('closed');
      mainContent.classList.toggle('modalOpened');
      mainBody.classList.toggle('modalOpened');
      animationInProgress = false;
      modalOpen = true;
      document.addEventListener('mousedown', e=>{
        if(!isChildOf(e.target, usageEstimator) && modalOpen){
          closeModal();
        }
      })
    }, 10);
  }
}

const closeModal = ()=>{
  if(!animationInProgress){
    animationInProgress = true;
    usageEstimator.classList.toggle('closed');
    mainContent.classList.toggle('modalOpened');
    mainBody.classList.toggle('modalOpened');

    setTimeout(() => {
      usageEstimator.classList.toggle('hidden');
      animationInProgress = false;
      modalOpen = false;
    }, 1000);
  }
}
openModalBtn.addEventListener('click', e=>{
  e.preventDefault();
  openModal();
})

closeModalBtn.addEventListener('click', e=>{
  e.preventDefault();
  closeModal();
})