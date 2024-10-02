import { AppBar } from 'react-admin';
import { ConnectButton } from '@rainbow-me/rainbowkit';

//TODO - change the color of the connect button to something more visual affordable
export default function WalletConnectAppBar() {
    return <AppBar color="primary" userMenu={<ConnectButton/>}/>;
}

