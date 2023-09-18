'use client'

import { useSearchParams } from 'next/navigation'

export default function Page() {
    const searchParams = useSearchParams()
    const access_code = searchParams.get('code')
    console.log(access_code)

    return (
    <main>
        <div>
            <h1>Hello, Dashboard Page!</h1>
        </div>
    </main>
    )
}