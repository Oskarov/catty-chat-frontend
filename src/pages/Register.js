import React from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useForm} from "../util/hooks";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";

function Register(props) {



    const { onChange, onSubmit, values } = useForm( registerUser, {
        email: '',
        username: '',
        password: '',
        confirmedPassword: ''
    })

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, data) {
            console.log('1');
            console.log(data);
           /* context.login(userData);*/
            props.history.push('/');
        },
        variables: values,
        onError(ApolloError) {
            console.log('2');
            console.log(ApolloError);
         /*   transferErrors(ApolloError.graphQLErrors[0].extensions.exception.errors);*/
        }
    })


    function registerUser(){
       addUser();
    }

    return (
        <div>
                <h1>Регистрация</h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Email адрес</Form.Label>
                        <Form.Control type="email" name="email" placeholder="catty@evil.cat" value={values.email} onChange={onChange}/>
                        <Form.Text className="text-muted">
                            Никому не сообщайте ваши реквизиты для входа.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Catty15" value={values.username} onChange={onChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" name="password" autoComplete="new-password" placeholder="********" value={values.password} onChange={onChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Пароль ещё раз</Form.Label>
                        <Form.Control type="password" name="confirmedPassword" autoComplete="off" placeholder="********" value={values.confirmedPassword} onChange={onChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
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
        }  
    }
`

export default Register;