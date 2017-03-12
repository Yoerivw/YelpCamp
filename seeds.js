var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"), 
    Comments     = require("./models/comment"),
    data        = [
        {
            name: "Clean forrest",
            image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
            description: "Beautiful resting grounds for anyone willing to break away from the busy city life."
        },{
            name: "curious haven",
            image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
            description: "Come and explore your wildest dreams"
        },{
            name: "Sandy beach",
            image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
            description: "Sandy beach, the perfect adventure campground"
        },{
            name: "Campers rest",
            image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
            description: "enjoy, relax and rejuvenate on a weekend here with friends."
        }
    ]



// function seedsDB(){  
//     //Delete all campgrounds
// Campground.remove({}, function(err){
//     if(err){
//         console.log(err);
//     }  
        
//      console.log("removed campgrounds");
     
//                 data.forEach(function(seed){
//                 Campground.create(seed, function(err,campground){
//                     if(err){
//                         console.log(err);
                            
//                         } else {
//                             console.log("added campgrounds");
                            
//                             Comments.create(
//                                 {    
//                                 text:"I wish I could add these manually while logged !",
//                                 author: "The one and only future super developer !"
//                                 }, function (err,comment){
//                                     if (err){
//                                         console.log(err);
//                                     } else {
//                                         campground.Comment.push(comment);
//                                         campground.save();
//                                         console.log("created a new comment");
//                                     }
//                         });
//                 }
//             });
//         });
//     }); 
//     //add a few comments
// }
function seedsDB(){
  //Remove all campgrounds
  Campground.remove({}, function(err){
        if(err){
             console.log(err);
         }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comments.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
     }); 
    //add a few comments
}

module.exports = seedsDB;