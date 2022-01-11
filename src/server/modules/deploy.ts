import { TezosToolkit } from '@taquito/taquito'
import { importKey } from '@taquito/signer'
import { testAccount } from './../../shared/constants/testAccount'


export async function deploy() {
  const tezos = new TezosToolkit("https://rpc.hangzhounet.teztnets.xyz")
  await importKey(
    tezos,
    testAccount.email, //почта
    testAccount.password, //пароль
    testAccount.mnemonic.join(' '),
    testAccount.secret //приватный ключ
  )

  try {
    const op = await tezos.contract.originate({
      //код смарт-контракта
      code: `{ parameter int ;
        storage int ;
        code { UNPAIR ; ADD ; NIL operation ; PAIR } }
            `,
      //значение хранилища
      init: `0`,
    })

    //начало развертывания
    console.log('Awaiting confirmation...')
    const contract = await op.contract()
    //отчет о развертывании: количество использованного газа, значение хранилища
    console.log('Gas Used', op.consumedGas)
    console.log('Storage', await contract.storage())
    //хеш операции, по которому можно найти контракт в блокчейн-обозревателе
    console.log('Operation hash:', op.hash)
  } catch (ex) {
    console.error(ex)
  }
}

