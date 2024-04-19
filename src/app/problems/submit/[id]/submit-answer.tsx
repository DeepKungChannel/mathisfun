"use client"

import React, { useRef, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import submittingAnswer from '~/server/api/submitting-answer'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'


export default function SubmitAnswer ({id, pass}: {id: number, pass:boolean}) {
    const [checking, setChecking] = useState(false);
    const [pass2, setPass] = useState(false);
    const router = useRouter()

    const InputTag = useRef<HTMLInputElement| null>(null)

    async function CheckAnswer(answer: string) {
        if (checking) {
            return;
        }
        if (pass) return;

        setChecking(true)
        toast.loading("กําลังตรวจสอบคำตอบของคุณ...", {id: "checking-answer"})
        console.log("work1")
        const {result: correct} =  await submittingAnswer(id, answer)
        console.log("work2")
        toast.dismiss("checking-answer")
        if(correct) {
            toast.success("ยินดีด้วยคุณผ่านแล้วว เย้!!")
            setPass(true)
            router.refresh()
        }
        else toast.error("ไม่น้า คำตอบของคุณผิด T-T")
        
        setChecking(false)
    }

    return (
        <>
        <form onSubmit={(e) => { CheckAnswer(InputTag.current!.value); e.preventDefault()}}>
            <Label htmlFor="answer" className='text-[1.06rem] pl-1'>คำตอบ</Label>
            <Input disabled={pass2 || pass} ref={InputTag} type='text' placeholder='xx.xx' id="answer" className='mt-1 mb-5 focus-visible:ring-0 focus: ring-0' />
            <Button type='submit' disabled={pass2 || pass}>ส่งคำตอบ</Button>
        </form>
        </>
    )
}

                