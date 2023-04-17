function getLocationBasePath() {

  if (typeof window === "undefined") {
    console.error("ReferenceError: window is not defined. Are you in frontend javascript layer?");
    return;
  }

  if (typeof window.location === "undefined") {
    console.error("ReferenceError: window.location is not defined. Are you in frontend javascript layer?");
    return;
  }

  if(window.location.port){
    return window.location.protocol+"//"+window.location.hostname+":"+window.location.port
  }else {
    return window.location.protocol+"//"+window.location.hostname
  }
}
