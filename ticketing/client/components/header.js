import Link from 'next/link';

const Header = ({currentUser}) => {
    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return (
                <li key={href} className="nav-item">
                    <Link href={href}>
                        <p className="nav-link">{label}</p>
                    </Link>
                </li>
            );
        }
    );
    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/"><p href='/' className="navbar-brand ms-3">GitTix</p></Link>
            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center me-3">
                    { links }
                </ul>
            </div>
        </nav>
    );
}

export default Header;