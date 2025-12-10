import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTabs } from './ui/AnimatedAuth';

function Login() {
    const navigate = useNavigate();

    const formFields = {
        header: 'Sign In',
        subHeader: 'Enter your details to sign in to your account',
        fields: [
            {
                label: 'Email',
                required: true,
                type: 'email',
                placeholder: 'Enter your email',
                onChange: (e) => console.log('Email:', e.target.value),
            },
            {
                label: 'Password',
                required: true,
                type: 'password',
                placeholder: 'Enter your password',
                onChange: (e) => console.log('Password:', e.target.value),
            },
        ],
        submitButton: 'Sign In',
        textVariantButton: "Don't have an account? Sign up",
    };

    const handleGoTo = () => {
        navigate('/signup');
    };

    const handleSubmit = (e) => {
        // e.preventDefault() is called inside AnimatedForm
        console.log('Login submitted');
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-white">
            <AuthTabs
                formFields={formFields}
                goTo={handleGoTo}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default Login;
