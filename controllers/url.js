import { Url } from "../models/url.js";
import shortid from "shortid";

export const handleCreateUrlShortnerId = async (req, res) => {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ msg: "url needed" });
    const shortId = shortid();

    await Url.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitHistory: [],
    });
    return res.status(200).json({ shortId: shortId });
  } catch (error) {
    console.log("SAVE ERROR", error);
  }
};

export const handleRedirectUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const result = await Url.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timeStamp: Date.now(),
          },
        },
      }
    );
    return res.redirect(result.redirectUrl);
  } catch (error) {
    console.log("REDIRECT ERROR", error);
  }
};

export const handleAnalytics = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    return res.json({ numberOfClicks: result.visitHistory.length });
  } catch (error) {
    console.log("ANALYTICS ERROR", error);
  }
};
