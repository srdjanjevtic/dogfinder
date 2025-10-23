import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addComment,
  getComments,
  likeComment,
  //   deleteComment,
  //   getComment,
  //   updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getComments);
router.post("/", verifyToken, addComment);
router.put("/likeComment/:commentId", verifyToken, likeComment);
// router.get("/:id", getComment);
// router.put("/:id", verifyToken, updateComment);
// router.delete("/:id", verifyToken, deleteComment);

export default router;
