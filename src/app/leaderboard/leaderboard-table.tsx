"use client"
import React, { useEffect, useRef, useState } from 'react'
import { LeaderboardDataType } from '~/server/action/getLeaderboardData'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

export default function LeaderboardTable({ leaderboard_data }: { leaderboard_data: LeaderboardDataType }) {
    const [leaderboardData, setLeaderboardData] = useState(leaderboard_data)
    function sortLeaderboard_data(method: string) {
        if (method == "solved") {
            const data = Array.from(leaderboard_data)
            data.sort((a, b) => b.solved - a.solved)
            setLeaderboardData(data)
            console.log("sort solved")
        } else if (method == "point") {
            const data = Array.from(leaderboard_data)
            data.sort((a, b) => b.point - a.point)
            setLeaderboardData(data)
            console.log("sort point")
        }
    }

    return (
        <div className='mx-2 md:mx-5 overflow-y-auto'>
            <div className='flex flex-col items-start mr-5 w-full mb-4'>
                <div className='flex flex-col gap-1'>
                    <h3 className='ml-1'>Sort by</h3>
                    <Select defaultValue='solved' onValueChange={(e)=>sortLeaderboard_data(e)}>
                        <SelectTrigger className="w-[7rem] font-light">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="solved">Solved</SelectItem>
                            <SelectItem value="point">Point</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>


            <table className='w-full'>
                <thead className='font-montserrat border-b-[1px] border-gray-200'>
                    <tr className='font-light'>
                        <th className='font-[500] border-r-[1px] border-gray-200 px-3'>No.</th>
                        <th className='font-[500] border-r-[1px] border-gray-200 min-w-[10rem] px-5 pb-2'>Username</th>
                        <th className='font-[500] border-r-[1px] border-gray-200 px-5'>Rank</th>
                        <th className='font-[500] border-r-[1px] border-gray-200 px-5'>Solved</th>
                        <th className='font-[500] px-5'>Point</th>
                    </tr>
                </thead>
                <tbody className='w-full font-kanit font-[300]'>
                    {leaderboardData.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center border-r-[1px] border-gray-200">{index + 1}.</td>
                            <td className="px-3 py-2 border-r-[1px] border-gray-200">
                                <div className="flex items-center gap-3 min-w-fit">
                                    {item.imageUrl && (<img src={item.imageUrl} className="w-[1.5rem] h-[1.5rem] rounded-[50%]"></img>)}
                                    <p>{item.username}</p>
                                </div>
                            </td>
                            <td className="px-3 border-r-[1px] border-gray-200">{item.rank}</td>
                            <td className="text-center border-r-[1px] border-gray-200">{item.solved}</td>
                            <td className="text-center">{item.point}</td>
                        </tr>
                    ))}
                    {/* <tr>
          <td className="text-center border-r-[1px] border-gray-200">1.</td>
          <td className="px-3 border-r-[1px] border-gray-200">Siravid Thongsook</td>
          <td className="px-3 border-r-[1px] border-gray-200">Bronze I</td>
          <td className="text-center border-r-[1px] border-gray-200">1</td>
          <td className="text-center">100</td>
        </tr> */}
                </tbody>
            </table>
        </div>
    )
}
