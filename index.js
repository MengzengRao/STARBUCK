var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Order    = require('./MODELS/order');
var mongoose = require('mongoose');
 
mongoose.connect('mongodb://ec2-52-41-97-191.us-west-2.compute.amazonaws.com/starbucks');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var STATUS = "";




var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
//var order_id;

app.get('/', function(req, res, next) {
    res.send("Hello");
});
router.route('/order')

    .post(function(req, res) {
        
         var order = new Order();
         order.amount = req.body.amount ;
         order.drink  = req.body.amount;
         order.price = req.body.price;
         order.shop = req.body.shop;
         order.total = req.body.total;
         order.yourname = req.body.yourname;
 
          order.save(function(err) {
            //order_id =order.id ;
            if (err){
                STATUS = "Unsuccessful";
                res.send(err);
            }
           console.log(req.body);
            STATUS = "Successful" ;
            res.status(200).send(order.id);
        
             
    });
       //   console.log(order_id);

       });

    router.route('/orders')


       .get(function(req, res) {
        Order.find(function(err, order) {
            if (err)
                res.status(404).send({message : 'There are no orders'});

            res.status(200).json(order);
        });
    });
       
router.route('/order/:order_id')
    .get(function(req, res) {
        Order.findById(req.params.order_id, function(err, order) {
            if (err)
                res.status(404).send({message : 'Order not found'});
            res.status(200).json(order);
        });
    })


    .put(function(req, res) {

        Order.findById(req.params.order_id, function(err, order) {

            if (err)
                res.send({message : 'Cannot update the order'});
         
            order.amount = req.body.amount ;
         	order.drink  = req.body.amount;
        	order.price = req.body.price;
         	order.shop = req.body.shop;
         	order.total = req.body.total;
         	order.yourname = req.body.yourname;

        
            order.save(function(err) {
                if (err)
                    res.send(err);

                res.status(200).json({ message: 'Order updated!' });
            });

        });
    })


    .delete(function(req, res) {
        Order.remove({
            _id: req.params.order_id
        }, function(err, order) {
            if (err)
                res.send({message : 'cannot delete the order'});

            res.json({ message: 'Successfully deleted' });
        });
    });





// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port ' + port);