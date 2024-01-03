const express = require("express");
const morgan = require("morgan");
const app = express();

app.set('appName', 'RestAPI CRUD')
app.set('port', 3000)

//? Esto es algo Reservado por Express para que las rutas si o si, sean escritas correctamente.
app.set('case sensitive routing', true)

app.use(morgan("dev"));
app.use(express.json());

const products = [
  {
    id: 1,
    name: "laptop",
    price: 3000,
  },
  {
    id: 2,
    name: "smartphone",
    price: 800,
  },
  {
    id: 3,
    name: "headphones",
    price: 150,
  },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const productFound = products.find((p) => p.id === parseInt(req.params.id));

  if (!productFound)
    return res.status(404).json({ message: "Product Not Found" });

  res.json(productFound);
});

app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const newData = req.body; //* {"name": "tablet", "price": 5000}

  const productFound = products.find((p) => p.id === parseInt(req.params.id));

  if (!productFound)
    return res.status(404).json({ message: "Product Not Found" });

  const newProduct = products.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...newData } : p
  );

  res.json(newProduct);
});

app.delete("/products/:id", (req, res) => {
  const productFound = products.find((p) => p.id === parseInt(req.params.id));

  if (!productFound)
    return res.status(404).json({ message: "Product Not Found" });

  const newProducts = products.filter((p) => p.id !== parseInt(req.params.id));
  res.json(newProducts);
});

app.listen(app.get('port'));
console.log(`Server On Port ${app.get('port')}!`);
