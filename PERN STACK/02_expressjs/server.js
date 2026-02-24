import express from 'express';

const app = express();
const port = 3000;

const router = express.Router();

//Middleware func() Parses JSON and help to read
app.use(express.json());

//Middleware to show requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

let cars = [
    { id: 1, make: "Toyota", model: "Corolla", year: 2022, price: 4000 },
    { id: 2, make: "Suzuki", model: "Mehran", year: 2016, price: 500 },
    { id: 3, make: "Honda", model: "Civic", year: 2021, price: 6000 },
];

app.get('/', (req, res) => {
    res.send('Hello from cars API!');
});

router.get('/', (req, res) => {
    res.json(cars);
});

router.get('/:id', (req, res) => {
    // params return string so it will be converted to be used as Integer
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id === id);

    if (!car) return res.status(404).send('Car not found!');
    res.json(cars);
});

router.post("/", (req, res) => {
  const { make, model, year, price } = req.body;

  // Validation
  if (!make || !model || !year || !price) {
    return res.status(400).json({
      error: "Please provide make, model, year, and price",
    });
  }

  const nextId = cars.length + 1;

  const newCar = {
    id: nextId,
    make,
    model,
    year: parseInt(year),
    price: parseFloat(price),
  };

  cars.push(newCar);

  res.status(201).json(newCar);
});

router.put("/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const carIndex = cars.findIndex((c) => c.id === carId);

  if (carIndex === -1) {
    return res.status(404).json({ error: "Car not found" });
  }

  const { make, model, year, price } = req.body;

  if (make) cars[carIndex].make = make;
  if (model) cars[carIndex].model = model;
  if (year) cars[carIndex].year = parseInt(year);
  if (price) cars[carIndex].price = parseFloat(price);

  res.json(cars[carIndex]);
});

router.delete("/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const carIndex = cars.findIndex((c) => c.id === carId);

  if (carIndex === -1) {
    return res.status(404).json({ error: "Car not found" });
  }

  const deletedCar = cars.splice(carIndex, 1)[0];

  res.json({
    message: "Car deleted successfully",
    car: deletedCar,
  });
});

app.use('/api/v1/cars', router);

app.listen(port, () => console.log(`SERVER is RUNNING on http://localhost:${port}`));