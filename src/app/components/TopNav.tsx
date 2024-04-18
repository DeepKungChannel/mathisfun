"use client"
import Link from 'next/link'
import React, { useState } from 'react'

export default function TopNav() {
    const [show, setShow] = useState(false)

    return (
        <div className="fixed h-14 md:h-16 w-full bg-gray-800 text-white flex items-center">
            <div className="md:hidden">
                <svg className="w-5 h-6 ml-4 cursor-pointer" onClick={() => { setShow((val) => !val) }} fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
            </div>
            <div className={`${!show ? "opacity-0 invisible" : "opacity-100 visible"} text-lg md:text-base
            md:opacity-100 md:visible absolute top-14 left-0 right-0 md:top-0 bg-gray-800 
            text-center space-y-7 md:space-y-0 py-5 md:py-0 md:bg-none md:static 
            md:flex items-center gap-6 h-full md:text-gray-300
            `}>
                <div><Link href='/' className="md:ml-5" onClick={() => setShow(false)}>Home</Link></div>
                <div><Link href='/problems' onClick={() => setShow(false)}>Problem</Link></div>
                <div><Link href='/' onClick={() => setShow(false)}>Leaderboard</Link></div>
                <div><Link href='/' onClick={() => setShow(false)}>Contest</Link></div>
            </div>
        </div>
  )
}
