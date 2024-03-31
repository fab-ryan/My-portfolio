'use client';

import { DashboardLayouts } from '@/components/index';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayouts>{children}</DashboardLayouts>;
}
