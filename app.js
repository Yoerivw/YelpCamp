

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedsDB     = require("./seeds");
    
seedsDB();
    
    
//connect and dynamically create a database called yelp_camp    
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));





//Set up route to our rootpage
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
   Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds : allCampgrounds});
       }
       
   });
                        
   
});


app.post("/campgrounds", function(req,res){
    
    var name= req.body.name;
    var image= req.body.image;
    var desc= req.body.description;
    
    var newCampground = {name:name, image:image, description:desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else {
            res.redirect("/campgrounds");
        }
    });
    
});

app.get("/campgrounds/new", function(req,res){
    
    res.render("campgrounds/new");
});


//Show more info about specific campground
app.get("/campgrounds/:id", function(req,res){
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
          console.log(err);  
        }else { 
            res.render("campgrounds/show", {campground: foundCampground});
        }
        
    });
    
    
});

// comments routes 

app.get("/campgrounds/:id/comments/new", function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground : campground});
        }
    });
   
});


app.post("/campgrounds/:id/comment", function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.render("/campgrounds");
        } else{
            
            Comment.create(req.params.body, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
                
            });
        }
    });
    
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running");
    
})