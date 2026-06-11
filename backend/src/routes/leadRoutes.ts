import express from "express";

import {
  createLead,
  deleteLead,
  getAnalytics,
  getLeads,
} from "../controller/leadController";

const router = express.Router();

router.post("/", createLead);

router.get("/", getLeads);

router.get("/analytics", getAnalytics);

router.delete("/:id", deleteLead);

export default router;