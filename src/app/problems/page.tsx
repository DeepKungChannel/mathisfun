import React from 'react'
import { db } from '~/server/db'
import MathProblemTable from './MathProblemTable'
import { auth } from '@clerk/nextjs/server'
import getUserData from '~/server/action/getUser'
import NewMathProblemsTable from './NewMathProblemsTable'
import { InferSelectModel } from 'drizzle-orm'
import { solved_math_problem } from '~/server/db/schema'
import { z } from 'zod'

//export const dynamic = 'force-static'
export const revalidate = 30

const filtered_mathprobles_Shape = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        visibility: z.number(),
        url: z.string(),
        createdAt: z.date(),
        updatedAt: z.date().nullable(),
        graderId: z.string(),
        gs: z.number(),
        solved_user_count: z.number(),
        tag: z.string(),
        solved: z.boolean(),
    })
)

export type FilteredMathproblemsType = z.infer<typeof filtered_mathprobles_Shape>

export default async function ProblemsPage() {

    const mathproblems = await db.query.mathProblems.findMany({
        where: (problem, {eq}) => eq(problem.visibility, 0),
        orderBy: (problem, { asc }) => [asc(problem.gs)],
    })
    const userdata = await getUserData()

    let solved_problems: InferSelectModel<typeof solved_math_problem>[] = []
    if (userdata?.id) {
        solved_problems = await db.query.solved_math_problem.findMany({
            where: (sp, { eq }) => eq(sp.userId, userdata.userId)
        })
    }


    // fillter out answer field
    const filtered_mathproblems: FilteredMathproblemsType = mathproblems.map(problem=> {
        let {answer, ...rest} = problem as any// modify object perpose
        rest.solved = false 
        
        // check if this problem is in solved_problems
        solved_problems.map(solved_problem => {
            if (solved_problem.problemId == problem.id) {
                rest.solved = true
            }
        })

        return rest
    })

    const checkresult = filtered_mathprobles_Shape.safeParse(filtered_mathproblems)
    if (!checkresult.success) {
        return (
            <div className="w-full h-[95vh] font-kanit text-xl flex justify-center items-center">
                Backend Failed at data type checking (Please Report this..)
            </div>
        )
    }


    const new_mathproblems_data = await db.query.NewMathProblems.findMany({
        orderBy: (problem, { asc }) => [asc(problem.id)],
    })
    const new_mathproblems_ids = new_mathproblems_data.map(data => data.problemId)
    const new_mathproblems = filtered_mathproblems.filter(problem => new_mathproblems_ids.includes(problem.id))


    return (
        <div className="pt-16 font-kanit pb-10">
            
            <div className='text-2xl p-5'>คลังโจทย์คณิตศาสตร์</div>
                <NewMathProblemsTable data={new_mathproblems} signedin={userdata ? true: false}/>
            <div className='relative'>
                <MathProblemTable data={filtered_mathproblems} signedin={userdata ? true: false}/>
            </div>
            {/* <div className="w-full h-[95vh] flex justify-center items-center">
            Please Login before using this page...
        </div> */}
        </div>
    )
}
