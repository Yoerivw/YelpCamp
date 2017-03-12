var express = require("express"),
    router  = express.Router({mergeParams:true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");


//=====================
// COMMENT ROUTES
//=====================
// new comments
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    console.log("This is on the way to new comments" + req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log("This is one the way to new comments and an error " +req.params.id);
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//comment creation
router.post("/",middleware.isLoggedIn, function(req, res){
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            
            console.log("This error is in comment creation" + req.params.id); // 58c2f0f0370ca025b9356524
            console.log(err);
            res.render("/campgrounds");
        } else{
            
            
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong, try again!")
                    console.log(err);
                } else {
                    //add username and id to comment and save
                    comment.author.username = req.user.username;
                    comment.author.id       = req.user._id;
                    comment.save();
                    
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("Comment added succesfully!");
                    res.redirect("/campgrounds/" + campground._id);
                }
                
            });
        }
    });
    
});
//Edit comment route
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
    
    
});

//Update comment route
router.put("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy route
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment succesfully deleted");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});


module.exports = router;

