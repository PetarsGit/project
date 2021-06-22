import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './apiData.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import XMLParser from 'react-xml-parser';

const GetData = () => {
  const [apiData, setApiData] = useState();
  const api = 'https://front-end-test-bvhzjr6b6a-uc.a.run.app';

  useEffect(() => {
    axios.get(api)
      .then(res => {
        setApiData(res.data.map((element, i) => {
          element = JSON.parse(JSON.stringify(element).replace('tapons', 'tampons'));

          if (typeof element.tampons === 'string') {
            const parsedXml = new XMLParser().parseFromString(element.tampons).children;

            const convertedResult = [];

            parsedXml.map((el, i) => {
              el.children.map((inner) => {
                if (inner.value !== 'none') {
                  convertedResult.push({[inner.name]: inner.value});
                }
              })
            })

            element.tampons = convertedResult;
          }

          return (
            <div className="col-sm-6 col-md-4" key={i}>
              <div className="product-wrapper">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <img className="product-img" alt="missing img" src={element.productImage} />
                    </div>
                    <div className="col-12">
                      <p className="currency">currency: {element.currency}</p>
                    </div>
                    <div className="col-12">
                      <p className="price">price: {element.price}</p>
                    </div>
                  </div>
                </div>

                <div className="container">
                  <div className="row additional-info-wrapper">
                    {element.tampons.map((results, i) => {
                      return (
                        <div className="col-6" key={i}>
                          <p>size: {results.size}</p>
                          <p>coating: {results.coating}</p>
                          <p>amount: {results.amount}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        }));

      })
  },[]);

  return (
   <div>
    <h1 className="main-title">Daye</h1>
    <div className="container">
      <div className="row">
        {apiData}
      </div>
    </div>
   </div>
  )
};

export default GetData;
