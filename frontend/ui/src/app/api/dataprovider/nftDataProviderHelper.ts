import { UseClientReturnType, UseWalletClientReturnType } from "wagmi";
import nftDataProvider from "./nftDataProvider";
import { Helia } from "helia";
import { combineDataProviders, DataProvider } from "react-admin";
import nftHistoryDataProvider from "./nftDataProviderHistory";
import { Routes } from "../routes";

export function transformModelToDashboard<T>(
    model: T, id: number
): T & { id: number }//TODO - how to add a t that extend rarecord
{
    return {
        id,
        ...model
    }
}

export function createDataProvider(
    mapper: Record<string, "0x{string}">,
    publicClient: UseClientReturnType, //TODO - set the appropiate type from public client
    walletClient: UseWalletClientReturnType,
    heliaNode: Helia
): DataProvider 
{
    const usualDataProvider = nftDataProvider(
        mapper,
        publicClient,
        walletClient,
        heliaNode!
    )
    const historyDataProvider = nftHistoryDataProvider(
        mapper,
        publicClient,
        walletClient,
        heliaNode!
    )

    return combineDataProviders(function(resource: string) {
        if([
            Routes.AdminRoute, 
            Routes.DoctorRoute, 
            Routes.PatientRoute, 
            Routes.DrugExposureRoute, 
            Routes.NoteRoute].includes(resource as Routes)
        ){
            return usualDataProvider;
        }
        
        throw new Error(`Unknown resource: ${resource}`);
    });
}    
