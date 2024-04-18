"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "../db"
import { submissions } from "../db/schema"


export default async function submittingAnswer(id: number, answer: string) {
    const user = auth()

    if (!user.userId) return {"result": false}
    const mathproblem = await db.query.mathProblems.findFirst({
        where : (mp, { eq }) => eq(mp.id, id)
    })

    if (!mathproblem) {
        return {"result": false} // 1: success 0: fail
    }

    let pass = false;
    if (parseFloat(mathproblem.answer) == parseFloat(answer)) pass = true
    console.log(mathproblem.answer)
    console.log(answer)
    await db.insert(submissions).values({userId: user.userId, pass})

    return {"result": pass}
}