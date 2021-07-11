const crypto = require('crypto');
const fs = require('fs');

const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const key = ec.genKeyPair()
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex')

console.log('');
    
    // console.log('PublicKey', publicKey)
    
    console.log('');
    
    // console.log('PrivateKey', privateKey);

    console.log(ec.keyFromPrivate('d8817da28d620c98e12ffd79da7ada816838586957432317c2ab6f775ce9a371').getPublic('hex'))


/*
PublicKey 0412dc012093c1f9e32860e7c8fadc0ea92b6fc1178ce7c0f12af3ea35fc4bb5c4d79a7dc55c98166dcd6a2d86a33e61fe99776f123ebbbac818aa5c7d85b25745

PrivateKey d8817da28d620c98e12ffd79da7ada816838586957432317c2ab6f775ce9a371
 */


return 

const usingCryptoModule=()=>{
    const {publicKey,privateKey} = crypto.generateKeyPairSync(
        "rsa",
        {
          modulusLength: 2048, // It holds a number. It is the key size in bits and is applicable for RSA, and DSA algorithm only.
          publicKeyEncoding: {
            type: "pkcs1", //Note the type is pkcs1 not spki
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1", //Note again the type is set to pkcs1
            format: 'pem',
            // cipher: "aes-256-cbc", //Optional
            //passphrase: "", //Optional
          },
        })
    
    
    console.log('');
    
    // console.log('PublicKey', publicKey.toString('hex'))
    
    console.log('');
    
    // console.log('PrivateKey', privateKey.toString('base64'));
    
    // fs.writeFileSync('./private.pem',privateKey)
    // fs.writeFileSync('./public.pem',publicKey)
    
    // return
    // Create Transmitted Signature
    const sign = crypto.createSign('RSA-SHA256');
    sign.update('abcdef');  // data from your file would go here
    
    const sig = sign.sign(fs.readFileSync('./private.pem'), 'hex');
    console.log(sig);
    
    // Verifying Signature
    const verify = crypto.createVerify('RSA-SHA256');
    verify.write('abcdef');
    verify.end();
    console.log(verify.verify(fs.readFileSync('./public.pem'), sig,'hex'));
}

/*
PublicKey -----BEGIN RSA PUBLIC KEY-----MIIBCgKCAQEAvKTdMS0FV3QR1EaEAWLEnhTWU+Z8z9zI1cu/oS9pAKvCbTRRcGMceyhp1LVapd6uDzrWenlypL153y5jxmtxTNXxaAPETZkhxN8xQvXsX/BVimE3APDGXLzgjb+DXHv4tu8qioE7fVv4demXqMHjNPJyp7TVvELZ+Yn8LqktbZkZtTBOzZJMQDvL6o+gVPYDhwy4qIv91Rsm1HzCWvhIL9Wup4mBkrkuZWHKQe5UYcXJDWs5g2s4UmYdbmGaaMEkDGQwfDXV7sF1SzEljlKsCBVQXX3or/XZBqeAneQrZt++JZCfXkJHP2DxuPb7+0UbcS1pFqpBqxxqqll0583JLQIDAQAB-----END RSA PUBLIC KEY-----
-----END RSA PUBLIC KEY-----


PrivateKey 
-----BEGIN RSA PRIVATE KEY-----MIIEpAIBAAKCAQEAvKTdMS0FV3QR1EaEAWLEnhTWU+Z8z9zI1cu/oS9pAKvCbTRRcGMceyhp1LVapd6uDzrWenlypL153y5jxmtxTNXxaAPETZkhxN8xQvXsX/BVimE3APDGXLzgjb+DXHv4tu8qioE7fVv4demXqMHjNPJyp7TVvELZ+Yn8LqktbZkZtTBOzZJMQDvL6o+gVPYDhwy4qIv91Rsm1HzCWvhIL9Wup4mBkrkuZWHKQe5UYcXJDWs5g2s4UmYdbmGaaMEkDGQwfDXV7sF1SzEljlKsCBVQXX3or/XZBqeAneQrZt++JZCfXkJHP2DxuPb+0UbcS1pFqpBqxxqqll0583JLQIDAQABAoIBAQCFJpEBztdAXSrgfE1cdQx20Bpf6gYa6anQThoaeU5SLOn1DsKU40ANJf9dJgyvmzechFky5VooMZ0+DI5cVSYJp9DXLCF47CdLwIYSz2ZiaU7Xd7rNLSW1+5M8OftMYiyxYqrSTFljKHF9OL3VXdUzYBXRjfB3C3Czk9OuU7c+7WTAbpwD7nhffiZVlnqIcb0qvgwcYJvLWXmGaFy8QELDXISrDdlCxYEP0+MtqXb+1cN70iPVwc8n5Pys3b5z1pbzf/HlqOkya29p8s6b13BhEaweP8gphJKgX1CvF3uDi04qWCH93e9qDb7NoKFHnQRKTSe3mEas+9I0P55qGC5BAoGBAOoih1iuc1AD/rRTxOdOiAo34H3ArE6QMB3KZOlzu+4GSIM0UnRwGAqmoZ8mqUlxTPOxOunvOPz3vgRhytOWBSfe+kNUf2Ar2/JYPwnj6i62oe3WEf78uvOlMYWjPFKCK8c3N/B7/5zjwpD1LQChoy2WZpyqOTF1qazxlGyS2m4FAoGBAM5CyID1xFhHq1sm14+2gORPV9iETIH9If708TC0g9khJ4/i/dN/uJ3VMSjfipIMkgMedmtzF71/W8dEEoN5fAFvMvmvyy+w9ljv2z+zXLj+9T5KqCUE8ZQUEjzSkK2FmWFHGhb4fG9oaxfzFlOKm74QsY7pn/KHDW0FoRnayS8JAoGAbPAl42g/9QH217aGTk1m1MJM7JXiVieWi7XpIAoebdB0mr+UgeLJ/OKtHpzhdW+HK3fR/pi0/lbTDbzmn24U\9gk0jnFZVsjxbKAMrLBjNozG7NX6jlzTvwUv6ZE4er5LZcOqxE2zKvYkpPRHZMXlpV9JvW46L9jdDlvItltUnUCgYA1UUQdOeqYW2ZrOJ4uUyH8Ypo1qPVSAMpB6rVSPsd6YDym0CmG+5QQkKSViTt7x24TClPYMLcpT/u8hdc3TzcD8+e8bXnbiSYVFWOaktXcKGPix0+xyhZcjdetC01E3a0pXUTcPT2FWvucBEV4MPNTbWNIqxGiktCgpvze/xRUaQKBgQC2E3xlijXp/jeFLahLpqrHKLHrnVlcM630tWvKE2Z+EQosHkGo6pmTuPL4tR2ZmrHAply6I4nHM24eMM6pV9T5oug3NoDNXdK7MKcSTioX/GzbHPZjB94SpPagYSaVzVjsmOuYF3VR9PAvtPMaNb+vBFlP8rImkmp1PVu8/MK6RQ==-----END RSA PRIVATE KEY-----
*/


