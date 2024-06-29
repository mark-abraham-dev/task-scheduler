import express from "express";
import { Log } from "../models/Log";

const router = express.Router();

router.get("/", async (req, res) => {
    const logs = await Log.find();
    res.json(logs);
});

export default router;
