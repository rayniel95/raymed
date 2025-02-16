import { AuthProvider, QueryFunctionContext } from 'react-admin'
import { UseWalletClientReturnType } from 'wagmi';

export function authProvider(
    walletClient: UseWalletClientReturnType,
    isConnected:boolean
): AuthProvider {
    return {
        // send username and password to the auth server and get back credentials
        login: () => Promise.resolve(),
        // when the dataProvider returns an error, check if this is an authentication error
        checkError: () => Promise.resolve(),
        // when the user navigates, make sure that their credentials are still valid
        checkAuth: (params: any & QueryFunctionContext) => {
            console.log(`windows: ${window.location}`)
            if (
                window.location.pathname.includes('create') ||
                window.location.pathname.includes('edit') ||
                window.location.pathname.includes('delete')
            ) {
                
            }
            return Promise.resolve()
        },
        // remove local credentials and notify the auth server that the user logged out
        logout: () => Promise.resolve(),
        // get the user's profile
        getIdentity: () => Promise.reject(),
        // get the user permissions (optional)
        getPermissions: () => Promise.resolve(),
    };
}
