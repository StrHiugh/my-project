// AddProceso.jsx
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import {Lock, Mail} from "lucide-react";

export default function AddProceso({ isOpen, onClose, backdrop, setBackdrop }) {
    return (
        <Modal
            size="3xl"
            backdrop={backdrop}
            isOpen={isOpen}
            onClose={onClose}
            placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Añadir Procesos</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                endContent={
                                    <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Email"
                                placeholder="Enter your email"
                                variant="bordered"
                            />
                            <Input
                                endContent={
                                    <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                variant="bordered"
                            />
                            <div className="flex py-2 px-1 justify-between">
                                <Checkbox classNames={{ label: "text-small" }}>
                                    Remember me
                                </Checkbox>
                                <Link color="secondary" href="#" size="sm">
                                    Forgot password?
                                </Link>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="secondary" onPress={onClose}>
                                Sign in
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
