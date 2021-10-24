const Category = require('../models/category');
const slugify = require('slugify');


exports.create = (req, res) => {
    const {name,content} = req.body;
    const slug = slugify(name)
    let image = {
        url: `https://via.placeholder.com/350x150.png?text=${process.env.CLIENT_URL}`,
        KEY:'123'
    }
    const category = new Category({
        name,
        slug,
        image,
        content
    });
    category.postedBy = req.user._id;
    category.save((err, category) => {
        if (err) {
            console.error(err);
            return res.status(400).json({
                error: 'Category Failed'
            });
        }
        res.json(category);
    })
}

exports.list = (req, res) => {
    
}

exports.read = (req, res) => {
    
}

exports.update = (req, res) => {
    
}

exports.remove = (req, res) => {
    
} 