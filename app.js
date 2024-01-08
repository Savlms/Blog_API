const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');
const User = require('./user');
const Post = require('./post');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// connecting to MongoDB
require('./database');

// Routing for user
app.post('/users', async (req, res) => {
    try{
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Routing for getting, updating and deleting a specific user
// Route to get a specific user by ID

app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Route to update a specific user by ID
  app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route to delete a specific user by ID
  app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Routes for post
app.post('/posts', async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.json(post);
    } catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts =  await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  
// Routing for getting, updating and deleting a specific post
// Route to get a specific post by ID
app.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;
  
    try {
      const post = await Post.findById(postId);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Route to update a specific post by ID
  app.put('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    const updatedPostData = req.body;
  
    try {
      const post = await Post.findByIdAndUpdate(postId, updatedPostData, { new: true });
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json({ message: 'Post updated successfully', post });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Route to delete a specific post by ID
  app.delete('/posts/:id', async (req, res) => {
    const postId = req.params.id;
  
    try {
      const post = await Post.findByIdAndDelete(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json({ message: 'Post deleted successfully', post });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});
  

