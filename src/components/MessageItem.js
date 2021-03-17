import {useContext, useState} from "react";
import {AuthContext} from "../context/auth";
import {Button, OverlayTrigger, Popover} from "react-bootstrap";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";

function MessageItem({message}) {
    const {user} = useContext(AuthContext);
    const containerClassName = user.username == message.from ? 'message-container __current-user' : 'message-container __other-user';
    const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎'];

    const REACT_TO_MESSAGE = gql`
        mutation reactToMessage($uuid: String! $content: String!){
            reactToMessage(uuid: $uuid, content: $content){
                uuid
            }
        }
    `



    const [reactToMessage] = useMutation(REACT_TO_MESSAGE, {
        onError: error => console.log(error),
        onCompleted: data => {

        }
    })

    const [showPopover, setShowPopover] = useState(false);

    const reactAction = (reaction) => {
        setShowPopover(false);
        reactToMessage({
            variables: {
                uuid: message.uuid,
                content: reaction
            }
        })
    }


    const reactionIcon = message.reactions[0] ? message.reactions[0].content : '+';

    const reactButton =
        <OverlayTrigger
            trigger="click"
            placement="top"
            show={showPopover}
            onToggle={setShowPopover}
            transition={false}
            rootClose
            overlay={
                <Popover className="rounded-pill">
                    <Popover.Content>
                        {reactions.map(reaction => (
                            <Button variant="link" key={reaction} onClick={() => reactAction(reaction)}>{reaction}</Button>
                        ))}
                    </Popover.Content>
                </Popover>
            }
        >
            <Button variant="link" className={user.username == message.from ? 'message-react __user' : 'message-react __other'}>
                {reactionIcon}
            </Button>
        </OverlayTrigger>


    let messageMarc =
        <div className={containerClassName}>
            <p key={message.uuid}>
                {reactButton}
                {message.content}
            </p>
        </div>

    return messageMarc;
}

export default MessageItem;