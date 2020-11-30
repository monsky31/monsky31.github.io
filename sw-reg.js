// Register Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/serviceworker.js")
        .then(function () {
          console.log("Berhasil memakai serviceWorker");
        })
        .catch(function () {
          console.log("Gagal memakai serviceWorker");
        });
    });
  } else {
    console.log("Service Worker belum didukung browser ini");
  }
  