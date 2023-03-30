import { Router } from "express";
import PostController from "../controllers/PostController";
import { jwtMiddleware } from "../utils/jwt";

const router = Router();

// Create a Post
router.post("/", [jwtMiddleware], PostController.newPost);

// Get all Posts
router.get("/", [jwtMiddleware], PostController.listAll);

// Get Post by id
router.get("/:postId([0-9]+)", [jwtMiddleware], PostController.getOne);

// Edit Post
router.patch("/:postId([0-9]+)", [jwtMiddleware], PostController.editPost );

// Delete Post - It is preferable to update the status instead, but in this case the post will be removed.
router.delete("/:postId([0-9]+)", [jwtMiddleware], PostController.deletePost );


export default router;