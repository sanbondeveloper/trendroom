import { signOut } from '@/lib/actions';

export default function LogOutButton() {
  return (
    <form action={signOut}>
      <button>로그아웃</button>
    </form>
  );
}
