declare const process: {
    env: {
        API_KEY: string
        API_PROTOCOL: string
        BASE_URL: string
        FIREBASE_APP_ID: string
        FIREBASE_API_KEY: string
        FIREBASE_AUTH_DOMAIN: string
        REACT_APP_FIREBASE_DATABASE: string
        FIREBASE_PROJECT_ID: string
        FIREBASE_STORAGE_BUCKET: string
        FIREBASE_SENDER_ID: string
        FIREBASE_DATABASE: string
        FIREBASE_EMAIL_REDIRECT_URL: string
        API_ENDPOINT: string
        FIREBASE_MEASUREMENT_ID: string
        IS_LOCAL: string
        FIREBASE_FIRESTORE_HOST: string
        FIREBASE_FIRESTORE_PORT: string
        ETH_NETWORK: string
        STORAGE_MNEMONIC_KEY: string
        TOKEN_ADDRESS: string
        INFRA_URL: string
        INFRA_USER: string
    }
}

declare module 'url' {
    interface Url {
        search: string | null | undefined
    }
}
declare module '*.svg' {
    const content: any
    export default content
}

declare module '*.jpg' {
    const content: any
    export default content
}

declare module '*.wasm' {
    const content: any
    export default content
}

declare module '*.zkey' {
    const content: any
    export default content
}

declare module '*.png' {
    const content: any
    export default content
}
