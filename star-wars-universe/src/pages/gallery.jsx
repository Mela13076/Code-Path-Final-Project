
// import React, { useState, useEffect } from 'react';
// import { supabase } from '../client';
// import Navigation from '../componets/navBar';
// import { Link } from 'react-router-dom';
// import Logo from '../assets/yellow-logo.png'


// function Gallery(){
    
//      //set up state variables
//      const [post, setPost] = useState([]);

//      //get the characters from the database
//      useEffect(() => {
        
//          //get the characters from the database
//          const getPost = async () => {
//              const {data} = await supabase
//              .from('stars')
//              .select()
//              .order('created_at', {ascending: false});
         
//          //set characters data
//          setPost(data);
//          }
//          getPost().catch(console.error);
//      }, []);

    
//      const handleUpvote = async (postId, currentUpvotes) => {
//         const { data, error } = await supabase
//             .from('stars')
//             .update({ up_votes: currentUpvotes + 1 })
//             .match({ id: postId })
        
//         if (error) {
//             console.log(error)
//         } else {
//             setPost(post.map(postinfo => {
//                 if (postinfo.id === postId) {
//                     return {
//                         ...postinfo,
//                         up_votes: currentUpvotes + 1
//                     }
//                 } else {
//                     return postinfo
//                 }
//             }))
//         }
//      }


//     return(
//         <div className="gallery">
//             <Navigation />
//             <div className="content">
//             <h2>Archive History</h2>
//                 <img className="logo" src={Logo} alt="star wars logo" width="95%" height="auto"/>
//                 <div className="post">
//                 {
//                     post && post.length > 0 ? post.map((postinfo) => (
//                         <div className="charactersPage" key={postinfo.id}>
//                             <h3>
//                                 <Link to={`/info/${postinfo.id}`}>{postinfo.title}</Link>
//                             </h3>
//                             <p>Title: {postinfo.title}</p>
//                             {/* <img src={postinfo.image_url} alt='image url ' width= "auto" height="auto" /> */}
//                             <p>Description: {postinfo.description}</p>
//                             <p className='topic-sec'>Topic: {postinfo.topic}</p>
                            
//                             <button className='starsBtn' onClick={() => handleUpvote(postinfo.id, postinfo.up_votes)}>⭐️ {postinfo.up_votes}</button>
//                             <br/>
//                             {/* <Link to={`/edit/${postinfo.id}`}>Edit</Link> */}
//                         </div>
//                     )) : (
//                         <div>
//                             <h3>No Archives yet! 😞 </h3>
//                         </div>
//                     )
//                 }
//                 </div>
//             </div>

//         </div>
//     )
// }


// export default Gallery




// import React, { useState, useEffect } from 'react';
// import { supabase } from '../client';
// import Navigation from '../componets/navBar';
// import { Link } from 'react-router-dom';
// import Logo from '../assets/yellow-logo.png'

// function Gallery(){
    
//     //set up state variables
//     const [post, setPost] = useState([]);
//     const [sortBy, setSortBy] = useState('created_at');
//     const [sortOrder, setSortOrder] = useState('desc');
//     const [searchTerm, setSearchTerm] = useState('');

//     //get the posts from the database
//     useEffect(() => {
//         //get the posts from the database
//         const getPosts = async () => {
//             let query = supabase
//                 .from('stars')
//                 .select()
//                 .order(sortBy, { ascending: sortOrder === 'asc' });

//             if (searchTerm) {
//                 query = query.or(`title.iLike.%${searchTerm}%`, 'description.iLike.%${searchTerm}%')

//             }

//             const { data, error } = await query;

//             if (error) {
//                 console.log(error)
//             } else {
//                 setPost(data);
//             }
//         }

//         getPosts().catch(console.error);
//     }, [sortBy, sortOrder, searchTerm]);

//     const handleUpvote = async (postId, currentUpvotes) => {
//         const { data, error } = await supabase
//             .from('stars')
//             .update({ up_votes: currentUpvotes + 1 })
//             .match({ id: postId })

//         if (error) {
//             console.log(error)
//         } else {
//             setPost(post.map(postinfo => {
//                 if (postinfo.id === postId) {
//                     return {
//                         ...postinfo,
//                         up_votes: currentUpvotes + 1
//                     }
//                 } else {
//                     return postinfo
//                 }
//             }))
//         }
//     }

//     const handleSortByChange = (event) => {
//         setSortBy(event.target.value);
//     }

//     const handleSortOrderChange = (event) => {
//         setSortOrder(event.target.value);
//     }

//     const handleSearchTermChange = (event) => {
//         setSearchTerm(event.target.value);
//     }

//     return (
//         <div className="gallery">
//             <Navigation />
//             <div className="content">
//                 <h2>Archive History</h2>
//                 <img className="logo" src={Logo} alt="star wars logo" width="95%" height="auto" />
//                 <div className="filter">
//                     <label>
//                         Sort by:
//                         <select value={sortBy} onChange={handleSortByChange}>
//                             <option value="created_at">Time created</option>
//                             <option value="up_votes">Upvotes</option>
//                         </select>
//                     </label>
//                     <label>
//                         Order:
//                         <select value={sortOrder} onChange={handleSortOrderChange}>
//                             <option value="desc">Descending</option>
//                             <option value="asc">Ascending</option>
//                         </select>
//                     </label>
//                     <label>
//                         Search:
//                         <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
//                     </label>
//                 </div>
//                 <div className="post">
//                     {post && post.length > 0 ? post.map((postinfo) => (
//                         <div className="charactersPage" key={postinfo.id}>
//                             <h3>
//                                 <Link to={`/info/${postinfo.id}`}>{postinfo.title}</Link>
//                             </h3>
//                                                         {/* <img src={postinfo.image_url} alt='image url ' width= "auto" height="auto" /> */}
//                                                         <p>Description: {postinfo.description}</p>
//                             <p className='topic-sec'>Topic: {postinfo.topic}</p>
                            
//                             <button className='starsBtn' onClick={() => handleUpvote(postinfo.id, postinfo.up_votes)}>⭐️ {postinfo.up_votes}</button>
//                             <br/>
//                             {/* <Link to={`/edit/${postinfo.id}`}>Edit</Link> */}
//                         </div>
//                     )) : (
//                         <div>
//                             <h3>No Archives yet! 😞 </h3>
//                         </div>
//                     )
//                 }
//                 </div>
//             </div>

//         </div>
//     )
// }


// export default Gallery


import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import Navigation from '../componets/navBar';
import { Link } from 'react-router-dom';
import Logo from '../assets/yellow-logo.png'

function Gallery(){
    
    //set up state variables
    const [post, setPost] = useState([]);
    const [sortBy, setSortBy] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedTopic, setSelectedTopic] = useState('');

    //get the posts from the database
    useEffect(() => {
        //get the posts from the database
        const getPosts = async () => {
            let query = supabase
                .from('stars')
                .select()
                .order(sortBy, { ascending: sortOrder === 'asc' });

            if (selectedTopic) {
                query = query.filter('topic', 'eq', selectedTopic);
            }

            const { data, error } = await query;

            if (error) {
                console.log(error)
            } else {
                setPost(data);
            }
        }

        getPosts().catch(console.error);
    }, [sortBy, sortOrder, selectedTopic]);

    const handleUpvote = async (postId, currentUpvotes) => {
        const { data, error } = await supabase
            .from('stars')
            .update({ up_votes: currentUpvotes + 1 })
            .match({ id: postId })

        if (error) {
            console.log(error)
        } else {
            setPost(post.map(postinfo => {
                if (postinfo.id === postId) {
                    return {
                        ...postinfo,
                        up_votes: currentUpvotes + 1
                    }
                } else {
                    return postinfo
                }
            }))
        }
    }

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    }

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    }

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
    }

    return (
        <div className="gallery">
            <Navigation />
            <div className="content">
                <h2>Archive History</h2>
                <img className="logo" src={Logo} alt="star wars logo" width="95%" height="auto" />
                <div className="filter">
                    <label>
                        Sort by:
                        <select value={sortBy} onChange={handleSortByChange}>
                            <option value="created_at">Time created</option>
                            <option value="up_votes">Upvotes</option>
                        </select>
                    </label>
                    <label>
                        Order:
                        <select value={sortOrder} onChange={handleSortOrderChange}>
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </label>
                    <label>
                        Topic:
                        <select value={selectedTopic} onChange={handleTopicChange}>
                            <option value="">All</option>
                            <option value="character">Characters</option>
                            <option value="movie">Movies</option>
                            <option value="show">TV Series</option>
                            <option value="game">Games</option>
                            <option value="product">Products</option>
                            <option value="comic">comics</option>
                            <option value="other">other</option>
                        </select>
                    </label>
                </div>
                <div className="post">
                    {post && post.length > 0 ? post.map((postinfo) => (
                        <div className="charactersPage" key={postinfo.id}>
                            <h3>
                                <Link to={`/info/${postinfo.id}`}>{postinfo.title}</Link>
                            </h3>
                                                        {/* <img src={postinfo.image_url} alt='image url ' width= "auto" height="auto" /> */}
                                                        <p>Description: {postinfo.description}</p>
                            <p className='topic-sec'>Topic: {postinfo.topic}</p>
                            
                            <button className='starsBtn' onClick={() => handleUpvote(postinfo.id, postinfo.up_votes)}>⭐️ {postinfo.up_votes}</button>
                            <br/>
                            {/* <Link to={`/edit/${postinfo.id}`}>Edit</Link> */}
                        </div>
                    )) : (
                        <div>
                            <h3>No Archives yet! 😞 </h3>
                        </div>
                    )
                }
                </div>
            </div>

        </div>
    )
}


export default Gallery
