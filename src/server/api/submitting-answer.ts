"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "../db"
import { solved_math_problem, submissions } from "../db/schema"


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

    const result = await db.query.solved_math_problem.findFirst({
        where: (smp, {eq, and}) => and(eq(smp.problemId, mathproblem.id),eq(smp.userId, user.userId)),
    })

    if (pass && !result) await db.insert(solved_math_problem).values({userId: user.userId, problemId: mathproblem.id})
    
    await db.insert(submissions).values({userId: user.userId, pass})

    return {"result": pass}
}