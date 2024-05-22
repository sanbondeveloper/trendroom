import JoinForm from '@/components/join/join-form';

function JoinPage() {
  return (
    <main className="h-screen bg-white">
      <div className="m-auto flex max-w-[1280px] justify-center">
        <div className="w-[400px] pt-[60px]">
          <h2 className="mb-10 text-center text-3xl font-bold">회원가입</h2>
          <JoinForm />
        </div>
      </div>
    </main>
  );
}

export default JoinPage;
