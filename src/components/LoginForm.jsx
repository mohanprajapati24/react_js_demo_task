import React, { useReducer } from 'react'
import { formReducer, initialState } from '../reducers/formReducer'
const LoginForm = () => {

    const [state, disptatch] = useReducer(formReducer, initialState)
    console.log('state: ', state);

    const handleChange = (e) => {
        disptatch({
            type: "FIELD_CHANGE",
            field: e.target.name,
            value: e.target.value
        })
    }

    const validate = () => {
        const errors = {};
        if (!state?.email?.includes("@")) errors.email = "Invalid email";
        if (state?.password?.length < 6) errors.password = "Password too short";
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const valid = validate();
        console.log('valid: ', valid);
        if (Object.keys(valid).length > 0) {
            disptatch({
                type: "SET_ERROR",
                payload: valid
            })
            return;

        }
        disptatch({
            type: "SUBMIT_START"
        });

        setTimeout(() => {
            alert(`Login Successful!`);
            disptatch({ type: "SUBMIT_END" });
            disptatch({ type: "RESET_FORM" })
        }, 2000)
    }

    return (
        <>
            <form onSubmit={handleSubmit} style={{ margin: '40px auto', maxWidth: "300px" }}>
                <h2>Login Form</h2>

                <div>
                    <input
                        type='email'
                        name='email'
                        value={state.value}
                        onChange={handleChange}
                        placeholder='enter email..'
                    />
                    {state.errors.email && <p style={{ color: "red" }}>{state.errors.email}</p>}
                </div>


                <div>
                    <input
                        type='password'
                        name='password'
                        value={state.value}
                        onChange={handleChange}
                        placeholder='enter password..'
                    />
                    {state.errors.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
                </div>

                <button type="submit" disabled={state.isSubmitting}>
                    {state.isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>
        </>
    )
}

export default LoginForm
