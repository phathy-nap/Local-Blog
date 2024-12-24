import express from "express";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const storage = []; //storage

//GET request home page
app.get("/", (req, res) => {
  res.render("home", { storage: storage });
});

//GET request form page
app.get("/new", (req, res) => {
  res.render("new");
});

//POST request push data to storage
app.post("/new", (req, res) => {
  const newPostData = {
    //data from form id, title, description
    id: storage.length,
    title: req.body.title,
    description: req.body.description,
  };
  storage.push(newPostData); //push data to storage
  res.redirect("/");
});

//GET request edit post

app.get("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id); //get post id as integer
  const postData = storage.find((p) => postId === p.id); //find object with the same id

  res.render("edit", { postData: postData });
});

//POST request edit post

app.post("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id); //get post id as integer
  const postData = storage.find((p) => postId === p.id); //find object with the same id

  postData.title = req.body.title; //replace title and description
  postData.description = req.body.description;

  res.redirect("/");
});

//POST request delete post

app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id); //get post id as integer
  const postData = storage.findIndex((p) => postId === p.id); //find index with the same id

  storage.splice(postData, 1); //delete 1 item forward from the index number (itself)

  res.redirect("/");
});

app.listen(port, () => {
  console.log("Server runnung...");
});
