import { Layout } from 'react-admin';
import WalletConnectAppBar from '@/app/components/WalletConnectAppBar';


export default function WalletConnectLayout({ children }: any){
    return (
        <Layout appBar={WalletConnectAppBar}>
            {children}
        </Layout>
    );
}