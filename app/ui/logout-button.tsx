import { signOut } from '@/auth';
export default function LogOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button>로그아웃</button>
    </form>
  );
}
