import { LoginPage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Đăng nhập",
  };

function LoginPageRoute() {
    return <LoginPage />;
}

export default LoginPageRoute;