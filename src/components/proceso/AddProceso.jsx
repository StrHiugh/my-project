// AddEtapa.jsx
import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    SelectItem,
    SelectSection,
    Select,
    Textarea,
    Input,
} from "@nextui-org/react";
import "./AddEtapa.css";
import { useEquipo } from "../composables/useEquipo.jsx";

export default function AddProceso({ isOpen, onClose, backdrop, onAddProceso }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [usuario] = useState(5);
    const [selectedEquipo, setSelectedEquipo] = useState("");
    const { equipos, error, fetchEquipos } = useEquipo(); // Obtiene equipos y error

    // Manejar el evento de agregar planta
    const handleAdd = () => {
        const nuevoProceso = {
            nombre,
            descripcion,
            usuario,
            fkequipo: selectedEquipo,
        };

        console.log("Nuevo proceso agregado:", nuevoProceso);

        if (typeof onAddProceso === 'function') {
            onAddProceso(nuevoProceso); // Verifica que onAddEtapa sea una función
        } else {
            console.error("onAddProceso no es una función válida");
        }

        // Reinicia los estados
        setNombre("");
        setDescripcion("");
        setSelectedEquipo("");
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
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Añadir Proceso</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="Nombre"
                                placeholder="Ingresa el nombre del proceso"
                                variant="bordered"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)} // Maneja el cambio en el input
                            />
                            <Textarea
                                label="Descripción"
                                placeholder="Ingresa la descripción"
                                variant="bordered"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)} // Maneja el cambio en el input
                            />
                            <Select
                                label="Equipo"
                                placeholder="Selecciona un equipo"
                                className="max-w-full"
                                description="Debes seleccionar el equipo al que pertenece"
                                onChange={(e) => setSelectedEquipo(e.target.value)} // Maneja la selección del equipo
                                value={selectedEquipo} // Controla el valor del Select
                            >
                                <SelectSection title="Equipos">
                                    {equipos.map((equipo) => (
                                        <SelectItem key={equipo.id} value={equipo.id}>
                                            {equipo.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectSection>
                            </Select>
                            {error && <p>Error: {error}</p>} {/* Muestra el error si hay uno */}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="secondary" onPress={handleAdd}>
                                Agregar Proceso
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

