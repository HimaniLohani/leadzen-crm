import { Request, Response } from "express";
import Lead from "../models/Lead";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("BODY 👉", req.body);

    const lead = await Lead.create(req.body);

    res.status(201).json(lead);
  } catch (error: any) {
    console.log("ERROR 👉", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const leads = await Lead.find();

    res.json(leads);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAnalytics = async (
  req: Request,
  res: Response
) => {
  try {
    const totalLeads =
      await Lead.countDocuments();

    const qualifiedLeads =
      await Lead.countDocuments({
        status: "qualified",
      });

    const conversionRate =
      totalLeads > 0
        ? Number(
            (
              (qualifiedLeads /
                totalLeads) *
              100
            ).toFixed(1)
          )
        : 0;

    res.json({
      totalLeads,

      leadTrend: 12.5,

      conversionRate,

      conversionTrend: 8.3,

      revenue: 2400000,

      revenueTrend: 15.8,

      activeDeals: qualifiedLeads,

      dealsTrend: -3.2,

      instagramLeads:
        await Lead.countDocuments({
          source: "instagram",
        }),

      googleLeads:
        await Lead.countDocuments({
          source: "google",
        }),

      qualifiedLeads,

      nonQualifiedLeads:
        await Lead.countDocuments({
          status: "non-qualified",
        }),
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};