import { Card,Spin, Statistic} from "antd";
import axios from "axios";
import { useEffect,useState} from "react";
import { Line} from '@ant-design/charts';

const Statistics=()=>{
    const [totalUsers, settotalUsers]=useState(0)
    const [topCollectors ,    settopCollectors]=useState([])
    const [registrationsByDate, setregistrationsByDate]=useState([])
    const [mostCollectedBooks,  setmostCollectedBooks]=useState([])
    const [loading, setLoading] = useState(true);
    const data = [{ type: 'All users', value: totalUsers }];
useEffect(()=>{
  axios.get(`${process.env.REACT_APP_API_URL}/statistics`, { withCredentials: true })
  .then(response=>{
    if(response){
         console.log(response.data)
        setmostCollectedBooks(response.data.mostCollectedBooks)
        setregistrationsByDate(response.data.registrationsByDate)
        settopCollectors(response.data.topCollectors)
        settotalUsers(response.data.totalUsers)
        setLoading(false);
    }
  })
},[])
const config = {
    data: registrationsByDate,
    xField: 'date',
    yField: 'count',
    smooth: true,
    height: 300,
    point: {
      size: 5,
      shape: 'circle',
    },
    
    xAxis: {
      title: { text: 'Date' },
    },
    yAxis: {
      title: { text: 'New Users' },
    },
  };

return (
    <Card style={{width:"500px"}}>
   <Statistic title="All users" value={totalUsers} suffix="people" />
   <div style={{display:'flex'}}>
    <Card title="Registrations Over Time" style={{ marginTop: 24, width:"400px"}}>
   {loading ? <Spin /> : <Line {...config} />}
   </Card>
   </div>
   
    </Card>
)
}
export default Statistics