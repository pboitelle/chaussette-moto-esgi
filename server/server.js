import { Server } from "socket.io"
import express from "express"
import { createServer } from "http"
import mysql from "mysql"
import session from "express-session"
import path, { dirname } from "path"
import { fileURLToPath } from 'url'
import cors from "cors"
import { EventEmitter } from "events"
import bodyParser from 'body-parser';


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


httpServer.listen(9000, "0.0.0.0", () => {
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

server.get("/api/conseillers", (req, res) => {
  connection.query("SELECT * FROM conseiller", (err, rows) => {
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
  request.session.loggedin = false;
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
  if (!req.session.loggedin) {
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

/*
* API routes salons
*/
server.get("/api/salons", (req, res) => {
  connection.query("SELECT * FROM salon", (err, rows) => {
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
server.post('/api/salon/create', (req, res) => {
  connection.query("INSERT INTO salon (nom, nb_max) VALUES (?, ?)", [req.body.nom, req.body.nb_max], (err, rows) => {
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
})
server.delete('/api/salon/delete/:id', (req, res) => {
  connection.query("DELETE FROM salon WHERE id = ?", [req.params.id], (err, rows) => {
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
})

/*
* API routes contact conseiller
*/
server.get("/api/demandes", (req, res) => {
  connection.query("SELECT d.id, d.isAccepted, user.email, conseiller.nom, conseiller.prenom, d.id_conseiller FROM demandeCommunication as d INNER JOIN user ON user.id = d.id_user INNER JOIN conseiller ON conseiller.id = d.id_conseiller", (err, rows) => {
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
server.post('/api/demande/contact', (req, res) => {
  
  connection.query("SELECT * FROM demandeCommunication WHERE id_user = ?", [1], (err, rows) => {
    if (err) {
      console.log(err)
    } else {
      if (rows.length > 0) {
        res.json({
          success: true,
          rows
        })
      } else {
        connection.query("INSERT INTO demandeCommunication (id_user, id_conseiller, isAccepted) VALUES (?, ?, ?)", [1, req.body.conseiller, 0], (err, rows) => {
          if (err) {
            console.log(err)
          } else {
            res.json({
              success: true,
              rows
            })
          }
        });
      }
    }
  });
})
server.get('/api/demande/check', (req, res) => {
  
  connection.query("SELECT d.id, d.isAccepted, user.email, conseiller.nom, conseiller.prenom, d.id_conseiller FROM demandeCommunication as d INNER JOIN user ON user.id = d.id_user INNER JOIN conseiller ON conseiller.id = d.id_conseiller WHERE id_user = ?", [1], (err, rows) => {
    if (err) {
      console.log(err)
    } else {
      if (rows.length > 0) {
        res.json({
          success: true,
          rows
        })
      } else {
        res.json({
          success: false
        })
      }
    }
  });
})
server.post('/api/demande/accepted', (req, res) => {
  let id_demande = req.body.id_demande;
  let id_conseiller = req.body.id_conseiller;

  connection.query("UPDATE demandeCommunication SET isAccepted = 1 WHERE id = ?", [id_demande], (err, rows) => {
    if (err) {
      console.log(err)
    } else {
      connection.query("UPDATE conseiller SET disponible = 0 WHERE id = ?", [id_conseiller], (err, rows) => {
        if (err) {
          console.log(err)
        } else {
        }
      });

      res.json({
        success: true,
        rows
      })
    }
  });
})
server.post('/api/demande/refused', (req, res) => {
  let id_demande = req.body.id_demande;
  let id_conseiller = req.body.id_conseiller;

  connection.query("DELETE FROM demandeCommunication WHERE id = ?", [id_demande], (err, rows) => {
    if (err) {
      console.log(err)
    } else {
      connection.query("UPDATE conseiller SET disponible = 1 WHERE id = ?", [id_conseiller], (err, rows) => {
        if (err) {
          console.log(err)
        } else {
        }
      });

      res.json({
        success: true,
        rows
      })
    }
  });
})


/**
 * Socket.io server
 */
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})

/*
  Socket.io events
*/

io.on("connection", socket => {

  console.log("New connection")

  socket.on("join", room => {
    socket.join(room)
  })

  // socket message between conseiller/user
  socket.on("messageConseiller", ({id_conseiller, message}) => {
    connection.query("INSERT INTO communicationConseiller (id_user, id_conseiller, contenu) VALUES (?, ?, ?)", [1, id_conseiller, message], (err, rows) => {
      if (err) {
        console.log(err)
      } else {
        console.log(id_conseiller+" "+message)
        socket.to(id_conseiller).emit("messageConseiller", {
          client: socket.id,
          message
        })
        
      }
    });
  })


  socket.on("joinSalon", salon => {
    socket.join(salon)
    console.log("Joined salon: " + salon)
    socket.emit("joinSalon", {
      identifier: salon
    })
  })
  socket.on("leaveSalon", salon => {
    socket.leave(salon)
    console.log("Left salon: " + salon)
    socket.emit("leaveSalon", salon)
  })
  socket.on("messageSalon", ({id_salon, message}) => {
    connection.query("INSERT INTO communicationSalon (id_user, id_salon, contenu) VALUES (?, ?, ?)", [1, id_salon, message], (err, rows) => {
      if (err) {
        console.log(err)
      } else {
        console.log(id_salon+" "+message)

        socket.to(id_salon).emit("messageSalon", {
          client: socket.id,
          message
        })
      }
    });
  })
})

const eventEmitter = new EventEmitter()

const serversse = express()
serversse.use(cors())
serversse.use(bodyParser.json());

serversse.post("/api/notifications", (req, res) => {
  console.log("back",req.body)
  const { message }= req.body;
  if (!req.body) {
    return res.status(400).send({ error: 'Request body is missing' });
  }
  connection.query(
    "INSERT INTO notifications (message) VALUES (?)",
    [message],
    (err, rows) => {
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
        eventEmitter.emit("notification", message)
      }
    }
  );
});

serversse.get("/api/notifications", (req, res) => {
  connection.query("SELECT * FROM notifications", (err, rows) => {
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

serversse.listen(9001)

setInterval(() => {
  eventEmitter.emit("notification", "Hello")
}, 5000)
io.on("connection", (socket) => {
    console.log("New connection");

    // receive a message from the client
  socket.on('message', (data) => {
    // console.log('Message from server ', data);
    switch (true) {
      case data === "Je souhaiterais des informations sur les véhicules":
      var response = "Quel est le type d'usage que vous souhaitez pour votre véhicule ?";
      socket.emit('response', response);
      break;
      case data.includes("usage routier"):
      var response = "Nous vous proposons un essai routier. Les rendez-vous routiers sont isolés des autres rendez-vous.";
      socket.emit('response', response);
      break;
      case data.includes("usage tout-terrain"):
      var response = "Nous vous proposons un essai tout-terrain. Les rendez-vous tout-terrain sont isolés des autres rendez-vous.";
      socket.emit('response', response);
      break;
      case data.includes("usage sportif"):
      var response = "Nous vous proposons un essai sur piste. Les rendez-vous piste sont isolés des autres rendez-vous.";
      socket.emit('response', response);
      break;
      }
      
      
      
      
      
  });
})
