import React, {useContext, useEffect} from "react"
import gql from "graphql-tag";
import {useLazyQuery} from "@apollo/react-hooks";
import {Col} from "react-bootstrap";
import {MessagesContext} from "../context/message";

export default function Messages() {

    const { users } = useContext(MessagesContext);
    const selectedUser = users?.find(u=> u.selected == true);

    const [getMessages, {loadingMessages, data: messagesData}] = useLazyQuery(GET_MESSAGES);

    useEffect(()=>{
        if (selectedUser){
            getMessages({variables: { from: selectedUser.username}});
        }
    }, [selectedUser]);

    return (
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
    )
}


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