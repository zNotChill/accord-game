
function Button(
  { href, onclick, text }: { href: string, onclick: () => void, text: string }
) {
  return (
    <a className="button" href={href} onClick={onclick}>{text}</a>
  );
}

export default Button;
