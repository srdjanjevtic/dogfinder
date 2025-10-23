import prisma from "../lib/prisma.js";

export const getComments = async (req, res) => {
  const postId = req.params.postId;
  // console.log("line 5:", postId);
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    setTimeout(() => {
      res.status(200).json(comments);
    }, 500);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Neuspelo ucitavanje" });
  }
};

// export const getComment = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const post = await prisma.post.findUnique({
//       where: { id },
//       include: {
//         postDetail: true,
//         user: {
//           select: {
//             username: true,
//             avatar: true,
//           },
//         },
//       },
//     });
//     const token = req.cookies?.token;
//     if (token) {
//       jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
//         if (!err) {
//           const saved = await prisma.savedPost.findUnique({
//             where: {
//               userId_postId: {
//                 postId: id,
//                 userId: payload.id,
//               },
//             },
//           });
//           console.log("saved: ", saved);
//           res.status(200).json({ ...post, isSaved: saved ? true : false });
//         }
//       });
//     } else {
//       res.status(200).json(post);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to get post" });
//   }
// };

export const addComment = async (req, res) => {
  try {
    const tokenUserId = req.userId;
    const { content, postId, userId, parentId } = req.body;
    console.log("parentId:", parentId);
    if (content.length === 0) {
      return res.status(403).json({ message: "Comment cannot be empty!" });
    }
    if (userId !== req.userId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    const newComment = await prisma.comment.create({
      data: {
        content: content,
        userId: tokenUserId,
        postId: postId,
        parentId: parentId,
      },
    });
    res.status(201).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create comment" });
  }
};

// export const updateComment = async (req, res) => {
//   try {
//     res.status(200).json();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to update posts" });
//   }
// };

// export const deleteComment = async (req, res) => {
//   const id = req.params.id;
//   const tokenUserId = req.userId;
//   try {
//     const post = await prisma.post.findUnique({
//       where: { id },
//     });
//     if (post.userId !== tokenUserId) {
//       return res.status(403).json({ message: "Not Authorized!" });
//     }
//     await prisma.post.delete({
//       where: { id },
//     });
//     res.status(200).json({ message: "Post deleted" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to delete post" });
//   }
// };

export const likeComment = async (req, res) => {
  const id = req.params.commentId;
  const tokenUserId = req.userId;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
    });
    if (comment.userId === tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    if (comment.likes.indexOf(req.userId) === -1) {
      await prisma.comment.update({
        where: { id },
        data: {
          likes: {
            push: req.userId,
          },
        },
      });
      res.status(200).json({ message: "Comment liked" });
    } else {
      await prisma.comment.update({
        where: { id },
        data: {
          likes: {
            set: comment.likes.filter((like) => like !== req.userId),
          },
        },
      });
      res.status(200).json({ message: "Like removed" });
    }
  } catch (err) {
    console.log(err);
  }
};
