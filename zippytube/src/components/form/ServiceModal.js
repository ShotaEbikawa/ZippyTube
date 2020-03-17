import React from 'react';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Link from '@material-ui/core/Link';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    ModalContainer: {
        padding:'auto',
        margin:'auto',
        display:'flex',
        flexDirection:'column',
        overflow:'hidden',
        '&:focus': {
            outline: 'none',
        }
    },
    contentContainer: {
        height: '500px',
        overflowY:'auto',
        padding:'1rem',
    }
}));

const ServiceModal = () => {
    const classes = useStyles();
    const [toggle, setToggle] = React.useState(false);
    return(
    <>
        <span>
            I accept the <Link onClick={()=>setToggle(!toggle)}>Terms of Service </Link>
        </span>
            <Modal
                open={toggle}
                onClose={()=>setToggle(false)}
                className={classes.ModalContainer}
            >
                        <Grow in={toggle} >
                <Container maxWidth='md' className={classes.ModalContainer}>
                    <Paper className={classes.contentContainer}>
                        <h2>
                            Terms and Services
                        </h2>
                        <h3>
                            Welcome to ZippyTube!
                        </h3>
                        <p>
                            These terms and conditions outline the rules and regulations for the use of ZippyTube's Website, located at ZippyTube.
                        </p>
                        <p>
                            By accessing this website we assume you accept these terms and conditions. Do not continue to use ZippyTube if you do not agree to take all of the terms and conditions stated on this page.
                        </p>
                        <p>
                            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the ZippyTube's terms and conditions. “The ZippyTube”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                        </p>
                        <h4>
                            Cookies
                        </h4>
                        <p>
                            We employ the use of cookies. By accessing ZippyTube, you agreed to use cookies in agreement with the Company Name's Privacy Policy.
                        </p>
                        <p>
                            Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                        </p>
                        <h4>
                            License
                        </h4>        
                        <p>
                            Unless otherwise stated, Company Name and/or its licensors own the intellectual property rights for all material on Website Name. All intellectual property rights are reserved. You may access this from Website Name for your own personal use subjected to restrictions set in these terms and conditions.
                        </p>
                        <p>
                            You must not:
                        </p>
                        <ul>
                            <li>Republish material from Website Name</li>
                            <li>Sell, rent or sub-license material from Website Name</li>
                            <li>Reproduce, duplicate or copy material from Website Name</li>
                            <li>Redistribute content from Website Name</li>
                        </ul>
                        <p>
                            This Agreement shall begin on the date hereof.
                        </p>
                        <p>
                            Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Company Name does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Company Name,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Company Name shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
                        </p>
                        <p>
                            Company Name reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
                        </p>
                        <p>
                            You warrant and represent that:
                        </p>
                        <ul>
                            <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                            <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                            <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                            <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                        </ul>
                        <p>
                            You hereby grant Company Name a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
                        </p>
                        <h4>
                            Hyperlinking to our Content
                        </h4>
                        <p>
                            The following organizations may link to our Website without prior written approval:
                        </p>
                        <ul>
                            <li>Government agencies;</li>
                            <li>Search engines;</li>
                            <li>News organizations;</li>
                            <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses;</li>
                            <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                        </ul>
                        <p>
                            These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.
                        </p>
                        <p>
                            We may consider and approve other link requests from the following types of organizations:
                        </p>
                        <ul>
                            <li>commonly-known consumer and/or business information sources;</li>
                            <li>dot.com community sites;</li>
                            <li>associations or other groups representing charities;</li>
                            <li>online directory distributors;</li>
                            <li>internet portals;</li>
                            <li>accounting, law and consulting firms; and</li>
                            <li>educational institutions and trade associations.</li>
                        </ul>
                        <p>
                            We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Company Name; and (d) the link is in the context of general resource information.
                        </p>
                        <p>
                            These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.
                        </p>
                        <p>
                            If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Company Name. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
                        </p>
                    </Paper>
                </Container>
                </Grow>
            </Modal>
    </>)
}

export default ServiceModal;