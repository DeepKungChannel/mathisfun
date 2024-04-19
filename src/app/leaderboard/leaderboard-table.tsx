import React from 'react'

export default function LeaderboardTable({} : {}) {
  
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
        <tr>
          <td className="text-center border-r-[1px] border-gray-200">1.</td>
          <td className="px-3 border-r-[1px] border-gray-200">Siravid Thongsook</td>
          <td className="px-3 border-r-[1px] border-gray-200">Bronze I</td>
          <td className="text-center border-r-[1px] border-gray-200">1</td>
          <td className="text-center">100</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}
