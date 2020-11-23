import React, { useContext }  from 'react'
import {Button, Card, Icon, Image, Label } from 'semantic-ui-react' 
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import  LikeButton  from './LikeButton'
import DeleteButton from './DeleteButton.js'


function PostCard({
    post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
    const { user } = useContext(AuthContext)

    // function commentOnPost(){
    //     console.log('Comment on post')
    // }

    // function likePost(){
    //     console.log('like post')
    // }
    return(
    <Card fluid>
        <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>

                <LikeButton user={user} post={{ id, likes, likeCount }} />

                <Button labelPosition='right' as={Link} to={`/post/${id}`}>
                    <Button color='orange' basic>
                        <Icon name='comment' />
                    </Button>
                    <Label basic color='orange' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && <DeleteButton postId={id} />}
        </Card.Content>
    </Card>
    )

}
export default PostCard