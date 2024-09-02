"use client"
import { useRouter } from 'next/navigation'
import { Input } from "./input"
import { useState } from 'react'

export function SearchBox(){
    const router = useRouter()
    const [searchPhrase,setSearchPhrase] = useState("")
    return (
        <Input placeholder="search" className="hidden sm:block" value={searchPhrase} onChange={e=>{setSearchPhrase(e.target.value)}} onKeyDown={(e)=>{
            if(e.key==='Enter'){
                console.log('prseed')
                if(searchPhrase) router.push(`/search?q=${searchPhrase}`)
            }
        }} />
    )
}