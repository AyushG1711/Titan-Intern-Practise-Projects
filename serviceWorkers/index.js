document.addEventListener("DOMContentLoaded", (e) => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js", { scope: "./" })
      .then((registeration) => console.log(registeration));

    navigator.serviceWorker.oncontrollerchange = (e) => {
      console.log(e, "new worker");
    };
  } else {
    console.log("Service Workers not supported by your Browser");
  }
});
