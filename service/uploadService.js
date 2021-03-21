const Upload = require('../models/upload')

exports.upload = async function(img){
    const res = await Upload.create(img);
    if(res){
        return res.toJSON();
    }else{
        return null;
    }
}