"use client"
import { InferSelectModel } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Checkbox } from '~/components/ui/checkbox';
import { mathKnowledges } from '~/server/db/schema';


export default function MathKnowledgeTable({data}: {data: InferSelectModel<typeof mathKnowledges>[] }) {
    return (
        <>
        
        <div className='md:mx-5 overflow-y-auto border-[1px] border-gray-200 shadow-md shadow-[#c5c5c5]'>
            <table className='w-full font-kanit'>
                <thead className='border-gray-200 border-b-2 font-light'>
                    <tr>
                        <th className='font-normal border-[#e0dfdf] border-r-2 py-3 min-w-[13rem]'>ชื่อเรื่อง</th>
                        <th className='font-normal border-[#e0dfdf] border-r-2 py-3 w-[13rem] min-w-[13rem]'>ระดับชั้น</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={index} className={`${index%2 != 0? "bg-[#efefef]" : "bg-[#e8e8e8]"}`}>
                        <td className={`border-r-2 border-[#c7c7c7] py-3 px-5 cursor-pointer hover:bg-[#c7c7c7]`} onClick={() => {window.open(item.url, "_blank")}}>{item.name}</td>
                        <td className={`border-r-2 border-[#c7c7c7] py-3 px-5 cursor-pointer hover:bg-[#c7c7c7]`}>{item.grade_level}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}
