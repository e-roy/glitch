import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * calls the /stream/<id> route of Livepeer.com APIs to get the stream's status to verify that the stream is live or not.
 * isActive: true means video segments are currently being ingested by Livepeer.com. isActive: false means the live stream is idle and no
 * video segments are currently being ingested by Livepeer.com.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const authorizationHeader = req.headers && req.headers["authorization"];
    const streamId = req.query.streamId;
    try {
      const sessionResponse = await axios.patch(
        `https://livepeer.com/api/stream/${streamId}/record`,
        {
          ...req.body,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: authorizationHeader, // API Key needs to be passed as a header
          },
        }
      );
      if (sessionResponse) {
        res.statusCode = 200;
        res.json({ status: sessionResponse.status });
      } else {
        res.statusCode = 500;
        res.json({ error: "Something went wrong" });
      }
    } catch (error) {
      console.log("error: ", error);
      res.statusCode = 500;
      res.json({ error });
    }
  }
};
