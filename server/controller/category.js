const Category = require('../models/category');
const slugify = require('slugify');
const formidable = require('formidable');
const AWS = require('aws-sdk');
const fs = require('fs');
const uuidv4 = require('uuid/v4');


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION

});


exports.create = (req, res) => {

    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        const {name,content} = fields;
        const {image} = files;
        const slug = slugify(name);

        const category = new Category({name,content,slug});
        if(image.size > 2000000000) {
            return res.status(400).json({
                error: 'Image should be less than 2mb'
            });
        }

        const params = {
            Bucket: 'myaws-node-application',
            Key:`category/${uuidv4()}`,
            Body:fs.readFileSync(image.path),
            ACL:'public-read',
            ContentType:'image/jpg'
        }

        s3.upload(params,(err,data) => {
            if(err) {
                console.log(err);
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                });
            }
            category.image.url = data.Location;
            category.image.key = data.Key;
            category.save((err,data) => {
                if(err) {
                    console.log(err);
                    return res.status(400).json({
                        error: 'Category could not be created'
                    });
                }
                res.json(data);
            });
        }

    );333
    })
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