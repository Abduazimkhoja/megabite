import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center flex-col justify-center h-screen w-screen ">
      <h1 className="text-4xl font-bold">NotFound</h1>
      <Link className="text-blue-300" href={'/'}>
        На главную
      </Link>
    </div>
  );
}
