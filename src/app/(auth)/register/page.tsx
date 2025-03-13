import { RegisterPage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Đăng ký",
  };

function RegisterPageRoute() {
    return <RegisterPage />;
}

export default RegisterPageRoute;