import express from "express";
import {
  handleCreateUrlShortnerId,
  handleRedirectUrl,
  handleAnalytics,
} from "../controllers/url.js";

export const router = express.Router();

router.post("/", handleCreateUrlShortnerId);
router.get("/:shortId", handleRedirectUrl);
router.get("/analytics/:shortId", handleAnalytics);
