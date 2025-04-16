import "../app/styles/components/textPages.css";
import Image from "next/image";

// SEO: Pages metadata
import pagesMetaData from "../utils/pagesMetaData";
import PagesMetaData from "../components/PagesMetaData";

export default function About({ metadata }) {
    return (
        <>
            <PagesMetaData metadata={metadata} />
            <main className="textPage">
                <h1>About Us</h1>
                
                <p>IN THE KNOW YYC is a reporting platform that informs technology & business owners, employees and enthusiasts of the popular tech and business events being held in Calgary. Updates are currently posted weekly and monthly. </p>
                
                <h2>Debbie Butt: Editor in Chief</h2>
                <p>
                    <Image src={'/images/about/debbie-butt-small.png'} width={206} height={212} alt="Debbie Butt" />
                </p>
                <p>Accountant by day, Community Builder & Technology Enthusiast by night, Debbie does a little bit of everything. </p>
                <p>In her spare time she works tirelessly to track down all of Calgary&apos;s most relevant and exciting Tech & Business events and news. Placing her findings at the fingertips of the rapidly growing &quot;In the Know YYC Community.&quot; Join today by clicking &quot;Subscribe&quot; on the landing page.</p>
                <p>Debbie has earned her credibility as a Tech & Business Event Reporter by participating in hundreds of technology and business events over the last 4 years. Her passion is communicating to interested parties the value and benefits in attending these events.</p>
            </main>
        </>
    );
};

export async function getServerSideProps() {
    const metadata = await pagesMetaData('about')
    return { props: { metadata } };
}