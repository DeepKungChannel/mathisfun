"use client"

import React, { useRef, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import submittingAnswer from '~/server/api/submitting-answer'
import { toast } from "sonner"


export default function SubmitAnswer ({id}: {id: number}) {
    const [checking, setChecking] = useState(false);
    const [passed, setPassed] = useState<number | undefined>(undefined);

    const InputTag = useRef<HTMLInputElement| null>(null)

    async function CheckAnswer(answer: string) {
        if (checking) {
            return;
        }

        setChecking(true)
        const {result} = await submittingAnswer(id, answer)
        if (result) toast.success("ยินดีด้วยคุณผ่านแล้วว เย้!!")
        else toast.error("ไม่น้า คำตอบของคุณผิด T-T")
        setChecking(false)
    }

    return (
        <>
        <form onSubmit={(e) => { CheckAnswer(InputTag.current!.value); e.preventDefault()}}>
            <Label htmlFor="answer" className='text-[1.06rem] pl-1'>คำตอบ</Label>
            <Input ref={InputTag} type='text' placeholder='xx.xx' id="answer" className='mt-1 mb-5 focus-visible:ring-0 focus: ring-0' />
            <Button type='submit'>ส่งคำตอบ</Button>
        </form>
        </>
    )
}

                