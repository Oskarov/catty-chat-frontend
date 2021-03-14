import {useContext, useState} from "react";
import {AuthContext} from "../context/auth";
import {Button, OverlayTrigger, Popover} from "react-bootstrap";

function MessageItem({message}) {
    const {user} = useContext(AuthContext);
    const containerClassName = user.username == message.from ? 'message-container __current-user' : 'message-container __other-user';
    const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']
    const [showPopover, setShowPopover] = useState(false);

    const reactAction = (reaction) => {
        setShowPopover(false);
        
    }

    const reactButton =
        <OverlayTrigger
            trigger="click"
            placement="top"
            show={showPopover}
            onToggle={setShowPopover}
            transition={false}
            overlay={
                <Popover classname="rounded-pill">
                    <Popover.Content>
                        {reactions.map(reaction=>(
                          <Button variant="link" key={reaction} onClick={()=> reactAction(reaction)}>{reaction}</Button>
                        ))}
                    </Popover.Content>
                </Popover>
            }
        >
            <Button variant="link" className={user.username == message.from ? 'message-react __user' : 'message-react __other'}>
                +
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