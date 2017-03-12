var express      = require("express"),
    Campground   = require("../models/campground"),
    router       = express.Router(),
    middleware   = require("../middleware");




//Show all campgrounds
router.get("/", function(req, res){
    
  Campground.find({}, function(err, allCampgrounds){
      if(err){
          console.log(err);
      } else {
          res.render("campgrounds/index", {campgrounds : allCampgrounds, currentUser:req.user});
      }
       
  });
                        
   
});

//campground routes

//Create new campground
router.post("/",middleware.isLoggedIn, function(req,res){
    
    var name    = req.body.name,
        image   = req.body.image,
        price   = req.body.price,
        desc    = req.body.description,
        author  = {
            
        id       : req.user._id,
        username : req.user.username
        };
    
    var newCampground = {name:name, image:image, description:desc, author: author, price: price};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else {
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
    
});

//show new form to enter a campground
router.get("/new",middleware.isLoggedIn, function(req,res){
    
    res.render("campgrounds/new");
});


//Show more info about specific campground
router.get("/:id", function(req,res){
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
          console.log(err);  
        }else { 
            res.render("campgrounds/show", {campground: foundCampground});
        }
        
    });
    
    
});


//EDIT campground ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
    
   
    Campground.findById(req.params.id, function(err, foundCampground){
                
            res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE campground ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect to show page
    
});

//DESTROY CAMPGROUND
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndDestroy(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});
    

module.exports = router;



