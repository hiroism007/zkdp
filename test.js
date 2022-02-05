import * as fs from "fs";
import { buildPoseidon, buildBabyjub } from "circomlibjs";
import { merkelize, getMerkleProof, isMerkleProofValid } from "./lib/mkt2.js";

async function main() {
  const babyjub = await buildBabyjub();
  const poseidon = await buildPoseidon();

  const F = babyjub.F;
  const hash = poseidon;

  const m = merkelize(F, hash, [11, 22, 33, 44, 55, 66, 77, 88], 3);
  const root = m[0];
  const mp = getMerkleProof(m, 2, 3);

  console.log(isMerkleProofValid(F, hash, 2, 33, root, mp));

  const input = {
    key: 2,
    value: 33,
    root: F.toObject(root).toString(),
    siblings: mp.map((arr) => F.toObject(arr).toString()),
  };

  fs.writeFileSync("./input.json", JSON.stringify(input), "utf-8");
}

main()
  .then(() => {})
  .catch((e) => console.log(e));
