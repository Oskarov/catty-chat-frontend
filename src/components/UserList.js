import React, {useContext} from "react";
import gql from "graphql-tag";
import {useQuery, useLazyQuery} from "@apollo/react-hooks";
import {Col, Image} from "react-bootstrap";
import {MessagesContext} from "../context/message";


export default function UserList() {

    const {users, setUsers, setSelectedUser} = useContext(MessagesContext);

    const {loading} = useQuery(GET_USERS, {
        onCompleted: data => {
            setUsers(data.getUsers);
        },
        onError: error => console.log(error)
    });

    let usersList;
    if (!users || loading) {
        usersList = <p>Загрузка...</p>
    } else if (users.length === 0) {
        usersList = <p>У вас нет контактов</p>
    } else {
        usersList = users.map(user => {
                const userClasses = `user-item ${user.selected ? '_selected' : ''}`
                return <div className={userClasses} key={user.username} role="button" onClick={() => setSelectedUser(user.username)}>
                    <Image src="user.jpg" roundedCircle/>
                    <div>
                        <span className="user-item-name">{user.username}</span>
                        <span className="user-item-message">
                        {user.latestMessage ? user.latestMessage.content : 'no messages'}
                    </span>
                    </div>

                </div>
            }
        )
    }

    return (
        <Col xs={4}>
            {usersList}
        </Col>
    )
}

const GET_USERS = gql`
    query getUsers{
        getUsers{
            username
            latestMessage{
                uuid
                from
                to
                content
                createdAt
            }
        }
    }
`