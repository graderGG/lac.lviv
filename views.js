const Datastore = require("nedb");
const path = __dirname + '/templates/';

exports.main = (req, res) => {
    const Datastore = require('nedb')
    const db = new Datastore({ filename: 'lvivarc.json', autoload: true });
    db.find({"table":"arctype"}, (err, docs) => {
        docs.sort((a,b) => {return (a.id - b.id)})
        res.render(path + 'index2', { types: docs })
    })
};

exports.error404 = (req,res) => {
    res.sendFile(path + '404.html')
}

exports.arcObject = (req, res) => {
    const objId = parseInt(req.params.id)
    const db = new Datastore({ filename: 'lvivarc.json', autoload: true })
    db.findOne({ table:"arcobj", id:objId }, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            doc.imagePath = '/static/images/' + doc.image;
            res.render(path + 'object', { object: doc })
        }
    })
}

exports.listObjects = (req, res) => {
    tpId = parseInt(req.params.id)
    const db = new Datastore({ filename: 'lvivarc.json', autoload: true })
    db.find( { table:"arcobj", type_id: tpId }, (err, docs) => {
        if (docs.length === 0) {
            res.sendFile(path + '404.html')
        } else {
            db.findOne({table: "arctype", id: tpId}, (err, doc) => {
                res.render(path + '/objects', {type: doc, objects: docs})
            })
        }
    })
}
