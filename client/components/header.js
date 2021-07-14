import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkCfg) => linkCfg)
    .map(({ label, href }) => {
      return (
        <li key="href" className="nav-item">
          <Link href={href}>
            <a class="nav-link" href="#">
              {label}
            </a>
          </Link>
        </li>
      );
    });
  return (
    <nav class="navbar">
      <Link href="/">
        <a class="nav-link" href="#">
          WeebUp
        </a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
export default Header;
