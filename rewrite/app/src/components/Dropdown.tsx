
function Dropdown(
  { header, content }: { header: string, content: string }
) {
  return (
    <div className="dropdown">
      <div className="dropdown-header">
        {header}
      </div>
      <div className="dropdown-content">
        {content}
      </div>
    </div>
  );
}

export default Dropdown;