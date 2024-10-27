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
import {usePlanta} from "../composables/usePlanta.jsx";
import {useProducto} from "../composables/useProducto.jsx";

export default function AddEquipo({ isOpen, onClose, backdrop, onAddEquipo }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [usuario] = useState(5);
    const [selectedPlanta, setSelectedPlanta] = useState("");
    const [selectedProducto, setSelectedProducto] = useState("");
    const { plantas, error, fetchPlantas } = usePlanta(); // Obtiene equipos y error
    const { productos, fetchProducto } = useProducto(); // Obtiene equipos y error

    // Manejar el evento de agregar planta
    const handleAdd = () => {
        const nuevoEquipo = {
            nombre,
            descripcion,
            usuario,
            fkplanta: selectedPlanta,
            fkproducto: selectedProducto,
        };

        console.log("Nuevo equipo agregado:", nuevoEquipo);

        if (typeof onAddEquipo === 'function') {
            onAddEquipo(nuevoEquipo); // Verifica que onAddEtapa sea una función
        } else {
            console.error("onAddEquipo no es una función válida");
        }

        // Reinicia los estados
        setNombre("");
        setDescripcion("");
        setSelectedPlanta("");
        setSelectedProducto("");
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
                        <ModalHeader className="flex flex-col gap-1">Añadir Equipo</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="Nombre"
                                placeholder="Ingresa el nombre del equipo"
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
                                label="Planta"
                                placeholder="Selecciona una planta"
                                className="max-w-full"
                                onChange={(e) => setSelectedPlanta(e.target.value)} // Maneja la selección del equipo
                                value={selectedPlanta} // Controla el valor del Select
                            >
                                <SelectSection title="Equipos">
                                    {plantas.map((planta) => (
                                        <SelectItem key={planta.id} value={planta.id}>
                                            {planta.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectSection>
                            </Select>
                            {error && <p>Error: {error}</p>} {/* Muestra el error si hay uno */}

                            <Select
                                label="Producto"
                                placeholder="Selecciona un producto"
                                className="max-w-full"
                                onChange={(e) => setSelectedProducto(e.target.value)} // Maneja la selección del equipo
                                value={selectedProducto} // Controla el valor del Select
                            >
                                <SelectSection title="Equipos">
                                    {productos.map((producto) => (
                                        <SelectItem key={producto.id} value={producto.id}>
                                            {producto.nombre}
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
                                Agregar Equipo
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

