import BaseLayout from '@/components/layouts/BaseLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: Props) {
  return <BaseLayout>{children}</BaseLayout>;
}
