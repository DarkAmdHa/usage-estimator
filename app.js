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

//Apply function to each of the inputs
document.querySelectorAll(".number-field").forEach((field) => {
  setInputFilter(field, function (value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
  });
});

document.querySelector(".input-fields").addEventListener("submit", (e) => {
  document.querySelector(".results").style.visibility = "visible";
  setTimeout(() => {
    document.querySelector(".results").classList.add("show");
  }, 10);
  e.preventDefault();
});

document.querySelector("#clear-results").addEventListener("click", (e) => {
  document.querySelector(".results").classList.toggle("show");
  setTimeout(() => {
    document.querySelector(".results").style.visibility = "hidden";
  }, 1000);
  document.querySelectorAll(".number-field").forEach((field) => {
    field.value = "";
  });
  e.preventDefault();
});
