import { HttpError } from "react-admin";

function isWalletConnected(): boolean {
    // Check if the ethereum object exists
    if (typeof window.ethereum === 'undefined') {
        console.log('No web3 provider detected');
        return false;
    }

    // Attempt to request accounts
    return window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: any) => {
            if (accounts.length > 0) {
                console.log('Wallet is connected');
                return true;
            } else {
                console.log('No accounts found');
                return false;
            }
        })
        .catch((error: any) => {
            console.error('Error:', error);
            return false;
        });
}

export function checkWalletConnection(){
    if(!isWalletConnected()){
        console.log("some text here")
        throw new HttpError(
            "You need to connect the wallet to create a new record",
            401,
            "Unauthorized"
        )
    }
}