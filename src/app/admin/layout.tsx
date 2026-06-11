import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'GCM Admin',
  robots: { index: false, follow: false },
};

// Admin 루트 레이아웃 (locale 밖, 자체 html/body). 인증 게이트는 (protected) 그룹에서 처리.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-cream-dark text-brand">{children}</body>
    </html>
  );
}
