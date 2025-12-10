import React, {
    useState,
    useEffect,
    useRef,
    forwardRef,
} from 'react';
import {
    motion,
    useAnimation,
    useInView,
    useMotionTemplate,
    useMotionValue,
} from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// ==================== Input Component ====================

const Input = forwardRef(function Input(
    { className, type, ...props },
    ref
) {
    const radius = 100;
    const [visible, setVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }) {
        const { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            style={{
                background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className='group/input rounded-lg p-[2px] transition duration-300'
        >
            <input
                type={type}
                className={cn(
                    `shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
                    className
                )}
                ref={ref}
                {...props}
            />

        </motion.div>
    );
});

Input.displayName = 'Input';

// ==================== BoxReveal Component ====================

function BoxReveal({
    children,
    width = 'fit-content',
    boxColor,
    duration,
    overflow = 'hidden',
    position = 'relative',
    className,
}) {
    const mainControls = useAnimation();
    const slideControls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            slideControls.start('visible');
            mainControls.start('visible');
        } else {
            slideControls.start('hidden');
            mainControls.start('hidden');
        }
    }, [isInView, mainControls, slideControls]);

    return (
        <section
            ref={ref}
            style={{
                position: position,
                width,
                overflow,
            }}
            className={className}
        >
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial='hidden'
                animate={mainControls}
                transition={{ duration: duration ?? 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
            <motion.div
                variants={{ hidden: { left: 0 }, visible: { left: '100%' } }}
                initial='hidden'
                animate={slideControls}
                transition={{ duration: duration ?? 0.5, ease: 'easeIn' }}
                style={{
                    position: 'absolute',
                    top: 4,
                    bottom: 4,
                    left: 0,
                    right: 0,
                    zIndex: 20,
                    background: boxColor ?? '#5046e6',
                    borderRadius: 4,
                }}
            />
        </section>
    );
}

// ==================== Ripple Component ====================

function Ripple({
    mainCircleSize = 210,
    mainCircleOpacity = 0.24,
    numCircles = 11,
    className = '',
}) {
    return (
        <section
            className={`max-w-[50%] absolute inset-0 flex items-center justify-center
        dark:bg-white/5 bg-neutral-50
        [mask-image:linear-gradient(to_bottom,black,transparent)]
        dark:[mask-image:linear-gradient(to_bottom,white,transparent)] ${className}`}
        >
            {Array.from({ length: numCircles }, (_, i) => {
                const size = mainCircleSize + i * 70;
                const opacity = mainCircleOpacity - i * 0.03;
                const animationDelay = `${i * 0.06}s`;
                const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid';
                const borderOpacity = 5 + i * 5;

                return (
                    <span
                        key={i}
                        className='absolute animate-ripple rounded-full bg-foreground/15 border'
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            opacity: opacity,
                            animationDelay: animationDelay,
                            borderStyle: borderStyle,
                            borderWidth: '1px',
                            borderColor: `var(--foreground) dark:var(--background) / ${borderOpacity / 100
                                })`,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                );
            })}
        </section>
    );
}

// ==================== OrbitingCircles Component ====================

function OrbitingCircles({
    className,
    children,
    reverse = false,
    duration = 20,
    delay = 10,
    radius = 50,
    path = true,
}) {
    return (
        <>
            {path && (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    version='1.1'
                    className='pointer-events-none absolute inset-0 size-full'
                >
                    <circle
                        className='stroke-black/10 stroke-1 dark:stroke-white/10'
                        cx='50%'
                        cy='50%'
                        r={radius}
                        fill='none'
                    />
                </svg>
            )}
            <section
                style={
                    {
                        '--duration': duration,
                        '--radius': radius,
                        '--delay': -delay,
                    }
                }
                className={cn(
                    'absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full border bg-black/10 [animation-delay:calc(var(--delay)*1000ms)] dark:bg-white/10',
                    { '[animation-direction:reverse]': reverse },
                    className
                )}
            >
                {children}
            </section>
        </>
    );
}

// ==================== TechOrbitDisplay Component ====================

function TechOrbitDisplay({
    iconsArray,
    text = 'Animated Login',
}) {
    return (
        <section className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg'>
            <span className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10'>
                {text}
            </span>

            {iconsArray.map((icon, index) => (
                <OrbitingCircles
                    key={index}
                    className={icon.className}
                    duration={icon.duration}
                    delay={icon.delay}
                    radius={icon.radius}
                    path={icon.path}
                    reverse={icon.reverse}
                >
                    {icon.component()}
                </OrbitingCircles>
            ))}
        </section>
    );
}

// ==================== AnimatedForm Component ====================

function AnimatedForm({
    header,
    subHeader,
    fields,
    submitButton,
    textVariantButton,
    errorField,
    fieldPerRow = 1,
    onSubmit,
    googleLogin,
    goTo,
}) {
    const [visible, setVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();

    const googleLoginHandler = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
                );
                login(userInfo.data);
                console.log('Google Login Success, User:', userInfo.data);
                navigate('/dashboard'); // Direct navigation related to this task
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        },
        onError: (error) => console.log('Google Login Failed:', error),
    });

    const toggleVisibility = () => setVisible(!visible);

    const validateForm = (event) => {
        const currentErrors = {};
        fields.forEach((field) => {
            const value = event.target[field.label]?.value;

            if (field.required && !value) {
                currentErrors[field.label] = `${field.label} is required`;
            }

            if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
                currentErrors[field.label] = 'Invalid email address';
            }

            if (field.type === 'password' && value && value.length < 6) {
                currentErrors[field.label] =
                    'Password must be at least 6 characters long';
            }
        });
        return currentErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validateForm(event);

        if (Object.keys(formErrors).length === 0) {
            onSubmit(event);
            console.log('Form submitted');
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <section className='max-md:w-full flex flex-col gap-4 w-96 mx-auto border-2 border-black rounded-[20px] p-8'>
            <BoxReveal boxColor='var(--skeleton)' duration={0.3}>
                <h2 className='font-bold text-3xl text-black'>
                    {header}
                </h2>
            </BoxReveal>

            {subHeader && (
                <BoxReveal boxColor='var(--skeleton)' duration={0.3} className='pb-2'>
                    <p className='text-black font-bold text-sm max-w-sm'>
                        {subHeader}
                    </p>
                </BoxReveal>
            )}

            {googleLogin && (
                <>
                    <BoxReveal
                        boxColor='var(--skeleton)'
                        duration={0.3}
                        overflow='visible'
                        width='unset'
                    >
                        <button
                            className='g-button group/btn bg-transparent w-full rounded-md border h-10 font-medium outline-hidden hover:cursor-pointer'
                            type='button'
                            onClick={() => googleLoginHandler()}
                        >
                            <span className='flex items-center justify-center w-full h-full gap-3'>
                                <img
                                    src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'
                                    width={26}
                                    height={26}
                                    alt='Google Icon'
                                />
                                {googleLogin}
                            </span>

                            <BottomGradient />
                        </button>
                    </BoxReveal>

                    <BoxReveal boxColor='var(--skeleton)' duration={0.3} width='100%'>
                        <section className='flex items-center gap-4'>
                            <hr className='flex-1 border-1 border-dashed border-neutral-300 dark:border-neutral-700' />
                            <p className='text-neutral-700 text-sm dark:text-neutral-300'>
                                or
                            </p>
                            <hr className='flex-1 border-1 border-dashed border-neutral-300 dark:border-neutral-700' />
                        </section>
                    </BoxReveal>
                </>
            )}

            <form onSubmit={handleSubmit}>
                <section
                    className={`grid grid-cols-1 md:grid-cols-${fieldPerRow} mb-4`}
                >
                    {fields.map((field) => (
                        <section key={field.label} className='flex flex-col gap-2'>
                            <BoxReveal boxColor='var(--skeleton)' duration={0.3}>
                                <Label htmlFor={field.label}>
                                    {field.label} <span className='text-red-500'>*</span>
                                </Label>
                            </BoxReveal>

                            <BoxReveal
                                width='100%'
                                boxColor='var(--skeleton)'
                                duration={0.3}
                                className='flex flex-col space-y-2 w-full'
                            >
                                <section className='relative'>
                                    <Input
                                        type={
                                            field.type === 'password'
                                                ? visible
                                                    ? 'text'
                                                    : 'password'
                                                : field.type
                                        }
                                        id={field.label}
                                        placeholder={field.placeholder}
                                        onChange={field.onChange}
                                    />

                                    {field.type === 'password' && (
                                        <button
                                            type='button'
                                            onClick={toggleVisibility}
                                            className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                                        >
                                            {visible ? (
                                                <Eye className='h-5 w-5' />
                                            ) : (
                                                <EyeOff className='h-5 w-5' />
                                            )}
                                        </button>
                                    )}
                                </section>

                                <section className='h-4'>
                                    {errors[field.label] && (
                                        <p className='text-red-500 text-xs'>
                                            {errors[field.label]}
                                        </p>
                                    )}
                                </section>
                            </BoxReveal>
                        </section>
                    ))}
                </section>

                <BoxReveal width='100%' boxColor='var(--skeleton)' duration={0.3}>
                    {errorField && (
                        <p className='text-red-500 text-sm mb-4'>{errorField}</p>
                    )}
                </BoxReveal>

                <BoxReveal
                    width='100%'
                    boxColor='var(--skeleton)'
                    duration={0.3}
                    overflow='visible'
                >
                    <button
                        className='bg-gradient-to-br relative group/btn from-zinc-200 dark:from-zinc-900
            dark:to-zinc-900 to-zinc-200 block dark:bg-zinc-800 w-full text-black
            dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
              dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] outline-hidden hover:cursor-pointer'
                        type='submit'
                    >
                        {submitButton} &rarr;
                        <BottomGradient />
                    </button>
                </BoxReveal>

                {textVariantButton && goTo && (
                    <BoxReveal boxColor='var(--skeleton)' duration={0.3}>
                        <section className='mt-4 text-center hover:cursor-pointer'>
                            <button
                                className='text-sm text-blue-500 hover:cursor-pointer outline-hidden'
                                type='button'
                                onClick={goTo}
                            >
                                {textVariantButton}
                            </button>
                        </section>
                    </BoxReveal>
                )}
            </form>
        </section>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
            <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
        </>
    );
};

// ==================== AuthTabs Component ====================

function AuthTabs({
    formFields,
    goTo,
    handleSubmit,
}) {
    // Simplified return for initial debugging, then I'll uncomment
    return (
        <div className='flex justify-center items-center h-screen'>
            {/* <h1>Debug: AuthTabs Rendering</h1> */}
            <div className='w-full lg:w-1/2 flex flex-col justify-center items-center max-lg:px-[10%] mx-auto'>
                <AnimatedForm
                    {...formFields}
                    fieldPerRow={1}
                    onSubmit={handleSubmit}
                    goTo={goTo}
                    googleLogin='Login with Google'
                />
            </div>
        </div>
    );
}

// ==================== Label Component ====================

function Label({ className, ...props }) {
    return (
        <label
            className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                className
            )}
            {...props}
        />
    );
}

// ==================== Exports ====================

export {
    Input,
    BoxReveal,
    Ripple,
    OrbitingCircles,
    TechOrbitDisplay,
    AnimatedForm,
    AuthTabs,
    Label,
    BottomGradient,
};
