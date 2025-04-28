import "../app/styles/components/textPages.css";
import Image from "next/image";
import Link from "next/link";

// SEO: Pages metadata
import pagesMetaData from "../utils/pagesMetaData";
import PagesMetaData from "../components/PagesMetaData";

export default function About({ metadata }) {
    return (
        <>
            <PagesMetaData metadata={metadata} />
            <main className="textPage">
                <h1>About Us</h1>
                
                <h2>IN THE KNOW YYC is your go-to guide for discovering Calgary&apos;s most exciting tech, business, and innovation events.</h2>

                <p>Whether you're a founder, job seeker, community builder, or just curious about what&apos;s happening in the ecosystem, we help you stay connected, expand your network, and make the most of Calgary&apos;s vibrant event scene. Our curated listings are updated weekly, with highlights featured in a popular newsletter that&apos;s trusted by hundreds of engaged readers. </p>
                
                <h2><Link href="https://www.linkedin.com/in/debbie-butt/" target="_blank">Debbie Butt</Link> &ndash; Founder of IN THE KNOW YYC </h2>
                <p>
                    <Image src={'/images/about/debbie-butt-small.png'} width={206} height={212} alt="Debbie Butt" />
                </p>
                <p>Debbie Butt is a key player in Calgary&apos;s innovation ecosystem and the passionate force behind <b>IN THE KNOW YYC</b>: a curated event calendar and newsletter that connects people to the city&apos;s best tech, business, and innovation happenings. </p>
                <p>After two decades working as an accountant in the oil and gas industry, Debbie discovered a new passion when she attended her first Data for Good YYC datathon. That one event sparked a journey into technology, community building, and entrepreneurship that completely transformed her career. Since then, she&apos;s become a familiar face at meetups, hackathons, and conferences across the city &ndash; and a tireless advocate for helping others tap into the power of networking and lifelong learning.</p>
                <p>Debbie launched <b>IN THE KNOW YYC</b> to make it easier for others to step into Calgary&apos;s innovation scene. What began as a personal project has quickly become a go-to resource, with hundreds of people relying on her carefully curated listings and weekly newsletters to stay connected and informed.</p>
                <p>Through <b>IN THE KNOW YYC</b>, Debbie is building more than a calendar &ndash; she&apos;s building community.</p>

                <h2><Link href="https://www.linkedin.com/in/jamie-stade-6a252122a/" target="_blank">Jamie Stade</Link> &ndash; Software Developer </h2>
                <p>
                    <Image src={'/images/about/jamie-stade.jpg'} width={206} height={212}  alt="Jamie Stade" />
                </p>
                <p>Jamie Stade is a software developer and recent graduate with a Bachelor of Science in Software Engineering from the University of Calgary. Her software development experience consists of several hackathons and personal projects, as well as professional projects for the Canadian Sheep Federation, Canadian Hereford Association, and most recently IN THE KNOW YYC!</p>
                <p>She&apos;s beyond excited to be applying her frontend and backend development skills on the new website for IN THE KNOW YYC, and to be helping Debbie bring this excellent community resource to more people. </p>
            </main>
        </>
    );
};

export async function getServerSideProps() {
    const metadata = await pagesMetaData('about')
    return { props: { metadata } };
}