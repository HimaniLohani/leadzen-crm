import express from "express";

import {
  createLead,
  getLeads,
  getAnalytics,
} from "../controller/leadController";

const router = express.Router();

router.post("/", createLead);

router.get("/", getLeads);

router.get("/analytics", getAnalytics);

export default router;
console.log(createLead);
console.log(getLeads);
console.log(getAnalytics);