import React from 'react';
import {Button, Container, Form} from "react-bootstrap";

function Register(props) {


    return (
        <div>
                <h1>Регистрация</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Email адрес</Form.Label>
                        <Form.Control type="email" placeholder="catty@evil.cat" />
                        <Form.Text className="text-muted">
                            Никому не сообщайте ваши реквизиты для входа.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control type="text" placeholder="Catty15" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="********" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Пароль ещё раз</Form.Label>
                        <Form.Control type="password" placeholder="********" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
        </div>
    );
}

export default Register;