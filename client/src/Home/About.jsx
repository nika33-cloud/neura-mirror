import serv1 from "../assets/services/1.png";
import serv2 from "../assets/services/2.png";
import serv3 from "../assets/services/3.png";
import serv4 from "../assets/services/4.png";
import serv5 from "../assets/services/5.png";
import serv6 from "../assets/services/6.png";
import team from "../assets/team/4.jpg";
import "../style/home.css";


function About() {
  

  return (
    <>

      <div className="container2">
        <div className="content">
          <div className="text1">
            <h1>About Us</h1>
            <p>
  Welcome to <span>Neura Mirror</span> — where thoughtful investing meets
  clarity and precision. We’re here to help you unlock real value from your
  investments through smart tools, trusted insights, and carefully selected
  opportunities.
  <br />
  <br />
  Our mission is simple: give you access to high-quality investment options,
  practical expertise, and an intuitive platform designed to support better
  financial decisions at every stage of your journey.
  <br />
  <br />
  Explore a curated range of opportunities built to align with your goals.
  Behind the platform is a team focused on research, strategy, and long-term
  thinking — so you’re never investing blindly.
  <br />
  <br />
  What makes <span>Neura Mirror</span> different is our focus on you. Every
  investor is unique, and the experience adapts to match your needs. Whether
  you’re just getting started or already experienced, you’ll find tools that
  make investing clearer, not more complicated.
  <br />
  <br />
  From real-time market insights to personalized recommendations and planning
  tools, Neura Mirror is built to help you stay informed and confident.
  <br />
  <br />
  When you join <span>Neura Mirror</span>, you become part of a community that
  values shared knowledge and steady growth. We don’t just provide a platform —
  we partner with you as you navigate the financial landscape and build toward
  a stronger future.
  <br />
  <br />
  Discover what’s possible, make smarter moves, and let <span>Neura Mirror</span> support your path to long-term financial growth.
</p>

          </div>
          <div className="team">
            <div className="team-text">
              <h1>
                Meet Our <span>Advisers</span>
              </h1>
              <p>
                Hey everyone, meet our amazing advisers! They&#39;re here to
                help and guide us through anything.
              </p>
            </div>
            <div className="team-2">
              <div className="teaminfo">
                <img src={team} />
                <div className="team-details">
                  <h6 className="mb-1">Philip Russell</h6>
                  <p className="mb-0">Trade Captain</p>
                </div>
              </div>

              <div className="teaminfo">
                <img src={team} />
                <div className="team-details">
                  <h6 className="mb-1">Jayde Cross</h6>
                  <p className="mb-0">Special Adviser</p>
                </div>
              </div>

              <div className="teaminfo">
                <img src={team} />
                <div className="team-details">
                  <h6 className="mb-1">Dianne Legolas</h6>
                  <p className="mb-0">Legal Consultant</p>
                </div>
              </div>
            </div>
          </div>

          <div>
        <div className="text4">
          <h1>
            <span>Services</span> We Offer
          </h1>
          <p>
            We provide premier services, spanning market values, maintenance,
            and additional offerings, presenting a compelling investment
            opportunity in the realm of superior service provision.
          </p>
        </div>
        <div className="service">
          <div className="service-info">
            <div className="service-thumb">
              <img src={serv1} alt="service-icon" />
            </div>

            <div className="service-content">
              <h3>Strategy Consulting</h3>
              <p>
                A social assistant that&#39;s flexible can accommodate your
                schedule and needs, making life easier.
              </p>
            </div>
          </div>

          <div className="service-info">
            <div className="service-thumb">
              <img src={serv2} alt="service-icon" />
            </div>

            <div className="service-content">
              <h3>Financial Advisory</h3>
              <p>
                Modules transform smart trading by automating processes and
                improving decision-making.
              </p>
            </div>
          </div>

          <div className="service-info">
            <div className="service-thumb">
              <img src={serv3} alt="service-icon" />
            </div>

            <div className="service-content">
              <h3>Management</h3>
              <p>
                There, it&#39;s me, your friendly neighborhood reporter&#39;s
                news analyst processes and improving
              </p>
            </div>
          </div>

          <div className="service-info">
            <div className="service-thumb">
              <img src={serv4} alt="service-icon" />
            </div>

            <div className="service-content">
              <h3>Supply Optimization</h3>
              <p>
                Hey, have you checked out that new cryptocurrency platform?
                It&#39;s pretty cool and easy to use!
              </p>
            </div>
          </div>

          <div className="service-info">
            <div className="service-thumb">
              <img src={serv5} alt="service-icon" />
            </div>

            <div className="service-content">
              <h3>HR consulting</h3>
              <p>
                Hey guys, just a quick update on exchange orders. There have
                been some changes currency!
              </p>
            </div>
          </div>

          <div className="service-info">
            <div className="service-thumb">
              <img src={serv6} alt="service-icon" />
            </div>

            <div className="service-content">
              <h3>Marketing consulting</h3>
              <p>
                Hey! Just wanted to let you know that the price notification
                module processes is now live!
              </p>
            </div>
          </div>
        </div>

      </div>

          <div className="sub1">
            <h1>
              Subscribe to <span>Our Newsletter</span>
            </h1>
            <p>
              Hey! Are you tired of missing out on our updates?
              <br />
              Subscribe to our news now and stay in the loop!
            </p>
            <form>
              <input type="email" placeholder="Email address" />
              <br />
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}

export default About;
