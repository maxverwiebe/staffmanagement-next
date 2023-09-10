import clientPromise from "../../lib/mongodb";
import Cookies from 'cookies'
import { withSessionRoute } from "@/lib/withSession";

const {createHash} = require('node:crypto');

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
    if (req.method == "POST"){
        const username = req.body['username']
        const guess = req.body['password']

        const client = await clientPromise;
        const db = client.db("staffmanager");
        const users = await db.collection("users").find({"name": username}).toArray();
        if (users.length == 0){
            res.redirect("/login?e=1");
            return;
        }

        const user = users[0]
        const guess_hash = createHash('sha256').update(guess).digest('hex');

        if (guess_hash == user.password){
            
            if (!req.session) {
                req.session = {}
            }

            req.session.user = {
                username: username,
                avatarURL: user.avatarURL,
                isAdmin: true
            };

            await req.session.save();

            res.redirect("/dashboard/test2")
        } else {
            res.redirect("/login?e=1")
        }
      } else {
        res.redirect("/login")
      }
}