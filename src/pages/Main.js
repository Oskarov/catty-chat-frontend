import React, {useEffect} from 'react';
import UserList from "../components/UserList";
import Messages from "../components/Messages";
import gql from "graphql-tag";
import {useSubscription} from "@apollo/client";

function Main(props) {

    const {data: messageData, error: messageError} = useSubscription(NEW_MESSAGE);

    useEffect(() => {
        if (messageError) console.log(messageError);
        if (messageData) console.log(messageData)
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