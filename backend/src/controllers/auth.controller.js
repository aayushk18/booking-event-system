import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/jsonwebtoken.js";



export const login = async (req, res) => {


    if (!req.body) {

        return res.status(200).json({ message: "Sorry: Not found" });
    }

    const { email, password } = req.body;

  

    try {

     
        const user = await User.findOne({ email })


    if (user) {

         


            const IsPassCorrect = await bcrypt.compare(password, user.password)

            if (user && IsPassCorrect ) {

                generateToken(user._id, res)

                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    authUser: user.authUser
                })
            } else return res.status(400).json({ message: "Invalid staff loginID or Password !!" })
          console.log("Login Successfully");
        } else return res.status(400).json({ message: "Invalid email or Password !!" })
      
    } catch (error) {
        console.log("error in Login controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }


}


export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)

 


    } catch (error) {
        console.log("error in check Auth controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged Out Successfully!!" })
        console.log("Logged Out Successfully!!")
    } catch (error) {
        console.log("Error in Logout Controller", error.message)
        res.status(500).json({ message: "Internal server error" })

    }
}


export const signup = async (req, res) => {

 

    const { name, email, password, authUser } = req.body;
    if (!name || !email || !password || !authUser) {
        return res.status(400).json({ message: "All fields are required" });
    }


 

    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ message: "Email already exist" });

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            authUser
        })
        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();


            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                authUser: newUser.authUser

            })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ message: "Internal server Error" })

    }
}

