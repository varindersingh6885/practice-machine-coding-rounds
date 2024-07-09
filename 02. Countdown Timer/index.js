(function () {
  const start = document.querySelector(".start");
  const resume = document.querySelector(".resume");
  const pause = document.querySelector(".pause");
  const reset = document.querySelector(".reset");

  pause.style.display = "none";
  resume.style.display = "none";

  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  let timer;

  // reset input Fields
  function resetInputFieldsAndActions() {
    hours.value = "";
    minutes.value = "";
    seconds.value = "";
    start.style.display = "initial";
    pause.style.display = "none";
    resume.style.display = "none";
  }

  function validateInputValues() {
    const secondsValue = +seconds.value;
    const minutesValue = +minutes.value;
    const hoursValue = +hours.value;
    if (secondsValue == 0 && minutesValue == 0 && hoursValue == 0) {
      clearInterval(timer);
      resetInputFieldsAndActions();
      return false;
    }
    return true;
  }

  // start timer
  function startTimer() {
    let secondsValue = +seconds.value;
    let minutesValue = +minutes.value;
    let hoursValue = +hours.value;

    if (secondsValue > 59) {
      secondsValue -= 60;
      minutesValue++;
    }
    if (minutesValue > 59) {
      minutesValue -= 60;
      hoursValue++;
    }

    function runTimer() {
      if (secondsValue > 0) {
        secondsValue--;
      } else if (minutesValue > 0) {
        secondsValue = 59;
        minutesValue--;
      } else if (hoursValue > 0) {
        secondsValue = 59;
        minutesValue = 59;
        hoursValue--;
      } else {
        clearInterval(timer);
        resetInputFieldsAndActions();

        return;
      }

      hours.value = `${hoursValue > 9 ? hoursValue : `0${hoursValue}`}`;
      minutes.value = `${minutesValue > 9 ? minutesValue : `0${minutesValue}`}`;
      seconds.value = `${secondsValue > 9 ? secondsValue : `0${secondsValue}`}`;
    }

    timer = setInterval(runTimer, 1000);
  }

  // add startTimer on click of start button
  start.addEventListener("click", () => {
    if (!validateInputValues()) return;
    startTimer();

    start.style.display = "none";
    pause.style.display = "initial";
  });

  // handle pause
  pause.addEventListener("click", () => {
    if (!validateInputValues()) return;
    clearInterval(timer);
    pause.style.display = "none";
    resume.style.display = "initial";
  });

  // handle resume
  resume.addEventListener("click", () => {
    if (!validateInputValues()) return;
    startTimer();

    resume.style.display = "none";
    pause.style.display = "initial";
  });

  // handle reset
  reset.addEventListener("click", () => {
    clearInterval(timer);
    resetInputFieldsAndActions();
  });
})();
