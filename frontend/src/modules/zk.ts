// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getMerkleProof, isMerkleProofValid, merkelize } from '~modules/mkt2.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { buildBabyjub, buildPoseidon } from 'circomlibjs'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const snarkjs = require('snarkjs')

export async function makeProof(proofInput: any, wasm: string, zkey: string) {
    console.log(wasm)
    const { proof, publicSignals } = await snarkjs.plonk.prove(
        proofInput,
        wasm,
        zkey
    )
    return { proof, publicSignals }
}

export async function buildInput(tokenIds: string[], tokenId: string) {
    const babyjub = await buildBabyjub()
    const poseidon = await buildPoseidon()

    const F = babyjub.F
    const hash = poseidon

    const tokens = tokenIds.sort()
    const m = merkelize(F, hash, tokens, 3)
    const root = m[0]
    const index = tokens.findIndex(r => r === tokenId)
    const mp = getMerkleProof(m, index, 3)
    console.log(isMerkleProofValid(F, hash, index, tokenId, root, mp))

    return {
        key: 2,
        value: '3333',
        root: F.toObject(root).toString(),
        siblings: mp.map((arr: any) => F.toObject(arr).toString())
    }
}
