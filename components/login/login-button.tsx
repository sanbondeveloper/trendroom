import clsx from 'clsx';
import { useFormStatus } from 'react-dom';

function LoginButton({ isFormValid }: { isFormValid: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx(
        'h-[52px] w-[100%] rounded-lg  font-bold text-white',
        {
          'bg-[#222222]': isFormValid,
        },
        {
          'bg-[#ebebeb]': !isFormValid,
        },
      )}
      disabled={pending}
      aria-disabled={pending}
    >
      로그인
    </button>
  );
}

export default LoginButton;
