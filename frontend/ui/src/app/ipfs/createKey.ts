import {pinata} from './config';

export async function createKey() {
    try {
      const uuid = crypto.randomUUID();
      const keyData = await pinata.keys.create({
        keyName: uuid.toString(),
        permissions: {
          admin: false,
          endpoints: {
            data:{
              pinList: false,
              userPinnedDataTotal: false,
            },
            pinning: {
              hashMetadata: true,
              hashPinPolicy: false,
              pinByHash: true,
              pinFileToIPFS: true,
              pinJSONToIPFS: true,
              pinJobs: false,
              unpin: false,
              userPinPolicy: false,
            },
          },
        },
        maxUses: 1,
      })
      return keyData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  