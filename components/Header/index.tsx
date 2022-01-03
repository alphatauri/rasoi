import Link from "next/link";

export function Header() {
  return (
    <header className="py-20">
      <div className="flex justify-center">
        <Link href="/">
          <a className="text-pink-600 text-9xl font-bold font-sacramento cursor-pointer">
            Rasoi
          </a>
        </Link>
      </div>
    </header>
  );
}
