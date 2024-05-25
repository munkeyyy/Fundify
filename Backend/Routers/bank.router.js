import express from "express";
import { addSip, deleteSip, getSip, updateSip } from "../Controllers/bank.controller";
import { isAdmin } from "../Middleware/role.middleware";
const router = express.Router();

router.post("/add-sip", addSip )
router.get("/get-sip", getSip )
router.get("/get-sip/:sipId", getSip )
router.put("/update-sip/:sipId", updateSip)
router.delete("/delete-sip/:sipId",isAdmin, deleteSip)

export default router