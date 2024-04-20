import React from 'react'
import { db } from '~/server/db'
import MathProblemTable from './MathProblemTable'
import { auth } from '@clerk/nextjs/server'
import getUserData from '~/server/action/getUser'

//export const dynamic = 'force-static'
export const revalidate = 30

export default async function ProblemsPage() {

    const mathproblems = await db.query.mathProblems.findMany({
        orderBy: (problem, { asc }) => [asc(problem.gs)],
    })
    const userdata = await getUserData()

    let solved_problems = [] as any[] // come on man it's annoying
    if (userdata?.id) {
        solved_problems = await db.query.solved_math_problem.findMany({
            where: (sp, { eq }) => eq(sp.userId, userdata.userId)
        })
    }

    // fillter out answer field
    const new_mathproblems = mathproblems.map(problem=> {
        let {answer, ...rest} = problem as any // modify object perpose
        rest.solved = false 
        
        // check if this problem is in solved_problems
        solved_problems.map(solved_problem => {
            if (solved_problem.problemId == problem.id) {
                rest.solved = true
            }
        })

        return rest
    })

    return (
        <div className="pt-16 font-kanit">
            
            <div className='text-2xl p-5'>คลังโจทย์คณิตศาสตร์</div>
            <div>
                <MathProblemTable data={new_mathproblems} />
            </div>
            {/* <div className="w-full h-[95vh] flex justify-center items-center">
            Please Login before using this page...
        </div> */}
        </div>
    )
}
