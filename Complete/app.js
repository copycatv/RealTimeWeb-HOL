var express = require("express");
var app = express();
app.use(express.static("public"));
var http = require("http").Server(app);
var port = process.env.PORT || 3000;
var io = require("socket.io")(http);

function containWordCharsOnly(text) {
  return /^\w+$/.test(text);
}

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/default.html");
});

app.post("/register", (req, res) => {
  // Get the JSON data from the body
  const { username, nickname, password } = req.body;
  const users = JSON.parse(fs.readFileSync("./data/users.json")); //
  if (!username || !nickname || !password) {
    res.json({
      status: "error",
      error: "XXX cannot be empty!",
    });
    return;
  }
  if (!containWordCharsOnly(username)) {
    res.json({
      status: "error",
      error: "Username should contain characters only!",
    });
    return;
  }
  if (username in users) {
    res.json({
      status: "error",
      error: "Username already exists!",
    });
    return;
  }

  //   const hash = bcrypt.hashSync(password, 10);
  //   users[username] = { nickname, hash };
  //   fs.writeFileSync("./data/users.json", JSON.stringify(users, null, " "));
  res.json({ status: "success" });
});

http.listen(8000, () => {
  console.log("listening on *: " + 8000);
});

io.on("connection", function (socket) {
  console.log("new connection");

  socket.on("move", function (msg) {
    socket.broadcast.emit("move", msg);
  });
});
