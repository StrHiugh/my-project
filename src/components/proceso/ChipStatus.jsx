import {Chip} from "@nextui-org/react";
import {CheckIcon} from "lucide-react";

function ChipStatus({estatus}) {
    return (
        <Chip
            startContent={<CheckIcon size={18}/>}
            variant="shadow"
            color={estatus === 1 ? "success" : "danger"}
            size="lg"
            style={{
                padding: "21px",
                height: "40px",
                fontSize: "18px",
            }}
        >
            {estatus === 1 ? "Activo" : "Desactivado"}
        </Chip>
    );
}

export default ChipStatus;
