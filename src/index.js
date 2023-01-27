import * as Mnemonic from 'bitcore-mnemonic';
import * as bip39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import * as util from 'ethereumjs-util';
import * as CryptoJS from 'crypto-js';
import * as Web3 from 'web3';

// var phrase = new Mnemonic().phrase;

// PRIMERA VEZ
// var seeds = 'dentist cactus cool relief glow distance mosquito sing piano denial lucky return';
// var password = 'password';

// var ciphertext = CryptoJS.AES.encrypt(seeds, password).toString();

// console.log(12, ciphertext);

// var seeds = window.localStorage.setItem('cipherseeds', ciphertext);

// SIGUIENTES VECES
var ciphertext = window.localStorage.getItem('cipherseeds');
var password = 'password';

var seeds = CryptoJS.AES.decrypt(ciphertext, password).toString(CryptoJS.enc.Utf8);

console.log(0, seeds);

// window.localStorage.setItem('seeds', seeds);

var mnemonic = new Mnemonic(seeds);

console.log(1, mnemonic);

bip39.mnemonicToSeed(mnemonic.toString()).then(seed => {

    console.log(2, seed);

    var path = "m/44'/60'/0'/0/0";
    var wallet = hdkey.fromMasterSeed(seed).derivePath(path).getWallet();

    console.log(3, wallet);

    var privateKey = wallet.getPrivateKey();

    console.log(5, privateKey);

    var publicKey = util.privateToPublic(privateKey);

    console.log(6, publicKey);

    var address = '0x' + util.pubToAddress(publicKey).toString('hex');

    console.log(7, address);

    console.log(8, util.isValidAddress('0x4C9941821d3F83C1D2f2E642333D40Ee98'));

    console.log(9, util.isValidPrivate(privateKey));

    console.log(10, util.isValidPublic(publicKey));

});

window.addEventListener('load', async () => {

    if (window.ethereum == undefined) {
        return alert('Instala Metamask');
    }

    var web3 = new Web3(); // window.ethereum);

    web3.setProvider(
        new web3.providers.HttpProvider('https://celo-mainnet.infura.io/v3/87388b2cafcd4bcdbb26947767a1869f')
    );

    console.log(13, web3);

     web3.eth.getBalance('0xD1AA1f9df3F069e77644c26D7a3457A5F04376A3', (err, result) => {

        var balance = web3.utils.fromWei(result, 'ether');

        console.log(14, balance);

    });

     console.log("Gas Price:");
    await web3.eth.getGasPrice().then(console.log);

    });