import React, {useReducer, createContext} from "react";

const initialState = {
    user: null
}


const MessagesContext = createContext({
    messages: null,
    setUsers: userData => {
    },
    setSelectedUser: userData => {
    },
    setMessages: userData => {
    },
});

function messagesReducer(state, action) {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'SET_SELECTED_USER':
            const usersCopy = state.users.map(user => ({
                ...user,
                selected: user.username === action.payload
            }))
            return {
                ...state,
                users: usersCopy,
            }
        case 'SET_USER_MESSAGES':
            const { username, messages} = action.payload
            return {
                ...state,
                messages: action.payload
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

     function setMessages(messages) {
        dispatch({
            type: 'SET_MESSAGES',
            payload: messages
        })
    }

    return (
        <MessagesContext.Provider
            value={{users: state.users, messages: state.messages, setSelectedUser, setUsers, setMessages}} {...props}/>
    )
}

export {MessagesContext, MessagesProvider}