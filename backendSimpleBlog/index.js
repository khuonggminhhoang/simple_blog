const express = require("express");
const app = express();
const cors = require("cors");
const { BlogPosts } = require("./BlogPosts");
const bodyParser = require("body-parser");
const dbConnect = require("./db/dbConnect");
const jsonParser = bodyParser.json();
const PostRouter = require('./routes/PostRouter');

// database
dbConnect();

app.use(cors());
app.use(express.json());

const PORT = 3000;


app.get("/api/posts", (req, res) => {
  res.json(BlogPosts);
});


app.get("/api/posts/:slug", (req, res) => {
  const { slug } = req.params;
  console.log(slug);
  const post = BlogPosts.find((post) => post.slug === slug);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

app.post("/api/post", jsonParser, (req, res) => {
  const post = {
    slug: req.body.slug,
    title: req.body.title,
    description: req.body.description,
  };
  BlogPosts.push(post);
  res.status(200).send({ message: "Posted successful" });
});

app.post("/api/login", jsonParser, (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password,
  };
  if (creds.username === "admin" && creds.password === "123") {
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(400).send({ message: "Login failed" });
  }
});

app.use('/api', PostRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
