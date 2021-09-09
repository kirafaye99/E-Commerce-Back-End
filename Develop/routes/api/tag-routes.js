const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
  // be sure to include its associated Product data
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
  // find a single tag by its `id`
  Tag.findOne({
  // be sure to include its associated Product data
  include: [{
    model: Product,
    attributes: ['id', 'product_name', 'category_id', 'price', 'stock'],
  }]
  })
  .then((data) => {
    if (!data) {
      res.status(404).json({message: 'No tag found!'});
      return;
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((data) => res.json(data))
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {id: req.params.id},
  })
  .then((data) => {
    if (!data[0]) {
      res.status(404).json({message: 'No tag found!'});
      return;
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {id: req.params.id},
  })
  .then((data) => {
    if (!data) {
      res.status(404).json({message: 'No tag found!'});
      return;
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

module.exports = router;
