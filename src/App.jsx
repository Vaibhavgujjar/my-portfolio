export default function App() {
  return (
    <div>

      {/* HERO */}

      <section className="hero">
        <div>
          <h1 className="font-serif">VAIBHAV SINGH PANWAR</h1>

          <h2 className="font-mono">
            Computer Science Engineer
          </h2>

          <p>
            Passionate about software development, machine learning
            and building real world solutions using modern technology.
          </p>

          <button>
            View My Work
          </button>
        </div>
      </section>

      {/* ABOUT */}

      <section className="section">
        <h2>About Me</h2>

        <div className="card">
          I am a Computer Science Engineer passionate about
          building software, solving real world problems and
          continuously learning new technologies.
        </div>
      </section>

      {/* PROJECTS */}

      <section className="section">
        <h2>Projects</h2>

        <div className="card">
          Food Waste Management System
        </div>

        <div className="card">
          Restaurant Billing System
        </div>

        <div className="card">
          Fake Product Detection using Barcode
        </div>
      </section>

    </div>
  );
}