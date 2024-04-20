import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getUserSolveNumber } from "~/server/action/getUser";
import { db } from "~/server/db";
import { mathProblems, solved_math_problem, submissions, users } from "~/server/db/schema";

export async function POST(request: Request) {

    const user = await currentUser()
    const data = (await request.json())
    const dataShape = z.object({
        id: z.number(),
        answer: z.string()
    })

    type dataT = z.infer<typeof dataShape>

    const checkresult = dataShape.safeParse(data as dataT)
    if (!checkresult.success) return NextResponse.json({"result": false, "message": "Invalid data"}, {status: 400});

    const id = checkresult.data.id
    const answer = checkresult.data.answer


    if (!user?.id) return NextResponse.json({"result": false, "message": "Not logged in"}, {status: 401});

    const mathproblem = await db.query.mathProblems.findFirst({
        where : (mp, { eq }) => eq(mp.id, id)
    })

    if (!mathproblem) {
        return NextResponse.json({"result": false, "message": "Problem not found"}, {status: 404}) // 1: success 0: fail
    }

    let pass = false;

    // check if answer is correct
    pass = checkAnswer(answer, mathproblem)

    const result = await db.query.solved_math_problem.findFirst({
        where: (smp, {eq, and}) => and(eq(smp.problemId, mathproblem.id),eq(smp.userId, user.id)),
    })

    // if pass and not solved before (First solved)
    if (pass && !result) {
        // insert solved
        await db.insert(solved_math_problem).values({userId: user.id, problemId: mathproblem.id})

        // update user point
        const _user = await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.userId, user.id),
        })
        if (!_user) throw "User not found (from /api/submit/routes.ts in POST function)"
        const currentpoint = _user.point
        
        const newpoint = Math.ceil(currentpoint + mathproblem.gs * 0.01)
        await db.update(users).set({point: newpoint}).where(eq(users.userId, user.id))
    }

    // if pass and solved
    else if (pass && result) {
        // update lastSolvedAt
        await db.update(solved_math_problem).set({lastSolvedAt: new Date()}).where(eq(solved_math_problem.id, result.id))
    
        // update user point
        const _user = await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.userId, user.id),
        })
        if (!_user) throw "User not found (from /api/submit/routes.ts in POST function)"
        const currentpoint = _user.point

        const newpoint = currentpoint + 1
        await db.update(users).set({point: newpoint}).where(eq(users.userId, user.id))
    }

    if (pass) {
        // insert submission to database
        await db.insert(submissions).values({userId: user.id, problemId: id, pass})
    }

    // update user solved number
    const new_solved_num = await getUserSolveNumber(user.id)
    await db.update(users).set({solved: new_solved_num}).where(eq(users.userId, user.id))

    return NextResponse.json({"result": pass})
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