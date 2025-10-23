import express from "express";
import {
  addMessage,
  deleteMessage,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post("/:chatId", verifyToken, addMessage);
router.delete("/delete/:messageId", verifyToken, verifyAdmin, deleteMessage);

export default router;
