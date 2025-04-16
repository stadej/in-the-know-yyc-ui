export default async function pagesMetaData(page = 'default', event = {}){
    
    const siteName = 'In The Know YYC';
    
    let title = 'In The Know YYC';
    let description = 'Discover upcoming tech events in Calgary! Connect with professionals, network, and stay informed. Sign up for our newsletter to never miss an opportunity.';
    let image = 'https://intheknowyyc.ca/images/logo-share.png';
    let siteURL = 'https://intheknowyyc.ca/'
    
    switch(page){
        case 'home':
            title = 'HOME | '+title;
            break;
        case 'events':
            title = 'ALL EVENTS | '+title;
            description = 'Explore the latest tech events in Calgary! Book your spot, network with industry professionals, and stay ahead in the technology sector.';
            siteURL += 'events'
            break;
        case 'about':
            title = 'ABOUT US | '+title;
            description = 'Learn about In The Know YYC, a platform helping techies and newcomers in Calgary stay informed on tech events, grow their network, and thrive';
            siteURL += 'about'
            break;
        case 'contact':
            title = 'CONTACT | '+title;
            description = 'Have questions or comments? Reach out to us through our contact form and get authorization to publish your events on our platform.';
            siteURL += 'contact'
            break;
        case 'subscribe':
            title = 'SUBSCRIBE | '+title;
            description = 'Subscribe to the In The Know YYC newsletter to recieve weekly updates for Tech and Business events in Calgary!';
            siteURL += 'subscribe'
            break;
        case 'event':
            title = event.title || title;
            description = event.description || description;
            image = event.image || image;
            siteURL += (event.id) ? 'events/'+event.id : 'events';
            break;
    }




    return {title, description, image, siteName, siteURL}
}