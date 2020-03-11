import * as React from 'react';
import { SignUpForm } from './SignUpForm';
import { authContext } from '../../contexts/AuthContext';
import { GlobalModal } from '../../common/modal/Modal';
import { ConfirmationCodeForm } from './ConfirmationCodeForm';

export const SignUp: React.FC<{}> = () => {
    return (
        <authContext.Consumer>
            {value => <div>
                <GlobalModal
                    toggleModal={() => value.openConfirmationCodeModal(false)}
                    title='Пожалуйста, проверьте ваш ящик электронной почты'
                    modalDisplay={<ConfirmationCodeForm />}
                    modal={value.confirmationCodeModal}
                />
                <SignUpForm/>
            </div>}
        </authContext.Consumer>
    )
}