import Footer from '@/components/footer';
import InputContainer from '@/components/inputContainer';
import Logo from '@/components/logo';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const SignInPage: NextPageWithLayout = () => {
  return (
    <div className="items-center justify-between px-[4vw]">
      <div className="m-auto flex w-full max-w-[22rem] flex-col gap-2 rounded-md bg-white p-3">
        <Logo classname="text-3xl text-center mb-4" />
        <InputContainer label="name">
          <input type="text" className="outline-none" />
        </InputContainer>
        <InputContainer label="name">
          <input type="text" className="outline-none" />
        </InputContainer>
        <InputContainer label="name">
          <input type="text" className="outline-none" />
        </InputContainer>
        <InputContainer label="name">
          <input type="text" className="outline-none" />
        </InputContainer>
        <InputContainer label="name">
          <input type="text" className="outline-none" />
        </InputContainer>
        <InputContainer label="name">
          <input type="text" className="outline-none" />
        </InputContainer>
      </div>
    </div>
  );
};

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="flex min-h-screen flex-col bg-blue-100">
      {page}
      <Footer />
    </div>
  );
};

export default SignInPage;
