import { token_transfer } from './token-transfer'

const RPC_URL = "https://rpc.hangzhounet.teztnets.xyz"
const CONTRACT = 'KT1NhSUb7LtGvKWYgg8X19J92oPJeVVHkhBp' //адрес опубликованного контракта
const SENDER = 'tz1TT6GY1ijLbZf2kFTbmrYWw3PcxMLjDHxh' //публичный адрес отправителя — возьмите его из acc.json
const RECEIVER = 'tz1bMNT5SgZjCvY2qSwcKEEMwCN1DLWsLa2K' //публичный адрес получателя — возьмите его из кошелька Tezos, который вы создали
const AMOUNT = 3 //количество токенов для отправки. Можете ввести другое число
new token_transfer(RPC_URL).transfer(CONTRACT, SENDER, RECEIVER, AMOUNT)