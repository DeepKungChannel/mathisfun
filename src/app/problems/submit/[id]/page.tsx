import React from 'react'
import { db } from '~/server/db/index'
import SubmitAnswer from './submit-answer'
import { auth } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic'

function ErrorPage({msg}: {msg?:string}) {
    return (
        <>
        { msg ? (
            <div className='w-full h-screen flex flex-col justify-center items-center text-2xl text-center font-kanit font-semibold gap-3'>
                {msg.split('\\n').map((line, index) => (
                    <React.Fragment key={index}>
                    <p>{line}</p>
                    </React.Fragment>
                ))}
            </div>
            
        ):(
            <div className='w-full h-screen flex justify-center items-center text-2xl font-kanit font-semibold'>Page Not Found</div>
        )}
        </>
    )
}

export default async function page({params}: {params: { id: string }}) {

    const user = auth()

    if (!user.userId) {
        return <ErrorPage msg="Please signed in before submitting\nโปรดใส่ลงชื่อเข้าใช้ก่อนส่งคำตอบ"/>
    }
    else
    // check if id is a number
    if (isNaN(Number(params.id))) {
        return <ErrorPage />
    }

    const mathproblem = await db.query.mathProblems.findFirst({
        where: (mp, { eq }) => eq(mp.id, Number(params.id))
    })

    if (!mathproblem) {
        return <ErrorPage />
    }
    let pass = false;
    const solved_math_problem = await db.query.solved_math_problem.findFirst({
        where: (smp, {eq, and}) => and(eq(smp.problemId, mathproblem.id), eq(smp.userId, user.userId)),
    })

    if (solved_math_problem) pass = true

    return (
        <>
            <div className='pt-[7rem] px-10 font-kanit'>
                <h1 className='mb-5 text-xl'><pre className='whitespace-pre-wrap'><span className='font-kanit'>ส่งคำตอบข้อ:</span>  <span className="font-kanit font-semibold text-2xl underline underline-offset-2">{mathproblem.name}</span></pre></h1>
                <SubmitAnswer id={mathproblem.id} pass={pass}/>
            </div>

            {
                pass && (
                    <div className='px-10 mt-5 font-kanit'>
                        <h2 className='md:text-lg'>คุณได้ทำโจทย์ข้อนี้เรียบร้อยแล้ว</h2>
                        <p>โปรดรออีก 2 ชั่วโมง คุณจึงสามารถทำโจทย์ข้อนี้ซ้ำได้</p>
                    </div>
                )
            }
        </>
    )
}
