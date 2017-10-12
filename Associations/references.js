var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {
  useMongoClient: true,
});


// POST - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});

var Post = mongoose.model("Post", postSchema);


// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Post"
    }
  ]
});

var User = mongoose.model("User", userSchema);

// Post.create({
//   title: "How to cook the best burger pt. 3",
//   content: "gdfhsdjksbcjsdgjskdckdbcjshbcjb"
// }, function(err, post) {
//   User.findOne({email: "Bob@gmail.com"}, function(err, foundUser) {
//     if(err) {
//       console.log(err);
//     } else {
//       foundUser.posts.push(post);
//       foundUser.save(function(err, data){
//         if(err) {
//           console.log(err);
//         } else {
//           console.log(data);
//         }
//       });
//     }
//   });
// });



//Find User
//find all posts for that user

User.findOne({email: "Bob@gmail.com"}).populate("posts").exec(function(err, user) {
  if(err) {
    console.log(err);
  } else {
    console.log(user);
  }
});


// User.create({
//   email: "Bob@gmail.com",
//   name:   "Bob Belcher"
// });
