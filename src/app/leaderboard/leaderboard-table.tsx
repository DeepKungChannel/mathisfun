import React from 'react'
import getLeaderboardData from '~/server/api/getLeaderboardData'

export default async function LeaderboardTable() {

  const leaderboard_data = await getLeaderboardData()
  
  return (
    <div className='px-5'>
    <table className='w-full'>
      <thead className='font-montserrat border-b-[1px] border-gray-200'>
        <tr className='font-light'>
          <th className='font-[500] border-r-[1px] border-gray-200'>No.</th>
          <th className='font-[500] border-r-[1px] border-gray-200'>Username</th>
          <th className='font-[500] border-r-[1px] border-gray-200'>Rank</th>
          <th className='font-[500] border-r-[1px] border-gray-200'>Solved</th>
          <th className='font-[500]'>GS</th>
        </tr>
      </thead>
      <tbody className='w-full font-kanit font-[300]'>
        {leaderboard_data.map((item, index) => (
          <tr key={index}>
            <td className="text-center border-r-[1px] border-gray-200">{index+1}.</td>
            <td className="px-3 py-2 border-r-[1px] border-gray-200">
              <div className="flex items-center gap-3">
                {item.imageUrl && (<img src={item.imageUrl} className="w-[1.5rem] h-[1.5rem] rounded-[50%]"></img>)}
              <p>{item.username}</p>
              </div> 
            </td>
            <td className="px-3 border-r-[1px] border-gray-200">{item.rank}</td>
            <td className="text-center border-r-[1px] border-gray-200">{item.solved}</td>
            <td className="text-center">{item.gs}</td>
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
