import siteConfig from "../config/siteConfig";


export default function Custom404() {
    return <h1>404 - Page Not Found</h1>
}

export async function getStaticProps() {
    const config = await siteConfig();
    return {
        props: {
            siteConfig: config,
        },
    }
}
