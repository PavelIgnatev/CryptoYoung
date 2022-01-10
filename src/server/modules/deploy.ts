import { importKey } from '@taquito/signer';
import { TezosToolkit } from "@taquito/taquito";

export async function deploy() {
  const tezos = new TezosToolkit("https://rpc.hangzhounet.teztnets.xyz");
  await importKey(
    tezos,
    "fywamcgv.mfrzsvqc@teztnets.xyz",
    "6B64TKvuqb",
    [
      "card",
      "ginger",
      "arctic",
      "spice",
      "stumble",
      "damp",
      "avoid",
      "update",
      "domain",
      "oil",
      "buffalo",
      "attitude",
      "armed",
      "mass",
      "town",
    ].join(" "),
    "986f0d53b5c72ce9effc0c62707c90c22fdf5c7c"
  );
  try {
    const op = await tezos.contract.originate({
      //код смарт-контракта
      code: `{ parameter nat ;
        storage nat ;
        code { DUP ; CAR ; SWAP ; CDR ; ADD ; NIL operation ; PAIR } }`,
      //значение хранилища
      init: `0`,
    });

    //начало развертывания
    console.log("Awaiting confirmation...");
    const contract = await op.contract();
    //отчет о развертывании: количество использованного газа, значение хранилища
    console.log("Gas Used", op.consumedGas);
    console.log("Storage", await contract.storage());
    //хеш операции, по которому можно найти контракт в блокчейн-обозревателе
    console.log("Operation hash:", op.hash);
  } catch (ex) {
    console.error(ex);
  }
}
