"use server"
import { clerkClient, User } from "@clerk/nextjs/server";
import { count, sql } from "drizzle-orm";
import { db } from "~/server/db";
import { solved_math_problem, users } from "~/server/db/schema";

export default async function getUserData(userId: string | null) {
    if (!userId) return null

    const Clerk_user = await getClerkUser(userId)
    if (!Clerk_user) return null
    // Check if user exists in personal db
    let user = await db.query.users.findFirst({
        where: (u, { eq }) => eq(u.userId, userId)
    })

    if (!user) {
        // Create user data in personal db
        const username = Clerk_user.fullName ?? Clerk_user.username
        const solved = await getUserSolveNumber(userId)
        const user_init_data = {
            imageUrl: Clerk_user.imageUrl,
            userId: userId,
            username: username!,
            point: 0,
            rank: 0,
            solved: solved,
            gs: 100
        }
        await db.insert(users).values(user_init_data);
        user = await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.userId, userId)
        })
    }

    return user
}

export async function getClerkUser(userId: string | null) {
    if (!userId) return null
    let Clerk_user: User | null = null
    try {
        Clerk_user = await clerkClient.users.getUser(userId)
    }
    catch (err: any) {
        if (!err.clerkError) throw err
    }
    if (!Clerk_user) return null
    return Clerk_user
}

export async function getUserSolveNumber(userId:  string) {
    const solved = await db.select({count: count()}).from(solved_math_problem).where(sql`${solved_math_problem.userId} = ${userId}`)
    return solved[0]!.count
}

export async function getAllUserData() {
    return await db.query.users.findMany()
}