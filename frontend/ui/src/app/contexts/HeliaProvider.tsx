'use client'

import { useEffect, useState, ReactNode } from "react"
import HeliaContext from "./HeliaContext";
import { Helia, createHelia } from "helia";
import { IDBBlockstore } from 'blockstore-idb'


export default function HeliaContextProvider({children}: {children: ReactNode}) {
    const [helia, setHelia] = useState<Helia | null>(null)
    useEffect(() => {
      const init = async () => {
        if (helia) return
        const blockstore = new IDBBlockstore('path/to/blockstore')
        await blockstore.open()
        const heliaNode = await createHelia({blockstore})
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