import Link from 'next/link';

export default function Courses() {
    return(
        <div className="pt-5 my-2 text-start" style={{ paddingLeft: '310px', paddingRight: '310px' }}>
            <div className="row justify-content-start">
                <h1 className="display-6 fw-bold mb-3">Courses</h1>
                <div className="input-group rounded">
                    <input type="search" className="form-control rounded" placeholder="Start typing to filter" aria-label="Search"
                           aria-describedby="search-addon"/>
                    <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
                <div className="row justify-content-start mt-4">
                    <div className="col-sm-3 pt-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Python</h5>
                                <p className="card-text mt-3">Senior/Middle/Junior</p>
                                <Link href="#" className="btn btn-dark mt-4">Start</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 pt-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">JavaScript</h5>
                                <p className="card-text mt-3">Senior/Middle/Junior</p>
                                <Link href="#" className="btn btn-dark mt-4">Start</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 pt-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">PHP</h5>
                                <p className="card-text mt-3">Middle/Junior</p>
                                <Link href="#" className="btn btn-dark mt-4">Start</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 pt-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Java</h5>
                                <p className="card-text mt-3">Middle/Junior</p>
                                <Link href="#" className="btn btn-dark mt-4">Start</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 pt-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">C++</h5>
                                <p className="card-text mt-3">Senior/Middle/Junior</p>
                                <Link href="#" className="btn btn-dark mt-4">Start</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 pt-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">C#</h5>
                                <p className="card-text mt-3">Middle/Junior</p>
                                <Link href="#" className="btn btn-dark mt-4">Start</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}