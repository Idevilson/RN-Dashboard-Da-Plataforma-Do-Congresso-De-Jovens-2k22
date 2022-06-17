import React, { useState } from 'react';

import { 
    Modal, 
    ScrollView, 
    Text, 
    Button, 
    useDisclose,
    Center
} from 'native-base';

interface SearchResultModalProps{
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

export function SearchResultModal({isOpen, onClose, onOpen }: SearchResultModalProps){

    console.log(isOpen);

    return (
        <>
            <Center>
                <Modal isOpen={isOpen} onClose={() => onClose()}>
                <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header fontSize="4xl" fontWeight="bold">
                    Delete Customer
                </Modal.Header>
                <Modal.Body>
                    This will remove all data relating to Alex. This action cannot be
                    reversed. Deleted data can not be recovered.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="unstyled" mr="1" onPress={() => onClose()}>
                    Cancel
                    </Button>
                    <Button colorScheme="error" onPress={() => onClose()}>
                    Delete
                    </Button>
                </Modal.Footer>
                </Modal.Content>
                </Modal>
            </Center>
        </>
    )
}

