const db = require("../cars/cars-model");
var vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const existingCar = await db.getById(req.params.id);
  if (!existingCar) {
    return res.status(404).json({
      message: `car with id ${req.params.id} is not found`
    })
  }
  next();
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin, make, model, mileage} = req.body;
  let msg = "";

  if (!vin || !make || !model || !mileage) {
    if (!vin) {
      msg += "vin";
    }
    if (!make) {
      msg += "make";
    }
    if (!model) {
      msg += "model";
    }
    if (!mileage) {
      msg += "mileage";
    }
    msg += " is missing";
    return res.status(400).json({
      message: msg
    })
  }
  next();
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const validation = vinValidator.validate(req.body.vin);
  if (!validation) {
    return res.status(400).json({
      message: `vin ${req.body.vin} is invalid`
    })
  }
  next();
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const carsArr = await db.getAll();
  const vin = req.body.vin;

  const check = carsArr.find(car => {
    if (car.vin === vin) {
      return car;
    }
  })
  if (check) {
    return res.status(400).json({
      message: `vin ${req.body.vin} already exists`
    })
  }
  else {
    next();
  }
  next();
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}