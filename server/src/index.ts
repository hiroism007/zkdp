import express from 'express'
import cors from 'cors'
// import * as fs from 'fs'
import path from "path"
const snarkjs = require('snarkjs')
const verificationKey = require(path.join(__dirname, './public/verification_key.json'));

import axios from "axios";
const aesCmac = require('node-aes-cmac').aesCmac;


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))

function generateRandomTag(secret: string) {
    let key = Buffer.from(secret, 'hex')
    const date = Math.floor(Date.now() / 1000);
    const dateDate = Buffer.allocUnsafe(4);
    dateDate.writeUInt32LE(date);
    const message = Buffer.from(dateDate.slice(1, 4));

    return aesCmac(key, message);
}

let wm2cmd = async () => {
    let sesame_id = process.env.ID
    let key_secret_hex = process.env.API_KEY
    let cmd = 88
    let base64_history = Buffer.from("test2").toString('base64');

    let sign = generateRandomTag(key_secret_hex)
    let afterCmd = await axios({
        method: 'post',
        url: `https://app.candyhouse.co/api/sesame2/${sesame_id}/cmd`,
        headers: {'x-api-key': `0Hm43tjfwTUETGetietryzkj`},
        data: {
            cmd: cmd,
            history: base64_history,
            sign: sign
        }
    })
    return afterCmd
};

export async function makeProof(proofInput: any) {

    const { proof, publicSignals } = await snarkjs.plonk.prove(
        proofInput,
        `${path.join(__dirname, './public')}/circuit.wasm`,
        `${path.join(__dirname, './public')}/circuit_final.zkey`
    )
    return { proof, publicSignals }
}


app.post('/proof', async (req,res) => {
    try {
        const p = await makeProof(
            req.body.input
        )
        res.json(p)
    } catch (e) {
        res.json({ message: 'not ok'})
    }
})

app.post('/verify', async(req, res) => {
    try {
        const { publicSignals, proof } = req.body
        const result = await snarkjs.plonk.verify(verificationKey, publicSignals.default, proof);
        // if (result) {
        //     await wm2cmd();
        // }
        res.json({ result })
    } catch (e) {
        console.error(e);
        res.status(500).json({ meesage: 'error'})
    }
})


app.listen(8080, () => console.log('Serving at http://localhost:8080!'))
