import React, {useContext, useEffect} from 'react';
import UserList from "../components/UserList";
import Messages from "../components/Messages";
import gql from "graphql-tag";
import {useSubscription} from "@apollo/client";
import {AuthContext} from "../context/auth";
import {MessagesContext} from "../context/message";

function Main(props) {

    const {data: messageData, error: messageError} = useSubscription(NEW_MESSAGE);
    const {data: reactionData, error: reactionError} = useSubscription(NEW_REACTION);
    const {user} = useContext(AuthContext);
    const {users, addMessage, addReaction} = useContext(MessagesContext);

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

    useEffect(() => {
        if (reactionData) {
            console.log(reactionData);
            const reaction = reactionData.newReaction;
            const otherUser = user.username === reaction.Message.to ? reaction.Message.from : reaction.Message.to;
            addReaction({
                username: otherUser,
                reaction,
            })
        }
    }, [reactionData, reactionError])

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

const NEW_REACTION = gql`
    subscription  newReaction{
        newReaction{
            uuid
            content
            createdAt
            Message{
                from
                to
                uuid
                createdAt
                content
            }
        }
    }
`

export default Main;