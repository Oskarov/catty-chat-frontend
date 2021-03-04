import React, {useContext, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useForm} from "../util/hooks";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {AuthContext} from "../context/auth";

function Login(props) {
    const {user, login} = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, values} = useForm(loginUser, {
        username: '',
        password: '',
        robo: '',
    })

    const [addUser, {loading}] = useMutation(LOGIN_USER, {
        update(proxy, data) {
            login(data.data.login);
            props.history.push('/');
        },
        variables: values,
        onError(ApolloError) {
            console.log(ApolloError.graphQLErrors[0].extensions.exception)
            let validateErrors;
            console.log(ApolloError.graphQLErrors[0].extensions.exception.err);
            if (!ApolloError.graphQLErrors[0].extensions.exception.err) {
                validateErrors = ApolloError.graphQLErrors[0].extensions.exception.errors;
            } else {
                validateErrors = {"error": "Ошибка ввода"}
            }
            setErrors({
                ...validateErrors
            })
        }
    })

    function loginUser() {
        addUser();
    }

    return (
        <div>
            <h1>Вход</h1>
            <Form onSubmit={onSubmit}>
                    {errors.error &&
                    <div className="form-error">
                        {errors.error}
                    </div>
                    }
                <Form.Group>
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control type="text" name="username" isInvalid={!!errors.username} placeholder="Catty15" value={values.username} onChange={onChange}/>
                    {errors.username &&
                    <Form.Control.Feedback type="invalid">
                        {errors.username}
                    </Form.Control.Feedback>
                    }
                </Form.Group>

                <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" name="password" isInvalid={!!errors.password} autoComplete="new-password" placeholder="********" value={values.password} onChange={onChange}/>
                    {errors.password &&
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                    }
                </Form.Group>

                <Button variant="primary" type="submit">
                    Вход
                </Button>
            </Form>
        </div>
    );
}

const LOGIN_USER = gql`
    mutation register(
        $username: String!
        $password: String!
    ){
        login (
            username: $username
            password: $password
        ){
            email
            username
            token
        }
    }
`

export default Login;