import React, { useState, useEffect } from "react";
import { Button, Form, Navbar, Nav, Dropdown, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiSearch } from "react-icons/bi";
import { BiCart } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { BsList } from "react-icons/bs";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryFetch } from "../../store/action/categoryAction";
import { addPreception, loginOpen } from "../../store/action/profileAction";
import { cartDate } from "../../store/action/cartAction";
import { FaFileUpload } from "react-icons/fa";
import Search from "../search/search";
const NavigationBar = (props) => {
  const { category, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const { user, isLoggedIn } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(cartDate(user && user.token));
    dispatch(categoryFetch());
  }, dispatch);

  return (
    <header>
      {/* top navigationbar */}
      <div className='header-top'>
        <div className='container'>
          <div className='header-top-contain'>
            <Link to='/' className='logo'>
              <h2>Pharmamandu</h2>
            </Link>

            {/*  */}
            <div className='search'>
              <Search />
            </div>
            <div className='group-cart'>
              {/* <div className='icons'>
                <span className='count-cart'>0</span>

                <MdFavoriteBorder
                  onClick={() => {
                    document
                      .getElementsByTagName("body")[0]
                      .classList.add("right-bar-enabled");
                  }}
                  className='icon'
                />
              </div> */}
              <div className='icons'>
                <span className='count-cart'>
                  {cart.data ? cart.data.totalQuantity : 0}
                </span>
                <BiCart
                  onClick={() => {
                    document
                      .getElementsByTagName("body")[0]
                      .classList.add("cart-right-bar-enabled");
                  }}
                  className='icon'
                />
              </div>

              <div
                className='price-cart'
                onClick={() =>
                  isLoggedIn
                    ? dispatch(addPreception())
                    : dispatch(addPreception())
                }>
                <FaFileUpload className='upload-icon' />

                <span>Upload Prescription</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end top navigationbar  */}
      {/* main nav  */}
      <div className='header-main'>
        <div className='container'>
          <div className='m-bar'>
            <Navbar expand='lg' className='navbar'>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <ul class='main-navigation'>
                  <li>
                    <span>
                      <BsList className='category-icon' />
                      All Category
                    </span>
                    <ul>
                      {category &&
                        category.map((catData) => (
                          <li>
                            <a href={`/filter/${catData._id}`}>
                              {catData.name}
                            </a>
                            {/* <ul>
                            <li>
                              <a href='/filter'>BP Monitors</a>
                            </li>
                            <li>
                              <a href='/filter'>Sexual Wellness</a>
                            </li>
                            <li>
                              <a href='/filter'>Health Care</a>
                            </li>
                          </ul> */}
                          </li>
                        ))}
                    </ul>
                  </li>
                </ul>
                <Nav>
                  <Nav.Link href='/about'>About</Nav.Link>
                  <Nav.Link href='/blog'>Blog</Nav.Link>

                  <Nav.Link href='/contact'>Contact</Nav.Link>
                </Nav>
                <Nav className='nav-login'>
                  {isLoggedIn ? (
                    <Dropdown>
                      <Dropdown.Toggle
                        className='profile-dropdown'
                        id='dropdown-basic'>
                        <BsPersonFill className='login-icon' /> Profile
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {/* <Dropdown.Item href='#/action-2'>
                          Proffile
                        </Dropdown.Item> */}
                        <Dropdown.Item href='/logout'>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Nav.Link onClick={() => dispatch(loginOpen())}>
                      <BsPersonFill className='login-icon' />
                      Login
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Row className='mx-2 search-row'>
              <Col>
                <Search />
                {/* <Form className='small-form'>
                  <input
                    className='form-control small-d-control'
                    type='search'
                    placeholder='Search for products...'
                    aria-label='Search'></input>
                  <Button className='search-btn small-d-search' type='submit'>
                    <BiSearch />
                  </Button>
                </Form> */}
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* end main category  */}
    </header>
  );
};

export default NavigationBar;
