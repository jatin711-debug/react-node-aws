const Category = require('../models/category');
const slugify = require('slugify');
const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const s3 = new AWS.S3({
    region:'us-east-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.create = (req, res) => {
    const {name,image,content} = req.body;
    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = image.split(';')[0].split('/')[1];
    const slug = slugify(name);
    const category = new Category({name,content,slug});

    const params = {
                    Bucket: 'myaws-node-application',
                    Key:`category/${uuidv4()}.${type}`,
                    Body: base64Data,
                    ACL:'public-read',
                    ContentEncoding:'base64',
                    ContentType:`image/${type}`
                }
                s3.upload(params,(err,data) => {

                if(err) {
                    console.log(err);
                    return res.status(400).json({
                        error: 'Yha pe ha Error'
                    });
                }
                category.image.url = data.Location;
                category.image.key = data.Key;
                category.postedBy = req.user._id;
                
                category.save((err,data) => {
                    if(err) {
                        console.log(err);
                        return res.status(400).json({
                            error: 'Category could not be created'
                        });
                    }
                    res.json(data);
                });
            });
}

exports.list = (req, res) => {
    Category.find({}).exec((err,data) => {
        if(err) {
            return res.status(400).json({
                error: 'Categories not found'
            });
        }
        res.json(data);
    });
}

exports.read = (req, res) => {
    
}

exports.update = (req, res) => {
    
}

exports.remove = (req, res) => {
    
} 