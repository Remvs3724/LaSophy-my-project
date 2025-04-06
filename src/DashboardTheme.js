import { Card } from "antd";
import { useNavigate} from "react-router-dom";
const DashboardTheme=()=>{
  const navigate=useNavigate()
    return(
      <>
      <div style={{display:"flex", alignItems:"center", gap:"60px", marginLeft:"20px", marginTop:"30px", minWidth:"100px"}}>
      <Card 
      hoverable
      style={{ width: "500px" ,height:"500px",minWidth: "200px"}}
      cover={
        <img
        alt=""
        src={`https://storage.googleapis.com/lasophy-4e0ff.firebasestorage.app/themeCover/themebook.png`}
        style={{ height: "400px", objectFit: "cover" }} 
        />

      }
       onClick={()=>navigate('/books')}>

        <div style={{fontSize:"20px", fontWeight:"bold"}} >Transitions and rebellion, collapse and resurgence </div>
       
      </Card>

      <Card 
      hoverable
      style={{ width: "500px", height:"500px",minWidth: "200px"}}
      cover={
        <img
        alt=""
        src={`https://storage.googleapis.com/lasophy-4e0ff.firebasestorage.app/themeCover/thememap.png`}
        style={{ height: "400px", objectFit: "cover" }} 
        />
      }

       onClick={()=>navigate('/maps')}>

        <div style={{fontSize:"20px", fontWeight:"bold",minWidth: "300px"}}>16-18th Maps</div>

      </Card>
      </div>
      </>
    )

}
export default DashboardTheme