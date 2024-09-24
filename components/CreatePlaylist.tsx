"use client"

import { useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { server } from "@/lib/axios"
import { useToast } from "@/hooks/use-toast"
import { Label } from "./ui/label"
type FormType = {title : string}
export function CreatePlaylist(){
    const {toast} = useToast()
    const {register,reset,handleSubmit,formState : {errors,isSubmitting}} = useForm<FormType>()
    async function onSubmit(data : FormType ){
        try {
            await server.post('/api/playlist',data)
            toast({title : "created"})
            reset()
        } catch (error) {
            toast({title : "something  went wrong",variant : "destructive"})
        }
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <Label htmlFor="inputfield">Create new playlist</Label>
            <Input id="inputfield" type="text" {...register("title",{required : "Name can't be empty"})} placeholder="playlist name" disabled = {isSubmitting} />
            <Button type="submit" disabled = {isSubmitting} >create</Button>
        </form>
    )
}