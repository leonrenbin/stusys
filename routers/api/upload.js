const express = require('express');
const router = express.Router();
const multer = require('multer')
const uploadServ = require('../../service/uploadService')
const path = require('path')

const storage = multer.diskStorage({
    destination: async (req, file, cb)=> {//存到哪(磁盘)
      cb(null, path.join(__dirname, "../../public/upload"))
    },
    filename: async (req, file, cb)=> {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
    },
})

const upload = multer({
    storage,
    limits:{
        fileSize: 10*1024*1024,//10M
    },
    fileFilter(req, file, cb){
        //验证文件后缀名
        const extname = path.extname(file.originalname);
        const whitelist = [".jpg",".png",".gif",".img"];
        if(whitelist.includes(extname)){
            cb(null, true)
        }else{
            cb(new Error(`your ext name of ${extname} is not support`));
        }
    }
})

router.post('/', upload.single('img'), async (req, res)=>{
    // let url = `/uploading/${req.file.filename}`;
    let url = req.file.path;
    url = url.replace(/\\/g,"/")
    res.send({
        code: 0,
        msg: '',
        data: url,
    })
    // return await uploadServ.upload(req.file.path);
})

module.exports = router;