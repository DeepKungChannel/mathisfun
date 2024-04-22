import React from 'react'
import MathKnowledgeTable from './MathKnowledgeTable'
import { db } from '~/server/db'

export default async function KnowledgePage() {

    const data = await db.query.mathKnowledges.findMany({
        where: (knowledge, { eq }) => eq(knowledge.visibility, 0),
        orderBy: (knowledge, { asc }) => [asc(knowledge.grade_level_number)],
    })


    return (
        <div className='pt-16 pb-5 px-5 font-kanit'>
            <div className='text-2xl mt-5 mb-8'>คลังความรู้คณิตศาสตร์</div>

            <MathKnowledgeTable data={data} />
        </div>
    )
}
