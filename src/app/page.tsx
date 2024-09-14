import "./page.css";
import Link from 'next/link'

export default function Home() {
  return (
      <div className="px-4 pt-5 my-5 text-center">
        <h1 className="display-4 fw-bold">Welcome to Prepify!</h1>
        <div className="col-lg-6 mx-auto mt-4">
          <h2 className="lead mb-4 text-muted">We`re excited to have you here.
            Prepify is your go-to platform for online learning, skill-building and course preparation.
            Whether you`re just starting out or looking to expand your knowledge, we`ve got you covered.
          </h2>
          <h2 className="lead mb-4 text-muted">Stay connected to explore more resources, updates, and opportunities designed to help you succeed.
            Let`s take the next step together!</h2>
        </div>
      </div>
  );
}
