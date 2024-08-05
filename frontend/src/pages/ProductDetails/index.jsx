import React, { useState } from "react";
import ProductZoom from "../../components/ProductZoom";
import { Rating, Tooltip } from "@mui/material";
import QuantityBox from "../../components/quantityBox";
import { Button } from "@mui/material";
import { BsCartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import RelatedProducts from "./RelatedProducts/index";

function ProductDetails() {
  const [activeTab, setActiveTab] = useState(0);
 
  return (
    <section className="productDetails section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 pl-5">
            <ProductZoom />
          </div>
          <div className="col-md-7 pl-5 pr-4">
            <h2 className="hd text-capitalize">Product Details</h2>

            <ul className="list list-inline">
              <li className="list-inline-item">
                <div className="d-flex align-items-center">
                  <span className="text-dark">Brand: </span>
                  <span> welch 's </span>
                </div>
              </li>
              <li className="list-inline-item">
                <div className="d-flex align-items-center">
                  <Rating
                    name="read-only"
                    value={4.5}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <span className="text-dark cursor">1 Review</span>
                </div>
              </li>
            </ul>
            <div className="d-flex info mb-3">
              <span className="oldPrice">$10.00</span>
              <span className="netPrice text-danger">$7.00</span>
            </div>

            <span className="badge badge-success">In Stock</span>

            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
              accusamus optio odio distinctio nesciunt blanditiis dolorem
              reprehenderit praesentium delectus sit debitis dignissimos in
              omnis assumenda facere iste, rem ducimus. Fuga?
            </p>

            <div className="d-flex align-items-center mt-3">
              <QuantityBox />
              <Button className="btn-blue btn-lg btn-big btn-round">
                <BsCartFill className="mr-2" />
                Add to cart
              </Button>
              <Tooltip title="Add to wishlist" placement="top">
                <Button className="btn-blue btn-lg btn-big btn-circle ml-4">
                  <FaRegHeart />
                </Button>
              </Tooltip>
              <Tooltip title="Add to compare" placement="top">
                <Button className="btn-blue btn-lg btn-big btn-circle ml-4">
                  <MdOutlineCompareArrows />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="card mt-5 p-5 detailsPageTabs">
          <div className="customTabs">
            <ul className="list list-inline">
              <li className="list-inline-item">
                <Button
                  className={`${activeTab === 0 && "active"}`}
                  onClick={() => setActiveTab(0)}
                >
                  Description
                </Button>
              </li>
              <li className="list-inline-item">
                <Button
                  className={`${activeTab === 1 && "active"}`}
                  onClick={() => setActiveTab(1)}
                >
                  Additional info
                </Button>
              </li>
              <li className="list-inline-item">
                <Button
                  className={`${activeTab === 2 && "active"}`}
                  onClick={() => setActiveTab(2)}
                >
                  Reviews (3)
                </Button>
              </li>
            </ul>
            <br />
            {activeTab === 0 && (
              <div className="tabContent">
                <p>Description</p>
              </div>
            )}

            {activeTab === 1 && (
              <div className="tabContent">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr className="stand-up">
                        <th>Stand Up</th>
                        <td>
                          <p>35"L x 24"W x 37-45"H (front to back wheel)</p>
                        </td>
                      </tr>
                      <tr className="folded-wo-wheels">
                        <th>Folded (w/o wheels)</th>
                        <td>
                          <p>32.5"L x 18.5"W x 16.5"H</p>
                        </td>
                      </tr>
                      <tr className="folded-w-wheels">
                        <th>Folded (w/ wheels)</th>
                        <td>
                          <p>32.5"L x 24"W x 18.5"H</p>
                        </td>
                      </tr>
                      <tr className="door-pass-through">
                        <th>Door Pass Through</th>
                        <td>
                          <p>24"</p>
                        </td>
                      </tr>
                      <tr className="frame">
                        <th>Frame</th>
                        <td>
                          <p>Aluminum</p>
                        </td>
                      </tr>
                      <tr className="weight-wo-wheels">
                        <th>Weight (w/o wheels)</th>
                        <td>
                          <p>20 LBS</p>
                        </td>
                      </tr>
                      <tr className="weight-capacity">
                        <th>Weight Capacity</th>
                        <td>
                          <p>60 LBS</p>
                        </td>
                      </tr>
                      <tr className="width">
                        <th>Width</th>
                        <td>
                          <p>24"</p>
                        </td>
                      </tr>
                      <tr className="handle-height-ground-to-handle">
                        <th>Handle height (ground to handle)</th>
                        <td>
                          <p>37-45"</p>
                        </td>
                      </tr>
                      <tr className="wheels">
                        <th>Wheels</th>
                        <td>
                          <p>37-45"</p>
                        </td>
                      </tr>
                      <tr className="seat-back-height">
                        <th>Seat back height</th>
                        <td>
                          <p>21.5"</p>
                        </td>
                      </tr>
                      <tr className="head-room-inside-canopy">
                        <th>Head room (inside canopy)</th>
                        <td>
                          <p>25"</p>
                        </td>
                      </tr>
                      <tr className="pa_color">
                        <th>Color</th>
                        <td>
                          <p>Black, Blue, Red, White</p>
                        </td>
                      </tr>
                      <tr className="pa_size">
                        <th>Size</th>
                        <td>
                          <p>M, S</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className="tabContent">
                <div className="row">
                  <div className="col-md-8">
                    <h3>Customer questions & answers</h3>
                    <br />
                    <div className="card p-4 reviewsCard flex-row">
                      <div className="image">
                        <div className="rounded-circle">
                          <img
                            src="https://wp.alithemes.com/html/nest/demo/assets/imgs/blog/author-2.png"
                            alt="Author"
                          />
                        </div>
                        <span className="text-g d-block text-center font-weight-bold">
                          {/* {item.userName} */}
                          Rinku
                        </span>
                      </div>
                      <div className="info pl-5">
                        <div className="d-flex align-items-center w-100">
                          <h5 className="text-light">21/05/2002</h5>
                          <div className="ml-auto">
                            <Rating
                              name="half-rating-read"
                              value={4.5}
                              precision={0.5}
                              readOnly
                              size="small"
                            />
                          </div>
                        </div>
                        <p>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Ea, sit vitae eius ullam animi quaerat tempore
                          sint odio perspiciatis, dolore molestiae porro ducimus
                          mollitia dignissimos architecto aspernatur,
                          praesentium reprehenderit. Placeat!
                        </p>
                      </div>
                    </div>

                    <br className="res-hide"/>
                    <br className="res-hide"/>

                    <form className="reviewForm">
                        <h4>Add a review</h4>
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            placeholder="Write a Review"
                            name="review"
                          ></textarea>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="userName"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <Rating
                                name="rating"
                                value={4.5}
                                precision={0.5}
                              />
                            </div>
                          </div>

                          <br/>

                          <div className="form-group">
                            <Button type="submit" className="btn-blue btn-lg btn-big btn-round ">Submit review</Button>
                          </div>

                        </div>
                      </form>



                  </div>



                  

                  <div className="col-md-4 pl-5 reviewBox">

                    <h4>Customers reviews</h4>

                    <div className="d-flex align-items-center mt-2">
                      <Rating name ="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                      <strong className="ml-3">4.8 out of 5</strong>
                    </div>


                  <br/>
                    <div className="progressBarBox d-flex align-items-center">
                      <span className="mr-3">5 star</span>
                      <div className="progress" style={{width:'78%',height:'20px'}}>
                        <div className="progress-bar bg-success" style={{width:'75%',height:'20px'}}>75%</div>
                      </div>
                    </div>
                    <div className="progressBarBox d-flex align-items-center">
                      <span className="mr-3">4 star</span>
                      <div className="progress" style={{width:'78%',height:'20px'}}>
                        <div className="progress-bar bg-success" style={{width:'75%',height:'20px'}}>75%</div>
                      </div>
                    </div>
                    <div className="progressBarBox d-flex align-items-center">
                      <span className="mr-3">3 star</span>
                      <div className="progress" style={{width:'78%',height:'20px'}}>
                        <div className="progress-bar bg-success" style={{width:'75%',height:'20px'}}>75%</div>
                      </div>
                    </div>
                    <div className="progressBarBox d-flex align-items-center">
                      <span className="mr-3">2 star</span>
                      <div className="progress" style={{width:'78%',height:'20px'}}>
                        <div className="progress-bar bg-success" style={{width:'75%',height:'20px'}}>75%</div>
                      </div>
                    </div>
                    <div className="progressBarBox d-flex align-items-center">
                      <span className="mr-3">1 star</span>
                      <div className="progress" style={{width:'78%',height:'20px'}}>
                        <div className="progress-bar bg-success" style={{width:'75%',height:'20px'}}>75%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

            <br/>

            <RelatedProducts/>


      </div>
    </section>
  );
}

export default ProductDetails;


{/* <div className="reviewForm">
                        <h4>Add a review</h4>
                        <br />
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            placeholder="Write a Review"
                            name="review"
                          ></textarea>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="userName"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <Rating
                                name="rating"
                                value={4.5}
                                precision={0.5}
                              />
                            </div>
                          </div>
                        </div>
                      </div> */}

{
  /* <div className='customTabs'>

<ul className='list list-inline'>

<li className='list-inline-item'>

<Button className={`${activeTabs === 0 && 'active'}`}

onClick={() => {

setActiveTabs (0)

}}

>Description</Button>

</li>

<li className='list-inline-item'>

<Button className={`${activeTab === 1 && 'active'}`}

onClick={() => {

setActiveTabs(1)

}}
</Button>

</li>

<li className='list-inline-item'>

<Button className = {`${activeTabs === 2 && 'active'}`}

onClick={() => {

setActiveTabs (2)

showReviews()

}}
>Reviews (3)</Button>

</li>

</ul>

<br />


{

activeTab === 1 &&

<div className='tabContent'>

<div className='table-responsive'>

<table className='table table-bordered'> <tbody>

<tr class="stand-up"> <th>Stand Up</th>

<td>

<p>35"L x 24"W x 37-45"H (front to back wheel)</p>

</td>

</tr>

<tr class="folded-wo-wheels"></tr>

<th>Folded (w/o wheels)</th>

<td>

<p>32.5"L x 18.5"W x 16.5"H</p>

</td>

</tr>

<tr class="folded-w-wheels">

<th>Folded (w/ wheels)</th>

<td>

<p>32.5"L x 24"W x 18.5"H</p>

</td>

</tr>

<tr class="door-pass-through">

<th>Door Pass Through</th>

<td>

<p>24</p>

</td>

</tr>


<tr class="frame">

<th>Frame</th>

<td>

T

<p>Aluminum</p>

</td>

</tr>

<tr class="weight-wo-wheels">

<th>Weight (w/o wheels) </th>

<td>

<p>20 LBS</p>

</td>

</tr>

<tr class="weight-capacity"></tr>

<td>

<p>60 LBS</p>

</td>

</tr>

<tr class="width">

<th>Width</th>

<td>

<p>24"</p>

</td>

</tr>

<tr class="handle-height-ground-to-handle">

<th>Handle height (ground to handle)</th>

<td>

<p>37-45"</p>

</td>

</tr>

<tr class="wheels">

<th>Wheels</th>
<td>

<p>37-45"</p>

</td>

</tr>
<tr class="seat-back-height">

<th>Seat back height</th>

<td>

<p>21.5"</p>

</td>

</tr>

<tr class="head-room-inside-canopy">

<th>Head room (inside canopy)</th>

<td>

<p>25"</p>

</td> I

</tr>

<tr class="pa_color">

<th>Color</th>

<td>

<p>Black, Blue, Red, White</p>

</td>

</tr>

<tr class="pa_size">

<th>Size</th>

<td>

<p>M, S</p>

</td>

</tr>

</tbody>

</table>

</div>

</div>

}

{

activeTabs === 2 &&

<div className='tabContent'>

<div className='row'>

<div className='col-md-8'>

<h3>Customer questions & answers</h3>

<br />

{

reviewsArr.length !== 0 && reviewsArr !== undefined &&

reviewsArr.map((item, index) => {
  return (

    <div className='card p-4 reviewsCard
    
    flex-row key={index}>
    
    <div className='image'>
    
    <div className='rounded-circle'>
    
    <img src='https://wp. alithemes.com/html/nest/ demo/assets/imgs/blog/ author-2.png' />
    
    </div>
    
    <span className='text-g d-block
    
    text-center font-weight-bold'>
    
    {item.userName}</span>
    
    </div>

    <form className='reviewForm'>

<h4>Add a review</h4> <br />

<div className='form-group'>

<textarea className='form-control'

placeholder='Write a Review'

name="review" value={reviewFields. review} onChange={(e) => changeInput(e

target.name, e.target.value)}></

textarea>

</div>

<div className='row'>

<div className='col-md-6'>

<div className='form-group'>

<input type='text' value=

{reviewFields.userName}

className='form-control'
placeholder='Write a Review'

name="review"></textarea>

</div>

<div className='row'>

<div className='col-md-6'>

<div className='form-group'>

<input type='text' value=

{reviewFields.userName}

className='form-control'

placeholder='Name' name='userName'

onChange={(e) => changeInput(e.

target.name, e.target.value)} />

</div>

</div>

<div className='col-md-6'>

<div className='form-group'></div>
</div>

</div>

<div className='col-md-6'>

<div className='form-group'>

<Rating name="rating" value=

{rating) precision={0.5} onChange={(e) => changeInput(e. target.name, e.target.value)}

/>

</div>

</div>

</div> */
}
