"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "../db"
import { mathProblems, solved_math_problem, submissions, users } from "../db/schema"
import { getUserSolveNumber } from "./getUser"
import { and, eq } from "drizzle-orm"


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

    // check if answer is correct
    pass = checkAnswer(answer, mathproblem)

    const result = await db.query.solved_math_problem.findFirst({
        where: (smp, {eq, and}) => and(eq(smp.problemId, mathproblem.id),eq(smp.userId, user.userId)),
    })

    if (pass && !result) await db.insert(solved_math_problem).values({userId: user.userId, problemId: mathproblem.id})
    else if (pass && result) await db.update(solved_math_problem).set({lastSolvedAt: new Date()}).where(eq(solved_math_problem.id, result.id))
    
    await db.insert(submissions).values({userId: user.userId, pass})

    // update user solved number
    const new_solved_num = await getUserSolveNumber(user.userId)
    await db.update(users).set({solved: new_solved_num}).where(eq(users.userId, user.userId))

    return {"result": pass}
}

function checkAnswer(answer: string, mathproblem: typeof mathProblems['_']['inferSelect']) {
    
    if (mathproblem.graderId == "number"){
        if (parseFloat(mathproblem.answer) == parseFloat(answer)) return true
        else return false
    }
    
    
    // else or 'string' case
    if (answer.trim() == mathproblem.answer) return true;
    return false
}