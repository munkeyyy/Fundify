import express from "express";
import { isAdmin } from "../Middleware/role.middleware";
import { deleteUserSip, getSingleUserSip, getUserSip, subscribeSip, updateUserSip } from "../Controllers/info.controller";
const router = express.Router();

router.post("/subcribe-sip",isAdmin, subscribeSip )
router.get("/get-user-sips", getUserSip )
router.get("/get-single-user-sip/:sipId", getSingleUserSip )
router.put("/update-suer-sip/:sipId",isAdmin, updateUserSip)
router.delete("/delete-user-sip/:sipId",isAdmin, deleteUserSip)

export default router