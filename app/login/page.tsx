import Link from 'next/link';
import clsx from 'clsx';
import LoginForm from '@/components/login/login-form';
import SocialLoginButton from '@/components/login/social-login-button';

const looks = ['이메일 가입', '이메일 찾기', '비밀번호 찾기'];

function LoginPage() {
  return (
    <main className="h-screen bg-white">
      <div className="m-auto flex max-w-[1280px] justify-center">
        <div className="w-[400px]">
          <h2 className="mb-10 text-center text-3xl font-bold">TRENDROOM</h2>
          <LoginForm />

          <ul className="mt-5 flex justify-evenly">
            {looks.map((look, idx) => (
              <li
                key={look}
                className={clsx('inline-flex flex-1 items-start', {
                  'before:mt-[3px] before:inline-block before:h-[13px] before:w-[1px] before:bg-[#d3d3d3] before:content-[""]':
                    idx !== 0,
                })}
              >
                <Link className="m-auto inline-flex px-[10px] text-sm tracking-tighter " href="#">
                  {look}
                </Link>
              </li>
            ))}
          </ul>

          <SocialLoginButton />
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
