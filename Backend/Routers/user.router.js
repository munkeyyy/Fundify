import express from "express";
import {
  addUser,
  deleteUser,
  getSingleUser,
  getUsers,
  signIn,
  signUp,
  updateUser,
} from "../Controllers/user.controller";
import { isAdmin } from "../Middleware/role.middleware";

const router = express.Router();

router.post("/add-user", addUser);
router.get("/get-users", getUsers);
router.get("/get-users/:user_id", getSingleUser);
router.put("/update-user/:user_id", updateUser);
router.delete("/delete-user/:user_id",isAdmin, deleteUser);

// Auth

router.post("/sign-up", signUp);
router.post('/sign-in',signIn)
export default router;
