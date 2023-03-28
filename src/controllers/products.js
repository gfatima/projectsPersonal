const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('products').find()
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(lists)
  })
}

const getSingle = async (req, res) => {
  const productId = new ObjectId(req.params.id)
  const result = await mongodb.getDb().db().collection('products').find({ _id: productId })
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(lists[0])
  })
}

const createProduct = async (req, res) => {
  const product = {
    Name: req.body.Name,
    Price: req.body.Price,
    Type: req.body.Type,
    Count: req.body.Count,
    Description: req.body.Description,
    Category: req.body.Category
  }
  const response = await mongodb
    .getDb()
    .db('test')
    .collection('products')
    .insertOne(product)
  if (response.acknowledged) {
    res.status(201).json(response)
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.')
  }
}

const updateProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id)
  // be aware of updateOne if you only want to update specific fields
  const product = {
    Name: req.body.Name,
    Price: req.body.Price,
    Type: req.body.Type,
    Count: req.body.Count,
    Description: req.body.Description,
    Category: req.body.Category
  }
  const response = await mongodb
    .getDb()
    .db()
    .collection('products')
    .replaceOne({ _id: productId }, product)
  console.log(response)
  if (response.modifiedCount !== 0) {
    res.status(204).send(productId + 'has been replaced')
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the product.')
  }
}

const deleteProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id)
  const response = await mongodb
    .getDb()
    .db('test')
    .collection('products')
    .deleteOne({ _id: productId })
  if (response.deletedCount !== 0) {
    res.status(200).send(productId + 'has been deleted')
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the product.')
  };
}

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct
}
