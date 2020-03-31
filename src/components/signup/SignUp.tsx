import * as React from 'react';
import { SignUpForm } from './SignUpForm';
import { authContext } from '../../contexts/AuthContext';
import { GlobalModal } from '../../common/modal/Modal';
import { ConfirmationCodeForm } from './ConfirmationCodeForm';

export const SignUp: React.FC<{}> = () => {

    return (
        <authContext.Consumer>
            {value =>
            <>
                    <GlobalModal
                        toggleModal={() => value.openConfirmationCodeModal(!value.confirmationCodeModal)}
                        title='Проверьте, пожалуйста, электронную почту'
                        modalDisplay={<ConfirmationCodeForm />}
                        modal={value.confirmationCodeModal}
                    />
                    <SignUpForm/>
            </>}
        </authContext.Consumer>
    )
}