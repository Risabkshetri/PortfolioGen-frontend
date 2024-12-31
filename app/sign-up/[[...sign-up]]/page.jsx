import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex flex-col justify-center items-center h-auto'>
            <SignUp />
        </div>
    )

}