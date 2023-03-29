import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { ChangePassword } from "../components/ChangePassword/ChangePassword"

export const LayoutApp = ({ children }) => {
    const { signOut } = useContext(AuthContext)

    return <div>
        <div>Logo</div>
        <div>Menu</div>
        <div>{children}</div>
        <button onClick={signOut}>Logout</button>
        <ChangePassword />
    </div>
}