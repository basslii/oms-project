export default function Layout({ children }: any) {
    return (
        <div className="layout-container">
            <div className="layout-container-items">
                <div className="signupDesign">
                    <h1 className="logo-title">OMS</h1>
                    <div className="signup-brand">
                        <h2>BRAND</h2>
                        <p>the right choice for office management</p>
                    </div>
                </div>
                <div className="layout-children-container slideInLeft">
                    <div className="layout-children-container-item">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}