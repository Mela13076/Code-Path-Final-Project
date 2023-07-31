import Navigation from "../componets/navBar"
import Logo from "../assets/yellow-logo.png"
import { Link } from "react-router-dom"

function Home(){

    return(
        <div className="home">
            {/* <Navigation /> */}
            <div className="content">
                <img src={Logo} alt="starwars logo" width="auto" height="260px"/>
                <h1>Welcome to Star Wars Universe</h1>
                <div className="instructions">
                    <h2>Instructions:</h2>
                    <h3>Select <Link to="/create"><i>Create Archive</i></Link> to create a new post about Star Wars Content</h3>
                    <h3>When creating a post make sure to enter a title, description, image url, and select a Topic!</h3>
                    <h3>Topics include: Movies, TV Series, Comics, Games, Products, Characters, and Other</h3>
                    <br />
                    <h3>Visit the <Link to="/gallery" ><i>Archive History</i></Link> to view all Post!</h3>
                </div>
                {/* <img className="characterImage" src={Characters} alt="fortnite Characters" width="95%" height="auto"/> */}
            </div>
        </div>
    )
}

export default Home