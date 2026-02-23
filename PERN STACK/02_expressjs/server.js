import express from 'express';

const app = express();
const port = 3000;

const router = express.Router();

//Middleware func() Parses JSON and help to read
app.use(express.json());

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
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id ===id);

});

router.post('/', (req, res) => {
    res.send('Create new car');
});

router.put('/:id', (req, res) => {
    res.send('Update cars');
});

router.delete('/:id', (req, res) => {
    res.send('Delete car');
});

app.use('/api/v1/cars', router);

app.listen(port, () => console.log(`SERVER is RUNNING on http://localhost:${port}`));