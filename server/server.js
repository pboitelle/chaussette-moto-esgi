import { Server } from "socket.io"
import express from "express"
import { createServer } from "http"
import mysql from "mysql"
import session from "express-session"
import path, { dirname } from "path"
import { fileURLToPath } from 'url'
import cors from "cors"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const server = express()

server.use(cors())
server.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "client/src")))

const httpServer = createServer(server)


httpServer.listen(9000, () => {
    console.log("Http server listening")
})


const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: "chaussettes",
    password: "password",
    database: "chaussettes",
    port: 3306
});

server.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM user", (err, rows) => {
    if (err) {
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        rows,
      });
    }
  });
});
server.post('/api/auth', function(request, response) {
	// Capture the input fields
	let email = request.body.email;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.email = email;
        request.session.save()

        response.json({
          success: true
        });
			} else {
				response.json({
          success: false,
          message: "Incorrect email or password"
        });
			}			
			response.end();
		});
	} else {
		response.json({
      success: false,
      message: "Please enter email and password"
    });
	}
});
server.get('/api/logout', function(request, response) {
  request.session.destroy()
  response.json({
    success: true
  })
});
server.get('/api/secret-route', (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({
      success: false,
      message: "You are not logged in"
    })
  }

  res.json({
    success: true,
    message: "You are logged in"
  })
});

/**
 * Socket.io server
 */
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log("New connection");

    // receive a message from the client
  socket.on('message', (data) => {
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
})