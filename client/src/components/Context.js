import { createContext, useState } from "react";
const EquipmentsContext = createContext()

const EquipmentsProvider = ({ children }) => {
    const [equipments, setEquipments] = useState([]);
    const addEquipment = (newEquipment) => {
        setEquipments([...equipments, newEquipment]);
    }

    return (
        <div>
            <EquipmentsContext.Provider value={{equipments, setEquipments, addEquipment}}>
                {children}
            </EquipmentsContext.Provider>
        </div>
    )
}

export {EquipmentsContext, EquipmentsProvider}
