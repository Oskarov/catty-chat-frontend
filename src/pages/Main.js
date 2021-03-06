import React from 'react';
import UserList from "../components/UserList";
import Messages from "../components/Messages";

function Main(props) {
   return (
        <div className="chat-body">
            <div className="row">
                    <UserList />
                    <Messages />
            </div>
        </div>
    );
}

export default Main;