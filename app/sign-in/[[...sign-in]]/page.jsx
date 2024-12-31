import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return(
        <div className='flex flex-row justify-center items-center h-1/2'>
        <SignIn />
    </div>
    )
   


}