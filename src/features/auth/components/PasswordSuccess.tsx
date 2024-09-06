"use client";

const PasswordSuccess = () => {
    return(
        <section className="vh-90">
            <div className="container py-5 h-100 slideIn">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Please,check your e-mail!</h4>
                        <p>We have sent further information on resetting your password to your email. Please follow the link in the letter!</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PasswordSuccess;