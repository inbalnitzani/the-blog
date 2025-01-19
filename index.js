import express from "express";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const posts = [
  // {
  //   title: "First Post",
  //   post: "This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic typography, lists, tables, images, code, and more are all supported as expected.This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.",

  // },
  // {
  //   title: "Second Post",
  //   post: "This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text."
  // }
]


app.get("/", (req, res) => {
  const postIndex = req.query.index;
  const action = req.query.action;
  
  if(action =="edit"){
    console.log(`Editing post at index: ${postIndex}`);
    res.render("index.ejs", { posts: posts, edit: postIndex });
  }
  else if(action =="delete"){
    console.log(`Deleting post at index: ${postIndex}`);
    //TODO: Handle the delete logic here
    posts.splice(postIndex, 1);
    res.render("index.ejs", { posts: posts });
  }
  else
    res.render("index.ejs", { posts: posts });
})

app.post("/", (req, res) => {
  if(req.body["index"]){
    var index = req.body.index;
    posts.splice(index,1);
  }
  posts.unshift({
    title: req.body["title"],
    post: req.body["post"]
  })
  res.redirect("/");
})

app.get("/post", (req, res) => {
  res.render("post.ejs");
})

// app.get("/edit", (req, res) => {
//   // const postIndex = req.query.index;
//   // console.log(postIndex);
//   res.render("index.ejs", { posts: posts, edit: req.body["index"] });
// })

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


