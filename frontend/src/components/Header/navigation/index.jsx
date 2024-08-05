import React, { useState } from "react";
import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from '../../../redux/services/category';

function Navigation() {
  const [isOpenSideBarVal, setIsOpenSideBarVal] = useState(false);
  const { data, error, isLoading } = useGetCategoriesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;

  return (
    <nav className="headerWrapper">
      <div className="container">
        <div className="row">
          <div className="col-sm-2 navPart1">
            <div className="cartWrapper">
              <Button
                className="allCartTab align-items-center"
                onClick={() => setIsOpenSideBarVal(!isOpenSideBarVal)}
              >
                <span className="icon1 mr-2">
                  <IoIosMenu />
                </span>
                <span className="text">ALL CATEGORIES</span>
                <span className="icon2 ml-2">
                  <FaAngleDown />
                </span>
              </Button>
              <div className={`sideBarNav ${isOpenSideBarVal ? "open" : ""}`}>
                <ul>
                  {data.categories.map((category) => (
                    <li className="list-inline-item" key={category.id}>
                      <Link to={`/cat/${category.id}`}>
                        <Button>{category.name}</Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-10 navPart2 d-flex align-items-center">
            <ul className="list list-inline ml-auto">
              <li className="list-inline-item">
                <Link to={"/"}>
                  <Button>Home</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}>
                  <Button>Top Sellers</Button>
                </Link>
                <div className="subMenu shadow">
                  <Link to={"/"}>
                    <Button>Onions</Button>
                  </Link>
                  <Link to={"/"}>
                    <Button>Banana</Button>
                  </Link>
                  <Link to={"/"}>
                    <Button>Tomato</Button>
                  </Link>
                  <Link to={"/"}>
                    <Button>Ghee</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}>
                  <Button>Ghee</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}>
                  <Button>Milk</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}>
                  <Button>Meat</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}>
                  <Button>Bakery</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}>
                  <Button>Contact Us</Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
