import { withSessionRoute } from "@/lib/withSession";
import { Raleway } from "next/font/google";

export default withSessionRoute(logout);

async function logout(req, res, session) {
    req.session.destroy();
}