import React, {useEffect, useState} from 'react';
import gql from "graphql-tag";
import {useQuery, useLazyQuery} from "@apollo/react-hooks";
import {Col, Image} from "react-bootstrap";

function Main(props) {

    const {loading, data, error} = useQuery(GET_USERS);
    const [selectedUser, setSelectedUser] = useState(null)

    const [getMessages, {loadingMessages, data: messagesData}] = useLazyQuery(GET_MESSAGES);

   useEffect(()=>{
        if (selectedUser){
            getMessages({variables: { from: selectedUser}});
        }
   }, [selectedUser]);

   if (messagesData) console.log(messagesData)


    let usersList;
    if (!data || loading){
        usersList = <p>Загрузка...</p>
    } else if(data.getUsers.length === 0){
        usersList = <p>У вас нет контактов</p>
    } else {
        usersList = data.getUsers.map(user=>(
            <div className="user-item" key={user.username} onClick={() => setSelectedUser(user.username)}>
                <Image src="user.jpg" roundedCircle/>
                <div>
                    <span className="user-item-name">{user.username}</span>
                    <span className="user-item-message">
                        {user.latestMessage ? user.latestMessage.content : 'no messages'}
                    </span>
                </div>

            </div>
        ))
    }

    return (
        <div className="chat-body">
            <div className="row">
                <Col xs={4}>
                    {usersList}
                </Col>
                <Col xs={8}>
                    {messagesData && messagesData.getMessages.length > 0 ? (
                        messagesData.getMessages.map(message =>
                            <p key={message.uuid}>
                                {message.content}
                            </p>
                        )
                    ) : (
                        'no data'
                    )}
                </Col>
            </div>
        </div>
    );
}

const GET_USERS = gql`
query getUsers{
    getUsers{
        username
        latestMessage{
            uuid
            from
            to
            content
            createdAt
        }
    }
}
`

const GET_MESSAGES = gql`
    query geMessages($from: String!){
        getMessages(from: $from){
            uuid
            from
            to
            content
            createdAt
        }
    }
`

export default Main;