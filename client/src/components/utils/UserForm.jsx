import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserForm = ({handleSave, error, pre_name=""}) => {
    const router = useNavigate()
    const [name, setName] = useState(pre_name)
  return (
    <div onSubmit={handleSave} className='cform-wrapper'>
            <input placeholder='Name' className='cform-input' required type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />
            {error ? <p style={{color: "red"}}>{error}</p> : null}
            <button className='cform-button save' onClick={() => handleSave(name)}>Save</button>
            <button className='cform-button cancel' onClick={() => router("/")}>Cancel</button>
        </div>
  )
}

export default UserForm