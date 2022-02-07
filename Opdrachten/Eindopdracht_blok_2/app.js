const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./model/userModel");
const Message = require("./model/messageModel");
const Comment = require("./model/commentModel");
const Vote = require("./model/voteModel");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(express.static("./static"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.listen(5000, () => console.log("Server started"));

mongoose.connect(process.env.MONGODB_CONNECT, (err) => {
  if (err) return console.log(err);
  console.log("Connected to the db");
});

app.post("/register", async (req, res) => {
  const { email, password, passwordRepeat } = req.body;

  if (!email || !password || !passwordRepeat) {
    return res.status(400).json({
      errorMessage: "Please enter all required fields.",
    });
  }

  if (password !== passwordRepeat) {
    return res.status(400).json({
      errorMessage: "The passwords must match.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      errorMessage: "The password must be at least 6 characters.",
    });
  }

  const passwordHash = bcrypt.hashSync(password);

  await User.create({
    email,
    passwordHash,
  });

  res.redirect('/');
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(401).json({
      errorMessage: "Please enter all required data.",
    });

  const userInDB = await User.findOne({ email });

  if (!userInDB)
    return res.status(401).json({
      errorMessage: "Login failed.",
    });

  const passwordCorrect = bcrypt.compareSync(password, userInDB.passwordHash);

  if (!passwordCorrect)
    return res.status(401).json({
      errorMessage: "Login failed.",
    });

  const token = jwt.sign(
    {
      id: userInDB._id,
    },
    process.env.JWT_SECRET
  );

  res
    .cookie("auth-token", token, {
      httpOnly: true,
    })
    .redirect('/posts.html');
});

app.post("/logout", (req, res) => {
  res.clearCookie("auth-token").end();
});

// message controller

app.post("/saveMessage", auth, async (req, res) => {
  const { message } = req.body;

  if (!message)
    return res.status(400).json({
      errorMessage: "Please enter a message.",
    });
    await Message.create({ message, user: req.user._id });

    res.redirect("/posts.html");
  });

  app.get("/messages", async (req, res) => {
    const messages = await Message.find().populate("user").exec();
    res.send(messages);
  });



  //comment controller
  app.post("/saveComment", auth, async (req, res) => {
    const { messageId, comment } = req.body;
    const message = await Message.findById(messageId).exec();
  
    if (!comment)
      return res.status(400).json({
        errorMessage: "Please enter a comment.",
      });
      await Comment.create({ comment, user: req.user._id, message: message._id});
  
      res.redirect("/posts.html");
    });
    app.get("/comments", async (req, res) => {
      const comments = await Comment.find().populate("message").populate("user").exec();
      res.send(comments);
    })

    //vote controller

    app.post("/vote", auth, async (req, res) => {
        const { messageId, like, dislike } = req.body;
        const message = await Message.findById(messageId).populate("user").exec();
        if(req.user._id.equals(message.user._id)) {
          return res.status(400).json({
            errorMessage: "You cannot like or dislike your own post!",
          });
        } else {
          
          const findVote = await Vote.findOne({message: message._id, user: req.user._id}).exec();


        if(findVote) {
          await Vote.findOneAndUpdate({message: message._id, user: req.user._id}, {like: like, dislike: dislike});
          if (like === 'true' && !findVote.like) {
            await Message.findByIdAndUpdate(messageId, {likes: message.likes + 1, dislikes: message.dislikes - 1});
          } else if (dislike === 'true' && !findVote.dislike) {
            await Message.findByIdAndUpdate(messageId, {likes: message.likes - 1, dislikes: message.dislikes + 1});
          }
        } else {
          await Vote.create({like: like, dislike: dislike, user: req.user._id, message: message._id});
          if (like === 'true') {
            await Message.findByIdAndUpdate(messageId, {likes: message.likes + 1});
          } else if (dislike === 'true') {
            await Message.findByIdAndUpdate(messageId, {dislikes: message.dislikes + 1});
          }
        }

        res.redirect('/posts.html')
      }
    });

    app.get("/votes", async (req, res) => {
      const votes = await Vote.find().populate("message").populate("user").exec();
      res.send(votes);
    });

    // edit controller

    app.get('/user', auth,  async (req,res) => {
      res.send(req.user);
    });

    app.post('/editMessage', auth, async (req, res) => {
      const { messageId } = req.body;
      const message = await Message.findOne({_id: messageId, user: req.user._id});

      res.send(`
        <form action=/saveMessageEdit method="post">
        <textarea placeholder="Write a message" name="message" rows="5" cols="50">${message.message}</textarea>
        <input type="hidden" name="messageId" value="${message._id}">
        <button type="submit">Update message</button>
        </form>
      `);
    });
    app.post('/editComment', auth, async (req, res) => {
      const { commentId } = req.body;
      const comment = await Comment.findOne({_id: commentId, user: req.user._id});

      res.send(`
        <form action=/saveCommentEdit method="post">
        <textarea placeholder="Write a message" name="comment" rows="5" cols="50">${comment.comment}</textarea>
        <input type="hidden" name="commentId" value="${comment._id}">
        <button type="submit">Update comment</button>
        </form>
      `);
    });

    app.post('/saveMessageEdit', auth, async (req, res) => {
      const { message, messageId } = req.body;
      if (!message)
      return res.status(400).json({
        errorMessage: "Please enter a message.",
      });
        await Message.findOneAndUpdate({_id: messageId, user: req.user._id}, {message: message} );
        res.redirect('/posts.html')
    });

    app.post('/saveCommentEdit', auth, async (req, res) => {
      const { comment, commentId } = req.body;
      if (!comment)
      return res.status(400).json({
        errorMessage: "Please enter a message.",
      });
        await Comment.findOneAndUpdate({_id: commentId, user: req.user._id}, {comment: comment} );
        res.redirect('/posts.html')
    });

app.post("/isLoggedIn", async (req, res) => {
  try {
    const token = req.cookies["auth-token"];
    const validatedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(validatedToken.id);
    if (user) res.send(true);
    else res.send(false);
  } catch (err) {
    res.send(false);
  }
});
