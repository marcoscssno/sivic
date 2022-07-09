import React from 'react'
import { useRouter } from 'next/router'

export default function EditarVideoconferenciaPage() {
    const router = useRouter()
    const { id } = router.query
    return (
        <p>{id}</p>
    )
}