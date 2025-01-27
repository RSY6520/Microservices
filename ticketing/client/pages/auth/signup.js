import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/') // Redirect to home page
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
        Router.push('/'); // Redirect to home page
    };
    return (
        <form className="m-3" onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input className="form-control" value={email} onChange={(e => setEmail(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e => setPassword(e.target.value))} />
            </div>
            {errors}
            <button className="btn btn-primary mt-3">Sign Up</button>
        </form>
    );
}