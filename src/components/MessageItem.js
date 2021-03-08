import {useContext} from "react";
import {AuthContext} from "../context/auth";

function MessageItem({message}){
    const {user} = useContext(AuthContext);
    const containerClassName = user.username == message.from ? 'message-container __current-user' : 'message-container __other-user';

    let messageMarc =
        <div className={containerClassName}>
            <p key={message.uuid}>
                {message.content}
            </p>
        </div>

    return messageMarc;
}

export default MessageItem;