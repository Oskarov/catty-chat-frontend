import React, {useContext, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useForm} from "../util/hooks";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {AuthContext} from "../context/auth";

function Register(props) {
    const {user, login} = useContext(AuthContext);

    console.log('user = ' + !!user)

    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, values} = useForm(registerUser, {
        email: '',
        username: '',
        password: '',
        confirmedPassword: ''
    })

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, data) {
            login(data.data.register);
            props.history.push('/');
        },
        variables: values,
        onError(ApolloError) {
            const validateErrors = ApolloError.graphQLErrors[0].extensions.exception.err.errors;
            setErrors({
                ...validateErrors
            })
        }
    })


    function registerUser() {
        addUser();
    }

    return (
        <div>
            <h1>Регистрация</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Email адрес</Form.Label>
                    <Form.Control type="email" name="email" isInvalid={!!errors.email} placeholder="catty@evil.cat" value={values.email} onChange={onChange}/>
                    {errors.email &&
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    }
                    <Form.Text className="text-muted">
                        Никому не сообщайте ваши реквизиты для входа.
                    </Form.Text>
                </Form.Group>

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

                <Form.Group>
                    <Form.Label>Пароль ещё раз</Form.Label>
                    <Form.Control type="password" name="confirmedPassword" isInvalid={!!errors.confirmedPassword} autoComplete="off" placeholder="********" value={values.confirmedPassword} onChange={onChange}/>
                    {errors.confirmedPassword &&
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmedPassword}
                    </Form.Control.Feedback>
                    }
                </Form.Group>

                <Button variant="primary" type="submit">
                    Регистрация
                </Button>
            </Form>
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmedPassword: String!
    ){
        register (
            username: $username
            email: $email
            password: $password
            confirmedPassword: $confirmedPassword
        ){
            email
            username
            token
        }
    }
`

export default Register;