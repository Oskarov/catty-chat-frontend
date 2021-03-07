import React, {useReducer, createContext} from "react";

const initialState = {
    user: null
}


const MessagesContext = createContext({

});

function messagesReducer(state, action) {
    let usersCopy;
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
            const { username, messages} = action.payload
            usersCopy = [...state.users]
            const userIndex = usersCopy.findIndex(u => u.username === username);
            usersCopy[userIndex] = { ...usersCopy[userIndex], messages};
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

    return (
        <MessagesContext.Provider
            value={{users: state.users, messages: state.messages, setSelectedUser, setUsers, setUserMessages}} {...props}/>
    )
}

export {MessagesContext, MessagesProvider}