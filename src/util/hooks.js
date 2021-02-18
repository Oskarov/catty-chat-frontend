import {useState} from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (e) => {
        const element = e.target;
        setValues({
            ...values,
            [element.name]: element.value
        });
    }

    const changeBunchValues = (bunch) =>{
        setValues({
            ...values,
            ...bunch
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        changeBunchValues,
        values
    }
}



