const connection = "ws://127.0.0.1:8080/ws"

export const Conn = new WebSocket(connection);



if (window["WebSocket"]) {
    Conn.onopen = function (evt) {
        console.log("connected")
    }
    Conn.onclose = function (evt) {
    };
    // Conn.send("hello")

} else {
    var item = document.createElement("div");
    item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
    appendLog(item);
}
