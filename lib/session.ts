export const ironOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "siwe",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { Session, withIronSession } from "next-iron-session";

type NextIronRequest = NextApiRequest & { session: Session };
type ServerSideContext = GetServerSidePropsContext & { req: NextIronRequest };

export type ApiHandler = (
  req: NextIronRequest,
  res: NextApiResponse
) => Promise<void>;

export type ServerSideHandler = (
  context: ServerSideContext
) => ReturnType<GetServerSideProps>;

export const withSession = <T extends ApiHandler | ServerSideHandler>(
  handler: T
) => withIronSession(handler, ironOptions);

export default withSession;
