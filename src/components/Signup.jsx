import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTabs } from './ui/AnimatedAuth';

function Signup() {
    const navigate = useNavigate();

    const formFields = {
        header: 'Sign Up',
        subHeader: 'Create a new account to get started',
        fields: [
            {
                label: 'Full Name',
                required: true,
                type: 'text',
                placeholder: 'Enter your full name',
                onChange: (e) => console.log('Name:', e.target.value),
            },
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
        submitButton: 'Sign Up',
        textVariantButton: 'Already have an account? Sign in',
    };

    const handleGoTo = () => {
        navigate('/login');
    };

    const handleSubmit = (e) => {
        console.log('Signup submitted');
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

export default Signup;
