import React, { useEffect, useState } from 'react';
import { useTonConnectUI, TonConnectButton } from '@tonconnect/ui-react';

const TonConnectStatus = () => {
  const { wallet, connected, connect, disconnect } = useTonConnectUI();
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (connected) {
      setStatus(`Connected Address: ${wallet?.account.address}`);
    } else {
      setStatus('');
    }
  }, [connected, wallet]);

  return (
    <div>
      {status && <p>{status}</p>}
      {connected ? (
        <button onClick={disconnect}>Disconnect</button>
      ) : (
        <TonConnectButton onClick={connect} />
      )}
    </div>
  );
};

export default TonConnectStatus;
