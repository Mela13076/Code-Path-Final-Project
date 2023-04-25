
import Navigation from "../componets/navBar";
import { supabase } from "../client";

function Create(){
    
        const createPost = async (e) => {
            e.preventDefault();
            
            //Get the values from from the form
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const image_url = document.getElementById('image_url').value;
            // const topic = document.getElementById('topic').value;
            const topic = document.querySelector('input[name="topic"]:checked').value;

            const pin = document.getElementById('pin').value;
        
    
            //Create a new post
            const post = {
                title: title,
                description: description,
                image_url: image_url,
                topic: topic,
                pin: pin
            }
    
    
            await supabase
            .from('stars')
            .insert(post)
            .select();
    
    
            //Redirect to the home page
            window.location = '/gallery';
            
    
        }


    return(
        <div className="create">
            <Navigation />
            <div className="create-content">
                {/* <img src={Logo} alt="fortnite logo" width="auto" height="260px"/> */}
                <h2>Create an Archive Post</h2>
                {/* <img className="characterImage" src={Characters} alt="fortnite Characters" width="95%" height="auto"/> */}
                <form onSubmit={createPost}>
                    <div className="mini-container">
                        <label>Title:</label>
                        <input type="text" placeholder="enter title for post" id="title" required/>
                    </div>

                    <div className="mini-container">
                        <label>Description:</label>
                        {/* <input type="text" placeholder="enter a description" id="description" required/>
                         */}
                         <textarea placeholder="enter a description" id="description"  width="80%" required/>
  
                    </div>

                    <div className="mini-container">
                        <label>Image URL:</label>
                        <input type="text" placeholder="enter an image url link" id="image_url" required/>
                    </div>
                    
                    <div className="mini-container">
                        <label>Topic:</label>
                        <label>
                            <input type="radio" name="topic" id="movie" value="movie" required/>
                            <span className="topic"></span>
                            Movies
                        </label>
                        <label>
                            <input type="radio" name="topic" id="show" value="show" required/>
                            <span className="topic"></span>
                            TV Series
                        </label>
                        <label>
                            <input type="radio" name="topic" id="comic" value="comic" required/>
                            <span className="topic"></span>
                            Comics
                        </label>
                        <label>
                            <input type="radio" name="topic" id="game" value="game" required/>
                            <span className="topic"></span>
                            Games
                        </label>
                        <label>
                            <input type="radio" name="topic" id="character" value="character" required/>
                            <span className="topic"></span>
                            Characters
                        </label>
                        <label>
                            <input type="radio" name="topic" id="product" value="product" required/>
                            <span className="topic"></span>
                            Products
                        </label>
                        <label>
                            <input type="radio" name="topic" id="other" value="other" required/>
                            <span className="topic"></span>
                            Other
                        </label>
                        
                    </div>
                    <div className="mini-container">
                        <label>Pin:</label>
                        <input type="text" placeholder="enter and save a pin! This will allow you to edit your post" id="pin" required/>
                    </div>
                    <button className="createBtn" type="submit">Create Archive</button>
                </form>
            </div>
        
        </div>
    )
}

export default Create