import { ContactPage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Liên hệ",
  };

function ContactPageRoute() {
    return <ContactPage />;
}

export default ContactPageRoute;