import { createContext } from "react";
import { Helia } from "helia";


const HeliaContext = createContext<Helia | null>(null)

export default HeliaContext;
