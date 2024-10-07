import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

function PieChart1() {

  
  const [priceInward,setPriceInward]=useState(34);
  const [priceOutward,setPriceOutward]=useState(45);
  

  // temp datas 

  const [tempPriceInward,setTemppriceInward]=useState(40);
  const [tempPriceOutward,setTemppriceOutward]=useState(30);



  useEffect(()=>{   

      axios.get('http://localhost:3008/inwardSum')
    .then((res)=>{
      setPriceInward(parseInt(res.data[0].price));
       
    })
    .catch((err)=>console.log(err));

    axios.get('http://localhost:3008/outwardSum')
    .then((res)=>{
      setPriceOutward(parseInt(res.data[0].price));
       
    })
    .catch((err)=>console.log(err));
  },[]);



  const [state, setState] = useState({
          
    series: [44, 55],
    options: {
      chart: {
        width: 380,
        type: 'donut',
        
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function(val, opts) {
          if (opts.seriesIndex === 0) {
            return "Inward";
          } else if (opts.seriesIndex === 1) {
            return "Outward";
          } else {
            return val;
          }
        }
      },
      title: {
        text: 'Comparing Inward and Outward Price ',
        style: {
          width:'100%'
        }
        
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  })
    
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series: [priceInward, priceOutward,],label:['Inward','Outward']
    }));
  }, [priceInward, priceOutward]);
 
    return (
        <Chart options={state.options} series={state.series} type="donut" width='380px'  />    
    )
}

export default PieChart1