import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
export default function Listpage() {
    return(
    <div className="d-flex flex-column-fluid">
        <div className="container">
            <div className="card card-custom gutter-b">
                <div className="card-body">
                    <div className="d-flex">
                        <div className="flex-shrink-0 mr-7">
                            <div className="symbol symbol-50 symbol-lg-120">
                                <img alt="Pic" src="/media//users/300_1.jpg"/>
                            </div>
                        </div>
                        <div className="flex-grow-1">
                            <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
                                <div className="mr-3">
                                    <a href="#" className="d-flex align-items-center text-dark text-hover-primary font-size-h5 font-weight-bold mr-3">Jason Muller<i className="flaticon2-correct text-success icon-md ml-2"></i></a>
                                    <div className="d-flex flex-wrap my-2">
                                        <a href="#" className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
															<span
                                                                className="svg-icon svg-icon-md svg-icon-gray-500 mr-1">
															</span>jason@siastudio.com</a>
                                        <a href="#"
                                           className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
															<span
                                                                className="svg-icon svg-icon-md svg-icon-gray-500 mr-1">
                                                                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Mail-notification.svg")} />
															</span>PR Manager</a>
                                        <a href="#" className="text-muted text-hover-primary font-weight-bold">
															<span
                                                                className="svg-icon svg-icon-md svg-icon-gray-500 mr-1">
                                                                <SVG src={toAbsoluteUrl("/media/svg/icons/General/Lock.svg")} />
															</span>Melbourne</a>
                                    </div>
                                </div>
                                <div className="my-lg-0 my-1">
                                    <a href="#"
                                       className="btn btn-sm btn-light-primary font-weight-bolder text-uppercase mr-2">Ask</a>
                                    <a href="#"
                                       className="btn btn-sm btn-primary font-weight-bolder text-uppercase">Hire</a>
                                </div>
                            </div>
                            <div className="d-flex align-items-center flex-wrap justify-content-between">
                                <div className="flex-grow-1 font-weight-bold text-dark-50 py-2 py-lg-2 mr-5">I
                                    distinguish three main text objectives could be merely to inform people.
                                    <br/>A second could be persuade people. You want people to bay objective.
                                </div>
                                <div className="d-flex mt-4 mt-sm-0">
                                    <span className="font-weight-bold mr-4">Progress</span>
                                    <div className="progress progress-xs mt-2 mb-2 flex-shrink-0 w-150px w-xl-250px">
                                        <div className="progress-bar bg-success" role="progressbar" style={{width: '63%'}}
                                             aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <span className="font-weight-bolder text-dark ml-4">78%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="separator separator-solid my-7"></div>
                    <div className="d-flex align-items-center flex-wrap">
                        <div className="d-flex align-items-center flex-lg-fill mr-5 my-1">
												<span className="mr-4">
													<i className="flaticon-piggy-bank icon-2x text-muted font-weight-bold"></i>
												</span>
                            <div className="d-flex flex-column text-dark-75">
                                <span className="font-weight-bolder font-size-sm">Earnings</span>
                                <span className="font-weight-bolder font-size-h5">
													<span
                                                        className="text-dark-50 font-weight-bold">$</span>249,500</span>
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-lg-fill mr-5 my-1">
												<span className="mr-4">
													<i className="flaticon-confetti icon-2x text-muted font-weight-bold"></i>
												</span>
                            <div className="d-flex flex-column text-dark-75">
                                <span className="font-weight-bolder font-size-sm">Expenses</span>
                                <span className="font-weight-bolder font-size-h5">
													<span
                                                        className="text-dark-50 font-weight-bold">$</span>164,700</span>
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-lg-fill mr-5 my-1">
												<span className="mr-4">
													<i className="flaticon-pie-chart icon-2x text-muted font-weight-bold"></i>
												</span>
                            <div className="d-flex flex-column text-dark-75">
                                <span className="font-weight-bolder font-size-sm">Net</span>
                                <span className="font-weight-bolder font-size-h5">
													<span
                                                        className="text-dark-50 font-weight-bold">$</span>782,300</span>
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-lg-fill mr-5 my-1">
												<span className="mr-4">
													<i className="flaticon-file-2 icon-2x text-muted font-weight-bold"></i>
												</span>
                            <div className="d-flex flex-column flex-lg-fill">
                                <span className="text-dark-75 font-weight-bolder font-size-sm">73 Tasks</span>
                                <a href="#" className="text-primary font-weight-bolder">View</a>
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-lg-fill mr-5 my-1">
												<span className="mr-4">
													<i className="flaticon-chat-1 icon-2x text-muted font-weight-bold"></i>
												</span>
                            <div className="d-flex flex-column">
                                <span className="text-dark-75 font-weight-bolder font-size-sm">648 Comments</span>
                                <a href="#" className="text-primary font-weight-bolder">View</a>
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-lg-fill my-1">
												<span className="mr-4">
													<i className="flaticon-network icon-2x text-muted font-weight-bold"></i>
												</span>
                            <div className="symbol-group symbol-hover">
                                <div className="symbol symbol-30 symbol-circle" data-toggle="tooltip"
                                     title="Mark Stone">
                                    <img alt="Pic" src="/media/users/300_25.jpg"/>
                                </div>
                                <div className="symbol symbol-30 symbol-circle" data-toggle="tooltip"
                                     title="Charlie Stone">
                                    <img alt="Pic" src="/media/users/300_19.jpg"/>
                                </div>
                                <div className="symbol symbol-30 symbol-circle" data-toggle="tooltip"
                                     title="Luca Doncic">
                                    <img alt="Pic" src="/media/users/300_22.jpg"/>
                                </div>
                                <div className="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="Nick Mana">
                                    <img alt="Pic" src="/media/users/300_23.jpg"/>
                                </div>
                                <div className="symbol symbol-30 symbol-circle" data-toggle="tooltip"
                                     title="Teresa Fox">
                                    <img alt="Pic" src="/media/users/300_18.jpg"/>
                                </div>
                                <div className="symbol symbol-30 symbol-circle symbol-light" data-toggle="tooltip"
                                     title="More users">
                                    <span className="symbol-label font-weight-bold">5+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
