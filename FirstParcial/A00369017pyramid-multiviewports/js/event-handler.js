function onKeyPressEventListener(event) {
  if(String.fromCharCode(event.keyCode) === ' ') {
    multiViewPort = !multiViewPort;
  }
}
function initEventHandler() {
  document.addEventListener("keypress", onKeyPressEventListener, false);
}