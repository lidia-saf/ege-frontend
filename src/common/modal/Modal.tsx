import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

type TModal = {
    title: string;
    modalDisplay: any;
    isOpen: boolean;
    toggleModal: () => void;
};

const GlobalModalContainer: React.FC<TModal> = ({
    title,
    toggleModal,
    isOpen,
    modalDisplay
}) => {
    return (
        <div className={toggleModal ? 'general-modal-hidden' : 'general-modal'}>
            <Modal
                className='general-modal-container'
                isOpen={isOpen}
                toggle={toggleModal}
            >
                <ModalHeader className='general-modal-title' toggle={toggleModal}>{title}</ModalHeader>
                <ModalBody>{modalDisplay}</ModalBody>
            </Modal>
        </div>
    );
};

export function GlobalModal(props: TModal) {
    return ReactDOM.createPortal(
        <GlobalModalContainer {...props} />,
        (document.getElementById('modal') as HTMLElement) ||
        document.createElement('div')
    );
};