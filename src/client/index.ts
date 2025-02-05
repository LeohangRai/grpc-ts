import * as grpc from '@grpc/grpc-js';
import { WalletClient } from '../pb/wallet_grpc_pb';
import { WalletInfoRequest } from '../pb/wallet_pb';

const client = new WalletClient(
  'localhost:50051',
  grpc.credentials.createInsecure()
);
const request = new WalletInfoRequest();
request.setAddress('0x1234567890abcdef');
client.walletInfo(request, (error, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('total', response.getTotal());
    console.log('available', response.getAvailable());
    const transactions = response
      .getTransactionsList()
      .map((transaction) => transaction.toObject());
    console.log('transactions', transactions);
  }
});
