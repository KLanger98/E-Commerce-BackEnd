const router = require('express').Router();
const { Product, product, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint
// get all products - includes product and Tag data
router.get('/', async (req, res) => {


  try{
    const products = await Product.findAll({include: {model: Tag}});

    if(!products){
      res.status(404).json(products)
    }
    res.status(200).json(products);
  } catch(err){
    console.error(err);
    res.status(500).json({message: "Internal Server Error"})
  }
  
});

// get one product by ID, include product and Tag Data
router.get('/:id', async(req, res) => {
  try{
    const product = await Product.findByPk(req.params.id, {include:  {model: Tag}});

    if(!product){
      res.status(404).json(product)
    }
    res.status(200).json(product);
  } catch(err){
    console.error(err);
    res.status(500).json({message: "Internal Server Error"})
  }
  
});

// create new product
router.post('/', async(req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async(req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async(req, res) => {
  // delete one product by its `id` value
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'product not found' });
    }

    await product.destroy();

    res.status(200).json(product);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
