const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
  // be sure to include its associated Products
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'category_id', 'price', 'stock'],
    }]
  })
  .then((data) => res.json(data))
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {id: req.params.id},
  // be sure to include its associated Products
    include:  [{
      model: Product,
      attributes: ['id', 'product_name', 'category_id', 'price', 'stock'],
    }]
  })
  .then((data) => {
    if (!data) {
      res.status(404).json({message: 'No category found!'});
      return;
    }
    res.json(data);
  })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((data) => res.json(data))
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {id: req.params.id}
  })
  .then((data) => {
    if (!data) {
      res.status(404).json({message: 'No category found!'});
      return;
    }
    res.json(data);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id: req.params.id}
  })
  .then((data) => {
    if (!data) {
      res.status(404).json({message: 'No category found!'});
      return;
    }
    res.json(data);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  })
});

module.exports = router;
