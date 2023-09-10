import pool from "../../lib/mongodb";
const {createHash} = require('node:crypto');
import { ObjectId } from 'mongodb'

export async function getUser(id) {
    const client = await pool.acquire();
    const db = client.db("staffmanager");

    const user = await db.collection("users").find({ _id: new ObjectId(id) }).toArray();

    if (user.length == 0) {
        return false
    } 

    user[0].password = null

    return user[0]
}

export default async function handler(req, res) {
    if (req.method == "POST") {
        const fullname = req.body['fullname']
        const username = req.body['username']
        const email = req.body['email']
        const password = req.body['password']

        if (!fullname || !username || !email || !password) {
            return
        }

        const client = await pool.acquire()
        const db = client.db("staffmanager");
        const password_hash = createHash('sha256').update(password).digest('hex');

        const currentDate = new Date().toUTCString();
        const bodyObject = {
            name: username,
            password: password_hash,
            email: email,
            avatarURL: "https://us-tuna-sounds-images.voicemod.net/8ef88700-5d5d-4cab-9013-5d054bf9f10d-1681170803192.jpg",
            creationDate: currentDate
        }
        await db.collection("users").insertOne(bodyObject);

        res.redirect("/dashboard/accounts?success=1")
        return
    }

    if (req.method == "DELETE") {
        const id = req.body['id'];

        if (!id) {
            return
        }

        const client = await pool.acquire()
        const db = client.db("staffmanager");
        await db.collection("users").deleteOne({"_id": new ObjectId(id)}, function(err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
            db.close();
          });

        res.status(303).json({ message: "Done" })
        return
    }

    if (req.method == "GET") {
        const id = req.body['id'];

        const user = getUser(id)

        if (!user) {
            res.send("No")
            return
        }

        res.status(200).json(user)
    }
}