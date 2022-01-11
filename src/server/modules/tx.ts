import { TezosToolkit } from '@taquito/taquito'
//импортируем inMemorySigner. Он сохранит приватный ключ в оперативной памяти и будет подписывать им транзакции
import { InMemorySigner } from '@taquito/signer'
//объявляем константу acc, которая направит скрипт к файлу acc.json
import { testAccount } from './../../shared/constants/testAccount'

const acc = testAccount
export class Tx {
  private tezos: TezosToolkit
  rpcUrl: string
  constructor(rpcUrl: string) {
    this.tezos = new TezosToolkit(rpcUrl)
    this.rpcUrl = rpcUrl

    //объявляем параметры с помощью метода fromFundraiser: почту, пароль и мнемоническую фразу, из которой можно получить приватный ключ
    this.tezos.setSignerProvider(InMemorySigner.fromFundraiser(acc.email, acc.password, acc.mnemonic.join(' ')))
  }
  //получаем публичный и приватный ключи и активируем аккаунт
  public async activateAccount() {
    const { pkh, secret } = acc
    try {
      const operation = await this.tezos.tz.activate(pkh, secret)
      await operation.confirmation()
    } catch (e) {
      console.log(e)
    }
  }
  public async main() {}
}