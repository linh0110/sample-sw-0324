import { useContext, useState } from "react"
import { AccountAdmin, AuthContext } from "../contexts/AuthContext"

export const LayoutApp = ({ children }) => {
    const { signOut } = useContext(AuthContext)
    const [show, setShow] = useState(false)
    const [value, setValue] = useState({
        old: '',
        new: ''
    })
    const handleChangePassword = (e) => {
        e.preventDefault()
        if (value.old === AccountAdmin.password) {
            alert('Change password successfully')
            AccountAdmin.password = value.new
            setShow(false)
            signOut()
        } else {
            alert('Old password is incorrect')
        }
    }
    return <div>
        <div>Logo</div>
        <div>Menu</div>
        <div>{children}</div>
        <button onClick={signOut}>Logout</button>
        <div>
            <button onClick={() => setShow(!show)}>Change Password</button>
            {show && <form onSubmit={handleChangePassword}>
                Old <input value={value.old} onChange={e => setValue(prev => ({ ...prev, old: e.target.value }))} />
                New <input value={value.new} onChange={e => setValue(prev => ({ ...prev, new: e.target.value }))} />
                <button>Submit</button>
            </form>}
        </div>
    </div>
}