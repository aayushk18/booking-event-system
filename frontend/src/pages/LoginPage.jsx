import React, { useState } from "react";
import { useAuthStore } from "../utils/useAuthStore.jsx";
import { Link } from "react-router-dom";

const LoginPage = () => {

const { login } = useAuthStore()

const [Form, setForm] = useState({
    email: '',
    password: ''
})


const validateForm = () => {
    if (!Form.email.trim()) return alert("email ID is required");
    if (!Form.password) return alert("Password is required");

    if (Form.password.length < 6) return alert("Password must be at least 6 characters");

    return true
}


const handleLogin = (e) => {

    e.preventDefault();

    const success = validateForm()

    if (success == true) {
        login(Form)
        console.log(Form);
    }




};



  return (
    <div className="w-full h-screen  content-center">
      <div className="justify-self-center p-5 border-2 border-blue-400 rounded-2xl">

      
        <form onSubmit={handleLogin} className="flex flex-col gap-5 text-gray-600" action="" method="post">
        <span>Login Page</span>
          <div className="p-5 border-2 border-blue-400 rounded-2xl">
        
            <input type="email" 
            placeholder="Write your email"
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
          <button className="w-full p-5 border-2 bg-blue-400 text-white rounded-2xl" type="submit">Submit</button>
       
          <Link to='/signup'>Signup if dont have account</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
