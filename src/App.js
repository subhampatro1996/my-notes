import React,{ useState,useEffect } from "react";
import NavBar from "./components/NavBar";

function App() {
  const [ userLoggedIn,setUserLoggedin ] = useState(false)
  //how do we update state in the app component from the login component
  const handleAuth = ()=>{
      setUserLoggedin(!userLoggedIn)
  }

  //using useEffect hook for  when ever the components get loaded we would want to check wheather there is some value in the local storage if that token is present in localstorage if its present
  // we will set the userLoggedIn to be true or  else we will set userLoggedIn to be false
  useEffect(()=>{
    if(localStorage.getItem('token')){
      handleAuth()
    }else{
      
    }
  },[])
  return (
    <div>
        {/* the handleAuth function need to pass down below to login component the way we have to do is we have to pass it to the navbar component via props bcoz the login component is with in the navbar component if we have traditionally login component has been shown than we can directly pass the handleAuth function to the login component  but here the login component is renders by Route component of react-router-dom so how do we pass the handleAuth to login component 

        1- pass hanldeAuth to NavBar component via props 
        2- destructure the handleAuth inside NavBar component
        3- there is another prop called as render prop which need to be used to pass handleAuth to the login component
        4- rnder prop we have to use for Route component 
        
        */}
        <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth}/>
    </div>
  )
}

export default App;
