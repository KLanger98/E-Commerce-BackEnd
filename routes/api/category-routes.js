const router = require('express').Router();
const { Category, category, Product } = require('../../models');

// The `/api/categories` endpoint



// find all categories
// be sure to include its associated categorys
router.get('/', async(req, res) => {
  const categories = await Category.findAll({
    include: {model: Product}
  });

  if(!categories){
    res.status(404).json(categories)
  }
  res.status(200).json(categories);
});


  // find one category by its `id` value
  // be sure to include its associated categorys
router.get('/:id', async(req, res) => {

  const category = await Category.findByPk(req.params.id);

  if(!category){
    res.status(404).json(category)
  }
  res.status(200).json(category);
});

// create a new category
router.post('/', async(req, res) => {

  try{
    const category = await Category.create({
    category_name: req.body.category_name
  })

  res.status(200).json(category)
  } catch(err){
    res.status(400).json(err)
  }
  

  
  
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const category = await Category.findByPk(req.params.id);

    if(!category){
      return res.status(404).json({ error: 'catgory not found'})
    }
    category.update(
    {
      category_name: req.body.category_name
    }
    )

    res.status(200).json(category)
  } catch(err){
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
  
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {

  try {
    const category = await Category.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: 'category not found' });
    }

    await category.destroy();

    res.status(200).json(category);
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
  
});

module.exports = router;
