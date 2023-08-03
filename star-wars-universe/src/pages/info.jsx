// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { supabase } from '../client';
// import Navigation from '../componets/navBar';
// import { Link } from 'react-router-dom';

// function Info(){

//     //get the id from the url
//     const { id } = useParams();

//     //set up state variables
//     const [post, setPost] = useState(null);
//     const [pin, setPin] = useState('');
//     const [errorMsg, setErrorMsg] = useState('');
//     const navigate = useNavigate();

//     //fetch the character from the database
//     useEffect(() => {
//         const getPost = async () => {
//             const { data } = await supabase
//                 .from('stars')
//                 .select()
//                 .eq('id', id);

//             if (data.length > 0) {
//                 setPost(data[0]);
//             }
//         };
//         getPost().catch(console.error);
//     }, [id]);

//     const handleUpvote = async (postId, currentUpvotes) => {
//         // increment the upvotes by 1
//         const newUpvotes = currentUpvotes + 1;

//         // update the post in the database
//         const { error } = await supabase
//             .from('stars')
//             .update({ up_votes: newUpvotes })
//             .eq('id', postId);

//         if (error) {
//             console.log('Error updating post:', error);
//         } else {
//             // update the post state with the new upvotes
//             setPost({ ...post, up_votes: newUpvotes });
//         }
//     };

//     const handleEditClick = async (event) => {
//         event.preventDefault();
//         const enteredPin = parseInt(pin);

//         if (isNaN(enteredPin)) {
//             setErrorMsg('Please enter a valid PIN.');
//             return;
//         }

//         if (post.pin !== enteredPin) {
//             setErrorMsg('Incorrect PIN. Cannot edit.');
//             return;
//         }

//         navigate(`/edit/${post.id}`);
//     };

//     if (!post) {
//         return <h1>Loading...</h1>;
//     }

//     return(
//         <div className="info">
//            <Navigation />
//            <h1 className='namePage'>Archive Page</h1>
//            <div className="contentInfo">
//                 <h2>{post.title}</h2>
//                 <p>Description: {post.description}</p>
//                 <p>Topic: {post.topic}</p>
//                 <button className='starsBtn' onClick={() => handleUpvote(post.id, post.up_votes)}>⭐️ {post.up_votes}</button>
//                 <br />
//                 <form onSubmit={handleEditClick}>
//                     <input
//                         type="number"
//                         placeholder="Enter PIN when created"
//                         value={pin}
//                         onChange={(event) => setPin(event.target.value)}
//                     />
//                     <button className="editBtn" type='submit'>
//                         Edit
//                     </button>
//                 </form>
//                 {errorMsg && <p className="errorMsg">{errorMsg}</p>}
//            </div>
//            <div className='comments'>
//                 <p>comments come here</p>
//            </div>
//         </div>
//     )
// }

// export default Info;






/*************** This Code Works ***************** */






// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { supabase } from '../client';
// import Navigation from '../componets/navBar';
// import { Link } from 'react-router-dom';

// function Info(){

//     //get the id from the url
//     const { id } = useParams();

//     //set up state variables
//     const [post, setPost] = useState(null);
//     const [pin, setPin] = useState('');
//     const [errorMsg, setErrorMsg] = useState('');
//     const [comment, setComment] = useState('');
//     const navigate = useNavigate();

//     const [commentName, setCommentName] = useState('');
// const [commentContent, setCommentContent] = useState('');


//     //fetch the character from the database
//     useEffect(() => {
//         const getPost = async () => {
//             const { data } = await supabase
//                 .from('stars')
//                 .select()
//                 .eq('id', id);

//             if (data.length > 0) {
//                 setPost(data[0]);
//             }
//         };
//         getPost().catch(console.error);
//     }, [id]);

//     const handleUpvote = async (postId, currentUpvotes) => {
//         // increment the upvotes by 1
//         const newUpvotes = currentUpvotes + 1;

//         // update the post in the database
//         const { error } = await supabase
//             .from('stars')
//             .update({ up_votes: newUpvotes })
//             .eq('id', postId);

//         if (error) {
//             console.log('Error updating post:', error);
//         } else {
//             // update the post state with the new upvotes
//             setPost({ ...post, up_votes: newUpvotes });
//         }
//     };

//     const handleEditClick = async (event) => {
//         event.preventDefault();
//         const enteredPin = parseInt(pin);

//         if (isNaN(enteredPin)) {
//             setErrorMsg('Please enter a valid PIN.');
//             return;
//         }

//         if (post.pin !== enteredPin) {
//             setErrorMsg('Incorrect PIN. Cannot edit.');
//             return;
//         }

//         navigate(`/edit/${post.id}`);
//     };

//     //add a comment to the json column on the Posts table in the database
//     const addComment = async (e) => {
//         e.preventDefault();

//         const newComment = {
//             text: comment,
//             timestamp: new Date().toISOString()
//         };

//         //update the comment column in the database
//         await supabase.from('Posts')
//         .update({
//             comment: [...post.comments, newComment]
//         }).eq('id', id);

//         setPost({
//           ...post,
//           comment: [...post.comments, newComment]
//         });
//     }

//     //delete a comment from the json column on the Posts table in the database

//     const deleteComment = async (index) => {
//         // Remove the comment from the post.comment array
//         post.comment.splice(index, 1);
      
//         // Update the comment column in the database
//         await supabase.from('Posts')
//           .update({
//             comment: post.comment
//           })
//           .eq('id', id);
      
//         // Update the local state with the new array
//         setPost({
//           ...post,
//           comment: post.comment
//         });
//       }

//     //edit the comment in the json column on the Posts table in the database
//     const editComment = async (e, commentIndex, newText) => {
//         e.preventDefault();
      
//         // Make a copy of the post comments array
//         const updatedComments = [...post.comment];
      
//         // Update the text of the comment at the given index
//         updatedComments[commentIndex].text = newText;
      
//         // Update the comment column in the database
//         await supabase.from('Posts')
//           .update({
//             comment: updatedComments
//           }).eq('id', id);
      
//         // Update the local state to reflect the change
//         setPost({
//           ...post,
//           comment: updatedComments
//         });
//       }
        


//     if (!post) {
//         return <h1>Loading...</h1>;
//     }

//     return(
//         <div className="info">
//            {/* <Navigation /> */}
//            <h1 className='namePage'>Archive Page</h1>
//            <div className="contentInfo">
//                 <h2>{post.title}</h2>
//                 <p>Posted at: {post.created_at}</p>
//                 <p>Description: {post.description}</p>
//                 <img src={post.image_url} alt="this is an image" width="300px" height="auto"/>
//                 <p>Topic: {post.topic}</p>
//                 <button className='starsBtn' onClick={() => handleUpvote(post.id, post.up_votes)}>⭐️ {post.up_votes}</button>
//                 <br />
//                 <form onSubmit={handleEditClick}>
//                     <input
//                         type="number"
//                         placeholder="Enter PIN when created"
//                         value={pin}
//                         onChange={(event) => setPin(event.target.value)}
//                         />
//                         <button className="editBtn" type='submit'>
//                             Edit
//                         </button>
//                     </form>
//                     {errorMsg && <p className="errorMsg">{errorMsg}</p>}
//                </div>
//                <div className='comments'>
//                <h3>Comments</h3>
//                     <section className='all-comments'>
//                         {
//                             post.comment && post.comment
//                             .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
//                             .map((comment, index) => (
//                             <div key={index} className='comment'>
//                                 {
//                                 //this sections skips default comments and shows every comment after index 0
//                                 index > 0 && (
//                                     <ul>
//                                         <li>{comment.text} <button  onClick={() => deleteComment(index)}>🗑️</button></li>
                                            
                                        
//                                     </ul>         
//                                 )
//                                 }
//                             </div>
//                             ))
//                         }
//                     </section>

//                     <section className='add-comment'>
//                         <form onSubmit={(e) => {
//                             e.preventDefault();
//                             addComment(e);
//                             setComment('');
//                         }
//                         }>
//                             <input
//                                 type='text'
//                                 placeholder='Add a comment'
//                                 value={comment}
//                                 onChange={(e) => setComment(e.target.value)}
//                             />
//                             <button className="add-button" type='submit'>Add</button>
//                         </form>
//                     </section>
//                 </div>

//             </div>
//         )
//     }
    
//     export default Info;







import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import Edit from '../assets/edit.png'
import Close from '../assets/close.png'
import Vader from "../assets/darth_vader.png"


function Info(){

    //get the id from the url
    const { id } = useParams();

    //set up state variables
    const [post, setPost] = useState(null);
    const [pin, setPin] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showLightbox, setShowLightbox] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();


    //fetch the data for this post from the database
    useEffect(() => {
        const getPost = async () => {
            const { data } = await supabase
                .from('stars')
                .select()
                .eq('id', id);

            if (data.length > 0) {
                setPost(data[0]);
                setComments(data[0].comments);
            }
        };
        getPost().catch(console.error);
    }, [id]);

    const handleUpvote = async (postId, currentUpvotes) => {
        // increment the upvotes by 1
        const newUpvotes = currentUpvotes + 1;

        // update the post in the database
        const { error } = await supabase
            .from('stars')
            .update({ up_votes: newUpvotes })
            .eq('id', postId);

        if (error) {
            console.log('Error updating post:', error);
        } else {
            // update the post state with the new upvotes
            setPost({ ...post, up_votes: newUpvotes });
        }
    };

    const handleEditClick = async (event) => {
        event.preventDefault();
        const enteredPin = parseInt(pin);

        if (isNaN(enteredPin)) {
            setErrorMsg('Please enter a valid PIN.');
            return;
        }

        if (post.pin !== enteredPin) {
            setErrorMsg('Incorrect PIN. Cannot edit.');
            return;
        }

        navigate(`/edit/${post.id}`);
    };

    if (!post) {
        return <h1>Loading...</h1>;
    }

    const handleThumbnailClick = () => {
        setShowLightbox(true);
    };
    
      const handleCloseLightbox = () => {
        setShowLightbox(false);
    };

    // Function to handle adding a new comment
  const handleAddComment = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) {
      setErrorMsg('Comment cannot be empty.');
      return;
    }

    // Add the new comment to the comments array
    const updatedComments = [...comments, newComment];

    // Update the comments in the database
    const { error } = await supabase
      .from('stars')
      .update({ comments: updatedComments })
      .eq('id', id);

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      // Clear the input field and update the comments state
      setNewComment('');
      setComments(updatedComments);
    }
  };

    return(
        <div className="info">
           {/* <Navigation /> */}
            <h1 className='namePage'>Archive Page</h1>
            <div className="contentInfo">
                <h2>{post.title}</h2>

                <p className='time'>{new Date(post.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                })}</p>

               
                <img className="archive-image" src={post.image_url} alt="this is an image" width="300px" height="auto"/>
                <p> {post.description}</p>
                <p>Topic: {post.topic}</p>
                <button className='starsBtn' onClick={() => handleUpvote(post.id, post.up_votes)}>⭐️ {post.up_votes}</button>
                <br />

                <img
                    className="edit-button"
                    src={Edit} // Use the same image for the lightbox
                    alt="project video"
                    height="80%" // Adjust the height as needed
                    onClick={handleThumbnailClick}
                />


                {showLightbox && (
                <div className="lightbox-overlay" >
                    <img src={Close} alt="close x" className="close-button" onClick={handleCloseLightbox}/>
                    <p>Enter your saved pin to edit this post!</p>
                    <form onSubmit={handleEditClick} >
                        <input
                            type="number"
                            placeholder="Enter PIN"
                            value={pin}
                            onChange={(event) => setPin(event.target.value)}
                        />
                        <button className="editBtn" type='submit'>
                            Edit
                        </button>
                    </form>
                    {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                </div>
                )}

                
            </div>

                <div className='comments'>
                    <h2>Comments</h2>
                    {comments.filter(comment => comment.trim() !== '').map((comment, index) => (
                        <div className="commentBundle" key={index}>
                            <img src={Vader} alt="darth vader logo" width="30px" className='vader' />
                            <p key={index}>{comment}</p>
                        </div>
                    ))}
                    <form onSubmit={handleAddComment}>
                        <input
                            type="text"
                            placeholder="Add a new comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button type="submit">Add Comment</button>
                    </form>
                    {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                </div>


            </div>
        )
    }
    
    export default Info;
