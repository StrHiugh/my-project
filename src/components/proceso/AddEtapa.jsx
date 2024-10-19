// AddEtapa.jsx
import React, { useState } from "react"; // Asegúrate de importar useState aquí
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Switch, TimeInput} from "@nextui-org/react";
import {Lock, Mail} from "lucide-react";
import "./AddEtapa.css"


export default function AddEtapa({ isOpen, onClose, backdrop, setBackdrop, onAddEtapa }) {
    // Definimos el estado para los campos del formulario
    const [nombre, setNombre] = useState("");
    const [activo, setActivo] = useState(true); // Por defecto, el switch está activo
    const [duracion, setDuracion] = useState("");
    const formatTime = (hour, minute, second) => {
        // Asegúrate de que cada componente tenga dos dígitos
        const twoDigits = (num) => String(num).padStart(2, '0');

        return `${twoDigits(hour)}:${twoDigits(minute)}:${twoDigits(second)}`;
    };
    // Manejar el evento de agregar etapa
    const handleAdd = () => {
        const duracionFormatted = formatTime(duracion.hour, duracion.minute, duracion.second);
        const nuevaEtapa = {
            nombre,
            activo: activo ? 1 : 3, // Asumiendo que 1 es activo y 3 inactivo
            duracion: duracionFormatted,
        };

        console.log("Nueva etapa agregada:", nuevaEtapa);

        if (typeof onAddEtapa === 'function') {
            onAddEtapa(nuevaEtapa); // Verifica que onAddEtapa sea una función
        } else {
            console.error("onAddEtapa no es una función válida");
        }

        setNombre("");
        setActivo(true);
        setDuracion("");
        onClose();
    };


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
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)} // Maneja el cambio en el input
                            />

                            <Switch
                                defaultSelected color="secondary"
                                isSelected={activo} // Usa el estado del switch
                                onChange={() => setActivo(!activo)} // Alterna el estado al cambiar
                            >
                                Estado de la Etapa
                            </Switch>

                            <TimeInput
                                label="Duracion"
                                description="Duracion de la Etapa"
                                hourCycle="24"
                                granularity="second"
                                onChange={(value) => {
                                    setDuracion(value);}}
                            />

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="secondary" onPress={handleAdd}>
                                Agregar Etapa
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
