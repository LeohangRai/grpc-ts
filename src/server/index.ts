import * as grpc from '@grpc/grpc-js';
import { WalletService } from '../pb/wallet_grpc_pb';
import { walletInfo } from '../services/wallet-info';

const server = new grpc.Server();
server.addService(WalletService, {
  walletInfo,
});
server.bindAsync(
  '0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log('Server running at http://127.0.0.1:50051');
  }
);
