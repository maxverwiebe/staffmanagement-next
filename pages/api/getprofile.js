// DEPRECEATED

import { Flow_Block } from "next/font/google";
import pool from "../../lib/mongodb";
import { ObjectId } from 'mongodb'

export async function getProfile(id) {
    const client = await pool.acquire();
    const db = client.db("staffmanager");

    const user = await db.collection("users").find({ _id: new ObjectId(id) }).toArray();

    if (user.length == 0) {
        return false
    } 

    return user[0]
}

export async function getProfiles() {
    const client = await pool.acquire();
    const db = client.db("staffmanager");

    const users = await db.collection("users").find({}).toArray();

    if (users.length == 0) {
        return false
    } 

    users.forEach(value => {
        value._id = value._id.toString()
    });

    return users
}

export default async function handler(req, res) {
    const { id } = req.query;
    const profile = getProfile(id)

    if (!profile) {
        res.send("No")
        return
    }

    res.status(200).json(profile)
}