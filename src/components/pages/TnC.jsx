import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const TnC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/'); // Adjust this path if your signup page has a different route
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Header className="bg-white flex items-center justify-between px-8" style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
        <img src="evalme.png" alt="EvalMe Logo" className="h-20" />
      </Header>
      <main className="flex-grow p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-y-auto mt-6">
        <p className="text-4xl mb-6 text-center">Terms of Service</p>
        <div className="space-y-6">
          <p className="text-md leading-relaxed">
            <strong className="block mb-2">EvalMe Terms</strong>
            Bitroot.org is developed and owned by Bitroot, a technology and cloud services company, hereinafter referred to as the ‘Company’ with its registered office at 149, Avior, Nirmal Galaxy, L B S Marg, Mulund West 400080, Mumbai. MH. The Bitroot Website terms & conditions (“T&C”) apply to your access and use of www.Bitroot.org (the “Site”), including all content, data, images, pricing, reports, software, voice, text and video made available through any portion of the Site (collectively, the “Content”). Content includes all such elements as whole, as well as individual items and portions thereof. All references to the “Site” and “Content” herein shall include your access and use of any and all Bitroot applications for mobile, and all content, data, images, pricing, reports, software, voice, text and video in connection with the foregoing.  <br/><br/>
            Bitroot permits you (“User” or “you” or “your”) referred to as you, your, user or the ‘Client’ to access and use the Site and Content, subject to these T&C. By accessing or using any portion of the Site, you acknowledge that you have read, understood, and agree to be bound by these T&C. If you are entering into an agreement on these T&C on behalf of a company or other legal entity (“User Entity”), you must have the legal authority to contractually bind such User Entity to these T&C, in which case the terms “you” or “your” or “User”, the “Client” will refer to such User Entity. If you lack such legal authority to contractually bind or you do not agree with these T&C, you must refrain from accessing or using the site or content.<br/><br/>
            You may use Bitroot to specify and assign projects to the Company. A Project Assignment will become binding when both parties have signed a separate agreement / contract referred to as the “Contract” for the project and once an the Contract is signed, Company will be obligated to provide the services and to deliver the materials and deliverables as specified in each Project Assignment. The terms of the Contract will govern all Project Assignments and services undertaken by Company for Client.

          </p>

          <p className="text-md leading-relaxed">
            <strong className="block mb-2">Terms & Conditions updates:</strong>
            Company reserves the right, at its sole discretion, to change or modify portions of the T&C at any time. The Company will post the changes on the Site and will indicate the date these terms were last revised. It is your responsibility to check the T&C periodically for changes. Your continued use of the Site and Content after the date, any such changes become effective constitutes your acceptance of the new or revised T&C.
          </p>
          <p className="text-md leading-relaxed">
            <strong className="block mb-2">General conditions/access and use:</strong>
            Authorisation to Access and Use Site and Content: Subject to your compliance with these T&C and the provisions hereof, you may access or use the Site and its Content solely for the purpose of your use of Bitroot. You may only link to the Site or Content, or any portion thereof, as expressly permitted by the Company in writing.
          </p>
          <p className="text-md leading-relaxed">
            <strong className="block mb-2">Ownership and restrictions:</strong>
            All rights, title and interest in and to the Site and all its Content will remain with and belong exclusively to Bitroot and the company. You will not:<br/><br/>
            (1) sublicense, resell, rent, lease, transfer, assign, time share or otherwise commercially exploit or make the Site and any Content available to any third party,<br/><br/>
            (2) use the Site and Content in any unlawful manner (including without limitation in violation of any data, privacy or import / export control laws) or in any manner that interferes with or disrupts the integrity or performance of the Site and Content or their related components, including and not limited to<br/><br/>
            - Making any speculative, false, or fraudulent reservation or any reservation in anticipation of demand;<br/><br/>
            - Violate the restrictions in any robot exclusion headers on this website or bypass or circumvent other measures employed to prevent or limit access to this website;<br/><br/>
            - Take any action that imposes, or may impose, in our discretion, an unreasonable or disproportionately large load on our infrastructure;<br/><br/>
            - Deep-link to any portion of this website (including, without limitation, the rental path for any self-storage related information) for any purpose without our express written permission.<br/><br/>
            - "Frame", "mirror" or otherwise incorporate any part of this website into any other website without our prior written authorization.<br/><br/>
            - Use any “page-scrape,” “deep-link,” “spider,” or “robot” or other automatic program, device, algorithm or methodology, or any similar manual process, to access, copy, acquire, or monitor any portion of the Site or any Content.<br/><br/>
            - Reproduce or circumvent the presentation or navigational structure of the Site or any Content, to obtain or attempt to obtain any of its Content or other information through any means not made generally available through the Site by the Company.<br/><br/>
            (3) modify, adapt or hack the Site and Content to, or try to, gain unauthorized access to the restricted portions of the Site and Content or related systems or networks (i.e., circumvent any encryption or other security measures, gain access to any source code or any other underlying form of technology or information, and gain access to any part of the Site and all its Content, or any other data, products or services of the Company that are not readily made available to the general public).<br/><br/>
            You are not permitted to copy, modify, frame, repost, publicly perform or display, sell, reproduce, distribute, or create derivative works of the Site and Content, except that you may download, display, and print one copy of the publicly available materials (i.e., the Content that does not require an Account name or password to access) on any single computer solely for your personal, non-commercial use, provided that you do not modify the material in any way and you keep intact all copyright, trademark, marks and other proprietary notices. You agree not to access the Site or its Content by any means other than through the interface that is provided by the Company to access the same. The Company reserves the right to take any lawful measures to prevent any such activity.
            </p>
          <p className="text-md leading-relaxed">
            <strong className="block mb-2">Responsibility for your data:</strong>
            You are solely responsible for all data, information and other content, that you upload, post, or otherwise provide or store (hereafter “post(ing)”) in connection with or relating to the Site, till a contract is signed wherein the Company will own responsibility which would be specified in the contract.
          </p>
          <p className="text-md leading-relaxed">
            <strong className="block mb-2">Reservation of rights:</strong>
            Bitroot, the Company and its licensors each own and retain their respective rights in and to all logos, company names, marks, trademarks, copyrights, trade secrets, know-how, patents and patent applications that are used or embodied in or otherwise related to the Site and Content. The Company grants no rights or licenses whatsoever to you under these T&C.
          </p>
          <p className="text-md leading-relaxed">
            <strong className="block mb-2">Confidentiality:</strong>
            For the purposes of these Terms and Conditions, confidential information shall mean, “Any information disclosed by the User to Bitroot, or Vice-¬‐ Versa, whether in while signing up for Bitroot.” Further, the information pertaining to pricing and rates offered by Bitroot to the user for the Bitroot services shall also be deemed to be confidential information and neither Party shall disclose invoicing details and pricing information to any third party, which is not available in public domain. All such pricing and invoicing details shall always be considered as Confidential Information and shall not be subject to any exceptions whatsoever.
         </p>
         <p className="text-md leading-relaxed">
            <strong className="block mb-2">Assignment by employees of Company:</strong>
            Company covenants, represents and warrants that each of Company's employees who perform services has or will have a written agreement with Company that provides Company with all necessary rights to fulfil its obligations under this T&C.
         </p>
         <p className="text-md leading-relaxed">
            <strong className="block mb-2">Use of Intellectual Property:</strong>
            Rights in User Content: By posting your information and other content (“User Content”) on or through the Site and Content, you grant The Company a worldwide, non-exclusive, perpetual, irrevocable, royalty-free, sublicensable and fully paid license to use such User Content for the sole purposes of providing you with the Bitroot site, services and platform. Company will not disseminate your User Content to any third party other than as required to provide you with the Bitroot site, services and platform and will procure that any such third party will adhere to to the terms of this Agreement with respect to your User Content. The Company eschews any liability for User Content and you hereby indemnify the Company in the event that your User Content is held to infringe the rights of any third party. The Company has the right, but not the obligation, to monitor the Site and Content and User Content. The Company may remove or disable any User Content at any time for any reason, or for no reason at all.<br/><br/>

            All third-party trademarks™ or registered® trademarks (including logos and icons) referenced on this site remain the property of their respective owners. Use of third-party trademarks does not indicate any affiliation, relationship, sponsorship, or endorsement between us and the owners of these trademarks. Any references to third-parties or their trademarks are solely to identify the corresponding third-party goods and/or services.
         </p>
         <p className="text-md leading-relaxed">
            <strong className="block mb-2">Unsecured transmission of user content:</strong>
            You understand that the operation of the Site and Platform, including User Content, may be unencrypted and involve transmission to The Company’s third party vendors and hosting partners to operate and maintain the Site and Content. Accordingly, you acknowledge that you bear sole responsibility for adequate security, protection and backup of User Content. The Company will have no liability to you for any unauthorized access or use of any of User Content, or any corruption, deletion, destruction or loss of any of User Content.
         </p>
         <p className="text-md leading-relaxed">
            <strong className="block mb-2">Feedback:</strong>
            You may submit ideas, suggestions, or comments (“Feedback”) regarding the Site and Content or The Company’s business, products or services. By submitting any Feedback, you acknowledge and agree that (1) your Feedback is provided by you voluntarily and The Company may, without any obligations or limitation, use and exploit such Feedback in any manner and for any purpose, (2) you will not seek and are not entitled to any money or other form of compensation, consideration, or attribution with respect to your Feedback regardless of whether The Company considered or used your Feedback in any manner, and (3) your Feedback is not the confidential or proprietary information of you or any third party.

         </p>
         <p className="text-md leading-relaxed">
            <strong className="block mb-2">Your representations and warranties:</strong>
            You represent and warrant to The Company that your activity on the Site and The Company’s possession and use of User Content as contemplated in these T&C do not and will not violate, infringe, or misappropriate any third party’s copyright, trademark, right of privacy or publicity, or other personal or proprietary right, nor does User Content contain any matter that is defamatory, obscene, unlawful, threatening, abusive, tortious, offensive or harassing.
         </p>
         <p className="text-md leading-relaxed">
            <strong className="block mb-2">Trademarks:</strong>
            Bitroot trademarks, service marks, graphics and logos used in connection with this website are trademarks or registered trademarks of Bitroot or its partners. Other trademarks, service marks, graphics and logos used in connection with the website may be the trademarks of other third parties. Your use of the website grants you no right or license to reproduce or otherwise use any Great Value Storage trademarks or third-party trademarks.<br/><br/>
            You authorise Bitroot and the Company, directly or through third parties, to make any inquiries necessary to validate your identity and confirm your ownership of your email address or financial instruments. Failure to provide information about you and your business when requested is a violation of this Agreement.<br/><br/>
            By using your Bitroot member account, you acknowledge and agree that SD Squared and Bitroot security procedures are commercially reasonable.
         </p>
         <p className="text-md leading-relaxed">
            <strong className="block mb-2">Promotional offers and discounts:</strong>
            All promotional offers that the Company will run on Bitroot will be subject to a fair user policy and the company has the final authority to extend / revoke such promotional offers, discounts and pricing to its Clients.
         </p>
         <p className="text-md leading-relaxed">
            <strong className="block mb-2">Termination of access due to violations:</strong>
            The Company may, in its sole discretion and without prior notice, terminate your access to the Site and/or block your future access to the Site if we determine that you have violated these T&C or other agreements or guidelines which may be associated with your use of the Site. You also agree that any violation by you of these T&C will cause irreparable harm to The Company, for which monetary damages would be inadequate, and you consent to The Company obtaining any injunctive or equitable relief that The Company deems necessary or appropriate in such circumstances, without limiting The Company’s other available remedies. Further, The Company may, in its sole discretion and without prior notice, terminate your access to the Site, for cause, which includes (but is not limited to) (1) requests by law enforcement or other government agencies, (2) discontinuance or material modification of the Site or any service offered on or through the Site, or (3) unexpected technical issues or problems.
         </p>
         <p className="text-md leading-relaxed">
            <strong className="block mb-2">No warranties and disclaimer by the Company:</strong>
            The site and content, and all server and network components, are provided on an “as is” and “as available” basis without any warranties of any kind, and the company expressly disclaims all other representations and warranties, including any implied warranties of merchantability, fitness for a particular purpose or non-infringement, and any representations or warranties arising from course of dealing, course of performance or usage of trade. You acknowledge that the company does not warrant that your access or use or both of the site and content will be uninterrupted, timely, secure, error-free or virus-free, and the company does not make any warranty as to the results that may be obtained from use of the site and content, and no information, advice or services obtained by you from the company or through the site and property will create any warranty not expressly stated in these T&C.<br/><br/>
            The Company reserves the right to do any of the following, at any time, without notice: (1) to modify, suspend or terminate operation of or access to the Site, or any portion of the Site, for any reason; (2) to modify or change the Site, or any portion of the Site, for any reason; and (3) to interrupt the operation of the Site, or any portion of the Site, as necessary to perform routine or non-routine maintenance, error correction, or other changes.
         </p>
         <p className="text-md leading-relaxed">
            <strong className="block mb-2">Limited Liability:</strong>
            Exclusion of damages and limitation of liability:<br/><br/>
            The company does not charge fees for you to access and use the site and content pursuant to these T&C. As consideration for your free access and use of the site and content pursuant to these T&C, you further agree that the company will not be liable to you for any incidental, consequential, indirect, special, punitive or exemplary damages (including damages for loss of business, loss of profits or the like) arising out of or relating to this T&C, including without limitation, your use or inability to use the site, platform, matching services, content, proprietary information, or any interruption or disruption of such use, even if the company has been advised of the possibility of such damages and regardless of the cause of action (whether in contract, tort, breach of warranty or otherwise). The aggregate liability of the company with regard to this T&C will be Nil.<br/><br/>
            Some states and other jurisdictions do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply to you. In these states, the company’s liability will be limited to the greatest extent permitted by law.

         </p>
         <p className="text-md leading-relaxed">
            <strong className="block mb-2">Dispute resolution:</strong>
            These T&C are made under, and will be construed and enforced in accordance with, the laws applicable and to be performed solely therein, without giving effect to principles of conflicts of law. In any action between or among any of the parties, whether arising out of these T&C or otherwise, each of the parties irrevocably and unconditionally consents and submits to the exclusive jurisdiction and venue of England and Wales.<br/><br/>
            These T&C, and any additions, changes, edits and/or modifications made thereto by The Company, together with The Company’s Privacy Policy, constitute the entire agreement between the parties with respect to the portions of the Site available without an account ID or password. Access to certain password-restricted portions of the Site is also subject to additional agreement(s).<br/><br/>
            Any notices to The Company in connection with this T&C will be made by email transmitted to contact support@bitroot and you will also send a copy of such notice via nationally recognized carrier to Bitroot Limited, 600 California Street, San Francisco, USA marked for the attention of the Company Secretary. In the event that any provision of these T&C will be determined to be illegal or unenforceable, that provision will be first revised to give the maximum permissible effect to its original intent or, if such revision is not permitted, that specific provision will be eliminated so that these T&C will otherwise remain in full force and effect and enforceable.
         </p>
         <p className="text-md leading-relaxed">
            <strong className="block mb-2">Entire Agreement:</strong>

            This Agreement constitutes the final and exclusive T&C between the parties relating to this subject matter and supersedes all terms, whether prior or contemporaneous, written or oral, concerning such subject matter. The T&C is executed in counterparts through digital acceptance.
         </p>

        </div>
      </main>

      <Footer className="bg-transparent text-center">
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          size="large"
        >
          Go Back to Sign Up
        </Button>
      </Footer>
    </Layout>
  );
};

export default TnC;
