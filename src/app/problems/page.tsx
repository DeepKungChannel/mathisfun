import React from 'react'
import { db } from '~/server/db'
import MathProblemTable from './MathProblemTable'



export default async function ProblemsPage() {

    const mathproblems = await db.query.mathProblems.findMany()

    // fillter out answer field
    const new_mathproblems = mathproblems.map(problem => {
        const {answer, ...rest} = problem
        return rest
    })

    return (
        <div className="pt-16 font-kanit">
            
            <div className=''>โจทย์ประจำสัปดาห์</div>
            <div className='text-2xl p-5'>คลังข้อสอบ</div>
            <div>
                <MathProblemTable data={new_mathproblems} />
            </div>
            {/* <div className="w-full h-[95vh] flex justify-center items-center">
            Please Login before using this page...
        </div> */}
        </div>
    )
}
