import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Closure Notice Banner */}
      <div className={styles.noticeBanner}>
        <p>🌸 We will be closed May 26th - May 31st. We will reopen June 2nd at 10 AM 🌸</p>
      </div>

      {/* Header with Logo and Navigation */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Image
            className={styles.logo}
            src="/CoutureGreek.png"
            alt="Couture Greek - Classic Apparel for Greeks"
            width={250}
            height={120}
            priority
          />
          <nav className={styles.nav}>
            <a href="#" className={styles.navLink + ' ' + styles.active}>
              Home
            </a>
            <a href="#" className={styles.navLink}>
              Online Store
            </a>
            <a href="#" className={styles.navLink}>
              Custom Gallery
            </a>
            <a href="#" className={styles.navLink}>
              Photo Gallery
            </a>
            <a href="customizer" className={styles.navLink}>
              Design Yours
            </a>
            <a href="#" className={styles.navLink}>
              More ▼
            </a>
          </nav>
          <div className={styles.headerIcons}>
            <button className={styles.iconButton}>🔍</button>
            <button className={styles.iconButton}>🛒</button>
            <button className={styles.iconButton}>👤</button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* Hero Image Grid */}
        <section className={styles.heroGrid}>
          <div className={styles.heroImage}>
            <Image src="/CoutureGreek1.png" alt="Greek apparel" width={400} height={600} />
          </div>
          <div className={styles.heroImage + ' ' + styles.centerImage}>
            <Image
              src="/CoutureGreek2.png"
              alt="Student in Greek apparel"
              width={400}
              height={600}
            />
          </div>
          <div className={styles.heroImage}>
            <Image src="/CoutureGreek3.png" alt="Greek merchandise" width={400} height={600} />
          </div>
        </section>

        {/* Greek Organization Logos Grid */}
        <section className={styles.logosGrid}>
          <div className={styles.logoRow}>
            <div className={styles.orgLogo}>
              <Image src="/AKA.png" alt="AKA" width={300} height={300} />
            </div>
            <div className={styles.orgLogo}>
              <Image src="/DELTA.png" alt="Delta Sigma Theta" width={300} height={300} />
            </div>
            <div className={styles.orgLogo}>
              <Image src="/SGRHO.png" alt="Sigma Gamma Rho" width={300} height={300} />
            </div>
          </div>
          <div className={styles.logoRow}>
            <div className={styles.orgLogo}>
              <Image src="/AKA.png" alt="Kappa Alpha Psi" width={300} height={300} />
            </div>
            <div className={styles.orgLogo}>
              <Image src="/DELTA.png" alt="Omega Psi Phi" width={300} height={300} />
            </div>
            <div className={styles.orgLogo}>
              <Image src="/SGRHO.png" alt="Phi Beta Sigma" width={300} height={300} />
            </div>
          </div>
          <div className={styles.logoRow}>
            <div className={styles.orgLogo}>
              <Image src="/AKA.png" alt="Kappa Alpha Psi" width={300} height={300} />
            </div>
            <div className={styles.orgLogo}>
              <Image src="/DELTA.png" alt="Omega Psi Phi" width={300} height={300} />
            </div>
            <div className={styles.orgLogo}>
              <Image src="/SGRHO.png" alt="Phi Beta Sigma" width={300} height={300} />
            </div>
          </div>
        </section>

        {/* Gift Card Section */}
        <section className={styles.giftCardSection}>
          <div className={styles.giftCardContent}>
            <div className={styles.giftCardImage}>
              <Image src="/CGGIFTCARD.png" alt="Couture Greek Gift Card" width={400} height={250} />
            </div>
            <div className={styles.giftCardText}>
              <h2>FASHIONABLE GIFT CARDS</h2>
              <p>
                Give the gift of fashion with a Couture Greek gift card. Perfect for birthdays,
                holidays, or just because!
              </p>
              <button className={styles.buyGiftCardButton}>Buy Gift Card</button>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className={styles.socialSection}>
          <h2>FOLLOW US ON SOCIAL</h2>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon}>
              📘
            </a>
            <a href="#" className={styles.socialIcon}>
              📷
            </a>
            <a href="#" className={styles.socialIcon}>
              📌
            </a>
            <a href="#" className={styles.socialIcon}>
              🎵
            </a>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className={styles.newsletter}>
          <h2>GET ON THE LIST.</h2>
          <p>
            Be the first to see the new styles and get notified when we have a pop up event or
            special promotion.
          </p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Email Address" className={styles.emailInput} />
            <button type="submit" className={styles.joinButton}>
              Join
            </button>
          </form>
          <div className={styles.socialIconsSmall}>
            <a href="#" className={styles.socialIconSmall}>
              📘
            </a>
            <a href="#" className={styles.socialIconSmall}>
              📷
            </a>
            <a href="#" className={styles.socialIconSmall}>
              📌
            </a>
            <a href="#" className={styles.socialIconSmall}>
              🎵
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Copyright © 2025 Couture Greek - All Rights Reserved.</p>
      </footer>
    </div>
  );
}
