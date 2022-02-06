import express from 'express'
import cors from 'cors'
// import * as fs from 'fs'
import path from "path"
const snarkjs = require('snarkjs')
const verificationKey = require(path.join(__dirname, './public/verification_key.json'));

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))

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
        res.json({ result })
    } catch (e) {
        console.error(e);
        res.status(500).json({ meesage: 'error'})
    }
})

app.listen(8080, () => console.log('Serving at http://localhost:8080!'))
