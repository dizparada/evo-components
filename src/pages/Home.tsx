import './Home.css';

export function Home() {
  return (
    <div className="home">
      <h1 className="home__title">Welcome to Evo</h1>
      <p className="home__subtitle">AI governance and security platform</p>
      <div className="home__cards">
        <div className="home__card">
          <h3>10 Repositories</h3>
          <p>Scanned and monitored</p>
        </div>
        <div className="home__card">
          <h3>5 Active issues</h3>
          <p>Across all policies</p>
        </div>
        <div className="home__card">
          <h3>1 Active scan</h3>
          <p>Currently running</p>
        </div>
        <div className="home__card">
          <h3>10 Policies</h3>
          <p>Governing your AI assets</p>
        </div>
      </div>
    </div>
  );
}
