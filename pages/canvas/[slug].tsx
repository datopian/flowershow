import { useRouter } from "next/router";
import React from "react";

const Page = () => {
    const router = useRouter();
    const slug = router.query.slug;
    return (
        <>
            <div>
                <img src={`/canvasSvgs/${slug}.svg`} alt="My SVG Image" />
            </div>
        </>
    );
};

export default Page;