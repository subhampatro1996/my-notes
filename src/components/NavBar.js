import React from 'react'
import { Link,Route,withRouter } from 'react-router-dom'
import PrivateRoute from '../helpers/PrivateRoute'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Account from './Account'
import MyNotes from './MyNotes'
import '../navbar.css'

const NavBar = (props)=>{
    const { userLoggedIn,handleAuth } = props
    return(
        <div>
        <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <h1>User Auth</h1>
                    <ul className="navbar-nav ms-auto mb-lg-0">
                        <li className="nav-item nav-link px-3"><Link to="/">Home</Link></li>
                        {
                            userLoggedIn ? (
                            <React.Fragment>
                                <li className="nav-item nav-link px-3"><Link to="/account">Account</Link></li>
                                <li className="nav-item nav-link px-3"><Link to="/mynotes">My Notes</Link></li>
                        <li className="nav-item nav-link px-3"><Link to="/"onClick={()=>{
                            //once user logged out we need to remove the token from the local storage
                            localStorage.removeItem('token')
                            alert("successfully logged out")
                            handleAuth()
                            props.history.push('/')
                        }}>Logout</Link></li>
                        {/* 

                            <li><Link to="/" onClick={()=>{
                            //once user logged out we need to remove the token from the local storage
                            localStorage.removeItem('token')
                            alert("successfully logged out")
                            handleAuth()
                        }}>Logout</Link></li>
                        
                        */}
                    </React.Fragment>
                    ):(
                        <React.Fragment>
                            <li className="nav-item nav-link px-3"><Link to="/register">Register</Link></li>
                            <li className="nav-item nav-link px-3"><Link to="/login">Login</Link></li>
                            
                        </React.Fragment>
                    )
                }
            </ul>
            </nav>
            </div>
                <div>
                <Route path="/" component={Home} exact={true}></Route>
                </div>
                <Route path="/register" component={Register}></Route>
                {/* <Route path="/login" component={Login}></Route> */}
                {/* instead of component prop we have to mention render prop inside the Route componentto to pass handleAuth to the LogIn component */}
                {/* render props take one function as its value it basically a callback function and this is provided with the props that are specified all the props to this particular component basically provided here  
                than we need to return our Login component and we will spread all the props and we can also pass the additional properties called handleAuth for the login component*/}
                {/* if we donot specify these  {...props }  so the Login component has only access to handleAuth prop that has been passed  but the other properties which are added by react router dom like the history,location and match those are never passed below that is the reason we have to specify {...props} we have to spread the props which is received by render props callback function   */}
                <div className="container">
                <Route path="/login" render={(props)=>{ 
                    return <Login {...props}
                        handleAuth={handleAuth}
                    />
                }}></Route>
                </div>
                <Route path="/account" component={Account}></Route>
                {/* <PrivateRoute path="/account" component={Account}/> */}
                <Route path="/mynotes" component={MyNotes}></Route>


    </div>
    )
}

const WrappedComponent = withRouter(NavBar)


export default WrappedComponent