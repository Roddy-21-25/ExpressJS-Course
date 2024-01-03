//? Index con express
const express = require("express");
const morgan = require("morgan");
const path = require("path");

require("ejs");

const app = express();
//? El motor de las vistas
app.set('view engine', 'ejs')
//? el ultimo views es la carpeta donde estan las views
app.set('views', path.join(__dirname, 'views'))

const HomeRoutes = require("./routes/index");
const UsersRoutes = require("./routes/users");

app.use(morgan());
app.use(express.json(0));

app.use(HomeRoutes);
app.use(UsersRoutes);

app.use("/static", express.static(path.join(__dirname, "static")));

app.listen(3000);
console.log(`Server port ${3000}`);
