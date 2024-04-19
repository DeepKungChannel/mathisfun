import { auth, clerkClient, User } from '@clerk/nextjs/server'
import React from 'react'
import LeaderboardTable from './leaderboard-table'
import getUserData, { getClerkUser } from '~/server/api/getUser'

export default async function LeaderboardPage() {
    const user = auth()

    let clerkuser = await getClerkUser(user.userId)
    const userdata = await getUserData(user.userId)

    return (
        <div className='px-5 pt-20 font-kanit'>
            {userdata && ( // if userdata is valid which mean clerkuser have to valid because to get userdata we need clerkuser
                <>
                <h1 className='text-2xl font-normal font-kanit mb-1 mt-2'>Your profile</h1>
                <div className='ml-5 flex flex-col gap-3'>
                    <div className="flex gap-4 items-center mt-3">
                        <img src={clerkuser ? clerkuser.imageUrl : ""} className='w-[3rem] h-[3rem] rounded-[50%]'/>
                        <h3 className='text-xl font-normal font-kanit'>{clerkuser ? clerkuser.fullName : ""}</h3>
                    </div>

                    <div>
                        <p className='text-lg font-light'>Rank: <span>{userdata.rank}</span></p>
                        <p className="text-lg font-light">Point: {userdata.point}</p>
                        <p className="text-lg font-light">Solved: {userdata.solved}</p>
                        <p className="text-lg font-light">GS: {userdata.gs}</p>
                    </div>

                </div>
                <hr className='mt-5'/>
                </>
            )}

            {/* Leader board section */}
            <h1 className='text-2xl font-normal font-kanit mt-3 mb-3'>Leaderboard</h1>
            <LeaderboardTable/> 
        </div>
    )
}
