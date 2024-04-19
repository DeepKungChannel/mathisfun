"use server"
import { z } from "zod"
import { getAllUserData } from "./getUser"
import getTextRank from "~/utils/rankTranslate"

const leaderboardDataShape = z.array(
    z.object({
        imageUrl: z.string().nullable(),
        username: z.string(),
        rank: z.string(),
        rankNum: z.number(),
        solved: z.number(),
        gs: z.number(),
    })
)

type LeaderboardDataType = z.infer<typeof leaderboardDataShape>

export default async function getLeaderboardData() {
    const alluserdata = await getAllUserData()

    const LeaderboardData = [] as LeaderboardDataType

    alluserdata.map(user => {
        LeaderboardData.push({
            imageUrl: user.imageUrl,
            username: user.username,
            rank: getTextRank(user.rank),
            rankNum: user.rank,
            solved: user.solved,
            gs: user.gs
        })
    })

    LeaderboardData.sort((a, b) => b.solved - a.solved)
    

    // check shape
    const result = leaderboardDataShape.safeParse(LeaderboardData)
    if (result.success) {
        return LeaderboardData
    }
    return []
}