import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import getUserData, { getProblemSolveNumber, getUserSolveNumber } from "~/server/action/getUser";
import { db } from "~/server/db";
import { mathProblems, solved_math_problem, submissions, users } from "~/server/db/schema";
import checkStringWithNumberAnswer from "./string-with-number";

export async function POST(request: Request) {
    const data = (await request.json())
    const dataShape = z.object({
        id: z.number(),
        answer: z.string()
    })

    type dataT = z.infer<typeof dataShape>

    const checkresult = dataShape.safeParse(data as dataT)
    if (!checkresult.success) return NextResponse.json({"result": false, "message": "Invalid data"}, {status: 400});

    const problem_id = checkresult.data.id
    const answer = checkresult.data.answer
    
    const userdata = await getUserData()

    if (!userdata) {
        return NextResponse.json({"result": false, "message": "User not found"}, {status: 404}) // 1: success 0: fail
    }

    const mathproblem = await db.query.mathProblems.findFirst({
        where : (mp, { eq }) => eq(mp.id, problem_id)
    })

    if (!mathproblem) {
        return NextResponse.json({"result": false, "message": "Problem not found"}, {status: 404}) // 1: success 0: fail
    }

    let pass = false
    let receivepoint = 0
    
    // check if answer is correct
    pass = checkAnswer(answer, mathproblem)
    
    const result = await db.query.solved_math_problem.findFirst({
        where: (smp, {eq, and}) => and(eq(smp.problemId, mathproblem.id),eq(smp.userId, userdata.userId)),
    })

    
    // insert submission to database
    if (pass) {
        await db.insert(submissions).values({userId: userdata.userId, problemId: problem_id, pass})
    }
    
    
    // if pass and not solved before (First solved)
    if (pass && !result) {
        // insert solved
        await db.insert(solved_math_problem).values({userId: userdata.userId, problemId: mathproblem.id})
        
        // update user point
        const _user = await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.userId, userdata.userId),
        })
        if (!_user) throw "User not found (from /api/submit/routes.ts in POST function)"
        const currentpoint = _user.point
        
        receivepoint = Math.round(mathproblem.gs * 0.01)
        const newpoint = currentpoint + receivepoint
        await db.update(users).set({point: newpoint}).where(eq(users.userId, userdata.userId))
    }
    
    // if pass and solved
    else if (pass && result) {
        // update lastSolvedAt
        await db.update(solved_math_problem).set({lastSolvedAt: new Date()}).where(eq(solved_math_problem.id, result.id))
        
        // update user point
        const _user = await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.userId, userdata.userId),
        })
        if (!_user) throw "User not found (from /api/submit/routes.ts in POST function)"
        const currentpoint = _user.point
        
        receivepoint = 1
        const newpoint = currentpoint + receivepoint
        await db.update(users).set({point: newpoint}).where(eq(users.userId, userdata.userId))
    }
    
    // update user solved number
    const new_solved_num = await getUserSolveNumber(userdata.userId)
    await db.update(users).set({solved: new_solved_num}).where(eq(users.userId, userdata.userId))

    // update solved user count to the problem
    const solved_count = await getProblemSolveNumber(problem_id)
    await db.update(mathProblems).set({solved_user_count: solved_count}).where(eq(mathProblems.id, problem_id))
    
    return NextResponse.json({"result": pass, "point": receivepoint})
}


function checkAnswer(answer: string, mathproblem: typeof mathProblems['_']['inferSelect']) {
    
    if (mathproblem.graderId == "number"){
        return MultipleAnswer(answer, mathproblem.answer, (answer, solution) => {
            if (parseFloat(answer) == parseFloat(solution)) return true
            return false
        })
    }
    else if (mathproblem.graderId == "string_with_number") {
        const value = MultipleAnswer(answer, mathproblem.answer, checkStringWithNumberAnswer)
        console.log(value)
        return value
    }
    
    
    // 'string' case or another graderId
    return MultipleAnswer(answer, mathproblem.answer, (answer, solution) => {
        return (answer.trim() == solution)
    })    
}

function MultipleAnswer<T extends (answer: string, solution: string) => boolean>(answer: string, solution: string, checkAnswerFunction: T) {
    const sols = solution.split("|")
    let pass = false
    sols.map(sol => {
        if (pass) return
        if (checkAnswerFunction(answer, sol)) pass = true
    })

    return pass
}