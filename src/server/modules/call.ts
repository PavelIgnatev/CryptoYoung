import { testAccount } from './../../shared/constants/testAccount';
import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from '@taquito/signer'

export const acc = testAccount;
export class Call {
    private tezos: TezosToolkit;
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.tezos = new TezosToolkit(rpcUrl);
        this.rpcUrl = rpcUrl;

        this.tezos.setSignerProvider(InMemorySigner.fromFundraiser(acc.email, acc.password, acc.mnemonic.join(' ')));
    }

    //объявляем метод getBalance с входящим параметром address
    public getBalance(address: string): void {
        //Taquito отправляет узлу запрос баланса указанного адреса. Если узел исполнил запрос, скрипт выводит полученное значение в консоль. Если произошла ошибка — выдает «Address not found»
        this.tezos.rpc
            .getBalance(address)
            .then((balance) => console.log(balance))
            .catch((e) => console.log('Address not found'))
    }

    public add(add: number, contract: string) {
        this.tezos.contract
            .at(contract) //обращаемся к контракту, чтобы получить его точки входа
            .then((contract) => {
                console.log(`Adding ${add} to storage...`)
                //обращаемся к главной функции. В отличие от синтаксиса ligo, главная точка входа называется не main, а default
                return contract.methods.default(add).send()
            })
            .then((op) => {
                console.log(`Awaiting for ${op.hash} to be confirmed...`)
                return op.confirmation(1).then(() => op.hash) //ждем одно подтверждение сети, чтобы быстрее получить результат
            })
            .then((hash) => console.log(`Call done}`)) //успешный вызов
            .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`))
    }

    public async main() { }
}
