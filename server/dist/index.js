"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeProof = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import * as fs from 'fs'
const path_1 = __importDefault(require("path"));
const snarkjs = require('snarkjs');
const verificationKey = require(path_1.default.join(__dirname, './public/verification_key.json'));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
function makeProof(proofInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const { proof, publicSignals } = yield snarkjs.plonk.prove(proofInput, `${path_1.default.join(__dirname, './public')}/circuit.wasm`, `${path_1.default.join(__dirname, './public')}/circuit_final.zkey`);
        return { proof, publicSignals };
    });
}
exports.makeProof = makeProof;
app.post('/proof', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p = yield makeProof(req.body.input);
        res.json(p);
    }
    catch (e) {
        res.json({ message: 'not ok' });
    }
}));
app.post('/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { publicSignals, proof } = req.body;
        const result = yield snarkjs.plonk.verify(verificationKey, publicSignals.default, proof);
        res.json({ result });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ meesage: 'error' });
    }
}));
app.listen(8080, () => console.log('Serving at http://localhost:8080!'));
//# sourceMappingURL=index.js.map