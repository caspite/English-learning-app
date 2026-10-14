/* הפעלת האפליקציה */
if (typeof registerCustom === "function") registerCustom();
applyTheme();
homeScreen();
cloudInit();
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
