const router = require('express').Router();
const { Category, category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated categorys
router.get('/', async(req, res) => {
  try{
    const categories = await Category.findAll({
      include: {model: Product}
    });

    if(!categories){
      return res.status(404).json(categories)
    }

    console.log("Successful GET request for all categories!")
    res.status(200).json(categories);
  } catch(err){
    console.error(err)
    res.status(500).json({message: "Internal Server Error"})
  }
});


  // find one category by its `id` value
  // be sure to include its associated categorys
router.get('/:id', async(req, res) => {

  try{
    const category = await Category.findByPk(req.params.id, {include: {model: Product}});

    if(!category){
      return res.status(404).json(category)
    }
    
    res.status(200).json(category);
  } catch(err){
    console.error(err);
    res.status(500).json({message: "Internal Server Error"})
  }

  
});

// create a new category
router.post('/', async(req, res) => {
  try{
    const category = await Category.create({
      category_name: req.body.category_name
    })

    res.status(200).json(category);
  } catch(err){
    console.error("Error creating new Category", err)
    res.status(500).json({message: "Internal Server Error"})
  }
  
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const exists = await Category.findByPk(req.params.id);

    if(!exists){
      return res.status(404).json({ error: 'Category not found'});
    }
    let category = await Category.update(req.body, {where: 
      {
        id: req.params.id,
      },
    })

    return res.json(category);
  } catch(err){
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category, Internal Server Error' });
  }
  
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {

  try {
    const exists = await Category.findByPk(req.params.id);
    
    if (!exists) {
      return res.status(404).json({ error: 'category not found' });
    }

    let category = await Category.destroy({where: 
      {
        id: req.params.id
      },
    });

    res.status(200).json(category);
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
  
});

module.exports = router;
