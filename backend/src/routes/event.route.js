 import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addCategory, createEvent, deleteCategory, deleteEvent, getAllCategories, updateCategoryName, updateEvent } from "../controllers/event.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllCategories);
router.post("/", protectRoute, addCategory);
router.put("/:category_id", protectRoute, updateCategoryName);
router.delete("/:category_id", protectRoute, deleteCategory);

router.post("/:category_id/events", protectRoute, createEvent);
router.put("/:category_id/events/:event_id", protectRoute, updateEvent);
router.delete("/:category_id/events/:event_id", protectRoute, deleteEvent);

export default router;
