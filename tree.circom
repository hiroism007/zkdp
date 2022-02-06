pragma circom 2.0.3;

include "../circomlib/circuits/switcher.circom";
include "../circomlib/circuits/poseidon.circom";
include "../circomlib/circuits/bitify.circom";

template Mkt2VerifierLevel() {
    signal input sibling;
    signal input low;
    signal input selector;
    signal output root;

    component sw = Switcher();
    component hash = Poseidon(2);

    sw.sel <== selector;
    sw.L <== low;
    sw.R <== sibling;
    hash.inputs[0] <== sw.outL;
    hash.inputs[1] <== sw.outR;

    root <== hash.out;
}

template Mkt2Verifier(nLevels) {

    signal input key;
    signal input value;
    signal input root;
    signal input siblings[nLevels];

    component n2b = Num2Bits(nLevels);
    component levels[nLevels];

    component hashV = Poseidon(1);

    hashV.inputs[0] <== value;

    n2b.in <== key;

    for (var i=nLevels-1; i != -1; i--) {
        levels[i] = Mkt2VerifierLevel();
        levels[i].sibling <== siblings[i];
        levels[i].selector <== n2b.out[i];
        if (i==nLevels-1) {
            levels[i].low <== hashV.out;
        } else {
            levels[i].low <== levels[i+1].root;
        }
    }

    root === levels[0].root;
}