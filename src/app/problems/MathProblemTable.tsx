"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

type MathProblemType = {
    gs: number;
    id: number;
    name: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    url: string;
}[]

function SendAnswerSVG({id, ...props} : {id: number, [x:string]: any}) {
    const router = useRouter();

    return (
        <div {...props} onClick={() => {router.push("/problems/submit/" + id)}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"/></svg>
        </div>
    )
}

export default function MathProblemTable({data}: {data: MathProblemType}) {
    const router = useRouter();

    return (
        <div className='mx-5 md:mx-10 overflow-y-auto border-[1px] border-gray-200 shadow-md shadow-[#c5c5c5]'>
            <table className='w-full font-kanit'>
                <thead className='border-gray-200 border-b-2 font-light'>
                    <tr>
                        <th className='font-normal border-[#e0dfdf] border-r-2 py-3 min-w-[13rem]'>ชื่อโจทย์</th>
                        <th className='font-normal border-[#e0dfdf] border-r-2 py-3 w-[7rem] min-w-[7rem]'>ส่งคำตอบ</th>
                        <th className='font-normal border-[#e0dfdf] border-r-2 py-3 w-[5rem] min-w-[5rem]'>GS</th>
                        <th className='font-normal w-[6rem] min-w-[6rem]'>สร้างเมื่อ</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className={`${index%2 != 0 ? "bg-[#efefef]" : "bg-[#e8e8e8]"}`}>
                            <td className='border-r-2 border-[#c7c7c7] py-3 px-5 cursor-pointer hover:bg-[#c7c7c7]' onClick={() => {window.open(item.url, "_blank")}}>{item.name}</td>
                            <td className='p-3 border-r-[1px] border-[#c7c7c7] flex justify-center'><SendAnswerSVG id={item.id} className="w-5 p-[0.1rem] cursor-pointer"/></td>
                            <td className='p-3 border-r-[1px] border-[#c7c7c7] text-center'>{item.gs}</td>
                            <td className='p-3 text-center'>{item.createdAt.getFullYear()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}
