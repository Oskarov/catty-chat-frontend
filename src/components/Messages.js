import React, {useContext, useEffect} from "react"
import gql from "graphql-tag";
import {useLazyQuery} from "@apollo/react-hooks";
import {Col} from "react-bootstrap";
import {MessagesContext} from "../context/message";
import MessageItem from "./MessageItem";
import SendForm from "./SendForm";

export default function Messages() {

    const {users, setUserMessages} = useContext(MessagesContext);
    const selectedUser = users?.find(u => u.selected == true);
    const messages = selectedUser?.messages

    const [getMessages, {loadingMessages, data: messagesData}] = useLazyQuery(GET_MESSAGES);

    useEffect(() => {
        if (selectedUser && !selectedUser.messages) {
            getMessages({variables: {from: selectedUser.username}});
        }
    }, [selectedUser]);

    useEffect(() => {
        if (messagesData) {
            setUserMessages(selectedUser.username, messagesData.getMessages);
        }
    }, [messagesData])

    let selectedChat;
    if (!messages && !loadingMessages) {
        selectedChat = <p>Выбери пользователя</p>
    } else if (loadingMessages) {
        selectedChat = <p>Загрузка</p>
    } else if (messages.length > 0){
        selectedChat = messages.map(message =>
            <MessageItem key={message.uuid} message={message}/>
        )
    } else {
        selectedChat = <p>Нет сообщений</p>
    }

    return (
        <>
            <Col xs={8} className="message-cont">
                <div className="message-scroll">
                    {selectedChat}
                </div>
                <SendForm />
            </Col>
        </>

    )
}


const GET_MESSAGES = gql`
    query getMessages($from: String!){
        getMessages(from: $from){
            uuid
            from
            to
            content
            createdAt
            reactions{
                uuid
                content
            }
        }
    }
`