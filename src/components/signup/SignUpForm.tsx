import * as React from 'react';
import AWS from 'aws-sdk/global';
import { Button } from 'reactstrap';
import { authContext } from '../../contexts/AuthContext';
import { ErrorMessage } from '../../common/errormessage/ErrorMessage';
import { useErrorHandler } from '../../utils/customhooks/ErrotHandler';
import * as auth from '../../utils/auth';
import { signUpFacebook } from '../../utils/fbauth';
import { validateForm } from './helpers';
import '../../styles/index.css';
import './signup.css';
import FbLogo from '../../images/facebook_logo.png';
import { userPool } from '../../utils/auth';

export const SignUpForm: React.FC<{}> = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordRetype, setPasswordRetype] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { error, showError } = useErrorHandler(null);
    const {
        openConfirmationCodeModal,
        setUsername,
        setUserId,
        setTimestamp
    } = React.useContext(authContext);

    // const onGoogleSignIn = (googleUser: any) => {
    //     if (googleUser.isSignedIn()) {
    //         // AWS.config.region = 'eu-central-1';
    //         // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //         //     IdentityPoolId: process.env.EGE_FRONTEND_COGNITO_IDENTITY_POOL,
    //         //     Logins: {
    //         //         'accounts.google.com': googleUser.getAuthResponse()['id_token']
    //         //     }
    //         // });
    //         console.log(userPool.getCurrentUser());
    //     }
    // }

    // function signOut() {
    //     let auth2 = window.gapi.auth2.getAuthInstance();
    //     auth2.signOut().then(function () {
    //       console.log('User signed out.');
    //     });
    //   }

    React.useEffect(() => {
        // window.gapi.signin2.render('signin2', {
        //     'scope': 'profile email',
        //     'width': 300,
        //     'height': 50,
        //     'longtitle': true,
        //     'theme': 'dark',
        //     'onsuccess': onGoogleSignIn
        // })

        const cognitoUser = userPool.getCurrentUser();
        console.log(cognitoUser);

    }, [])

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm(email, password, passwordRetype, showError)) {
            auth.signUp(
                email,
                password,
                showError,
                setLoading,
                setUsername,
                setUserId,
                setTimestamp,
                openConfirmationCodeModal);
        }
    }

    return (
        <>
            <h3>Заполните форму<br/>регистрации:</h3>
            {/* <p className='general-direction'>Зарегистрируйся с помощью социальной сети - </p> */}
            {/* <div className='social-container'>
                <button className='fb-signup-logo' onClick={signUpFacebook}>
                    <img src={FbLogo} alt=''></img>
                    <span>Sign in with FB</span>
                </button>
                <a href='https://egefrontend.auth.eu-central-1.amazoncognito.com/oauth2/authorize?redirect_uri=http://localhost:8080/&response_type=token&client_id=3th4bm6qc4tvnvm350lcqbjft0&identity_provider=Facebook'>Sign in with FB</a>
                <div id='signin2'></div>
                <button onClick={signOut}>Sign out Google</button>
            </div> */}
            {/* <p className='general-direction'>Или воспользуйся нашей формой регистрации:</p> */}
            <div className='signup-container general-central-wrapper'>
                <form className='general-form' onSubmit={e => onFormSubmit(e)}>
                        <div className='general-input-wrapper'>
                            <input
                            type='email'
                            name='email'
                            value={email}
                            id='email'
                            className='general-input'
                            placeholder='электронная почта'
                            onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='general-input-wrapper'>
                            <input
                                type='password'
                                name='password'
                                value={password}
                                id='password'
                                className='general-input'
                                placeholder='придумайте и введите пароль'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='general-input-wrapper'>
                            <input
                                type='password'
                                name='passwordRetype'
                                value={passwordRetype}
                                id='passwordRetype'
                                className='general-input'
                                placeholder='повторите пароль'
                                onChange={e => setPasswordRetype(e.target.value)}
                            />
                        </div>
                    <br/>
                        {error && <ErrorMessage errorMessage={error} />}
                        <Button className='general-button' type='submit' block={true}>
                            {loading ? 'Идет загрузка...' : 'Создать аккаунт'}
                        </Button>
                </form>
            </div>
        </>
    )
};
