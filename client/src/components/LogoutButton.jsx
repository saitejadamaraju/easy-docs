import {SignedIn, UserButton} from '@clerk/clerk-react'

const LogoutButton = () => {

    return (    
      <SignedIn>
            <UserButton/>
      </SignedIn>
    )

}

export default LogoutButton;