const ws = new WebSocket("ws://localhost:4000/");
export default ws;

ws.addEventListener("close", () => {
  alert(
    "The connection to the server has been lost. Attempting to reconnect...",
  );

  const interval = setInterval(() => {
    const newWS = new WebSocket("ws://localhost:4000/");
    newWS.addEventListener("open", () => clearInterval(interval));
  }, 1000);
});
