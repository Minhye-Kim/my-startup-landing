import { useEffect, useState } from 'react';

const navigation = [
  ['문제', 'problem'],
  ['루트메이트', 'solution'],
  ['기능', 'features'],
  ['가격', 'pricing'],
];

const features = [
  {
    number: '01',
    title: '우리 취향을 담은 추천',
    description: '지역, 분위기, 예산, 시간을 알려주면 둘 다 좋아할 만한 코스를 골라드려요.',
    scenario: '“산책하고 카페에서 쉬다가, 야경까지 보고 싶어.”',
    icon: '✳',
    tone: 'peach',
  },
  {
    number: '02',
    title: '같이 보고, 같이 결정',
    description: '루트를 공유하고 장소를 더하거나 순서를 바꾸며 편하게 의견을 모아요.',
    scenario: '“카페는 찬성! 보드게임은 투표해볼까?”',
    icon: '↗',
    tone: 'mint',
  },
  {
    number: '03',
    title: '덜 걷고, 더 즐기는 동선',
    description: '장소 사이의 거리와 이동 시간을 고려해 하루가 무리 없도록 연결해요.',
    scenario: '홍대에서 시작해 한강까지, 돌아가지 않는 코스로.',
    icon: '⌁',
    tone: 'lilac',
  },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const updateActiveSection = () => setActiveSection(window.location.hash.slice(1));
    window.addEventListener('hashchange', updateActiveSection);
    updateActiveSection();
    return () => window.removeEventListener('hashchange', updateActiveSection);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const entry = {
      name: formData.get('name'),
      email: formData.get('email'),
      plan: formData.get('plan'),
      createdAt: new Date().toISOString(),
    };
    const entries = JSON.parse(localStorage.getItem('routemate-signups') || '[]');
    localStorage.setItem('routemate-signups', JSON.stringify([...entries, entry]));
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="루트메이트 홈">
          <span className="wordmark-icon" aria-hidden="true">r</span>
          <span>routemate</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="주요 메뉴">
          {navigation.map(([label, id]) => (
            <a
              key={id}
              className={activeSection === id ? 'nav-link active' : 'nav-link'}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a className="nav-cta" href="#signup" onClick={() => setMenuOpen(false)}>
            사전 신청 <ArrowIcon />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero section-shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> YOUR DAY, YOUR ROUTE</p>
            <h1>데이트·나들이,<br />우리만의 루트를<br /><span>같이 설계해요.</span></h1>
            <p className="hero-description">
              지도 앱은 많아도, 우리에게 맞는 루트는 아직 없었어요.
              취향과 동선을 담아 약속 전 고민을 덜어드릴게요.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#signup">사전 신청하기 <ArrowIcon /></a>
              <a className="text-link" href="#solution">루트메이트 알아보기 <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-note"><span className="avatar-stack"><i>J</i><i>M</i><i>Y</i></span><span>약속 전 고민, 이제 함께 가볍게</span></div>
          </div>
          <div className="hero-visual" aria-label="서울 나들이 루트 미리보기">
            <img
              className="hero-photo"
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85"
              alt="친구들과 함께 보내는 야외 나들이"
            />
            <div className="photo-shade" />
            <div className="visual-topline"><span>오늘의 루트</span><span className="live-dot">함께 만드는 중</span></div>
            <div className="route-preview">
              <div className="route-heading"><div><small>SATURDAY · SEOUL</small><strong>한강 따라 천천히</strong></div><span className="route-weather">☀ 22°</span></div>
              <div className="route-stops">
                <div className="route-stop"><span className="stop-icon stop-cafe">01</span><span><b>연남, 작은 커피집</b><small>커피 한 잔 · 1시간</small></span><span className="stop-time">14:00</span></div>
                <div className="route-connector"><span /> 도보 12분</div>
                <div className="route-stop"><span className="stop-icon stop-walk">02</span><span><b>경의선 숲길 산책</b><small>나란히 걷기 · 40분</small></span><span className="stop-time">15:15</span></div>
                <div className="route-connector"><span /> 버스 18분</div>
                <div className="route-stop"><span className="stop-icon stop-view">03</span><span><b>한강 노을 피크닉</b><small>오늘의 마지막 장면</small></span><span className="stop-time">17:00</span></div>
              </div>
              <div className="route-footer"><span><i className="collab-avatar">S</i><i className="collab-avatar second">H</i> 둘이 함께 정리했어요</span><button type="button" aria-label="루트 공유">↗</button></div>
            </div>
            <div className="floating-note"><span className="sparkle">✦</span><span><b>둘 다 좋아요!</b><small>취향이 만나는 루트</small></span></div>
          </div>
          <a className="scroll-cue" href="#problem"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section className="problem-section section-shell" id="problem">
          <div className="section-kicker">THE PLAN BEFORE THE PLAN</div>
          <div className="problem-layout">
            <h2>장소 찾는 건 쉬운데,<br /><span>루트 짜기는 왜</span><br />이렇게 힘들까요?</h2>
            <div className="problem-list">
              <article><span className="problem-mark">01</span><p>여기저기 검색하며<br /><b>장소를 따로 저장하고</b></p><span className="problem-doodle">⌕</span></article>
              <article><span className="problem-mark">02</span><p>취향은 서로 다르고<br /><b>이동 시간은 놓치고</b></p><span className="problem-doodle">↝</span></article>
              <article><span className="problem-mark">03</span><p>결국 약속 전까지<br /><b>계속 고민하게 돼요</b></p><span className="problem-doodle">…</span></article>
            </div>
          </div>
          <p className="problem-bottom">만날 때보다 계획할 때 더 지치는 약속, 이제 바꿔볼까요?</p>
        </section>

        <section className="solution-section" id="solution">
          <div className="solution-inner section-shell">
            <div className="solution-art" aria-hidden="true">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <span className="orbit-label label-one">취향</span><span className="orbit-label label-two">거리</span><span className="orbit-label label-three">우리</span>
              <div className="solution-center"><span>r</span><small>ROUTE<br />MATE</small></div>
              <span className="solution-spark spark-one">✳</span><span className="solution-spark spark-two">✦</span>
            </div>
            <div className="solution-copy">
              <div className="section-kicker">A LITTLE HELP, A LOT MORE DAY</div>
              <h2>AI가 추천하고,<br /><span>함께 완성하는</span> 루트</h2>
              <p>지역·취향·시간을 바탕으로 AI가 코스를 제안하고, 동행인과 함께 다듬어 우리만의 하루를 완성해요.</p>
              <a className="button button-outline" href="#features">어떻게 만들어지나요? <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <section className="features-section section-shell" id="features">
          <div className="features-heading">
            <div><div className="section-kicker">LESS PLANNING, MORE LIVING</div><h2>우리의 하루를 바꾸는<br /><span>세 가지 작은 차이.</span></h2></div>
            <p>장소를 찾는 데서 끝나지 않도록.<br />‘오늘의 하루’를 함께 설계해요.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className={`feature-item ${feature.tone}`} key={feature.number}>
                <div className="feature-top"><span>{feature.number} / 03</span><span className="feature-icon" aria-hidden="true">{feature.icon}</span></div>
                <h3>{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-scenario"><span>IN REAL LIFE</span><p>{feature.scenario}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="scenario-section">
          <div className="scenario-inner section-shell">
            <div className="scenario-copy">
              <div className="section-kicker">SAME CITY, DIFFERENT KIND OF DAY</div>
              <h2>오늘은 친구랑,<br />내일은 연인과.</h2>
              <p>한 명은 느긋한 산책, 한 명은 맛있는 디저트.<br />서로 다른 취향도 한 코스 안에서 만날 수 있어요.</p>
              <a className="text-link" href="#signup">우리도 먼저 만나보기 <span aria-hidden="true">↗</span></a>
            </div>
            <div className="scenario-board">
              <div className="board-header"><span>SEOUL · SATURDAY</span><span className="board-menu">•••</span></div>
              <div className="board-title">오늘은 한강 쪽으로 갈까?</div>
              <div className="preference-row"><span className="preference-avatar avatar-orange">S</span><span><b>수진의 취향</b><small>산책 · 조용한 카페</small></span><span className="preference-check">✓</span></div>
              <div className="preference-row"><span className="preference-avatar avatar-green">H</span><span><b>현우의 취향</b><small>맛집 · 야외 테이블</small></span><span className="preference-check">✓</span></div>
              <div className="board-divider"><span /> 둘 다 좋아하는 장소</div>
              <div className="match-place"><span className="place-thumb">☕</span><span><b>망원 한강 산책 코스</b><small>산책 + 디저트 · 이동 15분</small></span><span className="match-heart">♥</span></div>
              <div className="board-reaction"><span>완전 좋아!</span><span>나도 찬성 🙌</span></div>
            </div>
          </div>
        </section>

        <section className="pricing-section section-shell" id="pricing">
          <div className="pricing-heading"><div className="section-kicker">SIMPLE FROM DAY ONE</div><h2>좋은 하루의 계획,<br /><span>부담 없이 시작해요.</span></h2><p>사전 신청하고 출시 소식을 가장 먼저 받아보세요.</p></div>
          <div className="pricing-grid">
            <article className="price-plan">
              <div className="plan-label">EARLY ACCESS</div><h3>먼저 만나보기</h3><p>사전 신청자에게 출시 소식을 가장 먼저 전해드려요.</p>
              <div className="plan-price">무료 <small>/ 얼리 액세스</small></div>
              <ul><li>취향 맞춤 코스 추천</li><li>친구와 루트 공유</li><li>베타 업데이트 우선 안내</li></ul>
              <a className="button button-dark" href="#signup">무료로 사전 신청 <ArrowIcon /></a>
            </article>
            <article className="price-plan plan-soon">
              <div className="plan-label">COMING SOON</div><h3>우리의 하루+</h3><p>더 많은 약속을 함께 설계하고 싶다면.</p>
              <div className="plan-price">준비 중 <small>/ 출시 알림 제공</small></div>
              <ul><li>취향을 더 섬세하게 반영</li><li>함께 만드는 루트 보관</li><li>새로운 지역과 테마 코스</li></ul>
              <a className="plan-notice" href="#signup">출시 소식 받아보기 <ArrowIcon /></a>
            </article>
          </div>
        </section>

        <section className="signup-section" id="signup">
          <div className="signup-inner section-shell">
            <div className="signup-copy"><div className="section-kicker">YOUR NEXT DAY OUT STARTS HERE</div><h2>약속 전에 지치지 않게,<br /><span>우리만의 하루 루트를</span><br />미리 만나보세요.</h2><p>사전 신청하고 루트메이트의 첫 번째 소식을 받아보세요.<br />서비스가 준비되면 가장 먼저 알려드릴게요.</p><div className="signup-promise"><span>✦</span> 지금은 무료, 부담 없이 미리 만나보기</div></div>
            <div className="signup-form-wrap">
              {submitted ? (
                <div className="success-message" role="status"><span className="success-icon">✓</span><h3>신청이 접수됐어요!</h3><p>루트메이트의 첫 번째 소식을<br />가장 먼저 전해드릴게요.</p><button type="button" className="text-link" onClick={() => setSubmitted(false)}>다른 이메일로 신청하기</button></div>
              ) : (
                <form className="signup-form" onSubmit={handleSubmit}>
                  <div className="form-heading"><span>ROUTEMATE EARLY ACCESS</span><h3>우리의 다음 약속을 위해</h3></div>
                  <label htmlFor="name">이름</label><input id="name" name="name" type="text" placeholder="어떻게 불러드릴까요?" autoComplete="name" required />
                  <label htmlFor="email">이메일</label><input id="email" name="email" type="email" placeholder="소식을 받을 이메일 주소" autoComplete="email" required />
                  <label htmlFor="plan">가장 기대하는 것</label><select id="plan" name="plan" defaultValue="" required><option value="" disabled>하나를 골라주세요</option><option value="recommendation">취향에 맞는 코스 추천</option><option value="collaboration">친구와 함께 루트 만들기</option><option value="route">편한 이동 동선 찾기</option></select>
                  <button className="button button-orange" type="submit">사전 신청하고 소식 받기 <ArrowIcon /></button>
                  <p className="form-privacy">데모 신청 정보는 이 브라우저에만 저장돼요.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main section-shell"><a className="wordmark footer-wordmark" href="#top"><span className="wordmark-icon" aria-hidden="true">r</span><span>routemate</span></a><p>AI가 추천하고, 우리가 함께 완성하는 하루의 루트.</p><a className="footer-top" href="#top">맨 위로 ↑</a></div>
        <div className="footer-bottom section-shell"><span>© 2026 Routemate. A better day, together.</span><span>Made for the days we remember.</span></div>
      </footer>
    </>
  );
}

export default App;