'use client';

import Link from 'next/link';
import ValidationMessage from './validation-message';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '../../lib/schema';
import { authenticate } from '@/app/lib/actions';
import { z } from 'zod';

type TLoginForm = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useForm<TLoginForm>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action={authenticate}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            이메일
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('email')}
            />
          </div>
          {errors.email && <ValidationMessage message={errors.email?.message} />}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              비밀번호
            </label>
            <div className="text-sm">
              <Link href="/login/find_pw" className="font-semibold text-indigo-600 hover:text-indigo-500">
                비밀번호를 잊으셨나요?
              </Link>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('password')}
            />
          </div>
          {errors.password && <ValidationMessage message={errors.password?.message} />}
        </div>

        <div>
          <LoginButton />
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        아직 회원이 아니세요?{' '}
        <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          회원가입
        </Link>
      </p>
    </div>
  );
}

function LoginButton() {
  return (
    <button
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      로그인
    </button>
  );
}
