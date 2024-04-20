import { auth } from '@clerk/nextjs/server'
import React from 'react'
import LeaderboardTable from './leaderboard-table'
import getUserData, { getClerkUser } from '~/server/action/getUser'
import getTextRank from '~/utils/rankTranslate'
import getLeaderboardData from '~/server/action/getLeaderboardData'
import { db } from '~/server/db'
import { users } from '~/server/db/schema'
import { eq } from 'drizzle-orm'

export default async function LeaderboardPage() {

    let clerkuser = await getClerkUser()
    const userdata = await getUserData()

    // update user imageUrl if it doesn't match
    if (clerkuser?.imageUrl !== userdata?.imageUrl && userdata) {
        const imageUrl = clerkuser?.imageUrl ? clerkuser.imageUrl : undefined
        await db.update(users).set({imageUrl}).where(eq(users.userId, userdata.userId))
        console.log(`Update user imageUrl to ${userdata.userId}`)
    }

    const leaderboard_data = await getLeaderboardData()

    return (
        <div className='px-5 md:px-7 pt-20 font-kanit'>
            {userdata && ( // if userdata is valid which mean clerkuser have to valid because to get userdata we need clerkuser
                <>
                <h1 className='text-2xl font-normal font-kanit mb-1 mt-2'>Your profile</h1>
                <div className='ml-5 flex flex-col gap-3'>
                    <div className="flex gap-4 items-center mt-3">
                        <img src={clerkuser ? clerkuser.imageUrl : ""} className='w-[3rem] h-[3rem] rounded-[50%]'/>
                        <h3 className='text-xl font-normal font-kanit'>{clerkuser ? clerkuser.fullName : ""}</h3>
                    </div>

                    <div>
                        <p className='text-lg font-light'>Rank: <span>{getTextRank(userdata.rank)}</span></p>
                        <p className="text-lg font-light">Point: {userdata.point}</p>
                        <p className="text-lg font-light">Solved: {userdata.solved}</p>
                    </div>

                </div>
                <hr className='mt-5'/>
                <div className='select-none h-2'>&nbsp;</div>
                </>
            )}

            {/* Leader board section */}
            <h1 className='text-2xl font-normal font-kanit mt-3 mb-3'>Leaderboard</h1>
            <LeaderboardTable leaderboard_data={leaderboard_data}/> 
        </div>
    )
}
