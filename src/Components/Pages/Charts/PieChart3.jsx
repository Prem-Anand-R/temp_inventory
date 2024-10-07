import React, { useState,useEffect} from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

function PieChart3() {

  const [productList,setProductList]=useState(["Apple","Redmi","Realme","Oppo"])
  const [stockList,setStockList]=useState([21,22,23,44])
  const [totalStocks,setTotalStocks]=useState(0)

  useEffect(()=>{   

    axios.get('http://localhost:3008/totalProductSum')
        .then((res)=>{
          setTotalStocks(res.data[0].total);
          
        })
        .catch((err)=>console.log(err));

    axios.get('http://localhost:3008/productList')
  .then((res)=>{
    setProductList(res.data.map((data)=>{
      return data.product_name
    }));
    setStockList(res.data.map((data)=>{
      return data.stocks
    }))
     
  })
  .catch((err)=>console.log(err));
  },[]);



    const [state, setState] = useState(
      {
          
        series: [44, 55, 13, 33],
        options: {
          chart: {
            width: 380,
            type: 'donut',
          },
          dataLabels: {
            enabled: false
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }],
          legend: {
            position: 'right',
            offsetY: 0,
            height: 230,
          }
        }
      }

    )

    useEffect(()=>{
      setState((prevState) => ({
        ...prevState,
        series: stockList,
        options:{...prevState.options,labels :productList }
      }));
    },[stockList])

    return (
        <Chart options={state.options} series={state.series} type="donut" width='325px'  />    
    )
}

export default PieChart3