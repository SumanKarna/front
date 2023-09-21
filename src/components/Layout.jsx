import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import { useDispatch, useSelector } from "react-redux";
import { FrontNav } from "./FrontNav";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { clearStorage, fromStorage } from "../lib";
import { clearUser, setUser } from "../store";
import http from "../http";

export const Layout = () => {
  const [cartInfo, setCartInfo] = useState({qty:0, total:0})
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch()
  useEffect(() => {
    if (Object.keys(user).length == 0 ) {
      const token = fromStorage('130fronttoken')

        if(token){
            http.get('profile/details')
                .then(({data})=> dispatch(setUser(data)))
                .catch(err => {})
        }
    }
}, [user])

useEffect(() => {
  if(Object.keys(cart).length){
    let qty = 0, total = 0

    for(let id in cart){
      qty += cart[id].qty
      total += cart[id].total
    }
    setCartInfo({qty, total})
  } else {
    setCartInfo({qty: 0, total:0})
  }
},[cart])

const handleLogout = () =>{
  clearStorage('130fronttoken')
  dispatch(clearUser())
}

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <div className="col-12">
          <header className="row">
            <div className="col-12 bg-dark py-2 d-md-block d-none">
              <div className="row">
                <div className="col-auto me-auto">
                  <ul className="top-nav">
                    <li>
                      <a href="tel:+123-456-7890">
                        <i className="fa fa-phone-square me-2"></i>+123-456-7890
                      </a>
                    </li>
                    <li>
                      <a href="mailto:mail@ecom.com">
                        <i className="fa fa-envelope me-2"></i>mail@ecom.com
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-auto">
                  <ul className="top-nav">
                    {Object.keys(user).length ? (
                      <>
                        <li>
                          <Link to="/profile">
                            <i className="fas fa-user-edit me-2"></i>
                            {user.name}
                          </Link>
                        </li>
                        <li>
                          <Button
                            variant="link"
                            type="button"
                            className="p-0 link-light text-decoration-none"
                            onClick={handleLogout}
                          >
                            <small>
                            <i className="fas-fa-sign-out-alt me-2"></i>Logout
                            </small>
                          </Button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/register">
                            <i className="fas fa-user-edit me-2"></i>Register
                          </Link>
                        </li>
                        <li>
                          <Link to="/login">
                            <i className="fas fa-sign-in-alt me-2"></i>Login
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-12 bg-white pt-4">
              <div className="row">
                <div className="col-lg-auto">
                  <div className="site-logo text-center text-lg-left">
                    <Link to="/">Suman's In-Fashion</Link>
                  </div>
                </div>
                <div className="col-lg-5 mx-auto mt-4 mt-lg-0">
                  <form action="#">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="search"
                          className="form-control border-dark"
                          placeholder="Search..."
                          required
                        />
                        <button className="btn btn-outline-dark">
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-auto text-center text-lg-left header-item-holder">
                  <a href="#" className="header-item">
                    <i className="fas fa-heart me-2"></i>
                    <span id="header-favorite">0</span>
                  </a>
                  <a href="cart.html" className="header-item">
                    <i className="fas fa-shopping-bag me-2"></i>
                    <span id="header-qty" className="me-3">
                      {cartInfo.qty}
                    </span>
                    <i className="fas fa-money-bill-wave me-2"></i>
                    <span id="header-price">Rs.{cartInfo.total}</span>
                  </a>
                </div>
              </div>

              <div className="row">
                <FrontNav />
              </div>
            </div>
          </header>
        </div>

        <Outlet />

        <div className="col-12 align-self-end">
          <footer className="row">
            <div className="col-12 bg-dark text-white pb-3 pt-5">
              <div className="row">
                <div className="col-lg-2 col-sm-4 text-center text-sm-left mb-sm-0 mb-3">
                  <div className="row">
                    <div className="col-12">
                      <div className="footer-logo">
                        <Link to={"/"}>Suman's In-Fashion</Link>
                      </div>
                    </div>
                    <div className="col-12">
                      <address>
                        221B Baker Street
                        <br />
                        London, England
                      </address>
                    </div>
                    <div className="col-12">
                      <a href="#" className="social-icon">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-pinterest-p"></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-8 text-center text-sm-left mb-sm-0 mb-3">
                  <div className="row">
                    <div className="col-12 text-uppercase">
                      <h4>Who are we?</h4>
                    </div>
                    <div className="col-12 text-justify">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam imperdiet vel ligula vel sodales. Aenean vel
                        ullamcorper purus, ac pharetra arcu. Nam enim velit,
                        ultricies eu orci nec, aliquam efficitur sem. Quisque in
                        sapien a sem vestibulum volutpat at eu nibh. Suspendisse
                        eget est metus. Maecenas mollis quis nisl ac malesuada.
                        Donec gravida tortor massa, vitae semper leo sagittis a.
                        Donec augue turpis, rutrum vitae augue ut, venenatis
                        auctor nulla. Sed posuere at erat in consequat. Nunc
                        congue justo ut ante sodales, bibendum blandit augue
                        finibus.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-sm-3 col-5 ms-lg-auto ms-sm-0 ms-auto mb-sm-0 mb-3">
                  <div className="row">
                    <div className="col-12 text-uppercase">
                      <h4>Quick Links</h4>
                    </div>
                    <div className="col-12">
                      <ul className="footer-nav">
                        <li>
                          <a href="#">Home</a>
                        </li>
                        <li>
                          <a href="#">Contact Us</a>
                        </li>
                        <li>
                          <a href="#">About Us</a>
                        </li>
                        <li>
                          <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="#">Terms & Conditions</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-sm-2 col-4 me-auto mb-sm-0 mb-3">
                  <div className="row">
                    <div className="col-12 text-uppercase text-underline">
                      <h4>Help</h4>
                    </div>
                    <div className="col-12">
                      <ul className="footer-nav">
                        <li>
                          <a href="#">FAQs</a>
                        </li>
                        <li>
                          <a href="#">Shipping</a>
                        </li>
                        <li>
                          <a href="#">Returns</a>
                        </li>
                        <li>
                          <a href="#">Track Order</a>
                        </li>
                        <li>
                          <a href="#">Report Fraud</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 text-center text-sm-left">
                  <div className="row">
                    <div className="col-12 text-uppercase">
                      <h4>Newsletter</h4>
                    </div>
                    <div className="col-12">
                      <form action="#">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your email..."
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <button className="btn btn-outline-light text-uppercase">
                            Subscribe
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
