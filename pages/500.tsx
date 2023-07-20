import siteConfig from "../config/siteConfig";


export default function Custom500() {
    return <h1>500 - Server-side error occurred</h1>
}

export async function getStaticProps() {
    const config = await siteConfig();
    return {
        props: {
            siteConfig: config,
        },
    }
}
