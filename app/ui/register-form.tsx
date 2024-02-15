'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '../lib/schema';
import { z } from 'zod';
import { signUp } from '../lib/actions';
import Link from 'next/link';
import ValidationMessage from './validation-message';

type TRegisterForm = z.infer<typeof RegisterSchema>;
export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TRegisterForm>({
    mode: 'onChange',
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: '', nickname: '', password: '', confirmPassword: '' },
  });

  const onSubmit: SubmitHandler<TRegisterForm> = async ({ email, nickname, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      return setError('confirmPassword', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다',
      });
    }

    await signUp({ email, nickname, password });
    router.push('/login');
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            이메일
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('email')}
            />
          </div>
          {errors.email && <ValidationMessage message={errors.email?.message} />}
        </div>

        <div>
          <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
            닉네임
          </label>
          <div className="mt-2">
            <input
              id="nickname"
              type="text"
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('nickname')}
            />
          </div>
          {errors.nickname && <ValidationMessage message={errors.nickname?.message} />}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              비밀번호
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('password')}
            />
          </div>
          {errors.password && <ValidationMessage message={errors.password?.message} />}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
            비밀번호 확인
          </label>
          <div className="mt-2">
            <input
              id="confirmPassword"
              type="password"
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('confirmPassword')}
            />
          </div>
          {errors.confirmPassword && <ValidationMessage message={errors.confirmPassword?.message} />}
        </div>

        <div>
          <RegisterButton />
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          로그인
        </Link>
      </p>
    </div>
  );
}

function RegisterButton() {
  return (
    <button
      // type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      회원가입
    </button>
  );
}
