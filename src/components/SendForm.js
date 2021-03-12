import {Form} from "react-bootstrap";
import {useContext, useState} from "react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {MessagesContext} from "../context/message";
import {AuthContext} from "../context/auth";

function SendForm() {
    const [content, setContent] = useState('');
    const {user} = useContext(AuthContext);
    const {users, addMessage} = useContext(MessagesContext);
    const selectedUser = users?.find(u => u.selected == true);
    const [sendMessage] = useMutation(SEND_MESSAGE, {
        variables: {
            to: selectedUser ? selectedUser.username : '',
            content: content.trim()
        },
        onCompleted: data => {
            setContent('');
        },
        onError: error => {
            console.log(error);
        }
    })

    const submitMessage = (e) => {
        e.preventDefault();
        if (content.trim().length == 0) return false;
        sendMessage();
    }

    return <>
        {selectedUser &&
        <div className="send-form">
            <div>
                <Form onSubmit={submitMessage}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                        <div className="send-form_button" onClick={submitMessage}>
                            >
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </div>
        }
    </>
}

const SEND_MESSAGE = gql`
    mutation sendMessage(
        $to: String!,
        $content: String!
    ){
        sendMessage(
            to: $to
            content: $content
        ){
            uuid
            from
            to
            content
        }
    }
`

export default SendForm;