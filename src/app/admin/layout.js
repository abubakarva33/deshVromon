export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen flex-col">
      <header className="border-b p-4">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </header>
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
}
