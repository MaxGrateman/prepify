import Link from 'next/link';

export default function Courses() {
    return(
        <div className="px-4 pt-5 my-5 text-center">
            <div className="row justify-content-center align-items-center">
                <h1 className="display-6 fw-bold mb-5">Your level is...</h1>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Senior level</h5>
                            <p className="card-text mt-3">Extensive experience</p>
                            <Link href="/courses/senior" className="btn btn-dark mt-4">Pick</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Middle level</h5>
                            <p className="card-text mt-3">Developing experience</p>
                            <Link href="/courses/middle" className="btn btn-dark mt-4">Pick</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Junior level</h5>
                            <p className="card-text mt-3">New to the field</p>
                            <Link href="/courses/junior" className="btn btn-dark mt-4">Pick</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}