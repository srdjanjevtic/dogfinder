import express from "express";
import {
  getChats,
  getChat,
  addChat,
  readChat,
  deleteChat,
  findUniqueChat,
  getAllChats,
  getSingleChat,
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, addChat);
router.put("/read/:id", verifyToken, readChat);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteChat);
router.get("/get/all", verifyToken, verifyAdmin, getAllChats);
router.get("/find/:receiverId", verifyToken, findUniqueChat);
router.get("/single/:id", verifyToken, verifyAdmin, getSingleChat);

export default router;
