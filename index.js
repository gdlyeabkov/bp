const fs = require('fs')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

const bcrypt = require('bcrypt');
const saltRounds = 10;

const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

const url = `mongodb+srv://glebClusterUser:glebClusterUserPassword@cluster0.fvfru.mongodb.net/mans?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(url, connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const ManSchema = new mongoose.Schema({
    name: String,
    secret: String,
    gender: String,
    age: Number,
    
}, { collection : 'mymans' });

const ManModel = mongoose.model('ManModel', ManSchema);

app.get('/mans/photos', (req, res) => {
        
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    return res.sendFile(__dirname + `/uploads/${req.query.gayname}.png`)

})

app.get('/mans/check', (req, res)=>{
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    let queryBefore = ManModel.find({ name: { $in: req.query.gayname }  })
    queryBefore.exec((err, allMans) => {
        if(err){
            return res.json({ "status": "Error" })
        }
        if(allMans.length >= 1){
            let query =  ManModel.findOne({'name': req.query.gayname}, function(err, man){
                if (err){
                    return res.json({ "status": "Error" })
                } else {
                    const passwordCheck = bcrypt.compareSync(req.query.gaypassword, man.secret) && req.query.gaypassword !== ''
                    if(man != null && man != undefined && passwordCheck){
                        return res.json({ "status": "OK", "man": man.name })
                    } else {
                        return res.json({ "status": "Error" })
                    }
                }
            })    
        } else if(allMans.length <= 0){
            return res.json({ "status": "Error" })
        }
    })
})

app.post('/mans/create', upload.single('myphoto'), (req, res)=>{
        
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    let file = req.file
    if(!file){
        return res.json({ "status": "Error" })
    }
    fs.rename(req.file.path, path.join(__dirname, '/uploads') + "/" + req.query.gayname + ".png", function (err) {
        if (err) {
            return res.json({ "status": "Error" })
        }
    })
    let queryOfMans = ManModel.find({})
    queryOfMans.exec((err, allMans) => {
        if (err){
            console.log(`req.query1: ${req.query}`)
            return res.json({ "status": "Error" })
        }
        var manExists = false;

        allMans.forEach(man => {
            if(man.name.includes(req.query.gayname)){
                manExists = true
            }
        })
        if(manExists){
            console.log(`req.query2: ${req.query}`)
            return res.json({ "status": "Error" })
        }
        let encodedSecret = "#"
        let salt = bcrypt.genSalt(saltRounds)
        encodedSecret = bcrypt.hashSync(req.query.gaypassword, saltRounds)
        let newMan = new ManModel({ name: req.query.gayname, secret: encodedSecret, gender: "man", age: Number(req.query.gayage) });
        newMan.save(function (err) {
            if(err){
                return res.json({ "status": "Error" })
            } else {
                return res.redirect("http://localhost:4000/")
                // return res.json({ "status": "OK" })
            }
        })
    })


    // return res.json({ "status": "OK" })

})


app.get('**', (req, res) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    return res.redirect(`http://localhost:4000/?redirectroute=${req.path}`)
})

// const port = process.env.PORT || 8080
const port = 4000  

app.listen(port)