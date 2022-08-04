import MailLogo from "../assets/mail.svg";
import TwitterLogo from "../assets/twitter.svg";
import GithubLogo from "../assets/github.svg";
import DiscordLogo from "../assets/discord.svg";

export const SideBar = () => {
  return (
    <div className="flex flex-col px-4 text-center w-40 self-center fixed mb-0 mt-[75vh]">
      <div>
        <a
          className="text-[12px] text-redstone"
          href="https://redstone.finance/"
          target="_blank"
        >
          Our website
        </a>
      </div>
      <div>
        <a
          className="text-[12px] text-redstone"
          href="https://app.redstone.finance/"
          target="_blank"
        >
          Our application
        </a>
      </div>
      <div className="flex justify-around my-2">
        <a href="mailto:hello@redstone.finance">
          <img src={MailLogo} className="" />
        </a>
        <a href="https://twitter.com/redstone_defi" target="_blank">
          <img src={TwitterLogo} />
        </a>
        <a href="https://github.com/redstone-finance" target="_blank">
          <img src={GithubLogo} />
        </a>
        <a href="https://discord.com/invite/PVxBZKFr46" target="_blank">
          <img src={DiscordLogo} />
        </a>
      </div>
      <span className="text-sm text-gray-500">© RedStone 2022</span>
    </div>
  );
};
