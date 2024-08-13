// Importación de useContext desde React
import { useContext } from "react";

// Importación del contexto FlyProvider
import FlyContext from "../context/FlyProvider";

// Hook personalizado para acceder al contexto FlyProvider
const useFly = () => {
    return useContext(FlyContext);
};
 
export default useFly;