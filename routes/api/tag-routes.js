const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tags = await Tag.findAll({include: {model: Product}});

    if(!tags){
      res.status(404).json(tags)
    }
    res.status(200).json(tags);
  } catch(err){
    console.error(err);
    res.status(500).json({message: "Internal Server Error"})
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try{
    const tag = await Tag.findByPk(req.params.id, {include: {model: Product}});

    if(!tag){
      res.status(404).json({error: "Tag not found"})
    }
    res.status(200).json(tag);
  } catch(err){
    console.error(err);
    res.status(500).json({message: "Internal Server Error"})
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tag = await Tag.create({
      tag_name: req.body.tag_name
    })

    res.status(200).json(tag);
  } catch(err){
    console.error("Error creating new tag", err)
    res.status(500).json({message: "Internal Server Error"})
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tag = await Tag.findByPk(req.params.id);

    if(!tag){
      return res.status(404).json({ error: 'Tag not found'});
    }
    tag.update(
    {
      tag_name: req.body.tag_name
    }
    );

    res.status(200).json(tag);
  } catch(err){
    console.error('Error updating Tag:', error);
    res.status(500).json({ error: 'Failed to update Tag, Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    await tag.destroy();

    res.status(200).json(tag);
  } catch (error) {
    console.error('Error deleting Tag:', error);
    res.status(500).json({ error: 'Failed to delete Tag' });
  }
});

module.exports = router;
