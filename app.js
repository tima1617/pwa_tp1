if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => {
      console.log("Enregistrement réussi.");
    })
    .catch((e) => {
      console.log("Erreur : " + e);
    });
}
