import express from "express";

import {
  guestListAdd,
  guestListGet,
} from "../controllers/guestList.controller.js";

const router = express.Router();

router.post("/", guestListAdd);
router.get("/", guestListGet);

export default router;
