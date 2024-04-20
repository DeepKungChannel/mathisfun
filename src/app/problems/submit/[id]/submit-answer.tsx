"use client"

import React, { useRef, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'


export default function SubmitAnswer ({id, pass}: {id: number, pass:boolean}) {
    const [checking, setChecking] = useState(false);
    const [pass2, setPass] = useState(false);

    const [pointReceive, setPointReceive] = useState<number>(0)

    const router = useRouter()

    const InputTag = useRef<HTMLInputElement| null>(null)

    async function CheckAnswer(answer: string) {
        if (checking) {
            return;
        }
        if (pass) return;

        setChecking(true)
        toast.loading("กําลังตรวจสอบคำตอบของคุณ...", {id: "checking-answer"})
        try {

            const {result: correct, point} = await fetch("/api/submit", {method: "post", body: JSON.stringify({id, answer})}).then(res => res.json())
            if (point) setPointReceive(point)
        
            toast.dismiss("checking-answer")
            if(correct) {
                toast.success("ยินดีด้วยคุณผ่านแล้วว เย้!!")
                setPass(true)
                router.refresh()
            }
            else toast.error("ไม่น้า คำตอบของคุณผิด T-T")
        }
        catch(e) {
            toast.dismiss("checking-answer")
            toast.error("ระบบผิดพลาด")
            setChecking(false)
            throw e
        }
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

                