import express from "express";
import  {createTodo, deleteTodo, getTodo, updateTodo}  from "../controllers/todoController.js";
import { authenticate } from "../middlewares/authorize.js";


const router = express.Router();

router.post("/create", authenticate ,createTodo);
router.get("/fetch", authenticate, getTodo);
router.put("/update/:id", authenticate, updateTodo);
router.delete("/delete/:id", authenticate, deleteTodo); 

export default router;