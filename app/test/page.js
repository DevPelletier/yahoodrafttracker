'use client'

import { useSearchParams } from 'next/navigation'

export default function Page() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    console.log(token)

    return (
    <main>
        <div>
            <h1>Hello, Dashboard Page!</h1>
        </div>
    </main>
    )
}