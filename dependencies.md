This document allows to track, explain and maintain the dependencies we have defined in package.json.

### Direct Dependencies

| library name (what).   | description of its usage (why) | ideal frequency of update (when) / status |
|------------------------|--------------------------------|----------------------------------|
|@celo/contractkit       | Celo coin integration          | monthly                          |
|@celo/wallet-base       | Celo coin integration          | monthly                          |
|@celo/wallet-ledger     | Celo coin integration          | monthly                          |
|@cosmjs/crypto          | Cosmos coin integration        | monthly                          |
|@cosmjs/ledger-amino    | Cosmos coin integration        | monthly                          |
|@cosmjs/proto-signing   | Cosmos coin integration        | monthly                          |
|@cosmjs/stargate        | Cosmos coin integration        | monthly                          |
|@crypto-com/chain-jslib | Crypto.com coin integration    | monthly                          |
|@ethereumjs/common      | Ethereum coin integration      | monthly                          |
|@ethereumjs/tx          | Ethereum coin integration      | monthly                          |
|@ledgerhq/compressjs    | used for LiveQR feature        | stable                           |
|@ledgerhq/cryptoassets  | crypto currencies and tokens   | weekly                           |
|@ledgerhq/devices       | devices data                   | weekly                           |
|@ledgerhq/errors        | errors defintion               | weekly                           |
|@ledgerhq/hw-app-algorand| Algorand coin integration     | weekly                           |
|@ledgerhq/hw-app-btc    | Bitcoin coin integration       | weekly                           |
|@ledgerhq/hw-app-cosmos | Cosmos coin integration        | weekly                           |
|@ledgerhq/hw-app-eth    | Ethereum coin integration      | weekly                           |
|@ledgerhq/hw-app-polkadot| Polkadot coin integration     | weekly                           |
|@ledgerhq/hw-app-solana | Solana coin integration        | weekly                           |
|@ledgerhq/hw-app-str    | Ethereum coin integration      | weekly                           |
|@ledgerhq/hw-app-tezos  | Tezos coin integration         | weekly                           |
|@ledgerhq/hw-app-trx    | TRON coin integration          | weekly                           |
|@ledgerhq/hw-app-xrp    | XRP coin integration           | weekly                           |
|@ledgerhq/hw-transport  | device communication           | weekly                           |
|@ledgerhq/hw-transport-mocker| used by tests             | weekly                           |
|@ledgerhq/hw-transport-node-speculos| used by bot tests  | weekly                               |
|@ledgerhq/json-bignumber| workaround for Ledger explorers who don't give String in some API | stable                               |
|@ledgerhq/live-app-sdk  | utils for live apps feature    | ???                              |
|@ledgerhq/logs          | logs                           | weekly                           |
|@polkadot/types         | Polkadot coin integration      | **BLOCKED BY LLM (ticket missing)**                               |
|@polkadot/types-known   | Polkadot coin integration      | **BLOCKED BY LLM (ticket missing)**                               |
|@solana/spl-token       | Solana coin integration        | monthly                          |
|@solana/web3.js         | Solana coin integration        | monthly                          |
|@taquito/ledger-signer  | Tezos coin integration         | **BLOCKED BY LLM (ticket missing)**                               |
|@taquito/taquito        | Tezos coin integration         | **BLOCKED BY LLM (ticket missing)**                               |
|@types/bchaddrjs        | Bitcoin coin integration       | monthly                          |
|@types/bs58check        | Bitcoin coin integration       | monthly                          |
|@walletconnect/client   | Wallet connect feature         | monthly                          |
|@xstate/react           | used for some components       | TBD DEPRECATE?                   |
|@zondax/ledger-filecoin | Filecoin coin integration      | monthly                          |
|algosdk                 | Algorand coin integration      | monthly                          |
|async                   | ???                            | UNCLEAR IF USED                  |
|axios                   | network                        | monthly                          |
|axios-retry             | network                        | monthly                          |
|base32-decode           | Filecoin coin integration      | monthly                          |
|bchaddrjs               | Bitcoin coin integration       | monthly                          |
|bech32                  | Bitcoin coin integration       | BLOCKED? TBD                     |
|bignumber.js            | many parts involving amounts   | monthly                          |
|bip32                   | coin integrations              | monthly                          |
|bip32-path              | coin integrations              | monthly                          |
|bip39                   | needed for bot                 | monthly                          |
|bitcoinjs-lib           | Bitcoin coin integration       | monthly                          |
|blake-hash              | Bitcoin coin integration       | monthly                          |
|bs58                    | Bitcoin coin integration       | monthly                          |
|bs58check               | Bitcoin coin integration       | monthly                          |
|buffer                  | many parts for bytes ops       | monthly                          |
|cashaddrjs              | Bitcoin coin integration       | monthly                          |
|cbor                    | Filecoin coin integration      | monthly                          |
|coininfo                | Bitcoin coin integration       | monthly                          |
|crypto-js               | NEO coin integration           | monthly                          |
|eip55                   | Ethereum coin integration      | monthly                          |
|eth-sig-util            | Ethereum coin integration      | monthly                          |
|ethereumjs-abi          | Ethereum coin integration      | monthly                          |
|ethereumjs-util         | Ethereum coin integration      | monthly                          |
|expect                  | Tests                          | monthly                          |
|generic-pool            | Bitcoin coin integration       | monthly                          |
|invariant               | generic helper                 | monthly                          |
|isomorphic-ws           | WebSocket helper               | monthly                          |
|json-rpc-2.0            | Ethereum coin integration      | monthly                          |
|leb128                  | Filecoin coin integration      | monthly                          |
|lodash                  | generic helper                 | monthly                          |
|lru-cache               | generic helper                 | monthly                          |
|numeral                 | for very concise amount display (on graph) | monthly – **TBD if can be dropped**                          |
|object-hash             | Solana coin integration        | monthly                          |
|performance-now         | bot                            | monthly – may not strongly need  |
|prando                  | account mocks                  | stable – try not to upgrade to not change the mock data too often  |
|redux                   | general react helper           | monthly                          |
|reselect                | general react helper           | monthly                          |
|ripemd160               | Bitcoin coin integration       | monthly                          |
|ripple-binary-codec     | XRP coin integration           | monthly                          |
|ripple-bs58check        | XRP coin integration           | monthly                          |
|ripple-lib              | XRP coin integration           | monthly                          |
|rlp                     | Ethereum coin integration      | monthly                          |
|rxjs                    | generic helper                 | BLOCKED by issue revealed when trying to upgrade. **ticket missing**                          |
|rxjs-compat             | generic helper                 | BLOCKED by issue revealed when trying to upgrade. **ticket missing**                               |
|secp256k1               | Bitcoin coin integration       | monthly                          |
|semver                  | generic helper                 | monthly                          |
|sha.js                  | generic helper for crypto      | monthly                          |
|stellar-sdk             | Stellar coin integration       | monthly                          |
|triple-beam             | logs                           | monthly                          |
|winston                 | logs                           | monthly                          |
|xstate                  | generic helper for React       | **TBD why it's needed.**         |
|zcash-bitcore-lib       | Bitcoin coin integration       | monthly                          |
