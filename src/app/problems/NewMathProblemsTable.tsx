"use client"
import React from "react"
import { MathProblemType, Row, SendAnswerSVG } from "./MathProblemTable"
import { Checkbox } from "~/components/ui/checkbox"

export default function NewMathProblemsTable({data, signedin}: {data: MathProblemType, signedin: boolean}) {
    const [showSolve, setShowSolve] = React.useState(signedin)

    return (
        <>
        {
            data.length > 0 && <>
            <h3 className="ml-7 md:ml-10 text-xl font-kanit">โจทย์ใหม่</h3>
            <div className="ml-7 md:ml-10 my-3 flex items-end">
                {
                    signedin && 
                    <div className='flex items-center gap-2'>
                        <Checkbox defaultChecked={true} onCheckedChange={(e) => {setShowSolve(e as boolean)}} id="solved-checkbox2"/>
                        <label htmlFor="solved-checkbox2" className='select-none cursor-pointer'>แสดงข้อที่ทำแล้ว</label>
                    </div>
                }
            </div></>
        }
        {data.length > 0 &&
            <div className='mx-5 md:mx-10 overflow-y-auto border-[1px] border-gray-200 shadow-md shadow-[#c5c5c5] mb-14'>
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
                                <Row key={index} item={item} index={index} showSolve={showSolve} />
                            ))}
                    </tbody>
                </table>
            </div>
        }
        </>
    )
}

// function Row({item, index, showSolve}: {item: MathProblemType[0], index:number, showSolve: boolean}) {
//     return (
//         <tr key={index} className={`${item.solved && showSolve ?
//             (index % 2 != 0 ? "bg-[#1ea843] text-[#ffffff]" : "bg-[#1b9d3e] text-[#ffffff]") :
//             (index % 2 != 0 ? "bg-[#efefef]" : "bg-[#e8e8e8]")
//         }`}>
//             <td className={`border-r-2 border-[#c7c7c7] py-3 px-5 cursor-pointer ${item.solved && showSolve ?
//                     "hover:bg-[#2a9451]" :
//                     "hover:bg-[#c7c7c7]"}`
//             } onClick={() => { window.open(item.url, "_blank") }}>{item.name}</td>
//             <td className='p-3 border-r-[1px] border-[#c7c7c7] flex justify-center'><SendAnswerSVG id={item.id} pass={item.solved && showSolve} className="w-5 p-[0.1rem] cursor-pointer" /></td>
//             <td className='p-3 border-r-[1px] border-[#c7c7c7] text-center'>{item.gs}</td>
//             <td className='p-3 border-r-[1px] border-[#c7c7c7] text-center'>{item.createdAt.getFullYear()}</td>
//             <td className='p-3 text-center'>{item.solved_user_count}</td>
//         </tr>
//     )
// }