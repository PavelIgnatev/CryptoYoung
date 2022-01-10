import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";

const acc = require("../account/acc.json");

export class Call {
  private tezos: TezosToolkit;
  rpcUrl: string;

  constructor(rpcUrl: string) {
    this.tezos = new TezosToolkit(rpcUrl);
    this.rpcUrl = rpcUrl;

    //объявляем параметры с помощью метода fromFundraiser: почту, пароль и мнемоническую фразу, из которой можно получить приватный ключ
    this.tezos.setSignerProvider(
      InMemorySigner.fromFundraiser(
        acc.email,
        acc.password,
        acc.mnemonic.join(" ")
      )
    );
  }

  public add(add: number, contract: string) {
    this.tezos.contract
      .at(contract) //обращаемся к контракту, чтобы получить его точки входа
      .then((contract) => {
        console.log(`Adding ${add} to storage...`);
        //обращаемся к главной функции. В отличие от синтаксиса ligo, главная точка входа называется не main, а default
        return contract.methods.default(add).send();
      })
      .then((op) => {
        console.log(`Awaiting for ${op.hash} to be confirmed...`);
        return op.confirmation(1).then(() => op.hash); //ждем одно подтверждение сети, чтобы быстрее получить результат
      })
      .then((hash) => console.log(`Call done`)) //успешный вызов
      .catch((error) =>
        console.log(`Error: ${JSON.stringify(error, null, 2)}`)
      );
  }
}
