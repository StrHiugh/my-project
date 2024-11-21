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

export default function AddProducto({ isOpen, onClose, backdrop, onAddProducto }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [etapaprod, setEtapaprod] = useState("");
    const [usuario] = useState(1);

    // Manejar el evento de agregar planta
    const handleAdd = () => {
        const nuevoProduto = {
            nombre,               // Coincide con la base de datos
            descripcion,          // Coincide con la base de datos
            usuario_id: usuario,  // Cambia `usuario` a `usuario_id`
            fotografia: null,
            etapa: etapaprod,
            valores: [
                {
                    nombre: 'Ph',     // Otro valor estático
                    valorMaximo: null,   // Puede ser null si no aplica
                    valorMinimo: null,   // Puede ser null si no aplica
                }
            ]
        };

        console.log("Nuevo equipo agregado:", nuevoProduto);

        if (typeof onAddProducto === 'function') {
            onAddProducto(nuevoProduto); // Verifica que onAddEtapa sea una función
        } else {
            console.error("onAddProducto no es una función válida");
        }

        // Reinicia los estados
        setNombre("");
        setDescripcion("");
        setEtapaprod("");
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
                        <ModalHeader className="flex flex-col gap-1">Añadir Producto</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="Nombre"
                                placeholder="Ingresa el nombre del producto"
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
                            <Textarea
                                label="Etapa"
                                placeholder="Selecciona la etapa en la que se encuentra"
                                className="max-w-full"
                                variant="bordered"
                                value={etapaprod}
                                onChange={(e) => setEtapaprod(e.target.value)} // Maneja el cambio en el input

                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="secondary" onPress={handleAdd}>
                                Agregar Producto
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

