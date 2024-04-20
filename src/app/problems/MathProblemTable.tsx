"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { Checkbox } from '~/components/ui/checkbox';

type MathProblemType = {
    gs: number;
    id: number;
    name: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    url: string;
    solved: boolean;
    solved_user_count: number;
}[]

function SendAnswerSVG({id, pass, ...props} : {id: number, pass: boolean, [x:string]: any}) {
    const router = useRouter();

    return (
        <div {...props} onClick={() => {router.push("/problems/submit/" + id)}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill={pass ? "white" : "black"}><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"/></svg>
        </div>
    )
}

export default function MathProblemTable({data, signedin}: {data: MathProblemType, signedin: boolean}) {
    const [showSolve, setShowSolve] = React.useState(signedin)
    return (
        <>
        {
            signedin && 
            <div className='ml-7 md:ml-12 my-3 flex items-center gap-2'>
                <Checkbox defaultChecked={true} onCheckedChange={(e) => {setShowSolve(e as boolean)}} id="solved-checkbox"/>
                <label htmlFor="solved-checkbox" className='select-none cursor-pointer'>แสดงข้อที่ทำแล้ว</label>
            </div>
        }
        <div className='mx-5 md:mx-10 overflow-y-auto border-[1px] border-gray-200 shadow-md shadow-[#c5c5c5]'>
            <table className='w-full font-kanit'>
                <thead className='border-gray-200 border-b-2 font-light'>
                    <tr>
                        <th className='font-normal border-[#e0dfdf] border-r-2 py-3 min-w-[13rem]'>ชื่อโจทย์</th>
                        <th className='font-normal border-[#e0dfdf] border-r-2 py-3 w-[6rem] min-w-[6rem]'>ส่งคำตอบ</th>
                        <th className='font-normal border-[#e0dfdf] border-r-2 py-3 w-[5rem] min-w-[5rem]'>GS</th>
                        <th className='font-normal border-[#e0dfdf] border-r-2 py-3 w-[5rem] min-w-[5rem]'>สร้างเมื่อ</th>
                        <th className='font-normal w-[6.5rem] min-w-[6.5rem]'>แก้แล้ว &#40;คน&#41;</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={index} className={`${
                        item.solved && showSolve?
                            (index%2 != 0 ?"bg-[#1ea843] text-[#ffffff]" : "bg-[#1b9d3e] text-[#ffffff]") : 
                            (index%2 != 0 ? "bg-[#efefef]" : "bg-[#e8e8e8]")
                        }`}>
                        <td className={`border-r-2 border-[#c7c7c7] py-3 px-5 cursor-pointer ${
                            item.solved && showSolve ? 
                            "hover:bg-[#2a9451]" : 
                            "hover:bg-[#c7c7c7]" }`
                            } onClick={() => {window.open(item.url, "_blank")}}>{item.name}</td>
                        <td className='p-3 border-r-[1px] border-[#c7c7c7] flex justify-center'><SendAnswerSVG id={item.id} pass={item.solved && showSolve} className="w-5 p-[0.1rem] cursor-pointer"/></td>
                        <td className='p-3 border-r-[1px] border-[#c7c7c7] text-center'>{item.gs}</td>
                        <td className='p-3 border-r-[1px] border-[#c7c7c7] text-center'>{item.createdAt.getFullYear()}</td>
                        <td className='p-3 text-center'>{item.solved_user_count}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}
