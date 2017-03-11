var express = require("express"),
    router  = express.Router({mergeParams:true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");


//=====================
// COMMENT ROUTES
//=====================
// new comments
router.get("/new", isLoggedIn, function(req, res){
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
router.post("/",isLoggedIn, function(req, res){
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            
            console.log("This error is in comment creation" + req.params.id); // 58c2f0f0370ca025b9356524
            console.log(err);
            res.render("/campgrounds");
        } else{
            
            
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment and save
                    comment.author.username = req.user.username;
                    comment.author.id       = req.user._id;
                    comment.save();
                    
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
                
            });
        }
    });
    
});
//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    
    res.redirect("/login");
    
    
}

module.exports = router;

// var express = require("express");
// var router  = express.Router({mergeParams: true});
// var Campground = require("../models/campground");
// var Comment = require("../models/comment");

// //Comments New
// router.get("/new", isLoggedIn, function(req, res){
//     // find campground by id
//     console.log(req.params.id);
//     Campground.findById(req.params.id, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//              res.render("comments/new", {campground: campground});
//         }
//     })
// });

// //Comments Create
// router.post("/",isLoggedIn,function(req, res){
//   //lookup campground using ID
//   Campground.findById(req.params.id, function(err, campground){
//       if(err){
//           console.log(err);
//           res.redirect("/campgrounds");
//       } else {
//         Comment.create(req.body.comment, function(err, comment){
//           if(err){
//               console.log(err);
//           } else {
//               //add username and id to comment
//               comment.author.id = req.user._id;
//               comment.author.username = req.user.username;
//               //save comment
//               comment.save();
//               campground.comments.push(comment);
//               campground.save();
//               console.log(comment);
//               res.redirect('/campgrounds/' + campground._id);
//           }
//         });
//       }
//   });
// });

// //middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


// module.exports = router;