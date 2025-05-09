import { useNavigate } from "react-router";

export function ShareBrainTopBar({ username }: { username: string | undefined }) {
    const navigate = useNavigate()
    const handleHomeClick = () => {
        navigate('/dashboard')
    }
    const handleAccountClick = () => {
        navigate('/signup')
    }
    return (

        <div className="h-24 text-center text-2xl shadow flex items-center mb-2 p-8 justify-between">
            <div className="flex items-center gap-2 cursor-pointer " onClick={handleHomeClick} >
                <img src="/brain.svg" className="h-10"/> 
                Brainly
            </div>
            <div>
                You are watching brain of {username}

            </div>
            <button className="text-sm bg-blue-900 text-white p-4 rounded-sm cursor-pointer" onClick={handleAccountClick}> Create Accoount?</button>

        </div>
    )
}