import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const personal = "https://andrei-hrb.com/";
  const repo = "https://github.com/andrei-hrb/better-infofer";

  const link = (url, text) => (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );

  return (
    <footer>
      &copy; {year} {link(personal, "Hîrbu Andrei")}. Read {link(repo, "here")}{" "}
      all the details.
    </footer>
  );
}
