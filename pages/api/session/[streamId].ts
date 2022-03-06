import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * calls the /stream/<id> route of Livepeer.com APIs to get the stream's status to verify that the stream is live or not.
 * isActive: true means video segments are currently being ingested by Livepeer.com. isActive: false means the live stream is idle and no
 * video segments are currently being ingested by Livepeer.com.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const authorizationHeader = req.headers && req.headers["authorization"];
    const streamId = req.query.streamId;
    try {
      const sessionResponse = await axios.get(
        `https://livepeer.com/api/stream/${streamId}/sessions?record=1`,
        {
          headers: {
            "content-type": "application/json",
            authorization: authorizationHeader, // API Key needs to be passed as a header
          },
        }
      );

      if (sessionResponse && sessionResponse.data) {
        res.statusCode = 200;
        res.json({ ...sessionResponse.data });
      } else {
        res.statusCode = 500;
        res.json({ error: "Something went wrong" });
      }
    } catch (error) {
      res.statusCode = 500;
      res.json({ error });
    }
  }
};