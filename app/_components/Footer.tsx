import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-slate-500 flex items-center justify-center gap-3 mt-5">
      <p className="text-center">&copy; SHRTNR 2026</p>
      <p>
        Developed by{" "}
        <Link
          className="underline"
          href={"https://belkweb.dev/"}
          target="_blank"
        >
          belkweb.dev
        </Link>
      </p>
    </div>
  );
};

export default Footer;
