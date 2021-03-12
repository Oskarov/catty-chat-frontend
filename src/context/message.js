import React, {useReducer, createContext} from "react";

const initialState = {
    user: null
}


const MessagesContext = createContext({

});

function messagesReducer(state, action) {
    let usersCopy, userIndex;
    const {username, message, messages} = action.payload;
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'SET_SELECTED_USER':
            usersCopy = state.users.map(user => ({
                ...user,
                selected: user.username === action.payload
            }))
            return {
                ...state,
                users: usersCopy,
            }
        case 'SET_USER_MESSAGES':
            usersCopy = [...state.users];
            userIndex = usersCopy.findIndex(u => u.username === username);
            usersCopy[userIndex] = { ...usersCopy[userIndex], messages};
            return {
                ...state,
                users: usersCopy
            }
        case 'ADD_MESSAGE':
            usersCopy = [...state.users];
            userIndex = usersCopy.findIndex(u => u.username === username);
            let userUpdated = { ...usersCopy[userIndex], latestMessage: message, messages: usersCopy[userIndex].messages ? [message, ...usersCopy[userIndex].messages] : null}
            usersCopy[userIndex] = userUpdated;
            return {
                ...state,
                users: usersCopy
            }

        default:
            return state;
    }
}

function MessagesProvider(props) {
    const [state, dispatch] = useReducer(messagesReducer, initialState);

    function setUsers(users) {
        dispatch({
            type: 'SET_USERS',
            payload: users
        })
    }

    function setSelectedUser(user) {
        dispatch({
            type: 'SET_SELECTED_USER',
            payload: user
        })
    }

    function setUserMessages(selectedUser, messagesData){
        dispatch({
            type:'SET_USER_MESSAGES',
            payload: {
                username: selectedUser,
                messages: messagesData
            }
        })
    }

    function addMessage({username, message}){
        dispatch({
            type:'ADD_MESSAGE',
            payload: {
                username,
                message
            }
        })
    }

    return (
        <MessagesContext.Provider
            value={{users: state.users, messages: state.messages, setSelectedUser, setUsers, setUserMessages, addMessage}} {...props}/>
    )
}

export {MessagesContext, MessagesProvider}