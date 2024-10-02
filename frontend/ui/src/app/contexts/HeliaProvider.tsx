import { useEffect, useState, ReactNode } from "react"
import HeliaContext from "./HeliaContext";
import { Helia, createHelia } from "helia";


export default function HeliaContextProvider({children}: {children: ReactNode}) {
    const [helia, setHelia] = useState<Helia | null>(null)
    //TODO - move helia loading to an upper component to avoid re-renders when the wallet is connected
    useEffect(() => {
      const init = async () => {
        if (helia) return
        const heliaNode = await createHelia()
        setHelia(heliaNode)
      }
      init()
    }, [helia])
  
    // if (!helia) {
    //   //TODO - add a loading screen
    //   return <div>Loading...</div>
    // }
    return (
      <HeliaContext.Provider value={helia}>
        {children}
      </HeliaContext.Provider>
    )
}