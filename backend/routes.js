var validator = require('validator');

module.exports = function (app, databaseService) {

    app.get('/list', (req, res) => {

        databaseService.getAll()
            .then((facts) => {
                res.json(facts);
            }).catch((e) => {
                res.status(500).json(e);
            });

    });

    app.get('/egress', (req, res) => {

        databaseService.getEgress()
            .then((facts) => {
                res.json(facts);
            }).catch((e) => {
                res.status(500).json(e);
            });

    });

    app.get('/ingress', (req, res) => {

        databaseService.getIngress()
            .then((facts) => {
                res.json(facts);
            }).catch((e) => {
                res.status(500).json(e);
            });

    });

    app.get('/home', (req, res) => {

        databaseService.getBudget()
            .then((facts) => {
                res.json(facts);
            }).catch((e) => {
                res.status(500).json(e);
            });

    });

    app.post('/insert', (req, res) => {
        const newItem = req.body;
        try {
            var validate_concept = !validator.isEmpty(newItem.concept);
            var validate_amount = !validator.isEmpty(newItem.amount);
            var validate_type = !validator.isEmpty(newItem.type);

        } catch (e) {
            res.status(200).json(e)
        }

        if (validate_concept && validate_amount && validate_type) {
            databaseService.insertItem(newItem)
                .then(() => {
                    res.json({
                        "message": "item inserted into table"
                    });
                }).catch((e) => {
                    res.status(500).json(e);
                });
        }else{
            res.status(200).json({
                "message" : "Faltan datos por enviar"
            });
        }




    });

    app.put('/modify/:id', (req, res) => {
        var itemId = req.params.id;
        var updateItem = req.body;
        
        try {
            var validate_concept = !validator.isEmpty(updateItem.concept);
            var validate_amount = !validator.isEmpty(updateItem.amount);
        } catch (e) {
            res.status(500).json(e);
        }

        if(validate_concept && validate_amount){
            databaseService.modifyItem(itemId, updateItem)
            .then(() => {
                res.json({
                    "message": "successfully modified item"
                });
            }).catch((e) => {
                res.status(500).json(e);
            });
        }else{
            res.status(500).json({
                "message":"Faltan datos por enviar"
            })
        }

    });

    app.delete('/delete/:id', (req, res) => {
        var itemId = req.params.id;
        var deleteFact = req.body;
        

        databaseService.deleteItem(itemId, deleteFact)
            .then(() => {
                res.json({
                    "message": "item deleted successfully"
                });
            }).catch((e) => {
                res.status(500).json(e);
            });

    });

}