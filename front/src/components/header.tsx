import  "../style/components.css"

type HeaderProps = {
    name: string | undefined;
  };

export default function Header ({name}: HeaderProps) {
    return (
        <div className="header-body">
            <p>LOGO</p>
            <p className="header-settings">userName: {name}</p>
        </div>
    )
}