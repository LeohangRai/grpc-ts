import {
  ServerErrorResponse,
  ServerUnaryCall,
  sendUnaryData,
} from '@grpc/grpc-js';
import {
  Transaction,
  WalletInfoRequest,
  WalletInfoResponse,
} from '../pb/wallet_pb';

export async function walletInfo(
  call: ServerUnaryCall<WalletInfoRequest, WalletInfoResponse>,
  callback: sendUnaryData<WalletInfoResponse>
) {
  try {
    const total = 100;
    const available = 80;
    const transactionPOJOs: Transaction.AsObject[] = [
      {
        toAddress: '0x1234567890',
        points: 10,
        metadata: '',
      },
      {
        toAddress: '0x0987654321',
        points: 20,
        metadata: '',
      },
    ];
    const transactionsList: Transaction[] = transactionPOJOs.map(
      ({ toAddress, points, metadata }) => {
        const t = new Transaction();
        t.setToAddress(toAddress);
        t.setPoints(points);
        t.setMetadata(metadata);
        return t;
      }
    );
    const response = new WalletInfoResponse();
    response.setTotal(total);
    response.setAvailable(available);
    response.setTransactionsList(transactionsList);
    callback(null, response);
  } catch (err) {
    callback(err as ServerErrorResponse, null);
  }
}
