import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 3000 });

server.on("connection", (socket) => {
  // send a message to the client
  socket.send(JSON.stringify({
    type: "hello from server",
    content: [ 1, "2" ]
  }));

  // receive a message from the client
  socket.on("message", (data) => {
    console.log('Message from server ', data);
    // const packet = JSON.parse(data);

    // switch (packet.type) {
    //   case "hello from client":
    //     // ...
    //     break;
    // }

    switch (true) {
      case data === "Je souhaiterais des informations sur les véhicules":
        console.log("Oui, pour quel usage souhaitez-vous en faire ?");
        console.log(data);
        socket.emit('reponse', "Quel est l'usage que vous souhaitez pour votre véhicule (routier, tout-terrain, sportif, etc.)?");
        break;
      case text.value.includes(data):
        // Traitez la question de l'utilisateur ici
        break;
    }
  });
  
});