import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../utils/useAuthStore.jsx'

const SignupPage = () => {
 const { signup } = useAuthStore()
 
 const [Form, setForm] = useState({
    name:'',
     email: '',
     password: '',
     authUser:''
 })
 
 
 const validateForm = () => {
    if (!Form.name.trim()) return alert("email ID is required");
     if (!Form.email.trim()) return alert("email ID is required");
     if (!Form.password) return alert("Password is required");
 
     if (Form.password.length < 6) return alert("Password must be at least 6 characters");
     

     return true
 }
 
 
 const handleSignup = (e) => {
 
     e.preventDefault();
 
     const success = validateForm()
 
     if (success == true) {
         signup(Form)
         console.log(Form);
     }
 
 
 
 
 };
 
 
 
   return (
     <div className="w-full h-screen  content-center">
       <div className="justify-self-center p-5 border-2 border-blue-400 rounded-2xl">
         <form onSubmit={handleSignup} className="flex flex-col gap-5 text-gray-600" action="" method="post">
         <span>Singup Page</span>
           <div className="p-5 border-2 border-blue-400 rounded-2xl">
         
             <input type="text" 
             placeholder="Write your Name"
             value={Form.name}
             onChange={(e) => setForm({ ...Form, name: e.target.value })}
             />
           </div>
           <div className="p-5 border-2 border-blue-400 rounded-2xl">
          
             <input type="email" 
             placeholder="Write your Email"
             value={Form.email}
             onChange={(e) => setForm({ ...Form, email: e.target.value })}
             />
           </div>
           <div className="p-5 border-2 border-blue-400 rounded-2xl">
          
          <input type="password" 
          placeholder="Write your Password"
          value={Form.password}
          onChange={(e) => setForm({ ...Form, password: e.target.value })}
          />
        </div>
        <div className="p-5 border-2 border-blue-400 rounded-2xl">
          
          <input type="password" 
          placeholder="Write your Role"
          value={Form.authUser}
          onChange={(e) => setForm({ ...Form, authUser: e.target.value })}
          />
        </div>
           <button className="w-full p-5 border-2 bg-blue-400 text-white rounded-2xl" type="submit">Submit</button>

           <Link to='/login'>Login if already have account</Link>
        
         </form>
       </div>
     </div>
   );
}

export default SignupPage