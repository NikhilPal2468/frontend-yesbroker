import React from "react";
import styles from "../styles.module.css";

function Invoice({ transactionData, userDetails, planDetails }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className={`${styles.card}`}>
            <div className="card-body">
              <div className="invoice-title">
                {/* <h4 className="float-end font-size-15">
                  Invoice #DS0204{" "}
                  <span className="badge bg-success font-size-12 ms-2">
                    Paid
                  </span>
                </h4> */}
                <div className="mb-4">
                  <h2 className="mb-1 text-muted">HomeWale</h2>
                </div>
                <div className="text-muted">
                  <p className="mb-1">Bangaluru</p>
                  <p className="mb-1">
                    <i className="uil uil-envelope-alt me-1"></i>{" "}
                    info@homewale.com
                  </p>
                  <p>
                    <i className="uil uil-phone me-1"></i> +91 8884004204
                  </p>
                </div>
              </div>

              <hr className="my-4" />

              <div className="row">
                <div className="col-sm-6">
                  <div className="text-muted">
                    <h5 className="font-size-16 mb-3">Billed To:</h5>
                    <h5 className="font-size-15 mb-2">{userDetails?.name}</h5>
                    <p className="mb-1">{userDetails?.email}</p>
                    <p className="mb-1">{userDetails?.phone_number}</p>
                    <p></p>
                  </div>
                </div>
                {/* <!-- end col --> */}
                <div className="col-sm-6">
                  <div className="text-muted text-sm-end">
                    {/* <div>
                      <h5 className="font-size-15 mb-1">Invoice No:</h5>
                      <p>{transactionData?.order_no}</p>
                    </div> */}
                    <div className="mt-4">
                      <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                      <p>12 Oct, 2020</p>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-size-15 mb-1">Order No:</h5>
                      <p>{transactionData?.order_no}</p>
                    </div>
                  </div>
                </div>
                {/* <!-- end col --> */}
              </div>
              {/* <!-- end row --> */}

              <div className="py-2">
                <h5 className="font-size-15">Order Summary</h5>

                <div className="table-responsive">
                  <table className="table align-middle table-nowrap table-centered mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: "70px" }}>No.</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th className="text-end" style={{ width: "120px" }}>
                          Total
                        </th>
                      </tr>
                    </thead>
                    {/* <!-- end thead --> */}
                    <tbody>
                      <tr>
                        <th scope="row">01</th>
                        <td>
                          <div>
                            <h5 className="text-truncate font-size-14 mb-1">
                              {planDetails?.plan_type} Plan
                            </h5>
                            {/* <p className="text-muted mb-0">Watch, Black</p> */}
                          </div>
                        </td>
                        <td>{transactionData?.order_amt}</td>
                        <td>1</td>
                        <td className="text-end">{planDetails?.price}</td>
                      </tr>

                      {/* <!-- end tr --> */}
                      <tr>
                        <th scope="row" colSpan="4" className="text-end">
                          Sub Total
                        </th>
                        <td className="text-end">{planDetails?.price}</td>
                      </tr>
                      {/* <!-- end tr --> */}
                      <tr>
                        <th
                          scope="row"
                          colSpan="4"
                          className="border-0 text-end"
                        >
                          Discount :
                        </th>
                        <td className="border-0 text-end">0</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          colSpan="4"
                          className="border-0 text-end"
                        >
                          GST
                        </th>
                        <td className="border-0 text-end">
                          {planDetails?.gst}
                        </td>
                      </tr>
                      {/* <!-- end tr --> */}
                      <tr>
                        <th
                          scope="row"
                          colSpan="4"
                          className="border-0 text-end"
                        >
                          Total
                        </th>
                        <td className="border-0 text-end">
                          <h4 className="m-0 fw-semibold">
                            {planDetails?.total_price}
                          </h4>
                        </td>
                      </tr>
                      {/* <!-- end tr --> */}
                    </tbody>
                    {/* <!-- end tbody --> */}
                  </table>
                  {/* <!-- end table --> */}
                </div>
                {/* <!-- end table responsive --> */}
                {/* <div className="d-print-none mt-4">
                  <div className="float-end">
                    <a
                      href="javascript:window.print()"
                      className="btn btn-success me-1"
                    >
                      <i className="fa fa-print"></i>
                    </a>
                    <a href="#" className="btn btn-primary w-md">
                      Send
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end col --> */}
      </div>
    </div>
  );
}

export default Invoice;
