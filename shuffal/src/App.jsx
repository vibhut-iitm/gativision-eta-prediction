import { useEffect, useState } from 'react'
import gativisionLogo from '../../logo/logo.png'
import './App.css'

const trainData = [
  {
    id: '12625',
    name: 'Karnataka Express',
    route: 'Bengaluru City to New Delhi',
    currentDelay: 12,
    currentStationIndex: 1,
    stations: [
      { id: 'bengaluru', name: 'Bengaluru City', arrival: '09:40', delayRisk: 1, distanceKm: 0 },
      { id: 'hubballi', name: 'Hubballi Junction', arrival: '13:15', delayRisk: 2, distanceKm: 310 },
      { id: 'belagavi', name: 'Belagavi', arrival: '15:40', delayRisk: 3, distanceKm: 450 },
      { id: 'solapur', name: 'Solapur Junction', arrival: '20:55', delayRisk: 4, distanceKm: 720 },
      { id: 'nagpur', name: 'Nagpur', arrival: '01:35', delayRisk: 5, distanceKm: 1260 },
    ],
  },
  {
    id: '12951',
    name: 'Mumbai Rajdhani',
    route: 'Mumbai Central to New Delhi',
    currentDelay: 7,
    currentStationIndex: 2,
    stations: [
      { id: 'mumbai', name: 'Mumbai Central', arrival: '08:05', delayRisk: 1, distanceKm: 0 },
      { id: 'vardha', name: 'Vardha', arrival: '10:50', delayRisk: 2, distanceKm: 290 },
      { id: 'itarsi', name: 'Itarsi Junction', arrival: '15:10', delayRisk: 3, distanceKm: 610 },
      { id: 'jnc', name: 'Jabalpur', arrival: '18:35', delayRisk: 4, distanceKm: 920 },
      { id: 'delhi', name: 'New Delhi', arrival: '22:45', delayRisk: 5, distanceKm: 1380 },
    ],
  },
  {
    id: '12009',
    name: 'Shatabdi Express',
    route: 'Chennai Central to Bengaluru',
    currentDelay: 18,
    currentStationIndex: 1,
    stations: [
      { id: 'chennai', name: 'Chennai Central', arrival: '06:20', delayRisk: 1, distanceKm: 0 },
      { id: 'katpadi', name: 'Katpadi Junction', arrival: '09:00', delayRisk: 2, distanceKm: 130 },
      { id: 'bangalore', name: 'Bengaluru City', arrival: '12:40', delayRisk: 2, distanceKm: 350 },
      { id: 'mysore', name: 'Mysore', arrival: '15:40', delayRisk: 4, distanceKm: 560 },
    ],
  },
]

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const sessionKey = 'gativision-user'

function readSessionUser() {
  try {
    const user = JSON.parse(sessionStorage.getItem(sessionKey))
    return user && typeof user.name === 'string' && typeof user.email === 'string'
      ? user
      : null
  } catch {
    return null
  }
}

function AppLink({ to, onNavigate, className, children }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        event.preventDefault()
        onNavigate(to)
      }}
    >
      {children}
    </a>
  )
}

function formatTime(timeValue) {
  const [hours, minutes] = timeValue.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function addMinutesToTime(timeValue, minutesToAdd) {
  const [hours, minutes] = timeValue.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  date.setMinutes(date.getMinutes() + minutesToAdd)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function SiteBrand({ onNavigate, dark = false }) {
  return (
    <AppLink to="/" onNavigate={onNavigate} className={`site-brand${dark ? ' site-brand-dark' : ''}`}>
      <img className="brand-logo" src={gativisionLogo} alt="" aria-hidden="true" />
      <span><strong>GatiVision</strong><small>Railway ETA Prediction</small></span>
    </AppLink>
  )
}

function PublicFooter({ onNavigate }) {
  return (
    <footer className="public-footer" id="about">
      <div className="footer-main">
        <div className="footer-brand-block">
          <SiteBrand onNavigate={onNavigate} />
          <p>Railway ETA prediction demonstration</p>
        </div>
        <div className="footer-column">
          <h2>Product</h2>
          <a href="/#home">Home</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#technology">Technology</a>
        </div>
        <div className="footer-column">
          <h2>Account</h2>
          <AppLink to="/login" onNavigate={onNavigate}>Login</AppLink>
          <AppLink to="/register" onNavigate={onNavigate}>Register</AppLink>
        </div>
        <div className="footer-column">
          <h2>Project</h2>
          <a href="/#about">About</a>
          <a href="https://github.com/vibhut-iitm/gativision-eta-prediction" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 GatiVision. Built by Team Souls.</span>
        <span>Project demonstration</span>
      </div>
    </footer>
  )
}

function HomePage({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="public-site">
      <header className="public-nav">
        <SiteBrand onNavigate={onNavigate} dark />
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="public-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
        <nav className={menuOpen ? 'public-links is-open' : 'public-links'} id="public-navigation" aria-label="Public navigation">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#how-it-works" onClick={closeMenu}>How It Works</a>
          <a href="#technology" onClick={closeMenu}>Technology</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <AppLink to="/login" onNavigate={onNavigate} className="public-login">Login</AppLink>
          <AppLink to="/login" onNavigate={onNavigate} className="primary-button nav-get-started">Get Started</AppLink>
        </nav>
      </header>

      <main>
        <section className="home-hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Railway ETA Prediction</p>
            <h1>Smarter ETA for Every Journey</h1>
            <p>GatiVision explores how train-running information and historical patterns can support better arrival estimates.</p>
            <div className="hero-actions">
              <AppLink to="/login" onNavigate={onNavigate} className="primary-button">Get Started</AppLink>
              <a href="#how-it-works" className="text-button">How It Works <span aria-hidden="true">&#8594;</span></a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Illustrative railway route between three stations">
            <div className="visual-label">A clearer view of arrival estimates</div>
            <div className="illustrative-route">
              <span className="illustrative-track" />
              <div className="illustrative-stop"><i /><span>Station</span></div>
              <div className="illustrative-stop"><i /><span>Station</span></div>
              <div className="illustrative-stop"><i /><span>Station</span></div>
            </div>
            <p>Illustrative route concept</p>
          </div>
        </section>

        <section className="public-section problem-section" id="problem">
          <div className="section-intro">
            <p className="eyebrow">The challenge</p>
            <h2>Why Train ETA Needs Better Prediction</h2>
            <p>Rail journeys change as operating conditions evolve. A useful estimate should account for more than a printed timetable.</p>
          </div>
          <div className="information-grid four-columns">
            <article className="information-card">
              <span className="card-number">01</span>
              <h3>Changing Running Conditions</h3>
              <p>Congestion, speed restrictions and operating conditions can affect how a journey progresses.</p>
            </article>
            <article className="information-card">
              <span className="card-number">02</span>
              <h3>Delay Propagation</h3>
              <p>A delay at one point may influence expected arrival times farther along the route.</p>
            </article>
            <article className="information-card">
              <span className="card-number">03</span>
              <h3>Static Estimates</h3>
              <p>Scheduled times alone cannot always reflect changing running conditions.</p>
            </article>
            <article className="information-card">
              <span className="card-number">04</span>
              <h3>Passenger Uncertainty</h3>
              <p>Passengers benefit from a clearer view of when they can expect to arrive.</p>
            </article>
          </div>
        </section>

        <section className="public-section how-section" id="how-it-works">
          <div className="section-intro">
            <p className="eyebrow">The process</p>
            <h2>How GatiVision Works</h2>
            <p>A straightforward pipeline turns relevant running information into an estimated arrival.</p>
          </div>
          <div className="process-grid">
            <article className="process-step">
              <span>01</span><h3>Train Information</h3>
              <p>Relevant train-running information is collected.</p>
            </article>
            <article className="process-step">
              <span>02</span><h3>Data Processing</h3>
              <p>Useful journey factors are prepared for prediction.</p>
            </article>
            <article className="process-step">
              <span>03</span><h3>ML Prediction</h3>
              <p>A regression model can estimate expected delay.</p>
            </article>
            <article className="process-step">
              <span>04</span><h3>Estimated Arrival</h3>
              <p>Estimated delay is combined with the scheduled arrival.</p>
            </article>
          </div>
          <p className="implementation-note">The current dashboard is a demonstration using sample data and a rule-based estimate. Live railway feeds, historical data and an ML model are not connected yet.</p>
        </section>

        <section className="public-section technology-section" id="technology">
          <div className="section-intro">
            <p className="eyebrow">The implementation</p>
            <h2>Built With Modern Technology</h2>
            <p>The current demonstration uses a lightweight web stack.</p>
          </div>
          <div className="technology-list" aria-label="Technologies currently used">
            <span>React</span><span>Vite</span><span>Node.js</span><span>Express.js</span>
          </div>
          <p className="implementation-note">MongoDB, Python and Scikit-learn are not integrated in the current project.</p>
        </section>

        <section className="public-section ml-section">
          <div className="ml-copy">
            <p className="eyebrow">Prediction concept</p>
            <h2>Data-Driven ETA Prediction</h2>
            <p>ETA prediction can be framed as a regression task: relevant train-running features are used to estimate expected delay in minutes.</p>
            <p className="implementation-note">This describes the planned model approach; no trained model or measured performance is included in this demo.</p>
          </div>
          <div className="ml-flow" aria-label="Conceptual flow from running features to expected arrival">
            <div>Train Running Features</div><span aria-hidden="true">&#8595;</span>
            <div>Regression Model</div><span aria-hidden="true">&#8595;</span>
            <div>Predicted Delay</div><span aria-hidden="true">&#8595;</span>
            <div>Expected ETA</div>
          </div>
        </section>

        <section className="public-section benefits-section">
          <div className="section-intro">
            <p className="eyebrow">The product direction</p>
            <h2>Designed for Practical Use</h2>
          </div>
          <div className="information-grid four-columns">
            <article className="benefit-item"><h3>Better Information</h3><p>Present an arrival estimate alongside the scheduled time.</p></article>
            <article className="benefit-item"><h3>Simple Experience</h3><p>Keep the journey information clear and easy to scan.</p></article>
            <article className="benefit-item"><h3>Data-Driven Direction</h3><p>Designed to incorporate running information beyond static schedules.</p></article>
            <article className="benefit-item"><h3>Scalable Architecture</h3><p>Structured so additional data sources can be considered later.</p></article>
          </div>
        </section>

        <section className="public-cta">
          <div>
            <p className="eyebrow">GatiVision</p>
            <h2>Ready to Explore GatiVision?</h2>
            <p>Sign in to access the railway ETA prediction dashboard.</p>
          </div>
          <AppLink to="/login" onNavigate={onNavigate} className="primary-button">Sign In</AppLink>
        </section>
      </main>
      <PublicFooter onNavigate={onNavigate} />
    </div>
  )
}

function AuthScreen({ mode, onNavigate, onAuthenticated, onRegistered, notice }) {
  const isRegister = mode === 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    if (isRegister && form.password !== form.confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login'
    const payload = isRegister
      ? { name: form.name.trim(), email: form.email.trim(), password: form.password }
      : { email: form.email.trim(), password: form.password }

    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to sign in.')
      }

      if (isRegister) onRegistered()
      else onAuthenticated(result.user)
    } catch (error) {
      setMessage(error instanceof TypeError
        ? 'Unable to connect to the server.'
        : error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <main className="auth-layout">
        <section className="auth-brand" aria-label="About GatiVision">
          <SiteBrand onNavigate={onNavigate} />
          <div className="brand-copy">
            <p className="eyebrow">Railway operations, made clearer</p>
            <h1>{isRegister ? 'A clearer view of the journey ahead.' : 'Access your ETA dashboard.'}</h1>
            <p>{isRegister ? 'Create an account to access the GatiVision railway ETA prediction dashboard.' : 'Sign in to search trains and view estimated arrival times.'}</p>
          </div>
          <div className="route-sketch" aria-label="Illustrative railway route">
            <span className="route-line" />
            <div className="route-stop"><i /><span>Departure</span></div>
            <div className="route-stop current"><i /><span>Journey</span></div>
            <div className="route-stop destination"><i /><span>Arrival</span></div>
          </div>
          <p className="brand-footnote">Illustrative route only. No live railway information is shown.</p>
        </section>

        <section className="auth-side">
          <div className="auth-card">
            <p className="eyebrow">GatiVision account</p>
            <h2>{isRegister ? 'Create your account' : 'Welcome Back'}</h2>
            <p className="auth-intro">{isRegister ? 'Register to access the GatiVision ETA prediction dashboard.' : 'Sign in to continue to GatiVision.'}</p>
            {notice && <p className="auth-notice" role="status">{notice}</p>}

            <form className="auth-form" onSubmit={handleSubmit}>
              {isRegister && (
                <div className="field">
                  <label htmlFor="full-name">Full name</label>
                  <input id="full-name" name="name" autoComplete="name" value={form.name} onChange={handleChange} required maxLength={80} />
                </div>
              )}
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} value={form.password} onChange={handleChange} required minLength={8} maxLength={128} />
                {isRegister && <small className="field-hint">Use at least 8 characters.</small>}
              </div>
              {isRegister && (
                <div className="field">
                  <label htmlFor="confirm-password">Confirm password</label>
                  <input id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" value={form.confirmPassword} onChange={handleChange} required minLength={8} maxLength={128} />
                </div>
              )}
              {message && <p className="form-message" role="alert">{message}</p>}
              <button className="primary-button auth-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing In...' : isRegister ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <p className="auth-switch">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <AppLink to={isRegister ? '/login' : '/register'} onNavigate={onNavigate}>
                {isRegister ? 'Sign in' : 'Create an account'}
              </AppLink>
            </p>
          </div>
          <p className="auth-legal">Demo application. Train information shown after sign-in is sample data.</p>
        </section>
      </main>
      <PublicFooter onNavigate={onNavigate} />
    </div>
  )
}

function Dashboard({ user, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTrainId, setSelectedTrainId] = useState(trainData[0].id)
  const [selectedStationId, setSelectedStationId] = useState(trainData[0].stations[2].id)
  const [prediction, setPrediction] = useState(null)
  const [message, setMessage] = useState('')

  const searchValue = searchQuery.trim().toLowerCase()
  const filteredTrains = trainData.filter((train) =>
    !searchValue || train.id.includes(searchValue) || train.name.toLowerCase().includes(searchValue),
  )
  const selectedTrain = filteredTrains.find((train) => train.id === selectedTrainId)
  const selectedStation = selectedTrain?.stations.find((station) => station.id === selectedStationId)
  const currentStation = selectedTrain?.stations[selectedTrain.currentStationIndex]
  const progress = selectedTrain
    ? Math.round((selectedTrain.currentStationIndex / (selectedTrain.stations.length - 1)) * 100)
    : 0
  const statusClass = selectedTrain?.currentDelay > 15
    ? 'major-delay'
    : selectedTrain?.currentDelay > 0 ? 'delayed' : 'on-time'
  const statusText = selectedTrain?.currentDelay > 15
    ? `Major delay, ${selectedTrain.currentDelay} min`
    : selectedTrain?.currentDelay > 0 ? `Delayed by ${selectedTrain.currentDelay} min` : 'On time'

  const handleTrainChange = (event) => {
    const nextTrain = trainData.find((train) => train.id === event.target.value)
    if (!nextTrain) return
    const nextStation = nextTrain.stations[Math.min(nextTrain.currentStationIndex + 1, nextTrain.stations.length - 1)]
    setSelectedTrainId(nextTrain.id)
    setSelectedStationId(nextStation.id)
    setPrediction(null)
    setMessage('')
  }

  const handlePrediction = (event) => {
    event.preventDefault()
    setMessage('')

    if (!filteredTrains.length) {
      setMessage('Train not found.')
      setPrediction(null)
      return
    }

    if (!selectedTrain || !selectedStation) {
      setMessage('Select a train and station to view a prediction.')
      return
    }

    const predictedAdditionalDelay = Math.max(
      2,
      Math.round(selectedTrain.currentDelay * 0.35) +
        selectedStation.delayRisk * 2 +
        Math.round(selectedStation.distanceKm / 240),
    )
    setPrediction({
      schedule: selectedStation.arrival,
      additionalDelay: predictedAdditionalDelay,
      eta: addMinutesToTime(selectedStation.arrival, selectedTrain.currentDelay + predictedAdditionalDelay),
    })
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setPrediction(null)
    setMessage('')
  }

  return (
    <div className="dashboard-page">
      <header className="main-nav">
        <a className="nav-brand" href="/dashboard" aria-label="GatiVision dashboard">
          <img className="brand-logo" src={gativisionLogo} alt="" aria-hidden="true" />
          <span><strong>GatiVision</strong><small>Railway ETA Prediction</small></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a className="nav-active" href="#dashboard">Dashboard</a>
          <a href="#train-search">Trains</a>
          <a href="#eta-prediction">Predictions</a>
        </nav>
        <div className="profile-actions">
          <span className="profile-name">{user.name}</span>
          <button className="secondary-button logout-button" type="button" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <main className="dashboard-main" id="dashboard">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Operations overview</p>
            <h1>Railway ETA Dashboard</h1>
            <p>Track train status and view estimated arrival times.</p>
          </div>
          <span className="sample-label"><i /> Sample data</span>
        </div>

        <section className="panel search-panel" id="train-search" aria-labelledby="search-title">
          <div className="section-heading">
            <div><span className="section-index">01</span><h2 id="search-title">Find a train</h2></div>
            <p>Choose a train and destination station to view its ETA.</p>
          </div>
          <form className="search-form" onSubmit={handlePrediction}>
            <div className="field">
              <label htmlFor="train-search-input">Search train</label>
              <input id="train-search-input" type="search" value={searchQuery} onChange={handleSearchChange} placeholder="Train number or train name" />
            </div>
            <div className="field">
              <label htmlFor="train-select">Train</label>
              <select id="train-select" value={selectedTrain?.id || ''} onChange={handleTrainChange} disabled={!filteredTrains.length}>
                {filteredTrains.length ? filteredTrains.map((train) => (
                  <option key={train.id} value={train.id}>{train.id}  |  {train.name}</option>
                )) : <option value="">No matching trains</option>}
              </select>
            </div>
            <div className="field">
              <label htmlFor="station-select">Destination station</label>
              <select id="station-select" value={selectedStation?.id || ''} onChange={(event) => {
                setSelectedStationId(event.target.value)
                setPrediction(null)
              }} disabled={!selectedTrain}>
                {selectedTrain?.stations.map((station) => (
                  <option key={station.id} value={station.id}>{station.name}</option>
                ))}
              </select>
            </div>
            <button className="primary-button search-submit" type="submit" disabled={!selectedTrain}>View Prediction</button>
          </form>
          {message && <p className="form-message search-message" role="alert">{message}</p>}
        </section>

        {selectedTrain && selectedStation ? (
          <div className="dashboard-grid">
            <section className="panel status-panel" aria-labelledby="status-title">
              <div className="section-heading compact-heading">
                <div><span className="section-index">02</span><h2 id="status-title">Train status</h2></div>
                <span className={`status-badge ${statusClass}`}><i />{statusText}</span>
              </div>
              <p className="train-id">Train {selectedTrain.id}</p>
              <h3 className="train-name">{selectedTrain.name}</h3>
              <p className="train-route">{selectedTrain.route.replace(' to ', '  /  ')}</p>
              <div className="status-details">
                <div><span>Current station</span><strong>{currentStation.name}</strong></div>
                <div><span>Current delay</span><strong>{selectedTrain.currentDelay ? `+${selectedTrain.currentDelay} min` : 'On time'}</strong></div>
              </div>
              <p className="sample-note">Status shown is illustrative sample information.</p>
            </section>

            <section className="panel eta-panel" id="eta-prediction" aria-labelledby="eta-title">
              <div className="section-heading compact-heading">
                <div><span className="section-index">03</span><h2 id="eta-title">Predicted arrival</h2></div>
                <span className="eta-destination">{selectedStation.name}</span>
              </div>
              <div className="eta-row">
                <div><span>Scheduled ETA</span><strong>{formatTime(prediction?.schedule || selectedStation.arrival)}</strong></div>
                <div><span>Predicted delay</span><strong>{prediction ? `+${prediction.additionalDelay} min` : 'Not calculated'}</strong></div>
              </div>
              <div className="predicted-result">
                <span>GatiVision ETA</span>
                <strong>{prediction ? prediction.eta : '--:--'}</strong>
                {!prediction && <small>Select View Prediction to calculate an estimate.</small>}
              </div>
              <p className="sample-note">Estimate uses the included sample schedule and delay factors.</p>
            </section>

            <section className="panel route-panel" aria-labelledby="route-title">
              <div className="section-heading compact-heading">
                <div><span className="section-index">04</span><h2 id="route-title">Route progress</h2></div>
                <span className="progress-value">{progress}%</span>
              </div>
              <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
              <ol className="route-stops">
                {selectedTrain.stations.map((station, index) => (
                  <li key={station.id} className={[
                    index === selectedTrain.currentStationIndex ? 'is-current' : '',
                    station.id === selectedStation.id ? 'is-destination' : '',
                    index < selectedTrain.currentStationIndex ? 'is-passed' : '',
                  ].filter(Boolean).join(' ')}>
                    <span className="stop-marker" />
                    <span className="stop-name">{station.name}</span>
                    <span className="stop-meta">
                      {index === selectedTrain.currentStationIndex ? 'Current station' : station.id === selectedStation.id ? 'Selected destination' : formatTime(station.arrival)}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        ) : (
          <section className="panel no-trains" role="status">
            <h2>Train not found.</h2>
            <p>Try a different train number or name from the sample dataset.</p>
          </section>
        )}
        <footer className="dashboard-footer">GatiVision demonstration · Railway information shown is sample data, not a live railway feed.</footer>
      </main>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(readSessionUser)
  const [authNotice, setAuthNotice] = useState('')
  const [route, setRoute] = useState(() => {
    const requestedPath = window.location.pathname
    const isKnownPath = ['/', '/login', '/register', '/dashboard'].includes(requestedPath)
    let nextPath = isKnownPath ? requestedPath : '/'

    if (!user && nextPath === '/dashboard') nextPath = '/login'
    if (user && (nextPath === '/login' || nextPath === '/register')) nextPath = '/dashboard'
    if (requestedPath !== nextPath) window.history.replaceState({}, '', nextPath)
    return nextPath
  })

  const navigate = (path, replace = false) => {
    if (replace) window.history.replaceState({}, '', path)
    else window.history.pushState({}, '', path)
    setRoute(path)
    if (path !== '/login') setAuthNotice('')
  }

  useEffect(() => {
    const syncRoute = () => {
      const requested = window.location.pathname
      if (!user && requested === '/dashboard') {
        window.history.replaceState({}, '', '/login')
        setRoute('/login')
      } else if (user && (requested === '/login' || requested === '/register')) {
        window.history.replaceState({}, '', '/dashboard')
        setRoute('/dashboard')
      } else {
        setRoute(['/', '/login', '/register', '/dashboard'].includes(requested) ? requested : '/')
      }
    }
    window.addEventListener('popstate', syncRoute)
    return () => window.removeEventListener('popstate', syncRoute)
  }, [user])

  const handleAuthenticated = (authenticatedUser) => {
    sessionStorage.setItem(sessionKey, JSON.stringify(authenticatedUser))
    setUser(authenticatedUser)
    navigate('/dashboard')
  }

  const handleRegistered = () => {
    setAuthNotice('Account created. Sign in to access your dashboard.')
    navigate('/login')
  }

  const handleLogout = () => {
    sessionStorage.removeItem(sessionKey)
    setUser(null)
    navigate('/')
  }

  if (route === '/') {
    return <HomePage onNavigate={navigate} />
  }

  if (user && route === '/dashboard') {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  return (
    <AuthScreen
      mode={route === '/register' ? 'register' : 'login'}
      onNavigate={navigate}
      onAuthenticated={handleAuthenticated}
      onRegistered={handleRegistered}
      notice={authNotice}
    />
  )
}

export default App
