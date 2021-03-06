import React, {useContext} from "react";
import { useQuery} from "@apollo/react-hooks";
import {FETCH_POSTS_QUERY} from "../util/graphql";
import {Grid, Transition} from "semantic-ui-react";
import PostCard from '../components/PostCard';
import {AuthContext} from "../context/auth";
import PostForm from '../components/PostForm';

function Home(){
    const {user}= useContext(AuthContext);
    const {loading, error, data: posts}= useQuery(FETCH_POSTS_QUERY);


    if(loading){
        return 'loading...';
    }
    if (error) return 'error...'


    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user &&(
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )}
                {loading ?(
                    <h1>Loading posts...</h1>
                ): (
                    <Transition.Group>
                        {
                            posts && posts.getPosts.map(post=>(
                                <Grid.Column key={post.id} style={ {marginBottom: 20} }>
                                    <PostCard post={post}/>
                                </Grid.Column>
                            ))
                        }
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    )
}





export default Home;