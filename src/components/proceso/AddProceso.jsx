// AddProceso.jsx
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Switch, TimeInput} from "@nextui-org/react";
import {Lock, Mail} from "lucide-react";
import "./AddProceso.css"
export default function AddProceso({ isOpen, onClose, backdrop, setBackdrop }) {
    return (
        <Modal
            size="l"
            backdrop={backdrop}
            isOpen={isOpen}
            onClose={onClose}
            placement="top-center"
            className="custom-modal" // Añadimos una clase personalizada

        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Añadir Procesos</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="Nombre"
                                placeholder="Ingresa el nombre de la Etapa"
                                variant="bordered"
                            />

                            <Switch defaultSelected color="secondary">
                                Estado de la Etapa
                            </Switch>

                            <TimeInput
                                label="Duracion"
                                description="Duracion de la Etapa"
                                hourCycle="24"
                                granularity="second"
                            />

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="secondary" onPress={onClose}>
                                Agregar Etapa
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
