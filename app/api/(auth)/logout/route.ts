import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
export async function GET(){
    await cookies().delete("access-token")
    return redirect('/join')
}