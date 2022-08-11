import React,{useState} from 'react'
import axios from 'axios'
import '../register.css'
import swal from 'sweetalert';

const Register = (props)=>{
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [formError,setFormError] = useState({})
    const errors = {}
    const handleSubmit = (e)=>{
        e.preventDefault()
        runValidator()
        if(Object.keys(errors).length === 0){
            setFormError({})
            const formData = {
                username:username,
                email:email,
                password:password
            }
            //if validation pass 
            //axios internally callls json.stringify method and transfer our js object to json string 
            //in the backend or in post man when we are testing backend api http protocl is not mandatory but in front end in react app we have to mention the protocol http://
            axios.post("http://dct-user-auth.herokuapp.com/users/register",formData)
                .then((response)=>{
                    const result = response.data
                    if(result.hasOwnProperty('errors')){
                        alert(result.message)
                    }else{
                        alert('successfully created an account')
                        props.history.push('/login')
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
        }else{
            setFormError(errors)
        }
        
    }
    const runValidator= ()=>{
        if(username.trim().length === 0 ){
            errors.username = "username can't be blank"
        }
    }

    const handleChange = (e)=>{
        if(e.target.name === 'username'){
            setUserName(e.target.value)
        }else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }
    return(
        <div className="container">
            <div className="center-box">
            <h1>Register with us</h1>
            <form className="form-horizontal"onSubmit={handleSubmit}>
                <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="username">Username</label>
                <div className="col-sm-10">
                <input 
                type="text" 
                placeholder="enter username" 
                id="username"
                className="form-control"
                value={username} onChange={handleChange} name="username">
                </input><br/>
                {
                    formError.username && <p style={{color:"red"}}>{formError.username}</p>
                }
                 </div>
                 </div>

                <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Email</label>
                <div className="col-sm-10">

                <input 
                type="text" 
                placeholder="enter email" 
                id="email"
                className="form-control"
                value={email} onChange={handleChange} name="email">
                </input><br/>
                </div>
                </div>

                <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
                <div className="col-sm-10">
                <input 
                type="password"
                placeholder="enter password" 
                className="form-control"
                id="pwd"
                value={password} onChange={handleChange} name="password">
                </input><br/>
                </div>
                </div>

                <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                <input type="submit" className="btn btn-default" value="Register"></input>
                </div>
                </div>

            </form>
          </div>
        </div>
    )
}
export default Register

{/* <div className="container">
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
        </div> */}