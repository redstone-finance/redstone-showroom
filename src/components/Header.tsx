import RedStoneLogo from "../assets/redstone-logo.svg";

export const Header = () => (
  <nav className="flex items-center justify-between gap-16 p-3">
    <div className="flex items-center align-center gap-16">
      <a href="/">
        <img
          className="cursor-pointer"
          width="180"
          src={RedStoneLogo}
          alt="RedStone logo"
        />
      </a>
    </div>
    <a
      className="bg-white hover:opacity-75 text-redstone py-2 px-4 rounded-full border border-redstone"
      href="https://discord.com/invite/PVxBZKFr46"
      target="_blank"
    >
      Contact us
    </a>
  </nav>
);
