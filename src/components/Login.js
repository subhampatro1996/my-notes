import React,{useState} from 'react'
import axios from 'axios'
import '../login.css'

const Login = (props)=>{
    // const { handleAuth } = props
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        //do client side validation by your own 
        const formData = {
            email:email,
            password:password
        }

        //if validation pass
        axios.post("http://dct-user-auth.herokuapp.com/users/login",formData)
            .then((response)=>{
                const result = response.data
                console.log(result)
                // if(result.hasOwnProperty('errors')){
                //     alert(result.message)
                // }
                //same as Object.keys(result).includes('errors)
                if(Object.keys(result).includes('errors')){
                    alert(result.errors)
                }else{
                    alert("successfully logged in")
                    //after successfully logged in we have to write that token info inside our local storage
                    localStorage.setItem("token",result.token)
                    props.history.push('/')
                    props.handleAuth() 
                    //or this handleAuth() after destructuring 
                    // handleAuth()
                }
            })
            .catch((error)=>{
                console.log(error.message)
            })
    }

    const handleChange = (e)=>{
        if(e.target.name === "email"){
            setEmail(e.target.value)
        }else if(e.target.name === "password"){
            setPassword(e.target.value)
        }
    }

    return(
        <div className="container">
            <div className="center-box">
            <form className="form-horizontal"onSubmit={handleSubmit}>
                <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                <div className="col-sm-10">
                <input 
                type="text" 
                placeholder="enter email" 
                value={email}
                onChange={handleChange}
                name="email" 
                className="form-control"
                id="email">
                
                </input><br/>
                </div>
                </div>

                <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
                <div className="col-sm-10">
                <input 
                type="password"
                placeholder="enter password"
                value={password}
                onChange={handleChange}
                name="password"
                className="form-control"
                id="pwd">

                </input><br/>
                </div>

                </div>
                <input type="submit" value="Login"></input>
                
            </form>
            </div>
        </div>
    )
}
export default Login