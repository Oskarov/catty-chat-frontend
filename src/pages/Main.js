import React, {useContext, useEffect} from 'react';
import UserList from "../components/UserList";
import Messages from "../components/Messages";
import gql from "graphql-tag";
import {useSubscription} from "@apollo/client";
import {AuthContext} from "../context/auth";
import {MessagesContext} from "../context/message";

function Main(props) {

    const {data: messageData, error: messageError} = useSubscription(NEW_MESSAGE);
    const {user} = useContext(AuthContext);
    const {users, addMessage} = useContext(MessagesContext);

    useEffect(() => {
        if (messageError) console.log(messageError);
        if (messageData) {
            const message = messageData.newMessage;
            const otherUser = user.username === message.to ? message.from : message.to;
            addMessage({
                username: otherUser,
                message: message,
            })
        }
    }, [messageData, messageError])

    return (
        <div className="chat-body">
            <div className="row">
                <UserList/>
                <Messages/>
            </div>
        </div>
    );
}

const NEW_MESSAGE = gql`
    subscription  newMessage{
        newMessage {
            uuid
            from
            to
            content
            createdAt
        }
    }
`

export default Main;