const express = require('express');
const db = require('./cars-model');
const mw = require('./cars-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const carsArr = await db.getAll();
		res.status(200).json(carsArr);
	}
	catch(err) {
		next(err);
	}
});

router.get('/:id', mw.checkCarId, async (req, res, next) => {
	try {
		const car = await db.getById(req.params.id);
		res.status(200).json(car);
	}
	catch(err) {
		next(err);
	}
});

router.post('/', mw.checkCarPayload, mw.checkVinNumberValid, mw.checkVinNumberUnique, async (req, res, next) => {
	try {
		const newCar = db.create(req.body);
		res.status(201).json(newCar)
	}
	catch(err) {
		next(err);
	}
});

router.use((err, req, res, next) => {
	res.status(500).json({
		message: "something went wrong"
	})
})

module.exports = router;
