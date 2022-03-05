import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * calls the /stream route of Livepeer.com APIs to create a new stream.
 * The response returns the playbackId and streamKey.
 * With this data available the ingest and playback urls would respectively be:
 * Ingest URL: rtmp://rtmp.livepeer.com/live/{stream-key}
 * Playback URL: https://cdn.livepeer.com/hls/{playbackId}/index.m3u8
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const authorizationHeader = req.headers && req.headers["authorization"];

    try {
      const createStreamResponse = await axios.post(
        "https://livepeer.com/api/stream",
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

      if (createStreamResponse && createStreamResponse.data) {
        res.statusCode = 200;
        res.json({ ...createStreamResponse.data });
        // console.log(createStreamResponse.data);
      } else {
        res.statusCode = 500;
        res.json({ error: "Something went wrong" });
      }
    } catch (error: any) {
      res.statusCode = 500;
      // Handles Invalid API key error
      if (error.response.status === 403) {
        res.statusCode = 403;
      }
      res.json({ error });
    }
  }
};
