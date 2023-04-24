import Link from "next/link";

const Header = () => {
  return (
    <div>
      <ul className="grid grid-cols-4 gap-5 bg-slate-200 p-3">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <Link href={"/about/team"}>Team</Link>
        </li>
        <li>
          <Link href={"blog"}>Blog</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
