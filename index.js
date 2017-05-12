var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Order    = require('./MODELS/order');
var mongoose = require('mongoose');
var user = "starbucks";
var password = "starbuckspwd"; 
mongoose.connect('mongodb://db1.buckstest.com:27017/starbucks');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('greeting');
});
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
         order.drink  = req.body.drink;
         order.price = req.body.price;
         order.shop = req.body.shop;
         order.total = req.body.total;
         order.yourname = req.body.yourname;
         order.date = req.body.date;
 
          order.save(function(err) {
            //order_id =order.id ;
            if (err){
                STATUS = "Unsuccessful";
                res.send(err);
            }
           console.log(req.body);
            STATUS = "Successful" ;
            res.status(200).send(order);
        
             
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

 router.route('/getorder')
    .post(function(req, res) {
        Order.find({'yourname':req.body.yourname}, function(err, order) {
            if (err)
                res.status(404).send({message : 'Your name not found'});
            res.status(200).json(order);
        });
    }); 
  router.route('/updateorder')
    .post(function(req, res) {
         Order.findOneAndUpdate({'yourname':req.body.yourname,'date':req.body.date},{$set:{
         	amount:req.body.amount,
         	drink:req.body.drink,
         	price:req.body.price,
         	shop:req.body.shop,
         	total:req.body.total,
         	yourname:req.body.yourname,
         	date:req.body.date
         }},{new:true}, function(err, order) {
                if (err)
                    console.log("something Wrong");

                res.status(200).json(order);
            });
    }); 
    router.route('/deleteorder')
    .post(function(req, res) {
         Order.remove({
            yourname: req.body.yourname,
            date: req.body.date
        }, function(err, order) {
            if (err)
                res.send({message : 'cannot delete the order'});

            res.json({ message: 'Successfully deleted' });
        });
    });
router.route('/order/:yourname')
    .get(function(req, res) {
        Order.find({'yourname':req.params.yourname}, function(err, order) {
            if (err)
                res.status(404).send({message : 'Your name not found'});
            res.status(200).json(order);
        });
    })


   


    .delete(function(req, res) {
        Order.remove({
            yourname: req.params.yourname
        }, function(err, order) {
            if (err)
                res.send({message : 'cannot delete the order'});

            res.json({ message: 'Successfully deleted' });
        });
    });
router.route('/order/:yourname/:date')
	 .put(function(req, res) {

        Order.find({'yourname':req.params.yourname,'date':req.params.date}, function(err, order) {

            if (err)
                res.send({message : 'Cannot update the order'});
         
            order.amount = req.body.amount ;
         	order.drink  = req.body.amount;
        	order.price = req.body.price;
         	order.shop = req.body.shop;
         	order.total = req.body.total;
         	order.yourname = req.body.yourname;
         	order.date = req.body.date;
        
           

        });
    })



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port ' + port);