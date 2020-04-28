var express = require('express');
var cors = require('cors');
var logger = require('morgan');
var multer = require('multer')
var upload = multer()

const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose')

// LOADING MONGO URI
require('dotenv').config()

// MONGO DB
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

var fileSchema = new mongoose.Schema({
    img: String
})

const FileModel = mongoose.model('File', fileSchema)

// EXPRESS
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// APOLLO GRAPHQL

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {}; // left it empty for simplicity, described below
const ImageTC = composeWithMongoose(FileModel, customizationOptions);

schemaComposer.Query.addFields({
    images: ImageTC.getResolver('findMany'),
    imagesById: ImageTC.getResolver('findById')
})

schemaComposer.Mutation.addFields({
    imageCreateOne: ImageTC.getResolver('createOne')
})

const schema = schemaComposer.buildSchema()

const server = new ApolloServer({
    schema,
    cors: true,
    playground: true,
    introspection: true,
    tracing: true,
    path: '/',
});
    
server.applyMiddleware({ app });


// RESTFUL ROUTES
app.post('/img', upload.none(), function (req, res, next) {

    console.log(req.body)

    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            "error": "Please dont send empty"
        })
        return next
    }
    
    FileModel.create({img: req.body.img}, function (err, file) {
        if (err) return next(err);

        res.status(201).json({
            "message": "Uploaded",
            "data": file
        })
    })
    
})

app.get('/upload', function (req, res) {
    res.json({
        "message": "Working"
    })
})

app.get('/img', function (req, res) {
    FileModel.find({}, function (err, file) {
        res.json({
            "data" : file
        })
    })
})

app.get('/img/:id', function (req, res) {
    // use 5ea6ff77ab79f7a72ca2d94a
    FileModel.findById(req.params.id, function (err, file) {
        res.json({
            "data" : file
        })
    })
})

app.put('/img/:id', upload.none(), function (req, res) {
    FileModel.findByIdAndUpdate(req.params.id, {img: req.body.img} ,function (err, data) {
        if (err) throw err
        res.json({ data })
    })
})

app.delete('/img/:id', function (req, res) {
    FileModel.findByIdAndRemove(req.params.id, function (err, data) {
        res.json({ data })
    })
})

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.json({
        "error": err
    });
  });


module.exports = app;
