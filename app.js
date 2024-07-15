var express = require("express");
const path = require("path");

const dbConnection=require('./mongodb');
// dbConnection().then((resp) => {
//   resp
//     .find({})
//     .toArray()
//     .then((data) => {
//       console.log(data);
//     });
// });

const main= async ()=>{
    let data = await dbConnection();
    data= await data.find().toArray();

    console.log(data);
}

main();

var app = express();

//middleware

const reqFilter = require("./middleware");
// const reqFilter=(req,resp,next)=>{
//    if(!req.query.age)
//    {
//      resp.send('please provide age')
//    }
//    else if(req.query.age<18)
//     {
//       resp.send('you can not access this page')
//     }
//    else{
//     next();
//    }

// }

//this will work all route
//app.use(reqFilter);

//middleware end

const route = express.Router();

route.use(reqFilter);

const publicPath = path.join(__dirname, "public");

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.sendFile(`${publicPath}/index.html`);
});

//for specific route use middleware
route.get("/profile", function (req, res) {
  var user = {
    name: "neeraj",
    email: "test@gmail.com",
    skills: [".net", "c#", "angular", "react"],
  };
  res.render("profile", { user });
});

route.get("/login", function (req, res) {
  res.render("login");
});

app.use("/", route);
//for static page
//app.use(express.static(publicPath));

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
