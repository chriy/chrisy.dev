import localFont from "next/font/local"

// chinese
export const noto = localFont({
    style: 'normal',
    src: '../../public/fonts/noto-sans-variable.woff2',
    variable: '--font-noto-sans-sc',
    display: "swap",
})

// english and number
export const nunito = localFont({
    src: [{
        path: '../../public/fonts/nunito/nunito-normal-variable.woff2',
        style: 'normal',
    }, {
        path: '../../public/fonts/nunito/nunito-italic-variable.woff2',
        style: 'italic',
    }],
    variable: '--font-nunito-en',
    weight: '100 900',
    display: "swap"
})

// mono
export const maple = localFont({
    src: [{
        path: '../../public/fonts/maple-mono/maple-normal-variable.woff2',
        style: 'normal',
    }, {
        path: '../../public/fonts/maple-mono/maple-italic-variable.woff2',
        style: 'italic',
    }],
    variable: '--font-maple-en',
    weight: '100 900',
    display: "swap"
})