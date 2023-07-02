
function Menu(
  { title, content }: { title: string, content: string }
) {
  return (
    <div className="menu">
      <div className="menu-header">
        <h1>{title}</h1>
      </div>
      <div className="menu-content">
        <p>{content}</p>
      </div>
    </div>
  );
}

export default Menu;
