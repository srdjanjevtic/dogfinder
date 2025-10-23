import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;
  // console.log("query:", query.city);
  try {
    const posts = await prisma.post.findMany({
      where: {
        location: query.location || undefined,
        title: query.title || undefined,
        species: query.species || undefined,
        action: query.action || undefined,
        gender: query.gender || undefined,
        age: query.age || undefined,
        size: query.size || undefined,
        color: query.color || undefined,
        price: query.price || undefined,
      },
      take: parseInt(query.limit) || undefined,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    setTimeout(() => {
      res.status(200).json(posts);
    }, 500);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  // console.log("req", req.body);
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    const token = req.cookies?.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          console.log("saved: ", saved);
          res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
      });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id; // post to update
  const tokenUserId = req.userId; // logged in user
  // console.log(id, "\n", req.userId, "\n", process.env.ADMIN_ID);
  const {
    title,
    location,
    species,
    action,
    desc,
    price,
    size,
    color,
    gender,
    age,
  } = req.body;
  // console.log(
  //   "title",
  //   title,
  //   "\n",
  //   "location",
  //   location,
  //   "\n",
  //   "species",
  //   species,
  //   "\n",
  //   "action",
  //   action,
  //   "\n",
  //   "desc",
  //   desc,
  //   "\n",
  //   "price",
  //   price,
  //   "\n",
  //   "size",
  //   size,
  //   "\n",
  //   "color",
  //   color,
  //   "\n",
  //   "gender",
  //   gender,
  //   "\n",
  //   "age",
  //   age,
  //   "\n"
  // );

  if (tokenUserId === process.env.ADMIN_ID) {
    try {
      const updatedPost = await prisma.post.update({
        where: { id },
        data: {
          title,
          location,
          action,
          species,
          desc,
          price,
          size,
          color,
          gender,
          age,
        },
      });
      return res.status(200).json(updatedPost);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Neuspelo ažuriranje!" });
    }
  }

  if (process.env.ADMIN_ID !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id; // post to delete
  const tokenUserId = req.userId; // logged in user

  if (tokenUserId === process.env.ADMIN_ID) {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
      });
      if (!post) {
        return res.status(404).json({ message: "Objava ne postoji" });
      }
      await prisma.post.delete({
        where: { id },
      });
      const posts = await prisma.post.findMany({});
      return res
        .status(200)
        .json({ message: `Post id ${id} obrisan iz baze`, data: posts });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Neuspelo brisanje" });
    }
  }
  if (post.userId !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
};
